import { Alert, BodyShort, Button, Heading, Label, Panel } from "@navikt/ds-react";
import React from "react";

interface Props {
  error: Error;
  resetErrorBoundary: Function;
  feiltekst?: string;
}

const Feilviser = ({ error, resetErrorBoundary, feiltekst = "Applikasjonen har dessverre krasjet" }: Props) => {
  return (
    <Alert variant={"error"} style={{ marginTop: "1rem" }}>
      <Heading level={"1"} size={"large"}>
        Å nei! Dette var ikke helt planlagt...
      </Heading>
      <BodyShort>{feiltekst}</BodyShort>
      <Label>Feilmelding:</Label>
      <Panel border>{error.message}</Panel>
      <Button onClick={() => resetErrorBoundary()}>Last applikasjonen på nytt</Button>
    </Alert>
  );
};

export { Feilviser };
