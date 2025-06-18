export type UserRole = "admin" | "driver" | "customer";

export interface CarInfo {
  brand: string;
  carModel: string;
  year: number;
  color: string;
  plateNumber: string;
  imageUrl?: string;
}

export interface UserProps  {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  bairro: string;
  genero: string;
  car?: CarInfo; 
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}