import { TopicResponse } from "../../types/TopicResponse";
import { Alert, BodyShort, Button, ErrorMessage, Loader, Table, TextField } from "@navikt/ds-react";
import { format } from "date-fns";
import { Buffer } from "buffer";
import { Delete } from "@navikt/ds-icons";
import { useState } from "react";
import { SlettModal } from "../SlettModal";

import styles from "./topicResult.module.css";
import {sortData, useHandleSort} from "./TopicResultUtil";

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
  const [filter, setFilter] = useState<string>("");
  const {sort, handleSort} = useHandleSort();

  if (isLoading) {
    return <Loader size={"2xlarge"} />;
  }

  if (error) {
    return (
      <ErrorMessage>
        <BodyShort>{error.toString()}</BodyShort>
      </ErrorMessage>
    );
  }

  const filteredResult = searchResult?.filter((topicResponse) => topicResponse.key.includes(filter));
  const sortedAndFilteredResult = sortData(filteredResult, sort);

  const søkIkkeUtført = !searchResult;
  const ingenTreffPåSøk = searchResult && searchResult.length === 0;
  const ingenTreffPåFilter = searchResult && searchResult.length > 0 && sortedAndFilteredResult?.length === 0;

  return (
    <div className={styles.resultat}>
      <TextField
        label={"Filter på key"}
        onChange={(event) => setFilter(event.target.value)}
        size={"small"}
        className={styles.filterInput}
      />
      <Table size={"small"} sort={sort} onSortChange={(sortKey) => handleSort(sortKey)}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.ColumnHeader sortKey={'timestamp'} sortable>Timestamp</Table.ColumnHeader>
            <Table.ColumnHeader>Key</Table.ColumnHeader>
            <Table.ColumnHeader>Topic</Table.ColumnHeader>
            <Table.ColumnHeader>Partition</Table.ColumnHeader>
            <Table.ColumnHeader sortKey={'offset'} sortable>Offset</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {søkIkkeUtført && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <BodyShort>Ingen ting her enda...</BodyShort>
              </Table.DataCell>
            </Table.Row>
          )}
          {ingenTreffPåSøk && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <Alert variant={"info"}>
                  <BodyShort>Søket returnerte ingen treff</BodyShort>
                </Alert>
              </Table.DataCell>
            </Table.Row>
          )}
          {ingenTreffPåFilter && (
            <Table.Row>
              <Table.DataCell colSpan={7}>
                <BodyShort>Ingen treff på filter</BodyShort>
              </Table.DataCell>
            </Table.Row>
          )}
          {sortedAndFilteredResult &&
            sortedAndFilteredResult.map((res: TopicResponse) => (
              <Rad data={res} key={res.timestamp + res.key + res.partition + res.topic + res.offset} />
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export { TopicResult };
