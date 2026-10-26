import { Route, Routes } from "react-router-dom";
import { CheckoutPage } from "../checkout/CheckoutPage";
import { CheckoutLayout } from "../components/layout/CheckoutLayout";
import { PaymentMethodsPage } from "../checkout/PaymentMethodsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/:orderId" element={<CheckoutPage />} />
        <Route path="/account/payment-methods" element={<PaymentMethodsPage />} />
      </Route>
    </Routes>
  );
}
