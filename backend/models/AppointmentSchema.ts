import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  type: "video" | "voice" | "clinic";
  fee: number;
  symptoms?: string;
  roomId: string;
  callStatus: "idle" | "ringing" | "connected" | "ended";
  callStartedAt?: Date;
  callEndedAt?: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    type: {
      type: String,
      enum: ["video", "voice", "clinic"],
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: String,
    },
    roomId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    callStatus: {
      type: String,
      enum: ["idle", "ringing", "connected", "ended"],
      default: "idle",
    },
    callStartedAt: {
      type: Date,
    },
    callEndedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const validateBookAppointment = Joi.object({
  appointmentDate: Joi.date().iso().required().min("now").messages({
    "any.required": "Appointment date is required",
    "date.format": "Date must be in ISO format",
    "date.min": "Cannot book appointments in the past",
  }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "any.required": "Start time is required",
      "string.pattern.base": "Start time must be in HH:MM format (24-hour)",
    }),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "any.required": "End time is required",
      "string.pattern.base": "End time must be in HH:MM format (24-hour)",
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
    "any.required": "Doctor ID is required",
    "string.hex": "Doctor ID must be a valid MongoDB ObjectId",
    "string.length": "Doctor ID must be 24 characters",
  }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required",
    "date.format": "Date must be in ISO format (YYYY-MM-DD)",
  }),
});

export const validateUpdateAppointmentStatus = Joi.object({
  status: Joi.string()
    .valid("Scheduled", "Completed", "Cancelled", "In Progress")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only":
        "Status must be one of: Scheduled, Completed, Cancelled, In Progress",
    }),
});

export const validateStartConsultation = Joi.object({
  type: Joi.string().valid("video", "voice").required().messages({
    "any.only": "Consultation type must be video or voice",
    "any.required": "Consultation type is required",
  }),
});

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
