import type { Params } from "../types";

// This helper function takes an optional Params object and builds a query string
// suitable for use with Directus API requests. It serializes each parameter,
// joining arrays with commas and stringifying objects, then returns the full query string.
export function buildQuery(params?: Params): string {
  if (!params) return "";
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      query.set(key, value.join(","));
    } else {
      query.set(key, JSON.stringify(value));
    }
  }

  return `?${query.toString()}`;
}