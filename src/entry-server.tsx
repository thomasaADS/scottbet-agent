import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App";

export { HOME_DESCRIPTION, HOME_FAQ, HOME_TITLE, SEO_PAGES } from "./seo/pages";

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
