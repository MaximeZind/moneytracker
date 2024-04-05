import { COOKIE_NAME } from '@/constants';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '../verifyToken';

export interface CustomResponse {
    data?: string[];
    status?: number;
    message?: string;
}

const prisma = new PrismaClient();
export async function GET() {

    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
        response.data = [];
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        return NextResponse.json({ response: response }, { status: response.status });
    }
    try {
        const userId = verifyToken(token.value);
        if (userId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    categories: true,
                },
            })
            response.status = 200;
            response.data = user?.categories;
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
    return NextResponse.json({ response: response }, { status: response.status });
}

// Create a new Account
export async function POST(request: Request) {
    let response: CustomResponse = {};
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    const data = await request.json();
    console.log(data);

    if (!token) {
        response.data = [];
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        return NextResponse.json({ response: response }, { status: response.status });
    }
    const userId = verifyToken(token.value);

    try {
        if (userId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    categories: true,
                },
            });

            if (user) {
                // Create a new account
                const newCategory = await prisma.category.create({
                    data: {
                        name: data,
                    },
                });

                // Update the user's accounts by adding the new account
                const updatedUser = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        categories: {
                            connect: {
                                id: newCategory.id,
                            },
                        },
                    },
                    include: {
                        categories: true,
                    },
                });
                response.data = updatedUser.categories;
                response.status = 200;
                response.message = "Category successfully created."
            }
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
    return NextResponse.json({ response: response }, { status: response.status });
}
