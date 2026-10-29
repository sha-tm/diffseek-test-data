import { useState } from "react";
import { CardTokenField } from "./CardTokenField";
import type { CreatePaymentMethodRequest } from "../generated/openapi/types";

type Props = {
  onSubmit: (body: CreatePaymentMethodRequest) => Promise<void>;
  onCancel: () => void;
};

export function AddPaymentMethodForm({ onSubmit, onCancel }: Props) {
  const [cardToken, setCardToken] = useState("");
  const [setDefault, setSetDefault] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!cardToken) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ cardToken, setDefault });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save card");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-payment-method-form" onSubmit={handleSubmit}>
      <h3>Add a payment method</h3>
      <CardTokenField onToken={setCardToken} />
      <label className="checkbox">
        <input
          type="checkbox"
          checked={setDefault}
          onChange={(e) => setSetDefault(e.target.checked)}
        />
        Set as default
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={!cardToken || submitting}>
          {submitting ? "Saving…" : "Save card"}
        </button>
      </div>
    </form>
  );
}
