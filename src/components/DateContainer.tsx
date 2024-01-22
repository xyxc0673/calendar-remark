import { holidayDetails } from '@/configs/holidays';
import { useCustomDay } from '@/hooks/useCustomDay';
import useDay, { Day } from '@/hooks/useDay';
import clsxm from '@/libs/clsxm';
import { getBadgeText } from '@/libs/dayUtil';
import DateComponent from './DateComponent';

const getContent = (day: Day, customContent?: string) => {
  if (customContent !== undefined) {
    return customContent;
  }

  if (day.holiday) {
    return holidayDetails[day.holiday].chinese;
  }

  if (day.solarTerm) {
    return day.solarTerm;
  }

  if (day.festivals.length > 0) {
    return day.festivals[0];
  }

  return day.lunarDate;
};

const DateContainer = ({
  date,
  currentMonth,
  isSelected,
  disabled,
  showContent,
  onClick,
}: {
  date: Date;
  currentMonth: number;
  isSelected: boolean;
  disabled?: boolean;
  showContent?: boolean;
  onClick?: () => void;
}) => {
  const day = useDay(date);
  const { customDay } = useCustomDay(date);
  const { isToday, isRestDay, isWeekend, isWorkDay } = day;
  const { theme, badge: customBadge, content: customContent } = customDay;
  const isCurrentMonth = date.getMonth() === currentMonth;

  const badgeText = getBadgeText(day, customBadge);

  const contentText = showContent ? getContent(day, customContent) : '';

  const showBadge = badgeText !== '';

  const isRestDayTheme = theme === 'restDay' || isRestDay;

  const isWorkdayTheme = theme === 'workday' || isWorkDay;

  return (
    <DateComponent
      key={date.toString()}
      date={date}
      content={contentText}
      badgeText={badgeText}
      showBadge={showBadge}
      className={clsxm(
        !isSelected && !disabled && 'hover:bg-blue-100 dark:hover:bg-zinc-600',
        !isCurrentMonth && 'opacity-50',
        (isWeekend || isRestDayTheme) && 'text-red-500 dark:text-red-500',
        isRestDayTheme && 'bg-red-200 opacity-100 dark:bg-red-200',
        isToday && 'text-blue-500 dark:text-blue-500',
        isSelected && 'bg-blue-400 text-white dark:text-white dark:bg-blue-400',
        disabled && 'cursor-default'
      )}
      dateClassName={clsxm(
        (isWeekend || isRestDayTheme) && 'text-red-500 dark:text-red-500',
        isToday && 'text-blue-500 dark:text-blue-500',
        isSelected && 'text-white dark:text-white'
      )}
      badgeClassName={clsxm(
        isRestDayTheme && 'bg-red-500',
        isWorkdayTheme && 'bg-blue-900',
        isToday && 'bg-blue-500'
      )}
      onClick={onClick}
    />
  );
};

export default DateContainer;
