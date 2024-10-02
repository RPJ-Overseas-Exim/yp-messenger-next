import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const token = ""
    const url = req.nextUrl.clone()

    if (url.pathname.startsWith("/_next")) return NextResponse.next()

    if (!token.length && url.pathname.startsWith("/messenger")) {
        url.pathname = "/"
        return NextResponse.redirect(url)
    }

    if (token.length > 0 && url.pathname.match("/register")) {
        url.pathname = "/messenger"
        return NextResponse.redirect(url)
    }

    if (token.length > 0 && url.pathname === "/") {
        url.pathname = "/messenger"
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


