import { ChevronDown } from '../assets/icons';
import useCalendar from '../hooks/useCalendar';
import useNextHoliday from '../hooks/useRecentHoliday';
import { useSelectedDate } from '../hooks/useSelectedDate';

const RecentHoliday = () => {
  const { today, setCurrentMonth, setCurrentYear } = useCalendar();
  const { setSelectedDate } = useSelectedDate();
  const recentHoliday = useNextHoliday(today);

  if (!recentHoliday) {
    return null;
  }

  const { date, details, distanceOfDays } = recentHoliday;

  const navigateToHoliday = () => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSelectedDate(date);
  };

  return (
    <div className='flex items-center w-full px-3 py-2 text-xs text-gray-700 md:px-6 md:py-4 bg-slate-100 md:text-sm'>
      距离
      <div className='h-6 flex items-center mx-1 transition-all duration-200 rounded cursor-pointer hover:pr-0 group hover:bg-white px-1 py-0.5 border border-transparent hover:border-gray-600'>
        <span className='font-bold text-slate-500' onClick={navigateToHoliday}>
          {details.chinese}
        </span>
        <ChevronDown className='w-0 h-6 transition-all duration-200 -rotate-90 text-slate-500 group-hover:w-6' />
      </div>
      还有
      <span
        className='px-1 mx-1 font-bold text-slate-500'
        onClick={navigateToHoliday}
      >
        {distanceOfDays}
      </span>
      天
    </div>
  );
};

export default RecentHoliday;
