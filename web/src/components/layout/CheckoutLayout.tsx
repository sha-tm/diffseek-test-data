import { Link, Outlet } from "react-router-dom";
import { featureFlags } from "../../config/featureFlags";

export function CheckoutLayout() {
  return (
    <div className="checkout-layout">
      <header>
        <Link to="/">Acme</Link>
        {featureFlags.savedPaymentMethods ? (
          <Link to="/account/payment-methods">Payment methods</Link>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
