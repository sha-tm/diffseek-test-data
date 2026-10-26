CREATE TABLE payment_methods (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id),
  brand TEXT NOT NULL,
  last4 TEXT NOT NULL,
  exp_month SMALLINT NOT NULL,
  exp_year SMALLINT NOT NULL,
  billing_line1 TEXT,
  billing_line2 TEXT,
  billing_city TEXT,
  billing_region TEXT,
  billing_postal_code TEXT,
  billing_country TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX payment_methods_one_default
  ON payment_methods (customer_id)
  WHERE is_default AND deleted_at IS NULL;

CREATE TABLE billing_addresses (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id),
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
