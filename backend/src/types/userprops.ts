import { Document } from "mongoose";

export type UserRole = "admin" | "driver" | "customer";

export interface CarInfo {
  brand: string;
  carModel: string;
  year: number;
  color: string;
  plateNumber: string;
  imageUrl?: string;
}

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  bairro: string;
  genero: string;
  car?: CarInfo; // Apenas para driver
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}