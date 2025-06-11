import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

type DirectusResponse<T> = {
  data: T[];
};

type Params = {
  fields?: string[];
  filter?: Record<string, any>;
  [key: string]: any;
};

function buildQuery(params?: Params): string {
  if (!params) return "";
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      // fx fields: ["*", "venue.*"]
      query.set(key, value.join(","));
    } else {
      query.set(key, JSON.stringify(value));
    }
  }

  return `?${query.toString()}`;
}

export function useDirectus<T>(collection: string, params?: Params) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = buildQuery(params);
        const res = await fetch(`${API_URL}/items/${collection}${queryString}`);
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
  }, [collection, JSON.stringify(params)]); // re-fetch hvis params ændrer sig

  return { data, loading, error };
}
