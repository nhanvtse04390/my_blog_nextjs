import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = (req: NextRequest) => {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/shop", req.url));
    }
    return null;
};

const adminMiddleware = (req: NextRequest) => {
    const isAdmin = req.cookies.get("isAdmin")?.value;

    if (req.nextUrl.pathname.startsWith("/admin") && isAdmin !== "true") {
        return NextResponse.redirect(new URL("/no-access", req.url));
    }
    return null;
};

export function middleware(req: NextRequest) {
    // Kiểm tra đăng nhập trước
    const authCheck = authMiddleware(req);
    if (authCheck) return authCheck;

    // Kiểm tra quyền admin
    const adminCheck = adminMiddleware(req);
    if (adminCheck) return adminCheck;

    return NextResponse.next(); // Nếu hợp lệ, tiếp tục request
}

export const config = {
    matcher: ["/admin/:path*", "/shop/account/:path*"],
};
