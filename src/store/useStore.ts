import { create } from "zustand";

type ImageStore = {
  capturedImages: string[];
  setCapturedImages: (images: string[]) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  capturedImages: [],
  setCapturedImages: (images) => set({ capturedImages: images }),
}));
