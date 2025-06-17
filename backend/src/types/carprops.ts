import mongoose, { Document } from "mongoose";

export interface CarProps extends Document {
  brand: string; 
  carModel: string; 
  year: number; 
  color: string;
  plateNumber: string; 
  capacity: number; 
  imageUrl: string; 
  description?: string;

  status: "available" | "in_use" | "maintenance" | "unavailable";

  category: mongoose.Types.ObjectId; 

  createdAt?: Date;
  updatedAt?: Date;
}
