import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  departmentId?: mongoose.Types.ObjectId;
  appointmentType: string;
  appointmentDate: Date;
  appointmentTime: string;
  status:
    | "scheduled"
    | "completed"
    | "cancelled"
    | "no-show"
    | "in-progress"
    | "confirmed"
    | "pending";
  appointmentReason?: string;
  notes?: string;
  fee: number;
  symptoms?: string[];
  diagnosis?: string;
  prescription?: {
    medicine: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  followUpDate?: Date;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentId?: string;
}

const AppointmentSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    appointmentType: {
      type: String,
      enum: ["consultation", "follow-up", "checkup", "emergency"],
      default: "consultation",
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    reason: { type: String, required: true },
    notes: { type: String },
    fee: { type: Number, required: true },
    symptoms: [{ type: String }],
    diagnosis: { type: String },
    prescription: [
      {
        medicine: { type: String },
        dosage: { type: String },
        duration: { type: String },
        instructions: { type: String },
      },
    ],
    followUpDate: { type: Date },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
