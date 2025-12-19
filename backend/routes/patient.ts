import express from "express";
import { getPatientProfile, updateProfileInfo, uploadProfileImage } from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/verify.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile",verifyToken, getPatientProfile);
router.put("/profile",verifyToken, updateProfileInfo);
router.put("/profile/image",verifyToken,upload.single('image'), uploadProfileImage);


export default router;
