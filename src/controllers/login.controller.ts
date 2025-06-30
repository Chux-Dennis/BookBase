import { NextFunction, Request } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.model"
import { Response } from "express"
const { JWT_SECRET } = process.env
import { UserInstance } from "../models/User.model.interface"
export const LoginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "No payload provided" });
    }


    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ where: { email: email } }) as UserInstance

        if (!existingUser) {
            res.status(400).send({ messsage: "User not found." })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.dataValues.password)
        if (!isPasswordValid) {
            res.status(400).send({ messsage: "Invalid password" })
            return
        }


        if (!existingUser.isVerified) {
            res.status(400).send({ messsage: "Unauthorized account." })
            return
        }


        existingUser.otp = null
        existingUser.otpExpires = null
        existingUser.save()

        const token = jwt.sign({ role: existingUser.role, id: existingUser.id, name: existingUser.name }, JWT_SECRET as jwt.Secret, {
            expiresIn: "1d"
        })

        return res.status(200).send({ message: "Login Successful", token: token })


    } catch (error: any | unknown) {
        next(error)
    }

}