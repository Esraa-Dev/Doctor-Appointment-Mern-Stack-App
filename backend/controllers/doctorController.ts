import { Request, Response } from "express";
import {Doctor} from "../models/DoctorSchema.js";

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const { name, specialization, description, experience } = req.body;

    if (!name || !specialization || !description || !experience || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newDoctor = await Doctor.create({
      name,
      specialization,
      image: req.file.path,
      about: description,
      experience,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({ message: "Doctors fetched successfully", doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor fetched successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getDoctorCount = async (req: Request, res: Response) => {
  try {
    const count = await Doctor.countDocuments();
    console.log("Doctor count:", count);
    res
      .status(200)
      .json({ message: "Doctor count fetched successfully", count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};