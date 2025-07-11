import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
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
    price: "Starting at $5,000",
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
    price: "Starting at $8,000",
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
    price: "Starting at $3,000",
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
    price: "Starting at $4,000",
  },
];

const stats = [
  { number: "150+", label: "Projects Delivered" },
  { number: "50+", label: "Happy Clients" },
  { number: "99%", label: "Success Rate" },
  { number: "24/7", label: "Support" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "GreenLife Co.",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "Fixel Technologies transformed our entire e-commerce platform. The team's expertise in sustainable tech solutions and their attention to detail exceeded our expectations. Our sales increased by 300% within the first quarter!",
    project: "EcoCommerce Platform",
    category: "E-commerce",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "WellnessTech",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The mobile app they developed for us has been a game-changer. The seamless integration with wearable devices and the intuitive UI design has made our users incredibly happy. 50k+ downloads in just 3 months!",
    project: "HealthTrack Mobile App",
    category: "Mobile Development",
    featured: true,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Founder",
    company: "Capital Insights",
    avatar: "/placeholder.svg",
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
    title: "EcoCommerce Platform",
    client: "GreenLife Co.",
    description:
      "A full-featured e-commerce platform for sustainable products with AI-powered recommendations.",
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    results: {
      metric1: { value: "300%", label: "Increase in Sales" },
      metric2: { value: "15k+", label: "Active Users" },
      metric3: { value: "99.9%", label: "Uptime" },
    },
    timeline: "4 Months",
    year: "2024",
  },
  {
    id: 2,
    title: "HealthTrack Mobile App",
    client: "WellnessTech",
    description:
      "Cross-platform mobile app for health monitoring with wearable integration.",
    image: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    results: {
      metric1: { value: "50k+", label: "Downloads" },
      metric2: { value: "4.8★", label: "App Store Rating" },
      metric3: { value: "85%", label: "User Retention" },
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

  const featuredTestimonials = testimonials.filter((t) => t.featured);

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

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
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
    }, 2000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-purple/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-fixel-blue/10 border border-fixel-blue/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <div className="w-2 h-2 bg-fixel-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-fixel-blue">
                Tech that moves faster than your ideas
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Code.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Design.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-cyan to-fixel-green bg-clip-text text-transparent">
                Scale.{" "}
              </span>
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent">
                Repeat.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              We're{" "}
              <span className="text-fixel-blue font-semibold">
                Fixel Technologies
              </span>{" "}
              — a cutting-edge tech company delivering digital transformation
              for startups, agencies, and enterprise clients worldwide.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-4"
            >
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                scale your business
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From web development to process automation, we provide
              comprehensive tech solutions that drive growth and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${service.color}/20 to-${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-${service.color}`}>
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-fixel-blue transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-fixel-blue mb-6">
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-fixel-green flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4"
            >
              About Fixel Technologies
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Crafting Digital{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Excellence
              </span>{" "}
              Since 2019
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of developers, designers, and innovators
              who believe technology should empower businesses to achieve their
              wildest ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${value.color}/20 to-${value.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-${value.color}`}>{value.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-fixel-blue transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-green text-fixel-green mb-4"
            >
              Our Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Digital Success{" "}
              <span className="bg-gradient-to-r from-fixel-green to-fixel-cyan bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our latest projects and see how we've helped businesses
              transform their digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-300 border-border/50 hover:border-fixel-blue/30 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-fixel-blue/10 to-fixel-purple/10 flex items-center justify-center">
                  <div className="text-6xl text-fixel-blue/30">
                    <Globe />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.client}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-fixel-blue transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Results</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-fixel-blue">
                            {project.results.metric1.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.results.metric1.label}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-fixel-green">
                            {project.results.metric2.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.results.metric2.label}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-fixel-purple">
                            {project.results.metric3.value}
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-pink text-fixel-pink mb-4"
            >
              Client Reviews
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-fixel-pink to-fixel-orange bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the businesses we've
              helped transform their digital presence.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto mb-16">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-card to-background border-fixel-blue/20">
              <CardContent className="text-center">
                <Quote className="w-12 h-12 text-fixel-blue mx-auto mb-6" />
                <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-foreground">
                  "{featuredTestimonials[currentTestimonial]?.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={featuredTestimonials[currentTestimonial]?.avatar}
                    />
                    <AvatarFallback className="bg-fixel-blue text-white">
                      {featuredTestimonials[currentTestimonial]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
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
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-fixel-orange text-fixel-orange"
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="bg-fixel-blue/10 text-fixel-blue border-fixel-blue/20"
                >
                  {featuredTestimonials[currentTestimonial]?.project}
                </Badge>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex space-x-2">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-fixel-blue"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-orange text-fixel-orange mb-4"
            >
              Contact Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge technology? Get
              in touch and let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Send us a{" "}
                <span className="text-gradient-green-cyan">message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="John Doe"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@company.com"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Your Company Inc."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="service">
                    Service Needed <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      handleInputChange("service", value)
                    }
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.title} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">
                    Project Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    required
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("newsletter", checked as boolean)
                    }
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for tech insights and updates
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-fixel-orange to-fixel-pink hover:from-fixel-orange/80 hover:to-fixel-pink/80 text-white font-semibold text-lg py-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Let's{" "}
                  <span className="text-gradient-orange-pink">connect</span>
                </h3>
                <p className="text-muted-foreground mb-8">
                  We're here to help you succeed. Reach out and let's start
                  building something amazing together.
                </p>
              </div>

              <Card className="p-6">
                <h4 className="font-bold text-lg mb-4">San Francisco HQ</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-fixel-blue" />
                    <span className="text-muted-foreground">
                      123 Tech Street, San Francisco, CA 94105
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-fixel-green" />
                    <span className="text-muted-foreground">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-fixel-orange" />
                    <span className="text-muted-foreground">
                      Mon-Fri: 9 AM - 6 PM PST
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-fixel-blue/5 to-fixel-purple/5">
                <h4 className="font-bold text-lg mb-4">Why Choose Fixel?</h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Zap className="w-5 h-5" />,
                      text: "Lightning-fast response times",
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      text: "99% project success rate",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      text: "Dedicated project manager",
                    },
                    {
                      icon: <Heart className="w-5 h-5" />,
                      text: "100% client satisfaction focus",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-fixel-blue">{item.icon}</div>
                      <span className="text-muted-foreground">{item.text}</span>
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
