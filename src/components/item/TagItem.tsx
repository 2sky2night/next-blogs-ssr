"use client";

import { useRouter } from "next/navigation";

export default function TagItem({ tag }: { tag: TagBase }) {
  const router = useRouter();
  const handleClick = () => router.push(`/posts/tag/${tag.tid}`);
  return (
    <div
      className="inline-block px-2 py-1 bg-gray-50 rounded cursor-pointer select-none transition-colors hover:bg-sky-100 hover:text-sky-600"
      onClick={handleClick}>
      <span className="text-sm">{tag.tag_name}</span>
    </div>
  );
}
