"use client";
import { ReactNode } from "react";

export default function LoginBtn({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const handleClick = () => {
    window.location.href = href;
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:bg-sky-500 transition-colors hover:text-white flex justify-center py-2 rounded border items-center">
      {children}
    </div>
  );
}
