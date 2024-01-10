import { useEffect } from 'react';
import { Sun, Moon } from '../assets/icons';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const toggleTheme = () => {
    toggleDarkMode();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const Icon = isDarkMode ? Sun : Moon;

  return (
    <button
      onClick={toggleTheme}
      className='flex items-center justify-center transition-all border border-transparent rounded-lg hover:border-slate-500 size-6 md:size-8 hover:bg-white dark:hover:bg-zinc-600'
    >
      {Icon && <Icon className='size-4 md:size-6 dark:stroke-zinc-400' />}
    </button>
  );
};

export default ThemeToggle;
