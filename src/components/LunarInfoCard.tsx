import { Lunar } from 'lunar-typescript';
import { useSelectedDate } from '../hooks/useSelectedDate';
import { InfoCard } from './InfoCard';

const LunarInfoCard = () => {
  const { selectedDate } = useSelectedDate();

  const lunarDate = Lunar.fromDate(selectedDate);

  const yearInGanZhi = lunarDate.getYearInGanZhi();
  const animal = lunarDate.getYearShengXiao();
  const lunarMonth = lunarDate.getMonthInChinese();
  const lunarDay = lunarDate.getDayInChinese();

  // 宜忌，每日宜忌指当天适合做什么，不适合做什么
  const yiList = lunarDate.getDayYi().slice(0, 5);

  const jiList = lunarDate.getDayJi().slice(0, 5);

  return (
    <InfoCard className='flex gap-4 md:gap-10'>
      <div className='flex flex-col gap-2 h-fit text-nowrap'>
        <span className='text-lg'>{`${lunarMonth}月${lunarDay}`}</span>
        <div className='flex gap-2 text-sm text-nowrap'>
          <span>{`${yearInGanZhi}年`}</span>
          <span>{animal}</span>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 text-nowrap'>
        <div className='flex items-center gap-2 text-sm md:gap-4'>
          <span className='inline-block w-4 text-xs text-center border border-blue-500 aspect-square'>
            宜
          </span>
          <div className='flex gap-1'>
            {yiList.map((yi) => (
              <span key={yi} className='px-1 text-gray-600'>
                {yi}
              </span>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2 text-sm md:gap-4'>
          <span className='inline-block w-4 text-xs text-center border border-gray-400 aspect-square'>
            忌
          </span>
          <div className='flex gap-1'>
            {jiList.map((ji) => (
              <span key={ji} className='px-1 text-gray-600'>
                {ji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </InfoCard>
  );
};

export default LunarInfoCard;
