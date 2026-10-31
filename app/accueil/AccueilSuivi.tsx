// L'ACCUEIL « SUIVI D'ÉLÈVE » (31/10/2026) — monté par /accueil (sans les offres)
// et par la maquette /accueil/nouvelle (avec les offres « en préparation »).
//
// ⭐ LE VIRAGE, dans les mots de Frédéric : « quand je tape dans Google "fais-moi
// une fiche de cours sur Pythagore en PDF", il me la génère ». On ne vend donc
// plus des fiches : on vend le SUIVI de l'élève, façon IXL. Ce que l'IA ne fait
// pas : s'entraîner micro-compétence par micro-compétence, avec la vidéo de la
// micro, et GARDER ses résultats ; le prof gère ses classes et voit toutes les
// erreurs par compétence et micro-compétence. « Faut réfléchir », puis « on fait
// la page entièrement », puis (31/10) « change accueil comme nouvelle ».
//
// La stratégie, écrite dans docs/etat-des-lieux-ce-que-je-peux-vendre.md :
//   — GRATUIT pour toujours : l'élève (coach, vidéos, résultats gardés) et le
//     prof (Mes classes, direct, bilan par micro). C'est la vitrine, et c'est ce
//     que Frédéric utilise en classe ;
//   — PAYANT, pour les FAMILLES seulement : le suivi parent et les cours en
//     visio. ⏸ RIEN NE S'ENCAISSE avant l'accord écrit du rectorat (cumul,
//     art. L123-7 et R123-8 2° « enseignement et formation » du CGFP) : les
//     prix sont « envisagés », aucun bouton de paiement.
// ⛔ Aucune vente aux établissements (31/10 : l'inspecteur refuse le logiciel
// dans un collège) : la page ne leur parle plus.
// ⛔ Avis du collège de déontologie (04/04/2023) : le coach utilisé en classe ne
// renvoie JAMAIS vers une offre payante. Les offres ne vivent qu'ici et sur une
// future page « Familles », jamais dans le coach ni le mode classe.
// ⛔ Page serveur, statique : les compteurs viennent du programme et de R2.

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarCheck,
  Check,
  ClipboardList,
  Eye,
  GraduationCap,
  Mail,
  MonitorPlay,
  PlayCircle,
  Save,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PROGRAMME_CLASSES, listerToutesLesNotions } from "@/lib/programme";
import { toutesLesVideos } from "@/lib/videos/r2";
import RechercheEntete from "@/components/accueil/RechercheEntete";

/** La classe du coach → son dossier de vidéos sur R2 (et la clé de /video). */
const DOSSIER_VIDEO: Record<string, string> = {
  "terminale-spe": "terminale",
  "premiere-spe": "premiere",
  premiere: "premiere-commun",
};

/* Les couleurs des cycles, celles de l'accueil actuel : lycée bleu, collège
   rouge, primaire jaune. */
const CYCLE: Record<string, { pastille: string; bord: string; titre: string }> = {
  lycee: { pastille: "bg-blue-700 text-white", bord: "border-blue-300", titre: "text-blue-800" },
  college: { pastille: "bg-red-600 text-white", bord: "border-red-300", titre: "text-red-700" },
  primaire: { pastille: "bg-amber-400 text-slate-900", bord: "border-amber-300", titre: "text-amber-800" },
};
const cycleDe = (slug: string) =>
  ["cp", "ce1", "ce2", "cm1", "cm2"].includes(slug) ? "primaire" : ["6e", "5e", "4e", "3e"].includes(slug) ? "college" : "lycee";

/* Ce qu'on écrit dans la pastille, comme le « 6 » d'IXL. */
const PASTILLE: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2de", premiere: "1re", "premiere-spe": "1re", "terminale-spe": "Tle", stmg: "STMG",
};

/* L'exemple du bilan prof : une notion, cinq élèves, cinq micros. Prénoms
   inventés ; les couleurs disent ce que dit le vrai bilan (/prof/classes/bilan). */
const MICROS_EXEMPLE = ["Lire", "Comparer", "Placer", "Additionner", "Problèmes"];
const ELEVES_EXEMPLE: { nom: string; scores: number[] }[] = [
  { nom: "Inès", scores: [3, 3, 3, 2, 2] },
  { nom: "Noah", scores: [3, 1, 2, 1, 0] },
  { nom: "Léa", scores: [3, 3, 2, 3, 2] },
  { nom: "Kylian", scores: [2, 1, 1, 0, 0] },
  { nom: "Maëlys", scores: [3, 3, 3, 3, 3] },
];
const TEINTE = ["bg-slate-100 text-slate-400", "bg-red-100 text-red-700", "bg-amber-100 text-amber-800", "bg-emerald-100 text-emerald-800"];
const SYMBOLE = ["·", "✗", "~", "✓"];

/* « Comment ça marche » : le chemin d'un élève, en quatre images. */
const ETAPES = [
  { Icone: Users, titre: "Je choisis ma classe", texte: "Du CP à la Terminale, le programme officiel découpé en micro-compétences." },
  { Icone: ClipboardList, titre: "Le coach m'évalue", texte: "Quelques questions suffisent pour trouver ce qui est acquis et ce qui manque." },
  { Icone: Target, titre: "Je m'entraîne sur ce qui manque", texte: "À mon niveau, corrigé tout de suite, avec la vidéo de la micro-compétence si je bloque." },
  { Icone: BarChart3, titre: "Je vois mes progrès", texte: "Mes résultats sont gardés : je reprends demain là où je me suis arrêté." },
];

/* Ce qui reste ouvert à tous, pour toujours. */
const GRATUIT = [
  "Le coach de maths, sur tout le programme, micro-compétence par micro-compétence",
  "Les vidéos, avec leurs questions-pauses",
  "Les résultats gardés dans le compte de l'élève",
  "Pour le prof : ses classes, la séance en direct, le bilan par micro",
  "Les feuilles d'exercices corrigées",
];

/* Ce qui sera proposé aux familles — APRÈS l'accord du rectorat. */
const SUIVI_FAMILLE = [
  { Icone: ClipboardList, texte: "Un bilan de départ : la carte de votre enfant sur toute sa classe" },
  { Icone: Mail, texte: "Un compte rendu chaque semaine : ce qui est acquis, les erreurs qui reviennent, les 3 choses à revoir" },
  { Icone: CalendarCheck, texte: "10 minutes par jour choisies par le coach, et la préparation ciblée d'un contrôle" },
  { Icone: Bell, texte: "Une alerte quand il décroche sur une notion" },
  { Icone: Sparkles, texte: "L'aide de l'IA sans limite pour réexpliquer et corriger" },
];
const VISIO = [
  "Des cours collectifs en direct, 1 h 30, avec un professeur de maths",
  "Les grands rendez-vous : brevet, épreuve anticipée de 1re, bac, entrée en 6e, CRPE",
  "Le replay et la fiche de la séance, gardés",
  "Pas besoin de caméra ni de micro pour l'élève",
];

function Nuage({ Icone, titre, children }: { Icone: typeof Target; titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/90 px-5 py-5 text-center shadow-sm backdrop-blur">
      <Icone className="mx-auto h-7 w-7 text-teal-700" aria-hidden="true" />
      <h2 className="mt-2 text-xl font-black text-slate-900">{titre}</h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

function Puce({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

/**
 * `offresFamille` : montre le suivi famille et les cours en visio « en
 * préparation ». ⛔ FAUX sur /accueil tant que le rectorat n'a pas donné son
 * accord écrit (Frédéric, 31/10 : « tu enlèves "en préparation" tant que je
 * n'ai pas le feu vert du rectorat ») ; VRAI sur la maquette /accueil/nouvelle.
 */
export default function AccueilSuivi({ offresFamille }: { offresFamille: boolean }) {
  const notions = listerToutesLesNotions().filter((n) => n.matiere === "maths");
  const videos = toutesLesVideos().filter((v) => v.vignette);
  const nbVideos = (dossier: string) => videos.filter((v) => v.fichier.split("/")[0] === dossier).length;

  // Une carte par classe, du plus petit au plus grand comme chez IXL.
  const cartes = PROGRAMME_CLASSES.map((c) => {
    const siennes = notions.filter((n) => n.classeSlug === c.slug);
    return {
      slug: c.slug,
      label: c.label,
      micros: siennes.reduce((s, n) => s + n.micros.length, 0),
      videos: nbVideos(DOSSIER_VIDEO[c.slug] ?? c.slug),
      // Sans doublon : deux notions portent parfois le même libellé (« multiplication »).
      apercu: [...new Set(siennes.map((n) => n.label.toLowerCase()))].slice(0, 4),
    };
  }).filter((c) => c.micros > 0);

  const totalMicros = cartes.reduce((s, c) => s + c.micros, 0);
  const totalVideos = Math.floor(videos.length / 100) * 100;

  return (
    <div className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      {/* ⛔ LA RECHERCHE DES TÉLÉPHONES (Frédéric, 23/10 : « tu as enlevé la barre
          de recherche, il faut la remettre »). Sous 640 px, l'en-tête masque la
          sienne (components/Header.tsx, `rechercheAuCentre`) : l'accueil pose la
          sienne, comme l'accueil d'avant (AccueilCoach.tsx). */}
      <div className="border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
        <RechercheEntete variante="page" />
      </div>
      {/* 1. LA PROMESSE ET LES TROIS NUAGES */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-sky-50 to-white">
        {/* ⚠️ Pas l'image de l'accueil actuel en fond : elle porte son propre
            texte (« EleveAI », « CP à Terminale »…), qui se mêlait au titre. */}
        <div aria-hidden="true" className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-16 top-32 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 text-center sm:pt-14">
          <h1 className="text-3xl font-black leading-tight text-teal-900 sm:text-5xl">
            Le coach de maths qui suit chaque élève, micro-compétence par micro-compétence
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-700">
            Chacun s&apos;entraîne à son niveau. Ses résultats sont gardés. Son professeur et ses parents voient où il en est.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Nuage Icone={GraduationCap} titre="Tout le programme">
              Du CP à la Terminale : {totalMicros.toLocaleString("fr-FR")} micro-compétences de maths et {totalVideos.toLocaleString("fr-FR")}+ vidéos, rangées comme le programme officiel.
            </Nuage>
            <Nuage Icone={Target} titre="Chacun à son niveau">
              Le coach trouve ce qui manque à chaque élève et l&apos;entraîne là-dessus, pas sur ce qu&apos;il sait déjà. Deux élèves, deux parcours.
            </Nuage>
            <Nuage Icone={BarChart3} titre="Le suivi">
              Chaque réponse est gardée. Le prof voit les erreurs de toute sa classe ; les parents voient les progrès de leur enfant.
            </Nuage>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/coach-ia/maths" className="rounded-full bg-teal-700 px-6 py-3 font-black text-white shadow hover:bg-teal-800">
              Commencer avec le coach de maths
            </Link>
            {/* ⭐ 31/10/2026 — Frédéric : « le prof, il voit quelque chose pour
                lui » ; les vidéos, « il s'en fiche un peu » : ce qui l'intéresse,
                ce sont les automatismes et les fiches d'exercices, juste après le
                coach, pour cliquer tout de suite. Les mêmes portes que l'ancien
                accueil (AccueilCoach.tsx). */}
            <Link href="/automatismes-maths" className="rounded-full bg-amber-400 px-6 py-3 font-black text-slate-900 shadow hover:bg-amber-500">
              Commencer avec les automatismes
            </Link>
            <Link href="/fiches-exercices" className="rounded-full bg-sky-700 px-6 py-3 font-black text-white shadow hover:bg-sky-800">
              Commencer avec les fiches d&apos;exercices
            </Link>
            <Link href="/video" className="rounded-full bg-rose-600 px-6 py-3 font-black text-white shadow hover:bg-rose-700">
              Commencer avec les vidéos
            </Link>
            {/* « Faire le point » du coach : l'évaluation qui situe l'élève. */}
            <Link href="/parcours" className="rounded-full bg-violet-700 px-6 py-3 font-black text-white shadow hover:bg-violet-800">
              Commencer par une évaluation
            </Link>
            <Link href="/auth/signin?inscription=1" className="rounded-full bg-white px-6 py-3 font-black text-teal-800 ring-1 ring-teal-300 hover:bg-teal-50">
              Créer un compte pour garder mes résultats
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* 2. CE QUE L'IA NE FAIT PAS */}
        <section className="mt-12">
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Une IA te fait une fiche en dix secondes. EleveAI te suit toute l&apos;année.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { Icone: Target, titre: "S'entraîner micro par micro", texte: "Pas « les fractions » en bloc : lire, comparer, placer, calculer… Chaque micro-compétence a ses exercices, à ton niveau, corrigés tout de suite." },
              { Icone: PlayCircle, titre: "La vidéo au bon moment", texte: "Tu bloques ? La vidéo de cette micro-compétence est là, avec ses questions-pauses. Puis tu reprends l'exercice." },
              { Icone: Save, titre: "Tes résultats sont gardés", texte: "Chaque réponse compte. Demain, le coach repart de là où tu t'es arrêté et te fait revoir ce qui n'est pas acquis." },
            ].map(({ Icone, titre, texte }) => (
              <div key={titre} className="rounded-2xl border border-slate-200 p-5">
                <Icone className="h-7 w-7 text-teal-700" aria-hidden="true" />
                <h3 className="mt-2 text-lg font-black">{titre}</h3>
                <p className="mt-1 text-slate-600">{texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. COMMENT ÇA MARCHE */}
        <section className="mt-12">
          <h2 className="text-2xl font-black sm:text-3xl">Comment ça marche</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-4">
            {ETAPES.map(({ Icone, titre, texte }, i) => (
              <li key={titre} className="rounded-2xl bg-teal-50 p-5">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 font-black text-white">{i + 1}</span>
                  <Icone className="h-6 w-6 text-teal-700" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-black">{titre}</h3>
                <p className="mt-1 text-sm text-slate-700">{texte}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. LE PROF : TOUTES LES ERREURS, PAR MICRO */}
        <section className="mt-12 grid items-center gap-6 rounded-3xl bg-slate-50 p-5 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">
              <GraduationCap className="mr-1 inline h-4 w-4" aria-hidden="true" />
              Pour le professeur
            </p>
            <h2 className="mt-1 text-2xl font-black">Toutes les erreurs de vos classes, par micro-compétence</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              <Puce>Vous créez vos classes, vos élèves entrent avec un code.</Puce>
              <Puce>Vous cochez les micro-compétences du contrôle : chacun s&apos;entraîne sur les siennes.</Puce>
              <Puce>Vous suivez la séance en direct, puis le bilan : qui bloque, et sur quoi.</Puce>
            </ul>
            <Link href="/prof/classes" className="mt-4 inline-flex items-center gap-2 font-black text-teal-800 hover:underline">
              Ouvrir « Mes classes » <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <figure className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
            <figcaption className="mb-2 text-sm font-bold text-slate-500">Exemple — 6e, nombres décimaux</figcaption>
            <table className="w-full text-center text-sm">
              <thead>
                <tr>
                  <th className="p-1 text-left font-bold text-slate-500">Élève</th>
                  {MICROS_EXEMPLE.map((m) => (
                    <th key={m} className="p-1 font-bold text-slate-500">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ELEVES_EXEMPLE.map((e) => (
                  <tr key={e.nom}>
                    <td className="p-1 text-left font-bold">{e.nom}</td>
                    {e.scores.map((s, i) => (
                      <td key={i} className="p-1">
                        <span className={`inline-block w-full rounded-md py-1 font-black ${TEINTE[s]}`}>{SYMBOLE[s]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-500">✓ acquis · ~ en cours · ✗ erreurs · · pas encore travaillé</p>
          </figure>
        </section>

        {/* 5. GRATUIT / POUR LES FAMILLES
            ⏸ Les deux offres payantes attendent l'accord écrit du rectorat :
            « en préparation », prix envisagés, aucun bouton de paiement. */}
        <section className="mt-12">
          <h2 className="text-2xl font-black sm:text-3xl">
            {offresFamille ? "Ce qui est ouvert à tous, et ce qui viendra pour les familles" : "Pour les élèves et les professeurs"}
          </h2>
          <div className={`mt-6 grid gap-5 ${offresFamille ? "lg:grid-cols-3" : ""}`}>
            <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/50 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Pour toujours</p>
              <h3 className="mt-1 text-2xl font-black">Ouvert à tous</h3>
              <p className="mt-1 text-slate-600">Élèves et professeurs, sans abonnement.</p>
              <ul className="mt-4 space-y-2 text-slate-800">
                {GRATUIT.map((g) => <Puce key={g}>{g}</Puce>)}
              </ul>
              <Link href="/coach-ia/maths" className="mt-6 block rounded-full bg-emerald-600 px-5 py-3 text-center font-black text-white hover:bg-emerald-700">
                Commencer avec le coach de maths
              </Link>
            </div>

            {offresFamille && (
              <>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-sky-700">En préparation</p>
              <h3 className="mt-1 flex items-center gap-2 text-2xl font-black">
                <Eye className="h-6 w-6 text-sky-700" aria-hidden="true" /> Le suivi famille
              </h3>
              <p className="mt-1 text-slate-600">Pour les parents qui veulent savoir où en est leur enfant, sans faire à sa place.</p>
              <ul className="mt-4 space-y-2 text-slate-800">
                {SUIVI_FAMILLE.map(({ Icone, texte }) => (
                  <li key={texte} className="flex gap-2">
                    <Icone className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />
                    <span>{texte}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-lg font-black">4,95 € par mois <span className="text-sm font-bold text-slate-500">· prix envisagé</span></p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-violet-700">En préparation</p>
              <h3 className="mt-1 flex items-center gap-2 text-2xl font-black">
                <MonitorPlay className="h-6 w-6 text-violet-700" aria-hidden="true" /> Les cours en visio
              </h3>
              <p className="mt-1 text-slate-600">Pour préparer un examen ou une rentrée, en groupe, depuis chez soi.</p>
              <ul className="mt-4 space-y-2 text-slate-800">
                {VISIO.map((v) => <Puce key={v}>{v}</Puce>)}
              </ul>
              <p className="mt-5 text-lg font-black">12 € la séance <span className="text-sm font-bold text-slate-500">· prix envisagé</span></p>
            </div>
              </>
            )}
          </div>
          {offresFamille && (
            <p className="mt-4 text-sm text-slate-500">
            Les offres pour les familles ouvriront plus tard. Elles ne s&apos;adressent ni aux établissements, ni aux élèves de son professeur.
          </p>
          )}
        </section>

        {/* 6. QUI EST DERRIÈRE — la confiance, sans promesse qu'on ne tient pas
            (pas de « tout est vérifié » : c'est le reproche de l'inspecteur). */}
        <section className="mt-12 flex flex-col gap-4 rounded-3xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-8">
          <GraduationCap className="h-12 w-12 shrink-0 text-teal-700" aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-black">Qui est derrière EleveAI ?</h2>
            <p className="mt-1 text-slate-700">
              Frédéric, professeur de mathématiques et statisticien à La Réunion. Il construit le coach de maths pour des élèves de tous niveaux, y compris ceux qui lisent difficilement, et le corrige chaque semaine à partir des erreurs des élèves.
            </p>
          </div>
        </section>

        {/* 7. UNE CARTE PAR CLASSE, FAÇON IXL */}
        <section className="mt-12">
          <h2 className="text-2xl font-black sm:text-3xl">Choisis ta classe</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cartes.map((c) => {
              const t = CYCLE[cycleDe(c.slug)];
              return (
                <div key={c.slug} className={`relative rounded-lg border ${t.bord} bg-white px-5 pb-4 pt-5`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-sm font-black ${t.pastille}`}>
                      {PASTILLE[c.slug] ?? c.label}
                    </span>
                    <Link href={`/coach-ia/maths?classe=${c.slug}`} className={`text-2xl font-black hover:underline ${t.titre}`}>
                      {c.label}
                    </Link>
                  </div>
                  <p className="mt-3 min-h-[4.5rem] text-slate-700">
                    {c.apercu.join(", ")}, et plus.
                  </p>
                  <div className="mt-3 flex items-center border-t border-slate-200 pt-3 text-sm">
                    <span className="flex flex-wrap gap-x-2 whitespace-nowrap">
                      <Link href={`/coach-ia/maths?classe=${c.slug}`} className="text-sky-700 hover:underline">
                        {c.micros} micro-compétences ›
                      </Link>
                      {c.videos > 0 && (
                        <>
                          <span className="text-slate-300">|</span>
                          <Link href={`/video?classe=${DOSSIER_VIDEO[c.slug] ?? c.slug}`} className="text-sky-700 hover:underline">
                            {c.videos} vidéos ›
                          </Link>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
