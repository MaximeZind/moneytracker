import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
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

// Get user's Transactions
export async function GET() {
    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    } else if (token) {
        try {
            let userId = null;
            await verifyToken(token.value).then((response) => {
                userId = response.userId;
            })
            if (userId) {
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
    }
    return NextResponse.json({ response: response }, { status: response.status });
}

// Create a new Transaction
export async function POST(request: Request) {
    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    const datas = await request.json()

    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    } else if (token) {
        try {
            let userId = null;
            await verifyToken(token.value).then((response) => {
                userId = response.userId;
            })
            if (userId) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        transactions: true,
                        budget: true,
                    },
                });
    
                if (user) {
                    // Create a new transaction
                    const newTransaction = await prisma.transaction.create({
                        data: {
                            date: datas.date,
                            amount: datas.amount,
                            description: datas.description,
                            categoryId: datas.categoryId,
                            type: datas.type,
                            recurring: datas.recurring,
                            frequencyAmount: datas.frequencyAmount,
                            frequencyUnit: datas.frequencyUnit,
                            recurringEndingDate: datas.recurringEndingDate,
                            userId: userId,
                            accountId: datas.accountId
                        },
                    });
    
                    const newTotalAmount = newTransaction.type === "income" ? (user.budget?.totalAmount || 0) + datas.amount : (user.budget?.totalAmount || 0) - datas.amount;
                    // Update the User and  user's accounts by adding the new transaction
                    await prisma.user.update({
                        where: {
                            id: userId,
                        },
                        data: {
                            transactions: {
                                connect: {
                                    id: newTransaction.id,
                                },
                            },
                            budget: {
                                update: {
                                    totalAmount: newTotalAmount,
                                },
                            }
                        },
                        include: {
                            transactions: true,
                            budget: true,
                        },
                    });
    
                    await prisma.account.update({
                        where: {
                            id: datas.accountId,
                        },
                        data: {
                            transactions: {
                                connect: {
                                    id: newTransaction.id,
                                },
                            },
                        },
                        include: {
                            transactions: true,
                        },
                    });
    
                    const updatedUser = await prisma.user.findUnique({
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
                    response.data = updatedUser?.transactions;
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
    }
    return NextResponse.json({ response: response }, { status: response.status });
}
