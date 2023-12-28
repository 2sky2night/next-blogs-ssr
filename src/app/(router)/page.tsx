import { getArticlesAPI } from "@/api/article";
import ArticleItem from "@/components/item/ArticleItem";
import ArticleList from "@/components/list/ArticleList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Next.js Blogs",
};

export default async function Home() {
  const {
    data: { list, has_more },
  } = await getArticlesAPI();
  
  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <ArticleItem
              key={item.aid}
              {...item}
            />
          );
        })}
      </ul>
      <ArticleList
        initPageNum={2}
        initHasMore={has_more}
      />
    </div>
  );
}
