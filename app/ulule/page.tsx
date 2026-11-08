// /ulule — L'ENTRÉE DES PARENTS QUI ARRIVENT DE LA COLLECTE (08/11/2026).
//
// Le parent vient de lire sur Ulule : « Ti Margo : les maths en dessin animé »,
// « un coach qui suit chaque compétence de votre enfant », « essayez gratuitement,
// sans compte ». Il doit retrouver ici, dès le premier écran, ces trois choses-là,
// dans les mêmes mots, puis (quand la collecte est en ligne) son code à activer.
// Diagnostic complet de l'accueil vu par ce parent : session du 08/11.
//
// ⭐ C'est l'adresse à mettre sur Ulule à la place de /coach : /coach reste celle
// des vidéos YouTube (elle compte ses visites comme venant de YouTube). D'ici,
// le coach s'ouvre avec utm_source=ulule.
// ⛔ Tout ce qui parle de la collecte, des prix fondateurs et des codes dépend de
// lib/collecte.ts (`COLLECTE.enLigne`, `COLLECTE.codesActifs`) : éteint tant
// qu'Ulule n'a pas validé le projet.
// ⛔ « Le premier site » (sous-titre Ulule) n'est PAS repris : un superlatif doit
// pouvoir se prouver. Et « du CP » plutôt que « de la grande section » : le coach
// commence au CP.
// ⛔ Ne nommer aucun concurrent.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Bell, CheckCircle2, Gift, KeyRound, PlayCircle, Target } from "lucide-react";
import { toutesLesVideos, urlR2 } from "@/lib/videos/r2";
import { COACH_DEPUIS_ULULE, COLLECTE } from "@/lib/collecte";

export const metadata: Metadata = {
  title: { absolute: "Ti Margo : les maths en dessin animé — EleveAI" },
  description:
    "Un site qui suit chaque compétence de votre enfant en maths, avec les dessins animés de Ti Margo, du CP à la terminale. Essayez gratuitement, sans compte.",
  // Indexée seulement quand la collecte est en ligne.
  robots: COLLECTE.enLigne ? undefined : { index: false, follow: false },
  openGraph: {
    title: "Ti Margo : les maths en dessin animé",
    description: "Un coach qui suit chaque compétence de votre enfant en maths, avec des dessins animés.",
    images: [{ url: "/ulule/image-principale.png", width: 1360, height: 760 }],
  },
};

/* Trois dessins animés du collège, ceux qui accrochent le mieux un parent : une
   question de la vie courante, pas une formule. Ids du manifeste R2. */
const DESSINS_ANIMES = [
  "4e-puissance-comprendre-short",
  "4e-puissance-defi-short",
  "4e-puissance-comparer-short",
];

/* Les contreparties, au tarif fondateur (texte de la page Ulule, 08/11). */
const CONTREPARTIES = [
  { prix: "4,95 €", duree: "1 mois" },
  { prix: "12 €", duree: "3 mois" },
  { prix: "22 €", duree: "6 mois" },
  { prix: "39 €", duree: "1 an", phare: true },
];

export default function UlulePage() {
  const toutes = toutesLesVideos();
  const dessins = DESSINS_ANIMES.map((id) => toutes.find((v) => v.id === id)).filter(
    (v): v is NonNullable<typeof v> => !!v && !!v.vignette,
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      {/* 1. LA PROMESSE D'ULULE, TELLE QUELLE */}
      <section className="bg-gradient-to-b from-sky-100 to-emerald-50">
        <div className="mx-auto grid max-w-5xl items-center gap-4 px-4 pb-10 pt-6 sm:grid-cols-[220px_1fr] sm:gap-8 sm:pt-10">
          <Image
            src="/cahier-vacances/ti-margo-cahier-sac-a-dos.png"
            alt="Ti Margo, le caméléon qui explique les maths"
            width={1122}
            height={1402}
            priority
            className="mx-auto h-40 w-auto sm:h-64"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-black leading-tight text-teal-800 sm:text-5xl">
              Ti Margo : les maths <span className="text-orange-600">en dessin animé</span>
            </h1>
            <p className="mt-3 text-lg text-slate-700 sm:text-xl">
              Un site qui suit <strong>chaque compétence de votre enfant</strong> en maths, avec des dessins animés, du CP
              à la terminale.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={COACH_DEPUIS_ULULE}
                className="rounded-full bg-teal-700 px-7 py-4 text-center text-lg font-black text-white shadow-lg hover:bg-teal-800"
              >
                Essayer gratuitement avec mon enfant
              </Link>
              {COLLECTE.codesActifs && (
                <Link
                  href="/code"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-lg font-black text-teal-800 shadow ring-2 ring-teal-600 hover:bg-teal-50"
                >
                  <KeyRound className="h-5 w-5" aria-hidden="true" /> J&apos;ai un code : l&apos;activer
                </Link>
              )}
            </div>
            <p className="mt-2 text-sm font-bold text-slate-500">Sans compte et sans abonnement : choisissez sa classe, il commence.</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {/* 2. LES DESSINS ANIMÉS */}
        {dessins.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-black sm:text-3xl">Les dessins animés de Ti Margo</h2>
            <p className="mt-1 text-slate-600">
              Une minute, une question de la vie de tous les jours, et l&apos;envie de comprendre. Puis une vidéo explique
              chaque étape.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-6">
              {dessins.map((v) => (
                <Link key={v.id} href={`/video/${v.id}`} className="group block">
                  <span className="relative block overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200 group-hover:ring-teal-400">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={urlR2(v.vignette!)} alt="" className="aspect-[9/16] w-full object-cover" loading="lazy" />
                    <PlayCircle
                      className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm font-bold text-slate-800 group-hover:underline">
                    {v.titre.replace(/\s*—.*$/, "")}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. LE SUIVI, CE QUE LE PARENT VOIT */}
        <section className="mt-12 rounded-3xl bg-teal-50 p-5 sm:p-8">
          <h2 className="text-2xl font-black sm:text-3xl">Le coach suit votre enfant, compétence par compétence</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { Icone: Target, titre: "Il trouve ce qui manque", texte: "Quelques questions suffisent pour voir ce qui est acquis et ce qui ne l'est pas encore." },
              { Icone: PlayCircle, titre: "Il réexplique au bon moment", texte: "Votre enfant bloque ? La vidéo de cette compétence est là, puis il reprend l'exercice." },
              { Icone: BarChart3, titre: "Vous voyez ses progrès", texte: "Compétence par compétence : ce qu'il maîtrise, ce qui est en cours, les erreurs qui reviennent." },
            ].map(({ Icone, titre, texte }) => (
              <li key={titre} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-teal-100">
                <Icone className="h-7 w-7 text-teal-700" aria-hidden="true" />
                <h3 className="mt-2 text-lg font-black">{titre}</h3>
                <p className="mt-1 text-slate-600">{texte}</p>
              </li>
            ))}
          </ul>
          <Link href="/suivi/exemple" className="mt-5 inline-flex items-center gap-2 font-black text-teal-800 hover:underline">
            Voir un exemple de suivi <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-sm text-slate-600">
            <Bell className="mr-1 inline h-4 w-4 text-teal-700" aria-hidden="true" />
            L&apos;essai gratuit se fait sans compte, donc sans suivi : le suivi dans la durée vient avec l&apos;abonnement famille.
          </p>
        </section>

        {/* 4. LES CONTREPARTIES — seulement quand la collecte est en ligne */}
        {COLLECTE.enLigne && (
          <section className="mt-12">
            <h2 className="text-2xl font-black sm:text-3xl">L&apos;abonnement famille, au tarif fondateur</h2>
            <p className="mt-1 text-slate-600">Réservé aux contributeurs de la collecte. Chaque formule existe aussi à offrir, avec une carte Ti Margo à imprimer.</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CONTREPARTIES.map((c) => (
                <li
                  key={c.duree}
                  className={`rounded-2xl p-4 text-center ring-1 ${c.phare ? "bg-orange-50 ring-2 ring-orange-400" : "bg-white ring-slate-200"}`}
                >
                  <p className="text-2xl font-black">{c.prix}</p>
                  <p className="font-bold text-slate-600">{c.duree}</p>
                  {c.phare && <p className="mt-1 text-xs font-black uppercase text-orange-700">Jusqu&apos;au brevet</p>}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {COLLECTE.url && (
                <a
                  href={COLLECTE.url}
                  className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-7 py-3 text-lg font-black text-white hover:bg-orange-700"
                >
                  <Gift className="h-5 w-5" aria-hidden="true" /> Soutenir la collecte sur Ulule
                </a>
              )}
              {COLLECTE.codesActifs && (
                <Link href="/code" className="flex items-center justify-center gap-2 rounded-full px-7 py-3 font-black text-teal-800 ring-2 ring-teal-600 hover:bg-teal-50">
                  <KeyRound className="h-5 w-5" aria-hidden="true" /> Activer mon code
                </Link>
              )}
            </div>
          </section>
        )}

        {/* 5. QUI EST DERRIÈRE */}
        <section className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-slate-50 p-5 text-center sm:flex-row sm:p-8 sm:text-left">
          <Image
            src="/images/avatar-frederic-visage.webp"
            alt="Frédéric"
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-white"
          />
          <div>
            <h2 className="text-2xl font-black">Frédéric, professeur de maths à La Réunion</h2>
            <p className="mt-1 text-slate-700">
              J&apos;ai créé eleveai.fr pour mes élèves, y compris ceux qui lisent difficilement, et je corrige le coach chaque
              semaine à partir de leurs erreurs.
              {/* La relecture par les étudiants est ce que FINANCE la collecte : ne l'écrire qu'une fois la collecte ouverte. */}
              {COLLECTE.enLigne && (
                <> Avec la collecte, chaque dessin animé est relu par un étudiant en maths, futur professeur, avant d&apos;arriver devant votre enfant.</>
              )}
            </p>
            <ul className="mt-3 space-y-1 text-sm font-bold text-slate-700">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Sans publicité
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Le programme officiel, du CP à la terminale
              </li>
            </ul>
          </div>
        </section>

        <p className="mt-10 text-center">
          <Link href={COACH_DEPUIS_ULULE} className="inline-flex rounded-full bg-teal-700 px-7 py-4 text-lg font-black text-white shadow-lg hover:bg-teal-800">
            Essayer gratuitement avec mon enfant
          </Link>
        </p>
      </main>
    </div>
  );
}
