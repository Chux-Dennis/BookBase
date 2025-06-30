import { Router } from "express";
import { RegisterController } from "../controllers/register.controller";
import { ConfirmOTP } from "../controllers/otpConfirm.controller";
import { LoginController } from "../controllers/login.controller";
import { ForgotPassword } from "../controllers/forgotPassword.controller";
import { ResetPassword } from "../controllers/resetPassword.controller";

const AuthRoutes = Router()

AuthRoutes.post("/register",RegisterController)

AuthRoutes.post("/otp-confirm",ConfirmOTP)

AuthRoutes.post("/login",LoginController)

AuthRoutes.post("/forgot-password",ForgotPassword)

AuthRoutes.post("/reset-password",ResetPassword)


export default AuthRoutes