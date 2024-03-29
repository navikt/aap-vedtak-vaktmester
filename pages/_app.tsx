import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { Modal } from '@navikt/ds-react';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { Feilviser } from '../src/components/Feilviser';
import { Layout } from '../src/components/layout/Layout';
import '../styles/index.css';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  return res.json();
};

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled');

  useEffect(() => {
    // https://github.com/mswjs/msw/discussions/1049
    async function initMocks() {
      const { setupMocks } = await import('../mocks');
      await setupMocks();
      setShouldRender(true);
    }

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  if (Modal.setAppElement) {
    Modal.setAppElement('#__next');
  }
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource) => fetcher(resource),
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <ErrorBoundary FallbackComponent={Feilviser}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </SWRConfig>
  );
}
