import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";

const root = document.getElementById("root");
if (root) {
  const tree = (
    <StrictMode>
      <App path={window.location.pathname} />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, tree);
  else createRoot(root).render(tree);
}
