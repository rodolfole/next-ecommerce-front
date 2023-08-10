import { create } from "zustand";

import { IProduct } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: IProduct;
  onOpen: (data: IProduct) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: IProduct) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
