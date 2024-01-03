import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSessionValid } from "./service/auth.service";

const publicRoutes = ["/login", "/cadastro", "/", "/checkout"];
const publicRoutesAuth = ["/login", "/cadastro"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await isSessionValid();

  if (!session) {
    const isAPI = pathname.startsWith("/api");
    if (isAPI) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicRoutesAuth.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
