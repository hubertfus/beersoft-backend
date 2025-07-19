import express from "express";
import { register } from "../controllers/authController.js";
import { registerSchema, validate } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;
