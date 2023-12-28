import { redirect } from "next/navigation";
import UserInfo from "./components/UserInfo";
import Data from "./components/Data";
import Content from "./components/Content";
import { getArticleInfoAPI, getArticleAPI } from "@/api/article";
import type { Metadata } from "next";

interface Props {
  params: {
    aid: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 校验参数
  const aid = +params.aid;
  if (Number.isNaN(aid)) {
    return redirect("/400");
  }
  try {
    // 获取标签信息
    const article = await getArticleAPI(aid);
    return {
      title: `${article.data.title}  | Next.js Blogs`,
    };
  } catch (error) {
    return redirect("/404");
  }
}

export default async function ArticleDetail({ params }: Props) {
  const aid = +params.aid;
  if (Number.isNaN(aid)) {
    // 错误的参数
    redirect("/400");
  }
  try {
    const { data } = await getArticleInfoAPI(aid);
    return (
      <div>
        <div className="text-4xl font-bold py-5">{data.title}</div>
        <div className="space-x-3 flex items-center text-sm mb-5">
          <UserInfo {...data.user}></UserInfo>
          <div className="text-gray-400">2023-12-28</div>
          <Data></Data>
        </div>
        <Content
          content={data.content}
          tags={data.tags}
        />
      </div>
    );
  } catch (error) {
    redirect("/404");
  }
}
