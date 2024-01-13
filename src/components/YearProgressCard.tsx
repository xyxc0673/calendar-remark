import { useSelectedDate } from '../hooks/useSelectedDate';
import { getPercentageOfYear, isSameDate } from '../libs/date';
import { InfoCard } from './InfoCard';

// selectedDate 为 Date 对象，表示当前选中的日期
// 展示当前日期的年进度，将一年分为 12 个块，每个块代表一个月
// 其中如果当前日期在这个月内，那么这个块的背景颜色宽度根据当前日期在这个月内的进度来决定，精确到天
const YearProgressCard = () => {
  const { selectedDate } = useSelectedDate();

  const currentMonth = selectedDate.getMonth();
  const currentDay = selectedDate.getDate();
  const currentYear = selectedDate.getFullYear();
  const currentMonthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentMonthProgress = (currentDay / currentMonthDays) * 100;

  const yearProgressList = Array.from({ length: 12 }, (_, i) => {
    if (i < currentMonth) return '100%';
    if (i === currentMonth) return `${currentMonthProgress}%`;
    return '0%';
  });

  const dayOfYearProgress = getPercentageOfYear(selectedDate);

  const ifIsSameDate = isSameDate(selectedDate, new Date());

  const getTitle = () => {
    const progressText = `${dayOfYearProgress.toFixed(2)}%`;
    if (ifIsSameDate) {
      return `今年已经过去了${progressText}`;
    } else {
      return `${
        currentMonth + 1
      }月${currentDay}日在今年的进度为${progressText}`;
    }
  };

  return (
    <InfoCard className='flex flex-col gap-2'>
      <span className='text-sm text-zinc-800 dark:text-zinc-200'>
        {getTitle()}
      </span>
      <div className='flex gap-1'>
        {yearProgressList.map((progress, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-full h-4 overflow-hidden text-sm rounded-md bg-slate-200 dark:bg-zinc-400'
          >
            <div
              className='h-full rounded-md bg-slate-400 dark:bg-zinc-500'
              style={{
                width: progress,
              }}
            ></div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default YearProgressCard;
