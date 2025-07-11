import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code } from "lucide-react";

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
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navigationItems.map((item) => item.path.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80; // Account for fixed header
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-fixel-blue/5"
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
              <div className="w-10 h-10 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-fixel-cyan rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Fixel
              </div>
              <div className="text-xs text-muted-foreground -mt-1 group-hover:text-fixel-blue transition-colors duration-300">
                Technologies
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const sectionId = item.path.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleSmoothScroll(e, sectionId)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isActive
                      ? "text-fixel-blue bg-fixel-blue/10"
                      : "text-foreground/80 hover:text-fixel-blue hover:bg-fixel-blue/5"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-fixel-blue/20 to-fixel-purple/20 rounded-lg animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-fixel-blue/0 to-fixel-purple/0 group-hover:from-fixel-blue/10 group-hover:to-fixel-purple/10 rounded-lg transition-all duration-300"></div>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-accent transition-all duration-300 hover:scale-110 relative group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item, index) => {
              const sectionId = item.path.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleSmoothScroll(e, sectionId)}
                  className={`text-lg font-medium transition-all duration-300 p-3 rounded-lg hover:translate-x-2 ${
                    isActive
                      ? "text-fixel-blue bg-fixel-blue/10"
                      : "text-foreground/80 hover:text-fixel-blue hover:bg-fixel-blue/5"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen
                      ? "slide-in-left 0.5s ease-out forwards"
                      : "none",
                  }}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
