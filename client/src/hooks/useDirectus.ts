// Custom React hook for fetching data from a Directus collection.
// It builds a query string from the provided params, fetches data from the API,
// and manages loading and error state. Returns the fetched data, loading, and error status.
import { useState, useEffect } from "react";
import type { Params, DirectusResponse } from "../types";
import { buildQuery } from "./queryHelpers";

const API_URL = import.meta.env.VITE_API_URL as string;

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
  }, [collection, JSON.stringify(params)]); // re-fetch if params or collection changes

  return { data, loading, error };
}
