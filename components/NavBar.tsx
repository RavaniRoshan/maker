import React from 'react';
import { DumbbellIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

interface NavBarProps {
    onHomeClick: () => void;
    currentView: 'landing' | 'planner';
    theme: string;
    setTheme: (theme: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onHomeClick, currentView, theme, setTheme }) => {
  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={onHomeClick} className="flex items-center gap-2" aria-label="Homepage">
            <DumbbellIcon className="text-primary h-7 w-7" />
            <span className="font-bold text-lg">AI Fitness Planner</span>
          </button>

          <div className="flex items-center gap-6">
            {currentView === 'landing' && (
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                </div>
            )}
             <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
};
