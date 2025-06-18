import { Request, Response } from "express";
import mongoose from "mongoose";
import { haversineDistance } from "../utils/geo";
import { Order } from "../models/oders.models";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      driverLocation,
      pickupLocation,
      destination,
      congestion = false
    } = req.body;

    if (!driverLocation || !pickupLocation || !destination) {
      res.status(400).json({ message: "Missing required locations" });
    } else {
      const distDriverToClient = haversineDistance(driverLocation, pickupLocation);
      const distClientToDest = haversineDistance(pickupLocation, destination);
      const totalDistance = distDriverToClient + distClientToDest;

      const fuelPrice = 90;
      const pricePerKm = 80;
      const congestionFactor = congestion ? 1.4 : 1;
      const basePrice = totalDistance * pricePerKm * congestionFactor;
      const totalPrice = Math.round(basePrice);

      const order = await Order.create({
        user: (req as any).user.userId,
        items: [], 
        status: "pending",
        total: totalPrice,
        createdAt: new Date(),
        updatedAt: new Date(),
        driverLocation,
        pickupLocation,
        destination,
        distance: Number(totalDistance.toFixed(2)),
        fuelPrice,
        congestionFactor
      });

      res.status(201).json({
        message: "Pedido criado com sucesso!",
        order
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar pedido", error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
       res.status(400).json({ message: "Invalid order ID" });

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items");

    if (!order)  res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id))
       res.status(400).json({ message: "Invalid order ID" });

    if (!["pending", "shipped", "delivered", "cancelled"].includes(status))
       res.status(400).json({ message: "Invalid status value" });

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder)  res.status(404).json({ message: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
       res.status(400).json({ message: "Invalid order ID" });

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted)  res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }

};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid order ID" });
    } else {
      const order = await Order.findById(id);

      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        if (order.status === "cancelled") {
          res.status(400).json({ message: "Order is already cancelled" });
        } else {
          order.status = "cancelled";
          await order.save();
          res.status(200).json({ message: "Order cancelled successfully", order });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling order" });
  }
};

export const simulateTaxiOrder = async (req: Request, res: Response) => {
  try {
    const { pickupLocation, destination } = req.body;
    if (
      !pickupLocation ||
      !destination ||
      typeof pickupLocation.lat !== "number" ||
      typeof pickupLocation.lng !== "number" ||
      typeof destination.lat !== "number" ||
      typeof destination.lng !== "number"
    ) {
      res.status(400).json({ message: "Coordenadas inválidas." });
      return;
    }

    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(destination.lat - pickupLocation.lat);
    const dLng = toRad(destination.lng - pickupLocation.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(pickupLocation.lat)) *
        Math.cos(toRad(destination.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const base = 60;
    const perKm = 20;
    const total_price = Math.round(base + distance * perKm);

     res.json({ total_price, distance: distance.toFixed(2) });
  } catch (err) {
     res.status(500).json({ message: "Erro ao simular preço." });
  }
};

