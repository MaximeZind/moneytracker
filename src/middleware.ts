import { cookies } from "next/headers";
import { NextResponse, NextRequest} from "next/server";
import { COOKIE_NAME } from "./constants";
import { verifyToken } from "./app/api/verifyToken";

// middleware will check the token and verify its validity. If the token is invalid, it will redirect the user to the login page.
export async function middleware(request: NextRequest, response: NextResponse) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    let userId = null;
    const pathName = request.nextUrl.toString();
    if (token) {
        await verifyToken(token.value).then((response) => {
            userId = response.userId && response.userId;
            if (pathName.includes("/api/login") || userId) {
                return NextResponse.next();
            }
        }).catch((error) => {
            console.log(error);
            return NextResponse.redirect(new URL('/login', request.url))
        })
        if (userId === null) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    
    if (!token && pathName !== "/api/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};