import { DAY_TYPE, holidayDetails } from '../configs/holidays';
import useDay from '../hooks/useDay';
import clsxm from '../libs/clsxm';
import { getBadgeText } from '../libs/dayUtil';
import DateComponent from './DateComponent';

const DateContainer = ({
  date,
  currentMonth,
  isSelected,
  onClick,
}: {
  date: Date;
  currentMonth: number;
  isSelected: boolean;
  onClick?: () => void;
}) => {
  const day = useDay(date);
  const { isToday, isRestDay, isWeekend } = day;
  const isCurrentMonth = date.getMonth() === currentMonth;
  const badgeText = getBadgeText(day.dayType);

  const content = day.holiday
    ? holidayDetails[day.holiday].chinese
    : day.lunarDate;

  const showBadge = day.isRestDay || day.isWorkDay;

  return (
    <DateComponent
      key={date.toString()}
      date={date}
      content={content}
      badgeText={badgeText}
      showBadge={showBadge}
      className={clsxm(
        !isSelected && !isToday && 'hover:bg-blue-100',
        isRestDay && 'bg-red-100/50',
        !isCurrentMonth && 'opacity-50',
        (isWeekend || isRestDay) && 'text-red-500',
        isRestDay && 'opacity-100',
        (isSelected || isToday) && 'bg-blue-400 text-white'
      )}
      dateClassName={clsxm(
        (isWeekend || isRestDay) && 'text-red-500',
        (isSelected || isToday) && 'text-white'
      )}
      badgeClassName={clsxm(
        day.dayType === DAY_TYPE.REST_DAY ? 'bg-red-500' : 'bg-blue-500'
      )}
      onClick={onClick}
    />
  );
};

export default DateContainer;
