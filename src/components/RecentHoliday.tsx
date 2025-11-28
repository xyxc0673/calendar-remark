import { ChevronDown, ShareExport } from '@/assets/icons';
import { useShareModal } from '@/hooks/useShareModal';
import useCalendar from '@/hooks/useCalendar';
import useNextHoliday from '@/hooks/useRecentHoliday';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { useTranslation } from 'react-i18next';
import { holidayDetails } from '@/configs/holidays';

const RecentHoliday = () => {
  const { today, setCurrentMonth, setCurrentYear } = useCalendar();
  const { setSelectedDate } = useSelectedDate();
  const recentHoliday = useNextHoliday(today);
  const { openShareModal } = useShareModal();
  const {  i18n } = useTranslation();
  
  const isChineseLocale = i18n.language.startsWith('zh');

  if (!recentHoliday) {
    return null;
  }

  const { date, details, distanceOfDays } = recentHoliday;
  
  // 获取假期名称，根据语言环境选择
  const getHolidayName = () => {
    if (isChineseLocale) {
      return details.chinese;
    }
    // 尝试从holidayDetails中获取英文名称
    const holidayKey = Object.keys(holidayDetails).find(
      key => holidayDetails[key as keyof typeof holidayDetails].chinese === details.chinese
    );
    if (holidayKey) {
      return holidayDetails[holidayKey as keyof typeof holidayDetails].english;
    }
    return details.chinese; // fallback to Chinese
  };

  const navigateToHoliday = () => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSelectedDate(date);
  };

  return (
    <div className='flex items-center justify-between px-3 py-2 bg-slate-100 md:px-6 md:py-4 dark:bg-zinc-900/20'>
      <div className='flex items-center w-full text-xs text-gray-700 md:text-sm dark:text-zinc-200'>
        {isChineseLocale ? (
          <>
            距离
            <div
              className='h-6 flex items-center mx-1 transition-all duration-200 rounded cursor-pointer hover:pr-0 group hover:bg-white dark:hover:bg-zinc-700 px-1 py-0.5 border border-transparent hover:border-gray-600'
              onClick={navigateToHoliday}
            >
              <span className='font-bold'>{getHolidayName()}</span>
              <ChevronDown className='w-0 h-6 transition-all duration-200 -rotate-90 dark:stroke-zinc-200 stroke-zinc-800 group-hover:w-6' />
            </div>
            还有
            <span
              className='px-1 mx-1 font-bold text-slate-500 dark:text-zinc-50'
              onClick={navigateToHoliday}
            >
              {distanceOfDays}
            </span>
            天
          </>
        ) : (
          <>
            <span
              className='px-1 mx-1 font-bold text-slate-500 dark:text-zinc-50'
              onClick={navigateToHoliday}
            >
              {distanceOfDays}
            </span>
            {distanceOfDays === 0 ? 'day until' : 'days until'}
            <div
              className='h-6 flex items-center mx-1 transition-all duration-200 rounded cursor-pointer hover:pr-0 group hover:bg-white dark:hover:bg-zinc-700 px-1 py-0.5 border border-transparent hover:border-gray-600'
              onClick={navigateToHoliday}
            >
              <span className='font-bold'>{getHolidayName()}</span>
              <ChevronDown className='w-0 h-6 transition-all duration-200 -rotate-90 dark:stroke-zinc-200 stroke-zinc-800 group-hover:w-6' />
            </div>
          </>
        )}
      </div>
      <button
        className='flex items-center justify-center w-6 h-6 transition-all duration-200 bg-white border border-transparent rounded cursor-pointer dark:bg-zinc-200 md:rounded-lg md:h-8 md:w-8 hover:border-gray-600'
        onClick={openShareModal}
      >
        <ShareExport className='w-4 h-4 md:h-5 md:w-5' />
      </button>
    </div>
  );
};

export default RecentHoliday;
