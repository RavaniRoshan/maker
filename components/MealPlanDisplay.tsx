import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MealPlan } from '../types';
import { MagicWandIcon, MiniSpinner, CheckCircleIcon } from './icons';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
  onSuggestAlternative: (dayIndex: number, mealIndex: number, dishIndex: number) => void;
  isReplacingDish: { dayIndex: number; mealIndex: number; dishIndex: number; } | null;
  justReplacedDish: { dayIndex: number; mealIndex: number; dishIndex: number; } | null;
}

const StatCard: React.FC<{ label: string; value: number; unit: string; color: string }> = ({ label, value, unit, color }) => (
    <div className={`flex-1 p-3 rounded-lg text-center ${color}`}>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-xl font-bold">{value}<span className="text-xs font-normal ml-1">{unit}</span></p>
    </div>
);

export const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ mealPlan, onSuggestAlternative, isReplacingDish, justReplacedDish }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-primary">{mealPlan.planTitle}</h2>
      
      {mealPlan.dailyPlans.map((dailyPlan, dayIndex) => (
        <div key={dailyPlan.day} className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
          <h3 className="text-2xl font-semibold mb-2 text-foreground">Day {dailyPlan.day}</h3>
          
          <div className="flex gap-2 md:gap-4 my-4">
            <StatCard label="Calories" value={dailyPlan.dailyTotals.calories} unit="kcal" color="bg-chart-1/10 text-chart-1" />
            <StatCard label="Protein" value={dailyPlan.dailyTotals.protein} unit="g" color="bg-chart-2/10 text-chart-2" />
            <StatCard label="Carbs" value={dailyPlan.dailyTotals.carbs} unit="g" color="bg-chart-4/10 text-chart-4" />
            <StatCard label="Fat" value={dailyPlan.dailyTotals.fat} unit="g" color="bg-chart-5/10 text-chart-5" />
          </div>

          <div className="space-y-6 mt-6">
            {dailyPlan.meals.map((meal, mealIndex) => (
              <div key={meal.name} className="border border-border rounded-xl p-4">
                <h4 className="text-lg font-bold text-primary mb-3">{meal.name}</h4>
                <div className="space-y-3">
                  {meal.dishes.map((dish, dishIndex) => {
                    const isLoading = isReplacingDish?.dayIndex === dayIndex &&
                                      isReplacingDish?.mealIndex === mealIndex &&
                                      isReplacingDish?.dishIndex === dishIndex;
                    
                    const isJustReplaced = justReplacedDish?.dayIndex === dayIndex &&
                                           justReplacedDish?.mealIndex === mealIndex &&
                                           justReplacedDish?.dishIndex === dishIndex;

                    return (
                      <div 
                        key={`${dish.name}-${dayIndex}-${mealIndex}-${dishIndex}`} 
                        className={`p-3 bg-muted rounded-lg transition-all duration-300 ${isLoading ? 'ring-2 ring-primary ring-offset-2 ring-offset-muted' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                             <h5 className="font-semibold text-foreground">{dish.name}</h5>
                             <p className="text-sm text-muted-foreground mb-2">{dish.description}</p>
                          </div>
                           <button
                             onClick={() => onSuggestAlternative(dayIndex, mealIndex, dishIndex)}
                             disabled={!!isReplacingDish}
                             className="ml-2 p-1.5 rounded-full hover:bg-primary/10 disabled:cursor-not-allowed group"
                             aria-label="Suggest an alternative dish"
                           >
                            {isLoading ? <MiniSpinner /> : <MagicWandIcon />}
                           </button>
                        </div>
                        <div className="flex text-xs space-x-4 text-muted-foreground">
                          <span><span className="font-bold">{dish.calories}</span> kcal</span>
                          <span><span className="font-bold">{dish.protein}</span>g P</span>
                          <span><span className="font-bold">{dish.carbs}</span>g C</span>
                          <span><span className="font-bold">{dish.fat}</span>g F</span>
                        </div>
                        <AnimatePresence>
                          {isJustReplaced && (
                            <motion.div
                              className="flex items-center gap-1.5 text-xs text-primary font-medium mt-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircleIcon className="h-3.5 w-3.5" />
                              <span>Dish updated!</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};