"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RefreshCcwDotIcon } from "lucide-react";

type CameraProps = {
  photosCount?: string;
  setPhotosCount?: React.Dispatch<React.SetStateAction<string>>;
  countdown?: string;
  setCountdown?: React.Dispatch<React.SetStateAction<string>>;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  handleCapture?: () => void;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
};

const Camera: React.FC<CameraProps> = ({
  photosCount,
  setPhotosCount,
  countdown,
  setCountdown,
  videoRef,
  canvasRef,
  handleCapture,
}) => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500">riibooth by @muhammadari</p>

      <div className="flex gap-4 my-4">
        <Select value={photosCount} onValueChange={setPhotosCount}>
          <SelectTrigger>
            <SelectValue placeholder="Photos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8 Photos</SelectItem>
            <SelectItem value="6">6 Photos</SelectItem>
            <SelectItem value="4">4 Photos</SelectItem>
            <SelectItem value="2">2 Photos</SelectItem>
            {/* <SelectItem value="1">1 Photo</SelectItem> */}
          </SelectContent>
        </Select>

        <Select value={countdown} onValueChange={setCountdown}>
          <SelectTrigger>
            <SelectValue placeholder="Countdown" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2s Delay</SelectItem>
            <SelectItem value="3">3s Delay</SelectItem>
            <SelectItem value="5">5s Delay</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          className="border-4 border-black rounded-2xl shadow-2xl w-full"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <div className="flex gap-4 my-4 justify-center">
        <Button onClick={handleCapture}>Capture</Button>
        <Button
          size="icon"
          onClick={() => window.location.reload()}
          aria-label="Refresh"
        >
          <RefreshCcwDotIcon />
        </Button>
        <canvas ref={canvasRef} width={640} height={480} className="hidden" />
      </div>
    </div>
  );
};

export default Camera;
