export interface OrderUser {
  _id: string;
  name: string;
  email: string;
}

export interface OrderProduct {
  _id: string;
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface OrderProps {
  _id: string;
  user: OrderUser;
  items: OrderProduct[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  driverLocation?: { lat: number; lng: number };
  pickupLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  distance?: number;
  fuelPrice?: number;
  congestionFactor?: number;
}

export type CheckoutFormValues = {
  items: any[];
  user: string;
  pickupLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}
