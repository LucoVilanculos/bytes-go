import { Schema, model } from "mongoose";
import type { FaqProps } from "../types/faqprops";

const faqSchema = new Schema<FaqProps>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Faq = model<FaqProps>("Faq", faqSchema);