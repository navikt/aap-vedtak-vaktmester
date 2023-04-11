import { ExternalLink, System } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import { Dropdown, Header } from '@navikt/ds-react-internal';
import React from 'react';

export const SystemMeny = () => {
  return (
    <Dropdown>
      <Header.Button as={Dropdown.Toggle} style={{ marginLeft: 'auto' }}>
        <System style={{ fontSize: '1.5rem' }} title={'Systemer'} />
      </Header.Button>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>Systemer</Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item>
            <Link href={'https://aap-sink-utforsker.intern.dev.nav.no'} target={'_blank'}>
              AAP-sink utforsker <ExternalLink />
            </Link>
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
};
