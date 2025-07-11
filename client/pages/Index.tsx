import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
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
} from "lucide-react";

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies.",
    color: "fixel-blue",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    color: "fixel-purple",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that convert visitors into customers.",
    color: "fixel-cyan",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Process Automation",
    description:
      "Streamline your business operations with intelligent automation solutions.",
    color: "fixel-orange",
  },
];

const stats = [
  { number: "150+", label: "Projects Delivered" },
  { number: "50+", label: "Happy Clients" },
  { number: "99%", label: "Success Rate" },
  { number: "24/7", label: "Support" },
];

const benefits = [
  {
    icon: <Rocket className="w-5 h-5" />,
    text: "Fast deployment and delivery",
  },
  { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
  { icon: <Clock className="w-5 h-5" />, text: "On-time project completion" },
  { icon: <Globe className="w-5 h-5" />, text: "Scalable global solutions" },
];

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-purple/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-fixel-blue/10 border border-fixel-blue/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <div className="w-2 h-2 bg-fixel-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-fixel-blue">
                Tech that moves faster than your ideas
              </span>
            </div>

            {/* Main Headline */}
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

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              We're{" "}
              <span className="text-fixel-blue font-semibold">
                Fixel Technologies
              </span>{" "}
              — a cutting-edge tech company delivering digital transformation
              for startups, agencies, and enterprise clients worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-fixel-blue/25 transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Call
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-fixel-cyan text-fixel-cyan hover:bg-fixel-cyan hover:text-background font-semibold text-lg px-8 py-6 group"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Request Quote
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
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
      <section className="py-20 lg:py-32 bg-card/50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-fixel-blue/10 transition-all duration-300 border-border/50 hover:border-fixel-blue/30 bg-card hover:bg-card/80"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${service.color}/20 to-${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-${service.color}`}>
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-fixel-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-fixel-blue hover:text-fixel-purple font-medium group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge
                  variant="outline"
                  className="border-fixel-green text-fixel-green mb-4"
                >
                  Why Choose Fixel
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Confident. Creative.{" "}
                  <span className="bg-gradient-to-r from-fixel-green to-fixel-cyan bg-clip-text text-transparent">
                    Solution-focused.
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  We don't just build software — we craft digital experiences
                  that transform businesses and delight users. Our team combines
                  technical expertise with creative vision to deliver results
                  that exceed expectations.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-fixel-green/20 flex items-center justify-center text-fixel-green">
                        {benefit.icon}
                      </div>
                      <span className="text-foreground font-medium">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fixel-green to-fixel-cyan hover:from-fixel-green/80 hover:to-fixel-cyan/80 text-background font-semibold"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-fixel-blue/10 to-fixel-purple/10 border-fixel-blue/20">
                    <CardContent className="p-6 text-center">
                      <Users className="w-12 h-12 text-fixel-blue mx-auto mb-4" />
                      <div className="text-2xl font-bold text-fixel-blue mb-2">
                        50+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expert Developers
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-fixel-green/10 to-fixel-cyan/10 border-fixel-green/20 mt-8">
                    <CardContent className="p-6 text-center">
                      <Star className="w-12 h-12 text-fixel-green mx-auto mb-4" />
                      <div className="text-2xl font-bold text-fixel-green mb-2">
                        4.9★
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Client Rating
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-fixel-orange/20 to-fixel-pink/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to transform your{" "}
              <span className="bg-gradient-to-r from-fixel-pink to-fixel-orange bg-clip-text text-transparent">
                digital presence?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how Fixel Technologies can
              accelerate your business growth with cutting-edge solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fixel-pink to-fixel-orange hover:from-fixel-pink/80 hover:to-fixel-orange/80 text-white font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-fixel-pink/25 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-semibold text-lg px-8 py-6"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
