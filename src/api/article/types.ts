/**
 * 发帖的请求体
 */
interface PostArticleBody {
  title: "string";
  content: "string";
  tids?: number[];
}

/**
 * 帖子的基本信息
 */
interface ArticleBase {
  aid: number;
  authorId: number;
  content: string;
  title: string;
}

/**
 * 标签的基本信息
 */
interface TagBase {
  tag_name: string;
  tid: number;
}

/**
 * 发帖成功的响应结果
 */
type PostArticleResponse = ArticleBase;
