"use client";

import { useRef, useState, useEffect } from "react";
import { usePhotoboothStore } from "@/store/useStore";
import { applyFilter } from "@/lib/filters";
import { Button } from "../ui/button";
export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("none");
  const [countdown, setCountdown] = useState<number | null>(null);
  const { addPhoto } = usePhotoboothStore();

  // Memulai kamera
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Countdown untuk mengambil foto
  useEffect(() => {
    if (countdown === null) return;

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        takePhoto();
        setCountdown(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas size sama dengan video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Gambar frame video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Terapkan filter jika ada
    if (currentFilter !== "none") {
      applyFilter(context, canvas.width, canvas.height, currentFilter);
    }

    // Simpan ke state
    const imageData = canvas.toDataURL("image/jpeg");
    addPhoto(imageData, currentFilter);
  };

  const startCountdown = () => {
    setCountdown(3); // 3 detik countdown
  };

  const changeFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`rounded-lg ${currentFilter}-filter`}
        />
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white">
            {countdown}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex gap-4">
        <Button onClick={startCountdown} disabled={countdown !== null}>
          {countdown !== null ? "Mengambil foto..." : "Ambil Foto"}
        </Button>

        <select
          value={currentFilter}
          onChange={(e) => changeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option value="none">Normal</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
        </select>
      </div>
    </div>
  );
}
