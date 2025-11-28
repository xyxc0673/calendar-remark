import clsxm from '@/libs/clsxm';
import { useTranslation } from 'react-i18next';

const WeekdayHeader = ({
  firstDayOfWeek,
  markWeekend,
}: {
  firstDayOfWeek: number;
  markWeekend: boolean;
}) => {
  const { t } = useTranslation();

  // 从 i18n 读取本地化的星期标题
  const weekdayLabels: Array<[number, string]> = [
    [0, t('calendar.weekdays.sunday')],
    [1, t('calendar.weekdays.monday')],
    [2, t('calendar.weekdays.tuesday')],
    [3, t('calendar.weekdays.wednesday')],
    [4, t('calendar.weekdays.thursday')],
    [5, t('calendar.weekdays.friday')],
    [6, t('calendar.weekdays.saturday')],
  ];

  // 根据 firstDayOfWeek 的值来调整顺序
  const adjustedDays = [
    ...weekdayLabels.slice(firstDayOfWeek),
    ...weekdayLabels.slice(0, firstDayOfWeek),
  ];

  return (
    <>
      {adjustedDays.map(([key, day]) => (
        <div
          key={key}
          className={clsxm(
            'p-1 md:p-2 text-center font-light text-sm md:text-base dark:text-gray-300',
            markWeekend &&
              (key === 0 || key === 6) &&
              'text-red-500 dark:text-red-400'
          )}
        >
          {day}
        </div>
      ))}
    </>
  );
};

export default WeekdayHeader;
