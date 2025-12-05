import express from "express";
import { connectDb } from "./db/connection.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js"; 
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import user from "./routes/user.js";
import adminRouter from "./routes/doctor.js";
import appointment from "./routes/appointment.js";
import department from "./routes/department.js";
import {connectCloudinary} from './config/cloudinary.js'
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
connectDb();
connectCloudinary()

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173'],
  credentials: true
}));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', user);
app.use('/api/v1', appointment);
app.use('/api/v1', department);

app.use('/api/v1/admin', adminRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
});