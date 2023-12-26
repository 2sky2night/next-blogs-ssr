import { Redis } from "@/utils/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Posts() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  if (sessionId === undefined) {
    // 无权访问页面，重定向到401
    return redirect("/401");
  }

  const data = await Redis.get(sessionId.value);

  return <div>{data}</div>;
}
