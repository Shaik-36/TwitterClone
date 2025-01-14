 
import JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import { JWTUser } from '../interfaces';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET || ""; // Get JWT secret from environment variables

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

class JWTService {
  // Generate a JWT for the given user
  public static async generateTokenForUser(user: User): Promise<string> {
    if (!user) {
      throw new Error("User not found.");
    }

    const payload: JWTUser = {
      id: user.id,
      email: user.email,
    };

    return JWT.sign(payload, JWT_SECRET); // No expiration time
  }

  // Decode and verify a JWT
  public static decodeToken(token: string): JWTUser | null {
    try {
      return JWT.verify(token, JWT_SECRET) as JWTUser;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null; // Return null for invalid tokens
    }
  }
}

export default JWTService;
