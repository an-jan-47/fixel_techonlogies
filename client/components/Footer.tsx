import { Button } from "@/components/ui/button";
import {
  Code,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

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

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-8 animate-fade-in delay-500">
              {[
                {
                  icon: <Github className="w-5 h-5" />,
                  color: "hover:bg-gray-100 dark:hover:bg-gray-800",
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  color: "hover:bg-blue-100 dark:hover:bg-blue-900",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  color: "hover:bg-blue-100 dark:hover:bg-blue-900",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  color: "hover:bg-red-100 dark:hover:bg-red-900",
                },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`hover:text-fixel-blue transition-all duration-300 hover:scale-110 hover:rotate-6 ${social.color}`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  {social.icon}
                </Button>
              ))}
            </div>

            {/* Contact CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-subtle delay-700">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
              >
                <a
                  href="https://wa.me/1234567890?text=Hi%20Fixel%20Technologies,%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-medium hover:scale-105 transition-all duration-300"
              >
                <a href="#contact">
                  Schedule Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border animate-fade-in delay-1000">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              © 2024 Fixel Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
