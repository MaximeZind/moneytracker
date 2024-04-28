import { COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export interface CustomResponse {
    status?: number;
    message?: string;
}

export async function DELETE(request: NextRequest) {
    let response:CustomResponse = {};
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAME);
    response.status = 200;
    response.message = 'User Correctly logged out';
    return NextResponse.json({ response: response }, { status: response.status });
}
