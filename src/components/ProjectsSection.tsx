import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Bot, Film, Calculator, Settings, Utensils } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI Job Agent",
      description: "Automated job application system that intelligently matches and applies to relevant positions",
      icon: Bot,
      tags: ["AI", "Automation", "Python", "Make.com"],
      status: "Active",
      color: "primary"
    },
    {
      title: "Telegram-to-Short Film AI",
      description: "Transform simple prompts into complete scripts and scenes automatically",
      icon: Film,
      tags: ["GPT", "Content Creation", "Automation"],
      status: "Beta",
      color: "secondary"
    },
    {
      title: "Fantasy Football Tracker",
      description: "Google Sheets integration with win percentage calculator and advanced analytics",
      icon: Calculator,
      tags: ["Google Sheets", "Analytics", "Sports"],
      status: "Complete",
      color: "primary"
    },
    {
      title: "Reconciliation Automation",
      description: "Streamlined data reconciliation tool for enterprise financial processes",
      icon: Settings,
      tags: ["Enterprise", "Data", "CVS Health"],
      status: "Production",
      color: "secondary"
    },
    {
      title: "Sushi Experience Tracker",
      description: "Physical + digital omakase rating system with location and experience tracking",
      icon: Utensils,
      tags: ["Lifestyle", "Database", "Personal"],
      status: "In Progress",
      color: "primary"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Production":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Beta":
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Complete":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient-secondary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of AI-powered tools, automation systems, and creative experiments
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="project-card h-full group">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      project.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                    }`}>
                      <project.icon size={24} />
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline" 
                        className="text-xs bg-muted/50 border-border/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-muted/20 border-border/50 hover:bg-muted/30"
                    >
                      <Github size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Projects */}
          <div className="text-center mt-12">
            <Button className="btn-hero text-lg px-8 py-6">
              View All Projects on GitHub
              <ExternalLink className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;