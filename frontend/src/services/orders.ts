
import type { CheckoutFormValues } from "../components/checkout/schemas";
import api from "./axios-instance";




export async function submitOrder(data: CheckoutFormValues) {
  try {
    const response = await api.post("/orders", data) // endpoint do backend
  return response.data
    
  } catch (error) {
    console.error("Error submitting order:", error);
    
    
  }
}

export async function getOrders() {
  try {
    const response = await api.get("/orders", );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; 
  }
}