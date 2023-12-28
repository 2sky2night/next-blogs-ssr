"use client"
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const handleClick = () => router.push("/");
  return (
    <h1
      className="text-2xl select-none cursor-pointer transition-transform text-white font-bold hover:animate-wiggle"
      onClick={handleClick}>
      Next.js Blogs
    </h1>
  );
}
