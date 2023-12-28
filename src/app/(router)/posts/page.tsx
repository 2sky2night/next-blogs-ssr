import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PostsForm from "./components/Form";
import { UserRedis } from "@/utils/redis/user";
import { getAllTagsAPI } from "@/api/article";

export default async function Posts() {
  // 鉴权部分
  const sessionId = cookies().get("sessionId");
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
  // 获取文章标签
  const tags = (await getAllTagsAPI()).data.map((item) => {
    return {
      value: item.tid,
      label: item.tag_name,
    };
  });

  return (
    <div className="px-2 pt-40 h-full flex flex-col items-center">
      <h1 className="text-3xl">Publish An Article</h1>
      <PostsForm tags={tags}></PostsForm>
    </div>
  );
}
