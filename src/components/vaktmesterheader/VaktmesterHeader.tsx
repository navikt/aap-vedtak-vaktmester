import { Header } from '@navikt/ds-react-internal';
import React from 'react';

import { SystemMeny } from './SystemMeny';

const VaktmesterHeader = () => {
  return (
    <Header>
      <Header.Title href={'/'}>AAP Vedtak Vaktmester</Header.Title>
      <SystemMeny />
    </Header>
  );
};

export { VaktmesterHeader };
