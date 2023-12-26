import axios from "axios";
import https from "node:https";

// 创建一个自定义的httpsAgent，忽略SSL证书验证
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

/**
 * 获取用户的token
 * @param code
 * @returns
 */
export const getGithubUserToken = async (
  code: string
): Promise<{ access_token: string; scope: string; token_type: string }> => {
  const url = `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;
  const res = await axios.post(
    url,
    {},
    {
      // 必须开启这个选项，否则会报错Error: unable to verify the first certificate
      httpsAgent,
    }
  );

  if (res.status !== 200) throw new Error("非法的Code!");
  const data = res.data as string;
  if (data.includes("error")) {
    // 获取出现错误
    throw new Error("非法的Code!");
  } else {
    // @ts-ignore 解析响应结果
    return data.split("&").reduce((obj, item) => {
      const [key, value] = item.split("=");
      return {
        ...obj,
        [key]: value ? value : "",
      };
    }, {});
  }
};

/**
 * 根据token获取github用户的信息
 * @param token
 * @returns
 */
export const getGithubUserInfo = async (token: string) => {
  const res = await axios.get<GithubUserInfo>("https://api.github.com/user", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    httpsAgent,
  });

  if (res.status !== 200) throw new Error("请求失败!");

  return res.data;
};
