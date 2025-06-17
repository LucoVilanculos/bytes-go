import mongoose, { Schema } from "mongoose";
import { UserProps } from "../types/userprops";

const carSchema = new Schema(
  {
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    plateNumber: { type: String, required: true },
    imageUrl: { type: String }
  },
  { _id: false }
);

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
    phone: { type: String, required: true },
    bairro: { type: String, required: true },
    genero: { type: String, required: true },
    car: { type: carSchema, required: false }, // Só para driver
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<UserProps>("User", userSchema);