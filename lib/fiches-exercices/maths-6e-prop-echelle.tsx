// ─── Fiche d'exercices : les échelles (6e) — 20 exercices corrigés ────────────
//
// Lot des feuilles de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-prop-proportionnalite.tsx` (son tableau fléché `tableauCoef`) :
// aides de dessin locales, écrites EN CLAIR, relues par le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/echelles.bank.ts`, notionId
// prop_echelle : comprendre ce que dit une échelle, du plan vers la réalité, de
// la réalité vers le plan, défis (retrouver l'échelle, plans et maquettes).
// ⛔ LIMITES DE LA 6e (celles de la banque et du BO) : le PRODUIT EN CROIX EST
// INTERDIT. Les procédures sont la LINÉARITÉ (« 3 fois plus sur le plan, donc
// 3 fois plus en vrai ») et le RETOUR À L'UNITÉ (« je cherche ce que vaut
// 1 cm »). L'échelle GRAPHIQUE (« 1 cm représente 20 m ») d'abord, l'échelle
// en fraction (1/10, 1/50, 1/100) ensuite, avec LA MÊME unité des deux côtés.
// Pas d'échelle d'agrandissement, pas d'aire à l'échelle.
// ⛔ Aucun exemple de la banque n'est repris : ni le plan du collège (1 cm pour
// 10 m, 3 cm), ni la maquette au 1/200, ni la route de 4 cm à 5 km, ni la carte
// de La Réunion, ni la pièce de 4 cm au 1/200, ni le couloir de 6 cm, ni la cour
// de 70 m, ni le trajet de 30 km, ni le terrain de 60 m, ni les 12 m pour 3 cm,
// ni le terrain de 40 m sur 20 m à 5 m le cm.
//
// Les pièges nommés : écrire « 2 cm = 2 m » (1), diviser au lieu de multiplier
// du plan vers la réalité (4), multiplier au lieu de diviser de la réalité vers
// le plan (3, 15), changer d'unité dans une échelle en fraction (5, 12, 18),
// oublier de convertir avant de diviser (11), croire que la petite carte montre
// plus de détails (13), additionner des centimètres et des mètres (10, 14),
// l'échelle retournée (8, 16), l'aire au lieu du tour (19), le dessin trop grand
// pour la feuille (20).
//
// Faits réels : un terrain de basket mesure 28 m de long (règlement FIBA), un
// terrain de handball 40 m sur 20 m (règlement IHF), un terrain de football
// environ 100 m de long. Tout le reste (parc, cartes, voiture miniature,
// appartement, chambre, maquettes, sentier, immeuble, chasse au trésor, jardin,
// rue de Léo) est un MODÈLE, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS :
//   · `plan` — l'échelle graphique (un trait noir de 1 cm et ce qu'il vaut) et
//     des traits à l'échelle du dessin, chacun avec son nom et sa longueur sur
//     le plan. C'est le plan qu'on LIT ;
//   · `piece` — des rectangles à l'échelle (chambre, lit, terrain, potager),
//     leur nom et leurs dimensions sur le plan écrits dedans ;
//   · `tableauCoef` — le tableau plan ↔ réalité avec sa flèche « ↓ × … »
//     (repris de la feuille de 5e, couché sur téléphone) ;
//   · `tableau` de figures.tsx, `table` (plusieurs lignes, 3 colonnes au plus).
// SVG de viewBox 300, police 14, sans `min-w`. Le script vérifie que tout tient
// dans le cadre et que rien ne se chevauche. 14 dessins imprimés.
//
// Les corrigés sont écrits à la première personne (« je multiplie »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-prop-echelle.mjs`.
//
// Micro-compétences : echelle_comprendre (1, 4, 5, 13, 15),
// echelle_distance_reelle (2, 4, 5, 7, 9, 10, 12, 14, 17, 18, 19),
// echelle_distance_plan (3, 6, 7, 11, 12, 13, 15, 16, 17, 18, 20),
// echelle_defi (8, 10, 16, 17, 19, 20). 4/4.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const ENCRE = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 4.5 → « 4,5 ». */
const virgule = (x: number) => String(x).replace(".", ",");

/** L'échelle graphique en haut d'un dessin : un trait noir de 1 cm (u unités), et ce qu'il vaut. */
const barreEchelle = (u: number, echelle: string) => (
  <g>
    <rect x={12} y={10} width={u} height={8} fill={ENCRE} />
    <text x={12 + u + 8} y={19} fontSize={14} fontWeight={700} fill={ENCRE}>
      {echelle}
    </text>
  </g>
);

/**
 * UN PLAN À L'ÉCHELLE : l'échelle graphique en haut (un trait de 1 cm, `u`
 * unités du dessin), puis un trait par longueur, à l'échelle du dessin, avec
 * « nom : longueur sur le plan » au-dessus. `echelle` vide : pas de barre (deux
 * cartes différentes sur un même dessin).
 * ⚠️ Texte NU. ⭐ Le script vérifie que chaque trait et chaque étiquette tiennent
 * dans le cadre (8,8 par signe en corps 14 gras).
 */
const plan = (u: number, echelle: string, traits: { nom: string; cm: number; label: string }[]) => {
  const y0 = echelle ? 58 : 30;
  const H = y0 + (traits.length - 1) * 44 + 14;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un plan${echelle ? ` à l'échelle ${echelle}` : ""} : ${traits.map((t) => `${t.nom}, ${t.label}`).join(" ; ")}.`}>
        {echelle ? barreEchelle(u, echelle) : null}
        {traits.map((t, i) => {
          const y = y0 + i * 44;
          const x1 = 12 + t.cm * u;
          const texte = `${t.nom} : ${t.label}`;
          const demi = (texte.length * 8.8) / 2;
          const cx = Math.min(Math.max((12 + x1) / 2, 4 + demi), 296 - demi);
          const couleur = i % 2 === 0 ? BLEU : ORANGE;
          return (
            <g key={i}>
              <line x1={12} y1={y} x2={x1} y2={y} stroke={couleur} strokeWidth={3} />
              <line x1={12} y1={y - 6} x2={12} y2={y + 6} stroke={couleur} strokeWidth={2} />
              <line x1={x1} y1={y - 6} x2={x1} y2={y + 6} stroke={couleur} strokeWidth={2} />
              <text x={cx} y={y - 10} textAnchor="middle" fontSize={14} fontWeight={700} fill={couleur}>
                {texte}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * DES RECTANGLES À L'ÉCHELLE (une chambre et son lit, un terrain, un potager).
 * Position et dimensions EN CM SUR LE PLAN, `u` unités du dessin par cm. Le nom
 * au centre ; avec `cotes`, les dimensions sur le plan dessous (« 8 × 6 cm »).
 * ⭐ Le script vérifie que tout tient dans le cadre, que chaque texte tient
 * dans son rectangle, et qu'aucun rectangle ne recouvre le texte d'un autre.
 */
const piece = (u: number, echelle: string, formes: { nom: string; x: number; y: number; l: number; h: number; cotes?: boolean }[]) => {
  const y0 = 36;
  const H = y0 + Math.max(...formes.map((f) => f.y + f.h)) * u + 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un plan à l'échelle ${echelle} : ${formes.map((f) => `${f.nom}, ${virgule(f.l)} cm sur ${virgule(f.h)} cm`).join(" ; ")}.`}>
        {barreEchelle(u, echelle)}
        {formes.map((f, i) => {
          const cx = 12 + (f.x + f.l / 2) * u;
          const cy = y0 + (f.y + f.h / 2) * u;
          return (
            <g key={i}>
              <rect x={12 + f.x * u} y={y0 + f.y * u} width={f.l * u} height={f.h * u} fill={i === 0 ? "#dbeafe" : "#fed7aa"} stroke={ENCRE} strokeWidth={1.5} />
              <text x={cx} y={f.cotes ? cy - 4 : cy + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
                {f.nom}
              </text>
              {f.cotes ? (
                <text x={cx} y={cy + 14} textAnchor="middle" fontSize={14} fill={ENCRE}>
                  {`${virgule(f.l)} × ${virgule(f.h)} cm`}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * LE TABLEAU PLAN ↔ RÉALITÉ (repris de la feuille de 5e) : deux lignes, et à
 * droite la flèche « ↓ × coefficient ». Une case « !45 » est TROUVÉE : en rouge.
 * Sur TÉLÉPHONE (sous `sm`), le tableau est couché : rien ne défile à 375 px.
 */
const tableauCoef = (titres: [string, string], haut: string[], bas: string[], coef: string) => {
  const cellule = (c: string, i: number) => {
    const trouvee = c.startsWith("!");
    return (
      <td key={i} className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${trouvee ? "font-bold text-red-600" : "text-slate-900"}`}>
        {trouvee ? c.slice(1) : c}
      </td>
    );
  };
  const titre = (texte: string) => <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{texte}</th>;
  return (
    <>
      <div className="sm:hidden print:hidden">
        <table className="mx-auto border-collapse text-sm">
          <thead>
            <tr>
              {titre(titres[0])}
              {titre(titres[1])}
            </tr>
          </thead>
          <tbody>
            {haut.map((h, i) => (
              <tr key={i}>
                {cellule(h, 0)}
                {cellule(bas[i], 1)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-center text-sm font-bold text-blue-700">→ × {coef}</p>
      </div>
      <div className="hidden sm:block print:block">
        <table className="mx-auto border-collapse text-sm">
          <tbody>
            <tr>
              {titre(titres[0])}
              {haut.map(cellule)}
              <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
                ↓ × {coef}
              </td>
            </tr>
            <tr>
              {titre(titres[1])}
              {bas.map(cellule)}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesPropEchelle6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-echelle",
  titre: "Les échelles",
  accroche:
    "Vingt exercices, du plus simple au problème. Lire une échelle, passer du plan à la réalité, puis de la réalité au plan. Retrouver l'échelle d'un plan. Des cartes de randonnée, une chambre, un terrain de handball, une maquette d'avion, une chasse au trésor. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le plan dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/prop-echelle", titre: "Les échelles" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire l'échelle, puis multiplier ou diviser. J'écris l'unité.",
      rappel: [
        "L'échelle dit ce que vaut $1$ cm sur le plan. Par exemple : $1$ cm représente $10$ m.",
        "Du plan vers la réalité, je MULTIPLIE : $3$ cm, c'est $3$ fois $10$ m.",
        "De la réalité vers le plan, je DIVISE : $50$ m, c'est $50 \\div 10 = 5$ cm.",
      ],
      exercices: [
        {
          enonce: "Sur une carte de randonnée, l'échelle est dessinée : $1$ cm représente $500$ m.\na) Que représente le trait a) de $2$ cm ?\nb) Et le trait b) de $4$ cm ? Donne la réponse en m, puis en km.",
          figure: plan(40, "1 cm ↔ 500 m", [
            { nom: "a)", cm: 2, label: "2 cm" },
            { nom: "b)", cm: 4, label: "4 cm" },
          ]),
          correction:
            "a) $2$ cm, c'est $2$ fois $1$ cm.\nDonc $2 \\times 500 = 1\\,000$ m.\nb) $4$ cm, c'est $4$ fois $1$ cm : $4 \\times 500 = 2\\,000$ m.\nEt $2\\,000$ m $= 2$ km.\n⭐ Deux fois plus sur la carte, donc deux fois plus en vrai.\n⛔ Le piège : écrire « $2$ cm $= 2$ m ». L'échelle dit que $1$ cm vaut $500$ m.\nRéponse : a) $1\\,000$ m ; b) $2\\,000$ m, soit $2$ km.",
          micros: ["echelle_comprendre"],
        },
        {
          enonce: "Sur le plan d'un parc, $1$ cm représente $20$ m. L'allée des tilleuls mesure $6$ cm sur le plan. Quelle est sa longueur réelle ?",
          correction:
            "Je vais du plan vers la réalité : je multiplie.\n$6$ cm, c'est $6$ fois $1$ cm.\n$6 \\times 20 = 120$ m.\n⭐ Contrôle : une allée de parc de $120$ m, c'est possible.\nRéponse : l'allée mesure $120$ m.",
          schema: ecranSeulement(plan(30, "1 cm ↔ 20 m", [{ nom: "allée", cm: 6, label: "6 cm = 120 m" }])),
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur un plan, $1$ cm représente $4$ m. Un terrain de basket mesure $28$ m de long. Quelle longueur a-t-il sur le plan ?",
          correction:
            "Je vais de la réalité vers le plan : je divise.\nJe cherche combien de fois $4$ m il y a dans $28$ m.\n$28 \\div 4 = 7$ cm.\n⛔ Le piège : multiplier, $28 \\times 4 = 112$ cm. Le dessin serait plus long qu'une table !\nRéponse : le terrain mesure $7$ cm sur le plan.",
          schema: plan(30, "1 cm ↔ 4 m", [{ nom: "terrain", cm: 7, label: "7 cm" }]),
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Sur une carte, $1$ cm représente $10$ km. Une route mesure $3$ cm sur la carte. Lina écrit : « la route mesure $0{,}3$ km ».\na) Pourquoi est-ce impossible ?\nb) Quelle est la vraie longueur de la route ?",
          correction:
            "a) $1$ cm vaut déjà $10$ km. Alors $3$ cm valent plus que $10$ km.\nOr $0{,}3$ km, c'est bien moins que $10$ km. C'est impossible.\nLina a divisé au lieu de multiplier.\nb) Du plan vers la réalité, je multiplie : $3 \\times 10 = 30$ km.\n⛔ Le piège : se tromper de sens. Sur une carte, tout est plus petit qu'en vrai.\nRéponse : la route mesure $30$ km.",
          schema: ecranSeulement(tableauCoef(["Carte (cm)", "Route (km)"], ["1", "3"], ["10", "!30"], "10")),
          micros: ["echelle_comprendre", "echelle_distance_reelle"],
        },
        {
          enonce: "Une voiture miniature est à l'échelle $\\dfrac{1}{10}$. Elle mesure $40$ cm de long.\na) Que veut dire l'échelle $\\dfrac{1}{10}$ ?\nb) Quelle est la longueur de la vraie voiture, en cm puis en m ?",
          correction:
            "a) $1$ cm sur la miniature représente $10$ cm en vrai.\nLes deux longueurs sont dans la MÊME unité.\nb) Je multiplie par $10$ : $40 \\times 10 = 400$ cm.\nEt $400$ cm $= 4$ m.\n⛔ Le piège : lire « $1$ cm pour $10$ m ». Avec une fraction, on garde la même unité.\nRéponse : la vraie voiture mesure $400$ cm, soit $4$ m.",
          schema: ecranSeulement(tableauCoef(["Miniature (cm)", "Voiture (cm)"], ["1", "40"], ["10", "!400"], "10")),
          micros: ["echelle_comprendre", "echelle_distance_reelle"],
        },
        {
          enonce: "Sur une carte, $1$ cm représente $2$ km. Deux villages sont à $9$ km l'un de l'autre. Quelle distance les sépare sur la carte ?",
          correction:
            "Je vais de la réalité vers la carte : je divise.\n$9 \\div 2 = 4{,}5$ cm.\n⭐ Contrôle : $4{,}5 \\times 2 = 9$ km.\n⛔ Le piège : écrire « $4$ cm reste $1$ ». Je peux tracer $4{,}5$ cm avec ma règle.\nRéponse : les villages sont à $4{,}5$ cm sur la carte.",
          schema: plan(40, "1 cm ↔ 2 km", [{ nom: "villages", cm: 4.5, label: "4,5 cm" }]),
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Sur ce plan, $1$ cm représente $15$ m. Complète le tableau.",
          figure: tableau(["Plan (cm)", "1", "3", "5", "?"], ["Réel (m)", "15", "?", "?", "120"], true),
          correction:
            "Du plan vers la réalité, je multiplie par $15$.\n$3 \\times 15 = 45$ m et $5 \\times 15 = 75$ m.\nDe la réalité vers le plan, je divise par $15$.\n$120 \\div 15 = 8$ cm.\n⭐ Contrôle : $8 \\times 15 = 120$.\nRéponse : $45$ m ; $75$ m ; $8$ cm.",
          schema: ecranSeulement(tableauCoef(["Plan (cm)", "Réel (m)"], ["1", "3", "5", "!8"], ["15", "!45", "!75", "120"], "15")),
          micros: ["echelle_distance_reelle", "echelle_distance_plan"],
        },
        {
          enonce: "Sur un plan, un terrain de football de $100$ m est dessiné par un trait de $5$ cm. Que représente $1$ cm sur ce plan ?",
          correction:
            "Je cherche ce que vaut $1$ cm : je partage $100$ m en $5$.\n$100 \\div 5 = 20$ m.\nL'échelle est donc : $1$ cm représente $20$ m.\n⛔ Le piège : diviser $5$ par $100$. Je cherche des mètres POUR $1$ cm.\nRéponse : $1$ cm représente $20$ m.",
          schema: plan(30, "1 cm ↔ 20 m", [{ nom: "terrain", cm: 5, label: "5 cm = 100 m" }]),
          micros: ["echelle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même plan. Je lis l'échelle, puis je choisis : multiplier ou diviser.",
      rappel: [
        "Du plan vers la réalité : je multiplie. De la réalité vers le plan : je divise.",
        "Une échelle en fraction, comme $\\dfrac{1}{50}$ : $1$ cm pour $50$ cm, la même unité.",
        "Je mets les longueurs dans la bonne unité AVANT de calculer.",
      ],
      exercices: [
        {
          enonce: "Sur le plan d'un appartement, $1$ cm représente $2$ m. Voici la longueur de trois pièces sur le plan.\na) Trouve leurs longueurs réelles.\nb) Le couloir est-il plus long que le salon et la cuisine mis bout à bout ?",
          figure: plan(30, "1 cm ↔ 2 m", [
            { nom: "salon", cm: 3, label: "3 cm" },
            { nom: "cuisine", cm: 2, label: "2 cm" },
            { nom: "couloir", cm: 4.5, label: "4,5 cm" },
          ]),
          correction:
            "a) Je multiplie chaque longueur par $2$.\nSalon : $3 \\times 2 = 6$ m.\nCuisine : $2 \\times 2 = 4$ m.\nCouloir : $4{,}5 \\times 2 = 9$ m.\nb) Salon et cuisine bout à bout : $6 + 4 = 10$ m.\n$9$ m, c'est moins que $10$ m.\n⭐ Sur le plan aussi : $3 + 2 = 5$ cm, plus que $4{,}5$ cm.\nRéponse : $6$ m, $4$ m et $9$ m ; non, le couloir est plus court.",
          schema: ecranSeulement(table(["Pièce", "Plan", "Réel"], [
            ["salon", "3 cm", "6 m"],
            ["cuisine", "2 cm", "4 m"],
            ["couloir", "4,5 cm", "9 m"],
          ])),
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur une carte routière, $1$ cm représente $25$ km. De la ville A à la ville B, la route mesure $4$ cm. De B à C, elle mesure $6$ cm.\na) Quelle est la distance réelle de A à B ? Et de B à C ?\nb) Quelle distance fait-on de A à C, en passant par B ?",
          figure: plan(24, "1 cm ↔ 25 km", [
            { nom: "A → B", cm: 4, label: "4 cm" },
            { nom: "B → C", cm: 6, label: "6 cm" },
          ]),
          correction:
            "a) Je multiplie par $25$.\nDe A à B : $4 \\times 25 = 100$ km.\nDe B à C : $6 \\times 25 = 150$ km.\nb) J'additionne : $100 + 150 = 250$ km.\n⭐ Autre chemin : $4 + 6 = 10$ cm sur la carte, et $10 \\times 25 = 250$ km.\n⛔ Le piège : additionner des cm et des km. J'additionne des km avec des km.\nRéponse : $100$ km et $150$ km ; $250$ km.",
          micros: ["echelle_distance_reelle", "echelle_defi"],
        },
        {
          enonce: "Emma dessine le plan de sa chambre. Sur son plan, $1$ cm représente $50$ cm. Sa chambre mesure $4$ m sur $3$ m. Son lit mesure $2$ m sur $1$ m.\na) Quelles dimensions a la chambre sur le plan ?\nb) Et le lit ?",
          correction:
            "Je mets d'abord tout en cm, comme l'échelle.\n$4$ m $= 400$ cm et $3$ m $= 300$ cm.\na) Je divise par $50$ : $400 \\div 50 = 8$ cm et $300 \\div 50 = 6$ cm.\nb) Le lit : $2$ m $= 200$ cm et $1$ m $= 100$ cm.\n$200 \\div 50 = 4$ cm et $100 \\div 50 = 2$ cm.\n⛔ Le piège : calculer $4 \\div 50$ sans convertir. On trouverait moins d'un millimètre !\nRéponse : la chambre fait $8$ cm sur $6$ cm ; le lit $4$ cm sur $2$ cm.",
          schema: piece(24, "1 cm ↔ 50 cm", [
            { nom: "chambre", x: 0, y: 0, l: 8, h: 6, cotes: true },
            { nom: "lit", x: 4, y: 0, l: 4, h: 2, cotes: true },
          ]),
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Une maquette de maison est à l'échelle $\\dfrac{1}{50}$.\na) Sur la maquette, la maison mesure $12$ cm de haut. Quelle est sa vraie hauteur, en m ?\nb) La vraie porte mesure $2$ m de haut. Combien mesure-t-elle sur la maquette ?",
          correction:
            "$1$ cm sur la maquette représente $50$ cm en vrai.\na) Maquette vers réalité : je multiplie. $12 \\times 50 = 600$ cm.\nEt $600$ cm $= 6$ m.\nb) Je mets la porte en cm : $2$ m $= 200$ cm.\nRéalité vers maquette : je divise. $200 \\div 50 = 4$ cm.\n⛔ Le piège : diviser $2$ par $50$ sans convertir les mètres en centimètres.\nRéponse : a) $6$ m ; b) $4$ cm.",
          schema: ecranSeulement(tableauCoef(["Maquette (cm)", "Réel (cm)"], ["1", "12", "!4"], ["50", "!600", "200"], "50")),
          micros: ["echelle_distance_reelle", "echelle_distance_plan"],
        },
        {
          enonce: "Une route de $10$ km est dessinée sur deux cartes.\nCarte A : $1$ cm représente $1$ km.\nCarte B : $1$ cm représente $5$ km.\na) Quelle longueur a la route sur chaque carte ?\nb) Sur quelle carte voit-on le plus de détails ?",
          correction:
            "a) Carte A : $10 \\div 1 = 10$ cm.\nCarte B : $10 \\div 5 = 2$ cm.\nb) Sur la carte A, la route est $5$ fois plus longue.\nOn a plus de place pour dessiner : on voit plus de détails.\n⛔ Le piège : croire que « $5$ km » est la carte la plus précise. Plus $1$ cm vaut de km, plus la carte est petite.\nRéponse : $10$ cm et $2$ cm ; la carte A.",
          schema: plan(24, "", [
            { nom: "carte A", cm: 10, label: "10 cm" },
            { nom: "carte B", cm: 2, label: "2 cm" },
          ]),
          micros: ["echelle_comprendre", "echelle_distance_plan"],
        },
        {
          enonce: "Sur une carte de randonnée, $1$ cm représente $250$ m. Le sentier a trois parties : $3$ cm, puis $4$ cm, puis $1$ cm. Quelle est la longueur réelle du sentier, en m puis en km ?",
          correction:
            "Je multiplie chaque partie par $250$.\n$3 \\times 250 = 750$ m.\n$4 \\times 250 = 1\\,000$ m.\n$1 \\times 250 = 250$ m.\nJ'additionne : $750 + 1\\,000 + 250 = 2\\,000$ m.\nEt $2\\,000$ m $= 2$ km.\n⭐ Plus court : $3 + 4 + 1 = 8$ cm, et $8 \\times 250 = 2\\,000$ m.\nRéponse : le sentier mesure $2\\,000$ m, soit $2$ km.",
          schema: ecranSeulement(table(["Partie", "Carte", "Réel"], [
            ["1", "3 cm", "750 m"],
            ["2", "4 cm", "1 000 m"],
            ["3", "1 cm", "250 m"],
          ])),
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur un plan, $1$ cm représente $20$ m. Un immeuble mesure $60$ m de long. Hugo écrit : « sur le plan, il mesure $1\\,200$ cm ».\na) Pourquoi est-ce impossible ?\nb) Corrige son calcul.",
          correction:
            "a) $1\\,200$ cm, c'est $12$ m. Le dessin serait plus long qu'une classe !\nHugo a multiplié : $60 \\times 20 = 1\\,200$.\nb) De la réalité vers le plan, je divise.\n$60 \\div 20 = 3$ cm.\n⭐ Contrôle : $3 \\times 20 = 60$ m.\n⛔ Le piège : multiplier dans les deux sens. Un plan est plus PETIT que la réalité.\nRéponse : l'immeuble mesure $3$ cm sur le plan.",
          schema: ecranSeulement(tableauCoef(["Plan (cm)", "Réel (m)"], ["1", "!3"], ["20", "60"], "20")),
          micros: ["echelle_comprendre", "echelle_distance_plan"],
        },
        {
          enonce: "Un terrain de handball mesure $40$ m de long et $20$ m de large. Sur un plan, sa longueur mesure $8$ cm.\na) Que représente $1$ cm sur ce plan ?\nb) Combien mesure la largeur sur le plan ?",
          correction:
            "a) $8$ cm représentent $40$ m. Je cherche ce que vaut $1$ cm.\n$40 \\div 8 = 5$ m : $1$ cm représente $5$ m.\nb) De la réalité vers le plan, je divise : $20 \\div 5 = 4$ cm.\n⭐ Autre chemin : la largeur est la moitié de la longueur. Sur le plan aussi : $8 \\div 2 = 4$ cm.\n⛔ Le piège : diviser $8$ par $40$. Je cherche des mètres pour $1$ cm.\nRéponse : $1$ cm représente $5$ m ; la largeur mesure $4$ cm.",
          schema: piece(30, "1 cm ↔ 5 m", [{ nom: "terrain", x: 0, y: 0, l: 8, h: 4, cotes: true }]),
          micros: ["echelle_defi", "echelle_distance_plan"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je lis l'échelle, je choisis le sens, et je réponds par une phrase.",
      rappel: [
        "Je cherche d'abord ce que vaut $1$ cm.",
        "Plan vers réalité : je multiplie. Réalité vers plan : je divise.",
        "Je vérifie que ma réponse est possible : un plan tient sur une feuille.",
      ],
      exercices: [
        {
          titre: "La chasse au trésor",
          enonce: "Sur la carte d'une chasse au trésor, $1$ cm représente $50$ m. Du départ au vieux chêne : $4$ cm. Du chêne au puits : $6$ cm.\na) Quelles sont les distances réelles ?\nb) Quelle distance faut-il marcher du départ au puits ?\nc) Le trésor est à $350$ m du puits. Quelle longueur faut-il tracer sur la carte ?\nd) Du départ au trésor, combien de mètres de marche en tout ? Et combien de cm sur la carte ?",
          correction:
            "a) Je multiplie par $50$.\nDépart vers chêne : $4 \\times 50 = 200$ m.\nChêne vers puits : $6 \\times 50 = 300$ m.\nb) $200 + 300 = 500$ m.\nc) Réalité vers carte : je divise. $350 \\div 50 = 7$ cm.\nd) En mètres : $500 + 350 = 850$ m.\nSur la carte : $4 + 6 + 7 = 17$ cm.\n⭐ Contrôle : $17 \\times 50 = 850$ m.\nRéponse : $200$ m et $300$ m ; $500$ m ; $7$ cm ; $850$ m, soit $17$ cm.",
          schema: plan(16, "1 cm ↔ 50 m", [
            { nom: "départ → chêne", cm: 4, label: "4 cm" },
            { nom: "chêne → puits", cm: 6, label: "6 cm" },
            { nom: "puits → trésor", cm: 7, label: "7 cm" },
          ]),
          micros: ["echelle_distance_reelle", "echelle_distance_plan", "echelle_defi"],
        },
        {
          titre: "La maquette d'avion",
          enonce: "Une maquette d'avion est à l'échelle $\\dfrac{1}{100}$.\na) La maquette mesure $45$ cm de long. Quelle est la longueur du vrai avion, en m ?\nb) Les ailes du vrai avion mesurent $36$ m d'un bout à l'autre. Combien sur la maquette ?\nc) La maquette tient-elle sur une table de $80$ cm de large ?",
          correction:
            "$1$ cm sur la maquette représente $100$ cm en vrai.\na) Je multiplie : $45 \\times 100 = 4\\,500$ cm.\nEt $4\\,500$ cm $= 45$ m.\nb) Je mets les ailes en cm : $36$ m $= 3\\,600$ cm.\nJe divise : $3\\,600 \\div 100 = 36$ cm.\nc) La maquette mesure $45$ cm sur $36$ cm. Les deux sont plus petits que $80$ cm.\n⛔ Le piège : écrire « $45$ cm donnent $4\\,500$ m ». Avec une fraction, les deux longueurs sont dans la même unité.\nRéponse : $45$ m ; $36$ cm ; oui, elle tient.",
          schema: tableauCoef(["Maquette (cm)", "Avion (cm)"], ["1", "45", "!36"], ["100", "!4 500", "3 600"], "100"),
          micros: ["echelle_distance_reelle", "echelle_distance_plan"],
        },
        {
          titre: "Le potager",
          enonce: "Sur le plan du jardin, $1$ cm représente $2$ m. Le potager est un rectangle de $5$ cm sur $3$ cm.\na) Quelles sont les vraies dimensions du potager ?\nb) On veut faire le tour du potager avec un grillage. Quelle longueur de grillage faut-il ?\nc) Le grillage coûte $4$ € le mètre. Combien coûte-t-il en tout ?",
          figure: piece(30, "1 cm ↔ 2 m", [{ nom: "potager", x: 0, y: 0, l: 5, h: 3, cotes: true }]),
          correction:
            "a) Je multiplie par $2$ : $5 \\times 2 = 10$ m et $3 \\times 2 = 6$ m.\nb) Le tour du rectangle : $10 + 6 + 10 + 6 = 32$ m.\nc) $32 \\times 4 = 128$ €.\n⭐ Autre chemin : le tour sur le plan, $5 + 3 + 5 + 3 = 16$ cm. Et $16 \\times 2 = 32$ m.\n⛔ Le piège : calculer l'aire au lieu du tour. Le grillage fait le TOUR du potager.\nRéponse : $10$ m sur $6$ m ; $32$ m ; $128$ €.",
          micros: ["echelle_distance_reelle", "echelle_defi"],
        },
        {
          titre: "Le plan de la rue",
          enonce: "Léo veut dessiner sa rue, longue de $300$ m. Sa feuille mesure $20$ cm de large. Il hésite entre trois échelles :\n$1$ cm pour $10$ m ; $1$ cm pour $20$ m ; $1$ cm pour $50$ m.\na) Quelle longueur aurait la rue avec chaque échelle ?\nb) Laquelle choisir pour que le dessin tienne sur la feuille et soit le plus grand possible ?",
          correction:
            "a) De la réalité vers le plan, je divise.\n$300 \\div 10 = 30$ cm.\n$300 \\div 20 = 15$ cm.\n$300 \\div 50 = 6$ cm.\nb) $30$ cm ne tient pas : la feuille fait $20$ cm.\n$15$ cm et $6$ cm tiennent. Le plus grand dessin, c'est $15$ cm.\n⛔ Le piège : choisir le plus grand dessin sans regarder la feuille.\nRéponse : $30$ cm, $15$ cm et $6$ cm ; l'échelle $1$ cm pour $20$ m.",
          schema: table(["Échelle", "Rue", "Tient ?"], [
            ["1 cm ↔ 10 m", "30 cm", "non"],
            ["1 cm ↔ 20 m", "15 cm", "oui"],
            ["1 cm ↔ 50 m", "6 cm", "oui"],
          ]),
          micros: ["echelle_distance_plan", "echelle_defi"],
        },
      ],
    },
  ],
};
