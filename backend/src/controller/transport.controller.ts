import { Request, Response, NextFunction } from "express";
import { Car } from "../models/car.models";
import mongoose from "mongoose";


export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Access denied. Role not authorized." });
      return; 
    }

    next(); 
  };
};


export const createTransport = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newTransport = new Car(data);
    const savedTransport = await newTransport.save();
    res.status(201).json(savedTransport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transport" });
  }
};

export const getAllTransports = async (req: Request, res: Response) => {
  try {
    const transports = await Car.find()
      .populate("user", "name email")
      .populate("driver", "name email")
      .populate("vehicle", "brand carModel plateNumber");
    res.status(200).json(transports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transports" });
  }
};

export const getTransportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
       res.status(400).json({ message: "Invalid transport id" });
    }
    const transport = await Car.findById(id)
      .populate("user", "name email")
      .populate("driver", "name email")
      .populate("vehicle", "brand carModel plateNumber");
    if (!transport) {
       res.status(404).json({ message: "Transport not found" });
    }
    res.status(200).json(transport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transport" });
  }
};

export const updateTransport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.isValidObjectId(id)) {
       res.status(400).json({ message: "Invalid transport id" });
    }

    const updatedTransport = await Car.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTransport) {
       res.status(404).json({ message: "Transport not found" });
    }

    res.status(200).json(updatedTransport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating transport" });
  }
};

export const deleteTransport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
       res.status(400).json({ message: "Invalid transport id" });
    }

    const deletedTransport = await Car.findByIdAndDelete(id);
    if (!deletedTransport) {
       res.status(404).json({ message: "Transport not found" });
    }

    res.status(200).json({ message: "Transport deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting transport" });
  }
};
