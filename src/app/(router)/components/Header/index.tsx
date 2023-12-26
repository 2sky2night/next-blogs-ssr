import { cookies } from "next/headers";
import ClientHeader from "./client";
import ServerHeader from "./server";
import { Redis } from "@/utils/redis";

export default async function Header() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  if (sessionId) {
    // 登录了
    const value = await Redis.get(sessionId.value);
    if (value) {
      // redis中保存了用户sessionId
      return <ServerHeader></ServerHeader>;
    } else {
      // 过期或未保存，说明登录态过期或未登录
      return <ClientHeader></ClientHeader>;
    }
  } else {
    // 未登录
    return <ClientHeader></ClientHeader>;
  }
}
