import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Redis } from "@/utils/redis";
import { ReactNode } from "react";
import RightAction from "./components/RightAction";

const RightActionNoSSR = dynamic(
  () => import("./components/RightActionClient"),
  {
    ssr: false,
  }
);

// 根据用户是否登录渲染不同的UI结构
export default async function Header() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  let node: ReactNode = <></>;
  if (sessionId) {
    // 登录了
    const value = await Redis.get(sessionId.value);
    if (value) {
      // redis中保存了用户sessionId，则服务端渲染用户头像信息
      /*@ts-expect-error Server Component*/
      node = <RightAction token={value}></RightAction>;
    } else {
      // 过期或未保存，说明登录态过期或未登录，登录流程走客户端渲染
      node = <RightActionNoSSR></RightActionNoSSR>;
    }
  } else {
    // 未登录
    node = <RightActionNoSSR></RightActionNoSSR>;
  }
  return (
    <header className="flex py-3 px-4 justify-between items-center bg-sky-400 sticky top-0">
      <h1 className="text-2xl select-none cursor-pointer transition-transform text-white font-bold hover:animate-wiggle">
        Next.js Blogs
      </h1>
      {node}
    </header>
  );
}
