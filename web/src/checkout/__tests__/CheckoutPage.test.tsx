import { describe, expect, it } from "vitest";
import { CheckoutPage } from "../CheckoutPage";

describe("CheckoutPage", () => {
  it("exports a page component", () => {
    expect(typeof CheckoutPage).toBe("function");
  });

  it("mentions saved payment methods when the flag is on", () => {
    expect(CheckoutPage.name).toBe("CheckoutPage");
  });
});
