import React, { useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons';

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {

  const toggleTheme = () => {
    // If theme is system, we need to check the current state to toggle correctly
    if (theme === 'system') {
        const isCurrentlyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isCurrentlyDark ? 'light' : 'dark');
    } else {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
