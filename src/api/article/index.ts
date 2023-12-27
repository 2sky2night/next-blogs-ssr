import request from "@/utils/request";

/**
 * 客户端发送请求创建帖子
 * @param body
 * @param token
 * @returns
 */
export const postAricleAPI = (body: PostArticleBody, token: string) => {
  return request.post("/article", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
