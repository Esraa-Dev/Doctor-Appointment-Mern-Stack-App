import express from "express";
import {
  getAllDoctors,
  getTopDoctors,
} from "../controllers/doctorController.js";
const router = express.Router();

router.get("/", getAllDoctors);
router.get("/top", getTopDoctors);
export default router;