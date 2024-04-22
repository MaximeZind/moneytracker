import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
require('dotenv').config();

const prisma = new PrismaClient();

// Get user's Budget
export async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    } else if (token) {
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
                    budget: true,
                },
            })
            return Response.json(user);
        }
    }

}

// Update user's Budget
export async function PUT(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    const datas = await request.json();

    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    } else if (token) {
        if (token) {
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
    }
    
}