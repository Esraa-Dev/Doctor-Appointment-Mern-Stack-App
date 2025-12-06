import express from "express";
import {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  getDoctorCount,
} from "../controllers/doctorController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/doctors/count", getDoctorCount);
router.post("/add-doctor", upload.single("image"), addDoctor);
router.get("/all-doctors", getAllDoctors);
router.get("/doctors/:id", getDoctorById);

export default router;
