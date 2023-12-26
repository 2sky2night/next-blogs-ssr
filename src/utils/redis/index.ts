import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

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
      await redisClient.connect();
      await redisClient.set(key, value);
      await redisClient.disconnect();
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
      await redisClient.connect();
      const value = await redisClient.get(key);
      await redisClient.disconnect();
      return value;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
