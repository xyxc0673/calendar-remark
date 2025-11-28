import { useIsMobile } from '@/hooks/useIsMobile';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { Lunar } from 'lunar-typescript';
import { InfoCard } from './ui';
import { useTranslation } from 'react-i18next';

const LunarInfoCard = () => {
  const { selectedDate } = useSelectedDate();
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

  // 判断是否为中文环境
  const isChineseLocale = i18n.language.startsWith('zh');

  // 如果不是中文环境，不显示农历信息
  if (!isChineseLocale) {
    return null;
  }

  const lunarDate = Lunar.fromDate(selectedDate);

  const yearInGanZhi = lunarDate.getYearInGanZhi();
  const animal = lunarDate.getYearShengXiao();
  const lunarMonth = lunarDate.getMonthInChinese();
  const lunarDay = lunarDate.getDayInChinese();

  // 宜忌，每日宜忌指当天适合做什么，不适合做什么
  const yiList = lunarDate.getDayYi();

  const jiList = lunarDate.getDayJi();

  const renderList = (list: string[]) => {
    return (
      <>
        {isMobile && (
          <div className='text-xs text-gray-600 truncate dark:text-gray-200 md:text-sm'>
            {list.join(' ')}
          </div>
        )}
        {!isMobile && (
          <div className='flex gap-1'>
            {list.map((item) => (
              <span
                key={item}
                className='px-1 text-xs text-gray-600 dark:text-gray-200 md:text-sm'
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <InfoCard className='flex gap-4 md:gap-10 dark:text-zinc-200'>
      <div className='flex flex-col gap-2 h-fit text-nowrap shrink-0'>
        <span className='text-lg'>{`${lunarMonth}${t(
          'common.month'
        )}${lunarDay}`}</span>
        <div className='flex gap-2 text-sm text-nowrap'>
          <span>{`${yearInGanZhi}${t('lunar.year')}`}</span>
          <span>{animal}</span>
        </div>
      </div>
      <div className='flex overflow-hidden flex-col gap-4 justify-center text-nowrap'>
        <div className='flex gap-2 items-center text-sm md:gap-4'>
          <span className='inline-block w-4 text-xs text-center border border-blue-500 aspect-square'>
            {t('lunar.suitable')}
          </span>
          {renderList(yiList)}
        </div>
        <div className='flex gap-2 items-center text-sm md:gap-4'>
          <span className='inline-block w-4 text-xs text-center border border-gray-400 aspect-square'>
            {t('lunar.avoid')}
          </span>
          {renderList(jiList)}
        </div>
      </div>
    </InfoCard>
  );
};

export default LunarInfoCard;
