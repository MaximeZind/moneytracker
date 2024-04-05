import { PrismaClient } from '@prisma/client';

export interface CustomResponse {
    data?: {};
    status?: number; 
    message?: string; 
}

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(request: Request, response: Response) {
    const datas = await request.json();
    const hashedPassword = await bcrypt.hash(datas.password, saltRounds)

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
            budget: {
                create: {
                    totalAmount: 0, 
                    amountGoal: 0,
                    goalDate: new Date(),
                }
            }
        }
    });
      
    return Response.json({
        createdUser
    });
}
