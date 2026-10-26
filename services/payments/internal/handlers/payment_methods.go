package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/acme/checkout/services/payments/internal/service"
)

type createPaymentMethodBody struct {
	CardToken      string                 `json:"cardToken"`
	BillingAddress *service.BillingAddress `json:"billingAddress"`
	SetDefault     bool                   `json:"setDefault"`
}

func RegisterPaymentMethods(mux *http.ServeMux, svc *service.Service) {
	mux.HandleFunc("GET /v1/customers/{id}/payment-methods", listPaymentMethods(svc))
	mux.HandleFunc("POST /v1/customers/{id}/payment-methods", createPaymentMethod(svc))
	mux.HandleFunc("DELETE /v1/customers/{id}/payment-methods/{paymentMethodId}", deletePaymentMethod(svc))
}

func listPaymentMethods(svc *service.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := svc.ListPaymentMethods(r.Context(), r.PathValue("id"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"items": items})
	}
}

func createPaymentMethod(svc *service.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var body createPaymentMethodBody
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, "invalid body", http.StatusBadRequest)
			return
		}
		pm, err := svc.CreatePaymentMethod(r.Context(), service.CreatePaymentMethodInput{
			CustomerID:     r.PathValue("id"),
			CardToken:      body.CardToken,
			BillingAddress: body.BillingAddress,
			SetDefault:     body.SetDefault,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(pm)
	}
}

func deletePaymentMethod(svc *service.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := svc.DeletePaymentMethod(
			r.Context(),
			r.PathValue("id"),
			r.PathValue("paymentMethodId"),
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}
