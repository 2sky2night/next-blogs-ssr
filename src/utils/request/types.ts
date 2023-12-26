/**
 * 后端服务器响应的根结果
 */
interface BaseResponse {
  msg: string;
  code: number;
}

/**
 * 后端服务器的响应结果
 */
interface RResponse<T> extends BaseResponse {
  data: T;
}
