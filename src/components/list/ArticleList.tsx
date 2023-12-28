"use client";

import { getArticlesAPI } from "@/api/article";
import { useEffect, useRef, useState } from "react";
import ArticleItem from "../item/ArticleItem";
import { emitter } from "@/utils/mitt";
import { Spin } from "antd";

interface Props {
  initPageNum: number;
  initHasMore: boolean;
}

export default function ArticleList(props: Props) {
  // 页码
  const [pageNum, setPageNum] = useState(props.initPageNum);
  // 列表项
  const [list, setList] = useState<ArticleBase[]>([]);
  // 是否还有更多
  let hasMore = useRef(props.initHasMore);
  // 是否正在加载
  const [isLoading, setIsLoading] = useState(false);

  // 获取数据
  const handleGetData = async (num: number) => {
    setIsLoading(true);
    const { data } = await getArticlesAPI(num);
    hasMore.current = data.has_more;
    if (hasMore.current === false) {
      // 没有更多了，不再监听滚动事件
      emitter.off("main-is-scroll-bottom", handleBottom);
    }
    // 更新列表项目
    setList((pre) => [...pre, ...data.list]);
    setIsLoading(false);
  };

  // 滚动到底部的回调
  const handleBottom = () => {
    if (isLoading) return;
    // 更新页码
    setPageNum((pre) => pre + 1);
    handleGetData(pageNum + 1);
  };

  useEffect(() => {
    // 没有更多了
    if (hasMore.current === false) return;
    emitter.on("main-is-scroll-bottom", handleBottom);
    return () => {
      // 卸载组件时移除滚动监听
      emitter.off("main-is-scroll-bottom", handleBottom);
    };
  }, []);

  return (
    <ul>
      {list.map((item) => (
        <ArticleItem
          key={item.aid}
          {...item}
        />
      ))}
      {isLoading && (
        <div className="flex my-3 justify-center">
          <Spin />
        </div>
      )}
    </ul>
  );
}
