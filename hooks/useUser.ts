import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ICurrentUser } from "@/types";

interface UserStore {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
}

const useUser = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: ICurrentUser | null) => {
        set({ user });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUser;
