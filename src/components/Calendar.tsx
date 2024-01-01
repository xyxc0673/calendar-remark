import { useState } from 'react';
import useCalendar, { Day } from '../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import DateComponent from './DateComponent';
import WeekdayHeader from './WeekdayHeader';

const Calendar = () => {
  const {
    currentYear,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    handlePreviousYear,
    handleNextYear,
    calendarDays,
  } = useCalendar();
  const [selectDay, setSelectDay] = useState<Day>();

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
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
        {calendarDays.map((day) => (
          <DateComponent
            key={day.date.toString()}
            day={day}
            selectDay={selectDay}
            setSelectDay={setSelectDay}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
