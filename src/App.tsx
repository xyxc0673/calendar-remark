import './App.css';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import LunarInfoCard from './components/LunarInfoCard';
import RecentHoliday from './components/RecentHoliday';
import ShareModal from './components/ShareModal';
import { SettingPopup } from './views/SettingPopup';

function App() {
  return (
    <>
      <ShareModal />
      <div className='flex items-center justify-center w-full h-screen p-4 md:p-20 bg-slate-200 dark:bg-black/80'>
        <div className='flex flex-col gap-2 max-md:w-full'>
          <div className='flex flex-col w-full gap-2 overflow-hidden bg-white rounded-lg dark:bg-zinc-800 md:w-fit h-fit md:flex-row'>
            <div className='w-full md:w-[37.5rem] overflow-hidden rounded-lg shadow-lg md:border-r max-md:dark:border-b shadow-slate-200 dark:shadow-none border-zinc-400/20'>
              <CalendarHeader />
              <Calendar />
              <RecentHoliday />
            </div>
            <div className='w-full md:w-[37.5rem] p-4'>
              <LunarInfoCard />
            </div>
          </div>
          <SettingPopup />
        </div>
      </div>
    </>
  );
}

export default App;
