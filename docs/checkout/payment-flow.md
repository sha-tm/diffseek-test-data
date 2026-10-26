# Checkout payment flow

Customers enter shipping, then pay with either a saved payment method or a
one-time card token collected in the browser.

When `featureFlags.savedPaymentMethods` is enabled, the payment step offers a
toggle between saved cards and a new card. The web app calls `POST /v1/charges`
with `paymentMethodId` or `cardToken` accordingly.
