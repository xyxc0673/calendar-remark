import { useMemo } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { usePreference } from './usePreference';
import { generateDateList } from '@/libs/date';
import { generateDay } from '@/libs/day';

export const todayAtom = atom(new Date());
export const currentMonthAtom = atom(new Date().getMonth());
export const currentYearAtom = atom(new Date().getFullYear());

const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [currentYear, setCurrentYear] = useAtom(currentYearAtom);
  const today = useAtomValue(todayAtom);
  const {
    preference: { firstDayOfWeek },
  } = usePreference();

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
    date.setMonth(month);
    date.setFullYear(year);
    date.setDate(0);
    return date.getDate();
  };

  const dayList = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startDateTime = new Date(currentYear, currentMonth, 1);
    const endDateTime = new Date(currentYear, currentMonth, daysInMonth);

    const dateList = generateDateList(
      startDateTime,
      endDateTime,
      firstDayOfWeek
    );

    const dayList = dateList.map((date) => {
      return generateDay(date, [startDateTime, endDateTime]);
    });

    return dayList;
  }, [currentMonth, currentYear, firstDayOfWeek]);

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
    dayList,
  };
};

export default useCalendar;
