import { Alert, BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";

type ModalProps = {
  pid: string;
  vis: boolean;
  lukk: Function;
};

const SlettModal = ({ pid, vis, lukk }: ModalProps) => {
  const [søkerSlettet, settSøkerSlettet] = useState<boolean>(false);
  const [søknadSlettet, settSøknadSlettet] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);
  if (!vis) {
    return null;
  }

  const slettSøker = () => {
    fetch(`/api/soeker/${pid}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        settSøkerSlettet(true);
      } else {
        settFeilmelding(`Feil ved sletting av søker: ${res.status} ${res.statusText}`);
      }
    });
  };

  const slettSøknad = () => {
    fetch(`/api/soeknad/${pid}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        settSøknadSlettet(true);
      } else {
        settFeilmelding(`Feil ved sletting av søknad: ${res.status} ${res.statusText}`);
      }
    });
  };

  return (
    <Modal open={vis} onClose={() => lukk()} className={"modal-box"}>
      <Modal.Content>
        <Heading level={"1"} spacing size={"large"}>
          Sletting av data
        </Heading>
        <BodyShort>Key: {pid}</BodyShort>
        <Alert variant={"warning"}>Dette kan du ikke angre på</Alert>
        <div className={"knapperad"}>
          <Button variant={"secondary"} onClick={() => slettSøker()} disabled={søkerSlettet}>
            Slett søker
          </Button>
          <Button variant={"secondary"} onClick={() => slettSøknad()} disabled={søknadSlettet}>
            Slett søknad
          </Button>
        </div>
        {feilmelding && <Alert variant={"error"}>{feilmelding}</Alert>}
      </Modal.Content>
    </Modal>
  );
};

export { SlettModal };
