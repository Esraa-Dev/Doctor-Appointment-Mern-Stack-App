import mongoose, { Schema } from "mongoose";
import { User, IUser } from "./UserSchema.js";
import { UserRole } from "../constants.js";
import Joi from "joi";

export interface IDoctor extends IUser {
  department: mongoose.Types.ObjectId;
  specialization: string;
  qualification: string;
  experience: number;
  fee: number;
  description?: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalReviews: number;
  profileStatus: "incomplete" | "completed";
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
}

const DoctorSchema: Schema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  specialization: {
    type: String,
    trim: true,
  },
  qualification: {
    type: String,
    trim: true,
  },
  experience: {
    type: Number,
    min: 0,
    default: 0,
  },
  fee: {
    type: Number,
    min: 0,
  },
  description: {
    type: String,
  },
  schedule: [
    {
      day: {
        type: String,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  profileStatus: {
    type: String,
    enum: ["incomplete", "completed"],
    default: "incomplete",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

DoctorSchema.index({
  firstName: "text",
  lastName: "text",
  specialization: "text",
});

export const validateUpdateDoctorProfile = Joi.object({
  department: Joi.string().required().messages({
    "string.empty": "القسم مطلوب",
  }),
  specialization: Joi.string().required().messages({
    "string.empty": "التخصص مطلوب",
  }),
  qualification: Joi.string().required().messages({
    "string.empty": "المؤهل مطلوب",
  }),
  experience: Joi.number().min(0).max(50).required().messages({
    "number.base": "الخبرة يجب أن تكون رقم",
    "number.min": "الخبرة يجب أن تكون 0 أو أكثر",
  }),
  fee: Joi.number().min(100).max(5000).required().messages({
    "number.base": "سعر الكشف يجب أن يكون رقم",
    "number.min": "أقل سعر للكشف 100 جنية",
  }),
  description: Joi.string().allow("").optional(),
  schedule: Joi.array()
    .items(
      Joi.object({
        day: Joi.string()
          .valid(
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
          )
          .required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "يجب إضافة يوم عمل واحد على الأقل",
    }),
});

export const Doctor = User.discriminator<IDoctor>(
  UserRole.DOCTOR,
  DoctorSchema
);
