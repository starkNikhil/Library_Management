import User from "../models/User.js"
import { generate } from 'otp-generator';
import sendOtp from "../utils/sendOTP.js";
import { v4 as UUIDv4 } from "uuid";
import bcrypt from "bcrypt";
// registration of a student step 1: register user and send otp

export async function registerUser(req, res) {
    try {
        const { name, email, phone, password } = req.body;
        if (!email) return res.status(400).json({
            message: "Email is required"
        });

        const cleanPhone = phone ? phone.toString().replace(/\D/g, "") : ""
        if (cleanPhone.length !== 10) {
            return res.status(400).json({
                message: "Mobile number must be exactly of 10 digits"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) return res.status(400).json({
                message: "User already exists"
            });
        }

        const otp = generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

        try {
            await sendOtp(email, otp)
        } catch (emailError) {
            console.error("Error sending OTP email: ", emailError)
            return res.status(500).json({
                message: "Failed to send OTP email. PLease try again."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const studentId = `ST-${UUIDv4().slice(0, 8).toUpperCase()}`;

        const user = await User.create({
            name, email, phone: cleanPhone,
            password: hashedPassword,
            otp: otp,
            otpExpiry,
            studentId
        });

        res.status(201).json({
            message: "User registered successfully, OTP sent to mail", user
        });

    } catch (error) {
        console.error("Error registering the user: ", error);
        res.status(500).json({
            message: "Error registering user", error: error.message
        })

    }
}


//  step 2: verify otp

export async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })

        }
        if (user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });

        }
        Object.assign(user, { isVerified: true, otp: null, otpExpiry: null });
        await user.save();
        res.status(200).json({
            message: "OTP verified successfully"
        })

    } catch (error) {
        console.error("Error verifying the OTP: ", error);
        res.status(500).json({
            message: "Error verifying OTP", error: error.message
        })
    }
}

export async function completeProfile(req, res) {
    try {
        const { email, department, stream, semester, year, rollNo } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "User not verified"
            });
        }
        Object.assign(user, { department, stream, semester, year, rollNo, isProfileComplete: true });
        await user.save();
        res.status(200).json({
            message: "Profile completed Successfully"
        })
    } catch (error) {
        console.error("Error completing Profile: ", error);
        res.status(500).json({
            message: "Error in  completing profile: ", error: error.message
        });


    }
}