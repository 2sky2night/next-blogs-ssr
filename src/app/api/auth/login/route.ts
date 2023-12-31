import { verifyTokenAPI } from "@/api/user";
import { COOKIE_TIME } from "@/config";
import { logger } from "@/utils/logger";
import { Redis } from "@/utils/redis";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

/**
 * /api/auth/login
 * 登录接口,将token数据保存到session中，并返回sessionId
 * 在请求头部中需要携带后端token
 * @param request
 * @returns
 * @example fetch('/api/auth/login',{headers:{Authorization:"Bearer xxx"}})
 */
export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization");
  // 1.token是否携带
  if (token === null) {
    return NextResponse.json(
      { msg: "No Authorization Field!", code: 401, data: null },
      { status: 401 }
    );
  }
  // 2.向后端请求token是否合法
  try {
    // 发送请求校验token是否合法
    await verifyTokenAPI(token);
  } catch (error) {
    // token不合法
    return NextResponse.json(
      { msg: "Authorization Error!", code: 401, data: null },
      { status: 401 }
    );
  }
  // 3.保存token到redis中
  try {
    // 生成session id
    const sessionId = uuid();
    // 保存token到redis中
    Redis.set(sessionId, token);
    return NextResponse.json(
      {
        msg: "ok",
        code: 200,
        data: null,
      },
      {
        headers: {
          // 设置cookie
          "set-cookie": `sessionId=${sessionId};path=/;max-age=${COOKIE_TIME};HttpOnly;Secure;`,
        },
      }
    );
  } catch (error) {
    logger.errorAPI("/api/auth/login", error);
    return NextResponse.json(
      { msg: "Server Error!", code: 500, data: null },
      { status: 500 }
    );
  }
}
