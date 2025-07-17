import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RTMkMBCkOUZ2CSsO3AAqHb7SKDUSmckDKmnJQIhXZZGu1vMWbpG5AdlDHcyN3WNEQMVt0gqtNTUQDwrV0xRnPew00ZriUekAa"
);

function StripePaymentForm({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again.");
      return;
    }

    setLoading(true);
    console.log("Starting payment process...");

    try {
      // Create payment intent
      console.log("Creating payment intent for amount:", count * 1300);

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: count * 1300 }),
      });

      console.log("API Response status:", res.status);
      console.log("API Response ok:", res.ok);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error response:", errorText);
        throw new Error(`Failed to create payment intent: ${res.status}`);
      }

      const responseData = await res.json();
      console.log("API Response data:", responseData);

      const { clientSecret } = responseData;

      if (!clientSecret) {
        console.error("No client secret in response:", responseData);
        throw new Error("No client secret received");
      }

      console.log("Client secret received, confirming payment...");

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              name: "Test User",
            },
          },
        }
      );

      console.log("Payment confirmation result:", { error, paymentIntent });

      setLoading(false);

      if (error) {
        console.error("Payment error:", error);
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        router.push("/success");
      } else {
        console.log("Unexpected payment status:", paymentIntent?.status);
        alert("Payment was not completed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Caught error in payment process:", error);

      // More specific error message
      if (error instanceof Error) {
        alert(`Payment failed: ${error.message}`);
      } else {
        alert("Payment failed. Please check your connection and try again.");
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#fff",
        fontSize: "14px",
        fontFamily: "'Microsoft', sans-serif",
        "::placeholder": {
          color: "#999",
        },
      },
      invalid: {
        color: "#ff0000",
      },
    },
  };

  return (
    <>
      {/* Close button */}
      <button
        className={styles.closeButton}
        aria-label="Close"
        onClick={() => router.push("/")}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M8 8L24 24M8 24L24 8"
            stroke="#E6E6E6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Title */}
      <h2 className={styles.title}>Payment method</h2>

      {/* Form */}
      <form onSubmit={handlePay}>
        {/* Name Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Full name</label>
          <input className={styles.input} placeholder="" />
        </div>

        {/* Email Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input className={styles.input} placeholder="" />
        </div>

        {/* Card Number */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Card Number</label>
          <div className={styles.input}>
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>

        {/* CVC and Expiration Date Row */}
        <div className={styles.row}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label className={styles.label}>CVC</label>
            <div className={styles.inputSmall}>
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label className={styles.label}>Expiration Date</label>
            <div className={styles.inputSmall}>
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        {/* Ticket Counter */}
        <div className={styles.ticketControls}>
          <button
            type="button"
            className={styles.ticketButton}
            onClick={() => setCount(Math.max(1, count - 1))}
            aria-label="Decrease"
          >
            –
          </button>
          <span className={styles.ticketCount}>{count}</span>
          <button
            type="button"
            className={styles.ticketButton}
            onClick={() => setCount(count + 1)}
            aria-label="Increase"
          >
            +
          </button>
          <span className={styles.ticketPrice}>{count * 1300} kr</span>
        </div>

        {/* Book Button */}
        <button
          className={styles.bookButton}
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Book your ticket"}
        </button>
      </form>

      {/* Or divider */}
      <div className={styles.or}>or</div>

      {/* Alternative Payment Buttons */}
      <button className={styles.payAltButton}>
        <img
          src="/assets/icons/GoogleIcon.svg"
          alt="Google Pay"
          width={40}
          height={19}
          style={{ objectFit: "contain" }}
        />
        Google Pay
      </button>

      <button className={styles.payAltButton}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple Pay"
        />
        Apple Pay
      </button>
    </>
  );
}

export default function PaymentModal() {
  const [count, setCount] = useState(2);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Elements stripe={stripePromise}>
          <StripePaymentForm count={count} setCount={setCount} />
        </Elements>
      </div>
      {/* Footer */}
      <div className={styles.footer}>
        <span>© 2025 by Vefkraft</span>
      </div>
    </div>
  );
}
