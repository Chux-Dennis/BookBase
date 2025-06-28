import { Router } from "express";
import { registerController } from "../controllers/register.controller";
import { confirmOTP } from "../controllers/otpConfirm.controller";


const AuthRoutes = Router()

AuthRoutes.post("/register",registerController)

AuthRoutes.post("/otp-confirm",confirmOTP)



export default AuthRoutes