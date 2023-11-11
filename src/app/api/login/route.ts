import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

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
        const token = jwt.sign(user,'your-secret-key', { expiresIn: '1h' });
        const responseData = {
            username: user.username,
            email: user.username,
            token: token
        }
        return Response.json(responseData);
    } else if (!passwordMatch) {
        console.log('Incorrect password');
        return Response.json(passwordMatch);
    }

}
