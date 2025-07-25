import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ThumbsUp, MessageSquare, Zap, Beaker, Rocket, Brain, Code2 } from "lucide-react";
import { useState } from "react";

const ExperimentsSection = () => {
  const [open, setOpen] = useState(false);
  const experiments = [
    {
      title: "AI Voice Podcast Generator",
      description: "Upload any text and generate a full podcast episode with multiple AI voices discussing the content",
      icon: Zap,
      status: "Researching",
      votes: 23,
      category: "AI/Audio",
      difficulty: "Hard"
    },
    {
      title: "Automated Meeting Summaries",
      description: "Real-time transcription and intelligent summarization of team meetings with action items extraction",
      icon: Brain,
      status: "Prototyping",
      votes: 18,
      category: "Productivity",
      difficulty: "Medium"
    },
    {
      title: "Startup Idea Validator",
      description: "AI-powered market research tool that validates startup ideas using web scraping and sentiment analysis",
      icon: Rocket,
      status: "Planning",
      votes: 31,
      category: "Business",
      difficulty: "Hard"
    },
    {
      title: "Personal AI Assistant",
      description: "Context-aware AI that learns your preferences and automates daily tasks across multiple platforms",
      icon: Beaker,
      status: "Researching",
      votes: 45,
      category: "AI/Personal",
      difficulty: "Very Hard"
    },
    {
      title: "Code Review Bot",
      description: "AI agent that reviews GitHub pull requests and provides intelligent feedback on code quality",
      icon: Code2,
      status: "Building",
      votes: 12,
      category: "Development",
      difficulty: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Building":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Prototyping":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Researching":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-orange-400";
      case "Very Hard":
        return "text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section id="experiments" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-secondary">Experiments</span> & Ideas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A public digital notebook of startup brainstorms, tech experiments, and wild product concepts
            </p>
          </div>

          {/* Intro Card */}
          <Card className="mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 border border-border/50">
            <CardContent className="p-8 text-center">
              <Lightbulb className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Welcome to My Lab</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This is where ideas come to life. Vote on concepts you'd like to see built, 
                leave feedback, or just follow along as I experiment with the future of technology.
              </p>
              <Button
                variant="outline"
                className="mx-auto mt-4 px-8 py-3 text-lg border-primary/30 hover:bg-primary/10"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                {open ? "Hide Experiments" : "Show Experiments & Ideas"}
              </Button>
            </CardContent>
          </Card>

          {/* Collapsible Experiments Grid and CTA */}
          {open && (
            <>
              {/* Experiments Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {experiments.map((experiment, index) => (
                  <Card key={index} className="project-card group">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="bg-secondary/20 text-secondary w-12 h-12 rounded-lg flex items-center justify-center">
                          <experiment.icon size={24} />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(experiment.status)}>
                            {experiment.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={14} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{experiment.votes}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2 group-hover:text-secondary transition-colors">
                          {experiment.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground leading-relaxed">
                          {experiment.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Metadata */}
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline" className="bg-muted/30 border-border/50">
                          {experiment.category}
                        </Badge>
                        <span className={`font-medium ${getDifficultyColor(experiment.difficulty)}`}>
                          {experiment.difficulty}
                        </span>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/30"
                        >
                          <ThumbsUp size={14} className="mr-2" />
                          Vote
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-muted/20 border-border/50 hover:bg-muted/30"
                        >
                          <MessageSquare size={14} className="mr-2" />
                          Discuss
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Community CTA */}
              <div className="text-center space-y-6 p-8 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-border/50">
                <h3 className="text-2xl font-bold">Have Your Own Idea?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I'm always looking for interesting problems to solve and creative projects to collaborate on. 
                  Share your ideas or join me in building the future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-secondary text-lg px-8 py-6">
                    <Lightbulb className="mr-2" size={20} />
                    Submit an Idea
                  </Button>
                  <Button size="lg" variant="outline" className="border-border/50 text-lg px-8 py-6">
                    Collaborate with Me
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;