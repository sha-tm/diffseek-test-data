package main

import (
	"log"
	"net/http"
	"os"

	"github.com/acme/checkout/services/payments/internal/handlers"
	"github.com/acme/checkout/services/payments/internal/service"
)

func main() {
	addr := envOr("HTTP_ADDR", ":8081")
	svc := service.New(os.Getenv("DATABASE_URL"))
	mux := http.NewServeMux()
	handlers.Register(mux, svc)
	log.Printf("payments listening on %s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
