import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-wrap-balancer";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Provider>
    <App />
  </Provider>
);
