import {
  HOLIDAY,
  holidayDetails,
  holidays,
  restDays,
  workdays,
} from '@/configs/holidays';
import dayjs from 'dayjs';
import { Lunar, Solar } from 'lunar-typescript';

export const isSameDate = (date1?: Date, date2?: Date) => {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isAfterDate = (date1?: Date, date2?: Date) => {
  if (!date1 || !date2) {
    return false;
  }
  return date1.getTime() > date2.getTime();
};

export const getPercentageOfYear = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // 当年的第一天
  const endOfYear = new Date(date.getFullYear(), 11, 31); // 当年的最后一天

  const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime(); // 当年的总毫秒数
  const elapsedMilliseconds = date.getTime() - startOfYear.getTime(); // 已过去的毫秒数

  const percentage = (elapsedMilliseconds / totalMilliseconds) * 100; // 计算百分比

  return Math.round(percentage * 100) / 100; // 返回百分比，保留两位小数
};

export const getWorkday = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = workdays.get(dateStr);
  return holiday;
};

export const getSolarTerm = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);
  const solarTerm = lunarDate.getJieQi();
  return solarTerm;
};

export const getRestDay = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = restDays.get(dateStr);
  return holiday;
};

export const getFestivals = (date: Date) => {
  const solarDate = Solar.fromDate(date);
  const lunarDate = Lunar.fromDate(date);

  const solarFestivals = solarDate.getFestivals();
  const lunarFestivals = lunarDate.getFestivals();

  const festival = [...lunarFestivals, ...solarFestivals];

  return festival;
};

export const getHoliday = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = holidays.get(dateStr);
  return holiday;
};

export type HolidaySelect = {
  value: HOLIDAY;
  label: string;
  date: string;
};

export const getHolidays = (): HolidaySelect[] => {
  const result = Array.from(holidays).map(([date, item]) => ({
    value: item,
    label: holidayDetails[item].chinese,
    date: date,
  }));
  return result;
};

export const isWeekendDate = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
  if (startDate > endDate) {
    throw new Error('开始日期不能大于结束日期');
  }

  const dates = [];
  const currDate = startDate;

  while (currDate <= endDate) {
    dates.push(currDate);
    currDate.setDate(currDate.getDate() + 1);
  }

  return dates;
};

export const getLunarDate = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);

  if (lunarDate.getDay() === 1) {
    return `${lunarDate.getMonthInChinese()}月`;
  }

  return lunarDate.getDayInChinese();
};

export const generateDateList = (
  startDate: Date,
  endDate: Date,
  firstDayOfWeek: number
): Date[] => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dateList: Date[] = [];

  // 计算上个月需要显示的天数
  const firstDayOfStartMonth = new Date(startYear, startMonth, 1).getDay();
  let daysFromPrevMonth = (firstDayOfStartMonth - firstDayOfWeek + 7) % 7;
  if (daysFromPrevMonth === 0) daysFromPrevMonth = 7;

  const daysInPreviousMonth = getDaysInMonth(startMonth - 1, startYear);
  for (let i = daysFromPrevMonth; i > 0; i--) {
    dateList.push(
      new Date(startYear, startMonth - 1, daysInPreviousMonth - i + 1)
    );
  }

  // 当前月份的天数
  const daysInStartMonth = getDaysInMonth(startMonth, startYear);
  for (let i = 1; i <= daysInStartMonth; i++) {
    dateList.push(new Date(startYear, startMonth, i));
  }

  // 计算下个月需要显示的天数
  const lastDayOfEndMonth = new Date(
    endYear,
    endMonth,
    daysInStartMonth
  ).getDay();
  let daysFromNextMonth = (7 - lastDayOfEndMonth + firstDayOfWeek - 1) % 7;
  if (daysFromNextMonth === 7) daysFromNextMonth = 0;

  for (let i = 1; i <= daysFromNextMonth; i++) {
    dateList.push(new Date(endYear, endMonth + 1, i));
  }

  return dateList;
};
