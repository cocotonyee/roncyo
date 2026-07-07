import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export type IndustrySlug =
  | "dentists"
  | "electricians"
  | "plumbers"
  | "accountants"
  | "lawyers";

export type IndustryPage = {
  slug: IndustrySlug;
  title: string;
  headline: string;
  description: string;
  seoKeyword: string;
  seoIntro: string;
  pains: string[];
  automations: string[];
  outcomes: string[];
};

export const industries: IndustryPage[] = [
  {
    slug: "dentists",
    title: "Dentists",
    headline: "AI automation for dental practices",
    description:
      "Reduce no-shows, automate recalls, and free your front desk from repetitive patient communication.",
    seoKeyword: "AI Automation for Dentists",
    seoIntro:
      "Dental practices in Australia and New Zealand lose hours every week to manual recalls, appointment confirmations, and patient follow-ups. Roncyo builds custom AI automation for dentists — reducing no-shows, filling hygiene gaps, and freeing your front desk from repetitive phone work.",
    pains: [
      "Manual recall calls eating staff time",
      "No-shows and last-minute gaps",
      "Treatment plans not followed up consistently",
    ],
    automations: [
      "Appointment reminders & confirmations",
      "Recall and hygiene rebooking sequences",
      "New patient intake routing",
      "Review requests after visits",
      "Insurance / form follow-ups",
    ],
    outcomes: [
      "Fewer empty chairs",
      "Less phone tag for your team",
      "Consistent patient communication",
    ],
  },
  {
    slug: "electricians",
    title: "Electricians",
    headline: "AI automation for electrical contractors",
    description:
      "Win more jobs with faster quotes, automated follow-ups, and less admin between site visits.",
    seoKeyword: "AI Automation for Electricians",
    seoIntro:
      "Electrical contractors juggle site visits, quotes, and follow-ups across email, phone, and job management tools. Roncyo builds AI automation for electricians — so quotes go out faster, leads get followed up consistently, and admin doesn't pile up between jobs.",
    pains: [
      "Quotes delayed after site visits",
      "Leads falling through the cracks",
      "Job details retyped into invoices",
    ],
    automations: [
      "Quote generation from site notes",
      "Lead follow-up sequences",
      "Job scheduling notifications",
      "Invoice creation from completed jobs",
      "Google review requests",
    ],
    outcomes: [
      "Faster quote turnaround",
      "More booked jobs",
      "Cleaner handoff from field to office",
    ],
  },
  {
    slug: "plumbers",
    title: "Plumbers",
    headline: "AI automation for plumbing businesses",
    description:
      "Capture every lead, dispatch faster, and keep customers updated without extra admin.",
    seoKeyword: "AI Automation for Plumbers",
    seoIntro:
      "Plumbing businesses need to respond fast — especially for emergency calls. Roncyo builds automation for plumbers that captures leads, updates customers, and turns completed jobs into invoices without manual data entry.",
    pains: [
      "Emergency calls logged on paper",
      "Customers asking for ETA updates",
      "Invoices sent days after the job",
    ],
    automations: [
      "Lead capture from website & phone",
      "Customer ETA & arrival updates",
      "Job completion → invoice workflow",
      "Maintenance reminder campaigns",
      "Review & referral follow-ups",
    ],
    outcomes: [
      "More leads converted",
      "Happier customers",
      "Faster cash collection",
    ],
  },
  {
    slug: "accountants",
    title: "Accountants",
    headline: "AI automation for accounting firms",
    description:
      "Chase documents once, file them correctly, and automate client reminders before deadlines.",
    seoKeyword: "AI Automation for Accountants",
    seoIntro:
      "Accounting firms spend the first days of every month chasing documents and sending the same reminders. Roncyo builds AI automation for accountants — automating client requests, file organisation, and deadline reminders so your team focuses on advisory work.",
    pains: [
      "Chasing clients for missing documents",
      "Manual file renaming and sorting",
      "Repetitive deadline reminders",
    ],
    automations: [
      "Document request & reminder sequences",
      "Inbox → folder filing rules",
      "Month-end client checklists",
      "Engagement letter follow-ups",
      "Reporting pack generation",
    ],
    outcomes: [
      "Shorter month-end cycles",
      "Less inbox chaos",
      "Clients onboarded faster",
    ],
  },
  {
    slug: "lawyers",
    title: "Professional Services",
    headline: "AI automation for professional services",
    description:
      "Streamline intake, client updates, and document workflows without compromising control.",
    seoKeyword: "AI Automation for Professional Services",
    seoIntro:
      "Law firms, consultancies, and professional services run on documents, deadlines, and client communication. Roncyo builds automation that streamlines intake, status updates, and document workflows — without compromising the control your practice requires.",
    pains: [
      "Intake data re-entered multiple times",
      "Clients waiting on status updates",
      "Documents scattered across email",
    ],
    automations: [
      "Client intake → matter setup",
      "Status update notifications",
      "Document collection & naming",
      "Appointment & deadline reminders",
      "Conflict-check data gathering",
    ],
    outcomes: [
      "Faster matter opening",
      "Clearer client communication",
      "Less non-billable admin",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}

export function getAllIndustrySlugs() {
  return industries.map((item) => item.slug);
}

export function industryMetadata(industry: IndustryPage): Metadata {
  return buildPageMetadata({
    title: `${industry.seoKeyword} | Roncyo`,
    description: `${industry.description} Custom workflow automation for local businesses in Australia and New Zealand.`,
    path: `/industries/${industry.slug}`,
    keywords: [
      industry.seoKeyword,
      "AI Automation Australia",
      "AI Automation New Zealand",
      "Business Process Automation",
      "Workflow Automation",
    ],
  });
}
