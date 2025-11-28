import {
  CrossCircle,
  Settings,
  Github,
  LayoutVertical,
  LayoutHorizontal,
} from '@/assets/icons';
import Checkbox from '@/components/ui/Checkbox';
import { RadioButtonGroup } from '@/components/ui';
import ThemeToggle from '@/components/ThemeToggle';
import { usePreference, FirstDayOfWeek } from '@/hooks/usePreference';
import clsxm from '@/libs/clsxm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/i18n';

const SettingPage = ({
  isOpen,
  onCancel,
}: {
  isOpen: boolean;
  onCancel: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const {
    preference: { firstDayOfWeek, showExtraDays, showDateContent, markWeekend },
    toggleShowExtraDays,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
    toggleShowDateContent,
    toggleMarkWeekend,
  } = usePreference();

  const options = [
    { value: FirstDayOfWeek.Monday, label: t('calendar.weekdays.monday') },
    { value: FirstDayOfWeek.Sunday, label: t('calendar.weekdays.sunday') },
  ];

  const languageOptions = Object.entries(supportedLanguages).map(
    ([code, name]) => ({
      value: code,
      label: name,
    })
  );

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
        'flex overflow-hidden absolute left-0 -top-3 flex-col w-72 bg-white rounded-lg border shadow-lg transition-all duration-300 origin-bottom-right -translate-x-full -translate-y-full h-fit dark:bg-zinc-800 border-zinc-400/20 dark:border-zinc-500/30 dark:text-zinc-200',
        isOpen
          ? 'visible opacity-100 scale-100'
          : 'invisible opacity-0 scale-95'
      )}
    >
      <div className='flex relative justify-end items-center px-2 py-2 text-center bg-slate-100 dark:bg-zinc-600'>
        <span className='absolute top-1/2 left-1/2 py-2 text-xs text-center -translate-x-1/2 -translate-y-1/2 md:text-sm'>
          {t('settings.title')}
        </span>
        <CrossCircle
          className='text-gray-500 transition-all duration-200 cursor-pointer size-4 md:size-6 hover:text-gray-700 hover:rotate-90 dark:stroke-gray-400'
          onClick={onCancel}
        />
      </div>
      <div className='flex flex-col flex-1 gap-4 p-4 text-sm'>
        <div className='flex justify-between items-center'>
          <span>{t('settings.markWeekend')}</span>
          <Checkbox checked={markWeekend} onChange={toggleMarkWeekend} />
        </div>
        <div className='flex justify-between items-center'>
          <span>{t('settings.showExtraDays')}</span>
          <Checkbox checked={showExtraDays} onChange={toggleShowExtraDays} />
        </div>
        <div className='flex justify-between items-center'>
          <span>{t('settings.showDateContent')}</span>
          <Checkbox
            checked={showDateContent}
            onChange={toggleShowDateContent}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span>{t('settings.weekStart')}</span>
          <RadioButtonGroup
            value={firstDayOfWeek}
            options={options}
            onChange={handleOptionChange}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span>{t('settings.language')}</span>
          <RadioButtonGroup
            value={i18n.language as SupportedLanguage}
            options={languageOptions}
            onChange={(value) => i18n.changeLanguage(String(value))}
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
        className='flex justify-center items-center rounded-lg border border-transparent transition-all duration-200 cursor-pointer size-6 md:size-8 group hover:bg-white hover:border-slate-500 dark:hover:bg-zinc-600'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className='size-4 md:size-6 dark:stroke-zinc-400' />
      </div>
      <SettingPage isOpen={isOpen} onCancel={() => setIsOpen(false)} />
    </div>
  );
};

const LayoutToggle = () => {
  const {
    preference: { desktopLayout },
    toggleDesktopLayout,
  } = usePreference();

  const Icon =
    desktopLayout === 'horizontal' ? LayoutVertical : LayoutHorizontal;

  return (
    <button
      className='hidden relative justify-center items-center rounded-lg border border-transparent transition-all duration-200 cursor-pointer md:flex size-6 md:size-8 group hover:bg-white hover:border-slate-500 dark:hover:bg-zinc-600'
      onClick={toggleDesktopLayout}
    >
      <Icon className='size-4 md:size-6 dark:stroke-zinc-400' />
    </button>
  );
};

export const Footer = () => {
  return (
    <div className='flex relative justify-between items-center h-8 md:h-10'>
      <div className='relative flex justify-center items-center h-full px-4 py-1 overflow-hidden text-sm rounded-full cursor-default bg-slate-100 dark:bg-black/40 dark:text-zinc-200 [--slide-duration:16s]'>
        <span className='animate-slide-up will-change-transform'>
          光阴荏苒，日月如梭
        </span>
        <span className='absolute text-nowrap animate-slide-up will-change-transform [animation-delay:calc(var(--slide-duration)/2)] translate-y-full opacity-0'>
          A Project By{' '}
          <a
            href='https://xym.im'
            target='_blank'
            className='bg-gradient-to-r from-[#e68765] to-[#f0b7a3] bg-clip-text text-transparent font-bold'
          >
            XYXC
          </a>
        </span>
      </div>
      <div className='flex gap-4 px-4 py-1 rounded-full bg-slate-100 dark:bg-black/40'>
        <a
          href='https://github.com/xyxc0673/calendar-remark'
          target='_blank'
          className='flex justify-center items-center rounded-lg border border-transparent transition-all duration-200 cursor-pointer size-6 md:size-8 group hover:bg-white hover:border-slate-500 dark:hover:bg-zinc-600'
        >
          <Github className='size-4 md:size-6 dark:stroke-zinc-400' />
        </a>
        <LayoutToggle />
        <ThemeToggle />
        <SettingButton />
      </div>
    </div>
  );
};
