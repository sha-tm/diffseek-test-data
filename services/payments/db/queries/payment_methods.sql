-- name: ListPaymentMethods :many
SELECT id, customer_id, brand, last4, exp_month, exp_year,
       billing_line1, billing_city, billing_region, billing_postal_code,
       billing_country, is_default, created_at
FROM payment_methods
WHERE customer_id = $1 AND deleted_at IS NULL
ORDER BY is_default DESC, created_at DESC;

-- name: InsertPaymentMethod :one
INSERT INTO payment_methods (
  id, customer_id, brand, last4, exp_month, exp_year,
  billing_line1, billing_line2, billing_city, billing_region,
  billing_postal_code, billing_country, is_default
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
) RETURNING *;

-- name: SoftDeletePaymentMethod :exec
UPDATE payment_methods
SET deleted_at = now(), is_default = false
WHERE customer_id = $1 AND id = $2 AND deleted_at IS NULL;
