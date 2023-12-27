import request from "@/utils/request";

/**
 * github登录
 * @param githubToken
 * @param body
 * @returns
 */
export const loginWithGithubAPI = (
  githubToken: string,
  body: LoginWithGithubBody
) => {
  return request.post<LoginResponse>("/auth/login/github", body, {
    headers: {
      Authorization: githubToken,
    },
  });
};

/**
 * 校验token
 * @param token
 * @returns
 */
export const verifyTokenAPI = (token: string) => {
  return request.get<VerifyTokenResponse>("/auth/verifyToken", {
    headers: {
      Authorization: token,
    },
  });
};

/**
 * 通过token获取用户信息
 * @param token token信息
 * @returns 
 */
export const getUserInfoAPI = (token: string) => {
  return request.get<UserInfoResponse>("/auth/info", {
    headers: {
      Authorization: token,
    },
  });
};
