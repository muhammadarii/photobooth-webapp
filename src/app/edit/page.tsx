"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useImageStore } from "@/store/useStore";

export default function EditPage() {
  const [images, setImages] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("#f5f5f5");
  const [title, setTitle] = useState("My Event Photos");
  const captureRef = useRef<HTMLDivElement>(null);
  const { capturedImages } = useImageStore();

  useEffect(() => {
    if (capturedImages.length > 0) {
      setImages(capturedImages);
    } else {
      const stored = localStorage.getItem("capturedImages");
      if (stored) {
        setImages(JSON.parse(stored));
      }
    }
  }, [capturedImages]);

  useEffect(() => {
    if (capturedImages.length > 0) {
      localStorage.setItem("capturedImages", JSON.stringify(capturedImages));
    }
  }, [capturedImages]);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 2,
    });

    const fileName = title
      ? `${title.replace(/\s+/g, "-")}.png`
      : "photo-collage.png";
    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 space-y-6">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-1 rounded"
          placeholder="Enter title"
        />
        <button
          onClick={handleDownload}
          className="ml-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Download
        </button>
      </div>
      <div
        ref={captureRef}
        className="p-6 rounded-2xl border shadow-lg max-w-4xl mx-auto"
        style={{ backgroundColor: bgColor }}
      >
        <h1 className="text-center text-2xl font-bold mb-4">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border-4 border-white shadow-md"
            >
              {/* Gunakan <img> biasa jika menggunakan base64 */}
              <img
                src={img}
                alt={`img-${idx}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
