import { atom, useAtom } from 'jotai';
import { HOLIDAY } from '../configs/holidays';

const selectedHolidayAtom = atom<HOLIDAY | undefined>(undefined);

export const useSelectedHoliday = () => {
  const [selectedHoliday, setSelectedHoliday] = useAtom(selectedHolidayAtom);

  return {
    selectedHoliday,
    setSelectedHoliday,
  };
};
