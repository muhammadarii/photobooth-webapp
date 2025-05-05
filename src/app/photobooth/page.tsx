import Camera from "@/components/parts/Camera";
import Gallery from "@/components/parts/Gallery";

export default function PhotoboothPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col justify-center items-center">
      <h1>Riibooth</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Camera />
        <Gallery />
      </div>
    </div>
  );
}
