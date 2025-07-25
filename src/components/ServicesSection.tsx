import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, BarChart3, Rocket, Users, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

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

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("id, content, created_at")
        .order("created_at", { ascending: false });
      if (!error) setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, []);

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
                  // Refetch notes
                  const { data } = await supabase
                    .from("notes")
                    .select("id, content, created_at")
                    .order("created_at", { ascending: false });
                  setNotes(data || []);
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
            {/* Display all notes */}
            <div className="mt-8">
              <h5 className="font-semibold mb-2 text-center">Recent Notes</h5>
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : notes.length === 0 ? (
                <div className="text-center text-muted-foreground">No notes yet. Be the first!</div>
              ) : (
                <ul className="space-y-3">
                  {notes.map((n) => (
                    <li key={n.id} className="bg-muted/30 border border-border/30 rounded-lg px-4 py-3 text-base text-muted-foreground">
                      <span className="block mb-1">{n.content}</span>
                      <span className="block text-xs text-muted-foreground/70">{new Date(n.created_at).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;