import { getUserInfoAPI } from "@/api/user";
import { Redis } from "..";

export class UserRedis extends Redis {
  /**
   * 通过sessionId获取用户信息
   * @param sessionId sessionId
   * @returns
   */
  static async getUserInfo(sessionId: string) {
    try {
      const token = await this.get(sessionId);
      if (token === null) {
        return null;
      }
      const res = await getUserInfoAPI(token);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
