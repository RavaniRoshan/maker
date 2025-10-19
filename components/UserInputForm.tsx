import React from 'react';
import type { UserPreferences } from '../types';
import { GOAL_OPTIONS, DIETARY_RESTRICTION_OPTIONS } from '../constants';

interface UserInputFormProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onSubmit: () => void;
  isLoading: boolean;
  isSubscribed: boolean;
}

export const UserInputForm: React.FC<UserInputFormProps> = ({
  preferences,
  setPreferences,
  onSubmit,
  isLoading,
  isSubscribed,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'mealsPerDay' || name === 'days' ? Number(value) : value,
    }));
  };
  
  const handleDietChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPreferences(prev => {
      const newRestrictions = checked
        ? [...prev.dietaryRestrictions, value]
        : prev.dietaryRestrictions.filter(item => item !== value);
      return { ...prev, dietaryRestrictions: newRestrictions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-foreground mb-1">
            Primary Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={preferences.goal}
            onChange={handleInputChange}
            className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          >
            {GOAL_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Calories */}
        <div>
          <label htmlFor="calories" className="block text-sm font-medium text-foreground mb-1">
            Daily Calories
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={preferences.calories}
            onChange={handleInputChange}
            min="1000"
            max="10000"
            step="50"
            className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          />
        </div>
        
        {/* Meals per Day */}
        <div>
          <label htmlFor="mealsPerDay" className="block text-sm font-medium text-foreground mb-1">
            Meals per Day
          </label>
          <select
            id="mealsPerDay"
            name="mealsPerDay"
            value={preferences.mealsPerDay}
            onChange={handleInputChange}
            className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Days (Premium Feature) */}
        <div>
          <label htmlFor="days" className="flex items-center text-sm font-medium text-foreground mb-1">
            Plan Duration (Days)
            {!isSubscribed && (
              <span className="ml-2 text-xs font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">PRO</span>
            )}
          </label>
          <select
            id="days"
            name="days"
            value={preferences.days}
            onChange={handleInputChange}
            disabled={!isSubscribed}
            className="w-full p-3 bg-muted border border-border rounded-lg disabled:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-70 focus:ring-2 focus:ring-ring focus:border-primary"
          >
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
          </select>
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Dietary Restrictions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {DIETARY_RESTRICTION_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                value={option.value}
                checked={preferences.dietaryRestrictions.includes(option.value)}
                onChange={handleDietChange}
                className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-wait transition-colors duration-200 shadow-md"
        >
          {isLoading ? 'Generating...' : 'Create My Plan'}
        </button>
      </div>
    </form>
  );
};