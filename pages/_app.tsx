import { css, Global } from "@emotion/react";
import { AppProviders } from "../providers/AppProviders";
import { DevtoolsWrapper } from "devtools/wrapper";

import "../components/logo/style.css";

/**
 * tailwind styles
 * production tips: remove the line below and compile the styles using this code:
 * npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
 * and import the dist output.css instead
 */
import "../styles/style.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "Roboto Mono", monospace;
          }
          * {
            line-height: 16px;
            letter-spacing: 0.07em;
          }
        `}
      />
      <DevtoolsWrapper>
        <AppProviders>
          <Component {...pageProps} />
        </AppProviders>
      </DevtoolsWrapper>
    </>
  );
};

export default App;
