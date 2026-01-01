import mongoose, { Schema, Document, Types } from "mongoose";
import Joi from "joi";

export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  departmentId: Types.ObjectId;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  type: "clinic" | "video" | "voice";
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress";
  fee: number;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentId?: string;
  symptoms?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    type: {
      type: String,
      enum: ["clinic", "video", "voice"],
      required: true,
      default: "clinic",
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "In Progress"],
      default: "Scheduled",
    },
    fee: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    roomId: { type: String, unique: true, sparse: true },
    symptoms: { type: String, default: "" },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export const validateBookAppointment = Joi.object({
  doctorId: Joi.string().required().messages({
    "any.required": "User ID is required",
    "string.empty": "User ID cannot be empty",
  }),
  departmentId: Joi.string().required().messages({
    "any.required": "Department ID is required",
    "string.empty": "Department ID cannot be empty",
  }),
  appointmentDate: Joi.date().iso().required().messages({
    "any.required": "Appointment appointmentDate is required",
    "appointmentDate.format": "Date must be in ISO format",
  }),
  startTime: Joi.string().required().messages({
    "any.required": "Start time is required",
    "string.empty": "Start time cannot be empty",
  }),
  endTime: Joi.string().required().messages({
    "any.required": "End time is required",
    "string.empty": "End time cannot be empty",
  }),
  type: Joi.string().valid("clinic", "video", "voice").default("clinic"),
  fee: Joi.number().positive().required().messages({
    "any.required": "Fee is required",
    "number.base": "Fee must be a number",
    "number.positive": "Fee must be greater than zero",
  }),
  symptoms: Joi.string().optional(),
});

export const validateBookedSlots = Joi.object({
  doctorId: Joi.string().hex().length(24).required().messages({
    'any.required': 'Doctor ID is required',
    'string.hex': 'Doctor ID must be a valid MongoDB ObjectId',
    'string.length': 'Doctor ID must be 24 characters'
  }),
  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
    'date.format': 'Date must be in ISO format (YYYY-MM-DD)'
  })
});
export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);
