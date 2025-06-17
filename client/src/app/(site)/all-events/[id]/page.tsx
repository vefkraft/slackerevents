"use client";
// ------------ Imports ---------------
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// --- hooks --- //
import { useEvents } from "@/hooks/useEvents";
// --- props --- //
import type { Event } from "@/types/index";
// --- components --- //
import MusicEmbed from "@/components/EmbedURL/music/musicEmbed";
import VideoEmbed from "@/components/EmbedURL/video/videoEmbed";
import TicketCounter from "@/components/TicketCounter/ticketCounter";
import Button from "@/components/UI/UniversalButton/button";

// --- constants --- //
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ⚡ Next.js <Image /> for dynamic images
const ImageFromIdOrUrl: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  if (!src || typeof src !== "string" || src.trim() === "") {
    console.warn("ImageFromIdOrUrl received invalid src:", src);
    return null;
  }
  // If src is a URL, use it directly; otherwise, construct the URL
  const imageUrl = src.startsWith("http") ? src : `${API_URL}/assets/${src}`;



  return (
    <div className="relative w-full h-[400px]">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
};

const EventDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id?.toString() ?? "";

  const { data: events, loading, error } = useEvents();
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const event = events?.find((e: Event) => String(e.id) === id);

  const memoizedMusicEmbed = useMemo(() => {
    if (!event?.music_embed_url) return null;
    
    return (
      <div className="mt-4">
        <MusicEmbed embedCode={event.music_embed_url} />
      </div>
    );
  }, [event?.music_embed_url]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p className="">Event not found</p>;

  const handleBuyTicket = () => {
    sessionStorage.setItem("ticket_qty", String(qty));
    sessionStorage.setItem("ticket_total", String(total));
    sessionStorage.setItem("event_id", String(event.id));
    setShowModal(true);
  };



  // Render the event details
  return (
    <div className="margin-0 space-y-4">
      {/* Media */}
      <div className="w-full mx-auto bg-blue-100">
        {event.video_embed_url ? (
          <VideoEmbed embedCode={event.video_embed_url} />
        ) : event.image ? (
          <ImageFromIdOrUrl src={event.image} alt={event.title} />
        ) : (
          <p className="text-gray-500 italic text-center">No media selected</p>
        )}
      </div>

      {/* Event Info */}
      <div className="bg-orange-100 w-full">
        <h2 className="font-bold">{event.title}</h2>
        <p>
          {typeof event.price === "number"
            ? `Price: ${(event.price / 1000).toFixed(3)} ISK`
            : "Gratis"}
        </p>
        <div>
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
        </div>
        {memoizedMusicEmbed}
      </div>

      {/* Description + Ticket */}
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

      {/* Modal  - dummy */}
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
