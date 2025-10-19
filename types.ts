
export interface UserPreferences {
  goal: 'LOSE_WEIGHT' | 'MAINTAIN_WEIGHT' | 'GAIN_MUSCLE';
  calories: number;
  mealsPerDay: number;
  dietaryRestrictions: string[];
  days: number;
}

export interface Dish {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string; // e.g., "Breakfast", "Lunch"
  dishes: Dish[];
}

export interface DailyPlan {
  day: number;
  meals: Meal[];
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealPlan {
  planTitle: string;
  dailyPlans: DailyPlan[];
}
