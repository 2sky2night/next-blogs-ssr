"use client";
import { loginWithGithubAPI } from "@/api/user";
import { Token } from "@/utils/token";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { NEXT_API } from "@/config";
import { useUserStore } from "@/store";

interface Props {
  token: string;
  body: LoginWithGithubBody;
}

export default function Login({ token, body }: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleClick = () => router.replace("/");
  const userStore = useUserStore();
  useEffect(() => {
    loginWithGithubAPI(`Bearer ${token}`, body).then(async (r) => {
      // 保存token到本地(作为客户端渲染模式)
      Token.set(r.data.access_token);
      // 发送请求获取sessionId
      await fetch(NEXT_API + "/login", {
        headers: {
          Authorization: `Bearer ${r.data.access_token}`,
        },
      });
      // 在客户端中保存用户信息
      userStore.setToken(r.data.access_token);
      userStore.setUser(body);
      // 结束加载效果
      setLoading(false);
      // 跳转到首页
      handleClick();
    });
  }, []);
  if (isLoading) {
    return (
      <div className="mt-2 flex flex-col items-center">
        <div className="text-2xl">Now is logining...</div>
        <div>
          Please do not close the page, you will be redirected to the home page.
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-2">
        <Button
          type="primary"
          onClick={handleClick}>
          Go to Home
        </Button>
      </div>
    );
  }
}
