import mongoose, { Schema } from "mongoose";
import { User, IUser } from "./UserSchema.js";
import { UserRole, Gender, BloodGroup } from "../constants.js";

export interface IPatient extends IUser {
  dateOfBirth: Date;
  gender: string;
  bloodGroup: string;
  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  primaryDoctor?: mongoose.Types.ObjectId;
  medicalHistory?: string;
  allergies?: string[];
  status: "active" | "inactive";
}

const PatientSchema: Schema = new Schema({
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
  },
  bloodGroup: {
    type: String,
    enum: Object.values(BloodGroup),
    default: BloodGroup.UNKNOWN,
  },

  address: {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },

  emergencyContact: {
    name: { type: String },
    relationship: {
      type: String,
      enum: ["spouse", "parent", "child", "sibling", "friend", "other"],
    },
    phone: { type: String },
  },

  primaryDoctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },

  medicalHistory: { type: String },

  allergies: [{ type: String }],

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export const Patient = User.discriminator<IPatient>(
  UserRole.PATIENT,
  PatientSchema
);
