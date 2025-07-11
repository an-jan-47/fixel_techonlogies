import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, Smartphone, Palette, Zap } from "lucide-react";

const navigationItems = [
  { name: "Home", path: "#home" },
  { name: "Services", path: "#services" },
  { name: "About", path: "#about" },
  { name: "Portfolio", path: "#portfolio" },
  { name: "Reviews", path: "#reviews" },
  { name: "Contact", path: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-fixel-cyan rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Fixel
              </div>
              <div className="text-xs text-muted-foreground -mt-1">
                Technologies
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="relative text-sm font-medium transition-colors duration-200 hover:text-fixel-blue text-foreground/80"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors duration-200 hover:text-fixel-blue text-foreground/80"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
