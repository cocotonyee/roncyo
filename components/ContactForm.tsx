"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const interests = [
  "Custom website",
  "Custom game",
  "AI automation",
  "Ronfax",
  "SaaS / custom software",
  "Other",
] as const;

type Web3FormsResult = {
  success?: boolean;
  message?: string;
};

async function readJsonResponse(response: Response): Promise<Web3FormsResult> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as Web3FormsResult;
  } catch {
    return { message: text.slice(0, 200) };
  }
}

function mapInterestParam(raw: string | null): string {
  if (!raw) return "";
  const lower = raw.toLowerCase();
  if (lower.includes("website")) return "Custom website";
  if (lower.includes("game")) return "Custom game";
  if (lower.includes("automation")) return "AI automation";
  if (lower.includes("ronfax")) return "Ronfax";
  if (lower.includes("saas") || lower.includes("software")) return "SaaS / custom software";
  return interests.includes(raw as (typeof interests)[number]) ? raw : "";
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const defaultInterest = mapInterestParam(searchParams.get("interest"));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!accessKey) {
      setError("Contact form is not configured. Email us directly at support@roncyo.com.");
      setLoading(false);
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (data.get("botcheck") === "on") {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Roncyo enquiry — ${interest || "General"} — ${company || name}`,
          from_name: name,
          email,
          replyto: email,
          botcheck: false,
          message: [
            `Name: ${name}`,
            `Company: ${company || "—"}`,
            `Email: ${email}`,
            `Interest: ${interest || "—"}`,
            "",
            message,
          ].join("\n"),
        }),
      });

      const result = await readJsonResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Failed to send. Please email us directly.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-foreground)]">Message received.</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          We&apos;ll reply within one business day. Or email{" "}
          <a className="font-medium text-[var(--color-foreground)] underline" href={`mailto:${site.emails.hello}`}>
            {site.emails.hello}
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-accent)] disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">Name *</span>
          <input type="text" name="name" required disabled={loading} className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">Company</span>
          <input type="text" name="company" disabled={loading} className={fieldClass} />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">Email *</span>
        <input type="email" name="email" required disabled={loading} className={fieldClass} />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">What do you need? *</span>
        <select
          name="interest"
          required
          disabled={loading}
          defaultValue={defaultInterest}
          className={fieldClass}
        >
          <option value="" disabled>
            Select…
          </option>
          {interests.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">Project details *</span>
        <textarea
          name="message"
          required
          rows={6}
          disabled={loading}
          placeholder="Tell us about the website, game, automation, or SaaS you want to build…"
          className={fieldClass}
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-red-300/40 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-[var(--color-surface)]" />}>
      <ContactFormInner />
    </Suspense>
  );
}
