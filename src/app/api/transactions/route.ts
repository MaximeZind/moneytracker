import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: Transaction[];
    status?: number; 
    message?: string; 
}

interface Transaction {
    id: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    description: string;
    category: string;
    type: string;
    recurring: boolean;
    frequencyAmount: number | null;
    frequencyUnit: string | null;
    userId: string;
    accountId: string;
  }

// Get user's Transactions
export async function GET() {
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
            })
            response.status = 200;
            response.data = user?.transactions
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
    }
    
    return NextResponse.json({response: response}, {status: response.status});
}

// Create a new Transaction
export async function POST(request: Request) {
    const header = await request.headers.get('authorization');
    const token = header ? header.replace('Bearer ', '') : null;

    const datas = await request.json()

    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const userId = verifyToken(token);
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
            // Create a new account
            const newTransaction = await prisma.transaction.create({
                data: {
                    date: datas.date,
                    amount: datas.amount,
                    description: datas.description,
                    category: datas.category,
                    type: datas.type,
                    recurring: datas.recurring,
                    frequencyAmount: datas.frequencyAmount,
                    frequencyUnit: datas.frequencyUnit,
                    userId: userId,
                    accountId: datas.accountId
                },
            });

            const newTotalAmount = newTransaction.type === "income" ? (user.budget?.totalAmount || 0) + datas.amount :  (user.budget?.totalAmount || 0) - datas.amount;
            // Update the User and  user's accounts by adding the new transaction
            const updatedUser = await prisma.user.update({
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

            const updatedAccount = await prisma.account.update({
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

            return Response.json([updatedUser, updatedAccount]);
        }
    }
}
