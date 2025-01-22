import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authorization = async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // extract token from header
            token = req.headers.authorization.split(" ")[1];
            // verify token with decoder
            const decoded = jwt.verify(token, process.env.JWT_Secret);
            // get user from token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorised, no token");
    }
};
