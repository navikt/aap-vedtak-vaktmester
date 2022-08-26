import { TopicResponse } from "../types/TopicResponse";
import { Alert, Button, ErrorMessage, Loader, Table } from "@navikt/ds-react";
import { format } from "date-fns";
import { Buffer } from "buffer";
import { Delete } from "@navikt/ds-icons";
import { useState } from "react";
import { SlettModal } from "./SlettModal";

type TopicResultProps = {
  searchResult: TopicResponse[] | undefined;
  isLoading: boolean;
  error: Object;
};

const Rad = ({ data }: { data: TopicResponse }) => {
  const [visModal, settVisModal] = useState<boolean>(false);
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
      console.error(data.value);
    }
  };

  return (
    <>
      <Table.ExpandableRow content={<pre>{parseJSON()}</pre>}>
        <Table.DataCell>{format(dato, "dd.MM.yyyy HH:mm:ss.SSS")}</Table.DataCell>
        <Table.DataCell>{data.key}</Table.DataCell>
        <Table.DataCell>{data.topic}</Table.DataCell>
        <Table.DataCell>{data.partition}</Table.DataCell>
        <Table.DataCell>{data.offset}</Table.DataCell>
        <Table.DataCell>
          <Button
            variant={"tertiary"}
            title={"Slett søknad og søker"}
            type={"button"}
            onClick={() => settVisModal(true)}
          >
            <Delete />
          </Button>
        </Table.DataCell>
      </Table.ExpandableRow>
      <SlettModal pid={data.key} vis={visModal} lukk={() => settVisModal(false)} />
    </>
  );
};

const TopicResult = ({ searchResult, isLoading, error }: TopicResultProps) => {
  if (isLoading) {
    return <Loader size={"2xlarge"} />;
  }

  if (error) {
    return <ErrorMessage>{error.toString()}</ErrorMessage>;
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
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!searchResult && (
          <Table.Row>
            <Table.DataCell colSpan={7}>Ingen ting her enda...</Table.DataCell>
          </Table.Row>
        )}
        {searchResult && searchResult.length === 0 && (
          <Table.Row>
            <Table.DataCell colSpan={7}>
              <Alert variant={"info"}>Søket returnerte ingen treff</Alert>
            </Table.DataCell>
          </Table.Row>
        )}
        {searchResult &&
          searchResult.map((res: TopicResponse) => <Rad data={res} key={res.timestamp + res.key + res.partition} />)}
      </Table.Body>
    </Table>
  );
};

export { TopicResult };
