package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/acme/checkout/services/payments/internal/service"
)

func TestCreatePaymentMethodHandler(t *testing.T) {
	svc := service.New("")
	mux := http.NewServeMux()
	RegisterPaymentMethods(mux, svc)

	req := httptest.NewRequest(
		http.MethodPost,
		"/v1/customers/cus_1/payment-methods",
		strings.NewReader(`{"cardToken":"tok_4242","setDefault":true}`),
	)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d, body = %s", rec.Code, rec.Body.String())
	}
}
