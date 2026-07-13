import { site } from "@/lib/site";

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  website?: string;
  task?: string;
  botcheck?: boolean;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return Response.json(
      { error: "Contact form is not configured. Add WEB3FORMS_ACCESS_KEY in Vercel." },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.botcheck) {
    return Response.json({ success: true });
  }

  const name = body.name?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const task = body.task?.trim() ?? "";

  if (!name || !business || !email || !task) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Automation enquiry — ${business}`,
      from_name: name,
      email,
      replyto: email,
      message: [
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Website: ${website || "—"}`,
        "",
        "Repetitive task:",
        task,
      ].join("\n"),
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    return Response.json(
      { error: result.message ?? "Failed to send message. Please email us directly." },
      { status: 502 },
    );
  }

  return Response.json({
    success: true,
    inbox: site.emails.hello,
  });
}
