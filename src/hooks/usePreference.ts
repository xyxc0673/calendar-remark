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
  // 是否标记周末
  markWeekend: boolean;
  desktopLayout: 'horizontal' | 'vertical';
};

const initialPreference: Preference = {
  showExtraDays: true,
  firstDayOfWeek: FirstDayOfWeek.Sunday,
  desktopLayout: 'horizontal',
  markWeekend: true,
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
    setPreference({
      ...preference,
      firstDayOfWeek: FirstDayOfWeek.Monday,
    });
  };

  const setFirstDayOfWeekToSunday = () => {
    setPreference({
      ...preference,
      firstDayOfWeek: FirstDayOfWeek.Sunday,
    });
  };

  const toggleShowExtraDays = () => {
    setPreference({ ...preference, showExtraDays: !preference.showExtraDays });
  };

  const toggleShowDateContent = () => {
    setPreference({
      ...preference,
      showDateContent: !preference.showDateContent,
    });
  };

  const toggleDesktopLayout = () => {
    setPreference({
      ...preference,
      desktopLayout:
        preference.desktopLayout === 'horizontal' ? 'vertical' : 'horizontal',
    });
  };

  const toggleMarkWeekend = () => {
    setPreference({
      ...preference,
      markWeekend: !preference.markWeekend,
    });
  };

  return {
    preference,
    setPreference,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
    toggleShowExtraDays,
    toggleShowDateContent,
    toggleDesktopLayout,
    toggleMarkWeekend,
  };
};
