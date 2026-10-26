import type { ShippingAddress } from "../types/checkout";

type Props = {
  value: ShippingAddress;
  onChange: (next: ShippingAddress) => void;
  onContinue: () => void;
};

export function ShippingStep({ value, onChange, onContinue }: Props) {
  return (
    <section className="shipping-step">
      <h2>Shipping</h2>
      <label>
        Full name
        <input
          value={value.fullName}
          onChange={(e) => onChange({ ...value, fullName: e.target.value })}
        />
      </label>
      <label>
        Address
        <input
          value={value.line1}
          onChange={(e) => onChange({ ...value, line1: e.target.value })}
        />
      </label>
      <button type="button" onClick={onContinue}>
        Continue to payment
      </button>
    </section>
  );
}
