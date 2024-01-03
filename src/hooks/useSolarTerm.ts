import { Lunar } from 'lunar-typescript';

export const useSolarTerm = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);
  const solarTerm = lunarDate.getJieQi();
  return solarTerm;
};
