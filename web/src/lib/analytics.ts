type Props = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("acme:analytics", { detail: { event, props } }),
  );
}

export function trackPaymentMethodSaved(brand: string) {
  track("payment_method_saved", { brand });
}
