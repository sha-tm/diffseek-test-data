import type { Order } from "../types/order";

type Props = { order: Order | null };

export function OrderSummary({ order }: Props) {
  if (!order) return <aside className="order-summary">Loading…</aside>;
  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      <ul>
        {order.lines.map((line) => (
          <li key={line.sku}>
            {line.name} × {line.quantity}
            <span>${(line.unitCents * line.quantity / 100).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="total">
        Total ${(order.totalCents / 100).toFixed(2)} {order.currency}
      </p>
    </aside>
  );
}
