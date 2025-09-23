import mysql from "mysql2"; // use mysql2 (better & async/await support)
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root1",
  password: process.env.DB_PASSWORD || "chinu925",
  database: process.env.DB_NAME || "social",
});
