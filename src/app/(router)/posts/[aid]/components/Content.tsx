"use client";

import { Divider } from "antd";
import TagItem from "@/components/item/TagItem";

export default function Content(props: { content: string; tags: TagBase[] }) {
  return (
    <div>
      <p>{props.content}</p>
      <Divider>
        <span className="text-gray-400">End</span>
      </Divider>
      <ul className="flex space-x-2">
        {props.tags.map((tag) => (
          <li key={tag.tid}>
            <TagItem tag={tag}></TagItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
