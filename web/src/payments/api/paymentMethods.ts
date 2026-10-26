import { createPaymentsClient } from "../generated/openapi/client";
import { Configuration } from "../generated/openapi/configuration";
import type {
  CreatePaymentMethodRequest,
  PaymentMethod,
} from "../generated/openapi/types";

const client = createPaymentsClient(
  new Configuration({ basePath: "/api/payments" }),
);

export async function listPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
  const result = await client.paymentMethods.listPaymentMethods(customerId);
  return result.items ?? [];
}

export async function createPaymentMethod(
  customerId: string,
  body: CreatePaymentMethodRequest,
): Promise<PaymentMethod> {
  return client.paymentMethods.createPaymentMethod(customerId, body);
}

export async function deletePaymentMethod(
  customerId: string,
  paymentMethodId: string,
): Promise<void> {
  await client.paymentMethods.deletePaymentMethod(customerId, paymentMethodId);
}
