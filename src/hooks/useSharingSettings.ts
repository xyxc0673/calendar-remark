import { useEffect, useMemo, useState } from 'react';
import useCalendar from './useCalendar';
import { isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';

const useSharingSettings = () => {
  const { currentYear, currentMonth } = useCalendar();
  const [highlightToday, setHighlightToday] = useState(false);
  const [completeWeek, setCompleteWeek] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [headerText, setHeaderText] = useState('节假日安排');
  const [footerText, setFooterText] = useState('Calendar Remark');
  const [showCustomArea, setShowCustomArea] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const isFullMonthSelected = useMemo(() => {
    if (!startDate || !endDate) return true;
    return isFirstDayOfMonth(startDate) && isLastDayOfMonth(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    if (currentMonth !== -1 && currentYear) {
      setStartDate(new Date(currentYear, currentMonth, 1));
      setEndDate(new Date(currentYear, currentMonth + 1, 0));
    }
  }, [currentMonth, currentYear, setEndDate, setStartDate]);

  const handleDateChange = (range?: DateRange) => {
    if (!range) return;

    setStartDate(range.from);
    setEndDate(range.to);
  };

  return {
    highlightToday,
    setHighlightToday,
    completeWeek,
    setCompleteWeek,
    showHeader,
    setShowHeader,
    showFooter,
    setShowFooter,
    headerText,
    setHeaderText,
    footerText,
    setFooterText,
    showCustomArea,
    setShowCustomArea,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isFullMonthSelected,
    handleDateChange,
  };
};

export default useSharingSettings;
