"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const rouer = useRouter();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <>
          <Button onClick={() => rouer.replace("/")}>Back Home</Button>
          <Button
            type="primary"
            onClick={reset}>
            Refresh
          </Button>
        </>
      }
    />
  );
}
