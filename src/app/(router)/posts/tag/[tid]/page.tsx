import { getArticlesByTid, getTagInfo } from "@/api/article";
import ArticleItem from "@/components/item/ArticleItem";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: {
    tid: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 校验参数
  const tid = +params.tid;
  if (Number.isNaN(tid)) {
    return redirect("/400");
  }
  // 获取标签信息
  try {
    const tag = await getTagInfo(tid);
    return {
      title: `${tag.data.tag_name}  | Next.js Blogs`,
    };
  } catch (error) {
    return {};
  }
}

export default async function TagArticles({ params }: Props) {
  // 校验参数
  const tid = +params.tid;
  if (Number.isNaN(tid)) {
    return redirect("/404");
  }
  try {
    // 获取文章列表
    const articles = await getArticlesByTid(tid);
    // 获取标签信息
    const tag = await getTagInfo(tid);
    return (
      <div>
        <div className="text-4xl font-bold">{tag.data.tag_name}</div>
        <ul className="mt-4">
          {articles.data.map((article) => (
            <ArticleItem
              {...article}
              key={article.aid}></ArticleItem>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return redirect("/404");
  }
}
