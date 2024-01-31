import { DAY_TYPE } from '@/configs/holidays';
import { Day } from '@/interfaces/day';
import {
  getFestivals,
  getHoliday,
  getLunarDate,
  getRestDay,
  getSolarTerm,
  getWorkday,
  isWeekendDate,
} from '@/libs/date';

export const getBadgeText = (day: Day, customBadge?: string) => {
  if (customBadge !== undefined) {
    return customBadge;
  }
  if (day.dayType === DAY_TYPE.REST_DAY) {
    return '休';
  }
  if (day.dayType === DAY_TYPE.WORKDAY) {
    return '班';
  }
  if (day.isToday) {
    return '今';
  }
  return '';
};

export const generateDay = (date: Date, range?: [Date, Date]): Day => {
  const currentDate = new Date();

  const isWeekend = isWeekendDate(date);
  const holiday = getHoliday(date);
  const workDay = getWorkday(date);
  const restDay = getRestDay(date);
  const lunarDate = getLunarDate(date);
  const solarTerm = getSolarTerm(date);
  const festivals = getFestivals(date);

  const isHoliday = holiday !== undefined;
  const isRestDay = isHoliday || restDay !== undefined;
  const isWorkDay = workDay !== undefined;
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  let dayType: DAY_TYPE | undefined = undefined;

  if (isRestDay) {
    dayType = DAY_TYPE.REST_DAY;
  }

  if (isWorkDay) {
    dayType = DAY_TYPE.WORKDAY;
  }

  let isInRange = false;

  if (range) {
    const [startDate, endDate] = range;
    isInRange =
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime();
  }

  return {
    date,
    lunarDate,
    isWeekend,
    holiday,
    restDay,
    workDay,
    isHoliday,
    isRestDay,
    isWorkDay,
    isToday,
    dayType,
    solarTerm,
    festivals,
    isInRange,
  };
};
