import mongoose from "mongoose";
import { CarProps } from "../types/carprops";

const carSchema = new mongoose.Schema<CarProps>(
  {
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },

    status: {
      type: String,
      enum: ["available", "in_use", "maintenance", "unavailable"],
      default: "available",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const Car = mongoose.models.Car || mongoose.model<CarProps>("Car", carSchema);