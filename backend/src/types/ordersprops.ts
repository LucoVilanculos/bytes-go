import mongoose, { Document } from "mongoose";

export interface OrderProps extends Document {
  user: mongoose.Types.ObjectId;   // referência ao usuário que fez o pedido
  items: mongoose.Types.ObjectId[]; // array de IDs dos produtos
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  driverLocation?: { lat: number; lng: number };
  pickupLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  distance?: number;
  fuelPrice?: number;
  congestionFactor?: number;
}
