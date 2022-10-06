import useSWR from "swr";
import {Loader} from "@navikt/ds-react";
import {DollyResponse} from "../types/DollyResponse";


const Personer = () => {
  const { data, error } = useSWR<DollyResponse[]>("/api/dolly");

  if (!data && !error) {
    return <Loader title={"Henter fra Dolly"} />;
  }

  if (error) {
    console.error(error);
    return <div>Klarte ikke å hente personer.</div>;
  }

  return (
    <ul>
      {data?.map((person: DollyResponse) => (
        <li key={person.fødselsnummer}>{person.navn}</li>
      ))
      }
    </ul>
  )


}

export { Personer };
