import type { CheckoutFormValues } from "../types/order";
import type { OrderProps } from "../types/order";
import api from "./faqs";

export async function submitOrder(data: CheckoutFormValues) {
  try {
    const response = await api.post<{ order: OrderProps }>("/orders", data); // endpoint do backend
    return response.data.order;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}

export async function getOrders(): Promise<OrderProps[]> {
  try {
    const response = await api.get<OrderProps[]>("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<OrderProps> {
  try {
    const response = await api.get<OrderProps>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<OrderProps> {
  try {
    const response = await api.put<OrderProps>(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export async function cancelOrder(id: string): Promise<OrderProps> {
  try {
    const response = await api.put<OrderProps>(`/orders/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
}

export async function simulateTaxiOrder(data: {
  driverLocation: { lat: number; lng: number };
  pickupLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  congestion?: boolean;
}) {
  try {
    const response = await api.post("/orders/simulate", data);
    return response.data;
  } catch (error) {
    console.error("Error simulating taxi order:", error);
    throw error;
  }
}