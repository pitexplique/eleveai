// app/blog/page.tsx
import Link from "next/link";
import { getAllBlogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Blog EleveAI</h1>
        <p className="text-gray-700">
          Articles pour <strong>profs, élèves, parents et directions</strong> :
          IA à l’école, neurosciences, méthodes de travail, exemples de prompts
          conformes à Eduscol.
        </p>
        <p className="text-xs text-gray-500">
          Chaque article est écrit pour être lisible par les humains et{" "}
          <strong>facilement exploitable par l’IA</strong> (structure claire,
          résumé dédié, prompts reproductibles).
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex h-full flex-col justify-between rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString("fr-FR")} •{" "}
                {post.audience === "eleves" && "Élèves"}
                {post.audience === "profs" && "Professeurs"}
                {post.audience === "parents" && "Parents"}
                {post.audience === "direction" && "Direction"}
                {post.niveau ? ` • ${post.niveau}` : ""}
                {post.matiere ? ` • ${post.matiere}` : ""}
              </p>
              <p className="text-sm text-gray-700">{post.description}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Lire l’article →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
