import { RoleType } from "../types";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env
import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";
export const checkRole = (...allowedRoles: RoleType[]) => {
    return async (req: any, res: any, next: any) => {

        const HeadersAuth: string = req.headers.authorization

        if (!HeadersAuth || !HeadersAuth.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const token = HeadersAuth.split(" ")[1]

        try {
            const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as {
                id: number;
                role: string;
                name: string
            };
            // console.log(decoded.role in allowedRoles);
            if (!allowedRoles.includes(decoded.role as RoleType)) {
                res.status(401).send({ message: "Access Denied!!, Unauthorized Request." })
                return
            }

            req.user = {
                id: decoded.id,
                role: decoded.role as RoleType, // optionally cast to RoleType
            };

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }


    };
};
