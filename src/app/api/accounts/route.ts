import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
require('dotenv').config();

const prisma = new PrismaClient();

// Get user's Accounts
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
                accounts: true,
            },
        })        
        return Response.json(user?.accounts);
    }
}

// Create a new Account
export async function POST(request: Request) {
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    const data = await request.json();
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
                accounts: true,
            },
        });

        if (user) {
            // Create a new account
            const newAccount = await prisma.account.create({
                data: {
                    name: data.name,
                    type: data.type, // Adjust the type as needed
                    userId: userId,
                },
            });

            // Update the user's accounts by adding the new account
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    accounts: {
                        connect: {
                            id: newAccount.id,
                        },
                    },
                },
                include: {
                    accounts: true,
                },
            });
            return Response.json(updatedUser);
        }
    }
}
