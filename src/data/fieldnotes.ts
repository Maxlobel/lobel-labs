/**
 * Fieldnotes editorial concepts.
 *
 * These are proposed investigations, not published findings. Never turn a
 * concept into a completed story without checking original sources and getting
 * Max's approval. A later content pipeline can replace this typed collection.
 */
export type FieldnoteCategory = "Cities" | "Sports" | "AI" | "Systems" | "Culture";
export type FieldnoteMotif = "housing" | "golf" | "network" | "chart" | "football" | "map";

export type Fieldnote = {
  slug: string;
  number: string;
  category: FieldnoteCategory;
  motif: FieldnoteMotif;
  headline: string;
  coverTitle: string;
  description: string;
  question: string;
  approach: string[];
  evidence: string[];
  whyItMatters: string;
  status: "concept";
};

export const fieldnoteCategories: Array<"All" | FieldnoteCategory> = [
  "All", "Cities", "Sports", "AI", "Systems", "Culture",
];

export const fieldnotes: Fieldnote[] = [
  {
    slug: "why-some-boston-homes-sit",
    number: "001",
    category: "Cities",
    motif: "housing",
    headline: "Why do some Boston homes sit while others sell?",
    coverTitle: "SAME CITY.\nDIFFERENT\nOUTCOMES.",
    description: "A proposed look at listing history, pricing decisions, and the details that aggregate market averages conceal.",
    question: "What actually separates an otherwise similar home that sells quickly from one that sits?",
    approach: [
      "Compare individual listings within tightly matched neighborhoods, property types, sizes, and periods.",
      "Trace price changes, relistings, days on market, and the difference between ask and closing price.",
      "Investigate the outliers before drawing conclusions from an area average.",
    ],
    evidence: [
      "Timestamped listing histories and recorded transactions",
      "Comparable property attributes and location context",
      "A method that accounts for listing withdrawals and relistings",
    ],
    whyItMatters: "A citywide median can describe the market without explaining the decision facing an individual seller or buyer.",
    status: "concept",
  },
  {
    slug: "what-makes-a-golf-shot-memorable",
    number: "002",
    category: "Sports",
    motif: "golf",
    headline: "What makes a golf shot memorable?",
    coverTitle: "ONE SHOT.\nA THOUSAND\nVARIABLES.",
    description: "An idea for visualizing how context changes the way we remember performance in golf.",
    question: "Is the most memorable golf shot the most difficult, the most consequential, or simply the best told?",
    approach: [
      "Define distinct components of shot difficulty, consequence, and audience response.",
      "Map specific shots in their round and tournament context instead of ranking highlight clips alone.",
      "Test whether a transparent scoring rubric matches how people describe and recall shots.",
    ],
    evidence: [
      "Shot location, conditions, and strokes gained where available",
      "Tournament situation and outcome",
      "Viewer recall or preference evidence collected separately from performance metrics",
    ],
    whyItMatters: "Sports numbers are most interesting when they make an emotional moment easier to understand, not when they flatten it.",
    status: "concept",
  },
  {
    slug: "what-should-an-ai-workflow-remember",
    number: "003",
    category: "AI",
    motif: "network",
    headline: "What should an AI workflow remember?",
    coverTitle: "AUTOMATE\nTHE WORK.\nKEEP THE JUDGMENT.",
    description: "A working question about AI memory, review checkpoints, and what deserves a human decision.",
    question: "How can an automated process preserve useful context without turning unverified assumptions into permanent facts?",
    approach: [
      "Separate source records, derived interpretations, decisions, and expired assumptions.",
      "Test a small workflow with explicit approvals, audit trails, and reversible actions.",
      "Measure errors, reviewer time, and corrections instead of counting automated steps.",
    ],
    evidence: [
      "Original inputs and versioned outputs",
      "Approval and correction records",
      "Repeatable tests for accuracy, privacy, and reversibility",
    ],
    whyItMatters: "An impressive automation demo and a trustworthy operating process are different things.",
    status: "concept",
  },
  {
    slug: "when-a-dashboard-changes-a-decision",
    number: "004",
    category: "Systems",
    motif: "chart",
    headline: "When does a dashboard actually change a decision?",
    coverTitle: "MORE CHARTS.\nOR BETTER\nDECISIONS?",
    description: "Exploring the gap between attractive reporting and information someone can act on.",
    question: "What makes a dashboard useful after the first time someone opens it?",
    approach: [
      "Observe real decisions, the questions people ask, and which data they need at that point.",
      "Compare a compact decision view against a conventional KPI overview.",
      "Track whether users can explain a recommendation and identify its underlying data.",
    ],
    evidence: [
      "Real task completion and comprehension tests",
      "Metric definitions and traceable source data",
      "Observed decisions rather than page view counts alone",
    ],
    whyItMatters: "The best analytical work changes what someone understands or does. Visual polish is only one part of that.",
    status: "concept",
  },
  {
    slug: "survivor-pools-and-patience",
    number: "005",
    category: "Sports",
    motif: "football",
    headline: "Do NFL survivor pools reward patience?",
    coverTitle: "WIN TODAY.\nSURVIVE\nTOMORROW.",
    description: "A possible simulation of the tradeoff between the safest weekly favorite and preserving future options.",
    question: "When is it worth passing on the team with the highest chance of winning this week?",
    approach: [
      "Model the actual rules and how previous picks constrain later choices.",
      "Use week specific win probabilities and replay multiple realistic paths through the season.",
      "Compare strategies on survival probability, not only the number of weeks won in one sample.",
    ],
    evidence: [
      "Published schedules, closing odds, and actual outcomes",
      "Transparent modeling assumptions and out of sample validation",
      "Sensitivity checks when probabilities are uncertain",
    ],
    whyItMatters: "The most obvious short term choice is not always the one with the best long term odds.",
    status: "concept",
  },
  {
    slug: "the-invisible-city",
    number: "006",
    category: "Culture",
    motif: "map",
    headline: "The invisible systems that shape a city",
    coverTitle: "THE CITY\nBENEATH\nTHE CITY.",
    description: "A visual storytelling concept about the infrastructure and patterns we move through without noticing.",
    question: "What hidden systems make two places a few streets apart feel like different worlds?",
    approach: [
      "Choose one observable system, such as transit access, tree cover, or street configuration.",
      "Map its history and distribution at a scale people can recognize.",
      "Connect spatial patterns to the lived experience without claiming that a map alone proves causation.",
    ],
    evidence: [
      "Original geospatial records and historical maps",
      "Known limitations in geography, time, and collection methods",
      "On the ground observation and competing explanations",
    ],
    whyItMatters: "Data can make the familiar strange again, then help explain why it looks the way it does.",
    status: "concept",
  },
];

export function getFieldnote(slug: string) {
  return fieldnotes.find((note) => note.slug === slug);
}
