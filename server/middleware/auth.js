import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";

// Protect routes
export const protect = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            success: false,
            error: true,
            message: "Not authorized"
        })
    }

    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET).payload

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        req.user = await User.findById(userId).select('-password')

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: true,
            message: "Not authorized"
        })
    }
}