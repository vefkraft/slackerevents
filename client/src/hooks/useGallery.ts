import { useState, useEffect } from "react";
import { useDirectus } from "./useDirectus";
import type { Gallery } from "../types";

export function useFetchGallery() {
  const [gallery, setGallery] = useState<Gallery[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const directus = useDirectus<Gallery>("gallery");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setGallery(directus.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [directus]);

  return { gallery, loading, error };
}