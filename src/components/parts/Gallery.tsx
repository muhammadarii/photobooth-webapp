"use client";

import { usePhotoboothStore } from "@/store/useStore";
import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/types";
import Modal from "../ui/Modal";

export default function Gallery() {
  const { photos, removePhoto, clearPhotos } = usePhotoboothStore();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Galeri Foto</h2>
        {photos.length > 0 && (
          <button
            onClick={clearPhotos}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {photos.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada foto</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-full h-48">
                <Image
                  src={photo.image}
                  alt={`Photobooth ${new Date(
                    photo.timeStamp
                  ).toLocaleString()}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-lg"
                  unoptimized // opsional jika tidak pakai domain di next.config.js
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id);
                  }}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <div className="p-4">
            <div className="relative w-full max-w-3xl h-[80vh] mx-auto">
              <Image
                src={selectedPhoto.image}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <p>
                Diambil pada:{" "}
                {new Date(selectedPhoto.timestamp).toLocaleString()}
              </p>
              <p>Filter: {selectedPhoto.filter || "Tidak ada"}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
