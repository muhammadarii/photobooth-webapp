import Camera from "@/components/parts/Camera";
import Link from "next/link";

export default function PhotoboothPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Photobooth App</h1>

        <Camera />

        <div className="mt-8 flex justify-center">
          <Link
            href="/photobooth/gallery"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Lihat Galeri
          </Link>
        </div>
      </div>
    </div>
  );
}
