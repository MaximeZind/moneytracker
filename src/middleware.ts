import { cookies } from "next/headers";
import { NextResponse, type NextRequest} from "next/server";
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
            console.log(response);
            userId = response.userId;
            if (pathName.includes("/api/login") || userId) {
                return NextResponse.next();
            }
        }).catch((error) => {
            console.log(error);
            return NextResponse.redirect("/login");
        })
    }
    if (!token && pathName !== "/login") {
        return NextResponse.redirect("/login");
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};