import { Route, Routes } from "react-router-dom";
import { CheckoutPage } from "../checkout/CheckoutPage";
import { CheckoutLayout } from "../components/layout/CheckoutLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/:orderId" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}
