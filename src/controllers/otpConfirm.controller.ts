import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import { validateOTP } from "../validations/confirmOTP.validate";
import jwt from "jsonwebtoken"

export const confirmOTP = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body || req.body == undefined || req.body == null || Object.keys(req.body).length == 0) {
        res.status(400).send({ message: "No payload passed." })
        return
    }

    const { email, otp } = req.body


    try {
        //Check if email is valid
        const existingUser = await User.findOne({ where: { email: email } })

        if (!existingUser) {
            res.status(400).send({ message: "Email does not exist" })
            return
        }

        // Check if user is already verified 
        if (existingUser.dataValues.isVerified) {
            res.status(400).send({ message: "User is verified already" })
            return
        }

        // Check if otp is valid  
        if (existingUser.dataValues.otp === otp) {

            // Check if otp has expired
            if (new Date() < existingUser.dataValues.otp) {
                res.status(400).send({ message: "OTP has expired" })
                return
            }

            else {
                existingUser.dataValues.isVerified = true
                existingUser.dataValues.otpExpires = null
                existingUser.dataValues.otp = null

               await existingUser.save()

                res.status(200).send({
                    message: "OTP Confirmed Successfully."
                })
                return
            }




        } else {
            console.log(existingUser.dataValues.otp, otp);
            res.status(400).send({ message: "OTP provided is invalid" })
            return
        }


    } catch (error: any | unknown) {
        throw new Error(error)
    }

}