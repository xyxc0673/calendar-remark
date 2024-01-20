import { HOLIDAY } from '@/configs/holidays';
import { atom, useAtom } from 'jotai';

const selectedHolidayAtom = atom<HOLIDAY | undefined>(undefined);

export const useSelectedHoliday = () => {
  const [selectedHoliday, setSelectedHoliday] = useAtom(selectedHolidayAtom);

  return {
    selectedHoliday,
    setSelectedHoliday,
  };
};
