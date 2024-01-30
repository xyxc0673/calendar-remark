import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import DayInfoCard from './components/DayInfoCard';
import LunarInfoCard from './components/LunarInfoCard';
import PlaceHolderImage from './components/PlaceHolderImage';
import ShareModal from './components/ShareModal';
import YearProgressCard from './components/YearProgressCard';
import { Footer } from './views/Footer';
import { usePreference } from './hooks/usePreference';
import clsxm from './libs/clsxm';
import FullCalendar from './views/FullCalendar';

dayjs.locale('zh-cn');
dayjs.extend(weekOfYear);

function App() {
  const {
    preference: { desktopLayout },
  } = usePreference();

  const isHorizontal = desktopLayout === 'horizontal';

  return (
    <>
      <ShareModal />
      <div className='flex items-center justify-center w-full min-h-screen p-4 md:p-20 bg-slate-200 dark:bg-black/80'>
        <div className='flex flex-col gap-3 max-md:w-full'>
          <div
            className={clsxm(
              'flex flex-col w-full gap-2 overflow-hidden bg-white rounded-lg dark:bg-zinc-800 md:w-fit h-fit',
              isHorizontal ? 'md:flex-row' : 'md:flex-col'
            )}
          >
            <FullCalendar />
            <div className='w-full md:w-[37.5rem] p-4 gap-3 flex flex-col'>
              <DayInfoCard />
              <LunarInfoCard />
              <YearProgressCard />
              {isHorizontal && <PlaceHolderImage />}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
