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
    default: null,
  },

  gender: {
    type: String,
    enum: Object.values(Gender),
    default: null,
  },

  bloodGroup: {
    type: String,
    enum: Object.values(BloodGroup),
    default: BloodGroup.UNKNOWN,
  },

  address: {
    address1: { type: String, default: null },
    address2: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    pincode: { type: String, default: null },
  },

  emergencyContact: {
    name: { type: String, default: null },
    relationship: {
      type: String,
      enum: ["spouse", "parent", "child", "sibling", "friend", "other"],
      default: null,
    },
    phone: { type: String, default: null },
  },

  primaryDoctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    default: null,
  },

  medicalHistory: {
    type: String,
    default: null,
  },

  allergies: {
    type: [String],
    default: [],
  },

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
