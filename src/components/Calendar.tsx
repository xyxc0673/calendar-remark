import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { FirstDayOfWeek } from '@/hooks/usePreference';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { isSameDate } from '@/libs/date';
import { Day } from '@/interfaces/day';
import { useMemo } from 'react';
import { generateDay } from '@/libs/day';
import { useAtomValue } from 'jotai';
import { currentMonthAtom } from '@/hooks/useCalendar';

const DateGrid = ({
  dateList,
  showExtraDays,
  showDateContent,
  isSharing,
  highlightToday,
}: {
  dateList: Date[];
  showExtraDays: boolean;
  showDateContent: boolean;
  isSharing?: boolean;
  highlightToday?: boolean;
}) => {
  const currentMonth = useAtomValue(currentMonthAtom);
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const dayList = useMemo(() => dateList.map(generateDay), [dateList]);

  const handleDateClick = (date: Date) => {
    if (isSharing) {
      return;
    }
    setSelectedDate(date);
  };

  const renderDate = (day: Day) => {
    const { date } = day;
    const isCurrentMonth = date.getMonth() === currentMonth;

    if (!showExtraDays && !isCurrentMonth) {
      return <div key={date.toString()} />;
    }

    return (
      <DateContainer
        key={date.toString()}
        day={day}
        disabled={isSharing}
        showContent={showDateContent}
        isSelected={!isSharing && isSameDate(date, selectedDate)}
        onClick={() => handleDateClick(date)}
        highlightToday={highlightToday}
        isCurrentMonth={isCurrentMonth}
      />
    );
  };

  return dayList.map(renderDate);
};

const Calendar = ({
  isSharing,
  dateList,
  firstDayOfWeek,
  showExtraDays,
  showDateContent,
  highlightToday,
}: {
  isSharing?: boolean;
  dateList: Date[];
  firstDayOfWeek: FirstDayOfWeek;
  showExtraDays: boolean;
  showDateContent: boolean;
  highlightToday?: boolean;
}) => {
  return (
    <div className='grid w-full grid-cols-7 gap-2 p-2 md:gap-4 md:p-6'>
      <WeekdayHeader firstDayOfWeek={firstDayOfWeek} />
      <DateGrid
        dateList={dateList}
        showExtraDays={showExtraDays}
        showDateContent={showDateContent}
        isSharing={isSharing}
        highlightToday={highlightToday}
      />
    </div>
  );
};

export default Calendar;
