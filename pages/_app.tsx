import "@navikt/ds-css";
import "../styles/index.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Modal } from "@navikt/ds-react";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  return res.json();
};

export default function App({ Component, pageProps }: AppProps) {
  if (Modal.setAppElement) {
    Modal.setAppElement("#__next");
  }
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource) => fetcher(resource),
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
