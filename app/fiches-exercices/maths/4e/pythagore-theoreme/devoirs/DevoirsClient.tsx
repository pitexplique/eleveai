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
import { insecables } from "@/lib/fiches/typographie";

const URL_PAGE = "https://www.eleveai.fr/fiches-exercices/maths/4e/pythagore-theoreme/devoirs";

type Exercice = { enonce: string; corrige: string; figure?: ReactNode };
// ⭐ `video` absent : l'épisode n'est pas encore tourné. Le devoir sort quand même,
// sans QR d'épisode (seulement celui du corrigé) ; on l'ajoute le jour de la mise en ligne.
type Devoir = { numero: number; titre: string; duree?: string; video?: string; exercices: Exercice[] };

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
  {
    numero: 3,
    titre: "Calculer l'hypoténuse",
    duree: "4 min",
    video: "https://youtu.be/vwkGpUNngtQ",
    exercices: [
      {
        enonce: "Le triangle ABC est rectangle en A, avec AB = 3 cm et AC = 4 cm. Calcule BC.",
        corrige: "Rectangle en A : l'hypoténuse est BC.\nBC² = AB² + AC² = 9 + 16 = 25.\nBC = √25 = 5 cm.",
      },
      {
        enonce: "Le triangle DEF est rectangle en E, avec DE = 6 cm et EF = 8 cm. Calcule DF.",
        corrige: "Rectangle en E : l'hypoténuse est DF.\nDF² = DE² + EF² = 36 + 64 = 100.\nDF = √100 = 10 cm.",
      },
      {
        enonce: "Les côtés de l'angle droit d'un triangle rectangle mesurent 9 cm et 12 cm. Combien mesure l'hypoténuse ?",
        corrige: "Hypoténuse² = 9² + 12² = 81 + 144 = 225.\nHypoténuse = √225 = 15 cm.",
      },
      {
        enonce: "Le triangle GHI est rectangle en H, avec GH = 5 cm et HI = 7 cm. Calcule GI, arrondi au dixième.",
        corrige: "GI² = GH² + HI² = 25 + 49 = 74.\nGI = √74 ≈ 8,602, donc GI ≈ 8,6 cm.",
      },
      {
        enonce: "Un terrain de football rectangulaire mesure 100 m sur 60 m. Combien mesure sa diagonale, arrondie au mètre ?",
        corrige: "La diagonale est l'hypoténuse d'un triangle rectangle de côtés 100 m et 60 m.\nDiagonale² = 10 000 + 3 600 = 13 600.\nDiagonale = √13 600 ≈ 116,6, donc environ 117 m.",
      },
    ],
  },
  {
    numero: 4,
    titre: "Calculer un côté de l'angle droit",
    duree: "3 min",
    video: "https://youtu.be/h3b8PvZDaEk",
    exercices: [
      {
        enonce: "Le triangle ABC est rectangle en A, avec BC = 5 cm et AB = 3 cm. Calcule AC.",
        corrige: "L'hypoténuse est BC : on soustrait.\nAC² = BC² − AB² = 25 − 9 = 16.\nAC = √16 = 4 cm.",
      },
      {
        enonce: "Le triangle MNP est rectangle en M, avec NP = 13 cm et MN = 5 cm. Calcule MP.",
        corrige: "L'hypoténuse est NP.\nMP² = NP² − MN² = 169 − 25 = 144.\nMP = √144 = 12 cm.",
      },
      {
        enonce: "Le triangle ABC est rectangle en A, avec BC = 5 cm et AB = 3 cm. Un élève écrit : « AC² = 5² + 3² = 34 ». Quelle est la bonne valeur de AC ?",
        corrige: "L'élève a additionné, alors que BC est l'hypoténuse : il fallait soustraire.\nAC² = 25 − 9 = 16, donc AC = 4 cm.",
      },
      {
        enonce: "Le triangle RST est rectangle en S, avec RT = 10 cm et RS = 7 cm. Calcule ST, arrondi au dixième.",
        corrige: "L'hypoténuse est RT.\nST² = RT² − RS² = 100 − 49 = 51.\nST = √51 ≈ 7,141, donc ST ≈ 7,1 cm.",
      },
      {
        enonce: "Une échelle de 5 m est posée contre le mur d'une case. Son pied est à 3 m du mur. À quelle hauteur arrive le haut de l'échelle ?",
        corrige: "L'échelle est l'hypoténuse : elle est en face de l'angle droit du mur et du sol.\nHauteur² = 5² − 3² = 25 − 9 = 16.\nHauteur = √16 = 4 m.",
      },
    ],
  },
  {
    numero: 5,
    titre: "Rédiger",
    exercices: [
      {
        enonce: "Remets dans l'ordre : (a) BC = √100 = 10 cm. (b) D'après le théorème de Pythagore : BC² = AB² + AC². (c) Le triangle ABC est rectangle en A. (d) BC² = 6² + 8² = 36 + 64 = 100.",
        corrige: "L'ordre est c, b, d, a.\nOn dit d'abord pourquoi on a le droit (rectangle en A), puis le théorème, puis le calcul, puis la longueur.",
      },
      {
        enonce: "Le triangle KLM est rectangle en L. Complète : « D'après le théorème de …, KM² = … + … ».",
        corrige: "D'après le théorème de Pythagore, KM² = KL² + LM².\nRectangle en L : l'hypoténuse est KM, le côté sans la lettre L.",
      },
      {
        enonce: "Le triangle ABC est rectangle en A, avec AB = 6 cm et AC = 8 cm. Rédige le calcul de BC en 4 lignes.",
        corrige: "Le triangle ABC est rectangle en A.\nD'après le théorème de Pythagore : BC² = AB² + AC².\nBC² = 6² + 8² = 36 + 64 = 100.\nBC = √100 = 10 cm.",
      },
      {
        enonce: "Le triangle EFG est rectangle en F. Un élève écrit : « EF² = FG² + EG² ». Quelle est la bonne égalité ?",
        corrige: "Rectangle en F : l'hypoténuse est EG, pas EF.\nLa bonne égalité est EG² = EF² + FG².",
      },
      {
        enonce: "Le triangle PQR est rectangle en Q, avec PR = 10 cm et PQ = 6 cm. Rédige le calcul de QR en 4 lignes.",
        corrige: "Le triangle PQR est rectangle en Q.\nD'après le théorème de Pythagore : PR² = PQ² + QR², donc QR² = PR² − PQ².\nQR² = 10² − 6² = 100 − 36 = 64.\nQR = √64 = 8 cm.",
      },
    ],
  },
  {
    numero: 6,
    titre: "La réciproque : vérifier l'égalité",
    duree: "4 min",
    video: "https://youtu.be/82Vbm0B3lWQ",
    exercices: [
      {
        enonce: "Un triangle a des côtés de 6 cm, 8 cm et 10 cm. Calcule le carré du plus grand côté, puis la somme des carrés des deux autres.",
        corrige: "Plus grand côté : 10² = 100.\nLes deux autres : 6² + 8² = 36 + 64 = 100.",
      },
      {
        enonce: "Un triangle a des côtés de 5 cm, 12 cm et 13 cm. Calcule le carré du plus grand côté, puis la somme des carrés des deux autres.",
        corrige: "Plus grand côté : 13² = 169.\nLes deux autres : 5² + 12² = 25 + 144 = 169.",
      },
      {
        enonce: "Un triangle a des côtés de 4 cm, 5 cm et 6 cm. Calcule le carré du plus grand côté, puis la somme des carrés des deux autres.",
        corrige: "Plus grand côté : 6² = 36.\nLes deux autres : 4² + 5² = 16 + 25 = 41.\nLes deux résultats sont différents.",
      },
      {
        enonce: "Dans le triangle ABC, AB = 8 cm, BC = 17 cm et AC = 15 cm. Quel est le plus grand côté ? Calcule son carré, puis la somme des carrés des deux autres.",
        corrige: "Le plus grand côté est BC.\nBC² = 289.\nAB² + AC² = 64 + 225 = 289.",
      },
      {
        enonce: "La corde à 13 nœuds des bâtisseurs forme un triangle de 3, 4 et 5 intervalles. Calcule 5², puis 3² + 4².",
        corrige: "5² = 25.\n3² + 4² = 9 + 16 = 25.\nC'est la même valeur : c'est pour cela que la corde donne un angle droit.",
      },
    ],
  },
  {
    numero: 7,
    titre: "La réciproque : conclure",
    exercices: [
      {
        enonce: "Dans le triangle ABC, AB = 6 cm, AC = 8 cm et BC = 10 cm. Ce triangle est-il rectangle ? Si oui, en quel sommet ?",
        corrige: "Le plus grand côté est BC : BC² = 100.\nAB² + AC² = 36 + 64 = 100.\nBC² = AB² + AC² : d'après la réciproque du théorème de Pythagore, ABC est rectangle en A, le sommet en face de BC.",
      },
      {
        enonce: "Dans le triangle DEF, DE = 4 cm, EF = 5 cm et DF = 6 cm. Ce triangle est-il rectangle ?",
        corrige: "Le plus grand côté est DF : DF² = 36.\nDE² + EF² = 16 + 25 = 41.\n36 ≠ 41 : le triangle DEF n'est pas rectangle.",
      },
      {
        enonce: "Dans le triangle KLM, KL = 9 cm, LM = 12 cm et KM = 15 cm. Ce triangle est-il rectangle ? Si oui, en quel sommet ?",
        corrige: "Le plus grand côté est KM : KM² = 225.\nKL² + LM² = 81 + 144 = 225.\nKM² = KL² + LM² : KLM est rectangle en L.",
      },
      {
        enonce: "Un maçon trace une dalle : deux bords de 60 cm et 80 cm, et la diagonale mesure 100 cm. L'angle entre les deux bords est-il droit ?",
        corrige: "100² = 10 000.\n60² + 80² = 3 600 + 6 400 = 10 000.\nC'est égal : d'après la réciproque du théorème de Pythagore, l'angle est droit.",
      },
      {
        enonce: "Sur une autre dalle, les bords mesurent encore 60 cm et 80 cm, mais la diagonale mesure 98 cm. L'angle est-il droit ?",
        corrige: "98² = 9 604.\n60² + 80² = 10 000.\n9 604 ≠ 10 000 : l'angle n'est pas droit.",
      },
    ],
  },
];

/** Les diapos du mode classe : l'ouverture (le QR de l'épisode en grand), puis un exercice par diapo. */
function slidesDuDevoir(d: Devoir): ClasseSlide[] {
  const badge = `Devoir ${d.numero}`;
  return [
    {
      titre: d.video ? `Épisode ${d.numero} : ${d.titre}` : d.titre,
      badge,
      teinte: "objectif",
      section: d.video
        ? {
            type: "objectif",
            phrase: `Regarde l'épisode ${d.numero} (${d.duree}), puis fais les 5 exercices.`,
            sousPhrase: "Scanne le code pour voir la vidéo.",
          }
        : { type: "objectif", phrase: `Devoir ${d.numero} : 5 exercices.`, sousPhrase: d.titre },
      ...(d.video
        ? {
            schema: (
              <div className="flex justify-center rounded-3xl bg-white p-6">
                <QRCodeSVG value={d.video} size={260} aria-label={`QR code vers l'épisode ${d.numero}`} />
              </div>
            ),
          }
        : {}),
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
          lignes: e.corrige.split("\n").flatMap((l) => l.split(/(?<=[.:])\s+(?=[A-ZÉÀ√])/)),
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
      <header className="flex items-start justify-between gap-4 border-b border-slate-300 pb-3 print:gap-2 print:pb-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
            Maths 4e · Pythagore · Devoir {d.numero}
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 print:mt-0 print:text-[15px]">
            {d.video ? `Épisode ${d.numero} : ` : `Devoir ${d.numero} : `}
            {d.titre}
          </h2>
          <p className="mt-2 text-sm text-slate-700 print:mt-0 print:text-[10.5px]">
            {d.video ? (
              <>
                <b>1.</b> Regarde l'épisode ({d.duree}) : scanne le code. <b>2.</b> Fais les 5 exercices sur ton
                cahier.
              </>
            ) : (
              <>Fais les 5 exercices sur ton cahier, puis vérifie avec le corrigé.</>
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          {d.video && (
            <figure className="text-center">
              <QRCodeSVG value={d.video} size={72} className="qr" aria-label={`QR code vers l'épisode ${d.numero}`} />
              <figcaption className="mt-1 text-[10px] font-bold text-slate-600">l'épisode</figcaption>
            </figure>
          )}
          <figure className="text-center">
            <QRCodeSVG value={URL_PAGE} size={72} className="qr" aria-label="QR code vers le corrigé" />
            <figcaption className="mt-1 text-[10px] font-bold text-slate-600">le corrigé</figcaption>
          </figure>
        </div>
      </header>
      <ol className="mt-4 space-y-3 print:mt-1.5 print:space-y-1">
        {d.exercices.map((e, i) => (
          <li key={i} className="text-[15px] leading-snug text-slate-900 print:text-[11px] print:leading-tight">
            <span className="mr-1 font-black text-sky-700">Ex. {i + 1}.</span>
            {insecables(e.enonce)}
            {e.figure && (
              <span className="ml-3 inline-block w-28 align-middle print:w-[18mm]">{e.figure}</span>
            )}
            <details className="mt-1 print:hidden">
              <summary className="cursor-pointer text-sm font-bold text-emerald-700">Voir la correction</summary>
              <p className="mt-1 whitespace-pre-line rounded-xl bg-emerald-50 p-3 text-sm text-slate-800">{insecables(e.corrige)}</p>
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
            Un devoir par compétence du coach : l'élève regarde l'épisode quand il existe, puis fait 5 exercices de la même compétence. Tous les
            devoirs tiennent sur une seule feuille A4 recto verso ; le corrigé reste ici, à l'écran. En classe, le mode classe les
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
          /* ⭐ Frédéric, 12/10 : « une feuille A4 recto verso », « 5, 4 ou 7, mais une
             feuille A4 à imprimer ». Un quart de page par devoir : 4 par face, 8 au plus. */
          .devoir { break-inside: avoid; height: 66mm; overflow: hidden; }
          .devoir + .devoir { border-top: 1.5px dashed #94a3b8 !important; padding-top: 3mm !important; }
          .devoir:nth-of-type(4n) { break-after: page; }
          .devoir svg.qr { width: 15mm; height: 15mm; }
          .devoir figcaption { font-size: 8px; margin-top: 0; }
        }
      `}</style>
    </main>
  );
}
