import { useEvents } from "../../hooks/useEvents";
import { useCategories } from "../../hooks/useCategories";
import { useState } from "react";
import type { Category } from "../../types";
import { useNavigate } from "react-router-dom";

/**
 * Event list component.
 * Shows category filters and a grid of events.
 * Clicking an event navigates to its detail page.
 */
const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const { data: categories, loading: loadingCategories } = useCategories();
  const { data: events, loading: loadingEvents, error } = useEvents(
    selectedCategory ? { category: selectedCategory.category_name } : undefined
  );

  // Loading and error states
  if (loadingCategories || loadingEvents) return <p>⏳ Loading...</p>;
  if (error) return <p>❌ Something went wrong: {error}</p>;
  if (!events?.length) return <p>⚠️ No events found.</p>;

  // Sort categories by their sort value (nulls last)
  const sortedCategories = [...(categories || [])].sort(
    (a, b) => (typeof a.sort === "number" ? a.sort : Infinity) - (typeof b.sort === "number" ? b.sort : Infinity)
  );

  return (
    <div>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          All
        </button>
        {sortedCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded ${selectedCategory?.id === cat.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
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
            className="border rounded-xl shadow p-4 bg-white hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {event.start_date?.split("T")[0]}
              {event.end_date ? ` → ${event.end_date.split("T")[0]}` : ""}
            </p>
            <div className="flex gap-2 flex-wrap mt-2">
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
};

export default Events;
