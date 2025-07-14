import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import FormField, { validationRules } from "@/components/FormField";
import {
  LoadingSpinner,
  ButtonLoading,
  ProgressBar,
  TypewriterText,
} from "@/components/LoadingStates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Code,
  Smartphone,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Rocket,
  Shield,
  Clock,
  Globe,
  MessageCircle,
  Calendar,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  Award,
  ThumbsUp,
  Building,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  Lightbulb,
  Send,
  Coffee,
  Sparkles,
  Target,
} from "lucide-react";

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies.",
    color: "fixel-blue",
    features: [
      "React, Vue, Angular applications",
      "Node.js, Python, PHP backends",
      "Progressive Web Apps (PWA)",
      "E-commerce platforms",
      "Custom CMS solutions",
      "API development & integration",
    ],
    price: 5000,
    popular: false,
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    color: "fixel-purple",
    features: [
      "React Native development",
      "Native iOS (Swift) & Android (Kotlin)",
      "Flutter applications",
      "App Store optimization",
      "Push notifications",
      "Offline functionality",
    ],
    price: 8000,
    popular: true,
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that convert visitors into customers.",
    color: "fixel-cyan",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design & branding",
      "Usability testing",
      "Design systems",
      "Responsive design",
    ],
    price: 3000,
    popular: false,
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Process Automation",
    description:
      "Streamline your business operations with intelligent automation solutions.",
    color: "fixel-orange",
    features: [
      "Business process automation",
      "API integrations",
      "Workflow optimization",
      "Data migration",
      "Custom dashboards",
      "Reporting & analytics",
    ],
    price: 4000,
    popular: false,
  },
];

const stats = [
  { number: 10, label: "Projects Delivered", suffix: "+", icon: <Rocket /> },
  { number: 6, label: "Happy Clients", suffix: "+", icon: <Users /> },
  { number: 100, label: "Success Rate", suffix: "%", icon: <Target /> },
  { number: 24, label: "Support", suffix: "/7", icon: <Clock /> },
];

const testimonials = [
  {
    id: 1,
        name: "Harsh",
    role: "CEO",
    company: "GroceryHub",
        avatar: "",
    rating: 5,
            text: "Fixel Technologies transformed our entire e-commerce platform for wholesale grocery products. Their AI-powered recommendations and attention to detail exceeded our expectations. Our sales increased by 300% within the first quarter!",
    project: "E commerce Platform",
    category: "E-commerce",
    featured: true,
  },
  {
    id: 2,
        name: "Shrikant",
    role: "CTO",
    company: "Medika Indica",
        avatar: "",
    rating: 5,
        text: "The mobile app they developed for us revolutionized medicine delivery. The 30-minute delivery system and intuitive UI design has made our users incredibly happy. 5k downloads and growing rapidly!",
    project: "Medika Indica Mobile App",
    category: "Mobile Development",
    featured: true,
  },
  {
    
    
    role: "Founder",
    company: "Capital Insights",
        avatar: "",
    rating: 5,
    text: "Working with Fixel was an absolute pleasure. They delivered our financial dashboard ahead of schedule and the real-time analytics capabilities have saved our team 60% of their time. Exceptional work!",
    project: "FinanceFlow Dashboard",
    category: "Web Development",
    featured: false,
  },
];

const projects = [
  {
    id: 1,
    title: "E commerce Platform",
    client: "GroceryHub",
    description:
      "A full-featured e-commerce platform for wholesale grocery products with AI-powered recommendations.",
    image: "",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    results: {
      metric1: {
        value: 300,
        label: "Increase in Sales",
        suffix: "%",
        decimals: 0,
      },
      metric2: { value: 15, label: "Active Users", suffix: "k+", decimals: 0 },
      metric3: { value: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
    },
    timeline: "4 Months",
    year: "2024",
  },
    {
    id: 2,
    title: "Medika Indica Mobile App",
    client: "Medika Indica",
    description:
      "Cross-platform mobile app for medicine delivery in 30 minutes.",
    image: "",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    results: {
      metric1: { value: 5, label: "Downloads", suffix: "k", decimals: 0 },
      metric2: {
        value: 4.8,
        label: "App Store Rating",
        suffix: "★",
        decimals: 1,
      },
      metric3: { value: 85, label: "User Retention", suffix: "%", decimals: 0 },
    },
    timeline: "6 Months",
    year: "2024",
  },
];

const values = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation First",
    description:
      "We stay ahead of technology trends and implement cutting-edge solutions that give our clients a competitive advantage.",
    color: "fixel-blue",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Client-Centric",
    description:
      "Your success is our success. We build lasting partnerships by understanding your business goals and delivering beyond expectations.",
    color: "fixel-pink",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Assurance",
    description:
      "Every project undergoes rigorous testing and quality checks to ensure reliability, security, and optimal performance.",
    color: "fixel-green",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Agile Delivery",
    description:
      "Fast, iterative development cycles ensure quick time-to-market while maintaining flexibility for evolving requirements.",
    color: "fixel-orange",
  },
];

export default function Index() {
  const { toast } = useToast();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const featuredTestimonials = testimonials.filter((t) => t.featured);

    useEffect(() => {
    setMounted(true);

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length,
    );
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setSubmitProgress(100);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitProgress(0);
        toast({
          title: "Message sent successfully! 🎉",
          description:
            "Thank you for reaching out. We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
          newsletter: false,
        });
      }, 500);
    }, 2000);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" className="text-fixel-blue" />
      </div>
    );
  }

  return (
    <Layout>
      <ScrollProgress />
      <ScrollToTop />

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden min-h-screen flex items-center"
      >
        {/* Enhanced animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-fixel-cyan/5 via-transparent to-transparent animate-pulse delay-2000"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-fixel-blue to-fixel-purple rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-fixel-blue/10 border border-fixel-blue/20 rounded-full px-6 py-2 mb-8 animate-bounce-subtle backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-fixel-blue animate-pulse" />
              <TypewriterText
                text="Tech that moves faster than your ideas"
                speed={30}
                className="text-sm font-medium text-fixel-blue"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-left">
                Code.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent animate-slide-in-left delay-200">
                Design.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-cyan to-fixel-green bg-clip-text text-transparent animate-slide-in-left delay-300">
                Scale.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent animate-slide-in-left delay-500">
                Repeat.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-700">
              We're{" "}
              <span className="text-fixel-blue font-semibold bg-fixel-blue/10 px-2 py-1 rounded-lg">
                Fixel Technologies
              </span>{" "}
              — a cutting-edge tech company delivering digital transformation
              for startups, agencies, and enterprise clients worldwide.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in delay-1000">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:scale-110 transition-all duration-500 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm border-border/50 hover:border-fixel-blue/30 hover:shadow-2xl hover:shadow-fixel-blue/10"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-fixel-blue/20 to-fixel-purple/20 flex items-center justify-center text-fixel-blue group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent mb-2">
                      <AnimatedCounter
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={2000 + index * 200}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-fixel-blue transition-colors duration-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-fixel-blue/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-fixel-purple/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-4 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
            >
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 animate-slide-in-left delay-200">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                scale your business
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-300">
              From web development to process automation, we provide
              comprehensive tech solutions that drive growth and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-500 border-border/50 hover:border-fixel-blue/30 hover:scale-105 animate-fade-in relative overflow-hidden ${
                  service.popular ? "ring-2 ring-fixel-blue/20" : ""
                }`}
                style={{ animationDelay: `${500 + index * 200}ms` }}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-fixel-blue to-fixel-purple text-white animate-pulse">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fixel-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="pb-4 relative z-10">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${service.color}/20 to-${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 backdrop-blur-sm`}
                  >
                    <div
                      className={`text-${service.color} group-hover:animate-pulse`}
                    >
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-fixel-blue transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <CheckCircle className="w-5 h-5 text-fixel-green flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                                    <Button
                    className="w-full bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white group/btn hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-fixel-cyan/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fixel-orange/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
            >
              About Fixel Technologies
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-slide-in-left delay-200">
              Crafting Digital{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Excellence
              </span>{" "}
                            Since 2024
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-right delay-300">
              We're a passionate team of developers, designers, and innovators
              who believe technology should empower businesses to achieve their
              wildest ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-500 border-border/50 hover:border-fixel-blue/30 hover:scale-105 animate-fade-in backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80"
                style={{ animationDelay: `${500 + index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${value.color}/20 to-${value.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <div
                      className={`text-${value.color} group-hover:animate-pulse`}
                    >
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-fixel-blue transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-fixel-green/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fixel-cyan/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge
              variant="outline"
              className="border-fixel-green text-fixel-green mb-4 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
            >
              Our Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-slide-in-left delay-200">
              Digital Success{" "}
              <span className="bg-gradient-to-r from-fixel-green to-fixel-cyan bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-300">
              Explore our latest projects and see how we've helped businesses
              transform their digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-500 border-border/50 hover:border-fixel-blue/30 overflow-hidden hover:scale-105 animate-fade-in backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80"
                style={{ animationDelay: `${500 + index * 300}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-fixel-blue/10 to-fixel-purple/10 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl text-fixel-blue/30 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <Globe />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fixel-blue/5 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Tech stack badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-background/80 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs animate-bounce-subtle delay-1000 backdrop-blur-sm"
                    >
                      {project.client}
                    </Badge>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-fixel-blue transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-fixel-green" />
                        Results
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center group-hover:scale-110 transition-transform duration-300 p-3 rounded-lg bg-fixel-blue/5">
                          <div className="text-lg font-bold text-fixel-blue">
                            <AnimatedCounter
                              end={project.results.metric1.value}
                              suffix={project.results.metric1.suffix}
                              decimals={project.results.metric1.decimals || 0}
                              duration={2000}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.results.metric1.label}
                          </div>
                        </div>
                        <div className="text-center group-hover:scale-110 transition-transform duration-300 delay-100 p-3 rounded-lg bg-fixel-green/5">
                          <div className="text-lg font-bold text-fixel-green">
                            <AnimatedCounter
                              end={project.results.metric2.value}
                              suffix={project.results.metric2.suffix}
                              decimals={project.results.metric2.decimals || 0}
                              duration={2000}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.results.metric2.label}
                          </div>
                        </div>
                        <div className="text-center group-hover:scale-110 transition-transform duration-300 delay-200 p-3 rounded-lg bg-fixel-purple/5">
                          <div className="text-lg font-bold text-fixel-purple">
                            <AnimatedCounter
                              end={project.results.metric3.value}
                              suffix={project.results.metric3.suffix}
                              decimals={project.results.metric3.decimals || 0}
                              duration={2000}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.results.metric3.label}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{project.timeline}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-fixel-blue hover:text-fixel-purple hover:bg-fixel-blue/10"
                      >
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-8 w-72 h-72 bg-fixel-pink/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-8 w-72 h-72 bg-fixel-orange/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge
              variant="outline"
              className="border-fixel-pink text-fixel-pink mb-4 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
            >
              Client Reviews
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-slide-in-left delay-200">
              What Our{" "}
              <span className="bg-gradient-to-r from-fixel-pink to-fixel-orange bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-300">
              Don't just take our word for it. Hear from the businesses we've
              helped transform their digital presence.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto mb-16 animate-fade-in delay-500">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-card/80 to-background/80 border-fixel-blue/20 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-fixel-blue/10 backdrop-blur-sm">
              <CardContent className="text-center">
                <Quote className="w-12 h-12 text-fixel-blue mx-auto mb-6 animate-bounce-subtle" />
                <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-foreground animate-fade-in">
                  "{featuredTestimonials[currentTestimonial]?.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4 mb-6 animate-slide-in-left delay-200">
                  
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {featuredTestimonials[currentTestimonial]?.name}
                    </div>
                    <div className="text-muted-foreground">
                      {featuredTestimonials[currentTestimonial]?.role} at{" "}
                      {featuredTestimonials[currentTestimonial]?.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 mb-6 animate-slide-in-right delay-300">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-fixel-orange text-fixel-orange hover:scale-125 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="bg-fixel-blue/10 text-fixel-blue border-fixel-blue/20 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
                >
                  {featuredTestimonials[currentTestimonial]?.project}
                </Badge>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center space-x-4 mt-8 animate-fade-in delay-700">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full hover:scale-110 transition-all duration-300 hover:bg-fixel-blue hover:text-white backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex space-x-2">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentTestimonial
                        ? "bg-fixel-blue scale-125"
                        : "bg-muted hover:bg-fixel-blue/50"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full hover:scale-110 transition-all duration-300 hover:bg-fixel-blue hover:text-white backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-fixel-orange/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-fixel-pink/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge
              variant="outline"
              className="border-fixel-orange text-fixel-orange mb-4 hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
            >
              Contact Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-slide-in-left delay-200">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-right delay-300">
              Ready to transform your business with cutting-edge technology? Get
              in touch and let's discuss how we can help you achieve your goals.
            </p>
          </div>

          {/* Enhanced Calendly Integration */}
          <div className="max-w-4xl mx-auto mb-16 animate-fade-in delay-500">
            <Card className="p-8 hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-500 hover:scale-105 backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold mb-4 flex items-center justify-center">
                  <Calendar className="w-6 h-6 mr-3 text-fixel-blue" />
                  Schedule a{" "}
                  <span className="text-gradient-blue-purple ml-2">
                    Free Consultation
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Book a 30-minute call with our team to discuss your project
                  requirements and get a personalized solution.
                </p>
              </CardHeader>
              <CardContent>
                                                <div className="bg-white rounded-lg border overflow-hidden">
                  
                                                            <div
                                            className="calendly-inline-widget"
                      data-url="https://calendly.com/technologiesfixel/30min"
                      style={{ minWidth: '320px', height: '700px', width: '100%' }}
                    ></div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white font-semibold hover:scale-105 transition-all duration-300"
                    >
                                            <a
                        href="https://calendly.com/technologiesfixel/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Open Calendly
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  {/* Floating calendar icons */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-fixel-blue/10 rounded-full flex items-center justify-center animate-float">
                    <Calendar className="w-4 h-4 text-fixel-blue" />
                  </div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-fixel-purple/10 rounded-full flex items-center justify-center animate-float delay-1000">
                    <Clock className="w-3 h-3 text-fixel-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-slide-in-left delay-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="w-6 h-6 mr-3 text-fixel-green" />
                Send us a{" "}
                <span className="text-gradient-green-cyan ml-2">message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSubmitting && (
                  <div className="mb-4">
                    <ProgressBar
                      progress={submitProgress}
                      showLabel
                      className="animate-fade-in"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    required
                                        placeholder=""
                    validation={validationRules.required("Full Name")}
                  />
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    required
                                        placeholder=""
                    validation={validationRules.email}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Company Name"
                    id="company"
                    value={formData.company}
                    onChange={(value) => handleInputChange("company", value)}
                                        placeholder=""
                  />
                  <FormField
                    label="Phone Number"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => handleInputChange("phone", value)}
                                        placeholder=""
                    validation={validationRules.phone}
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-medium group-hover:text-fixel-blue transition-colors duration-300">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      handleInputChange("service", value)
                    }
                    required
                  >
                                                            <SelectTrigger
                      className="mt-2 hover:border-fixel-blue/50 focus:border-fixel-blue transition-colors duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                                            <SelectValue placeholder="" />
                    </SelectTrigger>
                                        <SelectContent className="z-50" position="popper" sideOffset={4}>
                      {services.map((service) => (
                        <SelectItem key={service.title} value={service.title}>
                          <div className="flex items-center space-x-2">
                            <div className={`text-${service.color}`}>
                              {service.icon}
                            </div>
                            <span>{service.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FormField
                  label="Project Description"
                  id="message"
                  value={formData.message}
                  onChange={(value) => handleInputChange("message", value)}
                  required
                  multiline
                  rows={5}
                                    placeholder=""
                  validation={validationRules.minLength(10)}
                />

                <div className="flex items-center space-x-2 group">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("newsletter", checked as boolean)
                    }
                    className="group-hover:border-fixel-blue transition-colors duration-300"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm group-hover:text-fixel-blue transition-colors duration-300 cursor-pointer"
                  >
                    Subscribe to our newsletter for tech insights and updates
                  </label>
                </div>

                <ButtonLoading
                  type="submit"
                  loading={isSubmitting}
                  className="w-full bg-gradient-to-r from-fixel-orange to-fixel-pink hover:from-fixel-orange/80 hover:to-fixel-pink/80 text-white font-semibold text-lg py-6 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 mr-3" />
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-3" />
                </ButtonLoading>
              </form>
            </div>

            <div className="space-y-8 animate-slide-in-right delay-700">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-fixel-orange" />
                  Let's{" "}
                  <span className="text-gradient-orange-pink ml-2">
                    connect
                  </span>
                </h3>
                <p className="text-muted-foreground mb-8">
                  We're here to help you succeed. Reach out and let's start
                  building something amazing together.
                </p>
              </div>

              

              <Card className="p-6 bg-gradient-to-br from-fixel-blue/5 to-fixel-purple/5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-fixel-purple" />
                  Why Choose Fixel?
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Zap className="w-5 h-5" />,
                      text: "Lightning-fast response times",
                      color: "fixel-blue",
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                                            text: "100% project success rate",
                      color: "fixel-green",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      text: "Dedicated project manager",
                      color: "fixel-purple",
                    },
                    {
                      icon: <Heart className="w-5 h-5" />,
                      text: "100% client satisfaction focus",
                      color: "fixel-pink",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300 p-3 rounded-lg hover:bg-white/5"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`text-${item.color} group-hover:scale-125 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}