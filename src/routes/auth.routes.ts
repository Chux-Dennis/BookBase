import { Router } from "express";
import { registerController } from "../controllers/register.controller";
import { confirmOTP } from "../controllers/otpConfirm.controller";
import { loginController } from "../controllers/login.controller";


const AuthRoutes = Router()

AuthRoutes.post("/register",registerController)

AuthRoutes.post("/otp-confirm",confirmOTP)

AuthRoutes.post("/login",loginController)

export default AuthRoutes