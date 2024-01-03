import { atom, useAtom } from 'jotai';

const selectedDateAtom = atom(new Date());

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return {
    selectedDate,
    setSelectedDate,
  };
};
