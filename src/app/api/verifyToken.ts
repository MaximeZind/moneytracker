import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

interface UserJwtPayload{
    userId: string;
    jti: string;
    iat: number;
}

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error('The environment variable JWT_SECRET is not set');
    }
    return secret;
}

export async function verifyToken(token: string) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload as unknown as UserJwtPayload;
        
    } catch (error) {
        console.log("verifyToken: " + error);
        throw error
    }
}