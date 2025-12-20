import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  departmentId: Types.ObjectId;
  date: Date;
  timeSlot: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
  fee: number;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentId?: string;
}
const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    fee: { type: Number, required: true },
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
  appointmentSchema
);
