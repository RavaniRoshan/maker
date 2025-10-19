import React from 'react';
import { DumbbellIcon } from './icons';

interface HeaderProps {
    onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="container mx-auto max-w-4xl px-4 py-4 flex items-center justify-center md:justify-start">
        <button onClick={onHomeClick} className="flex items-center group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg p-2 -m-2">
            <DumbbellIcon />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground ml-3 transition-colors group-hover:text-primary">
            AI Fitness Meal Planner
            </h1>
        </button>
      </div>
    </header>
  );
};