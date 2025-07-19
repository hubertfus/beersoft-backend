import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(64).required(),
    phone: Joi.string()
        .pattern(/^[\d\s+\-()]{7,20}$/)
        .messages({
            "string.pattern.base":
                "Phone number can only contain digits, spaces, +, -, and parentheses, and be 7 to 20 characters long",
        })
        .required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
}).unknown(false);

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                messages: error.details.map((error) => {
                    return {
                        path: error.path[0],
                        message: error.message,
                        type: error.type,
                    };
                }),
            });
        }
        next();
    };
};
