import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Send,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Heart,
} from "lucide-react";

const contactMethods = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp Chat",
    description: "Get instant responses to your questions",
    action: "Chat Now",
    href: "https://wa.me/1234567890?text=Hi%20Fixel%20Technologies,%20I%27d%20like%20to%20discuss%20a%20project.",
    color: "bg-green-600 hover:bg-green-700",
    available: "Online now",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Schedule a Call",
    description: "Book a free 30-minute consultation",
    action: "Book Call",
    href: "https://calendly.com/fixel-technologies/consultation",
    color: "bg-fixel-blue hover:bg-fixel-blue/80",
    available: "Available slots",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    description: "Send detailed project requirements",
    action: "Send Email",
    href: "mailto:hello@fixeltechnologies.com",
    color: "bg-fixel-purple hover:bg-fixel-purple/80",
    available: "24h response",
  },
];

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Process Automation",
  "E-commerce Solutions",
  "Custom Software",
  "Consulting",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $30,000",
  "$30,000 - $50,000",
  "$50,000+",
  "I'm not sure",
];

const timelines = [
  "ASAP",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring",
];

const officeLocations = [
  {
    name: "San Francisco HQ",
    address: "123 Tech Street, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Fri: 9 AM - 6 PM PST",
  },
  {
    name: "Remote Team",
    address: "Available worldwide",
    phone: "+1 (555) 123-4567",
    hours: "24/7 Support Available",
  },
];

const faqs = [
  {
    question: "How quickly can you start my project?",
    answer:
      "We typically start new projects within 1-2 weeks of contract signing.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer comprehensive maintenance and support packages.",
  },
  {
    question: "Can you work with my existing team?",
    answer: "Absolutely! We integrate seamlessly with your internal teams.",
  },
  {
    question: "What's your project success rate?",
    answer: "We maintain a 99% project success rate with on-time delivery.",
  },
];

export default function Contact() {
  const { toast } = useToast();
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-card/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fixel-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fixel-pink/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-orange text-fixel-orange mb-6"
            >
              Contact Us
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-fixel-orange to-fixel-pink bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Ready to transform your business with cutting-edge technology? Get
              in touch and let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-blue text-fixel-blue mb-4"
            >
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Choose Your{" "}
              <span className="text-gradient-blue-purple">
                Preferred Contact Method
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-fixel-blue/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-fixel-blue/10 flex items-center justify-center mx-auto mb-6 text-fixel-blue">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                <div className="text-sm text-fixel-green mb-6">
                  {method.available}
                </div>
                <Button
                  asChild
                  className={`w-full ${method.color} text-white font-medium`}
                >
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {method.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Send us a{" "}
                <span className="text-gradient-green-cyan">message</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24
                hours with a detailed proposal for your project.
              </p>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      className="mt-2"
                    />
                  </div>
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
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) =>
                        handleInputChange("budget", value)
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        handleInputChange("timeline", value)
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Let's{" "}
                  <span className="text-gradient-orange-pink">connect</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help you succeed. Reach out through any of these
                  channels and let's start building something amazing together.
                </p>
              </div>

              {/* Office Locations */}
              <div className="space-y-6">
                {officeLocations.map((location, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-bold text-lg mb-4">{location.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-fixel-blue" />
                        <span className="text-muted-foreground">
                          {location.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-fixel-green" />
                        <span className="text-muted-foreground">
                          {location.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-fixel-orange" />
                        <span className="text-muted-foreground">
                          {location.hours}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Why Choose Us */}
              <Card className="p-6 bg-gradient-to-br from-fixel-blue/5 to-fixel-purple/5">
                <h3 className="font-bold text-lg mb-4">Why Choose Fixel?</h3>
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-fixel-purple text-fixel-purple mb-4"
            >
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Got <span className="text-gradient-blue-purple">Questions?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here are answers to some common questions. Don't see what you're
              looking for? Feel free to ask!
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
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
              Ready to get{" "}
              <span className="text-gradient-green-cyan">started?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The first step towards your digital transformation is just a
              message away. Let's make it happen!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-6"
              >
                <a
                  href="https://wa.me/1234567890?text=Hi%20Fixel%20Technologies,%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-fixel-blue text-fixel-blue hover:bg-fixel-blue hover:text-white font-semibold text-lg px-8 py-6"
              >
                <a
                  href="https://calendly.com/fixel-technologies/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule Free Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
