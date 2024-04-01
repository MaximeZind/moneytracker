import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
import { Account } from '@/types/global';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import { NextResponse } from 'next/server';

require('dotenv').config();

const prisma = new PrismaClient();

interface CustomResponse {
    data?: Account | null;
    status?: number;
    message?: string;
}

// Get Account by ID
export async function GET(request: Request, context: any) {
    const { params } = context;
    console.log('params: ' + params);
    console.log('id: ' + params.id);
    const accountId = params.id;

    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    console.log(token);
    
    if (!token) {
        response.data = undefined;
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        return NextResponse.json({ response: response }, { status: response.status });
    }

    try {
        const userId = verifyToken(token.value);
        if (userId) {
            const account = await prisma.account.findUnique({
                where: {
                    id: accountId
                },
                include: {
                    transactions: {
                        include: {
                            category: true,
                        }
                    },
                },
            })
            response.status = 200;
            response.data = account;
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                response.status = 401;
                response.message = 'Token Expired';
            } else {
                response.status = 401;
                response.message = 'Unauthorized';
            }
        }
        response.data = null;
    }
    return NextResponse.json({ response: response }, { status: response.status });
}