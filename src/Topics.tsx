import { useQuery } from "react-query";
import { Loader } from "@navikt/ds-react";

const Topics = () => {
  const { isLoading, error, data } = useQuery(
    "saker",
    () => fetch("/aap-vaktmester/api/topics").then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <Loader size={"2xlarge"} title={"Laster topics..."} />;
  }

  if (error) {
    return <div>Noe gikk galt.</div>;
  }
  return (
    <div>
      <ul>
        {data.map((rad: string) => (
          <li key={rad}>{rad}</li>
        ))}
      </ul>
    </div>
  );
};

export { Topics };
