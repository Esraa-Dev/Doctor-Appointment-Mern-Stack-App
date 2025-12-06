import express from "express";
import {
  createAppointment,
  getPatientAppointments,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router();

router.post("/create-appointment", verifyToken, createAppointment);
router.get("/appointments", verifyToken, getPatientAppointments);
router.delete("/appointments/:id", verifyToken, deleteAppointment);

export default router;
