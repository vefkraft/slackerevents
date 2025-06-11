// Connection status
export type ConnectionStatus = "connected" | "disconnected" | "error" | "checking";

// Ticket counter
export type TicketCounterProps = {
  pricePerTicket: number;
  onChange?: (count: number, totalPrice: number) => void;
};

