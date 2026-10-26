import { useState } from "react";
import { useParams } from "react-router-dom";
import { OrderSummary } from "./OrderSummary";
import { PaymentStep } from "./PaymentStep";
import { ShippingStep } from "./ShippingStep";
import { useCheckout } from "./hooks/useCheckout";

export function CheckoutPage() {
  const { orderId } = useParams();
  const checkout = useCheckout(orderId);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
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
