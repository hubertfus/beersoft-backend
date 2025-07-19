import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");
        client.release();
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

export default pool;
