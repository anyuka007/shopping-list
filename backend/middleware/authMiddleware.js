import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authorization = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // extract token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token with decoder
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded.id).select("-password");
            console.log("user", req.user);
            next();
        } catch (error) {
            return res
                .status(401)
                .send(error.message || "Not authorized, token failed");
        }
    }
    if (!token) {
        return res.status(401).send("Not authorised, no token");
    }
};
