const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isLoggedIn = async (req, res, next) => {
    console.log("Cookies:", req.cookies);

    // Ensure cookie-parser is used in app.js/server.js
    if (!req.cookies || !req.cookies.token) {
        console.log(req.cookies.token);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Please log in again",
        });
    }

    try {
        // Verify the JWT token
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find the user associated with the token
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please log in again.",
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please log in again.",
        });
    }
};
