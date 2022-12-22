import { ReactNode } from "react";
import { SWRConfig } from "swr";
import fetch from "cross-fetch";

export const fetcher = (url: string) => {
  return fetch("http://localhost:3000" + url, { method: "GET", credentials: "include" }).then((res) => res.json());
};

interface Props {
  children: ReactNode;
}
const SWRWrapper = (props: Props) => (
  <SWRConfig value={{ provider: () => new Map(), fetcher: fetcher, dedupingInterval: 0 }}>{props.children}</SWRConfig>
);

export { SWRWrapper };
