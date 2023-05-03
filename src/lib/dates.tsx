import { format, fromUnixTime, getUnixTime, subYears } from 'date-fns';

const tilfeldigTall = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const tilfeldigDato = (fraAar: number, tilAar: number) => {
  const naa = new Date();
  const startAlder = subYears(naa, fraAar);
  const stoppAlder = subYears(naa, tilAar);
  const rand = tilfeldigTall(getUnixTime(stoppAlder), getUnixTime(startAlder));
  return format(fromUnixTime(rand), 'yyyy-MM-dd');
};

const harVerdi = (input: string) => {
  if (input === undefined || input === null) {
    return false;
  }
  return !(input === '' || input.trim() === '');
};

export const validerDato = (dato: string) => {
  if (!harVerdi(dato)) {
    return 'Du må legge inn en dato.';
  }
  if (dato.toString().length !== 10) {
    return 'Dato har ugyldig lengde.';
  }
  const datoString = dato;
  const gyldigDato = Date.parse(datoString);
  if (isNaN(gyldigDato)) {
    return `${datoString} er en ugyldig dato`;
  }
};

export const getDateArray = (start: Date, end: Date) => {
  const arr = [];
  const dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
};
