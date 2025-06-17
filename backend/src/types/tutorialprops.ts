import { Document, Types } from "mongoose";

export interface TutorialProps extends Document {
  title: string;
  content: string;
  imageUrl?: string;       
  tags?: string[];         
  categoryId: Types.ObjectId;
  authorId: Types.ObjectId;
  isPublished: boolean;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
}