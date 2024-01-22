import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export enum FirstDayOfWeek {
  Sunday,
  Monday,
}

type Preference = {
  // 显示非本月的日期
  showExtraDays: boolean;
  // 每周的第一天是周几
  firstDayOfWeek: FirstDayOfWeek;
  // 显示日期底部的内容
  showDateContent: boolean;
  desktopLayout: 'horizontal' | 'vertical';
};

const preferenceAtom = atomWithStorage<Preference>('preference', {
  showExtraDays: true,
  firstDayOfWeek: FirstDayOfWeek.Sunday,
  desktopLayout: 'horizontal',
  showDateContent: true,
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

  const toggleShowDateContent = () => {
    setPreference((prev) => ({
      ...prev,
      showDateContent: !prev.showDateContent,
    }));
  };

  const toggleDesktopLayout = () => {
    setPreference((prev) => ({
      ...prev,
      desktopLayout:
        prev.desktopLayout === 'horizontal' ? 'vertical' : 'horizontal',
    }));
  };

  return {
    preference,
    setPreference,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
    toggleShowExtraDays,
    toggleShowDateContent,
    toggleDesktopLayout,
  };
};
