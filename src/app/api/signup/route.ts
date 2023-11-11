import { PrismaClient, User } from '@prisma/client';
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
