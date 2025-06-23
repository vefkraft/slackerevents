"use client";
// ------------ Imports ---------------
import Events from "@/components/EventList/event.list";
import { useState } from "react";
import type { Event } from "@/types";

/**
 * EventListPage
 * -------------
 * Displays all events and handles ticket purchase modal.
 */
export default function EventListPage() {
  // State for modal: holds event, quantity, and total price
  const [modal, setModal] = useState<null | { event: Event; qty: number; total: number }>(null);

  return (
    <>
      {/* Event list with checkout handler */}
      <Events onCheckout={(data) => setModal(data)} />





      {/* Simulated payment modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Simulated Payment Modal</h2>
            <p className="mb-2">
              Event: <b>{modal.event.title}</b>
            </p>
            <p className="mb-2">
              Tickets: <b>{modal.qty}</b>
            </p>
            <p className="mb-4">
              Total: <b>{modal.total} kr.</b>
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
