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
    <div className='flex items-center gap-4 px-6 py-4 text-sm bg-slate-100'>
      <button className='px-2 py-1 bg-white rounded' onClick={onPreviousYear}>
        上一年
      </button>
      <button className='px-2 py-1 bg-white rounded' onClick={onPreviousMonth}>
        上个月
      </button>
      <h3 className='flex-1 text-xl font-bold text-center'>
        {`${currentYear}年`} {`${currentMonth + 1}月`}
      </h3>
      <button className='px-2 py-1 bg-white rounded' onClick={onNextMonth}>
        下个月
      </button>
      <button className='px-2 py-1 bg-white rounded' onClick={onNextYear}>
        下一年
      </button>
    </div>
  );
};

export default CalendarHeader;
