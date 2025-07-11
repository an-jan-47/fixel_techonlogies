import { Link } from "react-router-dom";
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

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
];

const services = [
  { name: "Web Development", path: "/services#web" },
  { name: "Mobile Apps", path: "/services#mobile" },
  { name: "UI/UX Design", path: "/services#design" },
  { name: "Process Automation", path: "/services#automation" },
];

const company = [
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-fixel-blue to-fixel-purple rounded-xl flex items-center justify-center">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-fixel-cyan rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                    Fixel
                  </div>
                  <div className="text-sm text-muted-foreground -mt-1">
                    Technologies
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Code. Design. Scale. Repeat.
              </p>

              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Cutting-edge tech solutions for startups, agencies, and
                enterprise clients. We deliver digital transformation that
                scales with your ambitions.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-fixel-blue/10 hover:text-fixel-blue transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-fixel-blue/10 hover:text-fixel-blue transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-fixel-blue/10 hover:text-fixel-blue transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-fixel-blue/10 hover:text-fixel-blue transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-muted-foreground hover:text-fixel-blue transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Services</h3>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.path}>
                      <Link
                        to={service.path}
                        className="text-muted-foreground hover:text-fixel-blue transition-colors duration-200 text-sm"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-3">
                  {company.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-muted-foreground hover:text-fixel-blue transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Fixel Technologies. All rights reserved.
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Let's connect:
                </span>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white"
                >
                  Schedule Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
