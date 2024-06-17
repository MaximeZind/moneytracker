import { PrismaClient, User } from '@prisma/client';
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { COOKIE_NAME } from '@/constants';
import { validateLogin } from '@/utils/formValidation';
const bcrypt = require('bcrypt');
require('dotenv').config();

interface CustomResponse {
    data?: { userId: string; username: string; email: string; token: string; };
    status?: number; 
    message?: string; 
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const data = await request.json();
    const username = data.username;
    let response: CustomResponse = {};
    let serialized;
    let headers;
    try {
        const validation = validateLogin(data);

        if (validation.isValid) {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                },
            })
            if (!user) {
                response.status = 404;
                throw new Error('User not found.')
            }
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'BackupKey';
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
            serialized = serialize(COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path:"/"
            })
            headers = serialized ? { "Set-Cookie": serialized } : {};
            const responseData = {
                userId: user.id,
                username: user.username,
                email: user.email,
                token: token
            }
            if (!passwordMatch) {
                response.status = 401;
                throw new Error('Password is incorrect.')
            }
            response.status = 200;
            response.message = 'User successfully logged in.';
            response.data = responseData;
        } else if (!validation.isValid) {
            response.status = 400;
            const errorMsg = validation.errorMsg as { [key: string]: string | null };
            const keys = Object.keys(errorMsg);
            let errorMessages: string[] = [];
            keys.map((key: string) => {
                const message = errorMsg[key];
                if (message !== null && typeof message === "string") {
                    response.message = message;
                    errorMessages.push(message);
                }
            });
            if (errorMessages.length > 1) {
                response.message = `Several mistakes have been found:\n${errorMessages.join("\n")}`
            }
        }
    } catch (error) {
        console.log('Error with the login.');
        if (error instanceof Error) {
            response.message = error.message;
        }
    }
    
    return new NextResponse(JSON.stringify(response), {
        status: response.status,
        headers: headers,
    });
}
