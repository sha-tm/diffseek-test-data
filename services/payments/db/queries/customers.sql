-- name: GetCustomer :one
SELECT id, email, created_at
FROM customers
WHERE id = $1;
