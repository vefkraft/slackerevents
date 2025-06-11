import { useDirectus } from "./useDirectus";

export type Event = {
  id: string;
  is_active: boolean;
  slug: string;
  title: string;
  description: string;
  image?: string; // ID
  image_or_video?: string;
  price?: number;
  capacity?: number;
  start_date?: string;
  end_date?: string;
  music_embed_url?: string;
  video_embed_url?: string;

  // Relations
  venue?: {
    id: string;
    place: string;
    address: string;
    city?: {
      id: string;
      city_name: string;
      postal_code: string;
      country?: {
        id: string;
        name: string;
        code: string;
      };
    };
  };
};

export function useEvents() {
  return useDirectus<Event>("event", {
    fields: [
      "*",
      "venue.*", 
      "venue.city.*", 
      "venue.city.country.*" 
    ]
  });
}


