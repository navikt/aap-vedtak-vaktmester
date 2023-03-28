import React from "react";
import { Header } from "@navikt/ds-react-internal";
import { SystemMeny } from "./SystemMeny";

const VaktmesterHeader = () => {
  return (
    <Header>
      <Header.Title href={"/"}>AAP Vedtak Vaktmester</Header.Title>
      <SystemMeny />
    </Header>
  );
};

export { VaktmesterHeader };
