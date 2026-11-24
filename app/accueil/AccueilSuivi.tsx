// L'ACCUEIL « SUIVI D'ÉLÈVE » (31/10/2026) — monté par /accueil (sans les offres)
// et par la maquette /accueil/nouvelle — ✅ 02/11 : /accueil montre aussi les offres (ouverture fin décembre).
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
// ⛔ Aucune vente aux établissements EN FRANCE (31/10 : l'inspecteur refuse le
// logiciel dans un collège). ⭐ 03/11 : l'offre établissement hors de France,
// prix par pays, remplace les cours en visio sur l'accueil.
// ⛔ Avis du collège de déontologie (04/04/2023) : le coach utilisé en classe ne
// renvoie JAMAIS vers une offre payante. Les offres ne vivent qu'ici et sur une
// future page « Familles », jamais dans le coach ni le mode classe.
// ⛔ Page serveur, statique : les compteurs viennent du programme et de R2.

import Image from "next/image";
import Link from "next/link";
import { COLLECTE } from "@/lib/collecte";
import { Roboto_Slab } from "next/font/google";
import { CollinesAccueil, MontgolfiereAccueil, SoleilAccueil } from "@/components/accueil/dessins/PaysageAccueil";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  FileText,
  Globe2,
  GraduationCap,
  PlayCircle,
  Puzzle,
  Save,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { PROGRAMME_CLASSES, listerToutesLesNotions } from "@/lib/programme";
import { toutesLesVideos } from "@/lib/videos/r2";
import RechercheEntete from "@/components/accueil/RechercheEntete";
import { OFFRE, montant } from "@/lib/tarifs";
import { PAYS_AVENTURE } from "@/lib/aventure/pays";
import CompteurFamille, { type VarianteCompteur } from "@/components/accueil/CompteurFamille";
import MenuDuJour from "@/components/seances/MenuDuJour";
import { SEANCES } from "@/lib/seances/seances";

const MENU_RESTAURANT = SEANCES.find((s) => s.id === "restaurant-6e-longueurs")?.menu;

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
const ACCES_DIRECTS = [
  // 21/11/2026, Frédéric : « changer l'ordre des chips » + « change énigme en
  // slide énigme » + « Fiches d'exercices en exercices interactifs » → même ordre que l'entrée du Menu du jour (énigme, vidéo,
  // exercices), puis automatismes et évaluation.
  // 19/11 : « rajoute à côté de vidéo, calcul rapide, énigme » ; « enlève calcul rapide ».
  { href: "/enigmes-maths", label: "Slide énigme", Icone: Puzzle, couleur: "text-violet-700" },
  { href: "/video", label: "Vidéos", Icone: PlayCircle, couleur: "text-rose-600" },
  { href: "/fiches-exercices", label: "Exercices interactifs", Icone: FileText, couleur: "text-sky-600" },
  { href: "/automatismes-maths", label: "Automatismes", Icone: Zap, couleur: "text-amber-500" },
  // « Faire le point » du coach : l'évaluation qui situe l'élève. 21/11 : « Évaluez-vous », en dernier.
  { href: "/parcours", label: "Évaluez-vous", Icone: ClipboardList, couleur: "text-violet-700" },
];

const ETAPES = [
  { Icone: Users, titre: "Je choisis ma classe", texte: "Du CP à la Terminale, le programme officiel découpé en micro-compétences." },
  { Icone: ClipboardList, titre: "Le coach m'évalue", texte: "Quelques questions suffisent pour trouver ce qui est acquis et ce qui manque." },
  { Icone: Target, titre: "Je m'entraîne sur ce qui manque", texte: "À mon niveau, corrigé tout de suite, avec la vidéo de la micro-compétence si je bloque." },
  { Icone: BarChart3, titre: "Je vois mes progrès", texte: "Mes résultats sont gardés : je reprends demain là où je me suis arrêté." },
];

// Le titre et les nuages en lettres à empattements fines, plus douces que le gras.
const slab = Roboto_Slab({ subsets: ["latin"], weight: ["300", "700"], display: "swap" });

// 17/11/2026 : les trois nuages (« Tout le programme », « Chacun à son
// niveau », « Le suivi ») sont retirés à la demande de Frédéric : redites des
// encarts famille / prof et de « S'entraîner micro par micro ». Le composant
// Nuage est dans l'historique (git show 6ca6a295:app/accueil/AccueilSuivi.tsx).

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
export default function AccueilSuivi({ offresFamille, compteur }: { offresFamille: boolean; compteur?: VarianteCompteur }) {
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
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-50">
        {/* ⚠️ Pas l'image de l'accueil actuel en fond : elle porte son propre
            texte (« EleveAI », « CP à Terminale »…), qui se mêlait au titre.
            ⭐ 01/11 : un paysage de maths dessiné (« plus joli IXL », « avec un
            beau dessin ») : le ciel sur ordinateur, les collines partout. */}
        {/* 08/11 : Ti Margo a pris sa place à gauche du titre ; le soleil ne
            reste que sur les très grands écrans, où ils ne se touchent pas. */}
        <SoleilAccueil className="absolute left-16 top-6 hidden h-24 w-24 2xl:block" />
        {/* 09/11 : le titre, plus long, passait sous la montgolfière (1024 px) :
            elle ne reste, comme le soleil, que sur les très grands écrans. */}
        <MontgolfiereAccueil className="absolute right-14 top-4 hidden h-40 w-44 2xl:block" />
        <CollinesAccueil className="absolute inset-x-0 bottom-0 h-[170px] w-full sm:h-[230px]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-[150px] pt-6 text-center sm:pb-[210px] sm:pt-6">
          {/* ⭐ 08/11/2026 — LE TITRE FAIT ÉCHO À LA COLLECTE ULULE (« le site qui
              suit chaque compétence de votre enfant en maths, avec des dessins
              animés »), sans son superlatif « le premier site » (improuvable)
              et « du CP » (le coach commence au CP, pas en grande section).
              Avant : « EleveAI c'est l'apprentissage personnalisé » — Ti Margo
              et les dessins animés n'apparaissaient nulle part.
              Ti Margo montre le titre du doigt. */}
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 sm:gap-5">
            <Image
              src="/cahier-vacances/ti-margo-cahier-sac-a-dos.png"
              alt="Ti Margo, le caméléon des dessins animés d'EleveAI"
              width={1122}
              height={1402}
              priority
              sizes="128px"
              className="h-24 w-auto shrink-0 sm:h-32 lg:h-36"
            />
            <div className="text-left">
              <h1 className={`${slab.className} text-2xl font-light leading-tight text-sky-700 sm:text-4xl lg:text-5xl`}>
                <span className="font-bold text-teal-700">EleveAI</span> suit <span className="font-bold">chaque compétence</span> de votre enfant en maths
              </h1>
              <p className="mt-2 text-base font-bold text-slate-700 sm:text-xl">
                Avec les <span className="text-orange-600">dessins animés de Ti Margo</span>, du CP à la terminale.
              </p>
            </div>
          </div>
          {/* ⭐ 17/11/2026, Frédéric : « s'entraîner avec le coach arrive tard alors
              que c'est le départ » → les deux portes principales (le coach, et le
              compte qui garde les résultats) remontent juste sous le titre, sur
              tous les écrans. Avant : après les encarts, les chiffres et les
              trois nuages (et un doublon téléphone seul, retiré). */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/coach-ia/maths" className="rounded-full bg-teal-700 px-8 py-4 text-lg font-black text-white shadow-lg hover:bg-teal-800">
              Essayer le coach gratuitement
            </Link>
            <Link href="/auth/signin?inscription=1" className="rounded-full bg-white px-8 py-4 text-lg font-black text-teal-800 shadow ring-2 ring-teal-600 hover:bg-teal-50">
              Créer un compte pour garder mes résultats
            </Link>
          </div>
          {/* 08/11 : les mots de la collecte (« gratuitement, sans compte »). */}
          <p className="mt-2 text-sm font-bold text-slate-600">Sans compte et sans abonnement.</p>
          {/* ⭐ 31/10/2026 — Frédéric : « le prof, il voit quelque chose pour
              lui » : les automatismes et les fiches d'exercices tout de suite,
              puis les vidéos et le calcul rapide. Accès directs, même style.
              17/11, Frédéric (« applique ») : remontés juste sous les deux
              boutons ; les trois nuages (redites) et le badge 8 pays (passé dans
              « Le projet EleveAI ») sont retirés d'ici. */}
          <p className="mt-5 text-sm font-bold text-slate-500">Où va directement à :</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {ACCES_DIRECTS.map(({ href, label, Icone, couleur }) => (
              <Link key={href} href={href} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:ring-teal-400">
                <Icone className={`h-4 w-4 ${couleur}`} aria-hidden />
                {label}
              </Link>
            ))}
          </div>
          {/* ⭐ PRÉVU POUR LA COLLECTE (lib/collecte.ts), ÉTEINT : Frédéric, 08/11 —
              « ne mets pas Ulule sur l'accueil maintenant, mais prévois-le ».
              Une ligne, pas un bandeau (⛔ la banderole rouge reste retirée). */}
          {(COLLECTE.enLigne || COLLECTE.codesActifs) && (
            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-bold">
              {COLLECTE.enLigne && (
                <Link href="/ulule" className="text-orange-700 underline">
                  Ti Margo sur Ulule : aidez-nous à finir les dessins animés du collège
                </Link>
              )}
              {COLLECTE.codesActifs && (
                <Link href="/code" className="text-teal-800 underline">
                  Un code reçu ou une carte cadeau ? Activer mon code
                </Link>
              )}
            </p>
          )}
          {/* ⭐ 16/11/2026 — L'ARGUMENT DE VENTE : les vidéos + le coach qui suit
              la famille, compté au build (components/accueil/CompteurFamille.tsx).
              17/11, Frédéric : APRÈS « Essayer le coach » et les accès directs
              (vidéos, calcul rapide…), AVANT « Le projet EleveAI » : on agit
              d'abord, on se fait convaincre ensuite. */}
          {compteur && <CompteurFamille variante={compteur} micros={totalMicros} />}
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* 1 ter. LE RESTAURANT DE MATHS — ⭐ 18/11, Frédéric : « les élèves ont
            adoré » le menu du jour, puis « cette section doit être sur la page
            d'accueil ». Même menu que /seances (lib/seances/seances.ts).
            21/11, Frédéric : « mets-le en dessous des cartes » (Famille / Prof),
            avant « Le projet EleveAI ». */}
        {MENU_RESTAURANT && (
          <section className="mt-10">
            {/* 19/11, Frédéric : titre « Le restaurant de maths, en classe » et sa
                phrase retirés ; le menu parle de lui-même. */}
            <div className="mx-auto max-w-2xl">
              <MenuDuJour menu={MENU_RESTAURANT} />
            </div>
            <p className="mt-4 text-center">
              <Link href="/seances#restaurant-6e-longueurs" className="inline-flex items-center gap-1.5 font-black text-amber-900 underline">
                Voir la séance en entier
              </Link>
            </p>
          </section>
        )}

        {/* 1 bis. LE PROJET EN QUATRE CASES — ⭐ 03/11, Frédéric : « il faut
            vraiment que les gens comprennent » : un coach, avec des vidéos,
            8 pays puis 40, gratuit pour l'élève, payé par les familles et les
            établissements. */}
        <section className="mt-10 rounded-3xl bg-teal-50 p-5 sm:p-8">
          <h2 className="text-center text-2xl font-black sm:text-3xl">Le projet EleveAI, en quatre phrases</h2>
          {/* 03/11 : le badge 8 pays (« à mettre dans la page d'accueil ») ; 17/11 : déplacé ici, à côté de « 8 pays, puis 40 ». */}
          <div className="text-center">
            <Link
              href="/rejoindre-l-aventure"
              className="mx-auto mt-3 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-teal-800 shadow-sm ring-1 ring-teal-200 hover:ring-teal-400 sm:text-base"
            >
              Adaptée à 8 pays francophones
              <span className="flex gap-1">
                {PAYS_AVENTURE.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={p.slug}
                    src={`/drapeaux/${p.slug}.svg`}
                    alt={p.nom}
                    title={p.nom}
                    width={20}
                    height={15}
                    className="h-[15px] w-5 rounded-[3px] object-cover ring-1 ring-black/10"
                  />
                ))}
              </span>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icone: Target, titre: "Un coach de maths", texte: "Il trouve ce qui manque à chaque élève et l'entraîne là-dessus, du CP à la Terminale." },
              { Icone: PlayCircle, titre: "Avec ses vidéos", texte: "Chaque micro-compétence a sa vidéo, avec des questions-pauses, pour comprendre avant de s'entraîner." },
              { Icone: Globe2, titre: "8 pays, puis 40", texte: "Adapté au programme de 8 pays francophones aujourd'hui, et demain de 40." },
              // 22/11/2026 : « Offert à chaque élève » contredit le modèle du 22/11 (10 questions par jour, puis l'abonnement).
              { Icone: Users, titre: "10 questions par jour", texte: `${OFFRE.questionsGratuitesParJour} questions offertes chaque jour pour essayer. Puis ${montant(OFFRE.famille)} par mois pour toute la famille.` },
            ].map(({ Icone, titre, texte }) => (
              <div key={titre} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-teal-100">
                <Icone className="h-7 w-7 text-teal-700" aria-hidden="true" />
                <h3 className="mt-2 text-lg font-black">{titre}</h3>
                <p className="mt-1 text-slate-600">{texte}</p>
              </div>
            ))}
          </div>
        </section>

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
            {/* 03/11 : l'appel aux profs des 8 pays, une ligne, pas un bandeau :
                l'accueil parle d'abord aux élèves et aux parents. */}
            <p className="mt-3 text-sm font-bold text-slate-600">
              🌍 Professeur en France, Andorre, Suisse, Belgique, Luxembourg, Côte d&apos;Ivoire, au Sénégal ou au Maroc ?{" "}
              <Link href="/rejoindre-l-aventure" className="text-teal-800 underline">
                Votre classe offerte : rejoignez l&apos;aventure
              </Link>
            </p>
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

        {/* 5. LES OFFRES — ⭐ 22/11/2026 : la grande section (Suivi 7,95 €, prix de
            lancement, établissements, visio) est RETIRÉE de l'accueil. Les prix
            vivent sur /tarifs ; l'accueil n'en garde que les deux cartes du haut
            (Famille / Prof) et la ligne des 10 questions (CompteurFamille).
            Ancienne section : git show 32927aab:app/accueil/AccueilSuivi.tsx */}

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
