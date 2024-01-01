import './App.css';
import useCalendar, { Day } from './hooks/useCalendar';
import { useState } from 'react';
import DateComponent from './components/DateComponent';
import WeekdayHeader from './components/WeekdayHeader';
import CalendarHeader from './components/CalendarHeader';

function App() {
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
    <div className='flex flex-col items-center h-screen pt-40 bg-slate-200'>
      <div className='shadow-md bg-white p-6 rounded-lg'>
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
    </div>
  );
}

export default App;
