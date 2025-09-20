import { 
  Utensils, 
  Heart, 
  Github, 
  Twitter, 
  Mail, 
  Shield, 
  FileText,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/foodsense' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/foodsense' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@foodsense.ai' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
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
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Transform any meal photo into detailed nutrition insights with our AI-powered 
              food recognition technology. Making healthy eating easier, one photo at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-health-light transition-all duration-200 hover:scale-110 shadow-sm"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-health-primary" />
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-health-primary" />
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-health-primary" />
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} FoodSense AI. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>for healthier living</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="#privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Shield className="h-3 w-3" />
                Privacy
              </a>
              <a 
                href="#terms" 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};