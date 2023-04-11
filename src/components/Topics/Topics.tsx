import { ArrowCirclepathIcon } from '@navikt/aksel-icons';
import { Button, Heading, Loader } from '@navikt/ds-react';
import { useState } from 'react';
import useSWR from 'swr';

import styles from './Topics.module.css';

interface TopicButtonProps {
  topic: string;
  isSelected: boolean;
  onClick: Function;
}
const TopicButton = ({ topic, isSelected, onClick }: TopicButtonProps) => {
  const classNames = `${styles.topicButton} ${isSelected && styles.selected}`;
  return (
    <button onClick={() => onClick()} className={classNames}>
      {topic}
    </button>
  );
};
const TopicButtons = ({ topics, velgTopic }: { topics: string[]; velgTopic: Function }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();
  const handleChange = (topic: string) => {
    setSelectedTopic(topic);
    velgTopic(topic);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {topics.map((topic) => (
        <TopicButton
          topic={topic}
          onClick={() => handleChange(topic)}
          isSelected={topic === selectedTopic}
          key={topic}
        />
      ))}
    </div>
  );
};

interface TopicsProps {
  velgTopic: Function;
}

const Topics = ({ velgTopic }: TopicsProps) => {
  const { data, error, mutate, isValidating } = useSWR('/api/topics');

  if (error) {
    console.error(error);
    return <div>Klarte ikke å hente topics.</div>;
  }

  return (
    <section className={styles.topicSearch}>
      <div>
        <Heading size={'small'} level={'2'}>
          Topics
        </Heading>
        <Button
          variant={'tertiary'}
          onClick={() => mutate()}
          icon={<ArrowCirclepathIcon />}
          size={'small'}
          disabled={isValidating}
          className={styles.refresh}
        >
          Oppdater topic-liste
        </Button>
      </div>
      {isValidating && <Loader title={'Laster topics...'} className={styles.loader} />}
      {!isValidating && data && (
        <div className={styles.topicButtons}>
          <TopicButtons topics={data} velgTopic={velgTopic} />
        </div>
      )}
    </section>
  );
};

export { Topics };
