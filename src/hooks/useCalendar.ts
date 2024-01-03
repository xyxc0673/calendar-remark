import { useMemo } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';

export const todayAtom = atom(new Date());
export const currentMonthAtom = atom(new Date().getMonth());
export const currentYearAtom = atom(new Date().getFullYear());

const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [currentYear, setCurrentYear] = useAtom(currentYearAtom);
  const today = useAtomValue(todayAtom);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handlePreviousYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date();
    date.setMonth(month + 1);
    date.setFullYear(year);
    date.setDate(0);
    return date.getDate();
  };

  const dateList = useMemo(() => {
    {
      const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
      const daysInPreviousMonth = getDaysInMonth(currentMonth - 1, currentYear);
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;

      const dateList: Date[] = [];

      // Render the last few days of the previous month
      for (let i = 0; i < startingDay; i++) {
        const day = daysInPreviousMonth - startingDay + i + 1;

        dateList.push(new Date(currentYear, currentMonth - 1, day));
      }

      // Render all days of the current month
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        dateList.push(new Date(currentYear, currentMonth, i));
      }

      // Render the first few days of the next month
      const totalDaysRendered = startingDay + daysInCurrentMonth;
      const remainingDays = 7 - (totalDaysRendered % 7);

      if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
          dateList.push(new Date(currentYear, currentMonth + 1, i));
        }
      }

      return dateList;
    }
  }, [currentMonth, currentYear]);

  return {
    today,
    currentMonth,
    currentYear,
    handlePreviousMonth,
    handleNextMonth,
    handlePreviousYear,
    handleNextYear,
    setCurrentMonth,
    setCurrentYear,
    dateList,
  };
};

export default useCalendar;
