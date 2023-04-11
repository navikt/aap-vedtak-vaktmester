import { Heading, Table } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';

interface Brukertype {
  brukerid: string;
  rolle: string;
  kommentar?: string;
}

const testbrukerliste: Brukertype[] = [
  { brukerid: 'f_Z994559.e_Z994559@trygdeetaten.no', rolle: 'VEILEDER', kommentar: 'NAV Gamle Oslo' },
  { brukerid: 'f_Z994554.e_Z994554@trygdeetaten.no', rolle: 'SAKSBEHANDLER' },
  { brukerid: 'f_Z994553.e_Z994553@trygdeetaten.no', rolle: 'SAKSBEHANDLER', kommentar: 'Strengt Fortrolig' },
  { brukerid: 'f_Z994439.e_Z994439@trygdeetaten.no', rolle: 'FATTER' },
  { brukerid: 'f_Z994524.e_Z994524@trygdeetaten.no', rolle: 'BESLUTTER' },
  { brukerid: 'f_Z994169.e_Z994169@trygdeetaten.no', rolle: 'SAKSBEHANDLER', kommentar: 'Fortrolig' },
  {
    brukerid: 'f_Z990203.e_Z990203@trygdeetaten.no',
    rolle: 'SAKSBEHANDLER og VEILEDER',
    kommentar: "'alle' nav - kontor",
  },
  { brukerid: 'f_Z990252.e_Z990252@trygdeetaten.no', rolle: 'BESLUTTER og FATTER', kommentar: "'alle' nav - kontor" },
];

const TestbrukerRad = ({ brukerid, rolle, kommentar }: Brukertype) => (
  <Table.Row>
    <Table.DataCell>
      <CopyToClipboard copyText={brukerid} popoverText={'Brukerid kopiert!'} iconPosition={'right'}>
        {brukerid}
      </CopyToClipboard>
    </Table.DataCell>
    <Table.DataCell>{rolle}</Table.DataCell>
    <Table.DataCell>{kommentar}</Table.DataCell>
  </Table.Row>
);

const Testbrukere = () => {
  return (
    <>
      <Heading size={'large'} className={'personer__heading'} spacing>
        Testbrukere
      </Heading>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Brukerident</Table.HeaderCell>
            <Table.HeaderCell>Rolle</Table.HeaderCell>
            <Table.HeaderCell>Kommentar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {testbrukerliste.map((testbruker) => (
            <TestbrukerRad
              brukerid={testbruker.brukerid}
              rolle={testbruker.rolle}
              kommentar={testbruker.kommentar}
              key={testbruker.brukerid}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export { Testbrukere };
