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
