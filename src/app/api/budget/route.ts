import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
require('dotenv').config();

const prisma = new PrismaClient();

// Get user's Budget
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
                budget: true,
            },
        })
        return Response.json(user);
    }
}

// Get user's Budget
export async function POST(request: Request) {

    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    const datas = await request.json();

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
                budget: true,
            },
        });

        if (user) {
            const newBudget = await prisma.budget.update({
                where: {
                    userId: userId,
                },
                data: {
                    userId: userId,
                    totalAmount: datas.totalAmount,
                    amountGoal: datas.amountGoal,
                    goalDate: datas.goalDate,
                },
            });
            return Response.json(newBudget)
        }
    }
}