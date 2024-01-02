import './App.css';
import Calendar from './components/Calendar';
import RecentHoliday from './components/RecentHoliday';

function App() {
  const currentDate = new Date();

  return (
    <div className='flex flex-col items-center h-screen p-20 bg-slate-200'>
      <div className='overflow-hidden bg-white rounded-lg shadow-md'>
        <Calendar />
        <RecentHoliday date={currentDate} />
      </div>
    </div>
  );
}

export default App;
