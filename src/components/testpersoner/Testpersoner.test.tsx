import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { DollyResponse } from '../../types/DollyResponse';
import { renderWithSWR } from '../test/renderWithSWR';
import { Testpersoner } from './Testpersoner';

const testpersoner: DollyResponse[] = [
  {
    fødselsdato: '1987-09-17',
    navn: 'Flagrende Katt',
    fødselsnummer: '17098700135',
  },
  {
    fødselsdato: '1973-12-01',
    navn: 'Glitrende Kaprifol',
    fødselsnummer: '01127300975',
  },
  {
    fødselsdato: '1991-01-24',
    navn: 'Skrekkelig Rombe',
    fødselsnummer: '24019100879',
  },
  {
    fødselsdato: '2000-05-09',
    navn: 'Taktil Trapes',
    fødselsnummer: '09050000234',
  },
];
const user = userEvent.setup();
describe('Testpersoner', () => {
  describe('tabell', () => {
    test('viser laster-animasjon når vi laster data', () => {
      render(<Testpersoner />);
      expect(screen.getByText('Henter fra Dolly')).toBeInTheDocument();
    });
    test('viser tabell med data', async () => {
      server.use(rest.get('/api/dolly', (req, res, ctx) => res(ctx.status(200), ctx.json(testpersoner))));
      renderWithSWR(<Testpersoner />);
      const lasterElement = screen.getByText('Henter fra Dolly');
      expect(lasterElement).toBeInTheDocument();
      await waitForElementToBeRemoved(lasterElement);
      expect(screen.getByRole('columnheader', { name: /Fødselsnummer/ })).toBeVisible();
      expect(screen.getByRole('columnheader', { name: /Navn/ })).toBeVisible();
      expect(screen.getByRole('columnheader', { name: /Fødselsdato/ })).toBeVisible();
      expect(screen.getByRole('cell', { name: testpersoner[0].navn })).toBeVisible();
    });
    test('viser melding når svaret ikke inneholder noen personer', async () => {
      server.use(rest.get('/api/dolly', (req, res, ctx) => res(ctx.status(200), ctx.json([]))));
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      expect(screen.getByText(/^Dolly er tom$/)).toBeVisible();
    });
    test('viser feilmelding når søket feiler', async () => {
      server.use(rest.get('/api/dolly', (req, res) => res.networkError('Internal server error')));
      console.error = jest.fn();
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      expect(screen.getByText('Klarte ikke å hente personer.')).toBeVisible();
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('filter', () => {
    test('viser filter-input', async () => {
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      expect(screen.getByRole('textbox', { name: /Filtrer på fødselsnummer/ })).toBeVisible();
    });

    test('kan skrive i filter-elementet', async () => {
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      const filterInput = screen.getByRole('textbox', { name: /Filtrer på fødselsnummer/ });
      await user.type(filterInput, '1709');
      expect(filterInput).toHaveValue('1709');
    });

    test('filtrerer listen over testpersoner på fødselsnummer', async () => {
      server.use(rest.get('/api/dolly', (req, res, ctx) => res(ctx.status(200), ctx.json(testpersoner))));
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      // +1 for header-rad
      expect(screen.getAllByRole('row')).toHaveLength(testpersoner.length + 1);

      const filterInput = screen.getByRole('textbox', { name: /Filtrer på fødselsnummer eller navn/ });
      await user.type(filterInput, '1709');
      // 1 rad + 1 for header
      expect(screen.queryByText('Filteret ga ingen treff')).not.toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(1 + 1);
      expect(screen.getByText(testpersoner[0].navn)).toBeVisible();
      expect(screen.queryByText(testpersoner[1].navn)).not.toBeInTheDocument();
    });

    test('filtrerer listen over testpersoner på navn', async () => {
      server.use(rest.get('/api/dolly', (req, res, ctx) => res(ctx.status(200), ctx.json(testpersoner))));
      renderWithSWR(<Testpersoner />);
      await waitForElementToBeRemoved(screen.getByText('Henter fra Dolly'));
      // +1 for header-rad
      expect(screen.getAllByRole('row')).toHaveLength(testpersoner.length + 1);

      const filterInput = screen.getByRole('textbox', { name: /Filtrer på fødselsnummer eller navn/ });
      await user.type(filterInput, 'il Tr');
      // 1 rad + 1 for header
      expect(screen.queryByText('Filteret ga ingen treff')).not.toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(1 + 1);
      expect(screen.getByText(testpersoner[3].navn)).toBeVisible();
    });
  });
});
