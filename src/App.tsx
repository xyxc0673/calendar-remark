import './App.css';
import { days } from './configs/constant';
import useCalendar, { Day } from './hooks/useCalendar';
import { useState } from 'react';
import DateComponent from './components/DateComponent';

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
        <div className='flex gap-4 items-center mb-4 border-gray-200 border p-2 text-sm'>
          <button
            className='px-2 py-1 bg-gray-100 rounded'
            onClick={handlePreviousYear}
          >
            上一年
          </button>
          <button
            className='px-2 py-1 bg-gray-100 rounded'
            onClick={handlePreviousMonth}
          >
            上个月
          </button>
          <h3 className='text-xl font-bold flex-1 text-center'>
            {`${currentYear}年`} {`${currentMonth + 1}月`}
          </h3>
          <button
            className='px-2 py-1 bg-gray-100 rounded'
            onClick={handleNextMonth}
          >
            下个月
          </button>
          <button
            className='px-2 py-1 bg-gray-100 rounded'
            onClick={handleNextYear}
          >
            下一年
          </button>
        </div>
        <div className='grid grid-cols-7 gap-4'>
          {days.map((day) => (
            <div key={day} className='p-2 text-center font-light'>
              {day}
            </div>
          ))}
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
