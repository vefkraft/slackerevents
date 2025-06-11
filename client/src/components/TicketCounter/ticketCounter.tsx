import React, { useState, useEffect } from "react";

type TicketCounterProps = {
  pricePerTicket: number;
  eventId: string;
  onChange?: (quantity: number, total: number) => void;
};

const TicketCounter: React.FC<TicketCounterProps> = ({ pricePerTicket, eventId, onChange }) => {
  if (!eventId) {
    console.warn("TicketCounter: Mangler eventId");
    return null;
  }

  const storageKey = `tickets-${eventId}`;

  const [quantity, setQuantity] = useState<number>(() => {
    const stored = sessionStorage.getItem(storageKey);
    return stored ? parseInt(stored, 10) : 1;
  });

  const total = quantity * pricePerTicket;

  useEffect(() => {
    sessionStorage.setItem(storageKey, String(quantity));
    onChange?.(quantity, total);
  }, [quantity, total, storageKey, onChange]);

  const increment = () => setQuantity(qty => qty + 1);
  const decrement = () => setQuantity(qty => Math.max(1, qty - 1));

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
      <p> {total.toLocaleString("is-IS", { minimumFractionDigits: 2 })} Kr</p>
    </div>
  );
};

export default TicketCounter;
