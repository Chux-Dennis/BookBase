import { NextFunction, Request, Response } from "express";
import sendOtp from "../services/otps";
import { validateRegister } from "../validations/register.validate";
import User from "../models/User.model";
import bcrypt from "bcrypt"

const saltRounds = 10
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { error } = validateRegister.validate(req.body)
    const { email, name, password, role } = req.body
    console.log(password);


    if (Object.keys(req.body).length == 0) {
        res.status(400).send({ message: "No payload passed." })
        return
    }
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



            // Add new user  
            try {
                const user = User.create({
                    name,
                    email,
                    password: pwordHash,
                    isVerified: false,
                    role,
                })
                await sendOtp(email,name,generateOTP())
                res.status(201).send({ message: "Created successfully, check your mail for an OTP" })
            } catch (error: any | unknown) {
                throw new Error(error)
            }


            return
        }



    } catch (err: unknown | any) {
        throw new Error(err)
    }

}