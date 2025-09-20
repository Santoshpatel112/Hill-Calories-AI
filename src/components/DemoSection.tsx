import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp } from 'lucide-react';
import demoMealImage from '@/assets/demo-meal.jpg';

export const DemoSection = () => {
  // Demo nutrition data for the burger and fries
  const demoData = {
    foodName: "Gourmet Burger & Fries",
    calories: 847,
    protein: 32,
    carbs: 58,
    fat: 48,
    confidence: 94
  };

  const macros = [
    {
      name: 'Protein',
      value: demoData.protein,
      unit: 'g',
      color: 'bg-macro-protein',
      textColor: 'text-macro-protein',
      percentage: (demoData.protein * 4 / demoData.calories) * 100
    },
    {
      name: 'Carbs', 
      value: demoData.carbs,
      unit: 'g',
      color: 'bg-macro-carbs',
      textColor: 'text-macro-carbs',
      percentage: (demoData.carbs * 4 / demoData.calories) * 100
    },
    {
      name: 'Fat',
      value: demoData.fat,
      unit: 'g', 
      color: 'bg-macro-fat',
      textColor: 'text-macro-fat',
      percentage: (demoData.fat * 9 / demoData.calories) * 100
    }
  ];

  return (
    <div className="bg-gradient-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-vibrant-orange/10 text-vibrant-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              See FoodSense AI in Action
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              From Photo to{' '}
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                Perfect Analysis
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how our AI instantly recognizes this delicious meal and breaks down every macro for you
            </p>
          </div>

          {/* Demo Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              <Card className="relative p-6 shadow-food hover:shadow-vibrant transition-all duration-500 group-hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={demoMealImage}
                    alt="Gourmet burger and fries"
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Floating Analysis Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg animate-float">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <div className="w-2 h-2 bg-vibrant-green rounded-full animate-pulse"></div>
                      <span className="text-vibrant-green">{demoData.confidence}% Match</span>
                    </div>
                  </div>

                  {/* Food Recognition Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gradient-primary p-3 rounded-lg text-white shadow-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-semibold text-sm">Identified:</span>
                      </div>
                      <p className="font-display font-semibold">{demoData.foodName}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Side */}
            <div className="space-y-6">
              {/* Calories Header */}
              <Card className="p-6 bg-gradient-sunset text-white shadow-vibrant">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold font-display">{demoData.calories}</div>
                  <div className="text-sm opacity-90">Total Calories</div>
                  <div className="text-xs opacity-75 bg-white/20 px-3 py-1 rounded-full inline-block">
                    ✨ AI Analysis Complete
                  </div>
                </div>
              </Card>

              {/* Macro Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Macronutrient Breakdown</h4>
                {macros.map((macro, index) => (
                  <Card key={macro.name} className="p-4 hover:shadow-card-soft transition-all duration-300">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${macro.color}`}></div>
                          <h5 className="font-semibold">{macro.name}</h5>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${macro.textColor}`}>
                            {macro.value}{macro.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {macro.percentage.toFixed(0)}% of calories
                          </div>
                        </div>
                      </div>
                      
                      <Progress 
                        value={macro.percentage} 
                        className="h-2"
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Trust Indicators */}
              <Card className="p-4 bg-vibrant-green/5 border-vibrant-green/20">
                <div className="text-center text-sm space-y-1">
                  <p className="font-semibold text-vibrant-green">🎯 Precise Recognition</p>
                  <p className="text-muted-foreground">Identified ingredients, portion sizes, and cooking methods</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};