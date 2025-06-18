import axios from "axios";
import type { UserProps } from "../types/users";

const BASE_URL = import.meta.env.VITE_HOST;

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "driver" | "admin";
  phone?: string;
  bairro?: string;
  genero?: string;
  car?: UserProps["car"];
}

interface RegisterResponse {
  message: string;
  user: UserProps;
}

export async function createUser({ data }: { data: RegisterData }) {
  try {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}/register`,
      data
    );
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: "Erro ao registrar usuário" };
  }
}