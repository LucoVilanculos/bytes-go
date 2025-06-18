import { Router } from "express";
import { simulateTaxiOrder, createOrder, getAllOrders, getOrderById, updateOrderStatus, cancelOrder, deleteOrder } from "../controllers/orders.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";

export const OrderRouter = Router();

OrderRouter.post("/", AuthenticationToken, createOrder);
OrderRouter.get("/", AuthenticationToken, getAllOrders);
OrderRouter.get("/:id", AuthenticationToken, getOrderById);
OrderRouter.put("/:id/status", AuthenticationToken, updateOrderStatus);
OrderRouter.put("/:id/cancel", AuthenticationToken, cancelOrder);
OrderRouter.delete("/:id", AuthenticationToken, deleteOrder);
OrderRouter.post("/simulate", simulateTaxiOrder);
