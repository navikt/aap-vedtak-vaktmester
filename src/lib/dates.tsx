import { format, fromUnixTime, getUnixTime, subYears } from "date-fns";

const tilfeldigTall = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const tilfeldigDato = (fraAar: number, tilAar: number) => {
  const naa = new Date();
  const startAlder = subYears(naa, fraAar);
  const stoppAlder = subYears(naa, tilAar);
  const rand = tilfeldigTall(getUnixTime(stoppAlder), getUnixTime(startAlder));
  return format(fromUnixTime(rand), "yyyy-MM-dd");
};
