import { Request, Response } from "express";
import { Patient } from "../models/PatientSchema";
import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getPatientProfile = AsyncHandler(
  async (req: Request, res: Response) => {

  }
);
