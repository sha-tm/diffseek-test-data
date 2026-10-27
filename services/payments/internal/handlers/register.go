package handlers

import (
	"net/http"

	"github.com/acme/checkout/services/payments/internal/service"
)

func Register(mux *http.ServeMux, svc *service.Service) {
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	mux.HandleFunc("POST /v1/charges", charge(svc))
	mux.HandleFunc("GET /v1/customers/{id}", getCustomer(svc))
}
