import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { useSelectedDate } from '../hooks/useSelectedDate';
import useCalendar from '../hooks/useCalendar';
import { isSameDate } from '../libs/date';

const Calendar = ({ isSharing }: { isSharing?: boolean }) => {
  const { currentMonth, dateList } = useCalendar();
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const handleDateClick = (date: Date) => {
    if (isSharing) {
      return;
    }
    setSelectedDate(date);
  };

  return (
    <div className='grid w-full grid-cols-7 gap-2 p-2 md:gap-4 md:p-6'>
      <WeekdayHeader />
      {dateList.map((date) => (
        <DateContainer
          key={date.toString()}
          date={date}
          currentMonth={currentMonth}
          disabled={isSharing}
          isSelected={!isSharing && isSameDate(date, selectedDate)}
          onClick={() => handleDateClick(date)}
        />
      ))}
    </div>
  );
};

export default Calendar;
