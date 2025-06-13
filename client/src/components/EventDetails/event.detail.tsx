import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../hooks/useEvents";
import type { Event } from "../../hooks/useEvents";
import MusicEmbed from "../EmbedURL/music/musicEmbed";
import VideoEmbed from "../EmbedURL/video/videoEmbed";
import TicketCounter from "../TicketCounter/ticketCounter";

const API_URL = import.meta.env.VITE_API_URL;

const ImageFromIdOrUrl: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  if (!src || typeof src !== "string" || src.trim() === "") {
    console.warn("ImageFromIdOrUrl modtog ugyldig src:", src);
    return null;
  }

  const imageUrl = src.startsWith("http") ? src : `${API_URL}/assets/${src}`;

  return <img src={imageUrl} alt={alt} className="max-w-full max-h-[400px] object-contain" />;
};

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const { data: events, loading, error } = useEvents();

  const [qty, setQty] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);

  // Find event udenfor betingelser
  const event = events?.find((e: Event) => String(e.id) === id);

  // Memoize MusicEmbed så den ikke re-render på qty/total change
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
  if (!event) return <p className="text-red-500">Event ikke fundet 😵</p>;

  // Handler til Buy Ticket
  const handleBuyTicket = () => {
    sessionStorage.setItem("ticket_qty", String(qty));
    sessionStorage.setItem("ticket_total", String(total));
    sessionStorage.setItem("event_id", String(event.id));
    setShowModal(true); // Åbn modal i stedet for navigate
  };

  return (
    <div className="margin-0 space-y-4">

      {/* Wrapper top section */}
      <div className="w-full mx-auto bg-blue-100">
        {event.video_embed_url ? (
          <VideoEmbed embedCode={event.video_embed_url} />
        ) : typeof event.image === "string" && event.image.trim() !== "" ? (
          <ImageFromIdOrUrl src={event.image} alt={event.title} />
        ) : (
          <p className="text-gray-500 italic text-center">Intet medie valgt</p>
        )}
      </div>

      {/* Wrapper - middle section */}
      <div className="bg-orange-100 w-full">
        <h2 className="font-bold">{event.title}</h2>
        <p>
          {typeof event.price === "number"
            ? `Price: ${(event.price / 1000).toFixed(3)} ISK`
            : "Gratis"}
        </p>

        {/* Wrapper */}
        <div>
          {/* Address */}
          <div>
            <img src="#" alt="location-pin" />
            <p>
              {event.venue?.place}, {event.venue?.city?.city_name ?? "Ingen by angivet"}
            </p>
          </div>

          {/* Date & Time */}
          <div>
            <img src="#" alt="calender" />
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
        </div>

        {/* Spotify embed - memoized */}
        {memoizedMusicEmbed}
      </div>

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
            console.log("Tickets", newQty, "Total:", newTotal);
          }}
        />

        <button onClick={handleBuyTicket} disabled={qty < 1}>
          Buy Ticket
        </button>
      </div>

      {/* Modal for betaling */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Klar til betaling</h2>
            <p>Antal billetter: {qty}</p>
            <p>Total pris: {total} ISK</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Luk
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;