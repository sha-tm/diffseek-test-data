export interface ChargeRequest {
  customerId: string;
  amountCents: number;
  currency: string;
  cardToken: string;
}

export interface Charge {
  chargeId: string;
  status: string;
}

export interface Customer {
  id: string;
  email: string;
}
