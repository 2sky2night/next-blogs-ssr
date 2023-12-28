import request from "@/utils/request";

/**
 * 客户端发送请求创建帖子
 * @param body
 * @param token
 * @returns
 */
export const postAricleAPI = (body: PostArticleBody, token: string) => {
  if (body.tids.length === 0) {
    Reflect.deleteProperty(body, "tids");
  }
  return request.post("/article", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * 获取全部标签
 * @returns
 */
export const getAllTagsAPI = () => {
  return request.get<TagsAllResponse>("/tag");
};

/**
 * 分页获取帖子
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getArticlesAPI = (pageNum: number = 1, pageSize: number = 10) => {
  return request.get<GetArtilesResponse>("/article/list", {
    params: {
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    },
  });
};

/**
 * 获取帖子详细
 * @param aid 帖子id
 * @returns
 */
export const getArticleInfoAPI = (aid: number) => {
  return request.get<AticleInfoResponse>(`/article/info/${aid}`);
};

/**
 * 获取帖子基本信息
 * @param aid 帖子id
 * @returns
 */
export const getArticleAPI = (aid: number) => {
  return request.get<ArticleBase>(`/article/base/${aid}`);
};

/**
 * 根据标签id获取文章列表
 * @param tid
 * @returns
 */
export const getArticlesByTid = (tid: number) => {
  return request.get<GetArticlesByTidResponse>(`/article/tag/${tid}`);
};

/**
 * 获取标签信息
 * @param tid
 * @returns
 */
export const getTagInfo = (tid: number) => {
  return request.get<TagBase>(`/tag/${tid}`);
};
