import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MealAnalysisOutput, FoodItem, MacroData } from '@/types/nutrition';
import { Utensils, Target } from 'lucide-react';

interface NutritionResultsProps {
  data?: MacroData; // For backward compatibility
  mealData?: MealAnalysisOutput; // New format from webhook
  foodName?: string;
}

// Component for displaying detailed food items and nutrition
const DetailedNutritionResults = ({ mealData }: { mealData: MealAnalysisOutput }) => {
  const { food, total } = mealData;
  
  const macros = [
    {
      name: 'Protein',
      value: total.protein,
      unit: 'g',
      color: 'bg-macro-protein',
      textColor: 'text-macro-protein',
      percentage: (total.protein * 4 / total.calories) * 100
    },
    {
      name: 'Carbs',
      value: total.carbs,
      unit: 'g',
      color: 'bg-macro-carbs',
      textColor: 'text-macro-carbs',
      percentage: (total.carbs * 4 / total.calories) * 100
    },
    {
      name: 'Fat',
      value: total.fat,
      unit: 'g',
      color: 'bg-macro-fat',
      textColor: 'text-macro-fat',
      percentage: (total.fat * 9 / total.calories) * 100
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Total Calories Header */}
      <Card className="p-6 bg-health-gradient text-white shadow-health">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Total Nutrition</span>
          </div>
          <div className="text-4xl font-bold">{total.calories}</div>
          <div className="text-sm opacity-90">Total Calories</div>
        </div>
      </Card>

      {/* Food Items */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5 text-health-primary" />
          <h3 className="text-xl font-semibold">Detected Foods</h3>
          <Badge variant="secondary">{food.length} items</Badge>
        </div>
        
        <div className="grid gap-3">
          {food.map((item, index) => (
            <Card key={index} className="p-4 hover:shadow-card-soft transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-health-primary">{item.calories}</div>
                  <div className="text-xs text-muted-foreground">calories</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center p-2 bg-macro-protein/10 rounded-lg">
                  <div className="font-semibold text-macro-protein">{item.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-2 bg-macro-carbs/10 rounded-lg">
                  <div className="font-semibold text-macro-carbs">{item.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-2 bg-macro-fat/10 rounded-lg">
                  <div className="font-semibold text-macro-fat">{item.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Total Macronutrient Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {macros.map((macro) => (
            <Card key={macro.name} className={`p-4 bg-${macro.color}/10 border shadow-card-soft`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{macro.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${macro.color}`}></div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">{macro.value}</span>
                    <span className="text-sm text-muted-foreground mb-1">{macro.unit}</span>
                  </div>
                  
                  <Progress 
                    value={macro.percentage} 
                    className="h-2"
                  />
                  
                  <div className="text-xs text-muted-foreground">
                    {macro.percentage.toFixed(0)}% of calories
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <Card className="p-4 bg-health-light border-health-primary/20">
        <div className="text-center text-sm text-muted-foreground">
          <p>✨ AI-powered nutrition analysis</p>
          <p className="text-xs mt-1">Results may vary. For accurate tracking, weigh your food.</p>
        </div>
      </Card>
    </div>
  );
};

export const NutritionResults = ({ data, mealData, foodName }: NutritionResultsProps) => {
  // Use mealData if available (new format), otherwise fall back to data (old format)
  const isNewFormat = !!mealData;
  
  if (isNewFormat && mealData) {
    return <DetailedNutritionResults mealData={mealData} />;
  }
  
  // Fallback to old format for backward compatibility
  if (!data) return null;
  
  const { protein, carbs, fat, calories, confidence = 0 } = data;
  
  const macros = [
    {
      name: 'Protein',
      value: protein,
      unit: 'g',
      color: 'macro-protein',
      bgColor: 'bg-macro-protein/10',
      percentage: (protein * 4 / calories) * 100
    },
    {
      name: 'Carbs',
      value: carbs,
      unit: 'g',
      color: 'macro-carbs',
      bgColor: 'bg-macro-carbs/10',
      percentage: (carbs * 4 / calories) * 100
    },
    {
      name: 'Fat',
      value: fat,
      unit: 'g',
      color: 'macro-fat',
      bgColor: 'bg-macro-fat/10',
      percentage: (fat * 9 / calories) * 100
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <Card className="p-6 bg-health-gradient text-white shadow-health">
        <div className="text-center space-y-2">
          {foodName && (
            <h3 className="text-xl font-bold capitalize">{foodName}</h3>
          )}
          <div className="text-3xl font-bold">{calories}</div>
          <div className="text-sm opacity-90">Total Calories</div>
          <div className="text-xs opacity-75">
            {confidence}% confidence
          </div>
        </div>
      </Card>

      {/* Macronutrient Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {macros.map((macro, index) => (
          <Card key={macro.name} className={`p-4 ${macro.bgColor} border shadow-card-soft`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{macro.name}</h4>
                <div className={`w-3 h-3 rounded-full bg-${macro.color}`}></div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">{macro.value}</span>
                  <span className="text-sm text-muted-foreground mb-1">{macro.unit}</span>
                </div>
                
                <Progress 
                  value={macro.percentage} 
                  className="h-2"
                />
                
                <div className="text-xs text-muted-foreground">
                  {macro.percentage.toFixed(0)}% of calories
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <Card className="p-4 bg-health-light border-health-primary/20">
        <div className="text-center text-sm text-muted-foreground">
          <p>✨ AI-powered nutrition analysis</p>
          <p className="text-xs mt-1">Results may vary. For accurate tracking, weigh your food.</p>
        </div>
      </Card>
    </div>
  );
};