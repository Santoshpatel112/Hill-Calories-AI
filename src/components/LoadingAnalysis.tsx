import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

export const LoadingAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Analyzing image quality...",
    "Identifying food items...",
    "Calculating portions...",
    "Computing macronutrients...",
    "Finalizing results..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    const stepTimer = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <Card className="p-8 shadow-card-soft">
      <div className="space-y-6 text-center">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-health-gradient rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-16 h-16 bg-health-gradient rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Analyzing Your Meal</h3>
          <Progress value={Math.min(progress, 95)} className="w-full h-3" />
          <p className="text-sm text-muted-foreground animate-pulse">
            {steps[step]}
          </p>
        </div>

        {/* Fun Facts */}
        <div className="pt-4 text-xs text-muted-foreground space-y-1">
          <p>🧠 Our AI can identify over 1000+ food items</p>
          <p>⚡ Average analysis time: 3-5 seconds</p>
        </div>
      </div>
    </Card>
  );
};