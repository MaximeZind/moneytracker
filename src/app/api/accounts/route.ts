import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../verifyToken';
import { Anybody } from 'next/font/google';
require('dotenv').config();

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const verified = verifyToken(token);
    if (verified) {
        
    }
    return Response.json(verified);
}
