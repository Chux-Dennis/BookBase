import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.model"
import { validateLogin } from "../validations/login.validate"
export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body || req.body == undefined || req.body == null || Object.keys(req.body).length == 0) {
        res.status(400).send({ message: "No payload passed." })
        return
    }
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ where: { email: email } })

        if (!existingUser) {
            res.status(400).send({ messsage: "User not found." })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.dataValues.password)
        if (!isPasswordValid) {
            res.status(400).send({ messsage: "Invalid password" })
            return
        }


        if (existingUser.dataValues.isVerified) {
            res.status(400).send({ messsage: "Unauthorized account." })
            return
        }


    } catch (error: any | unknown) {
        throw new Error(error)
    }

}