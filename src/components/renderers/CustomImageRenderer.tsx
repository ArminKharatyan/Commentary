"use client";

import Image from "next/image";

interface ImageData {
  file: {
    url: string;
  };
}

function CustomImageRenderer({ data }: { data: ImageData }) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image
        alt="image"
        className="object-contain"
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        src={src}
        priority
      />
    </div>
  );
}

export default CustomImageRenderer;
