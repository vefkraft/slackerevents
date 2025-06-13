import { useState } from "react";
import Events from "../../components/EventList/event.list";

/**
 * EventListPage.
 * Handles event list, payment modal (simulated), and checkout logic.
 */
const EventList = () => {
  const [showModal, setShowModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  // Called when user clicks "Buy Ticket" in Events
  const handleCheckout = (data: any) => {
    console.log("Checkout called", data);
    setCheckoutData(data);
    setShowModal(true);
  };

  return (
    <>
      <Events onCheckout={handleCheckout} />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Simulated Payment Modal</h2>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventList;