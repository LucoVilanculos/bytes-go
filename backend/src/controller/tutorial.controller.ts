import { Request, Response } from "express";
import mongoose from "mongoose";
import { Tutorial } from "../models/tutorial.model";

export const createTutorial = async (req: Request, res: Response) => {
  try {
    const tutorialData = req.body;
    const tutorial = new Tutorial(tutorialData);
    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tutorial", error });
  }
};

export const getTutorials = async (req: Request, res: Response) => {
  try {
    const { categoryId, tag, isPublished } = req.query;
    const filter: any = {};

    if (categoryId) filter.categoryId = categoryId;
    if (tag) filter.tags = tag;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";

    const tutorials = await Tutorial.find(filter);
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tutorials", error });
  }
};

export const getTutorialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      const tutorial = await Tutorial.findById(id);
      if (!tutorial) {
        res.status(404).json({ message: "Tutorial not found" });
      } else {
        tutorial.views++;
        await tutorial.save();
        res.status(200).json(tutorial);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tutorial", error });
  }
};

export const updateTutorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!mongoose.isValidObjectId(id))  res.status(400).json({ message: "Invalid ID" });

    const tutorial = await Tutorial.findByIdAndUpdate(id, updateData, { new: true });
    if (!tutorial)  res.status(404).json({ message: "Tutorial not found" });

    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tutorial", error });
  }
};

export const deleteTutorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) res.status(400).json({ message: "Invalid ID" });

    const tutorial = await Tutorial.findByIdAndDelete(id);
    if (!tutorial) res.status(404).json({ message: "Tutorial not found" });

    res.status(200).json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tutorial", error });
  }
};

export const publishTutorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      const tutorial = await Tutorial.findById(id);
      if (!tutorial) {
        res.status(404).json({ message: "Tutorial not found" });
      } else {
        tutorial.isPublished = true;
        await tutorial.save();
        res.status(200).json({ message: "Tutorial published successfully", tutorial });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to publish tutorial", error });
  }
};