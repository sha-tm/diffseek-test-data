import { Configuration } from "./configuration";
import { ChargesApi } from "./apis/ChargesApi";
import { CustomersApi } from "./apis/CustomersApi";

export function createPaymentsClient(config: Configuration) {
  return {
    charges: new ChargesApi(config),
    customers: new CustomersApi(config),
  };
}
