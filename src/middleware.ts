import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/api/verifyToken";

export function middleware(request: NextRequest) {
    console.log(request);
    console.log('hi');
    const { headers } = request;
    const authHeader = headers.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        const isTokenOk = verifyToken(token);
        console.log(isTokenOk);
        
    }



    // return NextResponse.redirect(new URL("/", request.url));
}

// export const config = {
//     matcher: "/login",
// };