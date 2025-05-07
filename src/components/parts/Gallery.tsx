import React from "react";
import { Button } from "../ui/button";

type GalleryProps = {
  capturedImages: string[];
  handlePrint: () => void;
};

const Gallery: React.FC<GalleryProps> = ({ capturedImages, handlePrint }) => {
  return (
    <div className="flex flex-col items-center">
      {capturedImages.length > 0 && (
        <div className="my-4">
          <h2 className="text-lg font-bold mb-2">Captured Images</h2>
          <div className="w-[600px] rounded-2xl py-10 px-5 shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              {capturedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Captured ${idx}`}
                  className="rounded border object-contain "
                />
              ))}
            </div>
          </div>
          <Button className="mt-10" onClick={handlePrint}>
            Cetak / Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
