// import { PrismaClient } from '@prisma/client';
// import { verifyToken } from '../../verifyToken';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
import { Transaction } from '@/types/global';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: Transaction[];
    status?: number;
    message?: string;
}


// Get Transaction by ID
export async function GET(request: Request, context: any) {
    const { params } = context;
    const transactionId = params.id
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const userId = verifyToken(token);
    if (userId) {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            },
        })
        return Response.json(transaction);
    }
}

export async function DELETE(context: any) {
    let response: CustomResponse = {};
    const { params } = context;
    const transactionId = params.id;
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    try {
        const userId = verifyToken(token);
        if (userId) {
            await prisma.transaction.delete({
                where: {
                    id: transactionId
                },
            })

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    transactions: {
                        orderBy: {
                            date: 'asc',
                        },
                        include: {
                            category: true,
                            account: true,
                        },
                    },
                },
            })
            response.status = 200;
            response.data = user?.transactions;
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                response.status = 401;
                response.message = 'Token Expired';
                response.data = [];
            } else {
                response.status = 401;
                response.message = 'Unauthorized';
                response.data = [];
            }
        }
    }
    return NextResponse.json({ response: response }, { status: response.status });
}
