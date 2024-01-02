import { useState } from 'react';
import useCalendar from '../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';

const Calendar = () => {
  const {
    currentYear,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    handlePreviousYear,
    handleNextYear,
    dateList,
  } = useCalendar();
  const [selectDate, setSelectDate] = useState<Date>();

  return (
    <div className='p-6'>
      <CalendarHeader
        onPreviousYear={handlePreviousYear}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onNextYear={handleNextYear}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      <div className='grid grid-cols-7 gap-4'>
        <WeekdayHeader />
        {dateList.map((date) => (
          <DateContainer
            key={date.toString()}
            date={date}
            currentMonth={currentMonth}
            isSelected={date === selectDate}
            onClick={() => setSelectDate(date)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
