import mongoose, { Schema } from "mongoose";
import { UserProps } from "../types/userprops";

const userSchema = new Schema<UserProps>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      required: true,
      enum: ["admin", "customer", "driver"],
      default: "customer",
    },

    phone: { type: String },
    licenseNumber: { type: String }, 
    address: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserProps>("User", userSchema);
