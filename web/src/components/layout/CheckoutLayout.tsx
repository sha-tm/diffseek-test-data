import { Outlet } from "react-router-dom";

export function CheckoutLayout() {
  return (
    <div className="checkout-layout">
      <header>
        <a href="/">Acme</a>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
