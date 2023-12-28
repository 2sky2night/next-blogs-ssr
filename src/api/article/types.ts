/**
 * 发帖的请求体
 */
interface PostArticleBody {
  title: string;
  content: string;
  tids: number[];
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
 * 帖子详情信息
 */
interface Article extends ArticleBase {
  user: UserInfo;
  tags: TagBase[];
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

/**
 * 获取全部标签的响应结果
 */
type TagsAllResponse = TagBase[];

/**
 * 分页查询帖子的响应结果
 */
interface GetArtilesResponse {
  has_more: boolean;
  limit: number;
  list: ArticleBase[];
  offset: number;
  total: number;
}

/**
 * 查询帖子的详情结果
 */
type AticleInfoResponse = Article;

/**
 * 查询标签下的帖子的响应结果
 */
type GetArticlesByTidResponse = ArticleBase[];
