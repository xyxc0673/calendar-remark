import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { FirstDayOfWeek } from '@/hooks/usePreference';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { isSameDate } from '@/libs/date';

const DateGrid = ({
  currentMonth,
  dateList,
  showExtraDays,
  showDateContent,
  isSharing,
  highlightToday,
}: {
  currentMonth: number;
  dateList: Date[];
  showExtraDays: boolean;
  showDateContent: boolean;
  isSharing?: boolean;
  highlightToday?: boolean;
}) => {
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const handleDateClick = (date: Date) => {
    if (isSharing) {
      return;
    }
    setSelectedDate(date);
  };

  const renderDate = (date: Date) => {
    if (!showExtraDays && date.getMonth() !== currentMonth) {
      return <div key={date.toString()} />;
    }

    return (
      <DateContainer
        key={date.toString()}
        date={date}
        currentMonth={currentMonth}
        disabled={isSharing}
        showContent={showDateContent}
        isSelected={!isSharing && isSameDate(date, selectedDate)}
        onClick={() => handleDateClick(date)}
        highlightToday={highlightToday}
      />
    );
  };

  return dateList.map(renderDate);
};

const Calendar = ({
  isSharing,
  currentMonth,
  dateList,
  firstDayOfWeek,
  showExtraDays,
  showDateContent,
  highlightToday,
}: {
  isSharing?: boolean;
  currentMonth: number;
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
        currentMonth={currentMonth}
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
