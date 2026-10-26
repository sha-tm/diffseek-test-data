import { useState } from "react";
import { useSavedPaymentMethods } from "../hooks/useSavedPaymentMethods";
import type { PaymentMethod } from "../generated/openapi/types";
import { AddPaymentMethodForm } from "./AddPaymentMethodForm";
import { DeletePaymentMethodDialog } from "./DeletePaymentMethodDialog";
import { PaymentMethodCard } from "./PaymentMethodCard";

type Props = {
  customerId: string;
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function SavedPaymentMethods({ customerId, selectedId, onSelect }: Props) {
  const { methods, loading, error, add, remove } = useSavedPaymentMethods(customerId);
  const [adding, setAdding] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PaymentMethod | null>(null);

  return (
    <section className="saved-payment-methods">
      <header>
        <h2>Saved payment methods</h2>
        <button type="button" onClick={() => setAdding(true)}>
          Add card
        </button>
      </header>
      {loading ? <p>Loading saved cards…</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <div className="method-list">
        {methods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            selected={method.id === selectedId}
            onSelect={onSelect}
            onDelete={() => setPendingDelete(method)}
          />
        ))}
        {!loading && methods.length === 0 ? (
          <p className="empty">No saved cards yet.</p>
        ) : null}
      </div>
      {adding ? (
        <AddPaymentMethodForm
          onCancel={() => setAdding(false)}
          onSubmit={async (body) => {
            const created = await add(body);
            setAdding(false);
            if (created?.id) onSelect(created.id);
          }}
        />
      ) : null}
      <DeletePaymentMethodDialog
        open={pendingDelete != null}
        method={pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete?.id) await remove(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </section>
  );
}
