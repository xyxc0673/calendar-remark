import { DAY_TYPE, holidayDetails } from '../configs/holidays';
import useDay, { Day } from '../hooks/useDay';
import clsxm from '../libs/clsxm';
import { getBadgeText } from '../libs/dayUtil';
import DateComponent from './DateComponent';

const getContent = (day: Day) => {
  if (day.holiday) {
    return holidayDetails[day.holiday].chinese;
  }

  if (day.solarTerm) {
    return day.solarTerm;
  }

  return day.lunarDate;
};

const DateContainer = ({
  date,
  currentMonth,
  isSelected,
  disabled,
  onClick,
}: {
  date: Date;
  currentMonth: number;
  isSelected: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const day = useDay(date);
  const { isToday, isRestDay, isWeekend } = day;
  const isCurrentMonth = date.getMonth() === currentMonth;
  const badgeText = getBadgeText(day);

  const content = getContent(day);

  const showBadge = day.isToday || day.isRestDay || day.isWorkDay;

  return (
    <DateComponent
      key={date.toString()}
      date={date}
      content={content}
      badgeText={badgeText}
      showBadge={showBadge}
      className={clsxm(
        !isSelected && !disabled && 'hover:bg-blue-100',
        isRestDay && 'bg-red-100/50',
        !isCurrentMonth && 'opacity-50',
        (isWeekend || isRestDay) && 'text-red-500',
        isRestDay && 'opacity-100',
        isToday && 'text-blue-500',
        isSelected && 'bg-blue-400 text-white',
        disabled && 'cursor-default'
      )}
      dateClassName={clsxm(
        (isWeekend || isRestDay) && 'text-red-500',
        isToday && 'text-blue-500',
        isSelected && 'text-white'
      )}
      badgeClassName={clsxm(
        day.dayType === DAY_TYPE.REST_DAY && 'bg-red-500',
        day.dayType === DAY_TYPE.WORKDAY && 'bg-blue-900',
        day.isToday && 'bg-blue-500'
      )}
      onClick={onClick}
    />
  );
};

export default DateContainer;
