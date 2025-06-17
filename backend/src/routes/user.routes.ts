import { Router } from "express";
import { register, } from "../controller/user.controller";
import { getMe } from "../controller/user.controller";
import { AuthenticationToken } from "../middleware/auth.Milddleware";

export const UserRouter = Router();

UserRouter.post("/register", register);

UserRouter.get("/profile", AuthenticationToken, getMe);
