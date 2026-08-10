/**
 * LOCKED GoShip Site blog contract — keep in sync with:
 * GoShip/site/templates/goship-starter/src/lib/blog.ts
 *
 * Skin lives in components/blog/* only. Do not fork this schema/parser.
 */
import fs from "node:fs";
import path from "node:path";
import { marked, type Tokens } from "marked";
import {
  getDocumentBySlug,
  listPublishedDocuments,
  type SeoDocument,
  type SeoEntity,
  type SeoFaqItem,
} from "@goship/core";

export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
  url?: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author?: BlogAuthor;
  coverImage?: string;
  coverImageAlt?: string;
  ogImage?: string;
  category?: string;
  tags: string[];
  keywords: string[];
  wordCount: number;
  readTime: string;
  faq: BlogFaqItem[];
  relatedSlugs: string[];
  quickAnswer?: string;
  canonicalPath?: string;
  draft: boolean;
  noindex: boolean;
  locale?: string;
  entities: SeoEntity[];
  bodyMarkdown: string;
  bodyHtml: string;
  headings: BlogHeading[];
}

export const BLOG_POSTS_PER_PAGE = 6;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type YamlPrimitive = string | number | boolean | null;
type YamlValue = YamlPrimitive | YamlValue[] | { [key: string]: YamlValue };

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(raw: string): YamlPrimitive {
  const value = stripQuotes(raw.trim());
  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null" || value === "~") return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

/** Minimal indented YAML subset for blog frontmatter (maps + sequences). */
function parseIndentedYaml(src: string): Record<string, YamlValue> {
  const lines = src
    .split(/\r?\n/)
    .map((line) => line.replace(/\t/g, "  "))
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));

  const root: Record<string, YamlValue> = {};
  type Frame = {
    indent: number;
    container: Record<string, YamlValue> | YamlValue[];
    pendingKey?: string;
  };
  const stack: Frame[] = [{ indent: -1, container: root }];
  const current = () => stack[stack.length - 1]!;

  const peekIsSequence = (from: number, parentIndent: number): boolean => {
    for (let j = from + 1; j < lines.length; j++) {
      const next = lines[j]!;
      const nextIndent = next.match(/^ */)?.[0].length ?? 0;
      if (nextIndent <= parentIndent) return false;
      return next.slice(nextIndent).startsWith("- ");
    }
    return false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const indent = line.match(/^ */)?.[0].length ?? 0;
    const content = line.slice(indent);

    while (stack.length > 1 && indent <= current().indent) {
      stack.pop();
    }

    const frame = current();

    const seqMatch = content.match(/^- (.*)$/);
    if (seqMatch) {
      const rest = seqMatch[1] ?? "";
      let list: YamlValue[] | null = null;
      if (Array.isArray(frame.container)) {
        list = frame.container;
      } else if (frame.pendingKey) {
        const existing = frame.container[frame.pendingKey];
        if (Array.isArray(existing)) {
          list = existing;
        } else {
          list = [];
          frame.container[frame.pendingKey] = list;
        }
      }
      if (!list) continue;

      const kv = rest.match(/^([\w.-]+):\s*(.*)$/);
      if (kv) {
        const obj: Record<string, YamlValue> = {};
        const childKey = kv[1]!;
        const childRaw = kv[2]!;
        if (childRaw === "") {
          if (peekIsSequence(i, indent)) {
            obj[childKey] = [];
            list.push(obj);
            stack.push({ indent, container: obj, pendingKey: childKey });
          } else {
            const child: Record<string, YamlValue> = {};
            obj[childKey] = child;
            list.push(obj);
            stack.push({ indent, container: child });
          }
        } else {
          obj[childKey] = parseScalar(childRaw);
          list.push(obj);
          stack.push({ indent, container: obj });
        }
      } else {
        list.push(parseScalar(rest));
      }
      continue;
    }

    const kvMatch = content.match(/^([\w.-]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const key = kvMatch[1]!;
    const rawVal = kvMatch[2]!;

    if (Array.isArray(frame.container)) {
      const last = frame.container[frame.container.length - 1];
      if (last && typeof last === "object" && !Array.isArray(last)) {
        if (rawVal === "") {
          if (peekIsSequence(i, indent)) {
            last[key] = [];
            stack.push({ indent, container: last, pendingKey: key });
          } else {
            const child: Record<string, YamlValue> = {};
            last[key] = child;
            stack.push({ indent, container: child });
          }
        } else {
          last[key] = parseScalar(rawVal);
        }
      }
      continue;
    }

    const map = frame.container;

    if (rawVal === "") {
      if (peekIsSequence(i, indent)) {
        map[key] = [];
        stack.push({ indent, container: map, pendingKey: key });
      } else {
        const child: Record<string, YamlValue> = {};
        map[key] = child;
        stack.push({ indent, container: child });
      }
    } else if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      const inner = rawVal.slice(1, -1).trim();
      map[key] = inner
        ? inner.split(",").map((part) => parseScalar(part.trim()))
        : [];
    } else {
      map[key] = parseScalar(rawVal);
    }
  }

  return root;
}

function asString(value: YamlValue | undefined, fallback = ""): string {
  if (value == null) return fallback;
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") return value ? "true" : "false";
  return fallback;
}

function asStringList(value: YamlValue | undefined): string[] {
  if (value == null) return [];
  if (typeof value === "string") {
    return value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return String(item).trim();
        }
        return "";
      })
      .filter(Boolean);
  }
  return [];
}

function asBool(value: YamlValue | undefined, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value === "true" || value === "1" || value === "yes";
  }
  return fallback;
}

function asAuthor(value: YamlValue | undefined): BlogAuthor | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    if (typeof value === "string" && value.trim()) {
      return { name: value.trim() };
    }
    return undefined;
  }
  const name = asString(value.name).trim();
  if (!name) return undefined;
  return {
    name,
    avatar: asString(value.avatar) || undefined,
    role: asString(value.role) || undefined,
    url: asString(value.url) || undefined,
  };
}

function asFaq(value: YamlValue | undefined): BlogFaqItem[] {
  if (!Array.isArray(value)) return [];
  const items: BlogFaqItem[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const question = asString(entry.question).trim();
    const answer = asString(entry.answer).trim();
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

function asEntities(value: YamlValue | undefined): SeoEntity[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set([
    "Product",
    "SoftwareApplication",
    "Organization",
    "Thing",
  ]);
  const items: SeoEntity[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const name = asString(entry.name).trim();
    const type = asString(entry.type, "Thing").trim();
    if (!name || !allowed.has(type)) continue;
    items.push({
      name,
      type: type as SeoEntity["type"],
      description: asString(entry.description) || undefined,
      url: asString(entry.url) || undefined,
    });
  }
  return items;
}

function parseFrontmatter(raw: string): {
  data: Record<string, YamlValue>;
  body: string;
} {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw.trim() };
  }
  const end = raw.indexOf("---", 3);
  if (end < 0) {
    return { data: {}, body: raw.trim() };
  }
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  return { data: parseIndentedYaml(fm), body };
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/gi, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function countWords(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/[#>*_\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return 0;
  const cjk = plain.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latin = plain
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return cjk + latin;
}

function formatReadTime(wordCount: number, override?: string): string {
  if (override?.trim()) return override.trim();
  const minutes = Math.max(1, Math.round(wordCount / 220));
  return `${minutes} min read`;
}

function extractHeadings(markdown: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const used = new Map<string, number>();
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1]!.length as 2 | 3;
    const text = match[2]!.replace(/#+\s*$/, "").trim();
    if (!text) continue;
    let id = slugifyHeading(text);
    const count = used.get(id) ?? 0;
    used.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    headings.push({ id, text, depth });
  }
  return headings;
}

function renderMarkdown(markdown: string, headings: BlogHeading[]): string {
  const idQueue = headings.map((h) => h.id);
  let headingIndex = 0;

  const renderer = new marked.Renderer();
  renderer.heading = function heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    const id =
      depth >= 2 && depth <= 3 && headingIndex < idQueue.length
        ? idQueue[headingIndex++]
        : slugifyHeading(
            tokens
              .map((t) => ("text" in t ? String(t.text ?? "") : ""))
              .join(""),
          );
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  return marked.parse(markdown, { async: false, renderer }) as string;
}

function readPostFile(filePath: string, slug: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const title = asString(data.title).trim();
  if (!title) return null;

  const draft = asBool(data.draft, false);
  const date =
    asString(data.date).trim() || new Date().toISOString().slice(0, 10);
  const updated = asString(data.updated).trim() || date;
  const tags = asStringList(data.tags);
  const keywords = asStringList(data.keywords);
  const wordCountOverride = Number(asString(data.wordCount));
  const wordCount =
    Number.isFinite(wordCountOverride) && wordCountOverride > 0
      ? wordCountOverride
      : countWords(body);
  const headings = extractHeadings(body);
  const bodyHtml = renderMarkdown(body, headings);

  const fmSlug = asString(data.slug).trim();

  return {
    slug: fmSlug || slug,
    title,
    description: asString(data.description).trim() || title,
    date,
    updated,
    author: asAuthor(data.author),
    coverImage: asString(data.coverImage).trim() || undefined,
    coverImageAlt: asString(data.coverImageAlt).trim() || undefined,
    ogImage: asString(data.ogImage).trim() || undefined,
    category: asString(data.category).trim() || undefined,
    tags,
    keywords: keywords.length > 0 ? keywords : tags,
    wordCount,
    readTime: formatReadTime(wordCount, asString(data.readTime)),
    faq: asFaq(data.faq),
    relatedSlugs: asStringList(data.relatedSlugs),
    quickAnswer: asString(data.quickAnswer).trim() || undefined,
    canonicalPath: asString(data.canonical).trim() || undefined,
    draft,
    noindex: asBool(data.noindex, false),
    locale: asString(data.locale).trim() || undefined,
    entities: asEntities(data.entities),
    bodyMarkdown: body,
    bodyHtml,
    headings,
  };
}

/** Map SeoDocument (DB) → BlogPost for existing skin / TOC / FAQ. */
export function seoDocumentToBlogPost(doc: SeoDocument): BlogPost {
  const date = (doc.publishedAt ?? doc.createdAt).slice(0, 10);
  const updated = doc.updatedAt.slice(0, 10);
  const wordCount =
    doc.wordCount && doc.wordCount > 0
      ? doc.wordCount
      : countWords(doc.body);
  const headings = extractHeadings(doc.body);
  const bodyHtml = renderMarkdown(doc.body, headings);

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    date,
    updated,
    author: doc.author
      ? {
          name: doc.author.name,
          avatar: doc.author.image,
          role: doc.author.role,
          url: doc.author.url,
        }
      : undefined,
    coverImage: doc.image,
    coverImageAlt: doc.imageAlt,
    ogImage: doc.image,
    category: doc.category,
    tags: doc.tags ?? [],
    keywords: doc.keywords ?? doc.tags ?? [],
    wordCount,
    readTime: formatReadTime(wordCount),
    faq: doc.faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    relatedSlugs: doc.relatedSlugs ?? [],
    quickAnswer: doc.quickAnswer,
    canonicalPath: doc.canonicalPath,
    draft: doc.status !== "published",
    noindex: doc.noindex ?? false,
    locale: doc.locale,
    entities: doc.entities,
    bodyMarkdown: doc.body,
    bodyHtml,
    headings,
  };
}

/** File-seed posts only (excludes draft). Sorted newest-first. */
export function listFileBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .filter((f) => f.toLowerCase() !== "readme.md");

  const posts: BlogPost[] = [];
  for (const file of files) {
    const fileSlug = file.replace(/\.(md|mdx)$/, "");
    const post = readPostFile(path.join(BLOG_DIR, file), fileSlug);
    if (post && !post.draft) posts.push(post);
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Published posts: Supabase `seo_documents` ∪ file seeds.
 * Same slug → DB wins. Soft-fail when DB unavailable.
 */
export async function listBlogPosts(): Promise<BlogPost[]> {
  const filePosts = listFileBlogPosts();
  const bySlug = new Map(filePosts.map((p) => [p.slug, p]));

  try {
    const docs = await listPublishedDocuments();
    for (const doc of docs) {
      if (doc.noindex) continue;
      bySlug.set(doc.slug, seoDocumentToBlogPost(doc));
    }
  } catch {
    // Null Object: keep file seeds
  }

  return Array.from(bySlug.values()).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const doc = await getDocumentBySlug(slug);
    if (doc && !doc.noindex) return seoDocumentToBlogPost(doc);
  } catch {
    // fall through to files
  }

  for (const ext of [".md", ".mdx"] as const) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const post = readPostFile(filePath, slug);
      if (post && !post.draft) return post;
    }
  }
  const files = await listBlogPosts();
  return files.find((p) => p.slug === slug) ?? null;
}

export type BlogSort = "newest" | "oldest" | "title";

export interface BlogListQuery {
  page?: number;
  category?: string;
  sort?: BlogSort;
  q?: string;
}

export interface BlogListResult {
  posts: BlogPost[];
  total: number;
  page: number;
  pageCount: number;
  categories: string[];
}

export function listBlogCategories(posts: BlogPost[]): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    if (post.category) set.add(post.category);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function queryBlogPosts(
  query: BlogListQuery = {},
): Promise<BlogListResult> {
  const all = await listBlogPosts();
  const categories = listBlogCategories(all);
  const category = query.category?.trim();
  const q = query.q?.trim().toLowerCase();
  const sort = query.sort ?? "newest";

  let filtered = all;
  if (category && category !== "all") {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase(),
    );
  }
  if (q) {
    filtered = filtered.filter((p) => {
      const hay = [
        p.title,
        p.description,
        p.category ?? "",
        ...p.tags,
        ...p.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "oldest") return a.date < b.date ? -1 : 1;
    if (sort === "title") return a.title.localeCompare(b.title);
    return a.date < b.date ? 1 : -1;
  });

  const pageCount = Math.max(1, Math.ceil(sorted.length / BLOG_POSTS_PER_PAGE));
  const page = Math.min(Math.max(1, query.page ?? 1), pageCount);
  const start = (page - 1) * BLOG_POSTS_PER_PAGE;
  const posts = sorted.slice(start, start + BLOG_POSTS_PER_PAGE);

  return { posts, total: sorted.length, page, pageCount, categories };
}

export async function getRelatedPosts(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  const all = (await listBlogPosts()).filter((p) => p.slug !== post.slug);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const picked: BlogPost[] = [];

  for (const slug of post.relatedSlugs) {
    const hit = bySlug.get(slug);
    if (hit) {
      picked.push(hit);
      bySlug.delete(slug);
    }
    if (picked.length >= limit) return picked;
  }

  const scored = Array.from(bySlug.values())
    .map((candidate) => {
      let score = 0;
      if (
        post.category &&
        candidate.category &&
        post.category.toLowerCase() === candidate.category.toLowerCase()
      ) {
        score += 5;
      }
      for (const tag of post.tags) {
        if (candidate.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
          score += 2;
        }
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || (a.candidate.date < b.candidate.date ? 1 : -1));

  for (const { candidate } of scored) {
    if (picked.length >= limit) break;
    picked.push(candidate);
  }

  return picked;
}

/** Adapt BlogPost → SeoDocument for metadata / JSON-LD / sitemap helpers. */
export function blogPostToSeoDocument(
  post: BlogPost,
  siteId: string,
  locale = "en",
): SeoDocument {
  const published = new Date(post.date).toISOString();
  const updated = new Date(post.updated).toISOString();
  const faq: SeoFaqItem[] = post.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return {
    id: `blog:${post.slug}`,
    siteId,
    slug: post.slug,
    title: post.title,
    description: post.description,
    body: post.bodyMarkdown,
    locale: post.locale || locale,
    status: "published",
    faq,
    entities: post.entities,
    createdAt: published,
    updatedAt: updated,
    publishedAt: published,
    canonicalPath: post.canonicalPath,
    tags: post.tags,
    keywords: post.keywords,
    category: post.category,
    image: post.ogImage || post.coverImage,
    imageAlt: post.coverImageAlt,
    author: post.author
      ? {
          name: post.author.name,
          url: post.author.url,
          image: post.author.avatar,
          role: post.author.role,
        }
      : undefined,
    wordCount: post.wordCount,
    noindex: post.noindex,
    relatedSlugs: post.relatedSlugs,
    quickAnswer: post.quickAnswer,
  };
}

export function blogHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function formatBlogDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
