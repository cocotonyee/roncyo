"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "business", label: "Business", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "website", label: "Website", type: "url", required: false },
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const business = String(data.get("business") ?? "");
    const email = String(data.get("email") ?? "");
    const website = String(data.get("website") ?? "");
    const task = String(data.get("task") ?? "");

    const subject = encodeURIComponent(`Automation enquiry — ${business}`);
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nWebsite: ${website}\n\nRepetitive task:\n${task}`,
    );

    window.location.href = `mailto:${site.emails.hello}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-foreground)]">Thanks — almost done.</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Your email client should open with your message. Send it to reach our team at{" "}
          <a className="font-medium text-[var(--color-foreground)] underline" href={`mailto:${site.emails.hello}`}>
            {site.emails.hello}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">
              {field.label}
              {field.required ? " *" : ""}
            </span>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
            />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">
          Describe your repetitive task *
        </span>
        <textarea
          name="task"
          required
          rows={6}
          placeholder="e.g. We manually send quote follow-ups every week and copy details from email into a spreadsheet..."
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)] sm:w-auto"
      >
        Send consultation request
      </button>
    </form>
  );
}
