"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const rouer = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => rouer.replace("/")}>Back Home</Button>}
    />
  );
}
