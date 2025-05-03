import Gallery from "@/components/parts/Gallery";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Galeri Photobooth</h1>
          <Link
            href="/photobooth"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Kembali ke Kamera
          </Link>
        </div>

        <Gallery />
      </div>
    </div>
  );
}
