import mongoose, { Schema } from "mongoose";
import type { OrderProps } from "../types/ordersprops";

const orderSchema = new Schema<OrderProps>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    total: { type: Number, required: true },
    driverLocation: { lat: Number, lng: Number },
    pickupLocation: { lat: Number, lng: Number },
    destination: { lat: Number, lng: Number },
    distance: Number,
    fuelPrice: Number,
    congestionFactor: Number,
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<OrderProps>("Order", orderSchema);