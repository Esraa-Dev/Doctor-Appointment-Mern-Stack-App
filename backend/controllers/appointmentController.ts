import { Request, Response } from "express";
import {
  Appointment,
  bookAppointmentSchema,
} from "../models/AppointmentSchema.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Doctor } from "../models/DoctorSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Patient } from "../models/PatientSchema.js";
import { ApiError } from "../utils/ApiError.js";

export const bookAppointments = AsyncHandler(
  async (req: Request, res: Response) => {
    const { error } = bookAppointmentSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/["]/g, "")
      );
      return res
        .status(400)
        .json({ message: "Validation failed", errors: messages });
    }
    const patientId = req.user?._id;

    const { doctorId, date, timeSlot, reason, fee, departmentId } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new ApiError("Doctor not found", 404);
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new ApiError("Patient not found", 404);
    }
    const appointemnt = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });
    if (appointemnt) {
      throw new ApiError("Time slot not available", 400);
    }
    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      departmentId: departmentId,
      date: new Date(date),
      timeSlot,
      reason,
      fee,
    });

    res
      .status(201)
      .json(
        new ApiResponse("Appointment booked successfully", newAppointment, 201)
      );
  }
);

export const getPatientAppointments = AsyncHandler(async (req: Request, res: Response) => {
  const patientId = req.user?._id;
  
  const {page = 1, limit = 10 } = req.query;
  
  const query = { patientId };

  const options = {
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    sort: { createdAt: -1 },
    populate: [
      { path: 'doctorId', select: 'firstName lastName designation image consultationCharge' },
      { path: 'departmentId', select: 'name' }
    ]
  };
  
  const appointments = await Appointment.paginate(query, options);
  
  res.status(200).json(
    new ApiResponse("Patient appointments retrieved successfully", appointments, 200)
  );
});

export const deleteAppointment = async (req: Request, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const deletedAppointment = await Appointment.findByIdAndDelete(id);
  //   if (!deletedAppointment) {
  //     return res.status(404).json({ message: "Appointment not found" });
  //   }
  //   res.status(200).json({ message: "Appointment deleted successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Error deleting appointment", error });
  // }
};
