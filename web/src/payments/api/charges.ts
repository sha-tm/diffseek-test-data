import { createPaymentsClient } from "../generated/openapi/client";
import { Configuration } from "../generated/openapi/configuration";
import type { ChargeRequest } from "../generated/openapi/types";

const client = createPaymentsClient(new Configuration({ basePath: "/api/payments" }));

export async function createCharge(request: ChargeRequest) {
  return client.charges.createCharge(request);
}
