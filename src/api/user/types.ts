/**
 * 使用github登录的请求体
 */
interface LoginWithGithubBody {
  username: string;
  uid: number;
  avatar_url: string;
}

/**
 * 登录的响应结果
 */
interface LoginResponse {
  access_token: string;
}

/**
 * 校验token的响应结果
 */
type VerifyTokenResponse = null;

/**
 * 用户信息的响应结果
 */
type UserInfoResponse = LoginWithGithubBody;
