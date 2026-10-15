import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, BarChart3, Rocket, MessageCircle, Compass, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

import ConsultingIntake, { type IntakePath } from "@/components/ConsultingIntake";

const ServicesSection = () => {
  const [intake, setIntake] = useState<{ path: IntakePath; service?: string } | null>(null);
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

  const [note, setNote] = useState("");

  // Log site action utility
  const logSiteAction = async (action_type, details) => {
    await supabase.from("site_actions").insert([{ action_type, details }]);
  };

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
              Practical help with AI, technology, and the way you work. We’ll start with your goals and figure out what would actually help.
            </p>
          </div>

          <div className="mb-14 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-secondary/5">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:p-10">
              <div className="flex flex-col justify-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Start with a conversation</p>
                <h3 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">You don’t need to have it all figured out.</h3>
                <p className="leading-relaxed text-muted-foreground">Whether you’re curious about AI, looking to improve how your business runs, or ready to bring an idea to life, I’ll help you find a practical next step.</p>
              </div>
              <div className="grid gap-3">
                <button type="button" onClick={() => setIntake({ path: "explore" })} className="group flex items-start gap-4 rounded-xl border border-primary/30 bg-background/50 p-5 text-left transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Compass className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 flex-1"><span className="block font-semibold">Help me figure out where to start</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">A few guided questions about you and what could work better.</span></span>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setIntake({ path: "project" })} className="group flex items-start gap-4 rounded-xl border border-border bg-background/50 p-5 text-left transition-colors hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                  <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                  <span className="min-w-0 flex-1"><span className="block font-semibold">I have something specific in mind</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">Tell me about your idea, challenge, or project.</span></span>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                </button>
                <p className="px-1 pt-1 text-sm text-muted-foreground">Prefer to talk it through? <a href="https://calendly.com/maxlobel" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Book a conversation</a>.</p>
              </div>
            </div>
            <div className="grid gap-6 border-t border-border/70 bg-background/30 p-6 sm:grid-cols-3 sm:p-8">
              {[
                { number: "01", title: "Understand", copy: "We talk about your goals, how things work today, and where you’re getting stuck." },
                { number: "02", title: "Find the right fit", copy: "I recommend a focused next step, with clear scope and pricing before any work begins." },
                { number: "03", title: "Build & learn", copy: "If we decide to work together, I help put the solution in place and show you how to use it." },
              ].map(item => <div key={item.number}><p className="mb-2 text-xs font-semibold tracking-wider text-primary">{item.number}</p><h4 className="mb-2 font-semibold">{item.title}</h4><p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p></div>)}
            </div>
          </div>
          <h3 className="mb-6 text-2xl font-bold">Ways I can help</h3>

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
                    <Button 
                      className="w-full btn-hero"
                      onClick={() => setIntake({ path: "project", service: service.title })}
                    >
                      Tell me what you have in mind
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
              What <span className="text-gradient-secondary">Clients</span> and Coworkers Say
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

            {/* Leave a Note Section */}
            <div className="mt-8 max-w-xs mx-auto bg-card/40 backdrop-blur-sm border border-border/30 rounded-lg p-2">
              <h4 className="text-base font-semibold mb-1 text-center">Leave a Note About Max</h4>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  if (!note.trim()) {
                    toast.error("Please enter a note before submitting.");
                    return;
                  }
                  // Insert note into Supabase
                  const { error } = await supabase.from("notes").insert([{ content: note }]);
                  if (error) {
                    toast.error("Failed to submit note. Please try again.");
                    return;
                  }
                  // Log the action
                  logSiteAction("note_submitted", { content: note });
                  toast.success("Thank you for your note!");
                  setNote("");
                }}
                className="space-y-1"
              >
                <textarea
                  className="w-full rounded border border-border/30 bg-muted/10 p-1 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={1}
                  placeholder="Quick note..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
                <Button type="submit" className="w-full btn-hero text-xs py-1">
                  Submit
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
      {intake && <ConsultingIntake path={intake.path} service={intake.service} onClose={() => setIntake(null)} />}
    </section>
  );
};

export default ServicesSection;