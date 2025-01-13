import prisma from '../client/db';
import JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

class JWTService {
    public static async generateTokenForUser(user: User) {

        if (!user) {
            throw new Error('User not found.');
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        // Use process.env.JWT_SECRET as is
        const token = JWT.sign(payload, process.env.JWT_SECRET as string);
        return token;
    }
}

export default JWTService;
