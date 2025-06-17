import { Document, Types } from "mongoose";

export interface FaqProps extends Document {
  question: string;
  answer: string;
  categoryId?: Types.ObjectId; // opcional: se quiser agrupar por categoria
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}