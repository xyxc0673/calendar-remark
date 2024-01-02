import './App.css';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import RecentHoliday from './components/RecentHoliday';
import useCalendar from './hooks/useCalendar';

function App() {
  const currentDate = new Date();
  const {
    currentYear,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    handlePreviousYear,
    handleNextYear,
    dateList,
  } = useCalendar();

  return (
    <div className='flex flex-col items-center h-screen p-20 bg-slate-200'>
      <div className='overflow-hidden bg-white rounded-lg shadow-md'>
        <CalendarHeader
          onPreviousYear={handlePreviousYear}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onNextYear={handleNextYear}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
        <Calendar month={currentMonth} dateList={dateList} />
        <RecentHoliday date={currentDate} />
      </div>
    </div>
  );
}

export default App;
