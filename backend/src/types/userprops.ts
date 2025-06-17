import { Document } from "mongoose";

export type UserRole = "admin" | "driver" | "customer";

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;         
  licenseNumber?: string; 
  address?: string;       
  isActive?: boolean;     
  createdAt?: Date;
  updatedAt?: Date;
}