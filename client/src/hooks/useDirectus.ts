import { useState, useEffect, useMemo } from "react";
import type { Params, DirectusResponse } from "../types";
import { buildQuery } from "./queryHelpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function useDirectus<T>(collection: string, params?: Params) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Memoize query string to avoid ESLint whining
  const queryString = useMemo(() => buildQuery(params), [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [collection, queryString]); // ✅ simple + memoized deps

  return { data, loading, error };
}
