import { DAY_TYPE } from '../configs/holidays';

export const getBadgeText = (dayType: DAY_TYPE) => {
  switch (dayType) {
    case DAY_TYPE.REST_DAY:
      return '休';
    case DAY_TYPE.WORKDAY:
      return '班';
    default:
      return '';
  }
};
