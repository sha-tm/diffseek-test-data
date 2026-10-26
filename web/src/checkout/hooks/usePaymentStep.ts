import { useState } from "react";

export function usePaymentStep() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return { submitting, setSubmitting, error, setError };
}
