import type { Event } from "../types";
import { useDirectus } from "./useDirectus";

/**
 * Custom hook to fetch events from Directus.
 * Optionally filters by category name if provided.
 * Returns event data with related categories and venue details.
 */
export function useEvents(filter?: { category?: string }) {
  // Build filter object for category if provided
  const filters = filter?.category
    ? {
        categories: {
          categories_id: {
            category_name: {
              _eq: filter.category,
            },
          },
        },
      }
    : {};

  // Fetch events with expanded fields for categories and venue
  return useDirectus<Event>("event", {
    fields: [
      "*",
      "categories.categories_id.id",
      "categories.categories_id.category_name",
      "categories.categories_id.sort",
      "venue.*",
      "venue.city.*",
      "venue.city.country.*"
    ],
    filter: filters
  });
}
