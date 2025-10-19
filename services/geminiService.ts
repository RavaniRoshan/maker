import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, MealPlan, DailyPlan, Dish } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const dishSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The name of the dish." },
    description: { type: Type.STRING, description: "A brief, appealing description of the dish." },
    calories: { type: Type.INTEGER, description: "Estimated calories for the dish." },
    protein: { type: Type.INTEGER, description: "Estimated protein in grams." },
    carbs: { type: Type.INTEGER, description: "Estimated carbohydrates in grams." },
    fat: { type: Type.INTEGER, description: "Estimated fat in grams." },
  },
  required: ["name", "description", "calories", "protein", "carbs", "fat"],
};

const mealPlanSchema = {
  type: Type.OBJECT,
  properties: {
    planTitle: { type: Type.STRING, description: "A catchy and motivating title for the meal plan." },
    dailyPlans: {
      type: Type.ARRAY,
      description: "An array of daily meal plans, one for each requested day.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number, starting from 1." },
          meals: {
            type: Type.ARRAY,
            description: "The meals for the day, such as Breakfast, Lunch, Dinner, and Snacks.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "The name of the meal (e.g., 'Breakfast', 'Lunch')." },
                dishes: {
                  type: Type.ARRAY,
                  description: "A list of dishes for this meal.",
                  items: dishSchema,
                },
              },
              required: ["name", "dishes"],
            },
          },
          dailyTotals: {
            type: Type.OBJECT,
            description: "The total macronutrient and calorie count for the day.",
            properties: {
              calories: { type: Type.INTEGER },
              protein: { type: Type.INTEGER },
              carbs: { type: Type.INTEGER },
              fat: { type: Type.INTEGER },
            },
            required: ["calories", "protein", "carbs", "fat"],
          },
        },
        required: ["day", "meals", "dailyTotals"],
      },
    },
  },
  required: ["planTitle", "dailyPlans"],
};

const goalMap = {
  LOSE_WEIGHT: 'weight loss',
  MAINTAIN_WEIGHT: 'weight maintenance',
  GAIN_MUSCLE: 'muscle gain'
};

const buildMainPrompt = (preferences: UserPreferences): string => {
  let prompt = `Generate a personalized fitness meal plan for ${preferences.days} day(s).\n`;
  prompt += `The primary goal is ${goalMap[preferences.goal]}.\n`;
  prompt += `Target daily calorie intake is approximately ${preferences.calories} calories.\n`;
  prompt += `The plan should include ${preferences.mealsPerDay} meals per day.\n`;
  if (preferences.dietaryRestrictions.length > 0) {
    prompt += `Adhere to the following dietary restrictions: ${preferences.dietaryRestrictions.join(', ')}.\n`;
  }
  prompt += `Provide a variety of simple, healthy, and delicious recipes. Calculate the total calories, protein, carbs, and fat for each day. Ensure the daily totals are close to the target calorie intake.`;
  
  return prompt;
};

const buildAlternativeDishPrompt = (preferences: UserPreferences, dailyPlan: DailyPlan, dishToReplace: Dish): string => {
  let prompt = `Suggest an alternative dish for a user's meal plan.\n\n`;
  prompt += `**User's Overall Goal:** ${goalMap[preferences.goal]}.\n`;
  prompt += `**User's Dietary Restrictions:** ${preferences.dietaryRestrictions.length > 0 ? preferences.dietaryRestrictions.join(', ') : 'None'}.\n\n`;
  prompt += `**Context:**\n`;
  prompt += `- The dish to be replaced is: "${dishToReplace.name}".\n`;
  prompt += `- The other dishes for the day are: ${dailyPlan.meals.flatMap(m => m.dishes).filter(d => d.name !== dishToReplace.name).map(d => d.name).join(', ')}.\n\n`;
  prompt += `Please provide a single, new dish suggestion that is different from the dish being replaced and the other dishes listed. The suggestion should align with the user's goals and restrictions and be a simple, healthy, and delicious recipe. Estimate its nutritional information.`;
  return prompt;
};

export const generateMealPlan = async (preferences: UserPreferences): Promise<MealPlan> => {
  const prompt = buildMainPrompt(preferences);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: mealPlanSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const mealPlanData: MealPlan = JSON.parse(jsonText);
    return mealPlanData;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};

export const generateAlternativeDish = async (preferences: UserPreferences, dailyPlan: DailyPlan, dishToReplace: Dish): Promise<Dish> => {
  const prompt = buildAlternativeDishPrompt(preferences, dailyPlan, dishToReplace);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dishSchema,
        temperature: 0.8, // Slightly higher for more creative alternatives
      },
    });

    const jsonText = response.text.trim();
    const dishData: Dish = JSON.parse(jsonText);
    return dishData;
  } catch (error) {
    console.error("Error generating alternative dish:", error);
    throw new Error("Failed to get an alternative from the AI model.");
  }
};