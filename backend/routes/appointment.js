import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";
import { getPatientAppointments } from "../controllers/appointmentController.js";
import { deleteAppointment } from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();
router.post("/create-appointment", verifyToken, createAppointment);
router.get("/appointments", verifyToken, getPatientAppointments);
router.delete("/appointments/:id", verifyToken, deleteAppointment);
export default router;
