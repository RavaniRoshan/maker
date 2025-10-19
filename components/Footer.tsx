import React from 'react';
import { DumbbellIcon, GitHubIcon, TwitterIcon, InstagramIcon } from './icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4" aria-label="Homepage">
              <DumbbellIcon className="text-primary h-7 w-7" />
              <span className="font-bold text-lg">AI Fitness Planner</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Personalized meal plans powered by Google Gemini to help you reach your fitness goals faster.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Socials</h3>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><GitHubIcon /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><TwitterIcon /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AI Fitness Meal Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};