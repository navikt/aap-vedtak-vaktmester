import {Topics} from "../Topics";
import {Button, ErrorMessage} from "@navikt/ds-react";
import {useState} from "react";
import {TopicResult} from "../topicresult/TopicResult";
import {format} from "date-fns";
import useSWR from "swr";

import styles from "./search.module.css";

const Search = () => {
  const [valgtTopic, settValgtTopic] = useState<string>("");
  const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
  const [sistOppdatert, settSistOppdatert] = useState<string>("Never!");

  const kanSøke = valgtTopic !== "" && valgtTopic !== undefined;
  const { data, error, mutate } = useSWR(kanSøke ? `/api/topic/${valgtTopic}/LATEST` : null, {
    revalidateOnFocus: false,
  });

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
      <TopicResult searchResult={data} isLoading={!data && !error && kanSøke} error={error} />
    </main>
  );
};

export { Search };
