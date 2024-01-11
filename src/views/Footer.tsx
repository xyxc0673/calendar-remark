import { useState } from 'react';
import { CrossCircle, Github, Settings } from '../assets/icons';
import { FirstDayOfWeek, usePreference } from '../hooks/usePreference';
import clsxm from '../libs/clsxm';
import { RadioButtonGroup } from '../components/Radio';
import ThemeToggle from '../components/ThemeToggle';

const SettingPage = ({
  isOpen,
  onCancel,
}: {
  isOpen: boolean;
  onCancel: () => void;
}) => {
  const {
    preference: { firstDayOfWeek, showExtraDays },
    toggleShowExtraDays,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
  } = usePreference();
  const options = [
    { value: FirstDayOfWeek.Monday, label: '周一' },
    { value: FirstDayOfWeek.Sunday, label: '周日' },
  ];

  const handleOptionChange = (value: string | number) => {
    if (value === FirstDayOfWeek.Monday) {
      setFirstDayOfWeekToMonday();
    } else if (value === FirstDayOfWeek.Sunday) {
      setFirstDayOfWeekToSunday();
    }
  };

  return (
    <div
      className={clsxm(
        'flex flex-col absolute left-0 top-0 overflow-hidden w-60 h-fit bg-white dark:bg-zinc-800 border border-zinc-400/20 dark:border-zinc-500/30 dark:text-zinc-200 transition-all duration-300 shadow-lg rounded-lg',
        isOpen
          ? 'opacity-100 scale-100 -translate-x-full -translate-y-full'
          : 'opacity-0 scale-0'
      )}
    >
      <div className='relative flex items-center justify-end px-2 py-2 text-center bg-slate-100 dark:bg-zinc-600'>
        <span className='absolute py-2 text-xs text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:text-sm'>
          设置
        </span>
        <CrossCircle
          className='text-gray-500 transition-all duration-200 cursor-pointer size-4 md:size-6 hover:text-gray-700 hover:rotate-90 dark:stroke-gray-400'
          onClick={onCancel}
        />
      </div>
      <div className='flex flex-col flex-1 gap-4 p-4 text-sm'>
        <div className='flex items-center justify-between'>
          <span>显示非本月日期</span>
          <div className='relative inline-block align-middle transition duration-200 ease-in select-none'>
            <input
              type='checkbox'
              className='opacity-0 sr-only peer'
              id='toggle'
              checked={showExtraDays}
              onChange={toggleShowExtraDays}
            />
            <label
              htmlFor='toggle'
              className='relative flex h-5 w-10 md:h-6 md:w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-4 before:w-4  md:before:h-5 md:before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-blue-500'
            >
              <span className='sr-only'>Enable</span>
            </label>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span>一周的开始</span>
          <RadioButtonGroup
            value={firstDayOfWeek}
            options={options}
            onChange={handleOptionChange}
          />
        </div>
      </div>
      <span className='py-2 text-xs text-center bg-slate-100 md:text-sm dark:bg-zinc-600'>
        v0.0.1
      </span>
    </div>
  );
};

const SettingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <div
        className='flex items-center justify-center transition-all duration-200 border border-transparent rounded-lg cursor-pointer size-6 md:size-8 group hover:bg-white hover:border-slate-500 dark:hover:bg-zinc-600'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className='size-4 md:size-6 dark:stroke-zinc-400' />
      </div>
      <SettingPage isOpen={isOpen} onCancel={() => setIsOpen(false)} />
    </div>
  );
};

export const Footer = () => {
  return (
    <div className='relative flex items-center justify-between h-8 md:h-10'>
      <div className='flex items-center h-full px-4 py-1 text-sm rounded-full bg-slate-100 dark:bg-black/40 dark:text-zinc-200'>
        光阴荏苒，日月如梭
      </div>
      <div className='flex gap-4 px-4 py-1 rounded-full bg-slate-100 dark:bg-black/40'>
        <a
          href='https://github.com/xyxc0673/calendar-remark'
          target='_blank'
          className='flex items-center justify-center transition-all duration-200 border border-transparent rounded-lg cursor-pointer size-6 md:size-8 group hover:bg-white hover:border-slate-500 dark:hover:bg-zinc-600'
        >
          <Github className='size-4 md:size-6 dark:stroke-zinc-400' />
        </a>
        <ThemeToggle />
        <SettingButton />
      </div>
    </div>
  );
};
