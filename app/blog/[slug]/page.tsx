import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
// en haut du fichier (si pas déjà fait)
import Link from "next/link";

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
  direction: "Direction",
};

// 🧩 IMPORTANT : params est maintenant une Promise
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

// Optionnel mais propre : génération des slugs pour le SSG
export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

// ⚠️ Ici aussi : params est une Promise
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Blog EleveAI`,
    description: post.description,
  };
}

// ⚠️ Composant async + await params
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Fil d’Ariane */}
      <div className="text-sm text-slate-500 mb-4">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-slate-700">{post.title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

      <p className="text-xs text-slate-500 mb-4">{formatMeta(post)}</p>

      <p className="text-sm text-slate-600 mb-6 italic">
        Chaque article est écrit pour être lisible par les humains et
        facilement exploitable par l’IA (résumé dédié, structure claire,
        prompts reproductibles), en cohérence avec Eduscol et les principes
        de neurosciences de l’apprentissage.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <article className="prose prose-slate max-w-none prose-h1:text-2xl prose-h2:text-xl prose-p:leading-relaxed">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}

