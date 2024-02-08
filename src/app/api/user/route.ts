import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: User;
    status?: number; 
    message?: string; 
}

interface User {
    email?: string;
    userId?: string;
    username?: string;
}

export async function GET(request: Request) {
    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    try {
        const userId = verifyToken(token.value);
        if (userId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    transactions: true,
                },
            });
            const userData: User = {
                email:<string> user?.email,
                userId:<string> user?.id,
                username:<string> user?.username
            }
            response.status = 200;
            response.data = userData;
        } 
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                response.status = 401;
                response.message = 'Token Expired';
                response.data = {};
            } else {
                response.status = 401;
                response.message = 'Unauthorized';
                response.data = {};
            }
        }
    }
    
    return NextResponse.json({response: response}, {status: response.status});
}