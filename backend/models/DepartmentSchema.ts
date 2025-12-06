import mongoose, { Schema, Document } from 'mongoose';

interface IDepartment extends Document {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Department = mongoose.model<IDepartment>("Department", departmentSchema);

export default Department;
