import { restDays } from '../configs/holidays';
import day from 'dayjs';

const useRestDay = (date: Date) => {
  const dateStr = day(date).format('YYYY-MM-DD');
  const holiday = restDays.get(dateStr);
  return holiday;
};

export default useRestDay;
