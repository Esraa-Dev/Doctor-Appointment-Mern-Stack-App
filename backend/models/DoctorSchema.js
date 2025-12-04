import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
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
  },
  { minimize: false, timestamps: true }
);

export const Doctor = mongoose.model("Doctor", DoctorSchema);
