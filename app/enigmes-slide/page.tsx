// /enigmes-slide — LE HUB DES ÉNIGMES À PROJETER (19/11/2026, Frédéric : « et
// crée un hub enigmes-slide »). Toutes les notions de maths du CP à la
// terminale, classe par classe, et pour chacune : ses 6 énigmes si elles sont
// faites (lien de projection), sinon « à venir ».
// Données : lib/enigmes/registre.ts ; notions : listerToutesLesNotions().
// ⛔ Le français est en pause : maths seules. ⛔ Aucun prix ici.

import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMME_CLASSES, listerToutesLesNotions } from "@/lib/programme";
import { enigmesHref, listerEnigmes } from "@/lib/enigmes/registre";

export const metadata: Metadata = {
  title: "Énigmes à projeter en classe, du CP à la terminale",
  description:
    "Six énigmes par notion de maths, à projeter au tableau : une par écran, un dessin, la réponse expliquée quand on veut. Fond ardoise ou blanc, lignes pour écrire au feutre.",
  alternates: { canonical: "https://www.eleveai.fr/enigmes-slide" },
};

export default function Page() {
  const notions = listerToutesLesNotions().filter((n) => n.matiere === "maths");
  const faites = listerEnigmes().length;
  const classes = PROGRAMME_CLASSES.filter((c) => notions.some((n) => n.classeSlug === c.slug));

  return (
    <main className="min-h-screen bg-[#1f2826] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-widest text-amber-200">En classe avec EleveAI</p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">🧩 Énigmes à projeter</h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-slate-200">
          Six énigmes par notion, une par écran, avec un dessin. On projette, la classe cherche, puis on
          montre la réponse expliquée. Fond ardoise ou blanc (touche T), lignes pour écrire au feutre
          (touche L), flèches pour changer, Espace pour la réponse.
        </p>
        <p className="mt-3 text-base font-bold text-emerald-200">
          {faites} notion{faites > 1 ? "s" : ""} prête{faites > 1 ? "s" : ""} sur {notions.length}. Les
          autres arrivent, classe par classe.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Classes">
          {classes.map((c) => {
            const nb = notions.filter((n) => n.classeSlug === c.slug && enigmesHref(c.slug, n.notionId)).length;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className={`rounded-xl px-3 py-1.5 text-sm font-black ring-1 ${
                  nb ? "bg-amber-200 text-slate-900 ring-amber-300" : "bg-white/5 text-slate-300 ring-white/15"
                }`}
              >
                {c.label}
                {nb ? ` · ${nb}` : ""}
              </a>
            );
          })}
        </nav>

        {classes.map((c) => {
          const liste = notions.filter((n) => n.classeSlug === c.slug);
          const pretes = liste.filter((n) => enigmesHref(c.slug, n.notionId)).length;
          return (
            <section key={c.slug} id={c.slug} className="mt-10 scroll-mt-24">
              <h2 className="text-2xl font-black">
                {c.label}{" "}
                <span className="text-base font-bold text-slate-300">
                  · {pretes} / {liste.length} notions prêtes
                </span>
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {liste.map((n) => {
                  const href = enigmesHref(c.slug, n.notionId);
                  return (
                    <li key={n.notionId}>
                      {href ? (
                        <Link
                          href={href}
                          className="flex h-full items-start gap-2 rounded-2xl bg-[#2f3d3a] p-3 font-bold ring-2 ring-[#6b4f2a] transition hover:brightness-110"
                        >
                          <span aria-hidden="true">✅</span>
                          <span>
                            <span className="block text-white">{n.label}</span>
                            <span className="block text-sm font-semibold text-amber-200">6 énigmes · projeter →</span>
                          </span>
                        </Link>
                      ) : (
                        <span className="flex h-full items-start gap-2 rounded-2xl bg-white/5 p-3 font-semibold text-slate-400 ring-1 ring-white/10">
                          <span aria-hidden="true">⏳</span>
                          <span>
                            <span className="block">{n.label}</span>
                            <span className="block text-sm">à venir</span>
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <p className="mt-12 text-sm font-semibold text-slate-400">
          Une idée d&apos;énigme, une erreur dans un calcul&nbsp;? Écrivez-nous depuis la page{" "}
          <Link href="/contact" className="underline">contact</Link>.
        </p>
      </div>
    </main>
  );
}
