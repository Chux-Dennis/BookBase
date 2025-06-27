import dotenv from "dotenv"
import { registerTemplate } from "../email/register.email"
import nodemailer from "nodemailer"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.APP_EMAIL,
        pass: process.env.APP_PASS
    }
})

const sendOtp = async (email: string, username: string, otp: string | number) => {
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: "Your OTP to Get Started! 🎉",
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        html: registerTemplate(otp, username)
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("OTP sent successfully")
    } catch (error) {
        console.error("Error sending OTP:", error)
        throw new Error("Failed to send OTP")
    }
}


export default sendOtp