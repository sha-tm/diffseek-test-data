import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OrderSummary } from "./OrderSummary";
import { PaymentStep } from "./PaymentStep";
import { ShippingStep } from "./ShippingStep";
import { useCheckout } from "./hooks/useCheckout";
import { featureFlags } from "../config/featureFlags";

export function CheckoutPage() {
  const { orderId } = useParams();
  const checkout = useCheckout(orderId);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {featureFlags.savedPaymentMethods ? (
        <p className="hint">
          Prefer managing cards later?{" "}
          <Link to="/account/payment-methods">Open payment methods</Link>
        </p>
      ) : null}
      {step === "shipping" ? (
        <ShippingStep
          value={checkout.shipping}
          onChange={checkout.setShipping}
          onContinue={() => setStep("payment")}
        />
      ) : (
        <PaymentStep
          order={checkout.order}
          onBack={() => setStep("shipping")}
          onPaid={checkout.markPaid}
        />
      )}
      <OrderSummary order={checkout.order} />
    </div>
  );
}
