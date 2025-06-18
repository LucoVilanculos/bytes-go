import { Request, Response } from "express";
import { Faq } from "../models/faq.models"; 
import type { FaqProps } from "../types/faqprops";

export const createFaq = async (req: Request, res: Response) => {
  try {
    const data = req.body as Partial<FaqProps>;

    if (!data.question || !data.answer) {
      res.status(400).json({ message: "Question and Answer are required" });
    }

    const faq = new Faq(data);
    await faq.save();

    res.status(201).json({ message: "FAQ created successfully", faq });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFaqs = async (req: Request, res: Response) => {
  try {
    const { categoryId, isPublished } = req.query;

    const filter: any = {};
    if (categoryId) filter.categoryId = categoryId;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";

    const faqs = await Faq.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFaqById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const faq = await Faq.findById(id);
    if (!faq)  res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ faq });
  } catch (error) {
    console.error("Error fetching FAQ by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body as Partial<FaqProps>;

    const updatedFaq = await Faq.findByIdAndUpdate(id, data, { new: true });
    if (!updatedFaq)  res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ updated successfully", faq: updatedFaq });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq)  res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
