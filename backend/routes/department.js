import express from "express";
import { createDepartment } from "../controllers/departmentController.js";
import { getAllDepartments } from "../controllers/departmentController.js";
import { getDepartmentCount } from "../controllers/departmentController.js";

import { upload } from "../middleware/multer.js";
import { verifyToken } from "../middleware/verify.js";
const router = express.Router();

router.post("/create-department",verifyToken, upload.single("image"), createDepartment);
router.get("/departments", getAllDepartments);
router.get("/departments/count", getDepartmentCount);

export default router;
