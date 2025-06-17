import { Router } from "express";
import {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
} from "../controller/faq.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";

export const FaqRouter = Router();

FaqRouter.post("/", AuthenticationToken, createFaq);

FaqRouter.get("/", getAllFaqs);

FaqRouter.get("/:id", getFaqById);

FaqRouter.put("/:id", AuthenticationToken, updateFaq);

FaqRouter.delete("/:id", AuthenticationToken, deleteFaq);

