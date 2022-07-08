import { Topics } from "./Topics";
import { Button, ErrorMessage, ToggleGroup } from "@navikt/ds-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { TopicResult } from "./TopicResult";
import { format } from "date-fns";

const Search = () => {
  const [valgtTopic, settValgtTopic] = useState<string>("");
  const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
  const [sortering, settSortering] = useState<string>("LATEST");
  const [sistOppdatert, settSistOppdatert] = useState<string>("Never!");
  const { isLoading, data, refetch } = useQuery(
    "topic",
    () =>
      fetch(`/aap-vaktmester/api/topic/${valgtTopic}/${sortering}`)
        .then((res) => res.json())
        .catch((error) => console.log(error)),
    {
      enabled: false,
    }
  );

  const velgTopic = (topic: string) => {
    settValgtTopic(topic);
    visFeilmelding && settVisFeilmelding(false);
  };

  const kanSøke = valgtTopic !== "" && valgtTopic !== undefined;

  const soekPaaTopic = () => {
    if (kanSøke) {
      refetch();
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
          <Button variant={"primary"} onClick={soekPaaTopic} loading={isLoading}>
            Søk
          </Button>
          {visFeilmelding && <ErrorMessage>Du må velge topic først!</ErrorMessage>}
        </div>
        <div className={"blokk timestamp"}>Sist søkt: {sistOppdatert}</div>
      </div>
      <div className={"resultat"}>
        <TopicResult searchResult={data} />
      </div>
    </main>
  );
};

export { Search };
