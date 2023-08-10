import { create } from "zustand";

type AuthType = "Login" | "Register";

interface AuthModalStore {
  isOpen: boolean;
  type?: AuthType;
  onClose: () => void;
  onOpen: (type: AuthType) => void;
  setType: (type: AuthType) => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  type: undefined,
  onClose: () => set({ isOpen: false }),
  onOpen: (type: AuthType) => set({ isOpen: true, type }),
  setType: (type: AuthType) => set({ type }),
}));

export default useAuthModal;
