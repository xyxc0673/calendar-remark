import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';
import { useSelectedDate } from '../hooks/useSelectedDate';
import useCalendar from '../hooks/useCalendar';

const Calendar = () => {
  const { currentMonth, dateList } = useCalendar();
  const { selectedDate, setSelectedDate } = useSelectedDate();

  return (
    <div className='grid w-full grid-cols-7 gap-2 p-2 md:gap-4 md:p-6'>
      <WeekdayHeader />
      {dateList.map((date) => (
        <DateContainer
          key={date.toString()}
          date={date}
          currentMonth={currentMonth}
          isSelected={date === selectedDate}
          onClick={() => setSelectedDate(date)}
        />
      ))}
    </div>
  );
};

export default Calendar;
