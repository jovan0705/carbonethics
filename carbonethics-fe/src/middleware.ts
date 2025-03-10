import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/tickets", "/tickets/create"];

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("access-token")?.value;
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (req.nextUrl.pathname === '/' && isAuthenticated) {
    const absoluteURL = new URL("/tickets", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (req.nextUrl.pathname === '/') {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
