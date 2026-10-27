package service

import (
	"context"
	"fmt"
)

type Service struct {
	databaseURL string
}

func New(databaseURL string) *Service {
	return &Service{databaseURL: databaseURL}
}

type ChargeInput struct {
	CustomerID  string
	AmountCents int64
	Currency    string
	CardToken   string
}

type ChargeResult struct {
	ChargeID string `json:"chargeId"`
	Status   string `json:"status"`
}

type Customer struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

func (s *Service) Charge(ctx context.Context, in ChargeInput) (*ChargeResult, error) {
	if in.CardToken == "" {
		return nil, fmt.Errorf("cardToken is required")
	}
	_ = ctx
	return &ChargeResult{ChargeID: "ch_" + in.CustomerID, Status: "succeeded"}, nil
}

func (s *Service) GetCustomer(ctx context.Context, id string) (*Customer, error) {
	_ = ctx
	return &Customer{ID: id, Email: id + "@example.com"}, nil
}
