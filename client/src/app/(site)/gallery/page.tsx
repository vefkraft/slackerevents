"use client";

import { useFetchGallery } from "../../../hooks/useGallery";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Gallery } from "../../../types";

export default function GalleryPage() {
  const { gallery, loading, error } = useFetchGallery();
  const [screenSize, setScreenSize] = useState<"mobile" | "md" | "lg" | "xl">(
    "mobile"
  );

  // Screen size detection hook inline
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScreenSize("xl");
      } else if (width >= 1024) {
        setScreenSize("lg");
      } else if (width >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("mobile");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  console.log("Fetched gallery data:", gallery);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl">Loading gallery...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );

  // Function to get the right amount of images based on screen size
  const getDisplayImages = () => {
    if (!gallery || gallery.length === 0) return [];

    const getTargetCount = () => {
      switch (screenSize) {
        case "mobile":
          return 18; // 3 columns × 6 rows
        case "md":
          return 50; // 5 columns × 10 rows
        case "lg":
          return 72; // 6 columns × 12 rows
        case "xl":
          return 98; // 7 columns × 14 rows
        default:
          return 18;
      }
    };

    const targetCount = getTargetCount();
    const displayImages = [];

    // Repeat the gallery items until we have enough images
    while (displayImages.length < targetCount) {
      for (const item of gallery) {
        if (displayImages.length < targetCount) {
          displayImages.push({
            ...item,
            id: `${item.id}-${displayImages.length}`,
          });
        }
      }
    }

    return displayImages.slice(0, targetCount);
  };

  // Get column count and offset pattern
  const getColumnCount = () => {
    switch (screenSize) {
      case "mobile":
        return 3;
      case "md":
        return 5;
      case "lg":
        return 7;
      default:
        return 7;
    }
  };

  // Get uniform height based on screen size
  const getUniformHeight = () => {
    switch (screenSize) {
      case "mobile":
        return 180;
      case "md":
        return 210;
      case "lg":
        return 230;
      default:
        return 230;
    }
  };

  // Get offset heights for each column to create staggered effect
  const getColumnOffsets = (columnCount: number) => {
    const offsets = [];
    for (let i = 0; i < columnCount; i++) {
      // Create different offset heights for staggered effect
      const offsetPatterns = [0, 80, 40, 120, 20, 100, 60, 140]; // Different heights in pixels
      offsets.push(offsetPatterns[i % offsetPatterns.length]);
    }
    return offsets;
  };

  const uniformHeight = getUniformHeight();
  const gap = 8;
  const displayImages = getDisplayImages();
  const columnCount = getColumnCount();
  const columnOffsets = getColumnOffsets(columnCount);

  // Get the maximum offset to crop from the top
  const maxOffset = Math.max(...columnOffsets);

  // Distribute images evenly across columns
  const distributeImagesInColumns = (images: Gallery[], columns: number) => {
    const columnArrays: Gallery[][] = Array.from({ length: columns }, () => []);

    images.forEach((image, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(image);
    });

    return columnArrays;
  };

  const imageColumns = distributeImagesInColumns(displayImages, columnCount);

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-800">
      {/* Flex container for columns - moved up by the maximum offset to crop the top */}
      <div
        className="flex gap-2 h-full"
        style={{
          transform: `translateY(-${maxOffset}px)`,
          height: `calc(100% + ${maxOffset}px)`,
        }}
      >
        {imageColumns.map((columnImages, columnIndex) => (
          <div
            key={columnIndex}
            className="flex-1 flex flex-col"
            style={{ gap: `${gap}px` }}
          >
            {/* Offset spacer div at the top of each column */}
            <div
              style={{ height: `${columnOffsets[columnIndex]}px` }}
              className="flex-shrink-0"
            />

            {/* Images in this column */}
            {columnImages.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer flex-shrink-0"
                style={{ height: `${uniformHeight}px` }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  {item.image ? (
                    <>
                      {/* Maybe we should wrap this in a Link an it navigates to their insta post or previus event*/}
                      <Image
                        src={`http://localhost:8056/assets/${item.image}`}
                        alt={item.title || "Gallery image"}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 180px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-1 text-white bg-black/50 backdrop-blur-[1px]">
                        <h3
                          className="text-ml font-bold mb-1 drop-shadow-lg leading-tight line-clamp-2"
                          style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)" }} // Dynamically adjusts font size
                        >
                          {item.title || "Concert Name"}
                        </h3>
                        <p className="text-xs opacity-90 drop-shadow">
                          {item.date_created
                            ? new Date(item.date_created).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">No Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(!gallery || gallery.length === 0) && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No images yet
          </h3>
          <p className="text-gray-500">
            Your gallery is empty. Add some images to get started.
          </p>
        </div>
      )}
    </div>
  );
}
