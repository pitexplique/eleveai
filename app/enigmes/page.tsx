// /enigmes — LE HUB DES ÉNIGMES À PROJETER (19/11/2026, Frédéric : « et
// crée un hub enigmes-slide »). ⭐ Adresse /enigmes (Bing, 19/11 : « énigme
// mathématique » est bien plus cherché que « questions flash ») ; /enigmes-slide y redirige. Toutes les notions de maths du CP à la
// terminale, classe par classe, et pour chacune : ses 6 énigmes si elles sont
// faites (lien de projection), sinon « à venir ».
// ⭐ 19/11, Frédéric : « on peut pas rendre le hub plus joyeux » → fond clair,
// une couleur par cycle, Ti Margo, barre de progression par classe ; seules les
// énigmes elles-mêmes restent en ardoise (la lumière des salles).
// ⭐ 19/11 : le nom reste « énigmes » (Frédéric : « j'aime le mot énigme »).
// Données : lib/enigmes/registre.ts ; notions : listerToutesLesNotions().
// ⛔ Le français est en pause : maths seules. ⛔ Aucun prix ici.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROGRAMME_CLASSES, listerToutesLesNotions } from "@/lib/programme";
import { enigmesHref, listerEnigmes } from "@/lib/enigmes/registre";

export const metadata: Metadata = {
  title: "Énigmes mathématiques à projeter en classe, du CP à la terminale",
  description:
    "Énigmes mathématiques et questions flash à projeter au tableau, du CP à la terminale : six par notion, un dessin, un minuteur, la réponse expliquée quand on veut. Fond ardoise ou blanc, lignes pour écrire au feutre.",
  alternates: { canonical: "https://www.eleveai.fr/enigmes" },
};

type Teinte = { puce: string; carte: string; barre: string; titre: string; pale: string };
const TEINTES: Record<string, Teinte> = {
  ecole1: { puce: "bg-yellow-300 text-yellow-950", carte: "ring-yellow-300 hover:bg-yellow-50", barre: "bg-yellow-400", titre: "text-yellow-700", pale: "bg-yellow-50 text-yellow-900/70 ring-yellow-200" },
  ecole2: { puce: "bg-orange-300 text-orange-950", carte: "ring-orange-300 hover:bg-orange-50", barre: "bg-orange-400", titre: "text-orange-700", pale: "bg-orange-50 text-orange-900/70 ring-orange-200" },
  college1: { puce: "bg-emerald-300 text-emerald-950", carte: "ring-emerald-300 hover:bg-emerald-50", barre: "bg-emerald-500", titre: "text-emerald-700", pale: "bg-emerald-50 text-emerald-900/70 ring-emerald-200" },
  college2: { puce: "bg-sky-300 text-sky-950", carte: "ring-sky-300 hover:bg-sky-50", barre: "bg-sky-500", titre: "text-sky-700", pale: "bg-sky-50 text-sky-900/70 ring-sky-200" },
  lycee: { puce: "bg-violet-300 text-violet-950", carte: "ring-violet-300 hover:bg-violet-50", barre: "bg-violet-500", titre: "text-violet-700", pale: "bg-violet-50 text-violet-900/70 ring-violet-200" },
};
const teinteDe = (slug: string): Teinte =>
  ["cp", "ce1", "ce2"].includes(slug) ? TEINTES.ecole1
  : ["cm1", "cm2"].includes(slug) ? TEINTES.ecole2
  : ["6e", "5e"].includes(slug) ? TEINTES.college1
  : ["4e", "3e"].includes(slug) ? TEINTES.college2
  : TEINTES.lycee;

export default function Page() {
  const notions = listerToutesLesNotions().filter((n) => n.matiere === "maths");
  const faites = listerEnigmes().length;
  const classes = PROGRAMME_CLASSES.filter((c) => notions.some((n) => n.classeSlug === c.slug));

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-black uppercase tracking-widest text-emerald-700">En classe avec EleveAI</p>
            <h1 className="mt-2 text-4xl font-black leading-tight sm:text-6xl">
              🧩 Énigmes <span className="text-amber-500">à projeter</span>
            </h1>
            {/* 19/11, Frédéric : « énigme à projeter et en dessous questions flash avec un minuteur ». */}
            <p className="mt-2 text-2xl font-black text-sky-700 sm:text-3xl">⏱ et questions flash, avec un minuteur</p>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700">
              Six énigmes par notion, une par écran, avec un dessin. On projette, la classe cherche,
              on écrit au feutre, puis on montre la réponse expliquée.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm font-bold text-slate-700">
              <li className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">← → changer</li>
              <li className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">Espace : la réponse</li>
              <li className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">M : le minuteur</li>
              <li className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">T : ardoise ou blanc</li>
              <li className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">L : lignes pour écrire</li>
            </ul>
          </div>
          <div className="relative shrink-0">
            <div className="grid h-44 w-56 place-items-center rounded-xl bg-[#2f3d3a] p-4 text-center shadow-xl ring-8 ring-[#6b4f2a]">
              <p className="font-black leading-snug text-amber-200">
                Énigme 5 · Attention au piège
                <span className="mt-2 block text-2xl text-white">1/8 &gt; 1/4&nbsp;?</span>
              </p>
            </div>
            <Image
              src="/ti-margo/animations/saut-de-joie.png"
              alt="Ti Margo, le margouillat d'EleveAI, saute de joie"
              width={110}
              height={110}
              className="absolute -bottom-10 -left-12 h-28 w-28 object-contain drop-shadow"
            />
          </div>
        </header>

        <p className="mt-12 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
          ✨ {faites} notion{faites > 1 ? "s" : ""} prête{faites > 1 ? "s" : ""} sur {notions.length}.
          Les autres arrivent, classe par classe.
        </p>

        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Classes">
          {classes.map((c) => {
            const nb = notions.filter((n) => n.classeSlug === c.slug && enigmesHref(c.slug, n.notionId)).length;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className={`rounded-full px-4 py-1.5 text-sm font-black shadow-sm transition hover:scale-105 ${teinteDe(c.slug).puce}`}
              >
                {c.label}
                {nb ? ` · ${nb} 🧩` : ""}
              </a>
            );
          })}
        </nav>

        {classes.map((c) => {
          const t = teinteDe(c.slug);
          const liste = notions.filter((n) => n.classeSlug === c.slug);
          const pretes = liste.filter((n) => enigmesHref(c.slug, n.notionId)).length;
          return (
            <section key={c.slug} id={c.slug} className="mt-12 scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className={`text-3xl font-black ${t.titre}`}>{c.label}</h2>
                <p className="text-sm font-bold text-slate-600">
                  {pretes} / {liste.length} notions prêtes
                </p>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                <div className={`h-full rounded-full ${t.barre}`} style={{ width: `${(100 * pretes) / liste.length}%` }} />
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {liste.map((n) => {
                  const href = enigmesHref(c.slug, n.notionId);
                  return (
                    <li key={n.notionId}>
                      {href ? (
                        <Link
                          href={href}
                          className={`flex h-full items-center gap-3 rounded-2xl bg-white p-3 font-bold shadow-md ring-2 transition hover:-translate-y-0.5 ${t.carte}`}
                        >
                          <span
                            aria-hidden="true"
                            className="grid h-12 w-14 shrink-0 place-items-center rounded-md bg-[#2f3d3a] text-xl ring-4 ring-[#6b4f2a]"
                          >
                            🧩
                          </span>
                          <span>
                            <span className="block text-slate-900">{n.label}</span>
                            <span className="block text-sm font-black text-emerald-700">6 énigmes · projeter →</span>
                          </span>
                        </Link>
                      ) : (
                        <span className={`flex h-full items-center gap-3 rounded-2xl p-3 font-semibold ring-1 ${t.pale}`}>
                          <span aria-hidden="true" className="grid h-12 w-14 shrink-0 place-items-center rounded-md bg-white/80 text-xl">
                            ⏳
                          </span>
                          <span>
                            <span className="block">{n.label}</span>
                            <span className="block text-sm">bientôt</span>
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

        <p className="mt-14 text-center text-sm font-semibold text-slate-500">
          Une idée d&apos;énigme, une erreur dans un calcul&nbsp;? Écrivez-nous depuis la page{" "}
          <Link href="/contact" className="font-bold text-emerald-700 underline">contact</Link>.
        </p>
      </div>
    </main>
  );
}
