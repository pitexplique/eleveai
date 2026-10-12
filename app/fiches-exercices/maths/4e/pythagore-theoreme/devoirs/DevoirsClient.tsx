"use client";

// ⭐ LES DEVOIRS DE LA SÉRIE PYTHAGORE (12/10/2026). Frédéric, en prof : « 5
// exercices par micro, comme devoir ». Une DEMI-PAGE A4 par épisode : le QR de
// l'épisode (« regarde-le d'abord »), 5 exercices de SA micro, et le QR de
// cette page, où se trouve le corrigé (masqué à l'impression).
// ⛔ C'est le seul endroit où une vidéo de MICRO a un QR imprimé : la règle
// « pas de QR pour les micros, sauf 5 exercices par micro » (12/10/2026).
// ⭐ ET LE MODE CLASSE (« n'oublie pas le mode paysage pour les 5 exercices des
// micros ») : une diapo d'ouverture par devoir, le QR de l'épisode en grand,
// puis une diapo par exercice, correction à révéler. D'où des énoncés et des
// corrigés en TEXTE : le mode classe les typographie et les projette.
// Un épisode de plus = une entrée de plus dans DEVOIRS.

import { QRCodeSVG } from "qrcode.react";
import type { ReactNode } from "react";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";

const URL_PAGE = "https://www.eleveai.fr/fiches-exercices/maths/4e/pythagore-theoreme/devoirs";

type Exercice = { enonce: string; corrige: string; figure?: ReactNode };
type Devoir = { numero: number; titre: string; duree: string; video: string; exercices: Exercice[] };

// Le triangle « tourné » de l'exercice 2 du devoir 1 : rectangle en R, R en haut.
function TriangleTourne({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 150 100" className={className} aria-label="Triangle RST rectangle en R, tourné">
      <polygon points="60,15 15,78 125,65" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <polygon points="60,15 55,22 62.5,27.5 67.5,20.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text x="60" y="10" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">R</text>
      <text x="6" y="88" fontSize="12" fontWeight="700" fill="currentColor">S</text>
      <text x="130" y="72" fontSize="12" fontWeight="700" fill="currentColor">T</text>
    </svg>
  );
}

const DEVOIRS: Devoir[] = [
  {
    numero: 1,
    titre: "L'hypoténuse",
    duree: "2 min",
    video: "https://youtu.be/TBM5bum-xj4",
    exercices: [
      {
        enonce: "Le triangle ABC est rectangle en A. Quelle est son hypoténuse ?",
        corrige: "Rectangle en A : l'hypoténuse est le côté sans la lettre A, c'est [BC].",
      },
      {
        enonce: "Le triangle RST est rectangle en R. Quelle est son hypoténuse ?",
        corrige:
          "L'angle droit est en R, en haut : le triangle est tourné, mais la règle ne change pas. Le côté en face de R est [ST].",
        figure: <TriangleTourne className="w-full max-w-[280px] text-slate-900" />,
      },
      {
        enonce: "Un triangle rectangle a des côtés de 5 cm, 12 cm et 13 cm. Combien mesure son hypoténuse ?",
        corrige: "L'hypoténuse est toujours le plus long côté : elle mesure 13 cm.",
      },
      {
        enonce: "Vrai ou faux : « Le triangle DEF a trois angles de 60°. Son hypoténuse est [DE]. »",
        corrige:
          "Faux. Ce triangle n'a pas d'angle droit, donc il n'a pas d'hypoténuse : ce mot n'existe que dans un triangle rectangle.",
      },
      {
        enonce:
          "Une échelle de 3 m est posée contre un mur vertical, sur un sol plat. Son sommet peut-il être à 3,5 m de hauteur ? Réponds par oui ou non, et dis pourquoi en une phrase.",
        corrige:
          "Non. Le mur et le sol font un angle droit ; l'échelle est en face : c'est l'hypoténuse, le plus long côté. La hauteur atteinte est donc plus petite que 3 m.",
      },
    ],
  },
  {
    numero: 2,
    titre: "Le carré et la racine carrée",
    duree: "3 min",
    video: "https://youtu.be/FLaSgGr-lAA",
    exercices: [
      {
        enonce: "Calcule : 6² ; 9² ; 10².",
        corrige: "6² = 6 × 6 = 36 ; 9² = 9 × 9 = 81 ; 10² = 10 × 10 = 100.",
      },
      {
        enonce: "Un élève écrit : « 7² = 14 ». Quelle est la bonne valeur de 7² ?",
        corrige:
          "7² = 7 × 7 = 49. L'élève a calculé 7 × 2 = 14 : le petit 2 veut dire « multiplié par lui-même », pas « fois 2 ».",
      },
      {
        enonce: "Donne : √64 ; √81 ; √1.",
        corrige: "√64 = 8 car 8 × 8 = 64 ; √81 = 9 car 9 × 9 = 81 ; √1 = 1 car 1 × 1 = 1.",
      },
      {
        enonce: "Une terrasse carrée compte 144 carreaux. Combien de carreaux y a-t-il sur un côté ?",
        corrige:
          "On cherche le nombre qui, multiplié par lui-même, donne 144 : 12 × 12 = 144. Il y a 12 carreaux sur un côté (√144 = 12).",
      },
      {
        enonce: "Complète : 5² = … et √… = 5 ; 11² = … et √121 = …",
        corrige: "5² = 25 et √25 = 5 ; 11² = 121 et √121 = 11. Le carré et la racine font un aller-retour.",
      },
    ],
  },
];

/** Les diapos du mode classe : l'ouverture (le QR de l'épisode en grand), puis un exercice par diapo. */
function slidesDuDevoir(d: Devoir): ClasseSlide[] {
  const badge = `Devoir ${d.numero}`;
  return [
    {
      titre: `Épisode ${d.numero} : ${d.titre}`,
      badge,
      teinte: "objectif",
      section: {
        type: "objectif",
        phrase: `Regarde l'épisode ${d.numero} (${d.duree}), puis fais les 5 exercices.`,
        sousPhrase: "Scanne le code pour voir la vidéo.",
      },
      schema: (
        <div className="flex justify-center rounded-3xl bg-white p-6">
          <QRCodeSVG value={d.video} size={260} aria-label={`QR code vers l'épisode ${d.numero}`} />
        </div>
      ),
    },
    ...d.exercices.map(
      (e, i): ClasseSlide => ({
        titre: `Exercice ${i + 1}`,
        badge,
        teinte: "exercice",
        // Le corrigé en lignes, comme les feuilles d'exercices (encadré « Correction »,
        // une phrase par ligne) ; la section « exercice » l'aurait titré « Consigne ».
        section: {
          type: "corrige",
          enonce: e.enonce,
          lignes: e.corrige.split(/(?<=[.:])\s+(?=[A-ZÉÀ0-9√])/),
          revelable: true,
        },
        ...(e.figure ? { schema: e.figure, figureEtroite: true } : {}),
      }),
    ),
  ];
}

function BlocDevoir({ d }: { d: Devoir }) {
  return (
    <section className="devoir rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-300/30 sm:p-7 print:rounded-none print:border-0 print:p-0 print:shadow-none">
      <header className="flex items-start justify-between gap-4 border-b border-slate-300 pb-3 print:pb-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
            Maths 4e · Pythagore · Devoir {d.numero}
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 print:text-xl">
            Épisode {d.numero} : {d.titre}
          </h2>
          <p className="mt-2 text-sm text-slate-700 print:mt-1">
            <b>1.</b> Regarde l'épisode ({d.duree}) : scanne le code. <b>2.</b> Fais les 5 exercices sur ton cahier.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <figure className="text-center">
            <QRCodeSVG value={d.video} size={72} aria-label={`QR code vers l'épisode ${d.numero}`} />
            <figcaption className="mt-1 text-[10px] font-bold text-slate-600">l'épisode</figcaption>
          </figure>
          <figure className="text-center">
            <QRCodeSVG value={URL_PAGE} size={72} aria-label="QR code vers le corrigé" />
            <figcaption className="mt-1 text-[10px] font-bold text-slate-600">le corrigé</figcaption>
          </figure>
        </div>
      </header>
      <ol className="mt-4 space-y-3 print:mt-3 print:space-y-2.5">
        {d.exercices.map((e, i) => (
          <li key={i} className="text-[15px] leading-snug text-slate-900 print:text-[13.5px]">
            <span className="mr-1 font-black text-sky-700">Ex. {i + 1}.</span>
            {e.enonce}
            {e.figure && (
              <span className="ml-3 inline-block w-28 align-middle print:w-[30mm]">{e.figure}</span>
            )}
            <details className="mt-1 print:hidden">
              <summary className="cursor-pointer text-sm font-bold text-emerald-700">Voir la correction</summary>
              <p className="mt-1 rounded-xl bg-emerald-50 p-3 text-sm text-slate-800">{e.corrige}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function DevoirsClient() {
  const slides = DEVOIRS.flatMap(slidesDuDevoir);
  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800 print:bg-white">
      <article className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-8 print:max-w-none print:space-y-0 print:px-0 print:py-0">
        <header className="space-y-3 print:hidden">
          <p className="text-sm font-bold text-sky-700">Maths 4e · Le théorème de Pythagore</p>
          <h1 className="text-3xl font-black text-slate-900">Les devoirs de la série Pythagore</h1>
          <p className="text-slate-700">
            Un devoir par épisode : l'élève regarde la vidéo, puis fait 5 exercices de la même compétence. Deux
            devoirs tiennent sur une feuille A4 ; le corrigé reste ici, à l'écran. En classe, le mode classe les
            projette un exercice à la fois.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ModeClasse sousTitre="Pythagore 4e - les devoirs" slides={slides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-sky-700 px-5 py-2 font-bold text-white hover:bg-sky-800"
            >
              Imprimer les devoirs
            </button>
          </div>
        </header>
        {DEVOIRS.map((d) => (
          <BlocDevoir key={d.numero} d={d} />
        ))}
      </article>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm 12mm; }
          /* Seule la feuille s'imprime : ni l'en-tête, ni le pied, ni les boutons du site. */
          body > *:not(main) { display: none !important; }
          main { min-height: auto !important; }
          .devoir { break-inside: avoid; height: 132mm; overflow: hidden; }
          .devoir + .devoir { border-top: 1.5px dashed #94a3b8 !important; padding-top: 6mm !important; }
          .devoir:nth-of-type(2n) { break-after: page; }
        }
      `}</style>
    </main>
  );
}
