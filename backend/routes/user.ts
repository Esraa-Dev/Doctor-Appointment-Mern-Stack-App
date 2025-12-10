import express from "express";
import { registerUser, login, verifyEmail } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
