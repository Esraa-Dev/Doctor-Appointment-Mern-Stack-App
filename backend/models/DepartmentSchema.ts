import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  doctorsCount: number;
}

const DepartmentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  doctorsCount: {
    type: Number,
    default: 0,
  }
}, { 
  timestamps: true 
});

export const Department = mongoose.model<IDepartment>("Department", DepartmentSchema);