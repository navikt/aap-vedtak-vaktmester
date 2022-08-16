import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import { Search } from "../src/components/Search";

const Homepage = () => {
  return (
    <>
      <Head>
        <title>AAP Vedtak Vaktmester</title>
        <link rel="fav icon" href="/favicon-16x16.png" />
      </Head>
      <div className={"appContainer"}>
        <Heading size={"xlarge"} level={"1"}>
          AAP Vedtak Vaktmester
        </Heading>
        <Search />
      </div>
    </>
  );
};

export default Homepage;
