export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTotal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealAnalysisOutput {
  status: string;
  food: FoodItem[];
  total: NutritionTotal;
}

export interface MealAnalysisResponse {
  output: MealAnalysisOutput;
}

// For backward compatibility with existing components
export interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  confidence?: number;
}