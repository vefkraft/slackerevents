import React from "react";
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

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  const event = events?.find((e: Event) => String(e.id) === id);

  if (!event) return <p className="text-red-500">Event ikke fundet 😵</p>;

  console.log("Event:", event);
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
        <h2 className="font-bold"
        >
          {event.title}
        </h2>
        <p>
          {event.price ? `Price: ${event.price} ISK` : "Gratis"}
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

        {/* Spotify embed */}
        {event.music_embed_url && (
          <div className="mt-4">
            <MusicEmbed embedCode={event.music_embed_url} />
          </div>
        )}

      </div>


      <div className="bg-red-100 w-full h-[400px]">
        <h2 className="font-bold">
          Description
        </h2>
  
        
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
            console.log("Tickets", qty, "Total:", total);
          }}
        />

        <button>
          Buy Ticket
        </button>

      </div>

    </div>
  );
};

export default EventDetail;











        // <div key={event.id}>

        //   <h2>
        //   {event.title}
        //   </h2>

        //   <div>
        //     {event.music_embed_url && <MusicEmbed embedCode={event.music_embed_url} />}

        //   </div>


        //   <div 
        //   dangerouslySetInnerHTML={{ __html: event.description }} 
        //   />

        //   {/* Event image */}
        //   {event.image && <ImageFromId id={event.image} alt={event.title} />}

        //   {/* Ticket price */}
        //   <p>
        //     Price: {event.price} DKK
        //   </p>

        //   {/* Amount tickets available */}
        //   <p>
        //     Capacity: {event.capacity}
        //   </p>
        //     {event.video_embed_url && <VideoEmbed embedCode={event.video_embed_url} />}

        //   <p>
        //     {/* Start_date */}
        //     {new Date(event.start_date || "").toLocaleDateString("en-US", {
        //       weekday: "long",
        //       year: "numeric",
        //       month: "long",
        //       day: "numeric",
        //       hour: "2-digit",
        //       minute: "2-digit",
        //     })}
        //     <br />
        //     {/* End_date */}
        //     {new Date(event.end_date || "").toLocaleDateString("en-US", {
        //       year: "numeric",
        //       month: "long",
        //       day: "numeric",
        //     })}
        //   </p>


        // </div>