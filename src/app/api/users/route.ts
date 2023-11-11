import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const usersData = await prisma.user.findMany();

    return Response.json(usersData);
}

export async function DELETE() {
    const usersData = await prisma.user.deleteMany();

    return Response.json(usersData);
}
