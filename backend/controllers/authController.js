import User from "../models/User.js"

// registration of a student step 1: register user and send otp

export async function registerUser(req, res) {
    try{
        const {name, email, phone, password} = req.body;
        if(!email) return res.status(400).json({
            message: "Email is required"
        });
        const cleanPhone = phone?phone.toString().replace(/\D/g,"") :"" 
    }catch{

    }
}