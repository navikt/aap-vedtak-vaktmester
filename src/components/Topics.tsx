import { Loader, Select } from "@navikt/ds-react";
import { useQuery } from "react-query";

interface TopicsProps {
  velgTopic: Function;
}

interface OptionType {
  label: string;
  value: string;
}

const Topics = ({ velgTopic }: TopicsProps) => {
  const { isLoading, error, data } = useQuery(
    "topics",
    () =>
      fetch("/aap-vaktmester/api/topics")
        .then((res) => res.json())
        .catch((error) => console.log(error)),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleChange = (event: React.FormEvent) => {
    velgTopic((event.target as HTMLInputElement).value);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Oh noes!</div>;
  }

  const options: OptionType[] = [{ value: "", label: "Velg topic" }];
  data.map((topic: string) => options.push({ value: topic, label: topic }));

  return (
    <Select label={"Topics"} placeholder={"Velg et topic"} onChange={(event: React.FormEvent) => handleChange(event)}>
      {options.map((topic: OptionType) => (
        <option value={topic.value} key={topic.value + "::" + topic.label}>
          {topic.label}
        </option>
      ))}
    </Select>
  );
};

export { Topics };
