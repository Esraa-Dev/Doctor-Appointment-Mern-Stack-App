import mongoose, { Schema, Document } from 'mongoose';

interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  specialization: string;
  degree: string;
  experience: number;
  about: string;
  address: Record<string, any>;
  available: boolean;
  fees: number;
  date: Date;
  slots_booked: any[];
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  specialization: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: Number, required: true },
  about: { type: String, required: true },
  address: { type: Object, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  slots_booked: { type: Array, default: [] },
}, { minimize: false, timestamps: true });

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;