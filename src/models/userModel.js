import pool from "../config/db.js";

export const createUser = async (user) => {
    const { email, password, phone, firstName, lastName } = user;
    const query =
        "INSERT INTO users (email, password_hash, phone, firstname, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING id, email";

    try {
        const result = await pool.query(query, [
            email,
            password,
            phone,
            firstName,
            lastName,
        ]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    try {
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
