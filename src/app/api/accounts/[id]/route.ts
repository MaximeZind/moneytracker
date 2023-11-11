import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
require('dotenv').config();

const prisma = new PrismaClient();

// Get Account by ID
export async function GET(request: Request, context:any) {
    const {params} = context;
    const accountId = params.id
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const userId = verifyToken(token);
    if (userId) {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            },
            include: {
                transactions: true,
            },
        })        
        return Response.json(account);
    }
}