import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export enum FirstDayOfWeek {
  Sunday,
  Monday,
}

type Preference = {
  // 不显示非本月的日期
  showExtraDays: boolean;
  // 每周的第一天是周几
  firstDayOfWeek: FirstDayOfWeek;
};

const preferenceAtom = atomWithStorage<Preference>('preference', {
  showExtraDays: true,
  firstDayOfWeek: FirstDayOfWeek.Sunday,
});

export const usePreference = () => {
  const [preference, setPreference] = useAtom(preferenceAtom);

  const setFirstDayOfWeekToMonday = () => {
    setPreference((prev) => ({
      ...prev,
      firstDayOfWeek: FirstDayOfWeek.Monday,
    }));
  };

  const setFirstDayOfWeekToSunday = () => {
    setPreference((prev) => ({
      ...prev,
      firstDayOfWeek: FirstDayOfWeek.Sunday,
    }));
  };

  const toggleShowExtraDays = () => {
    setPreference((prev) => ({ ...prev, showExtraDays: !prev.showExtraDays }));
  };

  return {
    preference,
    setPreference,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
    toggleShowExtraDays,
  };
};
