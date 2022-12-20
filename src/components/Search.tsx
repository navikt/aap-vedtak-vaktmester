import { Topics } from "./Topics";
import { Button, ErrorMessage, ToggleGroup } from "@navikt/ds-react";
import { useState } from "react";
import { TopicResult } from "./TopicResult";
import { format } from "date-fns";
import useSWR from "swr";

import styles from "./search.module.css";

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
      <div className={styles.søkelinje}>
        <div className={styles.blokk}>
          <Topics velgTopic={velgTopic} />
        </div>
        <div className={styles.blokk}>
          <ToggleGroup onChange={(value) => settSortering(value)} value={sortering} size={"small"}>
            <ToggleGroup.Item value={"LATEST"}>Nyeste</ToggleGroup.Item>
            <ToggleGroup.Item value={"EARLIEST"}>Eldste</ToggleGroup.Item>
          </ToggleGroup>
        </div>
        <div className={styles.blokk}>
          <Button
            variant={"primary"}
            size={"small"}
            onClick={() => soekPaaTopic()}
            loading={!data && !error && kanSøke}
          >
            Refresh
          </Button>
          {visFeilmelding && <ErrorMessage>Du må velge topic først!</ErrorMessage>}
        </div>
        <div className={`${styles.blokk} ${styles.timestamp}`}>Sist oppdatert: {sistOppdatert}</div>
      </div>
      <div className={styles.resultat}>
        <TopicResult searchResult={data} isLoading={!data && !error && kanSøke} error={error} />
      </div>
    </main>
  );
};

export { Search };
