import { User } from '@/types/global';
import { validateSignUp } from '@/utils/formValidation';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export interface CustomResponse {
    data?: User | null;
    status?: number;
    message?: string | null;
}

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(request: Request) {
    const datas = await request.json();
    const hashedPassword = await bcrypt.hash(datas.password, saltRounds)
    let response: CustomResponse = {};

    try {
        const validation = validateSignUp(datas);

        if (validation.isValid) {
            const createdUser = await prisma.user.create({
                data: {
                    password: hashedPassword,
                    username: datas.username,
                    email: datas.email,
                    transactions: {
                        create: []
                    },
                    accounts: {
                        create: []
                    },
                    categories: {
                        create: [
                            {
                                name: "Rent"
                            },
                            {
                                name: "Bills"
                            },
                            {
                                name: "Salary"
                            },
                            {
                                name: "Groceries"
                            },
                            {
                                name: "Health"
                            },
                        ]
                    },
                    settings: {
                        create: {
                            darkMode: false,
                            currency: '$',
                            amountGoal: 0,
                            goalDate: new Date(),
                        }
                    }
                }
            });
            if (createdUser) {
                response.status = 200;
                response.data = createdUser;
            }
        } else if (!validation.isValid) {
            response.status = 400;
            response.data = null;
            const errorMsg = validation.errorMsg as { [key: string]: string | null };
            const keys = Object.keys(errorMsg);
            let errorMessages: string[] = [];
            keys.map((key: string) => {
                const message = errorMsg[key];
                if (message !== null && typeof message === "string") {
                    response.message = message;
                    errorMessages.push(message);
                }
            });
            if (errorMessages.length > 1) {
                response.message = `Several mistakes have been found:\n${errorMessages.join("\n")}`
            }
        }
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                response.status = 400;
                response.message = `A user with this ${error.meta?.target} already exists.`;
                response.data = null;
            } else {
                response.status = 500;
                response.message = 'An unexpected error occurred';
                response.data = null;
            }
        } else {
            response.status = 500;
            response.message = 'An unexpected error occurred';
            response.data = null;
        }
    }
    return NextResponse.json({ response: response }, { status: response.status });

}
