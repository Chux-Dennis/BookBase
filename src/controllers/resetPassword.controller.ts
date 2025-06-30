import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model";
import { validateResetPasswordOTP } from "../validations/resetPassword.validate";
export const ResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ success: false, message: "No Payload Passed" });
            return;
        }

        const { error } = validateResetPasswordOTP.validate(req.body)
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return

        }
        const { email, otp, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        if (user.otp !== otp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }

        if (user.otpExpires && user.otpExpires < new Date()) {
            res.status(400).json({ success: false, message: "OTP has expired" });
            return;
        }

        // hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // clear otp fields
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password successfully reset. You can now log in with the new password.",
        });
    } catch (err) {
        console.error("ResetPassword Error:", err);
        next(err);
    }
};
