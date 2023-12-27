import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => await redisClient.connect())();

export default redisClient;

export class Redis {
  /**
   * 从redis数据库中获取数据
   * @param key 键
   * @param value 值
   * @returns
   */
  static async set(key: string, value: string) {
    try {
      await redisClient.set(key, value);
      return {
        key,
        value,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * 从redis数据库中读取数据
   * @param key 键
   * @returns
   */
  static async get(key: string) {
    try {
      const value = await redisClient.get(key);
      return value;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * 从redis数据库中删除一个key
   * @param key
   * @returns
   */
  static async remove(key: string) {
    try {
      const value = await redisClient.del(key);
      if (value) {
        return Promise.resolve();
      } else {
        // 删除失败或不存在
        return Promise.reject("Delete Failed.");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
