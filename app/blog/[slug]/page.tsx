// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/data/blogPosts";
import { MarkdownMath } from "@/components/MarkdownMath";


type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  // ⬇️ NOUVEAUTÉ : on attend params
  const { slug } = await params;

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <p className="text-xs text-gray-500">
          {new Date(post.date).toLocaleDateString("fr-FR")} •{" "}
          {post.audience === "eleves" && "Public : élèves"}
          {post.audience === "profs" && "Public : professeurs"}
          {post.audience === "parents" && "Public : parents"}
          {post.audience === "direction" && "Public : direction"}
          {post.niveau ? ` • ${post.niveau}` : ""}
          {post.matiere ? ` • ${post.matiere}` : ""}
        </p>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-700">{post.description}</p>
      </header>

      {/* Résumé pour les IA */}
      <section className="rounded-xl border border-dashed bg-gray-50 p-4">
        <h2 className="mb-2 text-sm font-semibold">
          Résumé pour les IA (et pour les humains pressés)
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-gray-700">
          {post.resumeIA.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Contenu markdown */}
    <section className="prose max-w-none prose-headings:scroll-mt-20">
      <MarkdownMath>{post.content}</MarkdownMath>
    </section>

    </main>
  );
}
