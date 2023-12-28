"use client";
import { loginWithGithubAPI } from "@/api/user";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
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
      // 发送请求获取sessionId
      await fetch(NEXT_API + "/auth/login", {
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
      <div className="mt-2 flex flex-col items-center">
        <div className="mb-1 flex flex-col items-center">
          <p>Wait a while, you will be redirected to the home page.</p>
          <p className="text-sm">Not jumped? Click the button below.</p>
        </div>
        <Button
          type="primary"
          onClick={handleClick}>
          Go to Home
        </Button>
      </div>
    );
  }
}
