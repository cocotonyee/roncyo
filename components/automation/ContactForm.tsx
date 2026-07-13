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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
      task: String(data.get("task") ?? ""),
      botcheck: data.get("botcheck") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
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
        <p className="text-lg font-semibold text-[var(--color-foreground)]">Thanks — we got your message.</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          We&apos;ll reply within one business day at the email you provided. You can also reach us at{" "}
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
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

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
              disabled={loading}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)] disabled:opacity-60"
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
          disabled={loading}
          placeholder="e.g. We manually send quote follow-ups every week and copy details from email into a spreadsheet..."
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)] disabled:opacity-60"
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
        {loading ? "Sending…" : "Send consultation request"}
      </button>
    </form>
  );
}
