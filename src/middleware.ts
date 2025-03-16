import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const isAdmin = req.cookies.get("isAdmin")?.value;
    console.log("!isAdmin",!isAdmin)
    console.log("!isAdmin",isAdmin)
    if (req.nextUrl.pathname.startsWith("/admin") && isAdmin === 'false') {
        console.log("vao day k")
        return NextResponse.redirect(new URL("/shop", req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/admin/:path*"], // Chỉ áp dụng cho các route bắt đầu bằng /admin
};
