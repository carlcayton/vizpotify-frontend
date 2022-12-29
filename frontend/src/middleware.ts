import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  if (!token && pathname !== "/") {
    // console.log("middleware runs");
    return NextResponse.redirect(`${origin}/`);
  }
}
export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
