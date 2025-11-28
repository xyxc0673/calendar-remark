import { useEffect, useMemo, useState } from 'react';
import useCalendar from './useCalendar';
import { isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

const useSharingSettings = () => {
  const { currentYear, currentMonth } = useCalendar();
  const { t } = useTranslation();
  
  const [highlightToday, setHighlightToday] = useState(false);
  const [completeWeek, setCompleteWeek] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  // 使用翻译键作为默认值
  const [headerText, setHeaderText] = useState(() => t('share.defaultHeader'));
  const [footerText, setFooterText] = useState(() => t('share.defaultFooter'));
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
