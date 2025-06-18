import api from "./axios-instance"

//=====CATEGORIES========

export const createCategories = async (categories:
  { name: string; description?: string }) => {
  try {
    console.log("Sending category data:", categories)
    const response = await api.post("/categories", categories)
    console.log("API response:", response)
    return { data: response.data, status: response.status }
  } catch (error: any) {
    console.log("Error creating category:", error)
    console.log("Error response:", error.response?.data)
    console.log("Error status:", error.response?.status)
    console.log("Error headers:", error.response?.headers)
    throw error
  }
}
export const getCategories = async () => {
  try {
    const response = await api.get("/categories")
    const categories = response.data.categories
    console.log("categories:", categories)
    return categories
  } catch (error: any) {
    console.log("Erro ao buscar categorias:", error)
    return []
  }
}
export const updateCategory = async (id: string, updatedData: { name: string; description: string }) => {
  try {
    const response = await api.put(`/categories/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error)
    throw error
  }
}

export const deleteCategory = async (id: string) => {
  try {
    console.log("Deletando categoria com ID:", id)
    const response = await api.delete(`/categories/${id}`)
    return { data: response.data, status: response.status }
  } catch (error: any) {
    console.log("Erro ao deletar categoria:", error.status.message)
    throw error
  }
}


//=====ORDERS========


export const getOrders = async () => {
  try {
    const response = await api.get("/orders")
    console.log("Items:", response.data.items)
    return response.data.orders|| response.data
  } catch (error: any) {
    console.log("Erro ao buscar pedidos:", error)

    if (error.status === 401) {
      return("user not authenticated. Please log in to view orders.")
    }

    throw error
  }
}

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    console.log("Atualizando status do pedido:", { id, status })
    const response = await api.patch(`/orders/${id}`, { status })
    return { data: response.data, status: response.status }
  } catch (error: any) {
    console.log("Erro ao atualizar status do pedido:", error.status.message)

    if (error.response?.status === 401) {
      throw new Error("Usuário não autenticado. Faça login para atualizar pedidos.")
    }

    throw error
  }
}

export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/me")
    console.log("Items:", response.data.items)
    return response.data.orders|| response.data
  } catch (error: any) {
    console.log("Erro ao buscar pedidos:", error)

    if (error.status === 401) {
      return("user not authenticated. Please log in to view orders.")
    }

    throw error
  }
}
//=====PRODUCTS========

export const createProduct = async (product: {
  name: string
  price: number
  categoryId: string
  imageUrl: string
  description: string
  colors: string[]
  sizes: string[]
  stock: number
}) =>{
  try {
    console.log("Enviando dados do produto:", product)
    const response = await api.post("/products", product)
    console.log("Resposta da API:", response)
    return response.data
  } catch (error: any) {
    console.log("Erro ao criar produto:", error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const response = await api.get("/products")
    return response.data?.products || response.data?.data || response.data
  } catch (error: any) {
    console.log("Erro ao buscar produtos:", error.status.message)
    throw error
  }
}

export const updateProduct = async (id: string, updatedData: {
    name: string;
    price: number;
    categoryId: string;
    imageUrl: string;
    description: string;
    colors: string[];
    sizes: string[];
    stock: number;}) => {
  try {
    const response = await api.put(`/products/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error("Erro ao atualizar produto:", error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    console.log("Deleting product with ID:", id)
    const response = await api.delete(`/products/${id}`)
    return { data: response.data, status: response.status }
  } catch (error: any) {
    console.log("Error deleting product:", error.status.message)
    throw error
  }
}
//=====Authorization(admin)======
export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Invalid token structure", error);
    return null;
  }
}


