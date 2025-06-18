import { Router } from "express";
import {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransport,
  deleteTransport,
} from "../controllers/cars.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../middleware/auth.Milddleware"

export const CarstRouter = Router();

CarstRouter.post("/", AuthenticationToken, authorizeRoles("driver", "admin"), createTransport);

CarstRouter.get("/", AuthenticationToken, authorizeRoles("admin", "driver", "user"), getAllTransports);

CarstRouter.get("/:id", AuthenticationToken, authorizeRoles("user", "admin", "driver"), getTransportById);

CarstRouter.put("/:id", AuthenticationToken, authorizeRoles("driver", "admin"), updateTransport);

CarstRouter.delete(
  "/:id",
  AuthenticationToken,
  authorizeRoles("admin", "driver"),
  deleteTransport
);

