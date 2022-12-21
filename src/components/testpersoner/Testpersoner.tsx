import useSWR from "swr";
import { Button, Loader, Table } from "@navikt/ds-react";
import { DollyResponse } from "../../types/DollyResponse";
import { NyMeldeplikt } from "../NyMeldeplikt";
import { CopyToClipboard } from "@navikt/ds-react-internal";

const Personrad = ({ data }: { data: DollyResponse }) => {
  return (
    <>
      <Table.ExpandableRow content={<pre>{JSON.stringify(data)}</pre>}>
        <Table.DataCell>
          <CopyToClipboard copyText={data.fødselsnummer} popoverText={"Fødselsnummer kopiert!"}>
            {data.fødselsnummer}
          </CopyToClipboard>
        </Table.DataCell>
        <Table.DataCell>{data.navn}</Table.DataCell>
        <Table.DataCell>{data.fødselsdato}</Table.DataCell>
        <Table.DataCell>
          <Button variant={"primary"} size={"small"} onClick={() => sendSøknad(data.fødselsnummer, data.fødselsdato)}>
            Send søknad
          </Button>
        </Table.DataCell>
        <Table.DataCell>
          <NyMeldeplikt personident={data.fødselsnummer} />{" "}
        </Table.DataCell>
        <Table.DataCell>
          <Button variant={"danger"} size={"small"} onClick={() => slettSøker(data.fødselsnummer)}>
            Slett søker
          </Button>
        </Table.DataCell>
      </Table.ExpandableRow>
    </>
  );
};

const sendSøknad = (fnr: string, fdato: string) => {
  const søknad = {
    fødselsdato: fdato,
    innsendingTidspunkt: new Date(),
    sykepenger: true,
    ferie: null,
    studier: { erStudent: null, kommeTilbake: null, vedlegg: [] },
    medlemsskap: {
      boddINorgeSammenhengendeSiste5: true,
      jobbetUtenforNorgeFørSyk: null,
      jobbetSammenhengendeINorgeSiste5: null,
      iTilleggArbeidUtenforNorge: null,
      utenlandsopphold: [],
    },
    registrerteBehandlere: [],
    andreBehandlere: [],
    yrkesskadeType: "JA",
    utbetalinger: null,
    tilleggsopplysninger: null,
    registrerteBarn: [],
    andreBarn: [],
    vedlegg: [],
  };
  const postBody = JSON.stringify(søknad);
  // @ts-ignore
  fetch(`/api/soeknad/${fnr}`, {
    method: "POST",
    body: postBody,
  }).then((res) => {
    if (res.ok) {
      alert("Sendt søknad");
    } else {
      alert(res.statusText);
    }
  });
};

const slettSøker = (fnr: string) => {
  fetch(`/api/slett/${fnr}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      alert("Søknad slettet!");
    } else {
      alert(`Feil ved sletting av søknad: ${res.status} ${res.statusText}`);
    }
  });
};

const Testpersoner = () => {
  const { data, error } = useSWR<DollyResponse[]>("/api/dolly");

  if (!data && !error) {
    return <Loader title={"Henter fra Dolly"} />;
  }

  if (error) {
    console.error(error);
    return <div>Klarte ikke å hente personer.</div>;
  }

  return (
    <Table size={"small"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
          <Table.HeaderCell>Navn</Table.HeaderCell>
          <Table.HeaderCell>Fødselsdato</Table.HeaderCell>
          <Table.HeaderCell colSpan={3} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!data && (
          <Table.Row>
            <Table.DataCell colSpan={7}>Ikkeno data</Table.DataCell>
          </Table.Row>
        )}
        {data && data.length === 0 && (
          <Table.Row>
            <Table.DataCell colSpan={7}>Dolly er tom</Table.DataCell>
          </Table.Row>
        )}
        {data && data.map((res: DollyResponse) => <Personrad data={res} key={res.fødselsnummer} />)}
      </Table.Body>
    </Table>
  );
};

export { Testpersoner };
