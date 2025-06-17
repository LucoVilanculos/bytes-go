import { Router } from "express";
import {
  register,
  getMe,
  updateUser,
  patchUser,
  forgotPassword,
  deleteUser,
  getAllUsers,
} from "../controller/user.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";
import { authorizeRoles } from "../controller/transport.controller"; // Corrija o caminho se necessário

export const UserRouter = Router();

UserRouter.post("/register", register);

UserRouter.get("/profile", AuthenticationToken, getMe);

UserRouter.get("/", AuthenticationToken, authorizeRoles("admin"), getAllUsers);

UserRouter.put("/:id", AuthenticationToken, authorizeRoles("admin", "driver", "customer"), updateUser);

UserRouter.patch("/:id", AuthenticationToken, authorizeRoles("admin", "driver", "customer"), patchUser);

UserRouter.post("/forgot-password", forgotPassword);

UserRouter.delete("/:id", AuthenticationToken, authorizeRoles("admin", "driver", "customer"), deleteUser);