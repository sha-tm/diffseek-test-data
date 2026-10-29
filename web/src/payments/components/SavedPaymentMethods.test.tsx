import { describe, expect, it, vi } from "vitest";
import { SavedPaymentMethods } from "./SavedPaymentMethods";

vi.mock("../hooks/useSavedPaymentMethods", () => ({
  useSavedPaymentMethods: () => ({
    methods: [],
    loading: false,
    error: null,
    refresh: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
  }),
}));

describe("SavedPaymentMethods", () => {
  it("exports the saved methods panel", () => {
    expect(typeof SavedPaymentMethods).toBe("function");
  });
});
