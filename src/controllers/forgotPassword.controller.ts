import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import dotenv from "dotenv";
import generateOtp from "../utils/generateOTP.utils";
import { getOtpExpiry } from "../utils/otpExpiry.utils";
import sendForgotPasswordOTP from "../services/forgotPasswordOTP";

dotenv.config();

export const ForgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        if (!req.body || Object.keys(req.body).length == 0) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ success: false, message: "No user found with this email" });
            return;
        }

        const otp = generateOtp(); // 6-digit
        const otpExpires = getOtpExpiry(10); // 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();


        await sendForgotPasswordOTP(email, user.name, otp)


        res.status(200).json({
            success: true,
            message: "OTP sent to email. Check your inbox.",
        });

    } catch (error) {
        console.error("ForgotPassword Error:", error);
        next(error);
    }
};
