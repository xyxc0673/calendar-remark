import { ChevronDown } from '@/assets/icons';
import useCalendar from '@/hooks/useCalendar';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { useSelectedHoliday } from '@/hooks/useSelectedHoliday';
import clsxm from '@/libs/clsxm';
import { HolidaySelect, getHolidays } from '@/libs/date';
import { Dropdown } from './ui';
import { isAfter, isSameDay } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { holidayDetails } from '@/configs/holidays';

const CalendarHeader = () => {
  const { t, i18n } = useTranslation();
  const isChineseLocale = i18n.language.startsWith('zh');
  
  // 根据语言环境生成年份和月份列表
  const yearList = Array.from({ length: 151 }, (_, i) => ({
    value: i + 1900,
    label: isChineseLocale ? `${i + 1900}年` : `${i + 1900}`,
  }));
  
  const monthList = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: isChineseLocale 
      ? `${i + 1}月` 
      : new Date(2000, i, 1).toLocaleDateString('en-US', { month: 'short' }),
  }));
  const { today, currentYear, currentMonth, setCurrentMonth, setCurrentYear } =
    useCalendar();
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { selectedHoliday, setSelectedHoliday } = useSelectedHoliday();

  // 获取假期列表并根据语言环境调整显示
  const holidayList = getHolidays().map(holiday => ({
    ...holiday,
    label: isChineseLocale 
      ? holiday.label 
      : (() => {
          // 尝试从holidayDetails中获取英文名称
          const holidayKey = Object.keys(holidayDetails).find(
            key => holidayDetails[key as keyof typeof holidayDetails].chinese === holiday.label
          );
          return holidayKey 
            ? holidayDetails[holidayKey as keyof typeof holidayDetails].english
            : holiday.label;
        })()
  }));

  const navigateToHoliday = (nextHoliday: HolidaySelect) => {
    const date = new Date(nextHoliday.date);
    setSelectedDate(date);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSelectedHoliday(nextHoliday.value);
  };

  const resetDate = () => {
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedHoliday(undefined);
  };

  const showBackToToday =
    !isSameDay(selectedDate, today) ||
    currentMonth !== today.getMonth() ||
    currentYear !== today.getFullYear();

  const isAfterToday =
    isAfter(selectedDate, today) ||
    currentYear > today.getFullYear() ||
    currentMonth > today.getMonth();

  return (
    <div className='relative flex items-center justify-center gap-1.5 px-3 py-2 md:gap-4 md:px-6 md:py-4 bg-slate-100 dark:bg-zinc-900/20'>
      <Dropdown
        options={holidayList}
        value={selectedHoliday}
        placeholder={t('calendar.holidays')}
        className='absolute left-3 min-w-9'
        onChange={navigateToHoliday}
      />
      <Dropdown
        options={yearList}
        value={currentYear}
        onChange={(item) => setCurrentYear(item.value)}
      />
      <Dropdown
        options={monthList}
        value={currentMonth + 1}
        onChange={(item) => setCurrentMonth(item.value - 1)}
      />
      <button
        className={clsxm(
          'h-8 flex items-center translate-x-full opacity-0 overflow-hidden transition-all duration-200 text-xs md:text-sm leading-none absolute right-3 px-2 py-1 rounded-md text-slate-600 border border-transparent hover:border-gray-600 dark:text-black',
          showBackToToday &&
            'w-fit bg-slate-200 opacity-100 -translate-x-0 pl-0 dark:bg-zinc-200'
        )}
        onClick={resetDate}
      >
        <ChevronDown
          className={clsxm(
            'h-4 md:h-6 w-0 text-gray-500 transition-all duration-300 rotate-0 scale-50 dark:text-gray-400',
            showBackToToday && 'w-4 md:w-6 scale-100',
            isAfterToday && 'rotate-90',
            !isAfterToday && '-rotate-90',
            !showBackToToday && 'rotate-0'
          )}
        />
        {t('common.today')}
      </button>
    </div>
  );
};

export default CalendarHeader;
