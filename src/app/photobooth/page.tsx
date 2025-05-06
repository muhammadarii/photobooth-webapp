"use client";
import Camera from "@/components/parts/Camera";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default function PhotoboothPage() {
  return (
    <div className="bg-gray-100 p-4 flex flex-col">
      <h1 className="text-4xl text-center font-semibold">Riibooth</h1>
      <Button
        onClick={() => redirect("/")}
        className="items-center justify-center cursor-pointer"
        style={{ width: "fit-content" }}
      >
        <ArrowLeft />
        Back
      </Button>
      <div className="grid grid-cols-2 mt-10 gap-4">
        <Camera />
      </div>
    </div>
  );
}
