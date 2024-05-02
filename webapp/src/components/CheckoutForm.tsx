import { useState, FormEvent } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // Define the type for the message state variable
  const [message, setMessage] = useState<string | null>(null);
  // Define the type for the isProcessing state variable
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
  
    setIsProcessing(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });
  
    if (error) {
      // Check if the error has a message and set it or set a default message
      setMessage(error.message ? error.message : "An unexpected error occurred.");
    } else {
      // Ensure to clear the message in case there is no error
      setMessage(null);
    }
  
    setIsProcessing(false);
  };
  

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
