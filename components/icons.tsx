import React from 'react';

export const DumbbellIcon: React.FC<{ className?: string }> = ({ className = "text-primary" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l-1.768 1.768a2 2 0 1 1-2.828-2.828l-1.768 1.768a2 2 0 1 1-2.828-2.828" />
    <path d="m21.5 2.5-1.768 1.768a2 2 0 1 1-2.828-2.828l1.768-1.768a2 2 0 1 1 2.828 2.828Z" />
    <path d="m6.8 11.8 1.4-1.4" />
    <path d="m5.4 13.2 1.4-1.4" />
    <path d="m14.4 4.22 1.768-1.768a2 2 0 1 1 2.828 2.828l-1.768 1.768a2 2 0 1 1-2.828-2.828Z" />
    <path d="M11.8 6.8 10.4 5.4" />
    <path d="m4.22 14.4 1.768-1.768a2 2 0 1 0-2.828-2.828l-1.768 1.768a2 2 0 1 0 2.828 2.828Z" />
  </svg>
);

export const MagicWandIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="group-disabled:stroke-muted-foreground"
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 7.5h-1" />
    <path d="M17.5 7.5h-1" />
    <path d="m3 21 9-9" />
    <path d="M12.5 12.5 15 15" />
    <path d="M17 19.5 19.5 17" />
    <path d="M15 22v-2" />
    <path d="M15 16v-2" />
    <path d="M18.5 18.5h-1" />
    <path d="M11.5 18.5h-1" />
  </svg>
);

export const MiniSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const StarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-accent-foreground"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-primary" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

export const TargetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

export const LeafIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 10 10 0 0 1 10 10h-2a7 7 0 0 0-7-7 7 7 0 0 0-7 7z"/></svg>
);

export const ChefHatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h12v-2Z"/><path d="M8 12.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V18h-2v-2.5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2V18H6v-5.5Z"/><path d="M6 18v2h12v-2"/><path d="m12 2-3.12 4.16a2 2 0 0 0-.38 1.24V10h7V7.4a2 2 0 0 0-.38-1.24L12 2Z"/></svg>
);

export const GitHubIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.3-3.2.1-.3.5-1.5-.1-3.2 0 0-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1c-.6 1.7-.2 2.9-.1 3.2-.8.8-1.3 1.9-1.3 3.2 0 4.6 2.7 5.7 5.5 6.1-.6.5-.9 1.2-.9 2.2V22"/></svg>
);

export const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9-6.1-1.4-12.1-4.1-16.4-8.2C2.8 10.3 5.1 14 10.1 14c-2.5.9-5.2-1-5.2-1 .7 4.3 4.1 6.1 8.2 6.1 4.5 0 8.2-2.3 8.2-2.3-1.4 1-3.6 1.2-3.6 1.2.7 1.1 2.4 2.1 4.1 2.4-2.5 1.1-5.2.9-5.2.9l-.1-.1c2.8 1.1 6.1 1.5 9.2-1.3 2.5-2.2 4.1-5.2 4.1-9.2 0-.2 0-.4-.1-.6-.8.7-1.8 1.3-3.1 1.5z"/></svg>
);

export const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);