import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get("accessToken")?.value;
  // const { pathname } = request.nextUrl;

  // if (token) {
  //   try {
  //     if (pathname === "/sign-in") {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //     return NextResponse.next();
  //   } catch (error) {
  //     const response = NextResponse.redirect(new URL("/sign-in", request.url));
  //     response.cookies.delete("accessToken");
  //     return response;
  //   } 
  // }
  // if (!PUBLIC_ROUTES.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
