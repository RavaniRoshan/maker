import React from 'react';
import type { MealPlan, DailyPlan, Meal, Dish } from '../types';
import { LoadingSpinner, ClipboardIcon, ClipboardCheckIcon } from './icons';

// Helper functions to format data for clipboard
const formatDishForCopy = (dish: Dish): string => {
  return `Dish: ${dish.name}\nDescription: ${dish.description}\nNutrition: ${dish.calories} kcal, ${dish.protein}g Protein, ${dish.carbs}g Carbs, ${dish.fat}g Fat`;
};

const formatPlanForCopy = (plan: MealPlan): string => {
  let fullText = `**${plan.planTitle}**\n\n`;
  plan.dailyPlans.forEach(dailyPlan => {
    fullText += `--- Day ${dailyPlan.day} ---\n`;
    fullText += `Totals: ${dailyPlan.dailyTotals.calories} kcal | ${dailyPlan.dailyTotals.protein}p | ${dailyPlan.dailyTotals.carbs}c | ${dailyPlan.dailyTotals.fat}f\n\n`;
    dailyPlan.meals.forEach(meal => {
      fullText += `**${meal.name}**\n`;
      meal.dishes.forEach(dish => {
        fullText += `- ${dish.name}: ${dish.description} (${dish.calories} kcal, ${dish.protein}p, ${dish.carbs}c, ${dish.fat}f)\n`;
      });
      fullText += '\n';
    });
  });
  return fullText;
};


interface DishCardProps {
  dish: Dish;
  dayIndex: number;
  mealIndex: number;
  dishIndex: number;
  onSuggestAlternative: (dayIndex: number, mealIndex: number, dishIndex: number) => void;
  alternativeDishState: { loading: boolean; path: string | null };
  justReplacedDish: string | null;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, dayIndex, mealIndex, dishIndex, onSuggestAlternative, alternativeDishState, justReplacedDish, copiedItem, setCopiedItem }) => {
  const path = `${dayIndex}-${mealIndex}-${dishIndex}`;
  const isLoadingAlternative = alternativeDishState.loading && alternativeDishState.path === path;
  const wasJustReplaced = justReplacedDish === path;
  const isCopied = copiedItem === path;

  const handleCopy = () => {
    const textToCopy = formatDishForCopy(dish);
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedItem(path);
        setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  return (
    <div className={`p-4 bg-muted/50 rounded-lg border border-border transition-all duration-500 ${wasJustReplaced ? 'ring-2 ring-primary shadow-lg' : ''}`}>
      <div className="flex justify-between items-start gap-2">
        <div>
          <h5 className="font-semibold text-foreground">{dish.name}</h5>
          <p className="text-sm text-muted-foreground mt-1 mb-3">{dish.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Copy dish details"
            >
              {isCopied ? <ClipboardCheckIcon className="h-5 w-5 text-primary"/> : <ClipboardIcon className="h-5 w-5"/>}
            </button>
            <button
              onClick={() => onSuggestAlternative(dayIndex, mealIndex, dishIndex)}
              disabled={isLoadingAlternative}
              className="text-sm text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
              title="Suggest an alternative"
            >
              {isLoadingAlternative ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : (
                <span>Swap</span>
              )}
            </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-background p-2 rounded"><strong>{dish.calories}</strong> kcal</div>
        <div className="bg-background p-2 rounded"><strong>{dish.protein}</strong> g Protein</div>
        <div className="bg-background p-2 rounded"><strong>{dish.carbs}</strong> g Carbs</div>
        <div className="bg-background p-2 rounded"><strong>{dish.fat}</strong> g Fat</div>
      </div>
    </div>
  )
};

interface MealSectionProps {
  meal: Meal;
  dayIndex: number;
  mealIndex: number;
  onSuggestAlternative: (dayIndex: number, mealIndex: number, dishIndex: number) => void;
  alternativeDishState: { loading: boolean; path: string | null };
  justReplacedDish: string | null;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

const MealSection: React.FC<MealSectionProps> = (props) => (
  <div className="mb-6">
    <h4 className="text-xl font-bold mb-3 text-primary">{props.meal.name}</h4>
    <div className="space-y-4">
      {props.meal.dishes.map((dish, dishIndex) => (
        <DishCard
          key={`${dish.name}-${dishIndex}`}
          dish={dish}
          dishIndex={dishIndex}
          {...props}
        />
      ))}
    </div>
  </div>
);

interface DailyPlanCardProps {
  dailyPlan: DailyPlan;
  dayIndex: number;
  onSuggestAlternative: (dayIndex: number, mealIndex: number, dishIndex: number) => void;
  alternativeDishState: { loading: boolean; path: string | null };
  justReplacedDish: string | null;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

const DailyPlanCard: React.FC<DailyPlanCardProps> = (props) => (
  <div className="bg-muted p-6 rounded-xl border border-border shadow-sm">
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
      <h3 className="text-2xl font-bold text-foreground">Day {props.dailyPlan.day}</h3>
      <div className="text-right text-sm text-muted-foreground">
        <div className="font-semibold">{props.dailyPlan.dailyTotals.calories} kcal</div>
        <div>
          {props.dailyPlan.dailyTotals.protein}p / {props.dailyPlan.dailyTotals.carbs}c / {props.dailyPlan.dailyTotals.fat}f
        </div>
      </div>
    </div>
    <div>
      {props.dailyPlan.meals.map((meal, mealIndex) => (
        <MealSection
          key={`${meal.name}-${mealIndex}`}
          meal={meal}
          mealIndex={mealIndex}
          {...props}
        />
      ))}
    </div>
  </div>
);

interface MealPlanDisplayProps {
  plan: MealPlan | null;
  onSuggestAlternative: (dayIndex: number, mealIndex: number, dishIndex: number) => void;
  alternativeDishState: { loading: boolean; path: string | null };
  justReplacedDish: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  searchResults: Dish[];
  isSearching: boolean;
  searchError: string | null;
  copiedItem: string | null;
  setCopiedItem: (item: string | null) => void;
}

export const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({
    plan,
    onSuggestAlternative,
    alternativeDishState,
    justReplacedDish,
    searchQuery,
    setSearchQuery,
    onSearch,
    searchResults,
    isSearching,
    searchError,
    copiedItem,
    setCopiedItem,
}) => {
  if (!plan) {
    return null;
  }
  
  const isFullPlanCopied = copiedItem === 'full-plan';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };
  
  const handleCopyFullPlan = () => {
    const textToCopy = formatPlanForCopy(plan);
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedItem('full-plan');
        setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  return (
    <section className="mt-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">{plan.planTitle}</h2>
        <button
          onClick={handleCopyFullPlan}
          className="inline-flex items-center gap-2 text-sm bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-70"
          disabled={isFullPlanCopied}
        >
          {isFullPlanCopied ? (
            <>
              <ClipboardCheckIcon className="h-4 w-4" />
              Copied!
            </>
          ) : (
             <>
              <ClipboardIcon className="h-4 w-4" />
              Copy Plan
            </>
          )}
        </button>
      </div>


      <div className="my-8 p-6 bg-card rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-3">Find a Different Recipe</h3>
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., 'high protein breakfast'"
            className="flex-grow p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          />
          <button type="submit" disabled={isSearching} className="bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-wait flex justify-center items-center">
            {isSearching ? <LoadingSpinner className="h-5 w-5" /> : 'Search'}
          </button>
        </form>
        {searchError && <p className="text-destructive text-sm mt-2">{searchError}</p>}
        {isSearching && !searchResults.length && (
            <div className="text-center text-muted-foreground mt-4">Searching...</div>
        )}
        {searchResults.length > 0 && (
            <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Search Results:</h4>
                {searchResults.map((dish, index) => (
                   <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <h5 className="font-semibold text-foreground">{dish.name}</h5>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">{dish.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-background p-2 rounded"><strong>{dish.calories}</strong> kcal</div>
                        <div className="bg-background p-2 rounded"><strong>{dish.protein}</strong> g Protein</div>
                        <div className="bg-background p-2 rounded"><strong>{dish.carbs}</strong> g Carbs</div>
                        <div className="bg-background p-2 rounded"><strong>{dish.fat}</strong> g Fat</div>
                      </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      
      <div className="space-y-8 mt-4">
        {plan.dailyPlans.map((dailyPlan, dayIndex) => (
          <DailyPlanCard 
            key={dailyPlan.day} 
            dailyPlan={dailyPlan}
            dayIndex={dayIndex}
            onSuggestAlternative={onSuggestAlternative}
            alternativeDishState={alternativeDishState}
            justReplacedDish={justReplacedDish}
            copiedItem={copiedItem}
            setCopiedItem={setCopiedItem}
          />
        ))}
      </div>
    </section>
  );
};
