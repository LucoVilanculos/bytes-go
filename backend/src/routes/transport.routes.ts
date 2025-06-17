import { Router } from "express";
import {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransport,
  deleteTransport,
} from "../controller/transport.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../controller/transport.controller"; // este middleware valida roles

export const TransportRouter = Router();

TransportRouter.post("/", AuthenticationToken, authorizeRoles("driver", "admin"), createTransport);

TransportRouter.get("/", AuthenticationToken, authorizeRoles("admin", "driver", "user"), getAllTransports);

TransportRouter.get("/:id", AuthenticationToken, authorizeRoles("user", "admin", "driver"), getTransportById);

TransportRouter.put("/:id", AuthenticationToken, authorizeRoles("driver", "admin"), updateTransport);

TransportRouter.delete(
  "/:id",
  AuthenticationToken,
  authorizeRoles("admin", "driver"),
  deleteTransport
);

