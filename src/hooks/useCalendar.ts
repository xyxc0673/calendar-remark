import { useCallback, useMemo, useState } from 'react';
import { Lunar } from 'lunar-typescript';

export type Day = {
  date: Date;
  lunarDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
};

const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const getLunarDate = (date: Date) => {
    const lunarDate = Lunar.fromDate(date);

    if (lunarDate.getDay() === 1) {
      return `${lunarDate.getMonthInChinese()}月`;
    }

    return lunarDate.getDayInChinese();
  };

  const makeDay = useCallback(
    (date: Date): Day => ({
      date,
      lunarDate: getLunarDate(date),
      isCurrentMonth: date.getMonth() === currentMonth,
      isToday:
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear(),
    }),
    [currentMonth]
  );

  const calendarDays = useMemo(() => {
    {
      const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
      const daysInPreviousMonth = getDaysInMonth(currentMonth - 1, currentYear);
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;

      const calendarDays: Day[] = [];

      // Render the last few days of the previous month
      for (let i = 0; i < startingDay; i++) {
        const day = daysInPreviousMonth - startingDay + i + 1;

        calendarDays.push(
          makeDay(new Date(currentYear, currentMonth - 1, day))
        );
      }

      // Render all days of the current month
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        calendarDays.push(makeDay(new Date(currentYear, currentMonth, i)));
      }

      // Render the first few days of the next month
      const totalDaysRendered = startingDay + daysInCurrentMonth;
      const remainingDays = 7 - (totalDaysRendered % 7);

      if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
          calendarDays.push(
            makeDay(new Date(currentYear, currentMonth + 1, i))
          );
        }
      }

      return calendarDays;
    }
  }, [currentMonth, currentYear, makeDay]);

  return {
    currentMonth,
    currentYear,
    handlePreviousMonth,
    handleNextMonth,
    handlePreviousYear,
    handleNextYear,
    calendarDays,
  };
};

export default useCalendar;
