import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code } from "lucide-react";
import {
  useOptimizedScroll,
  smoothScrollTo,
} from "@/hooks/use-optimized-scroll";

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
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const sectionObservers = useRef<Map<string, IntersectionObserver>>(new Map());
  const navRef = useRef<HTMLElement>(null);

  // Use optimized scroll hook
  const { scrollY } = useOptimizedScroll();
  const isScrolled = scrollY > 20;

  // Optimize active section detection with intersection observers
  useEffect(() => {
    const sections = navigationItems.map((item) => item.path.substring(1));

    // Clear existing observers
    sectionObservers.current.forEach((observer) => observer.disconnect());
    sectionObservers.current.clear();

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0.3, 0.5, 0.7],
          },
        );

        observer.observe(element);
        sectionObservers.current.set(sectionId, observer);
      }
    });

    return () => {
      sectionObservers.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Optimized smooth scroll with RAF
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 80; // Account for fixed header
        const targetPosition = target.offsetTop - offset;
        smoothScrollTo(targetPosition, 800);
      }
      setIsOpen(false);
    },
    [],
  );

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-fixel-blue/5"
          : "bg-transparent"
      } ${
        scrollDirection === "up" || scrollY < 100
          ? "translate-y-0"
          : "-translate-y-full"
      }`}
      style={{
        willChange: isScrolled ? "background-color, backdrop-filter" : "auto",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group gpu-accelerated"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 will-change-transform group-hover:rotate-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-fixel-cyan rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 will-change-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 will-change-transform">
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
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group gpu-accelerated ${
                    isActive
                      ? "text-fixel-blue bg-fixel-blue/10"
                      : "text-foreground/80 hover:text-fixel-blue hover:bg-fixel-blue/5"
                  }`}
                  style={{
                    willChange: "color, background-color, transform",
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-fixel-blue/20 to-fixel-purple/20 rounded-lg animate-pulse will-change-opacity"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-fixel-blue/0 to-fixel-purple/0 group-hover:from-fixel-blue/10 group-hover:to-fixel-purple/10 rounded-lg transition-all duration-300 will-change-auto"></div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-fixel-blue to-fixel-purple rounded-full"></div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-accent transition-all duration-300 hover:scale-110 relative group gpu-accelerated"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 transform-gpu ${
                  isOpen
                    ? "rotate-45 translate-y-2.5 bg-fixel-blue"
                    : "translate-y-0"
                }`}
                style={{ willChange: "transform, background-color" }}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
                style={{ willChange: "opacity, transform" }}
              ></span>
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 transform-gpu ${
                  isOpen
                    ? "-rotate-45 -translate-y-2.5 bg-fixel-blue"
                    : "translate-y-0"
                }`}
                style={{ willChange: "transform, background-color" }}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border transition-all duration-500 overflow-hidden ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-screen"
            : "opacity-0 -translate-y-4 max-h-0 pointer-events-none"
        }`}
        style={{
          willChange: isOpen ? "opacity, transform, max-height" : "auto",
        }}
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
                  className={`text-lg font-medium transition-all duration-300 p-3 rounded-lg hover:translate-x-2 gpu-accelerated ${
                    isActive
                      ? "text-fixel-blue bg-fixel-blue/10"
                      : "text-foreground/80 hover:text-fixel-blue hover:bg-fixel-blue/5"
                  }`}
                  style={{
                    willChange: "color, background-color, transform",
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen
                      ? "slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                  }}
                >
                  <span className="flex items-center">
                    {item.name}
                    {isActive && (
                      <div className="ml-2 w-2 h-2 bg-fixel-blue rounded-full animate-pulse"></div>
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          style={{
            zIndex: -1,
            willChange: "opacity",
          }}
        />
      )}
    </nav>
  );
}
