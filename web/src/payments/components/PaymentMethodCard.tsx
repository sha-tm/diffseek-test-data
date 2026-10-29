import type { PaymentMethod } from "../generated/openapi/types";

type Props = {
  method: PaymentMethod;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function PaymentMethodCard({ method, selected, onSelect, onDelete }: Props) {
  const id = method.id ?? "";
  const brand = method.card?.brand ?? "card";
  const last4 = method.card?.last4 ?? "••••";

  return (
    <div
      className={`payment-method-card${selected ? " selected" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.(id);
      }}
    >
      <div>
        <strong>{brand}</strong> ending in {last4}
        {method.isDefault ? <span className="badge">Default</span> : null}
      </div>
      <div className="meta">
        Exp {method.card?.expMonth}/{method.card?.expYear}
      </div>
      {onDelete ? (
        <button
          type="button"
          className="link-danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
}
