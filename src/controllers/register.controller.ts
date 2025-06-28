import { NextFunction, Request, Response } from "express";
import sendOtp from "../services/otps";
import { validateRegister } from "../validations/register.validate";
import User from "../models/User.model";
import bcrypt from "bcrypt"
import generateOtp from "../utils/generateOTP.utils";
const saltRounds = 10
const otpDuration = 10  // Ten minutes


export function getOtpExpiry(): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);
    return expiry;
}
export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body || req.body == undefined || req.body == null) {
        res.status(400).send({ message: "No payload passed." })
        return
    }
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({ message: "No payload passed." })
        return
    }
    const { error } = validateRegister.validate(req.body)
    const { email, name, password, role } = req.body
    console.log(password);


    // Validating Payload 
    if (error) {
        res.status(400).send({ message: error.details[0].message })
        return
    }


    // Check if user exists if not add the user to db 
    try {
        // Checking if user exists
        const foundUser = await User.findOne({ where: { email: email } })

        if (foundUser) {
            res.status(400).send({ message: "User with this email already exists." })
            return
        } else {
            const pwordHash = await bcrypt.hash(password, saltRounds)
            const otpExpires = new Date(Date.now() + otpDuration * 60 * 1000)
            const otp = generateOtp()

            // Add new user  
            try {
                const user = User.create({
                    name,
                    email,
                    password: pwordHash,
                    isVerified: false,
                    otp: otp,
                    otpExpires: otpExpires,
                    role,
                })
                await sendOtp(email, name, otp)
                console.log(generateOtp());
                
                res.status(201).send({ message: "Created successfully, check your mail for an OTP" })
            } catch (error: any | unknown) {
                throw new Error(error)
            }
        }



    } catch (err: unknown | any) {
        throw new Error(err)
    }

}