import { RefObject, useRef, useState } from "react";
import { Alert, Button, Heading, Modal, TextField } from "@navikt/ds-react";
import { useDisclosure } from "../hooks/useDisclosure";
import { format } from "date-fns";

const harVerdi = (input: string) => {
  if (input === undefined || input === null) {
    return false;
  }
  return !(input === "" || input.trim() === "");
};

const NyMeldeplikt = ({ personident }: { personident: string }) => {
  const fradatoRef = useRef<HTMLInputElement>(null);
  const tildatoRef = useRef<HTMLInputElement>(null);
  const [fradatoError, settFraDatoError] = useState<string | undefined>(undefined);
  const [tildatoError, settTilDatoError] = useState<string | undefined>(undefined);
  const [fradato, settFraDato] = useState<string>("");
  const [tildato, settTilDato] = useState<string>("");
  const [status, settStatus] = useState<{ status: string; message: string } | undefined>(undefined);
  const [senderData, settSenderData] = useState<boolean>(false);

  const validerDato = (datoRef: RefObject<HTMLInputElement>) => {
    if (!datoRef.current) {
      return "Mangler input-felt";
    }
    if (!harVerdi(datoRef.current.value)) {
      return "Du må legge inn en dato.";
    }
    if (datoRef.current.value.length !== 10) {
      return "Dato har ugyldig lengde.";
    }
    const datoString = datoRef.current.value;
    const gyldigDato = Date.parse(datoString);
    if (isNaN(gyldigDato)) {
      return `${datoString} er en ugyldig dato`;
    }
  };

  const validerFelt = () => {
    if (!fradatoRef.current || !tildatoRef.current) {
      return false;
    }
    const fradatoFeil = validerDato(fradatoRef);
    const tildatoFeil = validerDato(tildatoRef);
    if (fradatoFeil || tildatoFeil) {
      fradatoFeil && settFraDatoError(fradatoFeil);
      tildatoFeil && settTilDatoError(tildatoFeil);
      return false;
    } else {
      return true;
    }
  };

  const getDateArray = (start: Date, end: Date) => {
    const arr = [];
    const dt = new Date(start);

    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;
  };

  const postData = (event: React.FormEvent) => {
    event.preventDefault();
    if (validerFelt()) {
      settSenderData(true);

      const fom = fradatoRef.current?.value;
      const tom = tildatoRef.current?.value;
      if (!fom || !tom) {
        return;
      }

      const fraDato: Date = new Date(Date.parse(fom));
      const tilDato: Date = new Date(Date.parse(tom));

      const datoer = getDateArray(fraDato, tilDato);

      const data = datoer.map((dato) => ({
        dato: format(dato, "yyyy-MM-dd"),
        arbeidstimer: 0,
        fraværsdag: false,
      }));

      const postBody = JSON.stringify({ aktivitetPerDag: data });
      // @ts-ignore
      fetch(`/api/meldeplikt/${personident}`, {
        method: "POST",
        body: postBody,
      }).then((res) => {
        if (res.ok) {
          settStatus({ status: "ok", message: "Meldeplikt opprettet!" });
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
  return (
    <>
      <Button variant={"secondary"} size={"small"} onClick={onOpen}>
        Ny meldeplikt
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
            Opprett ny meldeplikt for {personident}
          </Heading>
          <form onSubmit={(event: React.FormEvent) => postData(event)}>
            <TextField
              ref={fradatoRef}
              label={"Fra (åååå-mm-dd)"}
              autoComplete={"off"}
              error={fradatoError}
              onChange={(event) => {
                settFraDato(event.target.value);
                fradatoError && settFraDatoError(undefined);
              }}
              value={fradato}
            />
            <TextField
              ref={tildatoRef}
              label={"Til (åååå-mm-dd)"}
              autoComplete={"off"}
              error={tildatoError}
              onChange={(event) => {
                settTilDato(event.target.value);
                tildatoError && settTilDatoError(undefined);
              }}
              value={tildato}
            />
            <div className={"knapperad"}>
              <Button variant={"primary"} loading={senderData}>
                Opprett meldeplikt
              </Button>
            </div>
            {status && <Alert variant={status.status === "ok" ? "success" : "warning"}>{status.message}</Alert>}
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export { NyMeldeplikt };
