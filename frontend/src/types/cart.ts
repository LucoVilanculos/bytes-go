export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ProductProps {
  _id: string;
  name: string;
  price?: number;
  colors?: string[];
  sizes?: string[];
  imageUrl?: string;
}