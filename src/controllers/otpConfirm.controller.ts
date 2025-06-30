import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";
import User from "../models/User.model";
import { UserInstance } from "../models/User.model.interface";
import { validateOTP } from "../validations/confirmOTP.validate";

export const ConfirmOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // Validate request body
  const { error } = validateOTP.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { email, otp } = req.body;

  try {
    // Find user with specific attributes
    const existingUser = await User.findOne({
      where: { email },
    }) as UserInstance | null;

    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Email does not exist" });
    }

    if (existingUser.isVerified) {
      return res.status(400).json({ success: false, message: "User is already verified" });
    }

    if (existingUser.otpExpires && new Date() > existingUser.otpExpires) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    // Assuming OTP is stored as plain text (consider hashing in production)
    if (existingUser.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Update user
    existingUser.isVerified = true;
    existingUser.otp = null;
    existingUser.otpExpires = null;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "OTP confirmed successfully",
      data: { email: existingUser.email },
    });
  } catch (error: any) {
    next(new Error(`Failed to confirm OTP: ${error.message}`));
  }
};