import { useState } from "react";
import { SavedPaymentMethods } from "../payments/components/SavedPaymentMethods";

export function PaymentMethodsPage() {
  const customerId = "cus_current";
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <div className="payment-methods-page">
      <h1>Payment methods</h1>
      <p>Manage cards saved for faster checkout.</p>
      <SavedPaymentMethods
        customerId={customerId}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
