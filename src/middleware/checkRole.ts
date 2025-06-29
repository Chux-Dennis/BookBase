import { RoleType } from "../types";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET } = process.env;

export const checkRole = (...allowedRoles: RoleType[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          success: false,
          message: "No token provided.",
        });
        return;
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET as string) as {
        id: string;
        role: string;
        name: string;
      };

      const user = await User.findByPk(decoded.id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      if (!user.isVerified) {
        res.status(403).json({
          success: false,
          message: "User account is not verified",
        });
        return;
      }

      if (!allowedRoles.includes(user.role as RoleType)) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission to perform this action",
        });
        return;
      }

      (req as any).user = {
        id: user.id as string,
        role: user.role as RoleType,
        name: user.name,
      };

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
