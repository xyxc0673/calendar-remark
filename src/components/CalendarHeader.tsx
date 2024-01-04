import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from '../assets/icons';
import clsxm from '../libs/clsxm';
import useCalendar from '../hooks/useCalendar';
import { useSelectedDate } from '../hooks/useSelectedDate';
import { isAfterDate, isSameDate } from '../libs/date';

const DateSelector = ({
  valueList,
  value,
  render,
  onChange,
}: {
  valueList: number[];
  value: number;
  render: (value: number) => string;
  onChange: (value: number) => void;
}) => {
  const [active, setActive] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef(new Map<number, HTMLSpanElement | null>());

  useEffect(() => {
    const currentRef = refs.current.get(value);
    if (currentRef && listRef.current) {
      listRef.current.scrollTo({
        top: currentRef.offsetTop - 4,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleValueChange = (value: number) => {
    onChange(value);
    setActive(false);
  };

  return (
    <div className='relative' onMouseLeave={() => setActive(false)}>
      <div
        className='flex items-center md:py-1 py-0.5 pl-3 pr-0.5 md:pr-1 transition-colors duration-200 bg-white border border-transparent rounded cursor-pointer hover:border-gray-600'
        onClick={() => setActive(!active)}
        onMouseEnter={() => setActive(true)}
      >
        <span className='text-sm md:text-base'>{render(value)}</span>
        <ChevronDown
          className={clsxm(
            'w-6 h-6 ml-1 text-gray-500 transition-transform duration-200rotate-180',
            active && 'rotate-180'
          )}
        />
      </div>
      <div className='h-1 opacity-0 top-full'></div>
      <div
        ref={listRef}
        className={clsxm(
          'absolute z-50 flex flex-col invisible w-full -translate-y-1 gap-1 p-1 overflow-hidden overflow-y-scroll transition-all duration-300 bg-white rounded shadow opacity-0 h-60 md:h-96 shadow-slate-200 top-full scrollbar-track-white scrollbar-thumb-slate-300 scrollbar-thin scrollbar-thumb-rounded-full',
          active && 'translate-y-0 opacity-100 visible'
        )}
      >
        {valueList.map((item) => (
          <span
            ref={(el) => refs.current.set(item, el)}
            key={item}
            className={clsxm(
              'text-zinc-500 opacity-80 hover:opacity-100 whitespace-nowrap hover:text-slate-900 inline-block w-full px-3 py-1 text-center border border-transparent rounded cursor-pointer hover:border-gray-600 transition-all duration-200 text-sm md:text-base',
              item === value && 'bg-slate-200 opacity-100 text-slate-900'
            )}
            onClick={() => handleValueChange(item)}
          >
            {render(item)}
          </span>
        ))}
      </div>
    </div>
  );
};

const CalendarHeader = () => {
  const yearList = Array.from({ length: 151 }, (_, i) => i + 1900);
  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);
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
    <div className='relative flex items-center justify-center gap-4 px-3 py-2 md:px-6 md:py-4 bg-slate-100'>
      <DateSelector
        valueList={yearList}
        value={currentYear}
        render={(value) => `${value}年`}
        onChange={setCurrentYear}
      />
      <DateSelector
        valueList={monthList}
        value={currentMonth + 1}
        render={(value) => `${value}月`}
        onChange={(value) => setCurrentMonth(value - 1)}
      />
      <button
        className={clsxm(
          'flex items-center translate-x-full opacity-0 overflow-hidden transition-all duration-200 text-xs md:text-sm leading-none absolute right-3 pr-2 py-1 rounded-md text-slate-600',
          showBackToToday && 'w-fit bg-slate-200 opacity-100 -translate-x-0'
        )}
        onClick={resetDate}
      >
        <ChevronDown
          className={clsxm(
            'w-6 h-6 text-gray-500 -rotate-90 transition-transform duration-200',
            isAfterToday && 'rotate-90'
          )}
        />
        返回今日
      </button>
    </div>
  );
};

export default CalendarHeader;
