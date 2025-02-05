import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "./utils/generateToken.js";

export const loginUser = async (req, res) => {
    try {
        // Extracting Request Body
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("please add all fields");
        }

        // Finding User by Email
        const user = await User.findOne({ email });

        // Password Comparison
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                firstName: user.firstName,
                token: generateToken(user._id),
            });
        } else if (!user) {
            res.status(404).send({ message: "User not found" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).send(error.message || "Error login user");
    }
};
