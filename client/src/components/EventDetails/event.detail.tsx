"use client";
// -----------------------------
// Imports
// -----------------------------
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEvents } from "../../hooks/useEvents";
import type { Event } from "../../types";
import MusicEmbed from "../EmbedURL/music/musicEmbed";
import VideoEmbed from "../EmbedURL/video/videoEmbed";
import TicketCounter from "../TicketCounter/ticketCounter";
import Button from "../UI/UniversalButton/button";

// -----------------------------
// Constants
// -----------------------------
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -----------------------------
// Helper: Render image from URL or Directus asset ID
// -----------------------------
const ImageFromIdOrUrl: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  if (!src || typeof src !== "string" || src.trim() === "") {
    console.warn("ImageFromIdOrUrl received invalid src:", src);
    return null;
  }
  const imageUrl = src.startsWith("http") ? src : `${API_URL}/assets/${src}`;
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="contain"
        unoptimized // Remove if you have a custom image loader
        priority
      />
    </div>
  );
};

/**
 * EventDetail
 * -----------
 * Shows all details for a single event, including media, info, description, ticket counter, and modal.
 */
const EventDetail: React.FC = () => {
  // Get event ID from URL params
  const params = useParams();
  const id = params?.id?.toString() ?? "";

  // Fetch all events
  const { data: events, loading, error } = useEvents();

  // State for ticket quantity, total price, and modal visibility
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Find the current event by ID
  const event = events?.find((e: Event) => String(e.id) === id);

  // Memoized music embed (only renders if event.music_embed_url changes)
  const memoizedMusicEmbed = useMemo(() => {
    if (!event?.music_embed_url) return null;
    return (
      <div className="mt-4">
        <MusicEmbed embedCode={event.music_embed_url} />
      </div>
    );
  }, [event?.music_embed_url]);

  // Handle loading and error states
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p className="text-red-500">Event not found 😵</p>;

  // Handle ticket purchase (opens modal and stores info in sessionStorage)
  const handleBuyTicket = () => {
    sessionStorage.setItem("ticket_qty", String(qty));
    sessionStorage.setItem("ticket_total", String(total));
    sessionStorage.setItem("event_id", String(event.id));
    setShowModal(true);
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="margin-0 space-y-4">
      {/* Media section: video, image, or fallback */}
      <div className="w-full mx-auto bg-blue-100">
        {event.video_embed_url ? (
          <VideoEmbed embedCode={event.video_embed_url} />
        ) : event.image ? (
          <ImageFromIdOrUrl src={event.image} alt={event.title} />
        ) : (
          <p className="text-gray-500 italic text-center">No media selected</p>
        )}
      </div>

      {/* Event Info section */}
      <div className="bg-orange-100 w-full">
        <h2 className="font-bold">{event.title}</h2>
        <p>
          {typeof event.price === "number"
            ? `Price: ${(event.price / 1000).toFixed(3)} ISK`
            : "Gratis"}
        </p>
        <p>
          {event.venue?.place}, {event.venue?.city?.city_name ?? "No city specified"}
        </p>
        <p>
          {new Date(event.start_date || "").toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {memoizedMusicEmbed}
      </div>

      {/* Description and Ticket Counter section */}
      <div className="bg-red-100 w-full h-[400px]">
        <h2 className="font-bold">Description</h2>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
        <TicketCounter
          pricePerTicket={event.price || 0}
          eventId={String(event.id)}
          onChange={(newQty, newTotal) => {
            setQty(newQty);
            setTotal(newTotal);
          }}
        />
        <Button variant="secondary" onClick={handleBuyTicket} disabled={qty < 1}>
          Buy Ticket
        </Button>
      </div>

      {/* Modal for confirming ticket purchase */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ready for payment</h2>
            <p>Tickets: {qty}</p>
            <p>Total price: {total} ISK</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
