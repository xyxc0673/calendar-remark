import { Day } from '../hooks/useCalendar';
import useIsWeekend from '../hooks/useIsWeekend';
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

  return (
    <div
      key={date.toString()}
      className={clsxm(
        'relative flex flex-col justify-center p-2 text-center text-gray-700 w-20 h-20 rounded-md cursor-pointer transition-all duration-100',
        isToday && 'bg-gray-200',
        !isSelectDay && 'hover:bg-blue-100',
        isSelectDay && 'bg-blue-400 text-white',
        isWeekend && 'text-red-500',
        !isCurrentMonth && 'opacity-50'
      )}
      onClick={() => setSelectDay(day)}
    >
      <span className='text-2xl'>{dateOfMonth}</span>
      <span className='font-light text-xs'>{lunarDate}</span>
    </div>
  );
};

export default DateComponent;
