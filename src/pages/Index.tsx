import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from '@/components/ImageUpload';
import { NutritionResults } from '@/components/NutritionResults';
import { LoadingAnalysis } from '@/components/LoadingAnalysis';
import { DemoSection } from '@/components/DemoSection';
import { Zap, Camera, BarChart3, Sparkles, Target, Rocket, Settings, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MealAnalysisAPI } from '@/lib/mealAnalysisAPI';
import { MealAnalysisOutput } from '@/types/nutrition';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MealAnalysisOutput | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResults(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setResults(null);
  };

  const toggleMockData = () => {
    const newUseMockData = !useMockData;
    setUseMockData(newUseMockData);
    MealAnalysisAPI.useMockData = newUseMockData;
    toast({
      title: newUseMockData ? "Mock Mode Enabled" : "Live Webhook Enabled",
      description: newUseMockData 
        ? "Using sample data for testing" 
        : "Will attempt to connect to real webhook",
    });
  };

  const testWebhook = async () => {
    toast({
      title: "Testing Webhook...",
      description: "Check browser console for results",
    });
    await MealAnalysisAPI.testWebhook();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Call the webhook API with automatic fallback
      const response = await MealAnalysisAPI.analyzeImage(selectedImage);
      setResults(response.output);
      
      toast({
        title: "Analysis Complete!",
        description: useMockData 
          ? "Showing sample nutrition data" 
          : "Your meal has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      
      // If webhook fails, automatically switch to mock mode
      if (!useMockData) {
        console.log('🔄 Switching to mock mode due to webhook failure');
        setUseMockData(true);
        MealAnalysisAPI.useMockData = true;
        
        // Try again with mock data
        try {
          const mockResponse = await MealAnalysisAPI.analyzeImage(selectedImage);
          setResults(mockResponse.output);
          
          toast({
            title: "Using Sample Data",
            description: "Webhook unavailable, showing sample results. Check console for details.",
            variant: "default",
          });
        } catch (mockError) {
          toast({
            title: "Analysis Failed",
            description: "Unable to analyze image. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Analysis Failed",
          description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-light overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-vibrant-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-vibrant-red/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-vibrant-yellow/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-full text-sm font-semibold shadow-vibrant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Sparkles className="h-5 w-5" />
              The Future of Food Recognition
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                FoodSense
              </span>
              <br />
              <span className="text-foreground">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform any meal photo into detailed nutrition insights. Our AI doesn't just count calories—it understands your food like a personal nutritionist.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-card-soft">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">3-Second Analysis</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-card-soft">
                <div className="w-8 h-8 bg-gradient-fresh rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">90%+ Accuracy</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-card-soft">
                <div className="w-8 h-8 bg-gradient-berry rounded-full flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">1000+ Foods</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="how-it-works">
        <DemoSection />
      </section>

      {/* Main App Section */}
      <section id="try-now" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Try It <span className="bg-gradient-primary bg-clip-text text-transparent">Yourself</span>
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMockData}
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    {useMockData ? (
                      <>
                        <Badge variant="secondary">Mock Mode</Badge>
                        Switch to Live
                      </>
                    ) : (
                      <>
                        <Badge variant="default">Live Mode</Badge>
                        Switch to Mock
                      </>
                    )}
                  </Button>
                  {!useMockData && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testWebhook}
                      className="flex items-center gap-2"
                    >
                      <TestTube className="h-4 w-4" />
                      Test Webhook
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground">
                Upload your meal photo and see the magic happen
                {useMockData ? (
                  <span className="block text-sm text-orange-600 mt-1 font-medium">
                    🧪 Currently using sample data for demonstration
                  </span>
                ) : (
                  <span className="block text-sm text-green-600 mt-1 font-medium">
                    🌐 Connected to live n8n webhook
                  </span>
                )}
              </p>
            </div>
            <ImageUpload 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClearImage}
            />
            
            {selectedImage && !isAnalyzing && !results && (
              <div className="text-center">
                <Button 
                  onClick={analyzeImage}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow shadow-vibrant transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze My Meal
                </Button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isAnalyzing && <LoadingAnalysis />}

          {/* Results */}
          {results && !isAnalyzing && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Nutrition Analysis</h2>
                <p className="text-muted-foreground">Here's what we found in your meal</p>
              </div>
              
              <NutritionResults 
                mealData={results}
                foodName="Analyzed meal"
              />
              
              <div className="text-center pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setResults(null);
                  }}
                >
                  Analyze Another Meal
                </Button>
              </div>
            </div>
          )}

          {/* Features Section */}
          {!selectedImage && !isAnalyzing && !results && (
            <section id="features" className="grid md:grid-cols-3 gap-6 pt-16">
              <Card className="group p-6 text-center space-y-4 hover:shadow-vibrant transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform duration-300">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Snap & Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Simply take a photo or upload an image of your meal for instant analysis.
                </p>
              </Card>
              
              <Card className="group p-6 text-center space-y-4 hover:shadow-food transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-fresh rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Detailed Macros</h3>
                <p className="text-sm text-muted-foreground">
                  Get precise protein, carbs, and fat content with calorie calculations.
                </p>
              </Card>
              
              <Card className="group p-6 text-center space-y-4 hover:shadow-glow transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-berry rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning models trained on thousands of food images.
                </p>
              </Card>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
