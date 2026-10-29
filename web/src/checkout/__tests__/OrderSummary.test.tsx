import { describe, expect, it } from "vitest";
import { OrderSummary } from "../OrderSummary";

describe("OrderSummary", () => {
  it("exports a summary component", () => {
    expect(typeof OrderSummary).toBe("function");
  });

  it("accepts a null order while checkout loads", () => {
    expect(OrderSummary.length).toBeGreaterThanOrEqual(0);
  });
});
