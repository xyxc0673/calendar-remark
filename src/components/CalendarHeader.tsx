import { ChevronDown } from '../assets/icons';
import clsxm from '../libs/clsxm';
import useCalendar from '../hooks/useCalendar';
import { useSelectedDate } from '../hooks/useSelectedDate';
import { isAfterDate, isSameDate } from '../libs/date';
import Dropdown from './Dropdown';

const CalendarHeader = () => {
  const yearList = Array.from({ length: 151 }, (_, i) => ({
    value: i + 1900,
    label: `${i + 1900}年`,
  }));
  const monthList = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}月`,
  }));
  const { today, currentYear, currentMonth, setCurrentMonth, setCurrentYear } =
    useCalendar();
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const resetDate = () => {
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const showBackToToday =
    !isSameDate(selectedDate, today) ||
    currentMonth !== today.getMonth() ||
    currentYear !== today.getFullYear();

  const isAfterToday =
    isAfterDate(selectedDate, today) ||
    currentYear > today.getFullYear() ||
    currentMonth > today.getMonth();

  return (
    <div className='relative flex items-center justify-center gap-1.5 px-3 py-2 md:gap-4 md:px-6 md:py-4 bg-slate-100'>
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
          'h-8 flex items-center translate-x-full opacity-0 overflow-hidden transition-all duration-200 text-xs md:text-sm leading-none absolute right-3 px-2 py-1 rounded-md text-slate-600 border border-transparent hover:border-gray-600',
          showBackToToday &&
            'w-fit bg-slate-200 opacity-100 -translate-x-0 pl-0'
        )}
        onClick={resetDate}
      >
        <ChevronDown
          className={clsxm(
            'h-4 md:h-6 w-0 text-gray-500 transition-all duration-300 rotate-0 scale-50',
            showBackToToday && 'w-4 md:w-6 scale-100',
            isAfterToday && 'rotate-90',
            !isAfterToday && '-rotate-90',
            !showBackToToday && 'rotate-0'
          )}
        />
        今日
      </button>
    </div>
  );
};

export default CalendarHeader;
