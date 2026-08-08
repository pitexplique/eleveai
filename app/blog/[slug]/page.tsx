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
import GoogleFollowChip from "@/components/GoogleFollowChip";
import PontCoach from "@/components/PontCoach";

const SITE_URL = "https://www.eleveai.fr";
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

    items.push({ title, id: slugifyHeading(title) });
  }

  return items;
}

function formatBlogMarkdown(md: string) {
  let out = md;

  out = out.replace(
    /(^##\s+Résumé pour les IA\s*\n)([\s\S]*?)(?=^\s*##\s+|\s*$)/gim,
    (_m, _h2, body) => {
      const safeBody = String(body ?? "").trimEnd();
      return (
        `<div class="my-8 rounded-xl border border-red-200 bg-red-50 p-4">\n` +
        `<h2 class="mb-3 text-red-700 font-semibold">Résumé pour les IA</h2>\n\n` +
        `${safeBody}\n` +
        `</div>\n\n`
      );
    },
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
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    image: DEFAULT_OG_IMAGE,
    author: { "@type": "Person", name: "Frédéric Lacoste" },
    publisher: {
      "@type": "Organization",
      name: "EleveAI",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Carte blanche */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          {/* Fil d’Ariane */}
          <div className="text-sm text-slate-500 mb-4">
            <Link href="/blog" className="hover:underline text-emerald-700">
              Blog
            </Link>{" "}
            / <span className="text-slate-700">{post.title}</span>
          </div>

          <h1 className="text-3xl font-extrabold mb-3">{post.title}</h1>

          <p className="text-xs text-slate-500 mb-4">{formatMeta(post)}</p>

          <p className="text-sm text-slate-600 mb-6 italic">
            Article conçu pour être clair pour les humains et exploitable par l’IA,
            dans un cadre pédagogique responsable.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Sommaire */}
          {toc.length >= 3 && (
            <nav className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Sommaire
              </p>
              <ul className="space-y-1 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-slate-600 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Google Follow */}
          <div className="flex justify-center mb-8">
            <GoogleFollowChip />
          </div>

          {/* Contenu */}
          <article
            className="
              prose prose-slate max-w-none
              text-[16px] leading-7 sm:text-[17px]
              prose-h2:mt-12 prose-h2:mb-4
              prose-h3:mt-8
              prose-hr:my-10
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  const id = slugifyHeading(text);
                  return <h2 id={id}>{children}</h2>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Le pont vers le coach (règle 24/07) : l'article est une porte,
            l'entraînement est la destination. */}
        <PontCoach
          className="mt-6"
          accroche="Tu as lu — maintenant, entraîne-toi :"
          href="/coach-ia/maths?from=blog"
          label="🧮 Le coach t'entraîne, gratuit et sans jugement →"
          teinte="emerald"
        />
      </div>
    </main>
  );
}
