"use client";

import Camera from "@/components/parts/Camera";
import Gallery from "@/components/parts/Gallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PhotoboothPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photosCount, setPhotosCount] = useState<string>("4");
  const [countdown, setCountdown] = useState<string>("3");
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: 1280, height: 720 },
          audio: false,
        });
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera", err);
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = async () => {
    const count = parseInt(photosCount || "1", 10);
    const delay = parseInt(countdown || "0", 10);
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const images: string[] = [];

    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      images.push(canvas.toDataURL("image/png"));
    }

    setCapturedImages(images);
  };

  const handlePrint = () => {
    const win = window.open();
    if (!win) return;

    win.document.write("<html><body>");
    capturedImages.forEach((img) => {
      win.document.write(
        `<img src="${img}" style="max-width: 100%; margin-bottom: 10px;" />`
      );
    });
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col min-h-screen">
      <h1 className="text-4xl text-center font-semibold mb-6">Riibooth</h1>
      <Button
        onClick={() => redirect("/")}
        className="w-fit mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Camera
          photosCount={photosCount}
          setPhotosCount={setPhotosCount}
          countdown={countdown}
          setCountdown={setCountdown}
          videoRef={videoRef}
          canvasRef={canvasRef}
          handleCapture={handleCapture}
        />
        <Gallery capturedImages={capturedImages} handlePrint={handlePrint} />
      </div>
    </div>
  );
}
