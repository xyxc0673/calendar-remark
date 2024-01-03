import './App.css';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import RecentHoliday from './components/RecentHoliday';

function App() {
  return (
    <div className='flex flex-col items-center h-screen p-2 md:p-20 bg-slate-200'>
      <div className='w-full md:w-[37.5rem] overflow-hidden bg-white rounded-lg shadow-md'>
        <CalendarHeader />
        <Calendar />
        <RecentHoliday />
      </div>
    </div>
  );
}

export default App;
