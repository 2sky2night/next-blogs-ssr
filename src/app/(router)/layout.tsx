import React from "react";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/components/common/AntdRegistry";
import Header from "./components/Header";
import Main from "./components/Main";
import "@/app/globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Blogs",
  description: "一个简易的博客系统，使用Next+Nest构建的应用",
  keywords: "Next.js,Next.js,Blogs",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="zh">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <div className="h-dvh flex flex-col">
          {/*@ts-expect-error Server Component*/}
          <Header></Header>
          <Main>{children}</Main>
        </div>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
