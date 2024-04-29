import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
import { Account } from '@/types/global';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import { NextResponse } from 'next/server';

require('dotenv').config();

const prisma = new PrismaClient();

interface CustomResponse {
    data?: Account | null;
    status?: number;
    message?: string;
}

// Get Account by ID
export async function GET(request: Request, context: any) {
    const { params } = context;
    const accountId = params.id;
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
        response.data = null;
    } else if (!token && userToken){
        token = userToken;
    } 
    if (token) {
        try {
            let userId = null;
            await verifyToken(token).then((response) => {
                userId = response.userId;
            })
            if (userId) {
                const account = await prisma.account.findUnique({
                    where: {
                        id: accountId
                    },
                    include: {
                        transactions: {
                            include: {
                                category: true,
                            }
                        },
                    },
                })
                response.status = 200;
                response.data = account;
            }
            console.log(response);
            
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
            response.data = null;
        }
    }
    return NextResponse.json({ response: response }, { status: response.status });
}