// app/eleve/page.tsx
import Link from "next/link";

export default function ElevePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Espace Élève – EleveAI</h1>
        <p className="text-lg text-gray-700">
          Ici, l’IA t’aide à <strong>réviser, comprendre et t’entraîner</strong>,
          sans tricher. Les activités sont conçues en respectant les programmes
          officiels Eduscol et les principes des neurosciences de l’apprentissage.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <h2 className="mb-2 text-lg font-semibold">Révisions</h2>
          <p className="text-sm text-gray-700">
            Revoir un chapitre, refaire des exercices, obtenir des explications
            adaptées à ton niveau.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="mb-2 text-lg font-semibold">Préparer un contrôle</h2>
          <p className="text-sm text-gray-700">
            Se faire poser des questions, vérifier ses réponses, repérer ses
            points faibles.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="mb-2 text-lg font-semibold">Défis & missions</h2>
          <p className="text-sm text-gray-700">
            Des petits défis pour progresser pas à pas, sans solutions toutes
            faites : c’est toi qui réfléchis, l’IA t’accompagne.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Pour tes parents</h2>
        <p className="text-sm text-gray-700">
          Tes parents peuvent découvrir la philosophie d’EleveAI, comment
          l’outil t’aide sans encourager la triche, et comment vous pouvez
          l’utiliser ensemble.
        </p>
        <Link
          href="/parents"
          className="inline-flex items-center rounded-lg border bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Accéder à l’espace Parents
        </Link>
      </section>
    </main>
  );
}
