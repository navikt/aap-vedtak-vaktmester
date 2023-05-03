import { Alert, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { format } from 'date-fns';
import { useState } from 'react';

import { useDisclosure } from '../hooks/useDisclosure';
import { getDateArray, validerDato } from '../lib/dates';

const NyMeldeplikt = ({ personident }: { personident: string }) => {
  const [fraDato, setFraDato] = useState<string>('');
  const [tilDato, setTilDato] = useState<string>('');
  const [fradatoError, settFraDatoError] = useState<string | undefined>(undefined);
  const [tildatoError, settTilDatoError] = useState<string | undefined>(undefined);
  const [status, settStatus] = useState<{ status: string; message: string } | undefined>(undefined);
  const [senderData, settSenderData] = useState<boolean>(false);

  const validerFelt = () => {
    const fradatoFeil = validerDato(fraDato);
    const tildatoFeil = validerDato(tilDato);
    if (fradatoFeil || tildatoFeil) {
      fradatoFeil && settFraDatoError(fradatoFeil);
      tildatoFeil && settTilDatoError(tildatoFeil);
      return false;
    } else {
      return true;
    }
  };

  const postData = (event) => {
    event.preventDefault();
    if (validerFelt()) {
      settSenderData(true);

      const datoer = getDateArray(new Date(Date.parse(fraDato)), new Date(Date.parse(tilDato)));

      const data = datoer.map((dato) => ({
        dato: format(dato, 'yyyy-MM-dd'),
        arbeidstimer: 0,
        fraværsdag: false,
      }));

      const postBody = JSON.stringify({ aktivitetPerDag: data });
      fetch(`/api/meldeplikt/${personident}`, {
        method: 'POST',
        body: postBody,
      }).then((res) => {
        if (res.ok) {
          settStatus({ status: 'ok', message: 'Meldeplikt opprettet!' });
        } else {
          settStatus({ status: 'not_ok', message: 'Noe feilet: ' + res.statusText });
        }
        settSenderData(false);
      });
    } else {
      console.log('Skjema inneholder feil.');
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure(false);
  return (
    <>
      <Button variant={'secondary'} size={'small'} onClick={onOpen}>
        Ny meldeplikt
      </Button>
      <Modal
        open={isOpen}
        onClose={() => {
          onClose();
          settStatus(undefined);
        }}
        shouldCloseOnOverlayClick={false}
        closeButton={true}
        className={'modal-box'}
      >
        <Modal.Content>
          <Heading level={'1'} spacing size={'large'}>
            Opprett ny meldeplikt for {personident}
          </Heading>
          <form onSubmit={(event) => postData(event)}>
            <TextField
              label={'Fra (åååå-mm-dd)'}
              autoComplete={'off'}
              error={fradatoError}
              onChange={(e) => {
                fradatoError && settFraDatoError(undefined);
                setFraDato(e.target.value);
              }}
            />
            <TextField
              label={'Til (åååå-mm-dd)'}
              autoComplete={'off'}
              error={tildatoError}
              onChange={(e) => {
                tildatoError && settTilDatoError(undefined);
                setTilDato(e.target.value);
              }}
            />
            <div className={'knapperad'}>
              <Button variant={'primary'} loading={senderData}>
                Opprett meldeplikt
              </Button>
            </div>
            {status && <Alert variant={status.status === 'ok' ? 'success' : 'warning'}>{status.message}</Alert>}
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export { NyMeldeplikt };
