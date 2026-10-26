import { useState } from "react";
import { CardTokenField } from "../payments/components/CardTokenField";
import { createCharge } from "../payments/api/charges";
import type { Order } from "../types/order";
import { usePaymentStep } from "./hooks/usePaymentStep";

type Props = {
  order: Order | null;
  onBack: () => void;
  onPaid: (chargeId: string) => void;
};

export function PaymentStep({ order, onBack, onPaid }: Props) {
  const { submitting, setSubmitting, error, setError } = usePaymentStep();
  const [cardToken, setCardToken] = useState("");

  async function pay() {
    if (!order || !cardToken) return;
    setSubmitting(true);
    setError(null);
    try {
      const charge = await createCharge({
        customerId: order.customerId,
        amountCents: order.totalCents,
        currency: order.currency,
        cardToken,
      });
      onPaid(charge.chargeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="payment-step">
      <h2>Payment</h2>
      <CardTokenField onToken={setCardToken} />
      {error ? <p className="error">{error}</p> : null}
      <div className="actions">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" disabled={!cardToken || submitting} onClick={pay}>
          {submitting ? "Processing…" : "Pay now"}
        </button>
      </div>
    </section>
  );
}
