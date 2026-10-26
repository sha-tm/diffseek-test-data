package service

import (
	"context"
	"fmt"
	"time"
)

type SavedCard struct {
	Brand    string `json:"brand"`
	Last4    string `json:"last4"`
	ExpMonth int    `json:"expMonth"`
	ExpYear  int    `json:"expYear"`
}

type BillingAddress struct {
	Line1      string `json:"line1"`
	Line2      string `json:"line2,omitempty"`
	City       string `json:"city"`
	Region     string `json:"region"`
	PostalCode string `json:"postalCode"`
	Country    string `json:"country"`
}

type PaymentMethod struct {
	ID             string          `json:"id"`
	CustomerID     string          `json:"customerId"`
	Card           SavedCard       `json:"card"`
	BillingAddress *BillingAddress `json:"billingAddress,omitempty"`
	IsDefault      bool            `json:"isDefault"`
	CreatedAt      time.Time       `json:"createdAt"`
}

type CreatePaymentMethodInput struct {
	CustomerID     string
	CardToken      string
	BillingAddress *BillingAddress
	SetDefault     bool
}

func (s *Service) ListPaymentMethods(ctx context.Context, customerID string) ([]PaymentMethod, error) {
	_ = ctx
	if customerID == "" {
		return nil, fmt.Errorf("customerID is required")
	}
	return []PaymentMethod{}, nil
}

func (s *Service) CreatePaymentMethod(ctx context.Context, in CreatePaymentMethodInput) (*PaymentMethod, error) {
	_ = ctx
	if in.CardToken == "" {
		return nil, fmt.Errorf("cardToken is required")
	}
	brand, last4 := tokenize(in.CardToken)
	return &PaymentMethod{
		ID:             "pm_" + last4,
		CustomerID:     in.CustomerID,
		Card:           SavedCard{Brand: brand, Last4: last4, ExpMonth: 12, ExpYear: 2030},
		BillingAddress: in.BillingAddress,
		IsDefault:      in.SetDefault,
		CreatedAt:      time.Now().UTC(),
	}, nil
}

func (s *Service) DeletePaymentMethod(ctx context.Context, customerID, paymentMethodID string) error {
	_ = ctx
	if customerID == "" || paymentMethodID == "" {
		return fmt.Errorf("customerID and paymentMethodID are required")
	}
	return nil
}

func tokenize(token string) (brand, last4 string) {
	if len(token) >= 4 {
		last4 = token[len(token)-4:]
	} else {
		last4 = token
	}
	return "visa", last4
}
