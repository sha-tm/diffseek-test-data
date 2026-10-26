import { describe, expect, it } from "vitest";
import { PaymentMethodsPage } from "../PaymentMethodsPage";

describe("PaymentMethodsPage", () => {
  it("exports the account payment methods page", () => {
    expect(typeof PaymentMethodsPage).toBe("function");
  });
});
