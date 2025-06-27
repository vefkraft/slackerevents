"use client";
// ------------ Imports ---------------
import { useState } from "react";
import { useParams } from "next/navigation";
//* Hooks & Types
import type { Event } from "../../types";
import { useEvents } from "../../hooks/useEvents";
//* Media Components
import ImageUrlorID from "@/components/Media/image/ImageUrlorID";
import MusicEmbed from "@/components/Media/music/musicEmbed";
import VideoPlayer from "@/components/Media/video/videoEmbed";
//* Components
import TicketCounter from "../_TicketCounter/ticketCounter";
import Button from "../UI/UniversalButton/button";



/**
 * EventDetail
 * -----------
 * Shows all details for a single event, including media, info, description, ticket counter, and modal.
 */
const EventDetail: React.FC = () => {

  const params = useParams();
  const id = params?.id?.toString() ?? "";

  const { data: events, loading, error } = useEvents();

  
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  
  const event = events?.find((e: Event) => String(e.id) === id);
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p className="text-red-500">Event not found 😵</p>;

  const handleBuyTicket = () => {
    sessionStorage.setItem("ticket_qty", String(qty));
    sessionStorage.setItem("ticket_total", String(total));
    sessionStorage.setItem("event_id", String(event.id));
    setShowModal(true);
  };
  

  return (
  <>

    {/* ---------- Section Top ---------- */}
    <div className="margin-0 space-y-4">
      <div className="w-full mx-auto bg-blue-100">
        {event.video ? (
          <VideoPlayer src={event.video} />
        ) : event.image ? (
          <div className="relative w-full">
            <ImageUrlorID src={event.image} alt={event.title} />
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">No media selected</p>
        )}
      </div>

      
      {/* ---------- Section Middle ---------- */}
      <div className="bg-blue-600 w-full">

        <h2>hallo
        </h2>

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
        

        {event.spotify_url && (
          
          <div className="mt-4">   
            <MusicEmbed embedCode={event.spotify_url} />
          </div>
        )}

      </div>


      {/* ---------- Section Bottom ---------- */}
      <div className="bg-violet-800 w-full h-[400px]">

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

  </>
  );
};

export default EventDetail;
