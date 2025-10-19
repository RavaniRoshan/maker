import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
        Your Personal AI Meal Planner
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Tell us your goals, and let Gemini craft a delicious, personalized meal plan to help you succeed.
      </p>
    </header>
  );
};
