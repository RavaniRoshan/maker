
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import Dish type
import type { UserPreferences, MealPlan, Dish } from "../types";

// Initialize the Google Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const mealPlanSchema = {
  type: Type.OBJECT,
  properties: {
    planTitle: { type: Type.STRING },
    dailyPlans: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dishes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      calories: { type: Type.NUMBER },
                      protein: { type: Type.NUMBER },
                      carbs: { type: Type.NUMBER },
                      fat: { type: Type.NUMBER },
                    },
                    required: ['name', 'description', 'calories', 'protein', 'carbs', 'fat'],
                  },
                },
              },
              required: ['name', 'dishes'],
            },
          },
          dailyTotals: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fat: { type: Type.NUMBER },
            },
            required: ['calories', 'protein', 'carbs', 'fat'],
          },
        },
        required: ['day', 'meals', 'dailyTotals'],
      },
    },
  },
  required: ['planTitle', 'dailyPlans'],
};

// FIX: Add schema for a single dish, used by new functions
const dishSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    calories: { type: Type.NUMBER },
    protein: { type: Type.NUMBER },
    carbs: { type: Type.NUMBER },
    fat: { type: Type.NUMBER },
  },
  required: ['name', 'description', 'calories', 'protein', 'carbs', 'fat'],
};

export const generateMealPlan = async (preferences: UserPreferences): Promise<MealPlan> => {
  const { goal, calories, mealsPerDay, dietaryRestrictions, days } = preferences;

  const dietaryString = dietaryRestrictions.length > 0 ? ` with the following dietary restrictions: ${dietaryRestrictions.join(', ')}.` : '.';

  const prompt = `
    Create a personalized meal plan for me.
    My primary goal is: ${goal}.
    I want to consume approximately ${calories} calories per day.
    Please structure the plan for ${mealsPerDay} meals per day.
    The plan should cover ${days} day(s).
    ${dietaryString}
    
    For each day, provide a list of meals (e.g., Breakfast, Lunch, Dinner).
    For each meal, list the dishes.
    For each dish, provide a short description, and its nutritional information (calories, protein, carbs, fat).
    Also, calculate and provide the total nutritional values for each day.
    Give the entire plan a creative and motivating title.
    Ensure the output is a valid JSON object that conforms to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: mealPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    // In case the model returns a markdown code block
    const cleanedJson = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
    const mealPlan = JSON.parse(cleanedJson) as MealPlan;
    return mealPlan;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to generate meal plan. The model might be overloaded or the request is invalid. Please try again later.");
  }
};

// FIX: Implement and export generateAlternativeDish function
export const generateAlternativeDish = async (preferences: UserPreferences, otherDishes: Dish[], originalDish: Dish): Promise<Dish> => {
  const { goal, calories, dietaryRestrictions } = preferences;
  const dietaryString = dietaryRestrictions.length > 0 ? ` with the following dietary restrictions: ${dietaryRestrictions.join(', ')}` : 'No specific dietary restrictions';
  const otherDishesString = otherDishes.map(d => d.name).join(', ');

  const prompt = `
    Suggest an alternative dish for "${originalDish.name}".
    My goal is ${goal} and my daily calorie target is around ${calories} calories.
    The original dish has ${originalDish.calories} calories. The alternative should have a similar calorie count.
    My dietary restrictions are: ${dietaryString}.
    The new dish must NOT be any of the following: ${otherDishesString}.
    Please provide the name, a short description, and nutritional information (calories, protein, carbs, fat) for the new dish.
    Ensure the output is a single valid JSON object that conforms to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dishSchema,
      },
    });

    const jsonText = response.text.trim();
    const cleanedJson = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
    const newDish = JSON.parse(cleanedJson) as Dish;
    return newDish;
  } catch (error) {
    console.error("Error generating alternative dish:", error);
    throw new Error("Failed to suggest an alternative dish. Please try again.");
  }
};

// FIX: Implement and export searchRecipes function
export const searchRecipes = async (preferences: UserPreferences, searchQuery: string): Promise<Dish[]> => {
  const { dietaryRestrictions } = preferences;
  const dietaryString = dietaryRestrictions.length > 0 ? ` respecting these dietary restrictions: ${dietaryRestrictions.join(', ')}.` : '';

  const prompt = `
    Find 3 recipes that match the search term: "${searchQuery}".
    ${dietaryString}
    For each recipe, provide a name, a short description, and its estimated nutritional information (calories, protein, carbs, fat).
    Ensure the output is a valid JSON array of objects that conforms to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: dishSchema
        },
      },
    });

    const jsonText = response.text.trim();
    const cleanedJson = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
    const searchResults = JSON.parse(cleanedJson) as Dish[];
    return searchResults;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw new Error("Failed to search for recipes. Please try again.");
  }
};
