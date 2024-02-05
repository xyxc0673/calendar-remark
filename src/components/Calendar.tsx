import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { FirstDayOfWeek } from '@/hooks/usePreference';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { Day } from '@/interfaces/day';
import { useAtomValue } from 'jotai';
import { currentMonthAtom } from '@/hooks/useCalendar';
import { isSameDay } from 'date-fns';

const DateGrid = ({
  dayList,
  markWeekend,
  showExtraDays,
  showDateContent,
  isSharing,
  highlightToday,
  dimNonCurrentMonth,
}: {
  dayList: Day[];
  markWeekend: boolean;
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
        markWeekend={markWeekend}
        disabled={isSharing}
        showContent={showDateContent}
        isSelected={!isSharing && isSameDay(date, selectedDate)}
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
  markWeekend,
  firstDayOfWeek,
  showExtraDays,
  showDateContent,
  highlightToday,
  dimNonCurrentMonth,
}: {
  isSharing?: boolean;
  dayList: Day[];
  markWeekend: boolean;
  firstDayOfWeek: FirstDayOfWeek;
  showExtraDays: boolean;
  showDateContent: boolean;
  highlightToday?: boolean;
  dimNonCurrentMonth?: boolean;
}) => {
  return (
    <div className='grid w-full grid-cols-7 gap-2 p-2 md:gap-4 md:p-6'>
      <WeekdayHeader
        firstDayOfWeek={firstDayOfWeek}
        markWeekend={markWeekend}
      />
      <DateGrid
        dayList={dayList}
        markWeekend={markWeekend}
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
