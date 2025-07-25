import { Mail, Linkedin, Github, Instagram, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:max@example.com", label: "Email" }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Experiments", href: "#experiments" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-gradient-primary">Max Lobel</h3>
            <p className="text-muted-foreground max-w-md">
              Building the future with AI, data, and creative firepower. 
              Let's create something amazing together.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 bg-muted/30 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 hover:text-primary"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Join My Inner Circle</h4>
            <p className="text-sm text-muted-foreground">
              Get exclusive updates on experiments, startup ideas, and AI insights.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="your@email.com" 
                className="bg-muted/30 border-border/50"
              />
              <Button className="w-full btn-secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Max Lobel. Built with React, Tailwind, and ⚡
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Calendar size={14} className="mr-2" />
              Book a Call
            </Button>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;