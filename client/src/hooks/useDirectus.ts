"use client";

import { useState, useEffect, useMemo } from "react";
import type { Params, DirectusResponse } from "../types";
import { buildQuery } from "./queryHelpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

export function useDirectus<T>(collection: string, params?: Params) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Memoize query string to avoid ESLint whining
  const queryString = useMemo(() => buildQuery(params), [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        // Add authentication token if available
        if (DIRECTUS_TOKEN) {
          headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
        }

        const res = await fetch(`${API_URL}/items/${collection}${queryString}`, {
          headers,
          credentials: 'include', // Include cookies if needed
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || `Fetch failed: ${res.statusText}`);
        }
        
        const json: DirectusResponse<T> = await res.json();
        setData(json.data);
      } catch (err: unknown) {
        console.error('Directus fetch error:', err);
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection, queryString]);

  return { data, loading, error };
}
