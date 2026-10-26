import { Modal } from "../../components/ui/Modal";
import type { PaymentMethod } from "../generated/openapi/types";

type Props = {
  method: PaymentMethod | null;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function DeletePaymentMethodDialog({ method, open, onConfirm, onClose }: Props) {
  const last4 = method?.card?.last4 ?? "";
  return (
    <Modal open={open} title="Remove payment method" onClose={onClose}>
      <p>
        Remove the card ending in <strong>{last4}</strong>? Future checkouts will need a
        new card unless another saved method remains.
      </p>
      <div className="actions">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn-danger" onClick={onConfirm}>
          Remove card
        </button>
      </div>
    </Modal>
  );
}
