import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 공개 경로
  const publicPath = [
    "/",
    "/login",
    "/signup",
    "/login/exist-user",
    "/login/terms-agreement",
    "/login/identity-verification",
    "/login/identity-verification/detail-verification",
    "/login/find-password",
    "/login/reset-password",
    "/login/user-register",
  ];

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = publicPath.includes(path);

  // 토큰없을때 & 공개경로 아닐때
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 토큰있을때 & 공개경로
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:jpg|jpeg|png|svg)).*)",
  ],
};
