import type { Metadata } from "next";
import type { IndustrySlug } from "@/lib/industries";
import { buildPageMetadata } from "@/lib/seo";

export type ServiceSlug =
  | "ai-workflow-automation"
  | "email-automation"
  | "browser-automation"
  | "spreadsheet-automation"
  | "pdf-automation"
  | "reporting-automation";

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  headline: string;
  seoKeyword: string;
  description: string;
  icon: string;
  intro: string;
  useCases: string[];
  integrations: string[];
  outcomes: string[];
  relatedIndustries: IndustrySlug[];
};

export const services: ServicePage[] = [
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    headline: "AI workflow automation for local businesses",
    seoKeyword: "Workflow Automation",
    description:
      "Route tasks, summarise data, and trigger actions automatically — without replacing the tools your team already uses.",
    icon: "🤖",
    intro:
      "AI workflow automation connects the steps between your inbox, CRM, spreadsheets, and admin systems. Roncyo builds custom workflows for local businesses in Australia and New Zealand — so repetitive decisions, handoffs, and follow-ups happen without manual effort.",
    useCases: [
      "Lead qualification and routing",
      "Task assignment based on job type",
      "AI summaries before human review",
      "Multi-step approval workflows",
      "Exception handling and escalations",
    ],
    integrations: ["Gmail", "Outlook", "HubSpot", "Xero", "Slack", "Notion"],
    outcomes: [
      "Fewer bottlenecks between teams",
      "Consistent process every time",
      "Hours saved on coordination",
    ],
    relatedIndustries: ["dentists", "accountants", "lawyers"],
  },
  {
    slug: "email-automation",
    title: "Email Automation",
    headline: "Email automation for local businesses",
    seoKeyword: "Email Automation",
    description:
      "Follow-ups, reminders, and inbox workflows that run while your team focuses on customers.",
    icon: "📧",
    intro:
      "Most local businesses lose revenue in the inbox — quotes not followed up, documents not chased, appointments not confirmed. Email automation sends the right message at the right time, personalised to each customer, without your team copying templates all day.",
    useCases: [
      "Quote and proposal follow-ups",
      "Appointment confirmations",
      "Document request reminders",
      "Post-job review requests",
      "Client onboarding sequences",
    ],
    integrations: ["Gmail", "Outlook", "Microsoft 365", "HubSpot", "Pipedrive"],
    outcomes: [
      "More responses without more staff",
      "Consistent client communication",
      "Less inbox admin every week",
    ],
    relatedIndustries: ["electricians", "plumbers", "accountants"],
  },
  {
    slug: "browser-automation",
    title: "Browser Automation",
    headline: "Browser automation for repetitive web tasks",
    seoKeyword: "Browser Automation",
    description:
      "Automate data entry, form submissions, and portal updates across the web apps your business relies on.",
    icon: "🌐",
    intro:
      "Browser automation handles the repetitive clicks, logins, and copy-paste between web portals — supplier sites, government forms, job management dashboards, and legacy systems without APIs. Built for trades, professional services, and admin-heavy local businesses.",
    useCases: [
      "Portal data entry and updates",
      "Form submissions across websites",
      "Downloading and filing web reports",
      "Syncing job details between systems",
      "Scheduled checks on supplier portals",
    ],
    integrations: ["Custom web apps", "Job management portals", "Supplier dashboards"],
    outcomes: [
      "No more double-handling web data",
      "Faster turnaround on admin tasks",
      "Fewer errors from manual entry",
    ],
    relatedIndustries: ["electricians", "plumbers", "lawyers"],
  },
  {
    slug: "spreadsheet-automation",
    title: "Spreadsheet Automation",
    headline: "Spreadsheet automation for business data",
    seoKeyword: "Spreadsheet Automation",
    description:
      "Sync, clean, and report on spreadsheet data automatically — without manual copy-paste between files.",
    icon: "📊",
    intro:
      "Spreadsheets still run many local businesses. Spreadsheet automation pulls data from email, forms, and other tools into the right cells, formats reports, and keeps your numbers current — so your team stops maintaining spreadsheets by hand.",
    useCases: [
      "Daily job tracker updates",
      "Revenue and pipeline reports",
      "Inventory and stock sync",
      "Timesheet consolidation",
      "Client data cleanup and deduplication",
    ],
    integrations: ["Google Sheets", "Excel", "Airtable", "Xero", "CSV exports"],
    outcomes: [
      "Always up-to-date spreadsheets",
      "Less time on data entry",
      "Reliable reporting every week",
    ],
    relatedIndustries: ["accountants", "electricians", "dentists"],
  },
  {
    slug: "pdf-automation",
    title: "PDF Automation",
    headline: "PDF automation for documents and forms",
    seoKeyword: "PDF Automation",
    description:
      "Generate, merge, and route PDF documents automatically — quotes, invoices, reports, and compliance forms.",
    icon: "📄",
    intro:
      "PDF automation turns your templates into a production line. Roncyo builds workflows that populate quotes, invoices, and client packs from your existing data — then deliver them by email or file them in the right folder without manual assembly.",
    useCases: [
      "Quote and invoice generation",
      "Contract and engagement packs",
      "Merging attachments into one PDF",
      "Filing documents to cloud storage",
      "Batch processing of form PDFs",
    ],
    integrations: ["Google Drive", "Dropbox", "Xero", "Gmail", "DocuSign"],
    outcomes: [
      "Documents ready in minutes, not hours",
      "Consistent branding every time",
      "Less admin around paperwork",
    ],
    relatedIndustries: ["lawyers", "accountants", "electricians"],
  },
  {
    slug: "reporting-automation",
    title: "Reporting Automation",
    headline: "Reporting automation for business insights",
    seoKeyword: "Reporting Automation",
    description:
      "Scheduled reports and dashboards delivered to your team on time — pulled from the systems you already use.",
    icon: "📈",
    intro:
      "Reporting automation collects data from your tools, formats it into clear summaries, and delivers it on schedule. Owners and managers get the numbers they need without chasing staff for updates or rebuilding spreadsheets every Monday morning.",
    useCases: [
      "Weekly performance summaries",
      "Job pipeline and revenue reports",
      "Client activity dashboards",
      "KPI alerts when thresholds are hit",
      "Month-end pack generation",
    ],
    integrations: ["Google Sheets", "Xero", "HubSpot", "Slack", "Email"],
    outcomes: [
      "Decisions based on current data",
      "No more manual report assembly",
      "Team aligned on the same numbers",
    ],
    relatedIndustries: ["accountants", "dentists", "lawyers"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return services.map((s) => s.slug);
}

export function serviceMetadata(service: ServicePage): Metadata {
  return buildPageMetadata({
    title: `${service.seoKeyword} for Local Businesses — Australia & NZ`,
    description: `${service.description} Custom ${service.title.toLowerCase()} for dentists, trades, accountants, and service businesses in Australia and New Zealand.`,
    path: `/services/${service.slug}`,
    keywords: [
      service.seoKeyword,
      service.title,
      `${service.seoKeyword} Australia`,
      `${service.seoKeyword} New Zealand`,
      "AI Automation Australia",
      "Business Process Automation",
      "custom business automation",
    ],
  });
}
