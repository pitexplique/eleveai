// L'ACCUEIL « COMME UN CEO » (22/11/2026) — maquette sur /accueil/nouvelle.
//
// Frédéric : « refais la page d'accueil comme un CEO » (sa formule du 21/11 pour
// les encarts Famille et Prof). Le bénéfice d'abord, la preuve ensuite, un appel
// à l'action clair, peu de texte, aucun mot de prof.
// Ordre validé le 22/11 : 1. le titre + un bouton + la ligne des 10 questions ;
// 2. la preuve (« En chiffres ») ; 3. Famille à gauche, Prof à droite ;
// 4. Choisis ta classe ; 5. une ligne sur Frédéric.
// Retirés (AccueilSuivi.tsx, encore sur le disque) : le projet en quatre phrases,
// « Une IA te fait une fiche », « Comment ça marche », le tableau prof, les
// 8 pays, et le Menu du jour (parti au tableau de bord du prof, /dashboard-prof :
// « le menu du jour peut aller autre part, dashboard prof »).
// ⛔ Prix : seulement OFFRE / PHRASE_* de lib/tarifs.ts. Vente fermée.
// ⛔ Page serveur, statique : les compteurs viennent du programme et de R2.

import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";
import { ArrowRight, ClipboardList, FileText, PlayCircle, Puzzle, Zap } from "lucide-react";
import { CollinesAccueil } from "@/components/accueil/dessins/PaysageAccueil";
import { PROGRAMME_CLASSES, listerToutesLesNotions } from "@/lib/programme";
import { toutesLesVideos } from "@/lib/videos/r2";
import RechercheEntete from "@/components/accueil/RechercheEntete";
import { PHRASE_ESSAI } from "@/lib/tarifs";
import { BandeChiffres, EncartsFamilleProf } from "@/components/accueil/CompteurFamille";
import { listerProblemes } from "@/lib/problemes/registre";
import { FICHES_EXERCICES_REGISTRE } from "@/lib/fiches-exercices/registre";

/* ⭐ 22/11/2026, Frédéric : « compléter Choisis ta classe avec le nombre
   d'exercices interactifs et énigmes ». Exercices : le nombre écrit dans le
   titre de chaque feuille (« … : 20 exercices corrigés », « 20 problèmes
   corrigés ») ; énigmes : les problèmes à projeter de /enigmes-maths. */
function compterParClasse() {
  const exercices: Record<string, number> = {};
  for (const [cle, v] of Object.entries(FICHES_EXERCICES_REGISTRE)) {
    const [matiere, classe] = cle.split("/");
    const n = matiere === "maths" ? v.titre.match(/(\d+)\s+(?:exercices|problèmes)/) : null;
    if (n) exercices[classe] = (exercices[classe] ?? 0) + Number(n[1]);
  }
  const enigmes: Record<string, number> = {};
  for (const p of listerProblemes()) enigmes[p.classe] = (enigmes[p.classe] ?? 0) + p.problemes.length;
  return { exercices, enigmes };
}

const slab = Roboto_Slab({ subsets: ["latin"], weight: ["300", "700"], display: "swap" });

/** La classe du coach → son dossier de vidéos sur R2 (et la clé de /video). */
const DOSSIER_VIDEO: Record<string, string> = {
  "terminale-spe": "terminale",
  "premiere-spe": "premiere",
  premiere: "premiere-commun",
};

const CYCLE: Record<string, { pastille: string; bord: string; titre: string }> = {
  lycee: { pastille: "bg-blue-700 text-white", bord: "border-blue-300", titre: "text-blue-800" },
  college: { pastille: "bg-red-600 text-white", bord: "border-red-300", titre: "text-red-700" },
  primaire: { pastille: "bg-amber-400 text-slate-900", bord: "border-amber-300", titre: "text-amber-800" },
};
const cycleDe = (slug: string) =>
  ["cp", "ce1", "ce2", "cm1", "cm2"].includes(slug) ? "primaire" : ["6e", "5e", "4e", "3e"].includes(slug) ? "college" : "lycee";

const PASTILLE: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2de", premiere: "1re", "premiere-spe": "1re", "terminale-spe": "Tle", stmg: "STMG",
};

/* Les accès directs (ordre du 21/11), passés en une ligne discrète sous les classes. */
const ACCES_DIRECTS = [
  { href: "/enigmes-maths", label: "Slide énigme", Icone: Puzzle, couleur: "text-violet-700" },
  { href: "/video", label: "Vidéos", Icone: PlayCircle, couleur: "text-rose-600" },
  { href: "/fiches-exercices", label: "Exercices interactifs", Icone: FileText, couleur: "text-sky-600" },
  { href: "/automatismes-maths", label: "Automatismes", Icone: Zap, couleur: "text-amber-500" },
  { href: "/parcours", label: "Évaluez-vous", Icone: ClipboardList, couleur: "text-violet-700" },
];

export default function AccueilCeo() {
  // PHRASE_ESSAI = « 10 questions offertes chaque jour, sans compte. Les fiches… »
  const [essai, ...libres] = PHRASE_ESSAI.split(". ");

  return (
    // ⛔ Fond blanc forcé (23/10, « on voit rien ») : la page garde ses couleurs en mode sombre.
    <div className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      {/* ⛔ La recherche des téléphones (23/10) : l'en-tête masque la sienne sous 640 px. */}
      <div className="border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
        <RechercheEntete variante="page" />
      </div>

      {/* 1. LE BÉNÉFICE, ET UN SEUL APPEL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-50">
        <CollinesAccueil className="absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[200px]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-8 sm:pb-14 sm:pt-12">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 sm:gap-6">
            <Image
              src="/cahier-vacances/ti-margo-cahier-sac-a-dos.png"
              alt="Ti Margo, le caméléon des dessins animés d'EleveAI"
              width={1122}
              height={1402}
              priority
              sizes="160px"
              className="h-24 w-auto shrink-0 sm:h-36 lg:h-44"
            />
            <div className="min-w-0 text-left">
              <h1 className={`${slab.className} text-[1.7rem] font-bold leading-tight text-teal-800 sm:text-5xl lg:text-6xl`}>
                {/* 24/11, Frédéric : « On va progresser ensemble en mathématiques chaque jour ? »
                    → « Progressons ensemble » (il a choisi). */}
                Progressons ensemble en maths, <span className="whitespace-nowrap text-sky-700">chaque jour.</span>
              </h1>
              <p className="mt-3 text-base font-bold text-slate-700 sm:text-xl">
                Le coach trouve ce qui lui manque et l&apos;entraîne là-dessus, avec les{" "}
                <span className="text-orange-600">dessins animés de Ti Margo</span>. Du CP à la Terminale.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/coach-ia/maths"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-9 py-4 text-xl font-black text-white shadow-lg hover:bg-teal-800 sm:w-auto"
            >
              {/* 23/11, Frédéric : « remplace essayer gratuitement par Accéder aux coachs
                  ou trouve une autre formule ». */}
              Accéder au coach <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="#classes"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-lg font-black text-teal-800 shadow ring-2 ring-teal-600 hover:bg-teal-50 sm:w-auto"
            >
              Choisir ma classe
            </Link>
          </div>
          <p className="mt-3 text-center text-sm font-bold text-slate-600">
            <span className="font-black text-emerald-800">{essai}.</span> {libres.join(". ")}
          </p>

          {/* 2. LA PREUVE, TOUT DE SUITE */}
          <div className="mt-8">
            <BandeChiffres />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* 3. FAMILLE À GAUCHE, PROF À DROITE */}
        <section className="mt-10" aria-label="Pour les familles et les professeurs">
          <EncartsFamilleProf />
        </section>

        {/* 4. CHOISIS TA CLASSE */}
        <section id="classes" className="mt-14 scroll-mt-24">
          {/* 22/11, Frédéric : « mets les chips avant Choisis ta classe ». */}
          <p className="text-center text-sm font-bold text-slate-500">Va directement à :</p>
          <div className="mb-10 mt-2 flex flex-wrap justify-center gap-2">
            {ACCES_DIRECTS.map(({ href, label, Icone, couleur }) => (
              <Link key={href} href={href} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:ring-teal-400">
                <Icone className={`h-4 w-4 ${couleur}`} aria-hidden />
                {label}
              </Link>
            ))}
          </div>
          <ChoisisTaClasse />
        </section>

        {/* 5. QUI EST DERRIÈRE — une ligne, sans promesse qu'on ne tient pas. */}
        <section className="mx-auto mt-14 flex max-w-3xl items-center gap-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-visage.webp"
            alt="Frédéric"
            width={96}
            height={96}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-teal-200"
          />
          <p className="font-bold text-slate-700">
            Fait par Frédéric, professeur de maths à La Réunion. Il le corrige chaque semaine avec ses élèves.
          </p>
        </section>
      </main>
    </div>
  );
}

/** « Choisis ta classe » : le titre et les cartes (aussi montés par /accueil-2). */
export function ChoisisTaClasse() {
  const notions = listerToutesLesNotions().filter((n) => n.matiere === "maths");
  const videos = toutesLesVideos().filter((v) => v.vignette);
  const nbVideos = (dossier: string) => videos.filter((v) => v.fichier.split("/")[0] === dossier).length;

  const comptes = compterParClasse();
  const cartes = PROGRAMME_CLASSES.map((c) => {
    const siennes = notions.filter((n) => n.classeSlug === c.slug);
    return {
      slug: c.slug,
      label: c.label,
      micros: siennes.reduce((s, n) => s + n.micros.length, 0),
      videos: nbVideos(DOSSIER_VIDEO[c.slug] ?? c.slug),
      apercu: [...new Set(siennes.map((n) => n.label.toLowerCase()))].slice(0, 4),
      exercices: comptes.exercices[c.slug] ?? 0,
      enigmes: comptes.enigmes[c.slug] ?? 0,
    };
  }).filter((c) => c.micros > 0);

  return (
    <>
    <h2 className="text-center text-3xl font-black sm:text-4xl">Choisis ta classe</h2>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="mt-3 min-h-[3rem] text-slate-700">{c.apercu.join(", ")}, et plus.</p>
            <div className="mt-3 grid grid-cols-[auto_auto] justify-between gap-x-3 gap-y-1 whitespace-nowrap border-t border-slate-200 pt-3 text-sm font-bold">
              <Link href={`/coach-ia/maths?classe=${c.slug}`} className="text-sky-700 hover:underline">
                S&apos;entraîner ›
              </Link>
              {c.videos > 0 && (
                <>
                  <Link href={`/video?classe=${DOSSIER_VIDEO[c.slug] ?? c.slug}`} className="text-sky-700 hover:underline">
                    {c.videos} vidéos ›
                  </Link>
                </>
              )}
              {c.exercices > 0 && (
                <>
                  <Link href={`/fiches-exercices?classe=maths-${c.slug}`} className="text-sky-700 hover:underline">
                    {c.exercices.toLocaleString("fr-FR")} exercices interactifs ›
                  </Link>
                </>
              )}
              {c.enigmes > 0 && (
                <>
                  <Link href={`/enigmes-maths/${c.slug}`} className="text-sky-700 hover:underline">
                    {c.enigmes} énigmes ›
                  </Link>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
