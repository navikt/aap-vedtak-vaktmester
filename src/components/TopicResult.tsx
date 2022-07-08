import { TopicResponse } from "../types/TopicResponse";
import { Loader, Table } from "@navikt/ds-react";
import { format } from "date-fns";
import { Buffer } from "buffer";

type TopicResultProps = {
  searchResult: TopicResponse[] | undefined;
  isLoading: boolean;
};

const Rad = ({ data }: { data: TopicResponse }) => {
  const dato = new Date(data.timestamp);
  const parseJSON = () => {
    if (!data.value) {
      return "No JSON here...";
    }
    try {
      const buf = Buffer.from(data.value, "base64");
      const jsonString = JSON.parse(buf.toString());
      return JSON.stringify(jsonString, null, 2);
    } catch (error) {
      console.error("Klarte ikke å parse json. " + error);
    }
  };

  return (
    <Table.ExpandableRow content={<pre>{parseJSON()}</pre>}>
      <Table.DataCell>{format(dato, "dd.MM.yyyy HH:mm:ss.SSS")}</Table.DataCell>
      <Table.DataCell>{data.key}</Table.DataCell>
      <Table.DataCell>{data.topic}</Table.DataCell>
      <Table.DataCell>{data.partition}</Table.DataCell>
      <Table.DataCell>{data.offset}</Table.DataCell>
    </Table.ExpandableRow>
  );
};

const TopicResult = ({ searchResult, isLoading }: TopicResultProps) => {
  if (isLoading) {
    return <Loader size={"2xlarge"} />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
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
            <Table.DataCell colSpan={6}>Ingen ting her enda...</Table.DataCell>
          </Table.Row>
        )}
        {searchResult &&
          searchResult.map((res: TopicResponse) => <Rad data={res} key={res.timestamp + res.key + res.partition} />)}
      </Table.Body>
    </Table>
  );
};

export { TopicResult };
