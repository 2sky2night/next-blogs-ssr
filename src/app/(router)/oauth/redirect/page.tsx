import { getGithubUserInfo, getGithubUserToken } from "@/lib/user";
import Login from "./components/Login";

interface Props {
  params: Record<string, string>;
  searchParams: {
    /**
     * github的授权码
     */
    code?: string;
  };
}

export default async function OAuth({ searchParams }: Props) {
  if (searchParams.code) {
    // 获取githubtoken
    const { access_token } = await getGithubUserToken(searchParams.code);
    // 获取github用户信息
    const userInfo = await getGithubUserInfo(access_token);

    return (
      <div className="h-full flex flex-col items-center pt-20">
        <img
          alt={`${userInfo.login}'s avatar`}
          width={300}
          height={300}
          className="object-contain rounded-full"
          src={userInfo.avatar_url}
        ></img>
        <h1 className="mt-7 text-4xl select-none cursor-context-menu">
          Hello,{userInfo.login}
        </h1>
        <Login
          token={access_token}
          body={{
            username: userInfo.login,
            uid: userInfo.id,
            avatar_url: userInfo.avatar_url,
          }}
        />
      </div>
    );
  } else {
    throw new Error("未携带必要的参数!");
  }
}
