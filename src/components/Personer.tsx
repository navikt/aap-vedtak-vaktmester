import useSWR from "swr";
import {Loader, Table} from "@navikt/ds-react";
import {DollyResponse} from "../types/DollyResponse";

const Personrad = ({data}: {data: DollyResponse}) => {

  return (
    <>
      <Table.ExpandableRow content={<pre>Ikke noe her enda</pre>}>
        <Table.DataCell>{data.fødselsnummer}</Table.DataCell>
        <Table.DataCell>{data.navn}</Table.DataCell>
        <Table.DataCell>{data.fødselsdato}</Table.DataCell>
      </Table.ExpandableRow>
    </>
  )
}



const Personer = () => {
  const { data, error } = useSWR<DollyResponse[]>("/api/dolly");

  if (!data && !error) {
    return <Loader title={"Henter fra Dolly"} />;
  }

  if (error) {
    console.error(error);
    return <div>Klarte ikke å hente personer.</div>;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
          <Table.HeaderCell>Navn</Table.HeaderCell>
          <Table.HeaderCell>Fødselsdato</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!data && (
          <Table.Row>
            <Table.DataCell colSpan={2}>Ikkeno data</Table.DataCell>
          </Table.Row>
        )}
        {data && data.length === 0 && (
          <Table.Row>
            <Table.DataCell colSpan={2}>Dolly er tom</Table.DataCell>
          </Table.Row>
        )}
        {data &&
          data.map((res: DollyResponse) => <Personrad data={res} key={res.fødselsnummer} />)
        }
      </Table.Body>
    </Table>
  )


}

export { Personer };