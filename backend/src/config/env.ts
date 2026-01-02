import dotenv from "dotenv";
dotenv.config();

export const DB_CONFIG = {
  name: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "",
};

export const PORT = process.env.PORT || 4000;
