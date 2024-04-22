import { cookies } from "next/headers";
import { NextResponse, type NextRequest} from "next/server";
import { COOKIE_NAME } from "./constants";
import { verifyToken } from "./app/api/verifyToken";

// middleware will check the token and verify its validity. If the token is invalid, it will redirect the user to the login page.
export function middleware(request: NextRequest, response: NextResponse) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (token) {
        try {
            verifyToken(token.value);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'TokenExpiredError') {
                    return NextResponse.redirect(new URL('/login', request.url));
                } else {
                    return NextResponse.redirect(new URL('/login', request.url));
                }
            }
        }
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};