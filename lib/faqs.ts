export type FaqItem = { question: string; answer: string };

/** Sitewide FAQs — used on homepage and for GEO/AI citation */
export const globalFaqs: FaqItem[] = [
  {
    question: "What is Roncyo?",
    answer:
      "Roncyo is an AI Business Automation Studio. We build custom automation for local businesses in Australia and New Zealand — eliminating repetitive tasks like follow-ups, data entry, document handling, and reporting without replacing your existing software.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We work with dentists, electricians, plumbers, accountants, lawyers, and other local service businesses across Australia and New Zealand. Most clients are owner-operated or small teams drowning in admin work.",
  },
  {
    question: "How long does it take to build an automation?",
    answer:
      "Most automations go live within 72 hours of project sign-off. We start with a free consultation to map your workflow, quote a fixed scope, then build and deploy.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "No. We integrate with the tools you already use — Gmail, Outlook, Xero, HubSpot, Google Sheets, job management portals, and more. The goal is to remove manual work between your existing systems.",
  },
  {
    question: "How much does business automation cost?",
    answer:
      "Every project is scoped individually after a free consultation. Pricing depends on workflow complexity. Book a free consultation at roncyo.com/contact and we'll provide a fixed quote.",
  },
  {
    question: "What areas in Australia and New Zealand do you serve?",
    answer:
      "We serve local businesses across Australia (Sydney, Melbourne, Brisbane, Perth, Adelaide) and New Zealand (Auckland, Wellington, Christchurch). All work is delivered remotely with video calls for discovery and handover.",
  },
];

export const serviceFaqs: Record<string, FaqItem[]> = {
  "ai-workflow-automation": [
    {
      question: "What is AI workflow automation?",
      answer:
        "AI workflow automation connects the steps between your tools — routing leads, summarising emails, triggering follow-ups, and handling decisions that don't need a human every time. Roncyo builds custom workflows for local businesses in Australia and New Zealand.",
    },
    {
      question: "What tasks can workflow automation handle?",
      answer:
        "Common tasks include lead qualification, task assignment, approval routing, AI summaries before human review, and multi-step handoffs between inbox, CRM, and spreadsheets.",
    },
  ],
  "email-automation": [
    {
      question: "What is email automation for small business?",
      answer:
        "Email automation sends personalised follow-ups, reminders, and onboarding sequences on schedule — without your team copying templates. Ideal for quotes, appointment confirmations, document requests, and review requests.",
    },
    {
      question: "Does email automation work with Gmail and Outlook?",
      answer:
        "Yes. We integrate with Gmail, Microsoft 365, Outlook, and CRMs like HubSpot and Pipedrive.",
    },
  ],
  "browser-automation": [
    {
      question: "What is browser automation?",
      answer:
        "Browser automation handles repetitive web tasks — logging into portals, filling forms, downloading reports, and syncing data between websites that don't have APIs. Common for trades and professional services using legacy web tools.",
    },
  ],
  "spreadsheet-automation": [
    {
      question: "Can you automate Google Sheets and Excel?",
      answer:
        "Yes. We automate data sync, report generation, cleanup, and consolidation across Google Sheets, Excel, Airtable, and CSV exports from your other tools.",
    },
  ],
  "pdf-automation": [
    {
      question: "What PDF tasks can be automated?",
      answer:
        "Quote and invoice generation, contract packs, merging attachments, filing to cloud storage, and batch processing of form PDFs — all populated from your existing data.",
    },
  ],
  "reporting-automation": [
    {
      question: "What is reporting automation?",
      answer:
        "Reporting automation pulls data from your tools, formats summaries, and delivers them on schedule via email or Slack — so managers get current numbers without chasing staff for updates.",
    },
  ],
};

export const industryFaqs: Record<string, FaqItem[]> = {
  dentists: [
    {
      question: "How can AI automation help dental practices?",
      answer:
        "Dental practices use automation for appointment reminders, hygiene recalls, no-show reduction, new patient intake, and review requests — saving front-desk hours every week.",
    },
    {
      question: "Does dental automation integrate with practice management software?",
      answer:
        "Yes. We connect with your existing practice tools and communication channels. A free consultation maps your specific setup.",
    },
  ],
  electricians: [
    {
      question: "How can electricians automate their business?",
      answer:
        "Electricians automate quote generation from site notes, lead follow-ups, job scheduling notifications, invoice creation, and Google review requests — winning more jobs with less office admin.",
    },
  ],
  plumbers: [
    {
      question: "How can plumbers automate lead capture and dispatch?",
      answer:
        "Plumbers automate website and phone lead capture, customer ETA updates, job-to-invoice workflows, and after-hours emergency routing — responding faster without extra staff.",
    },
  ],
  accountants: [
    {
      question: "How can accounting firms automate client document chasing?",
      answer:
        "Accounting firms automate document request sequences, file renaming and filing, month-end checklists, and deadline reminders — shortening month-end cycles.",
    },
  ],
  lawyers: [
    {
      question: "How can professional services firms automate intake and documents?",
      answer:
        "Law firms and consultancies automate client intake, matter setup, status updates, document collection, and deadline reminders — reducing non-billable admin.",
    },
  ],
};
