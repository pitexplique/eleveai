// app/blog/page.tsx

import Link from "next/link";
import { getAllBlogPosts, type BlogPost, type Audience } from "@/data/blogPosts";

const AUDIENCE_LABELS: Record<Audience, string> = {
  profs: "Professeurs",
  eleves: "Élèves",
  parents: "Parents",
  direction: "Direction",
};

function formatMeta(post: BlogPost) {
  const date = new Date(post.date);
  const dateFr = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const parts = [dateFr];

  if (post.audience) parts.push(AUDIENCE_LABELS[post.audience]);
  if (post.niveau) parts.push(post.niveau);
  if (post.matiere) parts.push(post.matiere);

  return parts.join(" • ");
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // plus récent en premier

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Blog EleveAI</h1>

      <p className="text-slate-700 mb-2">
        Articles pour <strong>profs, élèves, parents et directions</strong> :
        IA à l’école, neurosciences, méthodes de travail, exemples de prompts
        conformes à Eduscol.
      </p>
      <p className="text-sm text-blue-700 font-semibold mb-8">
        Cette page applique Eduscol + neurosciences (structure claire, résumés
        dédiés, prompts reproductibles).
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2">
                {post.title}
              </h2>

              <p className="text-xs text-slate-500 mb-3">
                {formatMeta(post)}
              </p>

              <p className="text-sm text-slate-700 mb-4">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline"
              >
                Lire l’article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

