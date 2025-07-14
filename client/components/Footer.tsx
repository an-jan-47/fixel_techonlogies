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
              <div className="flex items-center justify-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-fixel-cyan rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                    Fixel
                  </div>
                  <div className="text-sm text-muted-foreground -mt-1">
                    Technologies
                  </div>
                </div>
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
