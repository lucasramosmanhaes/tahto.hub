import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get("jwtToken");
    const isAuthPage = request.nextUrl.pathname.startsWith("/authentication");

    if (!sessionCookie && !isAuthPage) {
        return NextResponse.redirect(new URL("/authentication", request.url));
    }

    if (sessionCookie && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|gif).*)"],
};