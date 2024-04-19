import { COOKIE_NAME } from '@/constants';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '../verifyToken';
import { Category } from '@/types/global';

export interface CustomResponse {
    data?: Category[];
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

// Create a new Category
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
                
                // Create a new category
                const newCategory = await prisma.category.create({
                    data: {
                        name: data.data,
                        user: {
                            connect: { id: userId },
                        },
                    },
                });
                
                // Update the user's categories by adding the new account
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
