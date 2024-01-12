import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import dayjs from 'dayjs';

interface CustomDay {
  badge?: string;
  content?: string;
  theme?: 'workday' | 'restDay';
}

const customDayMapAtom = atomWithStorage<Record<string, CustomDay>>(
  'customDayMap',
  {}
);

export const useCustomDay = (date: Date) => {
  const [customDayMap, setCustomDayMap] = useAtom(customDayMapAtom);

  const dateKey = useMemo(() => dayjs(date).format('YYYY-MM-DD'), [date]);

  const customDay = useMemo(() => {
    const customDayInMap = customDayMap[dateKey];

    return {
      ...customDayInMap,
    };
  }, [customDayMap, dateKey]);

  const updateCustomDay = (customDay: CustomDay) => {
    setCustomDayMap((prev) => ({ ...prev, [dateKey]: customDay }));
  };

  const updateBadge = (badge: string) => {
    updateCustomDay({ ...customDay, badge });
  };

  const updateContent = (content: string) => {
    updateCustomDay({ ...customDay, content });
  };

  const updateTheme = (theme: 'workday' | 'restDay') => {
    updateCustomDay({ ...customDay, theme });
  };

  const resetCustomDay = () => {
    updateCustomDay({});
  };

  return {
    customDay,
    updateBadge,
    updateContent,
    updateTheme,
    resetCustomDay,
  };
};
