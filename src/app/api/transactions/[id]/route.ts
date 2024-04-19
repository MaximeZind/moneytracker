import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
import { Transaction } from '@/types/global';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: Transaction | Transaction[];
    status?: number;
    message?: string;
}

// Get Transaction by ID
export async function GET(request: Request, context: any) {
    let response: CustomResponse = {};
    const { params } = context;
    const transactionId = params.id
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    try {
        const userId = verifyToken(token.value);
        if (userId) {
            const transaction = await prisma.transaction.findUnique({
                where: {
                    id: transactionId
                },
                include: {
                    category: true,
                    account: true,
                },
            });
            if (transaction) {
                response.status = 200;
                response.data = transaction;
            } else if (!transaction) {
                response.status = 404;
                response.message = 'Transaction not found';
                response.data = [];
            }
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

export async function DELETE(request: Request, context: any) {
    let response: CustomResponse = {};
    const { params } = context;
    console.log(request);
    
    console.log(params);
    const transactionId = params.id;

    
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    try {
        const userId = verifyToken(token.value);
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

export async function PATCH(request: Request, context: any) {
    let response: CustomResponse = {};
    const datas = await request.json();
    const { params } = context;
    const transactionId = params.id;
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    try {
        const userId = verifyToken(token.value);
        if (userId) {
            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transactionId
                },
                data: {
                    accountId: datas.accountId,
                    amount: datas.amount,
                    categoryId: datas.categoryId,
                    date: datas.date,
                    description: datas.description,
                    frequencyAmount: datas.frequencyAmount,
                    frequencyUnit: datas.frequencyUnit,
                    recurring: datas.recurring,
                    recurringEndingDate: datas.recurringEndingDate,
                    type: datas.type,
                },
                include: {
                    category: true,
                },
            });
        
            response.status = 200;
            response.data = [updatedTransaction];
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

