import express from "express";
import { getPatientProfile } from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router();

router.get("/profile",verifyToken, getPatientProfile);


export default router;
