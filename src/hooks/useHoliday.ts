import { holidays } from '@/configs/holidays';
import day from 'dayjs';

const useHoliday = (date: Date) => {
  const dateStr = day(date).format('YYYY-MM-DD');
  const holiday = holidays.get(dateStr);
  return holiday;
};

export default useHoliday;
