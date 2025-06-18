import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  simulateTaxiOrder,
} from "../controllers/orders.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../middleware/auth.Milddleware";


export const OrderRouter = Router();

OrderRouter.post("/", AuthenticationToken,  createOrder);

OrderRouter.get("/", AuthenticationToken,authorizeRoles("admin"), getAllOrders);

OrderRouter.get("/:id", AuthenticationToken,authorizeRoles("admin"), getOrderById);

OrderRouter.put("/:id/status", AuthenticationToken,authorizeRoles("user"), updateOrderStatus);

OrderRouter.put("/:id/cancel", AuthenticationToken,authorizeRoles("user"), cancelOrder);

OrderRouter.delete("/:id", AuthenticationToken,authorizeRoles("admin"), deleteOrder);

OrderRouter.post("/simulate", AuthenticationToken, simulateTaxiOrder);
