"use client";
import { ReactNode, useEffect, useRef } from "react";
import { emitter } from "@/utils/mitt";

export default function Main({ children }: { children: ReactNode }) {
  const mainDOM = useRef<HTMLElement>(null);
  // 滚动事件监听
  const handleScroll = () => {
    const target = mainDOM.current;
    if (target !== null) {
      if (target.scrollTop + target.clientHeight + 1 >= target.scrollHeight) {
        emitter.emit("main-is-scroll-bottom");
      }
    }
  };
  useEffect(() => {
    mainDOM.current && mainDOM.current.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <main
      className="py-3 flex-grow max-h-full overflow-y-auto px-10"
      ref={mainDOM}>
      {children}
    </main>
  );
}
