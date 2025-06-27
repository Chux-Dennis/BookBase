import { Router } from "express";
import { registerController } from "../controllers/register.controller";


const AuthRoutes = Router()

AuthRoutes.post("/register",registerController)

AuthRoutes.post("/otp-confirm",registerController)



export default AuthRoutes