import useNextHoliday from '../hooks/useRecentHoliday';

const RecentHoliday = ({ date }: { date: Date }) => {
  const recentHoliday = useNextHoliday(date);

  if (!recentHoliday) {
    return null;
  }

  const { date: holidayDate, details, distanceOfDays } = recentHoliday;

  const year = holidayDate.getFullYear();

  return (
    <div className='w-full px-6 py-4 text-sm text-gray-700 bg-slate-100'>
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
