import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const isDarkModeOn = atomWithStorage('isDarkModeOn', false);

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeOn);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
};

export { useTheme };
