import Head from "next/head";
import { Tabs } from "@navikt/ds-react";
import { ReactElement } from "react";
import { Header } from "@navikt/ds-react-internal";
import { useRouter } from "next/router";
import { Caseworker, People, Search } from "@navikt/ds-icons";

import styles from './Layout.module.css';

const NaisBorder = () => (<div className={styles.naisBorder} />);
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
      <NaisBorder />
      <Tabs value={router.pathname} size={"small"} onChange={(url) => router.push(url, undefined, { shallow: true })}>
        <Tabs.List>
          <Tabs.Tab value={"/"} label={"Topic-søk"} icon={<Search title={"Søk i topics"} />} />
          <Tabs.Tab value={"/person"} label={"Testpersoner"} icon={<People title={"Testpersoner"} />} />
          <Tabs.Tab value={"/testbrukere"} label={"Testbrukere"} icon={<Caseworker title={"Testbrukere"} />} />
        </Tabs.List>
        <div className={"appContainer"}>{children}</div>
      </Tabs>
    </>
  );
};

export { Layout };
