import { holidayDetails } from '../configs/holidays';
import { Day } from '../hooks/useCalendar';
import useHoliday from '../hooks/useHoliday';
import useIsWeekend from '../hooks/useIsWeekend';
import useRestDay from '../hooks/useRestday';
import clsxm from '../libs/clsxm';

const DateComponent = ({
  day,
  selectDay,
  setSelectDay,
}: {
  day: Day;
  selectDay?: Day;
  setSelectDay: (day: Day) => void;
}) => {
  const { date, lunarDate, isCurrentMonth, isToday } = day;
  const dateOfMonth = date.getDate();
  const isSelectDay = selectDay?.date === date;
  const isWeekend = useIsWeekend(date);
  const holiday = useHoliday(date);
  const restDay = useRestDay(date);
  const isRestDay = holiday !== undefined || restDay !== undefined;

  return (
    <div
      key={date.toString()}
      className={clsxm(
        'relative flex flex-col justify-center p-2 text-center text-gray-700 w-20 h-20 rounded-md cursor-pointer transition-all duration-100',
        !isSelectDay && !isToday && 'hover:bg-blue-100',
        isRestDay && 'bg-red-100/50',
        !isCurrentMonth && 'opacity-50',
        (isWeekend || isRestDay) && 'text-red-500',
        isRestDay && 'opacity-100',
        (isSelectDay || isToday) && 'bg-blue-400 text-white'
      )}
      onClick={() => setSelectDay(day)}
    >
      <span className='text-2xl'>{dateOfMonth}</span>
      <span
        className={clsxm(
          'text-xs text-gray-400',
          (isWeekend || isRestDay) && 'text-red-500',
          (isSelectDay || isToday) && 'text-white'
        )}
      >
        {holiday ? holidayDetails[holiday].chinese : lunarDate}
      </span>
      {isRestDay && (
        <span className='absolute w-5 h-5 leading-5 top-0 right-0 text-xs bg-red-500 text-white translate-x-1/2 -translate-y-1/2'>
          休
        </span>
      )}
    </div>
  );
};

export default DateComponent;
