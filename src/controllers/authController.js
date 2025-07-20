import prisma from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
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

        const newUser = await prisma.user.create({
            data: { ...req.body, password: hashedPassword },
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, email: newUser.email },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
