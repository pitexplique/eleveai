// L'ARGUMENT DE VENTE DE L'ACCUEIL (16/11/2026) — « plus de 5 000 vidéos + le
// coach pour suivre la famille », dit honnêtement tant que le cap n'est pas passé.
//
// ⛔ Le nombre vient de lib/videos/compteur.ts (manifeste R2), JAMAIS d'un
// chiffre tapé ici. Avant le cap : « 1 875 vidéos aujourd'hui — 5 000 fin
// janvier 2027 », avec la barre. Après : « Plus de 5 000 vidéos », sans barre.
// ⛔ Composant de l'ACCUEIL seulement : il mène à l'offre famille et à la carte
// cadeau, donc jamais dans le coach ni le mode classe (avis de déontologie).
// ⛔ Pas un bandeau au-dessus de l'en-tête : la banderole rouge reste retirée.
//
// Deux maquettes à départager par Frédéric : « barre » (A) et « ligne » (B).
// ⏸ 16/11 : « enlève l'offre famille et carte cadeau pour le moment, on le
// remettra plus tard » → les liens (et « un seul abonnement… ») sont ÉTEINTS par
// LIENS_OFFRE ; passer à true pour les rallumer.
const LIENS_OFFRE = false;
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Gift, PlayCircle, Users } from "lucide-react";
import { CAP_VIDEOS, ECHEANCE_CAP, etatCompteurVideos } from "@/lib/videos/compteur";
import { EXERCICES, visiteursDeLaSemaine } from "@/lib/accueil/chiffres-semaine";

export type VarianteCompteur = "barre" | "ligne";

export default function CompteurFamille({ variante }: { variante: VarianteCompteur }) {
  const c = etatCompteurVideos();
  const cap = CAP_VIDEOS.toLocaleString("fr-FR");
  const visiteurs = visiteursDeLaSemaine();

  if (variante === "ligne") {
    return (
      <div className="mx-auto mt-4 max-w-3xl">
        <p className="inline-block rounded-2xl bg-white/85 px-4 py-2.5 text-center text-base font-black leading-relaxed text-slate-800 shadow-sm ring-1 ring-teal-200 sm:text-lg">
          {/* Les icônes restent DANS le fil du texte : centré sur téléphone. */}
          <PlayCircle className="mr-1.5 inline h-5 w-5 align-[-4px] text-rose-600" aria-hidden="true" />
          {c.capAtteint ? (
            <>Plus de {cap} vidéos</>
          ) : (
            <>
              {c.nombreTexte} vidéos aujourd&apos;hui, <span className="whitespace-nowrap text-teal-700">{cap} {ECHEANCE_CAP}</span>
            </>
          )}
          <br />
          <span className="whitespace-nowrap">
            <span aria-hidden="true" className="mx-1 text-slate-400">+</span>
            <Users className="mr-1.5 inline h-5 w-5 align-[-4px] text-sky-700" aria-hidden="true" />
            le coach
          </span>{" "}
          qui suit <span className="whitespace-nowrap">chaque élève</span>, du CP à la Terminale
        </p>
        {LIENS_OFFRE && (
          <p className="mt-1.5 flex flex-wrap justify-center gap-x-4 text-sm font-bold">
            <Link href="#familles" className="text-sky-800 underline">L&apos;offre famille</Link>
            <Link href="/carte-cadeau" className="text-emerald-800 underline">Offrir la carte cadeau de Noël</Link>
          </p>
        )}
      </div>
    );
  }

  // ⭐ 16/11, Frédéric : deux encarts côte à côte, « La famille » à gauche et
  // « Le prof » à droite (le coach sert à 78 % entre 8 h et 17 h : en classe),
  // puis « En chiffres » en BANDE horizontale dessous, puis Tommy.
  // ⛔ L'encart prof ne parle d'AUCUNE offre payante ni d'aucun prix.
  const chiffre = (valeur: string, libelle: string) => (
    <div className="flex flex-col-reverse items-center text-center sm:items-start sm:text-left">
      <dt className="text-xs font-bold leading-tight text-slate-600">{libelle}</dt>
      <dd className="text-lg font-black tabular-nums text-slate-900 sm:text-xl">{valeur}</dd>
    </div>
  );
  return (
    <div className="mx-auto mt-5 grid max-w-3xl items-stretch gap-3 text-left sm:grid-cols-2">
      {/* À GAUCHE : LA FAMILLE (le coach + l'aide de Ti Margo). */}
      <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-sky-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-sky-700">
          <Users className="h-5 w-5" aria-hidden="true" /> La famille
        </p>
        <p className="mt-1 text-xl font-black leading-snug text-slate-900">Le coach qui suit chaque élève, du CP à la Terminale</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-bold text-orange-700">
          <Image src="/ti-margo/animations/encouragement.png" alt="" width={320} height={320} sizes="48px" className="h-12 w-12 shrink-0" />
          Avec l&apos;aide de Ti Margo et de ses dessins animés.
        </p>
        {LIENS_OFFRE ? (
          <>
            <p className="mt-1 text-sm font-bold text-slate-600">Un seul abonnement pour tous les enfants de la maison.</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-black">
              <Link href="#familles" className="text-sky-800 underline">L&apos;offre famille</Link>
              <Link href="/carte-cadeau" className="inline-flex items-center gap-1 text-emerald-800 underline">
                <Gift className="h-4 w-4" aria-hidden="true" /> La carte cadeau
              </Link>
            </p>
          </>
        ) : (
          <p className="mt-1 text-sm font-bold text-slate-600">Il trouve ce qui manque, l&apos;entraîne là-dessus et garde ses progrès.</p>
        )}
      </div>

      {/* À DROITE : LE PROF. ⛔ La phrase est SON expérience de prof (ses mots :
          « si vous commencez par une vidéo, vous captez 100 % de vos élèves »),
          présentée comme sa parole, jamais comme une statistique mesurée.
          Outils réels : /prof/classes, /prof/classes/direct (toutes les 15 s),
          /prof/classes/bilan (réussite de chaque élève par micro). */}
      <div className="flex flex-col rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-violet-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-violet-700">
          <GraduationCap className="h-5 w-5" aria-hidden="true" /> Le prof
        </p>
        <figure className="mt-1">
          <blockquote className="text-lg font-black leading-snug text-slate-900 sm:text-xl">
            « Commencez votre cours par une vidéo : 100&nbsp;% de mes élèves accrochent. »
          </blockquote>
          <figcaption className="mt-0.5 text-sm font-bold text-slate-600">Frédéric, professeur de maths</figcaption>
        </figure>
        <ul className="mt-2 space-y-0.5 text-sm font-bold text-slate-700">
          {[
            "Vos classes, un code pour chaque élève",
            // 16/11, Frédéric : « et vous pouvez suivre vos élèves en direct en
            // salle info » + « ils travaillent à leurs niveaux ».
            "En salle info, suivez vos élèves en direct : chacun travaille à son niveau",
            // U+2011 : trait d'union insécable, « micro‑compétence » ne se coupe pas.
            "Le bilan de chaque élève, par micro‑compétence",
          ].map((t) => (
            <li key={t} className="flex gap-1.5">
              <span aria-hidden="true" className="text-violet-700">✔</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/prof/classes"
          className="mt-3 inline-flex items-center justify-center gap-1.5 self-start rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-violet-800"
        >
          Créer ma classe <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* EN DESSOUS : LA BANDE DES CHIFFRES. Vidéos comptées (lib/videos/compteur.ts),
          exercices et visiteurs de la semaine (lib/accueil/chiffres-semaine.ts). */}
      <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-teal-200 sm:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="flex items-center gap-1.5 self-center text-sm font-black uppercase tracking-wide text-rose-700">
                <PlayCircle className="h-5 w-5" aria-hidden="true" /> En chiffres
              </span>
              {c.capAtteint ? (
                <span className="text-xl font-black text-slate-900">Plus de {cap} vidéos</span>
              ) : (
                <span className="text-xl font-black text-slate-900">
                  {c.nombreTexte} <span className="text-base font-bold text-slate-600">vidéos aujourd&apos;hui</span>
                </span>
              )}
            </p>
            {!c.capAtteint && (
              <>
                <div
                  className="mt-1.5 h-3 overflow-hidden rounded-full bg-slate-200"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={CAP_VIDEOS}
                  aria-valuenow={c.nombre}
                  aria-label={c.phrase}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" style={{ width: `${c.pourcent}%` }} />
                </div>
                <p className="mt-1 text-xs font-bold text-slate-600 sm:text-sm">
                  <span className="text-teal-700">{cap} {ECHEANCE_CAP}</span> : toutes les micro-compétences du CP à la Terminale.
                </p>
              </>
            )}
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-100 pt-2 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
            {chiffre(EXERCICES.exercices.toLocaleString("fr-FR"), "exercices de maths")}
            {visiteurs !== null && chiffre(visiteurs.toLocaleString("fr-FR"), "visiteurs cette semaine")}
          </dl>
        </div>
      </div>
      {/* ⭐ 16/11 — UNE PHRASE VRAIE, dite à Frédéric par un de ses élèves (ses
          mots : « tommy : monsieur hier soir j'ai répondu à 115 questions »).
          Prénom seul, jamais de nom ni de classe. */}
      <figure className="rounded-2xl bg-amber-50/90 px-4 py-3 text-center shadow-sm ring-1 ring-amber-200 sm:col-span-2">
        <blockquote className="text-lg font-black text-slate-800">
          « Monsieur, hier soir, j&apos;ai répondu à 115 questions ! »
        </blockquote>
        <figcaption className="mt-0.5 text-sm font-bold text-slate-600">Tommy, un élève de Frédéric</figcaption>
      </figure>
    </div>
  );
}
