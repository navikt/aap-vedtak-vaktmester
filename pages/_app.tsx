import "@navikt/ds-css";
import "../styles/index.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
