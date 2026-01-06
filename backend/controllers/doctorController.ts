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
    console.log("department:", department);
    console.log("fee:", fee);
    console.log("experience:", experience);
    console.log("schedule:", schedule);
    console.log("sortBy:", sortBy);
    console.log("========================");
    let filter: any = {
      // status: "approved",
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

