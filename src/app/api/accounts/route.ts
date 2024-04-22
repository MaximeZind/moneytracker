import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import { NextResponse } from 'next/server';

require('dotenv').config();

const prisma = new PrismaClient();

interface CustomResponse {
    data?: Account[];
    status?: number;
    message?: string;
}

interface Account {
    name: string;
    type: string;
    userId: string;
}

// Get user's Accounts
export async function GET() {

    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
        response.data = [];
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        return NextResponse.json({ response: response }, { status: response.status });
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
                        accounts: {
                            include: {
                                transactions: true,
                            },
                        },
                    },
                })
                response.status = 200;
                response.data = user?.accounts;
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
            response.data = [];
        }
    }

    return NextResponse.json({ response: response }, { status: response.status });
}

// Create a new Account
export async function POST(request: Request) {
    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    const data = await request.json();

    if (!token) {
        response.data = [];
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        return NextResponse.json({ response: response }, { status: response.status });
    } else if (token) {
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
    
}
