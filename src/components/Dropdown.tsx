import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '../assets/icons';
import clsxm from '../libs/clsxm';

type DefaultOptionType = {
  label: React.ReactNode;
  value: string | number | undefined;
};

type DropdownProps<T extends DefaultOptionType> = {
  options: T[];
  value?: T['value'];
  className?: string;
  placeholder?: string;
  onChange: (item: T) => void;
};

const Dropdown = <T extends DefaultOptionType>({
  options,
  value,
  className,
  placeholder,
  onChange,
}: DropdownProps<T>) => {
  const [active, setActive] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef(new Map<T, HTMLSpanElement | null>());
  const currentItem = options.find((item) => item.value === value);

  useEffect(() => {
    if (!currentItem) {
      return;
    }
    const currentRef = refs.current.get(currentItem);
    if (currentRef && listRef.current) {
      listRef.current.scrollTo({
        top: currentRef.offsetTop - 4,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleChange = (value: T) => {
    onChange(value);
    setActive(false);
  };

  return (
    <div
      className={clsxm('relative', className)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className='flex items-center md:py-1 py-0.5 pl-1.5 pr-0.5 md:pl-3 md:pr-1 transition-colors duration-200 bg-white border border-transparent rounded cursor-pointer dark:bg-zinc-200 hover:border-gray-600 dark:hover:border-gray-200'
        onClick={() => setActive(!active)}
        onMouseEnter={() => setActive(true)}
      >
        <span className='text-sm md:text-base'>
          {currentItem ? currentItem.label : placeholder}
        </span>
        <ChevronDown
          className={clsxm(
            'w-4 h-4 md:w-6 md:h-6 ml-1 text-gray-500 transition-transform duration-200rotate-180',
            active && 'rotate-180'
          )}
        />
      </div>
      <div className='absolute w-full h-1 opacity-0 top-full'></div>
      <div
        ref={listRef}
        className={clsxm(
          'absolute z-50 left-1/2 -translate-x-1/2 flex flex-col invisible w-fit translate-y-0 gap-1 p-1 overflow-hidden overflow-y-auto transition-all duration-300 bg-white dark:bg-zinc-200 rounded shadow opacity-0 max-h-60 md:max-h-96 shadow-slate-200 top-full scrollbar-track-white scrollbar-thumb-slate-300 scrollbar-thin scrollbar-thumb-rounded-full',
          active && 'translate-y-1 opacity-100 visible'
        )}
      >
        {options.map((option) => (
          <span
            ref={(el) => refs.current.set(option, el)}
            key={option.value}
            className={clsxm(
              'text-zinc-500 opacity-80 hover:opacity-100 whitespace-nowrap hover:text-slate-900 inline-block w-full px-3 py-1 text-center border border-transparent rounded cursor-pointer hover:border-gray-600 transition-all duration-200 text-sm md:text-base',
              option.value === value &&
                'bg-slate-200 opacity-100 text-slate-900 dark:bg-zinc-300 dark:text-slate-900'
            )}
            onClick={() => handleChange(option)}
          >
            {option?.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
