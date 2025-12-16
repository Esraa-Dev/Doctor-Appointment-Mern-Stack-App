import mongoose, { Schema } from "mongoose";
import { User, IUser } from "./UserSchema.js";
import { UserRole, Gender, BloodGroup, DaysOfWeek } from "../constants.js";

export interface IDoctor extends IUser {
  username: string;
  dateOfBirth: Date;
  yearOfExperience: number;
  department: mongoose.Types.ObjectId;
  designation: string;
  medicalLicenseNumber: string;
  languageSpoken: string[];
  bloodGroup: string;
  gender: string;
  bio: string;
  aboutDoctor: string;
  featuredOnWebsite: boolean;
  
  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  
  session: {
    from: string;
    to: string;
  };
  
  appointmentSettings: {
    appointmentType: string;
    acceptBookingsInAdvance: number;
    appointmentDuration: number;
    consultationCharge: number;
    maxBookingsPerSlot: number;
    displayOnBookingPage: boolean;
  };
  
  schedule: {
    day: string;
    from: string;
    to: string;
    isAvailable: boolean;
  }[];
  
  education: {
    degree: string;
    university: string;
    from: number;
    to: number;
  }[];
  
  awards: {
    name: string;
    from: number;
  }[];
  
  certifications: {
    name: string;
    from: number;
  }[];
  
  status: "pending" | "approved" | "rejected" | "suspended";
  rating: number;
  totalReviews: number;
}

const DoctorSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  yearOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  medicalLicenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  languageSpoken: [{
    type: String
  }],
  bloodGroup: {
    type: String,
    enum: Object.values(BloodGroup),
    default: BloodGroup.UNKNOWN
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true
  },
  bio: {
    type: String
  },
  aboutDoctor: {
    type: String
  },
  featuredOnWebsite: {
    type: Boolean,
    default: false
  },
  
  address: {
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  
  session: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  
  appointmentSettings: {
    appointmentType: {
      type: String,
      enum: ["inperson"],
      default: "inperson"
    },
    acceptBookingsInAdvance: {
      type: Number,
      default: 7
    },
    appointmentDuration: {
      type: Number,
      default: 30
    },
    consultationCharge: {
      type: Number,
      required: true
    },
    maxBookingsPerSlot: {
      type: Number,
      default: 1
    },
    displayOnBookingPage: {
      type: Boolean,
      default: true
    }
  },
  
  schedule: [{
    day: {
      type: String,
      enum: Object.values(DaysOfWeek),
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  
  education: [{
    degree: {
      type: String,
      required: true
    },
    university: {
      type: String,
      required: true
    },
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  }],
  
  awards: [{
    name: {
      type: String,
      required: true
    },
    from: {
      type: Number,
      required: true
    }
  }],
  
  certifications: [{
    name: {
      type: String,
      required: true
    },
    from: {
      type: Number,
      required: true
    }
  }],
  
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "suspended"],
    default: "pending"
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
});


export const Doctor = User.discriminator<IDoctor>(UserRole.DOCTOR, DoctorSchema);
