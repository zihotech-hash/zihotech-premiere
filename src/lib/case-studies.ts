export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  type: "Web" | "Mobile" | "AI";
  problem: string;
  result: string;
  stack: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "procureai",
    name: "ProcureAI",
    industry: "B2B SaaS",
    type: "AI",
    problem:
      "Procurement teams were drowning in manual PO processing — every vendor used a different format and approvals lived in email threads.",
    result: "Reduced manual processing by 70%",
    stack: ["FastAPI", "LangChain", "PostgreSQL", "React"],
  },
  {
    slug: "meditrack",
    name: "MediTrack",
    industry: "Healthcare",
    type: "Web",
    problem:
      "A clinic group needed unified patient records with intelligent triage suggestions to handle a 3x intake surge.",
    result: "45% faster patient intake",
    stack: ["Django", "React", "OpenAI API", "Docker"],
  },
  {
    slug: "shipswift",
    name: "ShipSwift",
    industry: "Logistics",
    type: "Mobile",
    problem:
      "Independent fleet operators had no real-time visibility into shipment status across carriers and warehouses.",
    result: "10,000 active users at launch",
    stack: ["React Native", "Node.js", "GCP", "WebSockets"],
  },
  {
    slug: "lexbot",
    name: "LexBot",
    industry: "LegalTech",
    type: "AI",
    problem:
      "Mid-size firms spent 4+ hours per contract on review — partners couldn't scale without compromising on quality.",
    result: "Contract review: 4 hrs → 20 min",
    stack: ["LangGraph", "FAISS", "FastAPI", "Next.js"],
  },
];
