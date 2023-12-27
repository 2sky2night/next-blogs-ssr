import { getUserInfoAPI } from "@/api/user";
import UserInfoMenu from "../UserInfoMenu";

// 服务端中渲染右侧操作按钮
export default async function RightAction({ token }: { token: string }) {
  let res = await getUserInfoAPI(token);
  return <UserInfoMenu {...res.data} />;
}
