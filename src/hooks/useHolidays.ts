import { HOLIDAY, holidayDetails, holidays } from '../configs/holidays';

export type HolidaySelect = {
  value: HOLIDAY;
  label: string;
  date: string;
};

export const useHolidays = (): HolidaySelect[] => {
  const result = Array.from(holidays).map(([date, item]) => ({
    value: item,
    label: holidayDetails[item].chinese,
    date: date,
  }));
  return result;
};
