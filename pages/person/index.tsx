import { GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Feilviser } from '../../src/components/Feilviser';
import { Testpersoner } from '../../src/components/testpersoner/Testpersoner';

function feilRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: Function }) {
  return (
    <Feilviser
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      feiltekst={'Noe gikk galt med spørringen mot Dolly'}
    />
  );
}

const PersonPage = () => {
  return (
    <ErrorBoundary fallbackRender={feilRender}>
      <Heading size={'large'} className={'personer__heading'}>
        Funksjoner for alle testpersonene vi har
      </Heading>
      <GuidePanel className={'personer__panel'}>
        Her kan man sende inn testdata for de testpersonene som ligger i Dolly. Det er kun personer i denne listen som
        vi kan garantere at fungerer i systemet. Dette er funksjonene vi tilbyr:
        <ul>
          <li>Send søknad - Trykk på denne knappen for å lage en søknad</li>
          <li>Ny meldeplikt - Opprett et nytt meldekort for bruker</li>
          <li>Slett søker - Slette søkeren fra systemet så du kan begynne på nytt</li>
        </ul>
      </GuidePanel>
      <Testpersoner />
    </ErrorBoundary>
  );
};

export default PersonPage;
