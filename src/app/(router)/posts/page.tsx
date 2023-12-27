import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PostsForm from "./components/Form";
import { UserRedis } from "@/utils/redis/user";

export default async function Posts() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  if (sessionId === undefined) {
    // 无权访问页面，重定向到403
    return redirect("/403");
  }
  try {
    await UserRedis.getUserInfo(sessionId.value);
  } catch (error) {
    // token不合法
    // 无权访问页面，重定向到403
    return redirect("/403");
  }

  return (
    <div className="px-2 pt-40 h-full flex flex-col items-center">
      <h1 className="text-3xl">Publish An Article</h1>
      <PostsForm></PostsForm>
    </div>
  );
}
