import { Day } from '../hooks/useCalendar';
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

  return (
    <div
      key={date.toString()}
      className={clsxm(
        'relative flex flex-col justify-center p-2 text-center text-gray-500 w-16 h-16 rounded-md cursor-pointer transition-all duration-100',
        isCurrentMonth && 'text-black',
        isToday && 'bg-gray-200',
        !isSelectDay && 'hover:bg-blue-100',
        isSelectDay && 'bg-blue-400 text-white'
      )}
      onClick={() => setSelectDay(day)}
    >
      <span className='font-bold text-2xl'>{dateOfMonth}</span>
      <span className='font-thin text-xs'>{lunarDate}</span>
    </div>
  );
};

export default DateComponent;
