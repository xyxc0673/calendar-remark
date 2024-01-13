import { Lunar, Solar } from 'lunar-typescript';

const useFestivals = (date: Date) => {
  const solarDate = Solar.fromDate(date);
  const lunarDate = Lunar.fromDate(date);

  const solarFestivals = solarDate.getFestivals();
  const lunarFestivals = lunarDate.getFestivals();

  const festival = [...lunarFestivals, ...solarFestivals];

  return festival;
};

export default useFestivals;
