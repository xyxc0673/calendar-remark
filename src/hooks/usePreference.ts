import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Preference = {
  // 不显示非本月的日期
  showExtraDays: boolean;
};

const preferenceAtom = atomWithStorage<Preference>('preference', {
  showExtraDays: true,
});

export const usePreference = () => {
  const [preference, setPreference] = useAtom(preferenceAtom);

  const toggleShowExtraDays = () => {
    setPreference((prev) => ({ ...prev, showExtraDays: !prev.showExtraDays }));
  };

  return {
    preference,
    setPreference,
    toggleShowExtraDays,
  };
};
