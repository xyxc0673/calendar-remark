import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { FirstDayOfWeek } from '@/hooks/usePreference';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { isSameDate } from '@/libs/date';
import { Day } from '@/interfaces/day';
import { useAtomValue } from 'jotai';
import { currentMonthAtom } from '@/hooks/useCalendar';

const DateGrid = ({
  dayList,
  showExtraDays,
  showDateContent,
  isSharing,
  highlightToday,
  dimNonCurrentMonth,
}: {
  dayList: Day[];
  showExtraDays: boolean;
  showDateContent: boolean;
  isSharing?: boolean;
  highlightToday?: boolean;
  dimNonCurrentMonth?: boolean;
}) => {
  const currentMonth = useAtomValue(currentMonthAtom);
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const handleDateClick = (date: Date) => {
    if (isSharing) {
      return;
    }
    setSelectedDate(date);
  };

  const renderDate = (day: Day) => {
    const { date } = day;
    const isCurrentMonth = date.getMonth() === currentMonth;

    if (!day.isInRange && !showExtraDays) {
      return <div key={day.date.toString()} />;
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
        dimNonCurrentMonth={dimNonCurrentMonth}
      />
    );
  };

  return dayList.map(renderDate);
};

const Calendar = ({
  isSharing,
  dayList,
  firstDayOfWeek,
  showExtraDays,
  showDateContent,
  highlightToday,
  dimNonCurrentMonth,
}: {
  isSharing?: boolean;
  dayList: Day[];
  firstDayOfWeek: FirstDayOfWeek;
  showExtraDays: boolean;
  showDateContent: boolean;
  highlightToday?: boolean;
  dimNonCurrentMonth?: boolean;
}) => {
  return (
    <div className='grid w-full grid-cols-7 gap-2 p-2 md:gap-4 md:p-6'>
      <WeekdayHeader firstDayOfWeek={firstDayOfWeek} />
      <DateGrid
        dayList={dayList}
        showExtraDays={showExtraDays}
        showDateContent={showDateContent}
        isSharing={isSharing}
        highlightToday={highlightToday}
        dimNonCurrentMonth={dimNonCurrentMonth}
      />
    </div>
  );
};

export default Calendar;
