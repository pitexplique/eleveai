import Image from "next/image";
import Link from "next/link";

const EMAIL = "eleveai974@gmail.com";

const ideas = [
  "l'île de La Réunion",
  "un margouillat",
  "le nom EleveAI",
  "le symbole epsilon → infini",
  "des couleurs lisibles",
  "une version simple que l'on reconnaît vite",
];

export default function ConcoursLogoPage() {
  return (
    <main className="min-h-screen bg-[#041B33] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-[#041B33] via-[#062A4F] to-[#071f3a] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
              Concours logo EleveAI
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
              Imagine le prochain logo avec La Réunion et un margouillat.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-cyan-100/80 sm:text-lg">
              Les élèves peuvent proposer une version du logo EleveAI. L'idée :
              garder l'esprit <span className="text-amber-200">epsilon → flèche → infini</span>,
              mais y ajouter une touche réunionnaise.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/modeles/concours-logo-eleveai.svg"
                download
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Télécharger le modèle
              </a>
              <span className="inline-flex items-center justify-center rounded-full border border-cyan-200/40 bg-white/10 px-5 py-3 text-sm font-black text-cyan-100">
                {EMAIL}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-white/60">
              Envoie ton logo à cette adresse avec ton prénom, ta classe et ton établissement.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-5 shadow-2xl">
            <div className="relative mx-auto h-44 w-full">
              <Image
                src="/logo-eleveai-header.svg"
                alt="Logo EleveAI epsilon flèche infini"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-sm font-black text-amber-100">
                Le défi
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">
                Transformer cette signature en logo d'élève : simple, reconnaissable,
                et fier de La Réunion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-black text-white">Ce qu'il faut dessiner</h2>
            <ul className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-white/70">
              {ideas.map((idea) => (
                <li key={idea} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-black text-white">Comment participer</h2>
            <ol className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-white/70">
              <li>1. Télécharge le modèle ou crée ton logo sur une feuille.</li>
              <li>2. Dessine une proposition claire et lisible.</li>
              <li>3. Prends une photo nette ou exporte ton fichier.</li>
              <li>4. Envoie-le par email avec ton prénom et ta classe.</li>
            </ol>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-black text-white">Formats acceptés</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["JPG", "PNG", "PDF", "SVG", "Photo nette"].map((format) => (
                <span
                  key={format}
                  className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-black text-cyan-100"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-white/70">
              Le logo pourra être affiché sur EleveAI avec le prénom et la classe de l'élève,
              jamais le nom de famille.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Prêt à proposer ton logo ?</h2>
            <p className="mt-1 text-sm font-semibold text-white/70">
              Ajoute ton fichier en pièce jointe et envoie-le à {EMAIL}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/modeles/concours-logo-eleveai.svg"
              download
              className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#041B33] transition hover:-translate-y-0.5"
            >
              Modèle
            </a>
            <span className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-slate-950">
              {EMAIL}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl">
          <Link href="/accueil" className="text-sm font-black text-cyan-200 hover:text-cyan-100">
            Retour à l'accueil EleveAI
          </Link>
        </div>
      </section>
    </main>
  );
}
