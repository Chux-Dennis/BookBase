import { NextFunction, Request, Response } from "express";
import sendOtp from "../services/otps";
import { validateRegister } from "../validations/register.validate";
import User from "../models/User.model";
import { UserInstance } from "../models/User.model.interface";
import bcrypt from "bcrypt";
import generateOtp from "../utils/generateOTP.utils";

const saltRounds = 10;

export function getOtpExpiry(): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);
    return expiry;
}

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "No payload provided" });
    }

    const { error } = validateRegister.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, name, password, role } = req.body;

    try {
        // Check if user exists
        const foundUser = await User.findOne({
            where: { email },
            attributes: ["email"],
        }) as UserInstance | null;

        if (foundUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        // Hash password and OTP
        const pwordHash = await bcrypt.hash(password, saltRounds);
        const otp = generateOtp();
        
        const otpExpires = getOtpExpiry();

        // Create user
        const user = await User.create({
            name,
            email,
            password: pwordHash,
            isVerified: false,
            otp: otp,
            otpExpires,
            role,
        }) as UserInstance;

        // Send OTP
        await sendOtp(email, name, otp);

        return res.status(201).json({
            success: true,
            message: "Created successfully, check your mail for an OTP",
            data: { email },
        });
    } catch (error: any) {
        next(new Error(`Failed to register user: ${error.message}`));
    }
};