import { days } from '../configs/constant';
import clsxm from '../libs/clsxm';

const WeekdayHeader = ({ firstDayOfWeek }: { firstDayOfWeek: number }) => {
  // 根据 firstDayOfWeek 的值来调整 days Map 的顺序
  const adjustedDays = new Map([
    ...Array.from(days).slice(firstDayOfWeek),
    ...Array.from(days).slice(0, firstDayOfWeek),
  ]);

  return (
    <>
      {Array.from(adjustedDays).map(([key, day]) => (
        <div
          key={key}
          className={clsxm(
            'p-1 md:p-2 text-center font-light text-sm md:text-base',
            key === 0 && 'text-red-500',
            key === 6 && 'text-red-500'
          )}
        >
          {day}
        </div>
      ))}
    </>
  );
};

export default WeekdayHeader;
