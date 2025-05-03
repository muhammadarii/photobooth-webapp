import { create } from "zustand";
import { persist } from "zustand/middleware";

type Photo = {
  id: string;
  image: string;
  timeStamp: Date;
  filter?: string;
};

type PhotoboothState = {
  photos: Photo[];
  addPhoto: (image: string, filter?: string) => void;
  removePhoto: (id: string) => void;
  clearPhotos: () => void;
};

export const usePhotoboothStore = create<PhotoboothState>()(
  persist(
    (set) => ({
      photos: [],
      addPhoto: (image, filter) =>
        set((state) => ({
          photos: [
            ...state.photos,
            {
              id: Date.now().toString(),
              image,
              timeStamp: new Date(),
              filter,
            },
          ],
        })),
      removePhoto: (id) =>
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id),
        })),
      clearPhotos: () => set({ photos: [] }),
    }),
    {
      name: "photobooth-storage",
    }
  )
);
