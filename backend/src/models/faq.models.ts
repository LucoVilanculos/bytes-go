import mongoose from "mongoose";
import type { FaqProps } from "../types/faqprops";

const faqSchema = new mongoose.Schema<FaqProps>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Faq = mongoose.models.Faq || mongoose.model<FaqProps>("Faq", faqSchema);