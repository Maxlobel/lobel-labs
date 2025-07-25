import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, BarChart3, Rocket, Users, ArrowRight, CheckCircle } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "AI-Powered Automations",
      description: "Transform your business processes with intelligent automation using Make.com, GPT, and custom AI agents",
      icon: Bot,
      features: [
        "Workflow automation design",
        "AI agent development",
        "Integration with existing systems",
        "Performance monitoring & optimization"
      ],
      color: "primary"
    },
    {
      title: "Dashboard Building & Data Consulting",
      description: "Turn your data into actionable insights with custom dashboards and comprehensive analytics",
      icon: BarChart3,
      features: [
        "Custom dashboard development",
        "Data pipeline optimization",
        "SQL query optimization",
        "Business intelligence strategy"
      ],
      color: "secondary"
    },
    {
      title: "Startup Launch Support",
      description: "End-to-end support for launching your startup, from strategy to MVP development",
      icon: Rocket,
      features: [
        "MVP development & validation",
        "Tech stack consultation",
        "Go-to-market strategy",
        "Fundraising preparation"
      ],
      color: "primary"
    }
  ];

  const testimonials = [
    {
      quote: "Max's automation solutions saved us 20+ hours per week. The ROI was immediate.",
      author: "Sarah Chen",
      role: "Operations Director",
      company: "TechStart Inc."
    },
    {
      quote: "The dashboard Max built transformed how we understand our data. Game-changer.",
      author: "Michael Rodriguez",
      role: "CEO",
      company: "DataFlow Solutions"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Services</span> & Consulting
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your ideas into reality with AI automation, data insights, and startup expertise
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="project-card h-full">
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    service.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                  }`}>
                    <service.icon size={24} />
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing - removed */}
                  <div className="pt-4 border-t border-border/50">
                    <Button className="w-full btn-hero">
                      Get Started
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-8 mb-12">
            <h3 className="text-2xl font-bold text-center">
              What <span className="text-gradient-secondary">Clients</span> Say
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardContent className="p-6">
                    <blockquote className="text-foreground/90 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;