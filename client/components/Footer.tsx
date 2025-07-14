import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-fixel-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-fixel-purple/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto">
            {/* Brand Section */}
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-6 group">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F44b23d3b90f744f2b1903fefd63b4fe7%2Fee993aad4b50489fb072653b8f0afd25?format=webp&width=800"
                  alt="Fixel Technologies"
                  className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <p className="text-lg text-muted-foreground mb-4 leading-relaxed animate-slide-in-left delay-200">
                Code. Design. Scale. Repeat.
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed animate-slide-in-right delay-300">
                Cutting-edge tech solutions for startups, agencies, and
                enterprise clients. We deliver digital transformation that
                scales with your ambitions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border animate-fade-in delay-1000">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              © 2025 Fixel Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
