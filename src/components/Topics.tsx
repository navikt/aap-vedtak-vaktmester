import { Loader, Select } from "@navikt/ds-react";
import useSWR from "swr";

interface TopicsProps {
  velgTopic: Function;
}

interface OptionType {
  label: string;
  value: string;
}

const Topics = ({ velgTopic }: TopicsProps) => {
  const { data, error } = useSWR("/api/topics");

  const handleChange = (event: React.FormEvent) => {
    velgTopic((event.target as HTMLInputElement).value);
  };

  if (!data && !error) {
    return <Loader title={"Laster topics..."} />;
  }

  if (error) {
    console.error(error);
    return <div>Klarte ikke å hente topics.</div>;
  }

  const options: OptionType[] = [{ value: "", label: "Velg topic" }];
  data.map((topic: string) => options.push({ value: topic, label: topic }));

  return (
    <Select
      label={"Topics"}
      placeholder={"Velg et topic"}
      onChange={(event: React.FormEvent) => handleChange(event)}
      size={"small"}
    >
      {options.map((topic: OptionType) => (
        <option value={topic.value} key={topic.value + "::" + topic.label}>
          {topic.label}
        </option>
      ))}
    </Select>
  );
};

export { Topics };
