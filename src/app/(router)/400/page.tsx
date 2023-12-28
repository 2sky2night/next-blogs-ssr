"use client";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

export default function BadRequest() {
  const router = useRouter();
  const handleClick = () => router.replace("/");
  return (
    <Result
      status="500"
      title="400"
      subTitle="Sorry, Your request something went wrong."
      extra={
        <Button
          type="primary"
          onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  );
}
