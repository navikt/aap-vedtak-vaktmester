import { useState } from 'react';
import useSWR from 'swr';

import { Topics } from '../Topics';
import { TopicResult } from '../topicresult/TopicResult';
import styles from './search.module.css';

const Search = () => {
  const [valgtTopic, settValgtTopic] = useState<string>('');
  const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

  const kanSøke = valgtTopic !== '' && valgtTopic !== undefined;
  const { data, error } = useSWR(kanSøke ? `/api/topic/${valgtTopic}/LATEST` : null, {
    revalidateOnFocus: false,
  });

  const velgTopic = (topic: string) => {
    settValgtTopic(topic);
    visFeilmelding && settVisFeilmelding(false);
  };

  return (
    <main>
      <div className={styles.søkelinje}>
        <Topics velgTopic={velgTopic} />
      </div>
      <TopicResult searchResult={data} isLoading={!data && !error && kanSøke} error={error} />
    </main>
  );
};

export { Search };
