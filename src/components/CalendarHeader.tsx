const CalendarHeader = ({
  onPreviousYear,
  onPreviousMonth,
  onNextMonth,
  onNextYear,
  currentYear,
  currentMonth,
}: {
  onPreviousYear: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
  currentYear: number;
  currentMonth: number;
}) => {
  return (
    <div className='flex gap-4 items-center mb-4 border-gray-200 border p-2 text-sm'>
      <button
        className='px-2 py-1 bg-gray-100 rounded'
        onClick={onPreviousYear}
      >
        上一年
      </button>
      <button
        className='px-2 py-1 bg-gray-100 rounded'
        onClick={onPreviousMonth}
      >
        上个月
      </button>
      <h3 className='text-xl font-bold flex-1 text-center'>
        {`${currentYear}年`} {`${currentMonth + 1}月`}
      </h3>
      <button className='px-2 py-1 bg-gray-100 rounded' onClick={onNextMonth}>
        下个月
      </button>
      <button className='px-2 py-1 bg-gray-100 rounded' onClick={onNextYear}>
        下一年
      </button>
    </div>
  );
};

export default CalendarHeader;
