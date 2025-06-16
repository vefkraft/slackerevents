"use client";

// -----------------------------
// Imports
// -----------------------------
import { useEffect, useState } from "react";
import { TicketCounterProps } from "../../types/index";

/**
 * TicketCounter
 * -------------
 * A component for selecting ticket quantity.
 * - Remembers quantity per event in sessionStorage.
 * - Calls onChange callback with quantity and total price.
 */
const TicketCounter: React.FC<TicketCounterProps> = ({
  pricePerTicket,
  eventId,
  onChange,
}) => {
  // State for ticket quantity
  const [quantity, setQuantity] = useState(1);

  // Key for sessionStorage (unique per event)
  const storageKey = `tickets-${eventId}`;

  /**
   * On mount or eventId change:
   * - Load quantity from sessionStorage if available.
   */
  useEffect(() => {
    if (typeof window !== "undefined" && eventId) {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) {
          setQuantity(parsed);
        }
      }
    }
  }, [eventId, storageKey]);

  /**
   * On quantity change:
   * - Save quantity to sessionStorage.
   * - Call onChange callback with new quantity and total price.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(storageKey, String(quantity));
    }
    onChange?.(quantity, quantity * pricePerTicket);
  }, [quantity, storageKey, pricePerTicket, onChange]);

  // Calculate total price
  const total = quantity * pricePerTicket;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Decrement button */}
      <button
        onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        -
      </button>
      {/* Quantity display */}
      <span className="font-bold text-lg">{quantity}</span>
      {/* Increment button */}
      <button
        onClick={() => setQuantity((qty) => qty + 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        +
      </button>
      {/* Total price */}
      <p className="ml-4 text-blue-600 font-semibold">
        {total.toLocaleString("is-IS", { minimumFractionDigits: 2 })} kr.
      </p>
    </div>
  );
};

export default TicketCounter;
