import { days } from '../configs/constant';
import clsxm from '../libs/clsxm';

const WeekdayHeader = () => {
  return (
    <>
      {Array.from(days).map(([key, day]) => (
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
