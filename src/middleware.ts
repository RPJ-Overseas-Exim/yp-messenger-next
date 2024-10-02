import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("Authentication")
    const url = req.nextUrl.clone()

    if (url.pathname.startsWith("/_next")) return NextResponse.next()

    if (!token && url.pathname.startsWith("/messenger")) {
        url.pathname = "/"
        return NextResponse.redirect(url)
    }

    if (token && (url.pathname === "/register" || url.pathname === "/")) {
        url.pathname = "/messenger"
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


