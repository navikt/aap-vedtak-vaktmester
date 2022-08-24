import { Topics } from "./Topics";
import { Button, ErrorMessage, ToggleGroup } from "@navikt/ds-react";
import { useState } from "react";
import { TopicResult } from "./TopicResult";
import { format } from "date-fns";
import useSWR from "swr";

const Search = () => {
  const [valgtTopic, settValgtTopic] = useState<string>("");
  const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
  const [sortering, settSortering] = useState<string>("LATEST");
  const [sistOppdatert, settSistOppdatert] = useState<string>("Never!");

  const kanSøke = valgtTopic !== "" && valgtTopic !== undefined;
  const { data, error, mutate } = useSWR(kanSøke ? `/api/topic/${valgtTopic}/${sortering}` : null);

  const velgTopic = (topic: string) => {
    settValgtTopic(topic);
    visFeilmelding && settVisFeilmelding(false);
  };

  const soekPaaTopic = () => {
    if (kanSøke) {
      mutate();
      settSistOppdatert(format(new Date(), "dd.MM.yyyy HH:mm:ss.SSS"));
    } else {
      settVisFeilmelding(true);
    }
  };

  return (
    <main>
      <div className={"søkelinje"}>
        <div className={"blokk"}>
          <Topics velgTopic={velgTopic} />
        </div>
        <div className={"blokk"}>
          <ToggleGroup onChange={(value) => settSortering(value)} value={sortering}>
            <ToggleGroup.Item value={"LATEST"}>Nyeste</ToggleGroup.Item>
            <ToggleGroup.Item value={"EARLIEST"}>Eldste</ToggleGroup.Item>
          </ToggleGroup>
        </div>
        <div className={"blokk"}>
          <Button variant={"primary"} onClick={() => soekPaaTopic()} loading={!data && !error && kanSøke}>
            Refresh
          </Button>
          {visFeilmelding && <ErrorMessage>Du må velge topic først!</ErrorMessage>}
        </div>
        <div className={"blokk timestamp"}>Sist oppdatert: {sistOppdatert}</div>
      </div>
      <div className={"resultat"}>
        <TopicResult searchResult={data} isLoading={!data && !error && kanSøke} error={error} />
      </div>
    </main>
  );
};

export { Search };
