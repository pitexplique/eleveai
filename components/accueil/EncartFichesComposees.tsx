// Encart « 🆕 Fiches à composer » de l'accueil : le composeur de fiches mis
// en avant pour les DEUX bâtisseurs — l'élève compose sa révision, le prof
// compose son cours (effet IKEA des deux côtés, manifeste prof-élève).
// Présentation pure : aucun état, deux colonnes, deux CTA.

import Link from "next/link";

export default function EncartFichesComposees() {
  return (
    <section className="px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-300 ring-1 ring-amber-300/30">
            🆕 Nouveau
          </span>
          <h2 className="text-lg font-black text-white sm:text-xl">
            Des fiches de cours qui se composent
          </h2>
        </div>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">
          Chaque fiche de maths est en blocs — Définition, Propriétés, « À quoi
          ça sert dans le réel », un peu d&apos;histoire, exemples corrigés,
          entraînement. Connecté, tu coches tes rubriques, tu choisis ton
          ordre : la fiche devient la tienne.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-black text-emerald-300">🎓 Élève</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">
              Compose ta fiche de révision et retourne-la en flashcards pour te
              tester — ta composition te suit partout.
            </p>
            <Link
              href="/fiches-cours/maths"
              className="mt-3 inline-flex rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-400"
            >
              Voir les fiches de maths
            </Link>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-black text-sky-300">🍎 Enseignant</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">
              Composez votre fiche comme vous faites cours — mode classe,
              impression PDF, retrouvée dans votre tableau de bord.
            </p>
            <Link
              href="/fiches-cours/maths"
              className="mt-3 inline-flex rounded-xl bg-sky-500 px-4 py-2 text-sm font-black text-white transition hover:bg-sky-400"
            >
              Voir toutes les fiches de maths
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs font-bold text-slate-400">
          « Le cours est fait par les élèves et les profs — pas l&apos;un sans
          l&apos;autre. »
        </p>
      </div>
    </section>
  );
}
