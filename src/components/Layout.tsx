import Head from "next/head";
import { Tabs } from "@navikt/ds-react";
import { ReactElement } from "react";
import { Header } from "@navikt/ds-react-internal";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>AAP Vedtak Vaktmester</title>
        <link rel="fav icon" href="/favicon-16x16.png" />
      </Head>
      <Header>
        <Header.Title href={"/"}>AAP Vedtak Vaktmester</Header.Title>
      </Header>
      <Tabs value={router.pathname} size={"small"} onChange={(url) => router.push(url, undefined, { shallow: true })}>
        <Tabs.List>
          <Tabs.Tab value={"/"} label={"Topic-søk"} />
          <Tabs.Tab value={"/person"} label={"Testpersoner"} />
        </Tabs.List>
        <div className={"appContainer"}>{children}</div>
      </Tabs>
    </>
  );
};

export { Layout };
