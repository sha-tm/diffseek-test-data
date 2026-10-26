import { describe, expect, it } from "vitest";
import { PaymentStep } from "../PaymentStep";

describe("PaymentStep", () => {
  it("exports a step component", () => {
    expect(typeof PaymentStep).toBe("function");
  });
});
