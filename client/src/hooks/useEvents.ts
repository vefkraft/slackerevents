import { useDirectus } from "./useDirectus";

export type Event = {
  id: string;
  is_active: boolean;
  slug: string;
  title: string;
  description: string;
  image?: string; // kun ID som string
  image_or_video?: string
  price?: number;
  capacity?: number;
  start_date?: string;
  end_date?: string;
  music_embed_url?: string;
  video_embed_url?: string;
};

export function useEvents() {
  return useDirectus<Event>("event");
}
