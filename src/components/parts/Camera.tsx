"use client";
import { Select } from "@radix-ui/react-select";
import React, { useEffect, useRef } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RefreshCcwDotIcon } from "lucide-react";
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
      <p>riibooth by@muhammadari</p>
      <div className="flex flex-row gap-4 my-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Photos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">6 Photos</SelectItem>
            <SelectItem value="2">4 Photos</SelectItem>
            <SelectItem value="3">2 Photos</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Countdown" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1s Delay</SelectItem>
            <SelectItem value="2">3s Delay</SelectItem>
            <SelectItem value="3">5s Delay</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <video
        ref={videoRef}
        autoPlay
        className="border-3 border-black rounded-2xl shadow-2xl"
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="flex flex-row gap-4 my-4">
        <Button>Capture</Button>
        <Button size={"icon"} aria-placeholder="Refresh">
          <RefreshCcwDotIcon />
        </Button>
      </div>
    </div>
  );
};

export default Camera;
