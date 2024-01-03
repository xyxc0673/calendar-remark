import { useEffect, useRef } from 'react';
import { ChevronDown } from '../assets/icons';
import clsxm from '../libs/clsxm';

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

  return (
    <div className='relative group before:absolute before:left-0 before:right-0 before:top-0 before:block before:leading-tight before:cursor-pointer before:text-lg before:content-[""] before:-bottom-1'>
      <div className='flex items-center md:py-1 py-0.5 pl-3 pr-0.5 md:pr-1 transition-colors duration-200 bg-white border border-transparent rounded cursor-pointer hover:border-gray-600'>
        <span className='text-sm group-hover:scale-100 md:text-base'>
          {render(value)}
        </span>
        <ChevronDown className='w-6 h-6 ml-1 text-gray-500 transition-transform duration-200 group-hover:rotate-180' />
      </div>
      <div
        ref={listRef}
        className='absolute z-50 flex flex-col invisible w-full gap-1 p-1 overflow-hidden overflow-y-scroll transition-all duration-300 translate-y-0 bg-white rounded shadow opacity-0 h-60 md:h-96 shadow-slate-200 group-hover:translate-y-1 top-full group-hover:opacity-100 group-hover:visible scrollbar-track-white scrollbar-thumb-slate-300 scrollbar-thin scrollbar-thumb-rounded-full'
      >
        {valueList.map((item) => (
          <span
            ref={(el) => refs.current.set(item, el)}
            key={item}
            className={clsxm(
              'text-zinc-500 opacity-80 hover:opacity-100 whitespace-nowrap hover:text-slate-900 inline-block w-full px-3 py-1 text-center border border-transparent rounded cursor-pointer hover:border-gray-600 transition-all duration-200 text-sm md:text-base',
              item === value && 'bg-slate-200 opacity-100 text-slate-900'
            )}
            onClick={() => onChange(item)}
          >
            {render(item)}
          </span>
        ))}
      </div>
    </div>
  );
};

const CalendarHeader = ({
  setCurrentMonth,
  setCurrentYear,
  currentYear,
  currentMonth,
}: {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  setCurrentMonth: (value: number) => void;
  setCurrentYear: (value: number) => void;
  currentYear: number;
  currentMonth: number;
}) => {
  const yearList = Array.from({ length: 151 }, (_, i) => i + 1900);
  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className='flex items-center justify-center gap-4 px-3 py-2 md:px-6 md:py-4 bg-slate-100'>
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
    </div>
  );
};

export default CalendarHeader;
