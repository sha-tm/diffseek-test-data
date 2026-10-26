import { useState } from "react";
import { CardTokenField } from "../payments/components/CardTokenField";
import { SavedPaymentMethods } from "../payments/components/SavedPaymentMethods";
import { createCharge } from "../payments/api/charges";
import { featureFlags } from "../config/featureFlags";
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
  const [paymentMethodId, setPaymentMethodId] = useState<string>();
  const [mode, setMode] = useState<"saved" | "new">(
    featureFlags.savedPaymentMethods ? "saved" : "new",
  );

  async function pay() {
    if (!order) return;
    if (mode === "new" && !cardToken) return;
    if (mode === "saved" && !paymentMethodId) return;
    setSubmitting(true);
    setError(null);
    try {
      const charge = await createCharge({
        customerId: order.customerId,
        amountCents: order.totalCents,
        currency: order.currency,
        cardToken: mode === "new" ? cardToken : undefined,
        paymentMethodId: mode === "saved" ? paymentMethodId : undefined,
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
      {featureFlags.savedPaymentMethods ? (
        <div className="payment-mode">
          <button
            type="button"
            className={mode === "saved" ? "active" : ""}
            onClick={() => setMode("saved")}
          >
            Saved cards
          </button>
          <button
            type="button"
            className={mode === "new" ? "active" : ""}
            onClick={() => setMode("new")}
          >
            New card
          </button>
        </div>
      ) : null}
      {mode === "saved" && order ? (
        <SavedPaymentMethods
          customerId={order.customerId}
          selectedId={paymentMethodId}
          onSelect={setPaymentMethodId}
        />
      ) : (
        <CardTokenField onToken={setCardToken} />
      )}
      {error ? <p className="error">{error}</p> : null}
      <div className="actions">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          disabled={
            submitting ||
            (mode === "new" ? !cardToken : !paymentMethodId)
          }
          onClick={pay}
        >
          {submitting ? "Processing…" : "Pay now"}
        </button>
      </div>
    </section>
  );
}
