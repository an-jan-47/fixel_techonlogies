import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Quote,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  ThumbsUp,
  Building,
  Briefcase,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  {
    id: 4,
    name: "David Park",
    role: "Design Director",
    company: "DesignPro Agency",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The design system they created for us has revolutionized our workflow. Brand consistency across all our projects improved by 95%, and our design process is now 80% faster. Incredible attention to detail!",
    project: "CreativeSpace Design System",
    category: "UI/UX Design",
    featured: true,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Sales Director",
    company: "SalesForce Pro",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The CRM automation system has completely transformed our sales process. Lead conversion increased by 40% and our reporting is now 5x faster. The team at Fixel truly understands business needs.",
    project: "AutomateFlow CRM",
    category: "Process Automation",
    featured: false,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Product Manager",
    company: "Culinary Connect",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "From concept to launch, Fixel guided us through every step. The social dining app they built has 100k+ active users and 500+ restaurant partners. Their technical expertise is unmatched!",
    project: "FoodieApp Mobile Platform",
    category: "Mobile Development",
    featured: false,
  },
  {
    id: 7,
    name: "Rachel Adams",
    role: "Marketing Director",
    company: "TechStartup Inc.",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The website redesign exceeded all our expectations. Not only does it look amazing, but our conversion rate increased by 250% and bounce rate decreased by 40%. The team is highly professional and responsive.",
    project: "Website Redesign",
    category: "Web Development",
    featured: false,
  },
  {
    id: 8,
    name: "Alex Kumar",
    role: "Operations Manager",
    company: "LogisticsPro",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The process automation solutions they implemented have streamlined our entire workflow. We're now processing 3x more orders with the same team size. Fixel truly delivers on their promises!",
    project: "Logistics Automation",
    category: "Process Automation",
    featured: false,
  },
];

const stats = [
  {
    icon: <Star className="w-6 h-6" />,
    value: "4.9/5",
    label: "Average Rating",
    color: "fixel-orange",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "50+",
    label: "Happy Clients",
    color: "fixel-blue",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "99%",
    label: "Project Success Rate",
    color: "fixel-green",
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    value: "100%",
    label: "Would Recommend",
    color: "fixel-purple",
  },
];

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Process Automation",
  "E-commerce",
];

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const filteredTestimonials =
    selectedCategory === "All"
      ? testimonials
      : testimonials.filter((testimonial) =>
          testimonial.category.includes(selectedCategory),
        );

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-card/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-pink text-fixel-pink mb-6"
            >
              Client Reviews
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-fixel-pink to-fixel-orange bg-clip-text text-transparent">
                Clients Say
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Don't just take our word for it. Hear from the businesses we've
              helped transform their digital presence and achieve remarkable
              results.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center mx-auto mb-3 text-${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold mb-1">
                    {stat.value}
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

      {/* Featured Testimonial Carousel */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-4"
            >
              Featured Reviews
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Success Stories That{" "}
              <span className="text-gradient-blue-purple">Inspire Us</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
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

            {/* Navigation */}
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

      {/* All Reviews */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              All Client{" "}
              <span className="text-gradient-green-cyan">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Filter reviews by project category to see feedback across
              different services.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-fixel-blue hover:bg-fixel-blue/80"
                    : "hover:bg-fixel-blue/10 hover:text-fixel-blue"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-fixel-blue text-white">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-fixel-blue">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-fixel-orange text-fixel-orange"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs bg-fixel-blue/10 text-fixel-blue"
                    >
                      {testimonial.project}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4"
            >
              Trusted By
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Companies That{" "}
              <span className="text-gradient-blue-purple">Trust Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "GreenLife Co.",
              "WellnessTech",
              "Capital Insights",
              "DesignPro",
              "SalesForce Pro",
              "Culinary Connect",
              "TechStartup Inc.",
              "LogisticsPro",
              "InnovateNow",
              "DataDriven Co.",
              "CloudFirst",
              "ScaleUp Ltd.",
            ].map((company, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <div className="w-12 h-12 rounded-xl bg-fixel-blue/10 flex items-center justify-center mx-auto mb-3">
                  <Building className="w-6 h-6 text-fixel-blue" />
                </div>
                <div className="font-medium text-sm">{company}</div>
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
              Ready to join our{" "}
              <span className="text-gradient-pink-orange">
                success stories?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create an exceptional digital experience for your business
              and add your success story to our collection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fixel-pink to-fixel-orange hover:from-fixel-pink/80 hover:to-fixel-orange/80 text-white font-semibold text-lg px-8 py-6"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-semibold text-lg px-8 py-6"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
