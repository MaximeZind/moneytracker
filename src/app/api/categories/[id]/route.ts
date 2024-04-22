import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
import { Category } from '@/types/global';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: Category | Category[] | null;
    status?: number;
    message?: string;
}

export async function DELETE(request: Request, context: any) {
    let response: CustomResponse = {};
    const { params } = context;
    const categoryId = params.id;
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        response.data = null;
    } else if (token) {
        try {
            const userId = verifyToken(token.value);
            if (userId) {
                await prisma.category.delete({
                    where: {
                        id: categoryId
                    },
                })

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
                    response.data = null;
                } else {
                    response.status = 401;
                    response.message = 'Unauthorized';
                    response.data = null;
                }
            }
        }
    }
    return NextResponse.json({ response: response }, { status: response.status });
}

export async function PATCH(request: Request, context: any) {
    let response: CustomResponse = {};
    const datas = await request.json();
    const { params } = context;
    const categoryId = params.id;
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        response.data = [];
    } else if (token) {
        try {
            const userId = verifyToken(token.value);
            if (userId) {
                const updatedCategory = await prisma.category.update({
                    where: {
                        id: categoryId
                    },
                    data: {
                        name: datas.name,
                    },
                });
                response.status = 200;
                response.data = updatedCategory;
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

