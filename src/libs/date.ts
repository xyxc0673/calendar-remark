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
