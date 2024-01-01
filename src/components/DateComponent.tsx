import { DAY_TYPE, holidayDetails } from '../configs/holidays';
import { Day } from '../hooks/useCalendar';
import useHoliday from '../hooks/useHoliday';
import useIsWeekend from '../hooks/useIsWeekend';
import useRestDay from '../hooks/useRestDay';
import useWorkday from '../hooks/useWorkday';
import clsxm from '../libs/clsxm';

const getBadgeText = (dayType: DAY_TYPE) => {
  switch (dayType) {
    case DAY_TYPE.REST_DAY:
      return '休';
    case DAY_TYPE.WORKDAY:
      return '班';
    default:
      return '';
  }
};

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
  const workday = useWorkday(date);

  const isRestDay = holiday !== undefined || restDay !== undefined;
  const isWorkday = workday !== undefined;

  const showBadge = isRestDay || isWorkday;

  const dayType = isRestDay ? DAY_TYPE.REST_DAY : DAY_TYPE.WORKDAY;

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
      {showBadge && (
        <span
          className={clsxm(
            'absolute w-5 h-5 !leading-5 top-0 right-0 text-xs text-white translate-x-1/2 -translate-y-1/2',
            dayType === DAY_TYPE.REST_DAY && 'bg-red-500',
            dayType === DAY_TYPE.WORKDAY && 'bg-blue-500'
          )}
        >
          {getBadgeText(dayType)}
        </span>
      )}
    </div>
  );
};

export default DateComponent;
