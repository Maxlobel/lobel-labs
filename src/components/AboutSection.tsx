import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Lightbulb, Code, Database, Brain } from "lucide-react";

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

// Tools & Technologies Section
export const ToolsTechnologiesSection = () => (
  <section className="py-16 bg-gradient-to-b from-background/80 to-background">
    <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Tools & Technologies
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Core Data & Analytics Tools */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">⚙️ Core Data & Analytics</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>SQL (PostgreSQL, MySQL, BigQuery, Snowflake)</li>
            <li>Python (Pandas, NumPy, Jupyter, scikit-learn, Flask)</li>
            <li>Tableau / Power BI / Domo</li>
            <li>Excel / Google Sheets (Advanced functions, VBA, macros)</li>
          </ul>
        </div>
        {/* AI & Automation */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">🧠 AI & Automation</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>OpenAI API / GPT-4 / Claude</li>
            <li>Make.com / Zapier / n8n (no-code automation)</li>
            <li>LangChain / LlamaIndex / Pinecone (for LLM agents)</li>
            <li>Hugging Face Transformers</li>
          </ul>
        </div>
        {/* Engineering & Dev Tools */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">🛠️ Engineering & Dev Tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Git / GitHub</li>
            <li>VSCode / JupyterLab</li>
            <li>Docker</li>
            <li>REST API design & testing (Postman, Swagger)</li>
          </ul>
        </div>
        {/* Web & App Dev */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">🖥️ Web & App Dev</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>JavaScript / HTML / CSS / React</li>
            <li>Tailwind CSS</li>
            <li>Vercel / Netlify / Replit / Render</li>
          </ul>
        </div>
        {/* Cloud & Data Platforms */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">📊 Cloud & Data Platforms</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Palantir Foundry</li>
            <li>AWS (S3, Lambda, etc.)</li>
            <li>Firebase / Supabase</li>
          </ul>
        </div>
        {/* Bonus Skills */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">🧩 Bonus Skills</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Salesforce / CRM platforms</li>
            <li>SEO tools (Google Analytics, Tag Manager, Search Console)</li>
            <li>Scripting (PowerShell, Bash)</li>
            <li>Chatbot or agent development (Telegram bots, Slack integrations)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);