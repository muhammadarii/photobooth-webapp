import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import TextPressure from "@/components/ui/TextPressure";
import { CameraIcon, HeartIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div className="w-[500px] h-auto bg-white/50 backdrop-blur-md rounded-2xl border-[1px] border-black mt-10">
        <div className="flex flex-col items-center justify-items-center text-[12px] m-10 font-semibold ">
          <p>Thank you for your support!</p>
          <p>Version 0.1</p>
        </div>
      </div>
      <div
        style={{ position: "relative", height: "410px" }}
        className="cursor-pointer"
      >
        <TextPressure
          text="Riibooth"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#000000"
          strokeColor="#ff0000"
          minFontSize={400}
        />
        <div className="animate-pulse">
          <p className="text-center">digital photobooth by muhammad ari</p>
          <p className="text-center">
            this website is a dedication to patricia louraine, my love
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-4 items-center mt-10">
        <Link href="/photobooth">
          <Button className="mt-5 rounded-full" size={"lg"}>
            Start
            <CameraIcon />
          </Button>
        </Link>
        <Button className="mt-5 rounded-full" size={"icon"}>
          <HeartIcon />
        </Button>
      </div>
      <Marquee
        speed={100}
        gradient={false}
        loop={0}
        style={{ width: "25%" }}
        className="mt-10"
      >
        <p className="text-center font-semibold">
          take your photos with us/it&apos;s free/riibooth/thank you/
        </p>
      </Marquee>
    </div>
  );
};

export default HomePage;
