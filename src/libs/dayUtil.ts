import { DAY_TYPE } from '@/configs/holidays';
import { Day } from '@/hooks/useDay';

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
