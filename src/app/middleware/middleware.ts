import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@component/lib/auth";

const PUBLIC_PATHS = ["/auth", "/dashboard", "/dashboard/about"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("partnerToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/partner/login", req.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/partner/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
