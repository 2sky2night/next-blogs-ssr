import { logger } from "@/utils/logger";
import { Redis } from "@/utils/redis";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/auth/logout
 * 用户登出，不再维护此用户登录态
 * @param request
 */
export async function POST(request: NextRequest) {
  try {
    // 获取用户cookie
    const sessionId = cookies().get("sessionId");
    if (sessionId === undefined) {
      // 未携带
      return NextResponse.json(
        {
          msg: "No Authorization Field!",
          code: 401,
          data: null,
        },
        { status: 401 }
      );
    }

    // 从redis中获取是否存在该sessionId
    const sessionIdValue = await Redis.get(sessionId.value);
    if (sessionIdValue === null) {
      // 过期或不存在
      return NextResponse.json(
        {
          msg: "Authorization Error!",
          code: 401,
          data: null,
        },
        { status: 401 }
      );
    }
    // 存在则移除该sessionId
    await Redis.remove(sessionId.value);
    // 移除用户的cookies
    cookies().delete("sessionId");
    return NextResponse.json({ msg: "ok", code: 200, data: null });
  } catch (error) {
    // 出错
    logger.errorAPI("/api/auth/logout", error);
    return NextResponse.json(
      { msg: "Server Error!", code: 500, data: null },
      { status: 500 }
    );
  }
}
