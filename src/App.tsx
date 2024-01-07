import './App.css';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import LunarInfoCard from './components/LunarInfoCard';
import RecentHoliday from './components/RecentHoliday';
import ShareModal from './components/ShareModal';

function App() {
  return (
    <>
      <ShareModal />
      <div className='flex items-center justify-center h-screen p-4 md:p-20 bg-slate-200'>
        <div className='flex flex-col w-full gap-2 overflow-hidden bg-white rounded-lg md:w-fit h-fit md:flex-row'>
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
    </>
  );
}

export default App;
