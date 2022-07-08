import { TopicResponse } from "../types/TopicResponse";
import { Table } from "@navikt/ds-react";
import { format } from "date-fns";

type TopicResultProps = {
  searchResult: TopicResponse[] | undefined;
};

const Rad = ({ data }: { data: TopicResponse }) => {
  const dato = new Date(data.timestamp);
  return (
    <Table.Row>
      <Table.DataCell>{format(dato, "dd.MM.yyyy HH:mm:ss.SSS")}</Table.DataCell>
      <Table.DataCell>{data.key}</Table.DataCell>
      <Table.DataCell>{data.topic}</Table.DataCell>
      <Table.DataCell>{data.partition}</Table.DataCell>
      <Table.DataCell>{data.offset}</Table.DataCell>
    </Table.Row>
  );
};

const TopicResult = ({ searchResult }: TopicResultProps) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Topic</Table.HeaderCell>
          <Table.HeaderCell>Partition</Table.HeaderCell>
          <Table.HeaderCell>Offset</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!searchResult && (
          <Table.Row>
            <Table.DataCell colSpan={5}>Ingen ting her enda...</Table.DataCell>
          </Table.Row>
        )}
        {searchResult &&
          searchResult.map((res: TopicResponse) => <Rad data={res} key={res.timestamp + res.key + res.partition} />)}
      </Table.Body>
    </Table>
  );
};

export { TopicResult };
