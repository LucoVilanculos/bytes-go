import axios from "axios";
import type { UserProps } from "../types/user";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: UserProps;
  token: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("session", JSON.stringify(response.data.user));
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Erro ao conectar com o servidor" };
  }
}