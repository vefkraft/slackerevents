// Represents the connection status to the backend API.
export type ConnectionStatus = "connected" | "disconnected" | "error" | "checking";

// Props for the TicketCounter component, including price per ticket and a callback for changes.
export interface TicketCounterProps {
  pricePerTicket: number;
  eventId: string;
  onChange?: (quantity: number, total: number) => void;
}

// Navigation 
export interface NavLink {
  to: string;
  text: string;
  desktopOnly?: boolean;   // vises kun i desktop-topbar
  requiresAuth?: boolean;  // kræver login for adgang
}

// Generic response type for Directus API responses.
export type DirectusResponse<T> = {
  data: T[];
};

// Props for universal Button component 
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "danger";
};

// Parameters for building Directus API queries, including fields and filters.
export type Params = {
  fields?: string[];
  filter?: Record<string, unknown>;
  [key: string]: unknown;
};

// Represents a category for events.
export type Category = {
  id: string;
  category_name: string;
  sort: number | null;
};

// Represents an event, including details, categories, and venue information.
export type Event = {
  id: string;
  is_active: boolean;
  slug: string;
  title: string;
  description: string;
  image?: string;
  image_or_video?: string;
  price?: number;
  capacity?: number;
  start_date?: string;
  end_date?: string;
  music_embed_url?: string;
  video_embed_url?: string;
  categories?: {
    categories_id: Category;
  }[];
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
