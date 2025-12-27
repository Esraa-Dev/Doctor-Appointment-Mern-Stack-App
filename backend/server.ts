import express from "express";
import { connectDb } from "./config/db.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import { connectCloudinary } from "./config/cloudinary.js";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import doctorRouter from "./routes/doctor.js";
import appointmentRouter from "./routes/appointment.js";
import departmentRouter from "./routes/department.js";
import patientRouter from "./routes/patient.js";
import helmet from "helmet";

dotenv.config();
connectDb();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/doctors", doctorRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
