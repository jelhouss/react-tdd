import React from "react";
import ReactDOM from "react-dom/client";

import browserWorker from "./mocks/browser";
import App from "./App";

browserWorker.printHandlers();
browserWorker.start({ onUnhandledRequest: "warn" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
