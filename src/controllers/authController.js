import { createUser, getUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                messages: [
                    {
                        path: "email",
                        message: "Email is already registered",
                        type: "conflict.existing",
                    },
                ],
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
