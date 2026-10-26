# Saved payment methods

Customers can store cards on their account and reuse them at checkout.

## Flow

1. From checkout, choose **Saved cards** or open **Payment methods** in the account area.
2. Adding a card tokenizes pan data in the browser and calls
   `POST /v1/customers/{id}/payment-methods`.
3. Checkout charges pass `paymentMethodId` instead of a one-time `cardToken`.

## Defaults

At most one payment method per customer is marked default. Soft-deleted methods
are omitted from list responses.
