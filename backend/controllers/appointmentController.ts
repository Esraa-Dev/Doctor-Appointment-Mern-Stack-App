import { Request, Response } from "express";
import {
  Appointment,
  validateBookAppointment,
  validateBookedSlots,
  validateStartConsultation,
  validateUpdateAppointmentStatus,
} from "../models/AppointmentSchema.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Doctor } from "../models/DoctorSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken04 } from "../utils/ZegoToken.js";

export const getPatientAppointments = AsyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.user?._id;
    const { status } = req.query;
    const filter: any = { patientId: patientId };

    if (status) {
      const statusArray = Array.isArray(status) ? status : [status];
      filter.status = { $in: statusArray };
    }

    const appointments = await Appointment.find(filter)
      .populate({
        path: "doctorId",
        select: "firstName lastName specialization image",
      })
      .sort({ appointmentDate: -1, startTime: -1 });

    res
      .status(200)
      .json(
        new ApiResponse("Appointments fetched successfully", appointments, 200)
      );
  }
);

export const bookAppointment = AsyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = validateBookAppointment.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/["]/g, "")
      );
      throw new ApiError("Validation failed", 400, messages);
    }

    const patientId = req.user?._id;
    const { doctorId } = req.params;
    const { appointmentDate, startTime, endTime, type, fee, symptoms } = value;

    const appointmentDateTime = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDateTime < today) {
      throw new ApiError("Cannot book appointments in the past", 400);
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw new ApiError("Doctor not found", 404);

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: appointmentDateTime,
      status: { $in: ["Scheduled", "In Progress"] },
      startTime,
    });

    if (existingAppointment) {
      throw new ApiError("Time slot already booked for this doctor", 400);
    }
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate: appointmentDateTime,
      startTime,
      endTime,
      type,
      fee,
      symptoms,
      status: "Scheduled",
      paymentStatus: "pending",
    });

    if (type === "video" || type === "voice") {
      newAppointment.roomId = `room_${newAppointment._id}`;
    }

    await newAppointment.save();

    const fullDetails = await Appointment.findById(newAppointment._id)
      .populate("doctorId", "firstName lastName specialization image")
      .populate("patientId", "firstName lastName email image");

    res
      .status(201)
      .json(
        new ApiResponse("Appointment booked successfully", fullDetails, 201)
      );
  }
);

export const getBookedSlots = AsyncHandler(
  async (req: Request, res: Response) => {
    const { value, error } = validateBookedSlots.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/["]/g, "")
      );
      throw new ApiError("Validation failed", 400, messages);
    }

    const { doctorId, date } = value;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      doctorId: doctorId,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ["Scheduled", "In Progress"] },
    }).select("startTime -_id");

    const bookedSlots = bookedAppointments.map((apt) => apt.startTime);
    res
      .status(200)
      .json(new ApiResponse("Booked slots fetched", bookedSlots, 200));
  }
);

export const getDoctorAppointments = AsyncHandler(
  async (req: Request, res: Response) => {
    const doctorId = req.user?._id;
    const { status } = req.query;
    const filter: any = { doctorId: doctorId };

    if (status) {
      const statusArr = Array.isArray(status) ? status : [status];
      filter.status = { $in: statusArr };
    }

    const appointments = await Appointment.find(filter)
      .populate({
        path: "patientId",
        select: "firstName lastName email phone image",
      })
      .populate({
        path: "doctorId",
        select: "firstName lastName specialization fee image",
      })
      .sort({ appointmentDate: 1, startTime: 1 });

    res
      .status(200)
      .json(
        new ApiResponse(
          "Doctor appointments fetched successfully",
          appointments,
          200
        )
      );
  }
);

export const updateAppointmentStatus = AsyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = validateUpdateAppointmentStatus.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/["]/g, "")
      );
      throw new ApiError("Validation failed", 400, messages);
    }

    const { id } = req.params;
    const { status } = value;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new ApiError("Appointment not found", 404);
    }

    const doctorId = req.user?._id;
    if (doctorId?.toString() !== appointment.doctorId.toString()) {
      throw new ApiError("Unauthorized to update this appointment", 403);
    }

    appointment.status = status;
    await appointment.save();

    const updatedAppointment = await Appointment.findById(id)
      .populate("patientId", "firstName lastName email phone image")
      .populate("doctorId", "firstName lastName specialization fee image");

    res
      .status(200)
      .json(
        new ApiResponse(
          "Appointment status updated successfully",
          updatedAppointment,
          200
        )
      );
  }
);

export const startConsultation = AsyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = validateStartConsultation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/["]/g, "")
      );
      throw new ApiError("Validation failed", 400, messages);
    }

    const { id } = req.params;
    const { type } = value;
    const userId = req.user?._id;

    const appointment = await Appointment.findById(id)
      .populate("doctorId", "firstName lastName email image _id")
      .populate("patientId", "firstName lastName email image _id");

    if (!appointment) throw new ApiError("Appointment not found", 404);

    if (appointment.type === "clinic") {
      throw new ApiError(
        "Clinic appointments do not support starting a call",
        400
      );
    }

    if (appointment.type !== type) {
      throw new ApiError(`This appointment is not a ${type} consultation`, 400);
    }

    const isDoctor = appointment.doctorId._id.toString() === userId?.toString();
    const isPatient =
      appointment.patientId._id.toString() === userId?.toString();
    if (!isDoctor && !isPatient) throw new ApiError("Unauthorized", 403);

    if (!["Scheduled", "In Progress"].includes(appointment.status)) {
      throw new ApiError(
        `Cannot start consultation for ${appointment.status}`,
        400
      );
    }

    const appId = Number(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_SECRET as string;
    if (!appId || isNaN(appId) || !serverSecret)
      throw new ApiError("Call service config error", 500);

    const token = generateToken04(
      appId,
      userId.toString(),
      serverSecret,
      3600,
      ""
    );

    if (appointment.status === "Scheduled") appointment.status = "In Progress";
    appointment.callStatus = "ringing";
    appointment.callStartedAt = new Date();
    if (!appointment.roomId)
      appointment.roomId = `room_${appointment._id}_${Date.now()}`;

    await appointment.save();

    res.status(200).json(
      new ApiResponse(
        `${
          type === "video" ? "Video" : "Voice"
        } consultation started successfully`,
        {
          roomId: appointment.roomId,
          token,
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          type: appointment.type,
        },
        200
      )
    );
  }
);
