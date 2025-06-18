import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const AuthenticationToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "User not authenticated" });
    return; 
  }

  const jwtSecret = process.env.JWT_SECRET || "";
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    (req as any).user = user;
    next(); 
  });
};

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