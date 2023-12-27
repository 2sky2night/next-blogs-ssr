import { NEXT_API } from "@/config";
import request from "@/utils/request";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  token: string | null;
  user: UserInfo;
  /**
   * 设置token
   * @param token
   */
  setToken(token: string | null): void;
  /**
   * 设置user
   * @param user
   */
  setUser(user: UserInfo): void;
  /**
   * 清空user
   */
  cleanUser(): void;
  /**
   * 登出
   */
  logout(): Promise<void>;
}

export const useUserStore = create(
  persist<State>(
    (set) => {
      return {
        token: null,
        user: {
          uid: 0,
          username: "",
          avatar_url: "",
        },
        setToken(token) {
          set((state) => ({ ...state, token }));
        },
        setUser(user) {
          set((state) => ({ ...state, user }));
        },
        cleanUser() {
          set((state) => {
            return {
              ...state,
              user: {
                uid: 0,
                username: "",
                avatar_url: "",
              },
            };
          });
        },
        async logout() {
          try {
            // 注销
            await fetch(NEXT_API + "/auth/logout", { method: "POST" });
            // 清空用户数据
            set((state) => {
              return {
                ...state,
                user: {
                  avatar_url: "",
                  uid: 0,
                  username: "",
                },
                token: "",
              };
            });
          } catch (error) {
            return Promise.reject(error);
          }
        },
      };
    },
    {
      name: "user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
