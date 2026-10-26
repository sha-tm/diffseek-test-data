# Charges API

`POST /v1/charges` creates a payment. Provide either `cardToken` (one-time) or
`paymentMethodId` (saved method). Exactly one of the two is required.
