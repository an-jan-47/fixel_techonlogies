import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Smartphone,
  Globe,
  Palette,
  Zap,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "EcoCommerce Platform",
    category: "web",
    client: "GreenLife Co.",
    description:
      "A full-featured e-commerce platform for sustainable products with AI-powered recommendations and carbon footprint tracking.",
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    features: [
      "AI Product Recommendations",
      "Carbon Footprint Calculator",
      "Multi-vendor Marketplace",
      "Advanced Analytics Dashboard",
    ],
    results: {
      metric1: { value: "300%", label: "Increase in Sales" },
      metric2: { value: "15k+", label: "Active Users" },
      metric3: { value: "99.9%", label: "Uptime" },
    },
    timeline: "4 Months",
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "HealthTrack Mobile App",
    category: "mobile",
    client: "WellnessTech",
    description:
      "Cross-platform mobile app for health monitoring with wearable integration and telemedicine features.",
    image: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    features: [
      "Wearable Device Integration",
      "Telemedicine Video Calls",
      "Health Data Analytics",
      "Medication Reminders",
    ],
    results: {
      metric1: { value: "50k+", label: "Downloads" },
      metric2: { value: "4.8★", label: "App Store Rating" },
      metric3: { value: "85%", label: "User Retention" },
    },
    timeline: "6 Months",
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "FinanceFlow Dashboard",
    category: "web",
    client: "Capital Insights",
    description:
      "Real-time financial analytics dashboard with advanced charting and automated reporting capabilities.",
    image: "/placeholder.svg",
    technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "D3.js"],
    features: [
      "Real-time Data Visualization",
      "Automated Report Generation",
      "Risk Assessment Tools",
      "Multi-currency Support",
    ],
    results: {
      metric1: { value: "60%", label: "Time Saved" },
      metric2: { value: "25+", label: "Financial Metrics" },
      metric3: { value: "100%", label: "Data Accuracy" },
    },
    timeline: "3 Months",
    year: "2023",
    featured: false,
  },
  {
    id: 4,
    title: "CreativeSpace Design System",
    category: "design",
    client: "DesignPro Agency",
    description:
      "Comprehensive design system and component library for consistent brand experience across all touchpoints.",
    image: "/placeholder.svg",
    technologies: ["Figma", "Storybook", "React", "Tailwind CSS"],
    features: [
      "300+ Design Components",
      "Interactive Documentation",
      "Brand Guidelines",
      "Accessibility Compliance",
    ],
    results: {
      metric1: { value: "80%", label: "Faster Design Process" },
      metric2: { value: "95%", label: "Brand Consistency" },
      metric3: { value: "WCAG", label: "AA Compliant" },
    },
    timeline: "2 Months",
    year: "2023",
    featured: false,
  },
  {
    id: 5,
    title: "AutomateFlow CRM",
    category: "automation",
    client: "SalesForce Pro",
    description:
      "Intelligent CRM system with automated lead scoring, email campaigns, and sales pipeline optimization.",
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Redis", "SendGrid"],
    features: [
      "AI Lead Scoring",
      "Automated Email Campaigns",
      "Pipeline Analytics",
      "Integration Hub",
    ],
    results: {
      metric1: { value: "40%", label: "Lead Conversion" },
      metric2: { value: "70%", label: "Process Automation" },
      metric3: { value: "5x", label: "Faster Reporting" },
    },
    timeline: "5 Months",
    year: "2023",
    featured: true,
  },
  {
    id: 6,
    title: "FoodieApp Mobile Platform",
    category: "mobile",
    client: "Culinary Connect",
    description:
      "Social dining platform connecting food enthusiasts with restaurants and events in their area.",
    image: "/placeholder.svg",
    technologies: ["Flutter", "Firebase", "Google Maps API", "Stripe"],
    features: [
      "Social Dining Events",
      "Restaurant Discovery",
      "In-app Reservations",
      "Community Reviews",
    ],
    results: {
      metric1: { value: "100k+", label: "Active Users" },
      metric2: { value: "500+", label: "Partner Restaurants" },
      metric3: { value: "4.7★", label: "User Rating" },
    },
    timeline: "4 Months",
    year: "2024",
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: <Globe className="w-4 h-4" /> },
  { id: "web", label: "Web Development", icon: <Globe className="w-4 h-4" /> },
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "automation",
    label: "Automation",
    icon: <Zap className="w-4 h-4" />,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-card/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-cyan/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-green text-fixel-green mb-6"
            >
              Our Portfolio
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Digital Success{" "}
              <span className="bg-gradient-to-r from-fixel-green to-fixel-cyan bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Explore our latest projects and see how we've helped businesses
              transform their digital presence with cutting-edge solutions.
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>150+ Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>50+ Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-4"
            >
              Featured Work
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Most{" "}
              <span className="text-gradient-blue-purple">
                Impactful Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These projects showcase our ability to deliver exceptional results
              and create meaningful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.slice(0, 2).map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-300 border-border/50 hover:border-fixel-blue/30 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-fixel-blue/10 to-fixel-purple/10 flex items-center justify-center">
                  <div className="text-6xl text-fixel-blue/30">
                    {project.category === "web" && <Globe />}
                    {project.category === "mobile" && <Smartphone />}
                    {project.category === "design" && <Palette />}
                    {project.category === "automation" && <Zap />}
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
                      <h4 className="font-semibold mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-fixel-green rounded-full"></div>
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-fixel-blue hover:text-fixel-purple"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Explore All{" "}
              <span className="text-gradient-orange-pink">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Filter by category to see our work across different industries and
              technologies.
            </p>
          </div>

          {/* Category Filter */}
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-12"
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 bg-muted/50">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-fixel-blue data-[state=active]:text-white"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-fixel-blue/5 to-fixel-purple/5 flex items-center justify-center">
                  <div className="text-4xl text-fixel-blue/30">
                    {project.category === "web" && <Globe />}
                    {project.category === "mobile" && <Smartphone />}
                    {project.category === "design" && <Palette />}
                    {project.category === "automation" && <Zap />}
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.client}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-fixel-blue transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-fixel-blue/10 text-fixel-blue"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-fixel-blue hover:text-fixel-purple"
                    >
                      View
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4"
            >
              Technologies We Use
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Cutting-Edge{" "}
              <span className="text-gradient-blue-purple">Tech Stack</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the latest technologies and frameworks to build
              scalable, performant solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "React",
              "Vue.js",
              "Node.js",
              "Python",
              "React Native",
              "Flutter",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Firebase",
              "TypeScript",
              "Tailwind CSS",
            ].map((tech, index) => (
              <Card
                key={index}
                className="p-4 text-center hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <div className="w-12 h-12 rounded-xl bg-fixel-blue/10 flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-fixel-blue rounded"></div>
                </div>
                <div className="font-medium text-sm">{tech}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to create your{" "}
              <span className="text-gradient-green-cyan">success story?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help you achieve
              similar results with our proven expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fixel-green to-fixel-cyan hover:from-fixel-green/80 hover:to-fixel-cyan/80 text-background font-semibold text-lg px-8 py-6"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-semibold text-lg px-8 py-6"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
