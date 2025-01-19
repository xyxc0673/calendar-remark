import { holidayDetails } from '@/configs/holidays';
import { useCustomDay } from '@/hooks/useCustomDay';
import clsxm from '@/libs/clsxm';
import { getBadgeText } from '@/libs/day';
import DateComponent from './DateComponent';
import { Day } from '@/interfaces/day';

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
  day,
  markWeekend,
  isSelected,
  disabled,
  showContent,
  highlightToday,
  isCurrentMonth,
  dimNonCurrentMonth,
  onClick,
}: {
  day: Day;
  markWeekend?: boolean;
  isSelected: boolean;
  disabled?: boolean;
  showContent?: boolean;
  highlightToday?: boolean;
  isCurrentMonth?: boolean;
  // 添加一个参数决定不是当前月份的日期是否半透明
  dimNonCurrentMonth?: boolean;
  onClick?: () => void;
}) => {
  const { date } = day;
  const { customDay } = useCustomDay(date);
  const { isToday, isRestDay, isWeekend, isWorkDay } = day;
  const { theme, badge: customBadge, content: customContent } = customDay;

  const badgeText = getBadgeText(day, customBadge);

  const contentText = showContent ? getContent(day, customContent) : '';

  const showBadge =
    (isToday && highlightToday && badgeText !== '') ||
    (!isToday && badgeText !== '');

  const isCustomNone = theme === '';

  const isCustomRestDay = theme === 'restDay';

  const isCustomWorkday = theme === 'workday';

  const isRestDayTheme =
    !isCustomNone && !isCustomWorkday && (theme === 'restDay' || isRestDay);

  const isWorkdayTheme =
    !isCustomNone && !isCustomRestDay && (theme === 'workday' || isWorkDay);

  return (
    <DateComponent
      key={date.toString()}
      date={date}
      content={contentText}
      badgeText={badgeText}
      showBadge={showBadge}
      className={clsxm(
        !isSelected && !disabled && 'hover:bg-blue-100 dark:hover:bg-zinc-600',
        !isCurrentMonth && dimNonCurrentMonth && 'opacity-50',
        ((markWeekend && isWeekend) || isRestDayTheme) &&
          'text-red-500 dark:text-red-500',
        isRestDayTheme && 'bg-red-200 opacity-100 dark:bg-red-200',
        highlightToday && isToday && 'text-blue-500 dark:text-blue-500',
        isSelected && 'bg-blue-400 text-white dark:text-white dark:bg-blue-400',
        disabled && 'cursor-default'
      )}
      dateClassName={clsxm(
        ((markWeekend && isWeekend) || isRestDayTheme) &&
          'text-red-500 dark:text-red-500',
        highlightToday && isToday && 'text-blue-500 dark:text-blue-500',
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

DateContainer.defaultProps = {
  highlightToday: true,
  dimNonCurrentMonth: true,
};
