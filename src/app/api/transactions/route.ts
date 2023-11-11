import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
require('dotenv').config();

const prisma = new PrismaClient();

// Get user's Transactions
export async function GET(request: Request) {
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const userId = verifyToken(token);
    if (userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                transactions: true,
            },
        })
        return Response.json(user?.transactions);
    }
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
                },
                include: {
                    transactions: true,
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
