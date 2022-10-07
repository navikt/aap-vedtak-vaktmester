import { Alert, BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";

type ModalProps = {
  pid: string;
  vis: boolean;
  lukk: Function;
};

const SlettModal = ({ pid, vis, lukk }: ModalProps) => {
  const [søkerSlettet, settSøkerSlettet] = useState<boolean>(false);
  const [mottakerSlettet, settMottakerSlettet] = useState<boolean>(false);
  const [søknadSlettet, settSøknadSlettet] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);
  const [statusmelding, settStatusmelding] = useState<string | undefined>(undefined);
  const [sletterSøker, settSletterSøker] = useState<boolean>(false);
  const [sletterMottaker, settSletterMottaker] = useState<boolean>(false);
  const [sletterSøknad, settSletterSøknad] = useState<boolean>(false);
  if (!vis) {
    return null;
  }

  const slettSøker = () => {
    settSletterSøker(true);
    fetch(`/api/soeker/${pid}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        settSøkerSlettet(true);
        settStatusmelding("Søker slettet!");
      } else {
        settFeilmelding(`Feil ved sletting av søker: ${res.status} ${res.statusText}`);
      }
      settSletterSøker(false);
    });
  };

  const slettMottaker = () => {
    settSletterMottaker(true);
    fetch(`/api/mottaker/${pid}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        settMottakerSlettet(true);
        settStatusmelding("Mottaker slettet!");
      } else {
        settFeilmelding(`Feil ved sletting av søker: ${res.status} ${res.statusText}`);
      }
      settSletterMottaker(false);
    });
  };

  const slettSøknad = () => {
    settSletterSøknad(true);
    fetch(`/api/soeknad/${pid}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        settSøknadSlettet(true);
        settStatusmelding("Søknad slettet!");
      } else {
        settFeilmelding(`Feil ved sletting av søknad: ${res.status} ${res.statusText}`);
      }
      settSletterSøknad(false);
    });
  };

  return (
    <Modal open={vis} onClose={() => lukk()} className={"modal-box"}>
      <Modal.Content>
        <Heading level={"1"} spacing size={"large"}>
          Sletting av data
        </Heading>
        <BodyShort>Key: {pid}</BodyShort>
        <Alert variant={"warning"}>Dette kan du angre på, men du kan ikke gjøre noe med det</Alert>
        <div className={"knapperad"}>
          <Button
            variant={"secondary"}
            size={"small"}
            onClick={() => slettSøker()}
            disabled={søkerSlettet}
            loading={sletterSøker}
          >
            Slett søker
          </Button>
          <Button
            variant={"secondary"}
            size={"small"}
            onClick={() => slettMottaker()}
            disabled={mottakerSlettet}
            loading={sletterMottaker}
          >
            Slett mottaker
          </Button>
          <Button
            variant={"secondary"}
            size={"small"}
            onClick={() => slettSøknad()}
            disabled={søknadSlettet}
            loading={sletterSøknad}
          >
            Slett søknad
          </Button>
        </div>
        {statusmelding && <Alert variant={"success"}>{statusmelding}</Alert>}
        {feilmelding && <Alert variant={"error"}>{feilmelding}</Alert>}
      </Modal.Content>
    </Modal>
  );
};

export { SlettModal };
