import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <div className="app-shell" data-feature="saved-payment-methods">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
