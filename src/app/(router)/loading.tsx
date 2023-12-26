import { LoadingOutlined as LoadingIcon } from "@ant-design/icons";

export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <LoadingIcon
        className="animate-spin"
        style={{
          fontSize: "80px",
          color: "#38bdf8",
        }}
      />
      <div className="mt-10 text-3xl">Loading...</div>
      <div>Please hold on 😎</div>
    </div>
  );
}
