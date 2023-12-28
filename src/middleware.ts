import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionId = cookies().get("sessionId");
  if (sessionId === undefined) {
    // 无权访问页面，重定向到403
    return NextResponse.redirect(new URL("/403", request.url));
  }
  // 放行请求
  return NextResponse.next();
}

export const config = {
  matcher: ["/posts"],
};
