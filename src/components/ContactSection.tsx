import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Send, Users, Briefcase, Heart, DollarSign, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [showMeetupOptions, setShowMeetupOptions] = useState(false);

  const categories = [
    { value: "recruiter", label: "Recruiter", icon: Briefcase, color: "bg-blue-500/20 text-blue-400" },
    { value: "client", label: "Client", icon: DollarSign, color: "bg-green-500/20 text-green-400" },
    { value: "collaborator", label: "Collaborator", icon: Users, color: "bg-purple-500/20 text-purple-400" },
    { value: "friend", label: "Just Saying Hi", icon: Heart, color: "bg-pink-500/20 text-pink-400" }
  ];

  const quickLinks = [
    { label: "Schedule a Call", icon: Calendar, href: "https://calendly.com/maxlobel", primary: true },
    { label: "Email Me", icon: Mail, href: "mailto:maxlobel1@gmail.com" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/maxlobel" },
    { label: "Boston Meetup", icon: MapPin, href: "boston-meetup", isSpecial: true }
  ];

  // Log site action utility
  const logSiteAction = async (action_type, details) => {
    await supabase.from("site_actions").insert([{ action_type, details }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Store in Supabase
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
      },
    ]);
    if (error) {
      toast.error("Failed to submit. Please try again.");
      return;
    }
    // Log the action
    logSiteAction("contact_form", { ...formData });
    
    toast.success("Message sent! I'll get back to you within 24 hours.");
    
    // Reset form
    setFormData({ name: "", email: "", category: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMeetupSelection = async (choice: string) => {
    setShowMeetupOptions(false);
    
    // Log the meetup selection to Supabase
    const meetupData = {
      meetup_type: choice,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    };
    
    try {
      // Store in Supabase - this will notify you
      await supabase.from("meetup_requests").insert([meetupData]);
      
      // Also log as a site action
      await logSiteAction("meetup_request", meetupData);
      
      if (choice === 'coffee') {
        toast.success(`Coffee meetup selected! I'll reach out to schedule.`);
        // window.open('https://calendly.com/maxlobel/coffee-chat', '_blank', 'noopener,noreferrer');
      } else if (choice === 'beer') {
        toast.success(`Beer meetup selected! I'll reach out to schedule.`);
        // window.open('https://calendly.com/maxlobel/beer-meetup', '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error logging meetup request:', error);
      // Still show success message to user
      toast.success(`${choice === 'coffee' ? 'Coffee' : 'Beer'} meetup selected! I'll reach out to schedule.`);
    }
  };

  // Fun Fact logic
  const funFacts = [
    "I built my first AI project before graduating college.",
    "I’ve automated over 1,000 hours of manual work for clients.",
    "I’m a published data storyteller and dashboard designer.",
    "I’ve worked with Fortune 500 companies and fast-growing startups.",
    "I’m passionate about using AI to solve real business problems.",
    "I’ve led analytics projects in healthcare, SaaS, and marketing.",
    "I love teaching teams how to use data for smarter decisions.",
    "I’ve built and launched 10+ side projects in the last 2 years.",
    "I’m a certified Google Analytics and Tableau professional.",
    "I’ve mentored junior analysts and engineers to career growth."
  ];
  const [funFact, setFunFact] = useState(funFacts[0]);
  const regenerateFact = () => {
    let newFact;
    do {
      newFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    } while (newFact === funFact && funFacts.length > 1);
    setFunFact(newFact);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to build something amazing together? Drop me a line and let's chat about your next big idea.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.isSpecial ? '#' : link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`rounded-lg border bg-card text-card-foreground shadow-sm text-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg block ${link.primary ? 'border-primary/30 bg-primary/5' : ''}`}
                onClick={(e) => {
                  console.log(`Clicked: ${link.label} - ${link.href}`);
                  if (link.isSpecial && link.href === 'boston-meetup') {
                    e.preventDefault();
                    setShowMeetupOptions(true);
                  }
                }}
                style={{ userSelect: 'none', textDecoration: 'none' }}
              >
                <div className="p-6">
                  <link.icon className={`w-8 h-8 mx-auto mb-3 ${link.primary ? 'text-primary' : 'text-secondary'}`} />
                  <p className={`font-medium ${link.primary ? 'text-primary' : 'text-foreground'}`}>
                    {link.label}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Boston Meetup Options Modal */}
          {showMeetupOptions && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 border border-border/50">
                <h3 className="text-2xl font-bold mb-4 text-center">Boston Meetup</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Let's grab a drink! What's your preference?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleMeetupSelection('coffee')}
                    className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    ☕ Coffee
                  </button>
                  <button
                    onClick={() => handleMeetupSelection('beer')}
                    className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    🍺 Beer
                  </button>
                </div>
                <button
                  onClick={() => setShowMeetupOptions(false)}
                  className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  I'll get back to you within 24 hours. Choose a category to help me prioritize your message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-muted/30 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-muted/30 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">I'm a...</label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-muted/30 border-border/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <category.icon size={16} />
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea
                      placeholder="Tell me about your project, question, or just say hello..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-muted/30 border-border/50 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-hero text-lg py-6">
                    <Send className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Social */}
            <div className="space-y-6">
              {/* Location & Availability */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Currently</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-foreground">Based in Boston, MA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={16} className="text-secondary" />
                    <span className="text-foreground">Available for consulting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-primary" />
                    <span className="text-foreground">Open to collaborations</span>
                  </div>
                </CardContent>
              </Card>

              {/* Fun Fact */}
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">Fun Fact</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {funFact}
                  </p>
                  <Button size="sm" variant="outline" className="mx-auto" onClick={regenerateFact}>
                    Regenerate Fact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;