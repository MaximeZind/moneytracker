import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants';
require('dotenv').config();

const prisma = new PrismaClient();
interface CustomResponse {
    data?: User;
    status?: number;
    message?: string;
}

interface User {
    email?: string;
    userId?: string;
    username?: string;
    settings?: Settings;
}

interface Settings {
    id: string;
    darkMode: Boolean;
    currency: String;
    amountGoal: number;
    goalDate: Date;
}

export async function GET(request: NextRequest) {
    let response: CustomResponse = {};
    const headers = request.headers;
    const authorizationHeader = headers.get('Authorization');
    let userToken: string | null = null;

    if (authorizationHeader) {
        const [, tokenValue] = authorizationHeader.split('Bearer ');
        userToken = tokenValue.trim();
    }
    const cookieStore = cookies();
    const tokenObject = cookieStore.get(COOKIE_NAME);
    let token = tokenObject?.value;
    if (!token && !userToken) {
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        response.data = {};
    } else if (!token && userToken) {
        token = userToken;
    }

    if (token) {
        try {
            let userId = null;
            await verifyToken(token).then((response) => {
                userId = response.userId;
            })
            if (userId) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    include: {
                        settings: true,
                    },
                });
                const userData: User = {
                    email: <string>user?.email,
                    userId: <string>user?.id,
                    username: <string>user?.username,
                    settings: <Settings>user?.settings
                }
                response.status = 200;
                response.data = userData;
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'TokenExpiredError') {
                    response.status = 401;
                    response.message = 'Token Expired';
                    response.data = {};
                } else {
                    response.status = 401;
                    response.message = 'Unauthorized';
                    response.data = {};
                }
            }
        }
    }

    return NextResponse.json({ response: response }, { status: response.status });
}

export async function PATCH(request: NextRequest) {
    let response: CustomResponse = {};
    const datas = await request.json();
    const headers = request.headers;
    const authorizationHeader = headers.get('Authorization');
    let userToken: string | null = null;

    if (authorizationHeader) {
        const [, tokenValue] = authorizationHeader.split('Bearer ');
        userToken = tokenValue.trim();
    }
    const cookieStore = cookies();
    const tokenObject = cookieStore.get(COOKIE_NAME);
    let token = tokenObject?.value;
    if (!token && !userToken) {
        response.status = 401;
        response.message = 'Unauthorized - Token missing';
        response.data = {};
    } else if (!token && userToken) {
        token = userToken;
    }

    if (token) {
        try {
            let userId = null;
            await verifyToken(token).then((response) => {
                userId = response.userId;
            })
            if (userId) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    include: {
                        settings: true,
                    },
                });
                const settingsId = user?.settings?.id;
                const updatedSettings = await prisma.settings.update({
                    where: {
                        id: settingsId
                    },
                    data: {
                        darkMode: datas.darkMode && datas.darkMode,
                        currency: datas.currency && datas.currency,
                        amountGoal: Number(datas.amountGoal) && Number(datas.amountGoal),
                        goalDate: new datas.goalDate && datas.goalDate,
                    }
                })
                response.status = 200;
                response.data = updatedSettings;
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'TokenExpiredError') {
                    response.status = 401;
                    response.message = 'Token Expired';
                    response.data = {};
                } else {
                    response.status = 401;
                    response.message = 'Unauthorized';
                    response.data = {};
                }
            }
        }
    }

    return NextResponse.json({ response: response }, { status: response.status });
}