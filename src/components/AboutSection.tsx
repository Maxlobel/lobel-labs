import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Lightbulb, Code, Database, Brain } from "lucide-react";
import { useState } from "react";

const AboutSection = () => {
  const tools = [
    "SQL", "Python", "GPT", "Make.com", "Tailwind", "GitHub", 
    "Foundry", "BigQuery", "React", "TypeScript", "Automation"
  ];

  const interests = [
    { icon: Building, label: "Startups", color: "text-primary" },
    { icon: Code, label: "AI Automation", color: "text-secondary" },
    { icon: Database, label: "Data Analysis", color: "text-primary" },
    { icon: Brain, label: "Philosophy", color: "text-secondary" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient-primary">Max</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Data analyst, AI builder, and entrepreneur with a passion for automation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-border/50">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Professional Photo</p>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg -z-10"></div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Building size={20} />
                  <span className="font-semibold">Data Analyst @ CVS Health</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>Boston, MA</span>
                </div>
              </div>

              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  I'm a data analyst at <span className="text-primary font-semibold">CVS Health</span> where I specialize in 
                  automation, data insights, and AI-powered solutions. When I'm not crunching numbers, 
                  I'm building AI agents, experimenting with startup ideas, and exploring the intersection 
                  of technology and creativity.
                </p>
                
                <p>
                  My mission is simple: <span className="text-secondary font-semibold">help people and businesses unlock 
                  the power of AI and automation</span>. Whether it's streamlining business processes, 
                  building data dashboards, or creating AI-powered tools, I love turning complex problems 
                  into elegant solutions.
                </p>

                <p>
                  Outside of work, you'll find me rating omakase experiences, diving into philosophy, 
                  crafting creative stories, or brainstorming the next big startup idea over sushi.
                </p>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Interests & Specialties</h4>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <interest.icon size={16} className={interest.color} />
                      <span className="text-sm text-muted-foreground">{interest.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

// ToolsGrid Section
export const ToolsTechnologiesSection = () => (
  <section className="py-16 bg-gradient-to-b from-background/80 to-background">
    <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Technical Stack & Tools
      </h2>
      {/* Key Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10 justify-items-center">
        {/* Use emoji or generic icons for now, swap for SVGs later */}
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">🐍</span>
          <span className="text-lg font-medium">Python</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">🟦</span>
          <span className="text-lg font-medium">SQL</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">🧠</span>
          <span className="text-lg font-medium">GPT-4</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">⚡</span>
          <span className="text-lg font-medium">Supabase</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">☁️</span>
          <span className="text-lg font-medium">Vercel</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">📊</span>
          <span className="text-lg font-medium">Tableau</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">⚛️</span>
          <span className="text-lg font-medium">React</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2">🎨</span>
          <span className="text-lg font-medium">Tailwind</span>
        </div>
      </div>
      {/* Categorized List of All Tools */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">Data & Analytics</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">SQL</span>
            <span className="badge">BigQuery</span>
            <span className="badge">Snowflake</span>
            <span className="badge">Tableau</span>
            <span className="badge">Power BI</span>
            <span className="badge">Domo</span>
            <span className="badge">Excel</span>
            <span className="badge">Google Sheets</span>
            <span className="badge">Pandas</span>
            <span className="badge">NumPy</span>
            <span className="badge">Jupyter</span>
            <span className="badge">scikit-learn</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">AI & Automation</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">OpenAI API</span>
            <span className="badge">GPT-4</span>
            <span className="badge">Claude</span>
            <span className="badge">Make.com</span>
            <span className="badge">Zapier</span>
            <span className="badge">n8n</span>
            <span className="badge">LangChain</span>
            <span className="badge">LlamaIndex</span>
            <span className="badge">Pinecone</span>
            <span className="badge">Hugging Face</span>
            <span className="badge">Automation</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">Web & App Dev</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">JavaScript</span>
            <span className="badge">HTML</span>
            <span className="badge">CSS</span>
            <span className="badge">React</span>
            <span className="badge">TypeScript</span>
            <span className="badge">Tailwind CSS</span>
            <span className="badge">Vercel</span>
            <span className="badge">Netlify</span>
            <span className="badge">Replit</span>
            <span className="badge">Render</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">Cloud & Data Platforms</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">Supabase</span>
            <span className="badge">Palantir Foundry</span>
            <span className="badge">AWS</span>
            <span className="badge">Firebase</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">Dev & Productivity Tools</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">Git</span>
            <span className="badge">GitHub</span>
            <span className="badge">VSCode</span>
            <span className="badge">JupyterLab</span>
            <span className="badge">Docker</span>
            <span className="badge">Postman</span>
            <span className="badge">Swagger</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">Bonus Skills</h3>
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span className="badge">Salesforce</span>
            <span className="badge">CRM</span>
            <span className="badge">SEO</span>
            <span className="badge">Google Analytics</span>
            <span className="badge">Tag Manager</span>
            <span className="badge">Search Console</span>
            <span className="badge">PowerShell</span>
            <span className="badge">Bash</span>
            <span className="badge">Chatbot Dev</span>
            <span className="badge">Telegram Bots</span>
            <span className="badge">Slack Integrations</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);