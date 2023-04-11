import { Caseworker, People, Search } from '@navikt/ds-icons';
import { Tabs } from '@navikt/ds-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { NaisBorder } from '../naisboarder/NaisBorder';
import { VaktmesterHeader } from '../vaktmesterheader/VaktmesterHeader';

interface Props {
  children: ReactElement;
}

const Layout = (props: Props) => {
  const { children } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AAP Vedtak Vaktmester</title>
        <link
          rel="fav icon"
          href="/Users/thomasrognes/Documents/Kildekode/aap-vedtak-vaktmester/public/favicon-16x16.png"
        />
      </Head>
      <VaktmesterHeader />
      <NaisBorder />
      <Tabs value={router.pathname} size={'small'} onChange={(url) => router.push(url, undefined, { shallow: true })}>
        <Tabs.List>
          <Tabs.Tab value={'/'} label={'Topic-søk'} icon={<Search title={'Søk i topics'} />} />
          <Tabs.Tab value={'/person'} label={'Testpersoner'} icon={<People title={'Testpersoner'} />} />
          <Tabs.Tab value={'/testbrukere'} label={'Testbrukere'} icon={<Caseworker title={'Testbrukere'} />} />
        </Tabs.List>
      </Tabs>
      <div className={'appContainer'}>{children}</div>
    </>
  );
};

export { Layout };
