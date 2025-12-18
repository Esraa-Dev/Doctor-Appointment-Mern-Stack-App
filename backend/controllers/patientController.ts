import { Request, Response } from "express";
import { Patient } from "../models/PatientSchema";
import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getPatientProfile = AsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.user?._id;
    const patient = await Patient.findById(_id).select(
      "-password -refreshToken -verifyOtp -resetPasswordOtp -isEmailVerified -role -isActive -__v"
    );

    res
      .status(200)
      .json(
        new ApiResponse("Patient profile retrieved Successfully", patient, 200)
      );
  }
);
