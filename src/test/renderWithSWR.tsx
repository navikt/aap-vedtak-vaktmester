import { render } from '@testing-library/react';
import fetch from 'cross-fetch';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const fetcher = (url: string) => {
  return fetch('http://localhost:3000' + url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
};

const renderWithSWR = (component: ReactNode) => {
  render(
    <SWRConfig value={{ provider: () => new Map(), fetcher: fetcher, dedupingInterval: 0 }}>{component}</SWRConfig>
  );
};

export { renderWithSWR };
