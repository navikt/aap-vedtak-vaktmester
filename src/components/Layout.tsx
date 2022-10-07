import Head from "next/head";
import { Heading } from "@navikt/ds-react";
import { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => (
  <>
    <Head>
      <title>AAP Vedtak Vaktmester</title>
      <link rel="fav icon" href="/favicon-16x16.png" />
    </Head>
    <div className={"appContainer"}>
      <Heading size={"xlarge"} level={"1"}>
        AAP Vedtak Vaktmester
      </Heading>
      {children}
    </div>
  </>
);

export { Layout };
