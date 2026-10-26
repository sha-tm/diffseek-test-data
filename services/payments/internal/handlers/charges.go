package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/acme/checkout/services/payments/internal/service"
)

type chargeRequest struct {
	CustomerID string `json:"customerId"`
	AmountCents int64 `json:"amountCents"`
	Currency   string `json:"currency"`
	CardToken  string `json:"cardToken"`
}

func charge(svc *service.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req chargeRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid body", http.StatusBadRequest)
			return
		}
		result, err := svc.Charge(r.Context(), service.ChargeInput{
			CustomerID:  req.CustomerID,
			AmountCents: req.AmountCents,
			Currency:    req.Currency,
			CardToken:   req.CardToken,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(result)
	}
}
