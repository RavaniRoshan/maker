import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UserInputForm } from './components/UserInputForm';
import { MealPlanDisplay } from './components/MealPlanDisplay';
import { LandingPage } from './components/LandingPage';
import { SubscriptionCTA } from './components/SubscriptionCTA';
import type { UserPreferences, MealPlan, Dish, DailyPlan } from './types';
import { generateMealPlan, generateAlternativeDish } from './services/geminiService';

const initialPreferences: UserPreferences = {
  goal: 'MAINTAIN_WEIGHT',
  calories: 2000,
  mealsPerDay: 3,
  dietaryRestrictions: [],
  days: 1,
};

function App() {
  const [view, setView] = useState<'landing' | 'main'>('landing');
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isReplacingDish, setIsReplacingDish] = useState<{ dayIndex: number; mealIndex: number; dishIndex: number; } | null>(null);
  const [justReplacedDish, setJustReplacedDish] = useState<{ dayIndex: number; mealIndex: number; dishIndex: number; } | null>(null);

  useEffect(() => {
    if (justReplacedDish) {
      const timer = setTimeout(() => {
        setJustReplacedDish(null);
      }, 2500); // Confirmation message visible for 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [justReplacedDish]);

  const handleStart = () => {
    setView('main');
  };

  const handleHomeClick = () => {
    setView('landing');
    setMealPlan(null);
    setError(null);
    setPreferences(initialPreferences);
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    setMealPlan(null);
    try {
      const plan = await generateMealPlan(preferences);
      setMealPlan(plan);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestAlternative = async (dayIndex: number, mealIndex: number, dishIndex: number) => {
    if (!mealPlan) return;
    
    setIsReplacingDish({ dayIndex, mealIndex, dishIndex });
    setError(null);
    setJustReplacedDish(null);

    try {
      const dailyPlan: DailyPlan = mealPlan.dailyPlans[dayIndex];
      const dishToReplace: Dish = dailyPlan.meals[mealIndex].dishes[dishIndex];

      const newDish = await generateAlternativeDish(preferences, dailyPlan, dishToReplace);

      setMealPlan(currentPlan => {
        if (!currentPlan) return null;
        const newPlan = JSON.parse(JSON.stringify(currentPlan)); // Deep copy
        newPlan.dailyPlans[dayIndex].meals[mealIndex].dishes[dishIndex] = newDish;
        setJustReplacedDish({ dayIndex, mealIndex, dishIndex });
        // Note: Daily totals are not recalculated here for simplicity. A more robust solution would update them.
        return newPlan;
      });

    } catch (e) {
       setError(e instanceof Error ? e.message : 'An unknown error occurred while fetching an alternative.');
    } finally {
       setIsReplacingDish(null);
    }
  };

  const handleSubscriptionChange = (subscribed: boolean) => {
    setIsSubscribed(subscribed);
    if (!subscribed) {
      // If unsubscribed, reset days to 1 if it was a premium value
      setPreferences(prev => ({
        ...prev,
        days: 1,
      }));
    }
  };

  if (view === 'landing') {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header onHomeClick={handleHomeClick} />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Customize Your Meal Plan</h2>
          <p className="mt-2 text-muted-foreground">Adjust the settings below to match your fitness goals.</p>
        </div>
        <div className="mt-8 space-y-8">
          <SubscriptionCTA isSubscribed={isSubscribed} onSubscribe={handleSubscriptionChange} />
          <UserInputForm
            preferences={preferences}
            setPreferences={setPreferences}
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            isSubscribed={isSubscribed}
          />
        </div>
        
        {isLoading && (
          <div className="text-center mt-8">
            <div role="status" className="flex justify-center items-center space-x-2">
                <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg">Generating your personalized plan... this may take a moment.</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-destructive/10 text-destructive border border-destructive rounded-lg">
            <p className="font-bold">An Error Occurred</p>
            <p>{error}</p>
          </div>
        )}

        {mealPlan && !isLoading && (
          <div className="mt-12">
            <MealPlanDisplay 
              mealPlan={mealPlan} 
              onSuggestAlternative={handleSuggestAlternative}
              isReplacingDish={isReplacingDish}
              justReplacedDish={justReplacedDish}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;