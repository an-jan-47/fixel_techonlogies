import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Lightbulb,
  Rocket,
  Heart,
  Shield,
  Zap,
  Globe,
  Award,
  Clock,
  Coffee,
  Code2,
  Palette,
  Smartphone,
  ArrowRight,
} from "lucide-react";

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

const team = [
  {
    name: "Alex Rodriguez",
    role: "Founder & CEO",
    specialty: "Full-Stack Architecture",
    image: "/placeholder.svg",
    experience: "8+ Years",
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    specialty: "UI/UX Design",
    image: "/placeholder.svg",
    experience: "6+ Years",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    specialty: "Frontend & Mobile",
    image: "/placeholder.svg",
    experience: "7+ Years",
  },
  {
    name: "Elena Petrov",
    role: "DevOps Engineer",
    specialty: "Cloud & Infrastructure",
    image: "/placeholder.svg",
    experience: "5+ Years",
  },
];

const stats = [
  {
    icon: <Code2 className="w-6 h-6" />,
    number: "150+",
    label: "Projects Completed",
  },
  {
    icon: <Users className="w-6 h-6" />,
    number: "50+",
    label: "Happy Clients",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    number: "15+",
    label: "Countries Served",
  },
  { icon: <Award className="w-6 h-6" />, number: "99%", label: "Success Rate" },
];

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Founded with a vision to democratize cutting-edge technology for businesses of all sizes.",
  },
  {
    year: "2020",
    title: "Rapid Growth",
    description:
      "Expanded our team and delivered 25+ successful projects across various industries.",
  },
  {
    year: "2022",
    title: "Global Reach",
    description:
      "Established partnerships worldwide and introduced our process automation solutions.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description:
      "Launched AI-powered development tools and became a recognized leader in digital transformation.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-card/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-purple/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-6"
            >
              About Fixel Technologies
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Crafting Digital{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Excellence
              </span>{" "}
              Since 2019
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're a passionate team of developers, designers, and innovators
              who believe technology should empower businesses to achieve their
              wildest ambitions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge
                  variant="outline"
                  className="border-fixel-green text-fixel-green mb-4"
                >
                  Our Story
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  From Startup Dream to{" "}
                  <span className="text-gradient-green-cyan">Tech Reality</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Fixel Technologies was born from a simple observation: too
                    many great business ideas were being held back by complex,
                    expensive, and inaccessible technology solutions.
                  </p>
                  <p>
                    Our founders, coming from backgrounds in enterprise software
                    and startup ecosystems, saw an opportunity to bridge this
                    gap. We set out to create a company that could deliver
                    enterprise-grade solutions with startup agility and
                    accessibility.
                  </p>
                  <p>
                    Today, we're proud to have helped over 50 companies
                    transform their digital presence, streamline their
                    operations, and scale their businesses through technology
                    that actually works.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-fixel-green to-fixel-cyan hover:from-fixel-green/80 hover:to-fixel-cyan/80 text-background font-semibold"
                    >
                      Join Our Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-fixel-blue/10 flex items-center justify-center text-fixel-blue">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-fixel-blue">
                          {stat.number}
                        </div>
                        <div className="text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4"
            >
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              What Drives{" "}
              <span className="text-gradient-blue-purple">
                Everything We Do
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values aren't just words on a wall – they guide every
              decision, every line of code, and every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Timeline */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-orange text-fixel-orange mb-4"
            >
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Milestones That{" "}
              <span className="text-gradient-orange-pink">Define Us</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-fixel-blue to-fixel-purple flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-cyan text-fixel-cyan mb-4"
            >
              Meet The Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              The Minds Behind{" "}
              <span className="text-gradient-green-cyan">The Magic</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A diverse team of experts united by a passion for creating
              exceptional digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fixel-blue/20 to-fixel-purple/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-fixel-blue" />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-fixel-blue font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {member.specialty}
                </p>
                <Badge variant="outline" className="text-xs">
                  {member.experience}
                </Badge>
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
              Ready to work with a team that{" "}
              <span className="text-gradient-blue-purple">gets it?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise and passion can help transform
              your business ideas into digital reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white font-semibold text-lg px-8 py-6"
                >
                  <Coffee className="w-5 h-5 mr-3" />
                  Let's Grab Coffee (Virtually)
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-semibold text-lg px-8 py-6"
                >
                  View Our Work
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
