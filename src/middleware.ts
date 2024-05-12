import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const cookieStore = cookies();
  const { pathname } = req.nextUrl;
  if (
    !cookieStore.get("token")?.value &&
    !["/login", "/create-account"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
