import mongoose, { Schema, Document } from 'mongoose';

interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

const AppointmentSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  reason: { type: String },
});

const Appointment = mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;