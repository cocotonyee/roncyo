import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  buildJsonLdScript,
  buildMetadata,
  getSiteProfile,
} from "@goship/core";
import {
  BlogConvertFloat,
  BlogConvertRail,
  BlogFaq,
  BlogPostHeader,
  BlogQuickAnswer,
  BlogRelated,
  BlogTags,
  BlogToc,
} from "@/components/blog";
import {
  blogPostToSeoDocument,
  getBlogPost,
  getRelatedPosts,
  listBlogPosts,
} from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getSiteProfile();
  const post = await getBlogPost(slug);

  if (!post) return { title: "Not found" };
  if (!profile) {
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/blog/${post.slug}` },
    };
  }

  return buildMetadata(
    profile,
    blogPostToSeoDocument(post, profile.siteId, profile.locale),
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getSiteProfile();
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const seoDoc = profile
    ? blogPostToSeoDocument(post, profile.siteId, profile.locale)
    : null;
  const jsonLd = profile && seoDoc ? buildJsonLdScript(profile, seoDoc) : null;
  const hasToc = post.headings.length > 0;

  return (
    <article className="relative mx-auto max-w-[1280px] px-5 py-12 pb-36 sm:px-8 lg:px-12 lg:py-16 xl:pb-16">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ) : null}

      <Link
        href="/blog"
        className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
      >
        Back to Journal
      </Link>

      {post.coverImage ? (
        <div className="mt-8 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="aspect-[21/9] w-full object-cover"
          />
        </div>
      ) : null}

      <div
        className={`mt-10 grid gap-10 ${
          hasToc
            ? "xl:grid-cols-[180px_minmax(0,1fr)_240px] xl:gap-12"
            : "xl:grid-cols-[minmax(0,1fr)_240px] xl:gap-12"
        }`}
      >
        {hasToc ? (
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <BlogToc headings={post.headings} />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 max-w-[42rem] justify-self-center xl:justify-self-stretch">
          <BlogPostHeader post={post} />

          <div className="mt-8 xl:hidden">
            <BlogToc headings={post.headings} />
          </div>

          {post.quickAnswer ? (
            <div className="mt-8">
              <BlogQuickAnswer text={post.quickAnswer} />
            </div>
          ) : null}

          <div
            className="prose-article mt-8"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          <BlogTags tags={post.tags} />
          <BlogFaq items={post.faq} />
        </div>

        <BlogConvertRail post={post} />
      </div>

      <BlogRelated posts={related} />
      <BlogConvertFloat post={post} />
    </article>
  );
}
