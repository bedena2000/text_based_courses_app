import jwt from "jsonwebtoken";
import { DB_CONFIG } from "../config/env";

export interface JwtPayload {
  userId: number;
  username: string;
}

export const generateToken = (payload: JwtPayload): string => {
  if (!DB_CONFIG.jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(payload, DB_CONFIG.jwtSecret, {
    expiresIn: (DB_CONFIG.jwtExpiresIn || "7d") as any,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  if (!DB_CONFIG.jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    return jwt.verify(token, DB_CONFIG.jwtSecret) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const exctractTokenFromHeader = (
  authHeader: string | undefined
): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7);
};
