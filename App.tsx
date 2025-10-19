import React, { useState, useEffect } from 'react';
import { UserInputForm } from './components/UserInputForm';
import { MealPlanDisplay } from './components/MealPlanDisplay';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { SubscriptionCTA } from './components/SubscriptionCTA';
import { LandingPage } from './components/LandingPage';
import { generateMealPlan, generateAlternativeDish, searchRecipes } from './services/geminiService';
import type { UserPreferences, MealPlan, Dish } from './types';
import { LoadingSpinner } from './components/icons';

type View = 'landing' | 'planner';

function App() {
  const [view, setView] = useState<View>('landing');
  const [preferences, setPreferences] = useState<UserPreferences>({
    goal: 'LOSE_WEIGHT',
    calories: 2000,
    mealsPerDay: 3,
    dietaryRestrictions: [],
    days: 1,
  });

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  
  const [alternativeDishState, setAlternativeDishState] = useState<{ loading: boolean; path: string | null }>({ loading: false, path: null });
  const [justReplacedDish, setJustReplacedDish] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Dish[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const [copiedItem, setCopiedItem] = useState<string | null>(null);


  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        root.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleSubscriptionChange = (subscribed: boolean) => {
    setIsSubscribed(subscribed);
    if (!subscribed && preferences.days > 1) {
      setPreferences(prev => ({ ...prev, days: 1 }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setMealPlan(null);
    try {
      const plan = await generateMealPlan(preferences);
      setMealPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestAlternative = async (dayIndex: number, mealIndex: number, dishIndex: number) => {
    if (!mealPlan) return;

    const path = `${dayIndex}-${mealIndex}-${dishIndex}`;
    setAlternativeDishState({ loading: true, path });
    setError(null);

    try {
      const originalDish = mealPlan.dailyPlans[dayIndex].meals[mealIndex].dishes[dishIndex];
      const otherDishes = mealPlan.dailyPlans[dayIndex].meals.flatMap(m => m.dishes).filter(d => d.name !== originalDish.name);
      
      const newDish = await generateAlternativeDish(preferences, otherDishes, originalDish);
      
      const newMealPlan = JSON.parse(JSON.stringify(mealPlan));
      newMealPlan.dailyPlans[dayIndex].meals[mealIndex].dishes[dishIndex] = newDish;
      
      setMealPlan(newMealPlan);
      setJustReplacedDish(path);
      setTimeout(() => setJustReplacedDish(null), 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suggest an alternative.');
    } finally {
      setAlternativeDishState({ loading: false, path: null });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);
    try {
        const results = await searchRecipes(preferences, searchQuery);
        setSearchResults(results);
    } catch (err) {
        setSearchError(err instanceof Error ? err.message : 'An unknown error occurred during search.');
    } finally {
        setIsSearching(false);
    }
  };

  const handleNavigateHome = () => {
    setView('landing');
    setMealPlan(null);
    setError(null);
  };
  
  const handleNavigateToPlanner = () => {
    setView('planner');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <NavBar onHomeClick={handleNavigateHome} currentView={view} theme={theme} setTheme={setTheme} />
      
      {view === 'landing' ? (
        <>
          <LandingPage onGetStarted={handleNavigateToPlanner} />
          <Footer />
        </>
      ) : (
        <main className="container mx-auto max-w-4xl px-4 py-8">
            <div className="p-6 md:p-8 bg-card rounded-2xl shadow-lg border border-border">
                <SubscriptionCTA isSubscribed={isSubscribed} onSubscribe={handleSubscriptionChange} />
                <UserInputForm
                    preferences={preferences}
                    setPreferences={setPreferences}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    isSubscribed={isSubscribed}
                />
            </div>

            {error && (
              <div className="mt-8 text-center p-4 bg-destructive text-destructive-foreground rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {isLoading && !mealPlan && (
              <div className="mt-12 text-center">
                <LoadingSpinner className="h-12 w-12 mx-auto" />
                <p className="mt-4 text-muted-foreground">Generating your personalized plan... this may take a moment.</p>
              </div>
            )}

            {mealPlan && (
                <MealPlanDisplay 
                    plan={mealPlan}
                    onSuggestAlternative={handleSuggestAlternative}
                    alternativeDishState={alternativeDishState}
                    justReplacedDish={justReplacedDish}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                    searchResults={searchResults}
                    isSearching={isSearching}
                    searchError={searchError}
                    copiedItem={copiedItem}
                    setCopiedItem={setCopiedItem}
                />
            )}
        </main>
      )}
    </div>
  );
}

export default App;
