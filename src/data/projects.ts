export type ProjectStatus =
  | "In progress"
  | "Beta"
  | "Active"
  | "Complete"
  | "Archived";
export type Project = {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  contribution: string;
  current: string;
  tools: string[];
  href?: string;
  demoHref?: string;
  github?: string;
};
export const projects: Project[] = [
  {
    slug: "apres-boston",
    title: "Après Boston",
    category: "Personal project · Community",
    status: "Beta",
    summary:
      "A community app for Boston skiers to plan trips, find their crew, and meet up for après.",
    problem:
      "Ski plans and meetup details are often scattered across conversations.",
    contribution:
      "Built a place for trip planning, friends, ski logs, and après meetups.",
    current:
      "A working beta with sign in and community features. Testing and refinement are ongoing.",
    tools: ["React", "TypeScript", "Supabase"],
    href: "/projects/apres-boston/",
  },
  {
    slug: "casting-support",
    title: "Casting business technical support",
    category: "Client work · Websites & operations",
    status: "Complete",
    summary:
      "Website, WordPress, and email support for Boston Casting and TriState Casting.",
    problem:
      "Website errors, account issues, and outdated content can interrupt a team's everyday work.",
    contribution:
      "Handled website and reCAPTCHA fixes, email setup and forwarding, content updates, and WordPress troubleshooting involving Elementor and hosting configuration.",
    current:
      "Completed support engagements. The work focused on specific technical issues and requested updates.",
    tools: ["WordPress", "Elementor", "Email configuration"],
  },
  {
    slug: "rolevista",
    title: "RoleVista",
    category: "Personal project · Career exploration",
    status: "In progress",
    summary:
      "A career assessment project exploring how interests and skills can inform career direction.",
    problem:
      "People exploring their next career move need a structured way to think about what fits them.",
    contribution:
      "Built a career assessment application with a React frontend and a Node.js backend, including assessment and results flows.",
    current:
      "Development project. The source is available; it is not presented here as a finished commercial service.",
    tools: ["React", "Node.js", "SQLite"],
    github: "https://github.com/Maxlobel/rolevista",
  },
  {
    slug: "clockmiester",
    title: "ClockMiester",
    category: "Collaboration · Product configurator",
    status: "Beta",
    summary:
      "An interactive color configurator for a handmade, 3D printed mechanical clock with exposed gears and a pendulum.",
    problem:
      "Customizing a clock is difficult when buyers cannot see how their chosen colors work together across individual parts.",
    contribution:
      "Designed and built an interactive concept that lets people select clock components and preview color combinations, using a photo of the physical clock as a visual reference.",
    current:
      "Interactive visual demo complete. Exact CAD geometry, verified manufacturing color options, live pricing, and automated part ordering are planned but not connected yet.",
    tools: ["Interactive prototype", "Product visualization", "Color customization"],
    demoHref: "https://clockmiester-studio.aquaferry1.chatgpt.site",
  },
];
