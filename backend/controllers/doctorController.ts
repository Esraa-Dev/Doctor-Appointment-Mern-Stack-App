import { Request, Response } from "express";
import { Doctor, validateUpdateDoctorProfile } from "../models/DoctorSchema.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

export const getAllDoctors = AsyncHandler(
  async (req: Request, res: Response) => {
    const { search, department, fee, experience, schedule, sortBy } = req.query;
    console.log("search:", search);
    let filter: any = {
      status: "approved",
      isActive: true,
      profileStatus: "completed",
    };

    if (search && search !== "") {
      const regex = new RegExp(search.toString(), "i");
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { specialization: regex },
      ];
    }

    if (department && department !== "null" && department !== "") {
      filter.department = new mongoose.Types.ObjectId(department.toString());
    }

    if (experience && experience !== "") {
      const value = parseInt(experience.toString());
      if (!isNaN(value)) filter.experience = { $gte: value };
    }

    if (fee && fee !== "") {
      const value = parseInt(fee.toString());
      if (!isNaN(value)) filter.fee = { $lte: value };
    }

    if (schedule && schedule !== "") {
      filter.schedule = { $elemMatch: { day: schedule.toString() } };
    }

    const sortOptions: any = {
      experience: { experience: -1 },
      fee: { fee: 1 },
      name: { firstName: 1, lastName: 1 },
    };
    const sortOption = sortOptions[sortBy?.toString() || "experience"];

    const doctors = await Doctor.find(filter)
      .populate("department", "name icon color")
      .sort(sortOption);

    res
      .status(200)
      .json(new ApiResponse("Doctors retrieved successfully", doctors, 200));
  }
);

export const getTopDoctors = AsyncHandler(
  async (req: Request, res: Response) => {
    const { limit = 4 } = req.query;

    const topDoctors = await Doctor.find({
      status: "approved",
      isActive: true,
      profileStatus: "completed",
      rating: { $gte: 4 },
    })
      .populate("department", "name icon color")
      .sort({ rating: -1, totalReviews: -1, experience: -1 })
      .limit(Number(limit));

    res
      .status(200)
      .json(
        new ApiResponse("Top doctors retrieved successfully", topDoctors, 200)
      );
  }
);

export const getDoctorProfile = AsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user?._id;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      throw new ApiError("Doctor not found", 404);
    }
    res
      .status(200)
      .json(
        new ApiResponse("Doctor profile fetched successfully", doctor, 200)
      );
  }
);

export const updateDoctorProfile = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError("Unauthorized access", 401);
    }

    const { error } = validateUpdateDoctorProfile.validate(req.body);
    if (error) {
      throw new ApiError(error.details[0].message, 400);
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        profileStatus: "completed",
      },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          "Doctor profile updated successfully",
          updatedDoctor,
          200
        )
      );
  }
);

export const getDoctorById = AsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      throw new ApiError("Doctor not found", 404);
    }
    res
      .status(200)
      .json(new ApiResponse("Doctor fetched successfully", doctor, 200));
  }
);
