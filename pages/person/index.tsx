import {Heading} from "@navikt/ds-react";
import {Personer} from "../../src/components/Personer";
import Link from "next/link";


const PersonPage = () => {
    return (
      <>
        <Heading size={'large'}>
          Funksjoner for alle testpersonene vi har
        </Heading>
        <Link href={"/"}>Tilbake til forside</Link>
        <blockquote>
          Her kan man sende inn testdata for de testpersonene som ligger i Dolly.
          Det er kun personer i denne listen som vi kan garantere at fungerer i systemet.
          Dette er funksjonene vi tilbyr:
          <ul>
            <li>
              Send søknad - Trykk på denne knappen for å lage en søknad
            </li>
            <li>
              Ny meldeplikt - Opprett et nytt meldekort for bruker
            </li>
            <li>
              Slett søker - Slette søkeren fra systemet så du kan begynne på nytt
            </li>
          </ul>
        </blockquote>
        <Personer />
      </>
    )

};

export default PersonPage;
