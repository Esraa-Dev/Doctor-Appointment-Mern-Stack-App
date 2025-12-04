import express from "express";
import { addDoctor } from "../controllers/doctorController.js";
import { getAllDoctors } from "../controllers/doctorController.js";
import { getDoctorById } from "../controllers/doctorController.js";
import { getDoctorCount } from "../controllers/doctorController.js";
import { upload } from "../middleware/multer.js";
const adminRouter = express.Router();

adminRouter.get("/doctors/count", getDoctorCount);
adminRouter.post("/add-doctor", upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", getAllDoctors);
adminRouter.get("/doctors/:id", getDoctorById);

export default adminRouter;
