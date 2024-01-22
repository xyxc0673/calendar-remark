import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useMemo } from 'react';

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

const initialPreference: Preference = {
  showExtraDays: true,
  firstDayOfWeek: FirstDayOfWeek.Sunday,
  desktopLayout: 'horizontal',
  showDateContent: true,
};

const preferenceAtom = atomWithStorage<Preference>(
  'preference',
  initialPreference,
  undefined,
  {
    getOnInit: true,
  }
);

export const usePreference = () => {
  const [storedPreference, setPreference] = useAtom(preferenceAtom);

  // 合并默认值和存储的值，以防止新增加的配置项尚未被存储导致的问题
  const preference = useMemo(() => {
    return {
      ...initialPreference,
      ...storedPreference,
    };
  }, [storedPreference]);

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
