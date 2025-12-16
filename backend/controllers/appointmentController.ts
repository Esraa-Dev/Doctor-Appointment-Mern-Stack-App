import { Request, Response } from "express";
import {Appointment} from "../models/AppointmentSchema.js";
import User from "../models/UserSchema.js";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { doctorId, appointmentDate, reason } = req.body;

    const newAppointment = await Appointment.create({
      patientId: user._id,
      doctorId,
      appointmentDate,
      reason,
    });

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

export const getPatientAppointments = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const appointments = await Appointment.find({
      patientId: user._id,
    }).populate("doctorId", "name email");
    res
      .status(200)
      .json({ message: "Appointments fetched successfully", appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};