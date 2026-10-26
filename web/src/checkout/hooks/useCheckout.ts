import { useEffect, useState } from "react";
import type { ShippingAddress } from "../../types/checkout";
import type { Order } from "../../types/order";

const emptyShipping: ShippingAddress = {
  fullName: "",
  line1: "",
  city: "",
  region: "",
  postalCode: "",
  country: "US",
};

export function useCheckout(orderId: string | undefined) {
  const [order, setOrder] = useState<Order | null>(null);
  const [shipping, setShipping] = useState<ShippingAddress>(emptyShipping);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/orders/${orderId ?? "current"}`);
      if (!res.ok || cancelled) return;
      setOrder(await res.json());
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  function markPaid(chargeId: string) {
    setOrder((prev) => (prev ? { ...prev, chargeId, status: "paid" } : prev));
  }

  return { order, shipping, setShipping, markPaid };
}
