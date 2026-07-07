export const automation = {
  headline: "Automate Repetitive Business Tasks",
  subheadline:
    "Custom AI automation for local businesses. We eliminate repetitive work, reduce manual effort, and build automation tailored to your business.",
  region: "Australia & New Zealand",
  ctas: {
    primary: "Book a Free Consultation",
  },
} as const;

export const serviceCards = [
  {
    title: "AI Workflow Automation",
    description: "Smart routing, summaries, and decisions on repetitive business tasks.",
    icon: "🤖",
  },
  {
    title: "Email Automation",
    description: "Follow-ups, reminders, and inbox workflows that run while you work.",
    icon: "📧",
  },
  {
    title: "Browser Automation",
    description: "Automate web-based tasks across portals, dashboards, and admin panels.",
    icon: "🌐",
  },
  {
    title: "Spreadsheet Automation",
    description: "Sync, clean, and report on data without manual copy-paste.",
    icon: "📊",
  },
  {
    title: "PDF Automation",
    description: "Generate, merge, and route documents automatically.",
    icon: "📄",
  },
  {
    title: "Reporting Automation",
    description: "Scheduled reports and dashboards delivered to your team on time.",
    icon: "📈",
  },
] as const;

export const extendedServices = serviceCards.map((s) => s.title);

export const typicalAutomations = [
  "Customer follow-up",
  "Quote generation",
  "Invoice processing",
  "Appointment reminders",
  "Data entry",
  "Spreadsheet sync",
  "PDF generation",
  "AI reports",
  "Lead capture",
  "Review replies",
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Free consultation",
    description: "We map your repetitive tasks and identify quick wins.",
  },
  {
    step: "2",
    title: "We build your automation",
    description: "Custom workflows wired into the tools you already use.",
  },
  {
    step: "3",
    title: "Deploy in your business",
    description: "Go live in days — not months — with clear handover.",
  },
  {
    step: "4",
    title: "Support & maintenance",
    description: "We monitor, fix, and improve as your business changes.",
  },
] as const;

export const benefits = [
  {
    title: "Save time",
    description: "Reclaim 10+ hours every week from manual admin.",
  },
  {
    title: "Reduce manual work",
    description: "Fewer errors, less double-handling, happier staff.",
  },
  {
    title: "Keep your software",
    description: "Integrate with Xero, Gmail, HubSpot, and the tools you already trust.",
  },
  {
    title: "Delivered fast",
    description: "Most automations ship within 72 hours of sign-off.",
  },
  {
    title: "Custom built",
    description: "No generic SaaS — built for how your business actually runs.",
  },
] as const;

export const serviceOutcomes = [
  "Save 10+ hours every week.",
  "Reduce manual work.",
  "Eliminate repetitive tasks.",
  "Integrate with your existing software.",
  "No need to replace your current systems.",
] as const;

export const homeIndustries = [
  { title: "Dentists", href: "/industries/dentists" },
  { title: "Electricians", href: "/industries/electricians" },
  { title: "Plumbers", href: "/industries/plumbers" },
  { title: "Accountants", href: "/industries/accountants" },
  { title: "Professional Services", href: "/industries/lawyers" },
] as const;
