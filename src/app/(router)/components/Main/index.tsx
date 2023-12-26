import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="py-1 px-2 flex-grow">{children}</main>;
}
