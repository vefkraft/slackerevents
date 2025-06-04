import React, { useEffect, useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import type { Event } from "../../hooks/useEvents";
import MusicEmbed from "../musicEmbed";


const API_URL = import.meta.env.VITE_API_URL;

const ImageFromId: React.FC<{ id: string; alt: string }> = ({ id, alt }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/assets/${id}`)
      .then(res => res.json())
      .then(json => {
        if (!cancelled) setUrl(`${API_URL}${json.data.url}`);
      })
      .catch(() => {
        if (!cancelled) setUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!url) return null;
  return <img src={url} alt={alt} style={{ maxWidth: "300px" }} />;
};
const EventList: React.FC = () => {
  const { data: events, loading, error } = useEvents();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      {events?.map((event: Event) => (
        
        <div key={event.id}>

          <h2>
          {event.title}
          </h2>

          {event.music_embed_url && <MusicEmbed embedCode={event.music_embed_url} />}

          <div 
          dangerouslySetInnerHTML={{ __html: event.description }} 
          />

          {/* Event image */}
          {event.image && <ImageFromId id={event.image} alt={event.title} />}

          {/* Ticket price */}
          <p>
            Price: {event.price} DKK
          </p>

          {/* Amount tickets available */}
          <p>
            Capacity: {event.capacity}
          </p>

          <p>
            {/* Start_date */}
            {new Date(event.start_date || "").toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            <br />
            {/* End_date */}
            {new Date(event.end_date || "").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>


        </div>
      ))}
    </div>
  );
};

export default EventList;
