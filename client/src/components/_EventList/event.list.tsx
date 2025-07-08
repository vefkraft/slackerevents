"use client";
// ------------ Imports ---------------
import type { Category, Event } from "@/types";
import { useEvents } from "@/hooks/useEvents";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/components/UI/UniversalButton/button";
import Link from "next/link";

// ------------ Props ---------------
type EventsProps = {
  onCheckout: (data: { event: Event; qty: number; total: number }) => void;
};

/**
 * Events
 * ------
 * Displays a list of events with category filtering and ticket purchase.
 */
export default function Events({ onCheckout }: EventsProps) {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Fetch categories and events
  const { data: categories, loading: loadingCategories } = useCategories();
  const { data: events, loading: loadingEvents, error } = useEvents(
    selectedCategory ? { category: selectedCategory.category_name } : undefined
  );

  // Loading and error states
  if (loadingCategories || loadingEvents) return <p>⏳ Loading…</p>;
  if (error) return <p>❌ {error}</p>;
  if (!events?.length) return <p>⚠️ No events found.</p>;

  // Sort categories by their sort order
  const sortedCategories = [...(categories ?? [])].sort(
    (a, b) => (typeof a.sort === "number" ? a.sort : Infinity) -
              (typeof b.sort === "number" ? b.sort : Infinity)
  );

// ------------ Render ---------------
  return (
    <div>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {sortedCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded ${
              selectedCategory?.id === cat.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Event grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-xl shadow p-4 bg-white hover:shadow-md transition"
          >
            {/* Event details and link */}
            <Link href={`/all-events/${event.id}`}>
              <h3 className="text-lg font-semibold mb-2 underline">
                {event.title}
              </h3>
              <p>{event.venue?.address}</p>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(event.start_date ?? "").toLocaleDateString("IS", {
                  day:   "numeric",
                  month: "long",
                  hour:  "2-digit",
                  minute:"2-digit",
                })}
                {event.end_date ? ` → ${event.end_date.split("T")[0]}` : ""}
              </p>
            </Link>

            {/* Ticket purchase and categories */}
            <div className="flex gap-2 flex-wrap mt-2 items-center">
              <Button
                variant="primary"
                onClick={e => {
                  e.stopPropagation();
                  onCheckout({
                    event,
                    qty: 1,
                    total: event.price ?? 0,
                  });
                }}
              >
                Buy Ticket
              </Button>
              {/* Event categories */}
              {event.categories?.map((c) => (
                <span
                  key={c.categories_id.id}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {c.categories_id.category_name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
