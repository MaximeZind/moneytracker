import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../verifyToken';
require('dotenv').config();

const prisma = new PrismaClient();

// Get Transaction by ID
export async function GET(request: Request, context:any) {
    const {params} = context;
    const transactionId = params.id
    const req = await request.headers.get('authorization');
    const token = req ? req.replace('Bearer ', '') : null;
    if (!token) {
        return Response.json({ error: 'Unauthorized - Token missing' });
    }
    const userId = verifyToken(token);
    console.log(userId);
    console.log(transactionId);
    
    if (userId) {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            },
        })        
        return Response.json(transaction);
    }
}