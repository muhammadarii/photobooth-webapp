"use client";
import React, { useEffect, useRef } from "react";
const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: 1280,
            height: 720,
          },
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
      if (videoElement?.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        className="border-3 border-black rounded-2xl shadow-2xl"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
};

export default Camera;
