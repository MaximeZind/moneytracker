import { PrismaClient, User } from '@prisma/client';
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const data = await request.json();
    const username = data.username;
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
    })
    if (!user) {
        return NextResponse.json({
            error: 'User Not found!'
        }, {
            status: 404
        });
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
        return NextResponse.json({ data: responseData }, { status: 200 });
    } else if (!passwordMatch) {
        console.log('Incorrect password');
        return NextResponse.json({
            error: 'Wrong password!'
        }, {
            status: 401
        });
    }
}
