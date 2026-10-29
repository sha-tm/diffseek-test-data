import { useCallback, useEffect, useState } from "react";
import {
  createPaymentMethod,
  deletePaymentMethod,
  listPaymentMethods,
} from "../api/paymentMethods";
import type {
  CreatePaymentMethodRequest,
  PaymentMethod,
} from "../generated/openapi/types";

export function useSavedPaymentMethods(customerId: string | undefined) {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!customerId) return;
    setLoading(true);
    setError(null);
    try {
      setMethods(await listPaymentMethods(customerId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function add(body: CreatePaymentMethodRequest) {
    if (!customerId) return;
    const created = await createPaymentMethod(customerId, body);
    setMethods((prev) => [created, ...prev]);
    return created;
  }

  async function remove(paymentMethodId: string) {
    if (!customerId) return;
    await deletePaymentMethod(customerId, paymentMethodId);
    setMethods((prev) => prev.filter((m) => m.id !== paymentMethodId));
  }

  return { methods, loading, error, refresh, add, remove };
}
