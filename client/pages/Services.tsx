import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Smartphone,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle,
  Globe,
  Database,
  Cloud,
  Shield,
  Users,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: <Code className="w-12 h-12" />,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks and technologies.",
    features: [
      "React, Vue, Angular applications",
      "Node.js, Python, PHP backends",
      "Progressive Web Apps (PWA)",
      "E-commerce platforms",
      "Custom CMS solutions",
      "API development & integration",
    ],
    color: "fixel-blue",
    price: "Starting at $5,000",
  },
  {
    icon: <Smartphone className="w-12 h-12" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "React Native development",
      "Native iOS (Swift) & Android (Kotlin)",
      "Flutter applications",
      "App Store optimization",
      "Push notifications",
      "Offline functionality",
    ],
    color: "fixel-purple",
    price: "Starting at $8,000",
  },
  {
    icon: <Palette className="w-12 h-12" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that enhance user experience and drive conversions.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design & branding",
      "Usability testing",
      "Design systems",
      "Responsive design",
    ],
    color: "fixel-cyan",
    price: "Starting at $3,000",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Process Automation",
    description:
      "Streamline operations with intelligent automation and workflow solutions.",
    features: [
      "Business process automation",
      "API integrations",
      "Workflow optimization",
      "Data migration",
      "Custom dashboards",
      "Reporting & analytics",
    ],
    color: "fixel-orange",
    price: "Starting at $4,000",
  },
];

const additionalServices = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Solutions",
    description: "AWS, Azure, Google Cloud deployment and management",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Security Audits",
    description: "Comprehensive security assessment and recommendations",
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Database Design",
    description: "Scalable database architecture and optimization",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "SEO Optimization",
    description: "Technical SEO and performance optimization",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-6"
            >
              Our Services
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                Tech Solutions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept to deployment, we provide end-to-end technology
              services that scale with your business needs and drive digital
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-fixel-green flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white group/btn">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Additional{" "}
              <span className="bg-gradient-to-r from-fixel-green to-fixel-cyan bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond our core services, we offer specialized solutions to
              address your unique business challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <div className="w-16 h-16 rounded-xl bg-fixel-blue/10 flex items-center justify-center mx-auto mb-4 text-fixel-blue">
                  {service.icon}
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery,
              from initial consultation to ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "We analyze your requirements, define project scope, and create a detailed roadmap.",
                icon: <Users className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "Design & Development",
                description:
                  "Our team brings your vision to life with cutting-edge design and development.",
                icon: <Code className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Launch & Support",
                description:
                  "We deploy your solution and provide ongoing maintenance and optimization.",
                icon: <Rocket className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fixel-blue to-fixel-purple flex items-center justify-center mx-auto mb-6 text-white">
                  {step.icon}
                </div>
                <div className="text-fixel-blue font-bold text-xl mb-2">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to start your{" "}
              <span className="bg-gradient-to-r from-fixel-blue to-fixel-purple bg-clip-text text-transparent">
                project?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your requirements and create a custom solution that
              fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white font-semibold"
              >
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
