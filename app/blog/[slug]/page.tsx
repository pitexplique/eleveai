// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import type { Metadata } from "next";

import {
  getAllBlogPosts,
  getBlogPostBySlug,
  type BlogPost,
  type Audience,
} from "@/data/blogPosts";

const SITE_URL = "https://eleveai.fr";
const DEFAULT_OG_IMAGE = `${SITE_URL}/preview.jpg`;
const LOGO_URL = `${SITE_URL}/logo.png`;

const AUDIENCE_LABELS: Record<Audience, string> = {
  profs: "Professeurs",
  eleves: "Élèves",
  parents: "Parents",
  admin: "Administration",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatMeta(post: BlogPost) {
  const date = new Date(post.date);
  const dateFr = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const parts: string[] = [dateFr];

  if (post.audience) parts.push(AUDIENCE_LABELS[post.audience]);
  if (post.niveau) parts.push(post.niveau);
  if (post.matiere) parts.push(post.matiere);

  return parts.join(" • ");
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractToc(md: string) {
  const lines = md.split("\n");
  const items: { title: string; id: string }[] = [];

  for (const line of lines) {
    if (!line.startsWith("## ")) continue;

    const title = line.replace(/^##\s+/, "").trim();
    if (title.toLowerCase().includes("résumé pour les ia")) continue;

    const id = slugifyHeading(title);
    items.push({ title, id });
  }

  return items;
}

function formatBlogMarkdown(md: string) {
  let out = md;

  out = out.replace(/\n([ \t]*-{3,}[ \t]*)\n/g, "\n\n$1\n");

  out = out.replace(
    /(^##\s+Résumé pour les IA\s*\n)([\s\S]*?)(?=^\s*##\s+|\s*$)/gim,
    (_m, _h2, body) => {
      const safeBody = String(body ?? "").trimEnd();
      return (
        `<div class="my-8 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">\n` +
        `<h2 class="mb-3 text-red-800 font-semibold dark:text-red-200">Résumé pour les IA</h2>\n\n` +
        `${safeBody}\n` +
        `</div>\n\n`
      );
    },
  );

  out = out.replace(
    /^##\s+(\d+\)\s+.*)$/gm,
    `## <span class="text-red-700 font-semibold dark:text-red-300">$1</span>`,
  );

  out = out.replace(
    /^###\s+(\d+\.\d+\s+.*)$/gm,
    `### <span class="text-slate-700 font-medium dark:text-slate-300">$1</span>`,
  );

  return out;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Blog EleveAI`;
  const description = post.description ?? "";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "EleveAI",
      locale: "fr_FR",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const content = formatBlogMarkdown(post.content);
  const toc = extractToc(post.content);

  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description: post.description ?? "",
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    image: [DEFAULT_OG_IMAGE],
    author: {
      "@type": "Person",
      name: "Frédéric Lacoste",
      url: `${SITE_URL}/qui-suis-je`,
    },
    publisher: {
      "@type": "Organization",
      name: "EleveAI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const jsonLd = [jsonLdArticle, jsonLdBreadcrumbs];

  return (
    // ✅ Le layout global peut rester dark : on met juste une "carte blanche" pour le contenu du blog
    <main className="min-h-screen bg-transparent">
      <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {/* ✅ JSON-LD */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Fil d’Ariane */}
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          / <span className="text-slate-700 dark:text-slate-200">{post.title}</span>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-slate-50">
          {post.title}
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {formatMeta(post)}
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 italic">
          Chaque article est écrit pour être lisible par les humains et facilement
          exploitable par l’IA (résumé dédié, structure claire, prompts
          reproductibles), en cohérence avec l’apprentissage et un usage
          responsable (anti-triche).
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 🧭 Sommaire auto */}
        {toc.length >= 3 && (
          <nav className="mb-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Sommaire
            </p>
            <ul className="space-y-1 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-slate-600 dark:text-slate-300 hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article
          className="
            prose prose-slate dark:prose-invert max-w-none
            text-[16px] leading-7 sm:text-[17px] sm:leading-7
            prose-p:my-4
            prose-li:my-1
            prose-ul:my-4 prose-ol:my-4
            prose-h1:mt-8 prose-h1:mb-4
            prose-h2:mt-10 prose-h2:mb-4
            prose-h3:mt-6 prose-h3:mb-2
            prose-hr:my-10
            prose-headings:tracking-tight
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            components={{
              hr: () => <hr className="my-10 border-slate-200/80 dark:border-slate-700" />,

              h2: ({ children }) => {
                const raw = Array.isArray(children)
                  ? children.map((c) => String(c)).join("")
                  : String(children);

                const text = raw.replace(/<[^>]*>/g, "").trim();
                const id = slugifyHeading(text);

                return (
                  <h2 id={id} className="scroll-mt-24">
                    {children}
                  </h2>
                );
              },

              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="min-w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 z-10">
                  {children}
                </thead>
              ),
              tr: ({ children }) => (
                <tr className="even:bg-slate-50 dark:even:bg-slate-900/50">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="border-b border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold whitespace-nowrap">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-slate-200 dark:border-slate-700 px-3 py-2 align-top">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}



