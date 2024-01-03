import useCalendar from '../hooks/useCalendar';
import useNextHoliday from '../hooks/useRecentHoliday';

const RecentHoliday = () => {
  const { today } = useCalendar();
  const recentHoliday = useNextHoliday(today);

  if (!recentHoliday) {
    return null;
  }

  const { date: holidayDate, details, distanceOfDays } = recentHoliday;

  const year = holidayDate.getFullYear();

  return (
    <div className='w-full px-3 py-2 text-xs text-gray-700 md:px-6 md:py-4 bg-slate-100 md:text-base'>
      距离
      <span className='px-1 font-bold text-slate-500'>
        {year}年{details.chinese}
      </span>
      还有
      <span className='px-1 font-bold text-slate-500'>{distanceOfDays}</span>天
    </div>
  );
};

export default RecentHoliday;
