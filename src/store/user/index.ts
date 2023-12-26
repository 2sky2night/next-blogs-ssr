import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  token: string | null;
  user: UserInfo;
  setToken(token: string | null): void;
  setUser(user: UserInfo): void;
  cleanUser(): void;
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
      };
    },
    {
      name: "user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
