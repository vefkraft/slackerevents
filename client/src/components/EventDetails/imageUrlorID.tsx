import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  src?: string;
  alt: string;
};

const ImageFromIdOrUrl: React.FC<Props> = ({ src, alt }) => {
  if (!src) return null;

  const imageUrl = src.startsWith("http")
    ? src
    : `${API_URL}/assets/${src}`;

  return <img src={imageUrl} alt={alt} className="max-w-full" />;
};

export default ImageFromIdOrUrl;
