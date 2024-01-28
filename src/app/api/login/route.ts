import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
    const data = await request.json();
    const username = data.username;
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
    })

    if (!user) {
        console.log('User not found!');
        return Response.json(false);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
        console.log('Authentification successful');
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'BackupKey';
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        const responseData = {
            userId: user.id,
            username: user.username,
            email: user.email,
            token: token
        }
        return Response.json(responseData);
    } else if (!passwordMatch) {
        console.log('Incorrect password');
        return Response.json(passwordMatch);
    }
}
