# Checkout payment flow

Customers enter shipping, then pay with a one-time card token collected in the browser.
The web app calls `POST /v1/charges` on the payments service.
