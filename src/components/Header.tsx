import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Utensils, 
  Menu, 
  X, 
  Sparkles,
  Home,
  Info,
  BarChart3,
  Camera
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'How it Works', href: '#how-it-works', icon: Info },
    { name: 'Features', href: '#features', icon: BarChart3 },
    { name: 'Try Now', href: '#try-now', icon: Camera },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold bg-gradient-sunset bg-clip-text text-transparent">
                FoodSense
              </span>
              <span className="text-xs text-muted-foreground font-medium">AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection('#try-now')}
              className="bg-gradient-primary hover:shadow-glow shadow-vibrant transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Try Free
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 pb-6 border-b">
                  <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-display font-bold bg-gradient-sunset bg-clip-text text-transparent">
                      FoodSense
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">AI</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center space-x-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-accent"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <Button 
                  onClick={() => scrollToSection('#try-now')}
                  className="bg-gradient-primary hover:shadow-glow shadow-vibrant transition-all duration-300 mt-6"
                  size="lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try Free Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};