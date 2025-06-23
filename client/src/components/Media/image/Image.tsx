"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  src?: string;
  alt: string;
};


//* This component let you use either a Directus asset ID or a full URL to display an image. 
const ImageFromIdOrUrl: React.FC<Props> = ({ src, alt }) => {
  if (!src) return null;

  const imageUrl = src.startsWith("http") ? src : `${API_URL}/assets/${src}`;

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <img
        src={imageUrl}
        alt={alt}
        style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
      />
    </div>
  );
};

export default ImageFromIdOrUrl;
