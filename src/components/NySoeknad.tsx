import { useRef, useState } from "react";
import { Alert, Button, Heading, Modal, TextField } from "@navikt/ds-react";
import { useDisclosure } from "../hooks/useDisclosure";
import { tilfeldigDato } from "../lib/dates";

const harVerdi = (input: string) => {
  if (input === undefined || input === null) {
    return false;
  }
  return !(input === "" || input.trim() === "");
};

const NySoeknad = () => {
  const fdatoRef = useRef<HTMLInputElement>(null);
  const pidRef = useRef<HTMLInputElement>(null);
  const [fdatoError, settFDatoError] = useState<string | undefined>(undefined);
  const [pidError, settPidError] = useState<string | undefined>(undefined);
  const [fdato, settFDato] = useState<string>("");
  const [status, settStatus] = useState<{ status: string; message: string } | undefined>(undefined);
  const [senderData, settSenderData] = useState<boolean>(false);

  const validerPid = () => {
    if (!pidRef.current) {
      return "Mangler input-felt";
    }
    if (!harVerdi(pidRef.current.value)) {
      return "Du må legge inn personident.";
    }
    if (!pidRef.current.value.match(/^\d{11}$/)) {
      return "Personident har ugyldig verdi. Må være 11 siffer.";
    }
    return undefined;
  };

  const validerFdato = () => {
    if (!fdatoRef.current) {
      return "Mangler input-felt";
    }
    if (!harVerdi(fdatoRef.current.value)) {
      return "Du må legge inn en fødselsdato.";
    }
    if (fdatoRef.current.value.length !== 10) {
      return "Dato har ugyldig lengde.";
    }
    const datoString = fdatoRef.current.value;
    const gyldigDato = Date.parse(datoString);
    if (isNaN(gyldigDato)) {
      return `${datoString} er en ugyldig dato`;
    }
  };

  const validerFelt = () => {
    if (!fdatoRef.current || !pidRef.current) {
      return false;
    }
    const pidFeil = validerPid();
    const fdatoFeil = validerFdato();
    if (pidFeil || fdatoFeil) {
      pidFeil && settPidError(pidFeil);
      fdatoFeil && settFDatoError(fdatoFeil);
      return false;
    } else {
      return true;
    }
  };

  const postData = (event: React.FormEvent) => {
    event.preventDefault();
    if (validerFelt()) {
      settSenderData(true);
      // @ts-ignore
      const postBody = JSON.stringify({ fødselsdato: fdatoRef.current.value });
      // @ts-ignore
      fetch(`/api/soeknad/${pidRef.current.value}`, {
        method: "POST",
        body: postBody,
      }).then((res) => {
        if (res.ok) {
          settStatus({ status: "ok", message: "Søknad opprettet!" });
        } else {
          settStatus({ status: "not_ok", message: "Noe feilet: " + res.statusText });
        }
        settSenderData(false);
      });
    } else {
      console.log("Skjema inneholder feil.");
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const settTilfeldigFdato = () => {
    settFDato(tilfeldigDato(18, 62));
  };
  return (
    <>
      <Button variant={"secondary"} onClick={onOpen} size={"small"}>
        Ny søknad
      </Button>
      <Modal
        open={isOpen}
        onClose={() => {
          onClose();
          settStatus(undefined);
        }}
        shouldCloseOnOverlayClick={false}
        closeButton={true}
        className={"modal-box"}
      >
        <Modal.Content>
          <Heading level={"1"} spacing size={"large"}>
            Opprett ny søknad
          </Heading>
          <form onSubmit={(event: React.FormEvent) => postData(event)}>
            <TextField
              ref={pidRef}
              label={"Personident"}
              autoComplete={"off"}
              error={pidError}
              onChange={() => pidError && settPidError(undefined)}
            />
            <TextField
              ref={fdatoRef}
              label={"Fødselsdato (åååå-mm-dd)"}
              autoComplete={"off"}
              error={fdatoError}
              onChange={(event) => {
                settFDato(event.target.value);
                fdatoError && settFDatoError(undefined);
              }}
              value={fdato}
            />
            <div className={"knapperad"}>
              <Heading level={"3"} size={"medium"}>
                Tilfeldig fødselsdato
              </Heading>
              <Button variant={"secondary"} type={"button"} onClick={settTilfeldigFdato}>
                {"18 - 62"}
              </Button>
            </div>
            <div className={"knapperad"}>
              <Button variant={"primary"} loading={senderData}>
                Opprett søknad
              </Button>
            </div>
            {status && <Alert variant={status.status === "ok" ? "success" : "warning"}>{status.message}</Alert>}
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export { NySoeknad };
