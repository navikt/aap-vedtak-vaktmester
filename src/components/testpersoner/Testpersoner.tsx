import { BodyShort, Button, Loader, Table, TextField } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { useState } from 'react';
import useSWR from 'swr';

import { DollyResponse } from '../../types/DollyResponse';
import { NyMeldeplikt } from '../NyMeldeplikt';

const Personrad = ({ data }: { data: DollyResponse }) => {
  return (
    <>
      <Table.ExpandableRow content={<pre>{JSON.stringify(data)}</pre>}>
        <Table.DataCell>
          <CopyToClipboard copyText={data.fødselsnummer} popoverText={'Fødselsnummer kopiert!'}>
            {data.fødselsnummer}
          </CopyToClipboard>
        </Table.DataCell>
        <Table.DataCell>{data.navn}</Table.DataCell>
        <Table.DataCell>{data.fødselsdato}</Table.DataCell>
        <Table.DataCell>
          <Button variant={'primary'} size={'small'} onClick={() => sendSøknad(data.fødselsnummer, data.fødselsdato)}>
            Send søknad
          </Button>
        </Table.DataCell>
        <Table.DataCell>
          <NyMeldeplikt personident={data.fødselsnummer} />
        </Table.DataCell>
        <Table.DataCell>
          <Button variant={'danger'} size={'small'} onClick={() => slettSøker(data.fødselsnummer)}>
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
    yrkesskadeType: 'JA',
    utbetalinger: null,
    tilleggsopplysninger: null,
    registrerteBarn: [],
    andreBarn: [],
    vedlegg: [],
  };
  const postBody = JSON.stringify(søknad);
  // @ts-ignore
  fetch(`/api/soeknad/${fnr}`, {
    method: 'POST',
    body: postBody,
  }).then((res) => {
    if (res.ok) {
      alert('Sendt søknad');
    } else {
      alert(res.statusText);
    }
  });
};

const slettSøker = (fnr: string) => {
  fetch(`/api/slett/${fnr}`, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      alert('Søknad slettet!');
    } else {
      alert(`Feil ved sletting av søknad: ${res.status} ${res.statusText}`);
    }
  });
};

const Testpersoner = () => {
  const { data, error } = useSWR<DollyResponse[]>('/api/dolly');
  const [filter, setFilter] = useState<string>('');

  if (!data && !error) {
    return <Loader title={'Henter fra Dolly'} />;
  }

  if (error) {
    console.error(error);
    return <BodyShort>Klarte ikke å hente personer.</BodyShort>;
  }
  const filtered = data?.filter(
    (testperson) =>
      testperson.fødselsnummer.includes(filter) || testperson.navn.toLowerCase().includes(filter.toLowerCase())
  );

  const søkIkkeUtført = !data;
  const ingenTreffPåSøk = data && data.length === 0;
  const ingenTreffPåFilter = data && data.length > 0 && filtered?.length === 0;

  return (
    <>
      <TextField
        label={'Filtrer på fødselsnummer eller navn'}
        size={'small'}
        onChange={(event) => setFilter(event.target.value)}
      />
      <Table size={'small'}>
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
          {søkIkkeUtført && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <BodyShort>Ikkeno data</BodyShort>
              </Table.DataCell>
            </Table.Row>
          )}
          {ingenTreffPåSøk && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <BodyShort>Dolly er tom</BodyShort>
              </Table.DataCell>
            </Table.Row>
          )}
          {ingenTreffPåFilter && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <BodyShort>Filteret ga ingen treff</BodyShort>
              </Table.DataCell>
            </Table.Row>
          )}
          {filtered && filtered.map((res: DollyResponse) => <Personrad data={res} key={res.fødselsnummer} />)}
        </Table.Body>
      </Table>
    </>
  );
};

export { Testpersoner };
