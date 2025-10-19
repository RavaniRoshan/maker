import React from 'react';
import { motion } from 'framer-motion';
import { DumbbellIcon } from './icons';

interface NavBarProps {
    onStart: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onStart }) => {
  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto max-w-4xl px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2" aria-label="Homepage">
          <DumbbellIcon className="text-primary h-7 w-7" />
          <span className="font-bold text-lg hidden sm:inline">AI Fitness Planner</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
        </div>
        <button
          onClick={onStart}
          className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm text-sm"
        >
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};