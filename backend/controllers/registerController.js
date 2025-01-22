import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        // check if user exists
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        // create hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            return res.status(201).json({
                // _id: newUser.id,
                firstName: newUser.firstName,
                // lastName: newUser.lastName,
                // email: newUser.email,
                token: generateToken(newUser._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        return res.status(500).send(error.message || "Error adding new user");
    }
};
