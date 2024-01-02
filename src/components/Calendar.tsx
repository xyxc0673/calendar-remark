import { useState } from 'react';
import WeekdayHeader from './WeekdayHeader';
import DateContainer from './DateContainer';

const Calendar = ({ month, dateList }: { month: number; dateList: Date[] }) => {
  const [selectDate, setSelectDate] = useState<Date>();

  return (
    <div className='grid grid-cols-7 gap-4 p-6'>
      <WeekdayHeader />
      {dateList.map((date) => (
        <DateContainer
          key={date.toString()}
          date={date}
          currentMonth={month}
          isSelected={date === selectDate}
          onClick={() => setSelectDate(date)}
        />
      ))}
    </div>
  );
};

export default Calendar;
