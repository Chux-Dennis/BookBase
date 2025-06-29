// models/User.interface.ts
import { Model } from "sequelize";

export interface UserAttributes {
    id?: string,
    name: string,
    password: string,
    role: "Admin" | "Reader" | "Librarian"
    email: string;
    otp: string | null;
    otpExpires: Date | null;
    isVerified: boolean;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes { }