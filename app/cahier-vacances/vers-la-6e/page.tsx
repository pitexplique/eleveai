"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Download,
  Dumbbell,
  GraduationCap,
  Heart,
  Mouse,
  Pencil,
  Printer,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Données du cahier — 1 objet = 1 page imprimée.                            */
/*  Pour ajouter un jour : ajouter un objet ci-dessous. Rien d'autre à coder. */
/* -------------------------------------------------------------------------- */

type Jour = {
  numero: number;
  semaine: number;
  badge: string;
  maths: {
    calcul: string[];
    probleme: { enonce: string; correction: string };
    illu: { emoji: string; label: string };
  };
  francais: {
    regleTitre: string;
    regle: string;
    consigne: string;
    items: string[];
    correction: string;
  };
  mot: { mot: string; nature: string; definition: string; exemple: string };
  geste: { titre: string; texte: string };
  defi: { enonce: string; correction: string };
};

const jours: Jour[] = [
  {
    numero: 1,
    semaine: 1,
    badge: "Margouillat malin",
    maths: {
      calcul: ["7 × 8 =", "48 ÷ 6 =", "125 + 78 =", "1000 − 365 =", "9 × 6 ="],
      probleme: {
        enonce:
          "Une boîte contient 6 paquets de 24 gâteaux. Combien y a-t-il de gâteaux en tout ?",
        correction: "6 × 24 = 144. Il y a 144 gâteaux.",
      },
      illu: { emoji: "🎁", label: "boîte de gâteaux" },
    },
    francais: {
      regleTitre: "Le sujet du verbe",
      regle:
        "Le sujet répond à la question « Qui est-ce qui… ? » ou « Qu'est-ce qui… ? » posée devant le verbe.",
      consigne: "Souligne le sujet de chaque phrase.",
      items: [
        "Le chat dort sur le canapé.",
        "Mes amis arrivent demain.",
        "La grande tour brille au soleil.",
      ],
      correction:
        "1. Le chat — 2. Mes amis — 3. La grande tour. (On pose « Qui est-ce qui… ? »)",
    },
    mot: {
      mot: "Périmètre",
      nature: "nom, maths",
      definition: "Le périmètre, c'est la longueur du tour d'une figure.",
      exemple: "Le périmètre d'un carré de 5 cm de côté est 5 + 5 + 5 + 5 = 20 cm.",
    },
    geste: {
      titre: "Le clic gauche",
      texte:
        "On appuie une fois sur le bouton gauche de la souris pour sélectionner ou valider un élément.",
    },
    defi: {
      enonce:
        "Je suis un nombre. Si tu m'ajoutes 10, tu obtiens 25. Qui suis-je ?",
      correction: "15, car 15 + 10 = 25.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Calculateur éclair",
    maths: {
      calcul: ["6 × 7 =", "56 ÷ 8 =", "240 + 160 =", "double de 45 =", "8 × 8 ="],
      probleme: {
        enonce:
          "Léa a 3,50 €. Elle achète un cahier à 2,20 €. Combien lui reste-t-il ?",
        correction: "3,50 − 2,20 = 1,30. Il lui reste 1,30 €.",
      },
      illu: { emoji: "💶", label: "pièces et billets" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle:
        "Le verbe est le mot qui change quand on change le temps (hier, aujourd'hui, demain). Il indique l'action.",
      consigne: "Entoure le verbe de chaque phrase.",
      items: [
        "Nous mangeons à midi.",
        "Le train partira bientôt.",
        "Tu as fini ton travail.",
      ],
      correction:
        "1. mangeons — 2. partira — 3. as fini. (Le verbe change si on change le temps.)",
    },
    mot: {
      mot: "Quotient",
      nature: "nom, maths",
      definition: "Le quotient est le résultat d'une division.",
      exemple: "Dans 20 ÷ 4 = 5, le quotient est 5.",
    },
    geste: {
      titre: "Le double-clic",
      texte:
        "On appuie deux fois rapidement sur le bouton gauche pour ouvrir un dossier ou un fichier.",
    },
    defi: {
      enonce:
        "Dans une ferme, il y a des poules et des lapins, soit 8 têtes et 22 pattes. Combien de lapins ?",
      correction: "3 lapins (12 pattes) et 5 poules (10 pattes) : 8 têtes, 22 pattes.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Explorateur des mots",
    maths: {
      calcul: ["9 × 7 =", "63 ÷ 9 =", "1/2 de 50 =", "350 + 450 =", "12 × 5 ="],
      probleme: {
        enonce:
          "Un film dure 1 h 45 min. Il commence à 14 h 30. À quelle heure se termine-t-il ?",
        correction: "14 h 30 + 1 h 45 = 16 h 15. Le film finit à 16 h 15.",
      },
      illu: { emoji: "🎬", label: "horloge et cinéma" },
    },
    francais: {
      regleTitre: "Singulier et pluriel",
      regle:
        "Au pluriel, la plupart des noms prennent un -s. Certains prennent -x (un château → des châteaux).",
      consigne: "Écris ces groupes au pluriel.",
      items: ["un cheval →", "le beau gâteau →", "une souris →"],
      correction: "des chevaux — les beaux gâteaux — des souris (déjà en -s).",
    },
    mot: {
      mot: "Sommet",
      nature: "nom, géométrie",
      definition: "Un sommet est un point où se rejoignent deux côtés d'une figure.",
      exemple: "Un triangle a 3 sommets.",
    },
    geste: {
      titre: "Copier (Ctrl + C)",
      texte:
        "On sélectionne un texte, puis on appuie en même temps sur les touches Ctrl et C pour le copier.",
    },
    defi: {
      enonce:
        "Complète la suite logique : 2, 4, 8, 16, … Quel est le nombre suivant ?",
      correction: "32 : à chaque fois, on multiplie par 2.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "As de la logique",
    maths: {
      calcul: ["8 × 6 =", "72 ÷ 8 =", "0,5 + 0,5 =", "1000 − 250 =", "7 × 7 ="],
      probleme: {
        enonce:
          "Un parking compte 5 rangées de 18 places. Combien de places en tout ?",
        correction: "5 × 18 = 90. Il y a 90 places.",
      },
      illu: { emoji: "🅿️", label: "places de parking" },
    },
    francais: {
      regleTitre: "a ou à ?",
      regle:
        "« a » (sans accent) est le verbe avoir (on peut dire « avait »). « à » (avec accent) est un mot invariable.",
      consigne: "Complète avec « a » ou « à ».",
      items: [
        "Il ___ un vélo rouge.",
        "Nous partons ___ la mer.",
        "Elle pense ___ ses vacances.",
      ],
      correction: "1. a (avait un vélo) — 2. à — 3. à.",
    },
    mot: {
      mot: "Différence",
      nature: "nom, maths",
      definition: "La différence est le résultat d'une soustraction.",
      exemple: "La différence entre 10 et 4 est 6, car 10 − 4 = 6.",
    },
    geste: {
      titre: "Coller (Ctrl + V)",
      texte:
        "Après avoir copié, on appuie en même temps sur Ctrl et V pour coller le texte au bon endroit.",
    },
    defi: {
      enonce:
        "J'ai 12 ans. Mon frère a la moitié de mon âge. Quel âge aura-t-il quand j'aurai 20 ans ?",
      correction: "Il a 6 ans (12 − 6 = 6 d'écart). À mes 20 ans, il aura 14 ans.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Champion de la semaine",
    maths: {
      calcul: ["6 × 9 =", "81 ÷ 9 =", "1/4 de 100 =", "275 + 325 =", "11 × 4 ="],
      probleme: {
        enonce: "Un litre de jus coûte 1,80 €. Combien coûtent 3 litres ?",
        correction: "3 × 1,80 = 5,40. Cela coûte 5,40 €.",
      },
      illu: { emoji: "🧃", label: "bouteilles de jus" },
    },
    francais: {
      regleTitre: "Les homophones et / est",
      regle:
        "« et » relie deux mots (on peut dire « et puis »). « est » est le verbe être (on peut dire « était »).",
      consigne: "Complète avec « et » ou « est ».",
      items: [
        "Le ciel ___ bleu.",
        "Paul ___ Marie jouent.",
        "Elle ___ contente ___ fière.",
      ],
      correction: "1. est (était bleu) — 2. et — 3. est … et.",
    },
    mot: {
      mot: "Symétrie",
      nature: "nom, géométrie",
      definition:
        "Une figure est symétrique quand on peut la plier en deux parties identiques le long d'un axe.",
      exemple: "Un papillon est symétrique : ses deux ailes se superposent.",
    },
    geste: {
      titre: "Le menu déroulant",
      texte:
        "Un menu déroulant s'ouvre quand on clique sur une petite flèche : on choisit ensuite une option dans la liste.",
    },
    defi: {
      enonce:
        "Combien de carrés vois-tu dans une grille de 2 cases sur 2 (en comptant le grand) ?",
      correction: "5 : les 4 petits carrés + le grand carré qui les contient.",
    },
  },
];

const semaines = Array.from(new Set(jours.map((j) => j.semaine)));

/* Barème de points commun à chaque jour (panneau latéral). */
const baremePoints = [
  { label: "Maths", pts: "2 pts", icon: Calculator, color: "text-sky-600" },
  { label: "Français", pts: "2 pts", icon: Pencil, color: "text-violet-600" },
  { label: "Mot du jour", pts: "1 pt", icon: BookOpen, color: "text-teal-600" },
  { label: "Geste du jour", pts: "1 pt", icon: Mouse, color: "text-emerald-600" },
  { label: "Défi du jour", pts: "2 pts", icon: Target, color: "text-orange-500" },
  { label: "Bonus", pts: "+ 2 pts", icon: Star, color: "text-amber-500" },
];

/* -------------------------------------------------------------------------- */
/*  Petits composants réutilisables                                           */
/* -------------------------------------------------------------------------- */

/**
 * Emplacement réservé pour une illustration. Pour l'instant on affiche un
 * emoji ; quand les vraies images (Ti Margo, visuels) seront fournies, il
 * suffira de remplacer le contenu ici (et de chercher data-illustration).
 */
function Illu({
  emoji,
  label,
  className = "h-14 w-14 text-3xl",
}: {
  emoji: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      data-illustration={label}
      title={`Illustration à remplacer : ${label}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-white/70 ${className}`}
    >
      {emoji}
    </span>
  );
}

/** Case « Terminé ! » à cocher (imprimable). */
function Termine() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
      <span className="inline-block h-4 w-4 rounded-full border-2 border-slate-300" />
      Terminé !
    </span>
  );
}

/** Bandeau de tête présent en haut de chaque page imprimée. */
function PageEntete() {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="font-black text-teal-600">EleveAI</span>
        <span className="text-slate-300">—</span>
        Plusieurs portes pour apprendre
      </span>
      <span className="hidden sm:inline">eleveai.fr/cahier-vacances/vers-la-6e</span>
    </div>
  );
}

/** Fil « J'apprends → Je m'entraîne → Je progresse ». */
function FilProgression() {
  const etapes = [
    { icon: GraduationCap, label: "J'apprends", color: "text-sky-600", bg: "bg-sky-100" },
    { icon: Dumbbell, label: "Je m'entraîne", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: TrendingUp, label: "Je progresse", color: "text-violet-600", bg: "bg-violet-100" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-black">
      {etapes.map((e, i) => (
        <span key={e.label} className="flex items-center gap-2">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${e.bg} ${e.color}`}
          >
            <e.icon className="h-5 w-5" />
          </span>
          <span className={e.color}>{e.label}</span>
          {i < etapes.length - 1 && (
            <span className="px-1 text-slate-300">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function CahierVacancesVersLa6ePage() {
  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* Barre d'actions (écran) */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/fiches-cours"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* ================= PAGE DE GARDE ================= */}
        <section className="cahier-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <PageEntete />

          <div className="mt-4 text-center text-base font-black tracking-tight text-teal-600">
            <span className="text-lg">eleveai.fr</span>
            <span className="ml-2 text-sm font-bold italic text-slate-500">
              · La liberté d&apos;apprendre
            </span>
          </div>

          <div className="relative mt-8 text-center">
            {/* doodles maths */}
            <span className="pointer-events-none absolute -left-2 top-2 -rotate-12 text-sm font-black text-teal-400">
              2 + 3 = 5
            </span>
            <span className="pointer-events-none absolute right-0 top-8 rotate-6 text-sm font-black text-violet-400">
              6 × 7 = 42
            </span>
            <span className="pointer-events-none absolute left-1/4 top-0 text-xl font-black text-amber-300">
              +
            </span>

            <p className="text-2xl font-black uppercase tracking-[0.2em] text-slate-700 sm:text-3xl">
              Cahier de vacances
            </p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <h1 className="text-6xl font-black tracking-tight text-slate-900 print:text-5xl">
                Vers la 6<sup>e</sup>
              </h1>
              <Illu emoji="🦎" label="Ti Margo (salut)" className="h-20 w-20 text-5xl" />
            </div>
            <p className="mt-4 text-xl font-black">
              <span className="text-sky-600">Maths</span>
              <span className="text-slate-300"> · </span>
              <span className="text-rose-500">Français</span>
              <span className="text-slate-300"> · </span>
              <span className="text-violet-600">Vocabulaire</span>
              <span className="text-slate-300"> · </span>
              <span className="text-amber-500">Défis</span>
            </p>
            <p className="mt-2 text-base font-bold text-slate-500">
              Pour réviser tout l&apos;été après le CM2
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-lg font-black text-white shadow-lg shadow-teal-500/30">
              <Sparkles className="h-5 w-5" />
              Mission cap sur la 6<sup>e</sup>
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-lg items-center gap-4 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/40 p-6">
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-wide text-teal-600">
                Ce cahier appartient à
              </p>
              <div className="mt-5 border-b-2 border-dotted border-slate-300" />
            </div>
            <Illu emoji="🖊️" label="stylo" className="h-10 w-10 text-2xl" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <BookOpen className="h-5 w-5 text-teal-500" />
                Mode d&apos;emploi
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une page par jour, à ton rythme : un peu de maths, un peu de
                français, un mot nouveau et un défi. Les corrigés sont à la fin
                du cahier.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <Heart className="h-4 w-4 text-orange-500" />
                Un cahier solidaire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                En utilisant ce cahier, tu participes à offrir l&apos;accès à
                EleveAI à un élève qui n&apos;en a pas les moyens. Merci&nbsp;!
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <span className="flex items-center gap-2 text-base font-black text-slate-800">
              <Award className="h-6 w-6 text-amber-500" />
              Gagne des points et des badges !
            </span>
            <span className="flex gap-2 text-2xl">
              <Illu emoji="⭐" label="badge étoile" className="h-9 w-9 text-xl" />
              <Illu emoji="⚡" label="badge éclair" className="h-9 w-9 text-xl" />
              <Illu emoji="👑" label="badge couronne" className="h-9 w-9 text-xl" />
            </span>
          </div>

          <div className="mt-6">
            <FilProgression />
          </div>

          <p className="mt-8 text-center text-lg font-black italic text-teal-600">
            Chaque jour, un pas de plus vers la réussite !
          </p>
        </section>

        {/* ================= PAGES JOURS ================= */}
        {semaines.map((sem) =>
          jours
            .filter((j) => j.semaine === sem)
            .map((jour) => (
              <section
                key={jour.numero}
                className="cahier-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none"
              >
                <PageEntete />

                <header className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                    <span className="rounded-md bg-sky-500 px-3 py-1 text-white">
                      Semaine {jour.semaine}
                    </span>
                    <span className="rounded-md bg-orange-500 px-3 py-1 text-white">
                      Jour {jour.numero}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-bold italic text-slate-400">
                    eleveai.fr · Vers la 6<sup>e</sup>
                    <Star className="h-4 w-4 fill-amber-300 text-amber-400" />
                  </span>
                </header>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_15rem] print:grid-cols-[1fr_14rem]">
                  {/* ---------- Colonne principale ---------- */}
                  <div className="grid gap-4">
                    {/* Maths */}
                    <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black text-sky-700">
                          <Calculator className="h-5 w-5" />
                          Maths
                        </h2>
                        <Termine />
                      </div>
                      <p className="mt-3 text-sm font-bold text-slate-700">
                        Calcul mental
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-800 sm:grid-cols-3">
                        {jour.maths.calcul.map((c) => (
                          <span key={c} className="font-mono">
                            {c} ____
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-700">Problème</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            {jour.maths.probleme.enonce}
                          </p>
                          <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                        </div>
                        <Illu emoji={jour.maths.illu.emoji} label={jour.maths.illu.label} />
                      </div>
                    </div>

                    {/* Français */}
                    <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black text-violet-700">
                          <Pencil className="h-5 w-5" />
                          Français — {jour.francais.regleTitre}
                        </h2>
                        <Termine />
                      </div>
                      <p className="mt-2 rounded-xl border border-violet-100 bg-white p-3 text-sm leading-6 text-slate-700">
                        {jour.francais.regle}
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {jour.francais.consigne}
                          </p>
                          <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-800">
                            {jour.francais.items.map((it) => (
                              <li key={it}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                        <Illu emoji="🦎" label="Ti Margo (crayon)" className="h-16 w-16 text-4xl" />
                      </div>
                    </div>

                    {/* Mot & geste */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-base font-black text-teal-700">
                            <BookOpen className="h-5 w-5" />
                            Le mot du jour
                          </h2>
                          <Termine />
                        </div>
                        <p className="mt-2 text-sm">
                          <span className="font-black text-teal-700">{jour.mot.mot}</span>{" "}
                          <span className="text-xs italic text-slate-500">
                            ({jour.mot.nature})
                          </span>
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {jour.mot.definition}
                        </p>
                        <p className="mt-1 text-xs italic leading-5 text-slate-500">
                          {jour.mot.exemple}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-base font-black text-emerald-700">
                            <Mouse className="h-5 w-5" />
                            Le geste du jour
                          </h2>
                          <Termine />
                        </div>
                        <p className="mt-2 text-sm font-bold text-emerald-700">
                          {jour.geste.titre}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {jour.geste.texte}
                        </p>
                      </div>
                    </div>

                    {/* Défi */}
                    <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-base font-black text-orange-600">
                          <Target className="h-5 w-5" />
                          Le défi du jour
                        </h2>
                        <Termine />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {jour.defi.enonce}
                      </p>
                      <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                    </div>
                  </div>

                  {/* ---------- Colonne latérale (gamification) ---------- */}
                  <aside className="grid content-start gap-4">
                    {/* Badge du jour */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                      <p className="text-xs font-black uppercase tracking-wide text-amber-600">
                        Badge du jour
                      </p>
                      <Illu emoji="🏅" label={`badge ${jour.badge}`} className="mx-auto mt-2 h-14 w-14 text-3xl" />
                      <p className="mt-2 text-sm font-black uppercase leading-tight text-slate-800">
                        {jour.badge}
                      </p>
                    </div>

                    {/* Points du jour */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                      <p className="bg-teal-600 px-4 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
                        Points du jour
                      </p>
                      <ul className="divide-y divide-slate-100 bg-white">
                        {baremePoints.map((p) => (
                          <li
                            key={p.label}
                            className="flex items-center justify-between px-4 py-2 text-sm"
                          >
                            <span className="flex items-center gap-2 font-bold text-slate-700">
                              <p.icon className={`h-4 w-4 ${p.color}`} />
                              {p.label}
                            </span>
                            <span className="font-black text-slate-900">{p.pts}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between bg-teal-50 px-4 py-2">
                        <span className="text-sm font-black text-teal-700">TOTAL</span>
                        <span className="text-lg font-black text-teal-700">/10</span>
                      </div>
                    </div>

                    {/* Encouragement mascotte */}
                    <div className="rounded-2xl border border-teal-200 bg-white p-4 text-center">
                      <p className="text-sm font-black text-teal-700">Bravo !</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Continue à apprendre chaque jour. Avec Ti Margo, tu vas y
                        arriver !
                      </p>
                      <Illu emoji="🦎" label="Ti Margo (pouce levé)" className="mx-auto mt-2 h-16 w-16 text-4xl" />
                    </div>
                  </aside>
                </div>

                <footer className="mt-5 border-t border-slate-200 pt-4">
                  <FilProgression />
                  <p className="mt-3 text-center text-sm font-bold text-teal-600">
                    Un petit pas chaque jour, un grand pas pour tes connaissances !
                  </p>
                </footer>
              </section>
            ))
        )}

        {/* ================= CORRIGÉS (page séparée) ================= */}
        <section className="cahier-page corriges-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none">
          <PageEntete />
          <header className="mt-3 border-b border-slate-200 pb-4">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
              Corrigés
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
              Les réponses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              À regarder seulement après avoir cherché&nbsp;!
            </p>
          </header>

          <div className="mt-4 grid gap-3">
            {jours.map((jour) => (
              <details
                key={jour.numero}
                className="fiche-correction rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer text-sm font-black text-slate-900">
                  Jour {jour.numero} — corrigé
                </summary>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  <p>
                    <span className="font-bold text-sky-700">Maths : </span>
                    Calcul → {calculReponses(jour.maths.calcul)}.{" "}
                    {jour.maths.probleme.correction}
                  </p>
                  <p>
                    <span className="font-bold text-violet-600">Français : </span>
                    {jour.francais.correction}
                  </p>
                  <p>
                    <span className="font-bold text-orange-600">Défi : </span>
                    {jour.defi.correction}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="screen-only mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center">
            <p className="text-sm font-bold text-slate-700">
              Envie de continuer en ligne, avec un coach qui s&apos;adapte ?
            </p>
            <Link
              href="/coach-ia/maths?classe=6e"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
            >
              <Sparkles className="h-4 w-4" />
              Découvrir le Coach IA
            </Link>
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
            <span>eleveai.fr · Cahier de vacances</span>
            <span>Vers la 6ᵉ</span>
          </footer>
        </section>
      </article>

      {/* Bouton imprimer flottant (écran) */}
      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }

          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
          }

          /* Une « page » du cahier = une page imprimée */
          .cahier-page {
            break-after: page;
            page-break-after: always;
          }
          .cahier-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          /* Les corrigés démarrent toujours sur une page neuve. */
          .corriges-page {
            break-before: page;
            page-break-before: always;
          }

          /* À l'impression, les corrigés sont toujours dépliés. */
          .fiche-correction > summary {
            list-style: none;
            font-weight: 800;
            color: #0f172a !important;
          }
          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}

/** Réponses du calcul mental, dans l'ordre des énoncés. */
function calculReponses(calcul: string[]): string {
  const reponses: Record<string, string> = {
    "7 × 8 =": "56",
    "48 ÷ 6 =": "8",
    "125 + 78 =": "203",
    "1000 − 365 =": "635",
    "9 × 6 =": "54",
    "6 × 7 =": "42",
    "56 ÷ 8 =": "7",
    "240 + 160 =": "400",
    "double de 45 =": "90",
    "8 × 8 =": "64",
    "9 × 7 =": "63",
    "63 ÷ 9 =": "7",
    "1/2 de 50 =": "25",
    "350 + 450 =": "800",
    "12 × 5 =": "60",
    "8 × 6 =": "48",
    "72 ÷ 8 =": "9",
    "0,5 + 0,5 =": "1",
    "1000 − 250 =": "750",
    "7 × 7 =": "49",
    "6 × 9 =": "54",
    "81 ÷ 9 =": "9",
    "1/4 de 100 =": "25",
    "275 + 325 =": "600",
    "11 × 4 =": "44",
  };
  return calcul
    .map((c) => `${c.replace(/\s*=$/, "")} ${reponses[c] ?? "?"}`)
    .join(" · ");
}
