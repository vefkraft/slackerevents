"use client";

// -----------------------------
// Imports
// -----------------------------
import Image from "next/image";

// -----------------------------
// Constants
// -----------------------------
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -----------------------------
// Props
// -----------------------------
type Props = {
  src?: string; // Image URL or Directus asset ID
  alt: string;  // Alt text for accessibility
};

/**
 * ImageFromIdOrUrl
 * ----------------
 * Renders an image from a full URL or a Directus asset ID.
 * - If src starts with "http", uses it as a full URL.
 * - Otherwise, builds the URL from the Directus asset ID.
 */
const ImageFromIdOrUrl: React.FC<Props> = ({ src, alt }) => {
  if (!src) return null;

  // Determine the correct image URL
  const imageUrl = src.startsWith("http")
    ? src
    : `${API_URL}/assets/${src}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={600}   // Set a sensible width
      height={400}  // Set a sensible height
      className="w-full h-auto max-w-full object-contain"
    />
  );
};

export default ImageFromIdOrUrl;
