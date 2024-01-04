import './App.css';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import LunarInfoCard from './components/LunarInfoCard';
import RecentHoliday from './components/RecentHoliday';

function App() {
  return (
    <div className='flex items-center justify-center h-screen p-4 md:p-20 bg-slate-200'>
      <div className='flex flex-col gap-2 overflow-hidden bg-white rounded-lg h-fit md:flex-row'>
        <div className='w-full md:w-[37.5rem] overflow-hidden bg-white rounded-lg shadow-lg shadow-slate-200'>
          <CalendarHeader />
          <Calendar />
          <RecentHoliday />
        </div>
        <div className='w-full md:w-[37.5rem] p-4'>
          <LunarInfoCard />
        </div>
      </div>
    </div>
  );
}

export default App;
