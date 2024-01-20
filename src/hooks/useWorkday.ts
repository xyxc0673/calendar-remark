import { workdays } from '@/configs/holidays';
import day from 'dayjs';

const useWorkday = (date: Date) => {
  const dateStr = day(date).format('YYYY-MM-DD');
  const holiday = workdays.get(dateStr);
  return holiday;
};

export default useWorkday;
