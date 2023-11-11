import { PrismaClient, User } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(request: Request, response: Response) {
    const datas = await request.json();
    const hashedPassword = await bcrypt.hash(datas.password, saltRounds)
    const newUser = {
        password: hashedPassword,
        username: datas.username,
        email: datas.email
    }

    const createdUser: User = await prisma.user.create({
        data: newUser
      });
      
    return Response.json({
        createdUser
    });
}
