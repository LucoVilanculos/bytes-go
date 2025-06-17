import { Schema, model } from "mongoose";
import type { TutorialProps } from "../types/tutorialprops";

const tutorialSchema = new Schema<TutorialProps>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    tags: [String],
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Tutorial = model<TutorialProps>("Tutorial", tutorialSchema);
