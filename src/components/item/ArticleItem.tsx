"use client";

import { Tag } from "antd";
import {
  EyeOutlined as EyeIcon,
  LikeOutlined as LikeIcon,
} from "@ant-design/icons";
import Link from "next/link";

export default function ArticleItem(props: ArticleBase) {
  return (
    <li className="select-none transition-colors p-2 hover:bg-slate-100">
      <Link href={`/posts/${props.aid}`}>
        <div className="text-xl font-bold break-words">{props.title}</div>
        <div className="line-clamp-2">{props.content}</div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex text-zinc-400 text-xs">
            <span>Author Name</span>
            <div className="mx-4">|</div>
            <div>
              <EyeIcon />
              <span className="ml-1">649</span>
            </div>
            <div className="ml-3">
              <LikeIcon />
              <span className="ml-1">3</span>
            </div>
          </div>
          <div>
            <Tag bordered={false}>Tag Name 01</Tag>
            <Tag bordered={false}>Tag Name 02</Tag>
          </div>
        </div>
      </Link>
    </li>
  );
}
