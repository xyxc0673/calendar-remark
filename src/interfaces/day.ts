import { HOLIDAY, DAY_TYPE } from '@/configs/holidays';

export type Day = {
  date: Date;
  lunarDate: string;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: HOLIDAY;
  restDay?: string;
  workDay?: string;
  isHoliday: boolean;
  isRestDay: boolean;
  isWorkDay: boolean;
  dayType?: DAY_TYPE;
  solarTerm?: string;
  festivals: string[];
  isInRange: boolean;
};
