export type OrderLine = {
  sku: string;
  name: string;
  quantity: number;
  unitCents: number;
};

export type Order = {
  id: string;
  customerId: string;
  currency: string;
  totalCents: number;
  status: "open" | "paid" | "cancelled";
  chargeId?: string;
  lines: OrderLine[];
};
