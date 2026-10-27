package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/acme/checkout/services/payments/internal/service"
)

func getCustomer(svc *service.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		customer, err := svc.GetCustomer(r.Context(), id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(customer)
	}
}
