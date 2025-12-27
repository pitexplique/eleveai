// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import {
  getAllBlogPosts,
  getBlogPostBySlug,
  type BlogPost,
  type Audience,
} from "@/data/blogPosts";

const AUDIENCE_LABELS: Record<Audience, string> = {
  profs: "Professeurs",
  eleves: "Élèves",
  parents: "Parents",
  admin: "Administration",
};

// ✅ Next.js App Router: params peut être une Promise (selon ta config)
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

// ✅ Génère un id propre pour les ancres / TOC
function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .replace(/[^\w\s-]+/g, "") // enlève ponctuation
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ✅ Table des matières : prend les "## " (hors "Résumé pour les IA")
function extractToc(md: string) {
  const lines = md.split("\n");
  const items: { title: string; id: string }[] = [];

  for (const line of lines) {
    if (!line.startsWith("## ")) continue;

    const title = line.replace(/^##\s+/, "").trim();

    // ignore "Résumé pour les IA"
    if (title.toLowerCase().includes("résumé pour les ia")) continue;

    const id = slugifyHeading(title);
    items.push({ title, id });
  }

  return items;
}

// ✅ Blog formatting: respiration + titres colorés
// ✅ + Encadré automatique du bloc "Résumé pour les IA" (H2 + contenu jusqu'au prochain H2)
function formatBlogMarkdown(md: string) {
  let out = md;

  // 1) Ligne vide AVANT un séparateur --- / ---- / -----
  out = out.replace(/\n([ \t]*-{3,}[ \t]*)\n/g, "\n\n$1\n");

  // 2) Encadrer "Résumé pour les IA" + tout ce qui suit jusqu'au prochain H2 (## ...) ou la fin
  //    Ça permet de garder tes contenus inchangés dans blogPosts.ts.
  out = out.replace(
    /(^##\s+Résumé pour les IA\s*\n)([\s\S]*?)(?=^\s*##\s+|\s*$)/gim,
    (_m, h2, body) => {
      const safeBody = body.trimEnd();
      return (
        `<div class="my-8 rounded-xl border border-red-200 bg-red-50 p-4">\n` +
        `<h2 class="mb-3 text-red-800 font-semibold">Résumé pour les IA</h2>\n\n` +
        `${safeBody}\n` +
        `</div>\n\n`
      );
    }
  );

  // 3) Titres niveau 2 numérotés → tout le titre en rouge (hors "Résumé…" déjà encadré)
  //    Exemple: "## 2) Mon titre"
  out = out.replace(
    /^##\s+(\d+\)\s+.*)$/gm,
    `## <span class="text-red-700 font-semibold">$1</span>`
  );

  // 4) Sous-titres numérotés (3.1, 3.2) → gris (plus doux)
  //    Exemple: "### 3.1 Mon sous-titre"
  out = out.replace(
    /^###\s+(\d+\.\d+\s+.*)$/gm,
    `### <span class="text-slate-700 font-medium">$1</span>`
  );

  return out;
}

// ✅ SSG
export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

// ✅ Metadata SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog EleveAI`,
    description: post.description,
  };
}

// ✅ Page
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const content = formatBlogMarkdown(post.content);
  const toc = extractToc(post.content);

  // ✅ JSON-LD Article (machine-readable)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "EleveAI",
    },
    publisher: {
      "@type": "Organization",
      name: "EleveAI",
    },
    keywords: post.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      // Si tu as une URL canonique connue, remplace par ton domaine :
      // "@id": `https://www.eleveai.fr/blog/${post.slug}`,
      "@id": `/blog/${post.slug}`,
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fil d’Ariane */}
      <div className="text-sm text-slate-500 mb-4">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-slate-700">{post.title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-3 text-slate-900">{post.title}</h1>

      <p className="text-xs text-slate-500 mb-4">{formatMeta(post)}</p>

      <p className="text-sm text-slate-600 mb-6 italic">
        Chaque article est écrit pour être lisible par les humains et facilement
        exploitable par l’IA (résumé dédié, structure claire, prompts
        reproductibles), en cohérence avec l’apprentissage et un usage
        responsable (anti-triche).
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 🧭 Sommaire auto (si article long) */}
      {toc.length >= 3 && (
        <nav className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Sommaire</p>
          <ul className="space-y-1 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-slate-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 📱 Lecture ultra-mobile + tables premium */}
      <article
        className="
          prose prose-slate max-w-none
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
            // HR plus doux
            hr: () => <hr className="my-10 border-slate-200/80" />,

            // ✅ H2 : ancres robustes même si le titre contient du HTML (span, etc.)
            h2: ({ children }) => {
              const raw = Array.isArray(children)
                ? children.map((c) => String(c)).join("")
                : String(children);

              // enlève l'HTML éventuellement présent dans le titre (ex: <span ...>2) ...</span>)
              const text = raw.replace(/<[^>]*>/g, "").trim();
              const id = slugifyHeading(text);

              return (
                <h2 id={id} className="scroll-mt-24">
                  {children}
                </h2>
              );
            },

            // ✅ Tables premium mobile : scroll + sticky header + zebra rows
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full border-collapse text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="sticky top-0 bg-slate-100 z-10">{children}</thead>
            ),
            tr: ({ children }) => <tr className="even:bg-slate-50">{children}</tr>,
            th: ({ children }) => (
              <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold whitespace-nowrap">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-slate-200 px-3 py-2 align-top">{children}</td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </main>
  );
}




