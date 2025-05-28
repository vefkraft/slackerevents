import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

type DirectusResponse<T> = {
  data: T[];
};

export function useDirectus<T>(collection: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/items/${collection}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
        const json: DirectusResponse<T> = await res.json();
        setData(json.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection]);

  return { data, loading, error };
}
