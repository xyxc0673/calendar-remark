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
    setCurrentMonth,
    setCurrentYear,
    dateList,
  } = useCalendar();

  return (
    <div className='flex flex-col items-center h-screen p-20 bg-slate-200'>
      <div className='overflow-hidden bg-white rounded-lg shadow-md'>
        <CalendarHeader
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          setCurrentMonth={setCurrentMonth}
          setCurrentYear={setCurrentYear}
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
