import type { Metadata } from "next";
import type { IndustrySlug } from "@/lib/industries";
import type { ServiceSlug } from "@/lib/services";
import { buildPageMetadata } from "@/lib/seo";

export type CaseStudySlug =
  | "dental-recall-automation"
  | "electrician-quote-follow-up"
  | "accountant-document-chasing"
  | "plumber-lead-capture";

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  industry: IndustrySlug;
  industryLabel: string;
  serviceSlug: ServiceSlug;
  serviceLabel: string;
  location: string;
  publishedAt: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  timeline: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dental-recall-automation",
    title: "Dental recall automation",
    industry: "dentists",
    industryLabel: "Dental practice",
    serviceSlug: "email-automation",
    serviceLabel: "Email Automation",
    location: "Melbourne, Australia",
    publishedAt: "2025-11-15",
    summary:
      "A suburban dental practice automated patient recalls and hygiene rebooking — cutting front-desk phone time and filling more appointment gaps.",
    challenge:
      "The front desk spent 6+ hours each week calling patients for hygiene recalls. Many calls went unanswered, and treatment plans were followed up inconsistently.",
    solution:
      "Roncyo built an email and SMS recall sequence triggered from the practice management system. Patients receive personalised reminders, one-click rebooking links, and escalation to staff only when needed.",
    results: [
      "6 hours/week saved on manual recall calls",
      "23% increase in hygiene rebookings within 60 days",
      "Consistent follow-up on every overdue patient",
    ],
    timeline: "Live in 5 days",
  },
  {
    slug: "electrician-quote-follow-up",
    title: "Electrician quote follow-up",
    industry: "electricians",
    industryLabel: "Electrical contractor",
    serviceSlug: "ai-workflow-automation",
    serviceLabel: "AI Workflow Automation",
    location: "Auckland, New Zealand",
    publishedAt: "2025-10-20",
    summary:
      "An electrical contractor automated quote follow-ups after site visits — winning more jobs without hiring extra office staff.",
    challenge:
      "Quotes were often sent 2–3 days after site visits. Follow-ups were inconsistent, and the owner had no visibility into which leads were going cold.",
    solution:
      "A workflow captures site notes on mobile, generates a draft quote, and triggers a personalised follow-up sequence at 24h, 72h, and 7 days. The owner gets a weekly pipeline summary automatically.",
    results: [
      "Quote turnaround reduced from 3 days to same day",
      "18% more quotes converted to booked jobs",
      "Owner saves 4 hours/week on lead tracking",
    ],
    timeline: "Live in 4 days",
  },
  {
    slug: "accountant-document-chasing",
    title: "Accountant document chasing",
    industry: "accountants",
    industryLabel: "Accounting firm",
    serviceSlug: "email-automation",
    serviceLabel: "Email Automation",
    location: "Sydney, Australia",
    publishedAt: "2025-12-01",
    summary:
      "A small accounting firm automated client document requests and reminders — shortening month-end cycles and reducing inbox chaos.",
    challenge:
      "Staff spent the first week of every month chasing clients for missing receipts, bank statements, and payroll files. Reminders were sent manually and often forgotten.",
    solution:
      "Roncyo built a document request workflow with automated reminders, a client upload portal link, and internal alerts when files arrive. Files are renamed and filed into the correct client folder automatically.",
    results: [
      "Document collection 40% faster at month-end",
      "3 hours/week saved per accountant",
      "Clients receive consistent, professional reminders",
    ],
    timeline: "Live in 6 days",
  },
  {
    slug: "plumber-lead-capture",
    title: "Plumber lead capture",
    industry: "plumbers",
    industryLabel: "Plumbing business",
    serviceSlug: "browser-automation",
    serviceLabel: "Browser Automation",
    location: "Brisbane, Australia",
    publishedAt: "2026-01-10",
    summary:
      "A plumbing business automated lead capture from their website and job portal — responding to enquiries faster and reducing lost emergency calls.",
    challenge:
      "Leads from the website and third-party job boards were logged manually. Response times varied, and after-hours enquiries were often missed until the next morning.",
    solution:
      "Browser automation monitors lead sources, creates jobs in the dispatch system, sends instant SMS confirmations to customers, and alerts the on-call plumber for emergencies.",
    results: [
      "Average response time cut from 4 hours to 12 minutes",
      "Zero missed after-hours emergency leads",
      "Owner no longer checks three portals manually",
    ],
    timeline: "Live in 3 days",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs() {
  return caseStudies.map((c) => c.slug);
}

export function getCaseStudiesByIndustry(industry: IndustrySlug) {
  return caseStudies.filter((c) => c.industry === industry);
}

export function getCaseStudiesByService(service: ServiceSlug) {
  return caseStudies.filter((c) => c.serviceSlug === service);
}

export function caseStudyMetadata(study: CaseStudy): Metadata {
  return buildPageMetadata({
    title: `${study.title} — ${study.industryLabel} Case Study | Roncyo`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: [
      "automation case study",
      study.industryLabel,
      study.serviceLabel,
      "AI Automation Australia",
      "Business Process Automation",
    ],
  });
}
