import { Doctor } from "../models/DoctorSchema.js";

export const addDoctor = async (req, res) => {
  try {
    const { name, specialization, description, experience } = req.body;

    if (!name || !specialization || !description || !experience || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newDoctor = await Doctor.create({
      name,
      specialization,
      image: req.file.path,
      description,
      experience,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({ message: "Doctors fetched successfully", doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor fetched successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDoctorCount = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    console.log("Doctor count:", count);
    res
      .status(200)
      .json({ message: "Doctor count fetched successfully", count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
