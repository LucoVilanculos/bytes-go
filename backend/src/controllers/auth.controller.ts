import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.models";
import { UserProps } from "../types/userprops";

export const login = async (req: Request, res: Response): Promise<any> => {
  const body = req.body as Partial<UserProps>; 

  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email }) as (UserProps & { _id: any, password: string, toObject: () => any });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const jwtSecret = process.env.JWT_SECRET || "";

  const token = jwt.sign(
    {
      userId: String(user._id), 
      role: user.role,
      email: user.email,
      name: user.name,
    },
    jwtSecret,
    { expiresIn: "24h" }
  );

  const { password: _, ...userData } = user.toObject();

  return res.status(200).json({
    message: "Ok",
    user: userData,
    token,
  });
};
