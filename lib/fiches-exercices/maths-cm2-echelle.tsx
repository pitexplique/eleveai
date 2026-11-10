// ─── Fiche d'exercices : les échelles (CM2) — 20 exercices corrigés ───────────
//
// 10/11/2026 : feuille INTERACTIVE (réponses vérifiées sans IA), sur la forme
// de la feuille 6e voisine (`maths-6e-prop-echelle.tsx`, ses plans dessinés)
// et des feuilles CM2 (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`,
// cm2/echelle) et la banque du coach (`questionBank/cm2/maths/echelles.bank.ts`) :
// ce que dit une échelle (« 1 cm représente… »), du plan vers la réalité (je
// MULTIPLIE), de la réalité vers le plan (je DIVISE), les défis (convertir
// d'abord, retrouver l'échelle, faire tenir un dessin sur la feuille).
// ⛔ LIMITES DU CM2 : seulement l'échelle « 1 cm représente … » ; pas
// d'échelle en fraction (1/100), pas de produit en croix, pas d'aire.
// ⛔ CM2 : AUCUNE question ouverte. QCM (A, B, C), oui/non, nombres. L'unité
// attendue est écrite dans chaque question (« en m », « en cm »).
// ⛔ Aucun exemple de la carte mentale n'est repris (1 cm pour 2 km, l'allée
// de 7 cm à 2 m le cm, 30 km au 1 cm pour 5 km, le bateau de 4 m au 1 cm pour
// 50 cm), ni de la feuille 6e.
//
// Les pièges nommés : lire l'échelle à l'envers (1), additionner au lieu de
// multiplier (2, 12), multiplier au lieu de diviser (3, 6, 10, 14), « 1 m =
// 10 cm » (4, 11), oublier de convertir (5, 7), croire que la carte la plus
// « grande en km » dessine plus grand (8), garder les mètres sans passer aux
// km (9), retrouver l'échelle en multipliant (13), écrire 3 cm au lieu de 5
// (15), oublier une étape du trajet (16), garder l'unité du plan (17), soustraire
// des cm et des km (18), croire que le plan qui dit « 20 m » dessine plus
// grand (19), oublier les berges (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : carte de géographie (1, 6, 12), parc (2),
// maquettes (5, 11), chambre et maison (7, 10, 17), randonnée (9, 16), piscine
// (13), aviation (18), football (19), sciences de la nature (20). Les métiers :
// maquettiste (5), architecte (17), pilote de ligne (18), biologiste (20).
//
// ⭐ DES FAITS RÉELS : un grand bassin de piscine mesure souvent 25 m, le
// bassin olympique 50 m (World Aquatics, règles des installations). Tout le
// reste est un MODÈLE.
//
// ⭐ LES DESSINS (SVG de viewBox 300, police 14, sans `min-w`) : le plan qu'on
// lit (`plan` : la barre de 1 cm et des traits à l'échelle du dessin, 2 et 9),
// des pièces en rectangles (`piece`, 7 et 17), le tableau plan ↔ réalité (15).
//
// Micro-compétences : echelle_comprendre (1, 4, 8, 13, 15),
// echelle_distance_reelle (2, 5, 7, 8, 9, 12, 15, 16, 17, 18),
// echelle_distance_plan (3, 6, 10, 11, 14, 15, 17, 20), echelle_defi (11, 13,
// 16, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const ENCRE = "#0f172a";
const GRIS = "#94a3b8";

/** 6.5 → « 6,5 ». */
const virgule = (x: number) => String(x).replace(".", ",");

/** L'échelle en haut du dessin : un trait noir de 1 cm (u unités), et ce qu'il vaut. */
const barreEchelle = (u: number, echelle: string) => (
  <g>
    <rect x={12} y={10} width={u} height={8} fill={ENCRE} />
    <text x={12 + u + 8} y={19} fontSize={14} fontWeight={700} fill={ENCRE}>
      {echelle}
    </text>
  </g>
);

/**
 * UN PLAN À L'ÉCHELLE : la barre de 1 cm en haut, puis un trait par longueur,
 * à l'échelle du dessin (`u` unités par cm), avec « nom : longueur » au-dessus.
 */
const plan = (u: number, echelle: string, traits: { nom: string; cm: number }[]) => {
  const y0 = 58;
  const H = y0 + (traits.length - 1) * 44 + 14;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un plan à l'échelle ${echelle} : ${traits.map((t) => `${t.nom}, ${virgule(t.cm)} cm`).join(" ; ")}.`}>
        {barreEchelle(u, echelle)}
        {traits.map((t, i) => {
          const y = y0 + i * 44;
          const x1 = 12 + t.cm * u;
          const couleur = i % 2 === 0 ? BLEU : ORANGE;
          return (
            <g key={i}>
              <line x1={12} y1={y} x2={x1} y2={y} stroke={couleur} strokeWidth={3} />
              <line x1={12} y1={y - 6} x2={12} y2={y + 6} stroke={couleur} strokeWidth={2} />
              <line x1={x1} y1={y - 6} x2={x1} y2={y + 6} stroke={couleur} strokeWidth={2} />
              <text x={(12 + x1) / 2} y={y - 10} textAnchor="middle" fontSize={14} fontWeight={700} fill={couleur}>
                {`${t.nom} : ${virgule(t.cm)} cm`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** UN RECTANGLE À L'ÉCHELLE (une chambre, une maison) : son nom dedans, ses cotes sur le plan dessous et à droite. */
const piece = (u: number, echelle: string, nom: string, l: number, h: number) => {
  const y0 = 36;
  const H = y0 + h * u + 30;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un plan à l'échelle ${echelle} : ${nom}, ${virgule(l)} cm sur ${virgule(h)} cm sur le plan.`}>
        {barreEchelle(u, echelle)}
        <rect x={12} y={y0} width={l * u} height={h * u} fill="#dbeafe" stroke={ENCRE} strokeWidth={1.5} />
        <text x={12 + (l * u) / 2} y={y0 + (h * u) / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
          {nom}
        </text>
        <text x={12 + (l * u) / 2} y={y0 + h * u + 20} textAnchor="middle" fontSize={14} fill={ENCRE}>
          {`${virgule(l)} cm`}
        </text>
        <text x={12 + l * u + 8} y={y0 + (h * u) / 2 + 5} fontSize={14} fill={ENCRE}>
          {`${virgule(h)} cm`}
        </text>
      </svg>
    </div>
  );
};

/** UN TABLEAU en SVG (titres à gauche, « ? » en rouge). 300 de large, police 14. */
const grille = (lignes: string[][]) => {
  const n = lignes[0].length;
  const c0 = Math.max(...lignes.map((l) => l[0].length)) * 8.4 + 16;
  const w = (296 - c0) / (n - 1);
  const H = lignes.length * 32 + 4;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un tableau : ${lignes.map((l) => l.join(", ")).join(" ; ")}.`}>
        {lignes.map((l, i) =>
          l.map((c, j) => {
            const x = j === 0 ? 2 : 2 + c0 + (j - 1) * w;
            const larg = j === 0 ? c0 : w;
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={2 + i * 32} width={larg} height={32} fill={j === 0 ? "#f1f5f9" : "#ffffff"} stroke={GRIS} strokeWidth={1} />
                <text x={x + larg / 2} y={2 + i * 32 + 21} textAnchor="middle" fontSize={14} fontWeight={j === 0 || c === "?" ? 700 : 400} fill={c === "?" ? "#dc2626" : ENCRE}>
                  {c}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
};

export const exercicesEchelleCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "echelle",
  titre: "Les échelles",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une échelle. Passer du plan à la vraie distance, puis de la vraie distance au plan. Convertir avant de calculer. Retrouver l'échelle d'un plan. Des cartes, un parc, une maquette de bus, une chambre, une randonnée, une piscine, un avion, un terrain de football et une mare. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/echelle", titre: "Les échelles" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : je lis l'échelle, puis je multiplie ou je divise. J'écris l'unité.",
      rappel: [
        "L'échelle dit ce que vaut 1 cm du plan dans la réalité. Par exemple : 1 cm représente 10 m.",
        "Du plan vers la réalité, je MULTIPLIE : 3 cm, c'est 3 fois 10 m = 30 m.",
        "De la réalité vers le plan, je DIVISE : 50 m, c'est 50 ÷ 10 = 5 cm.",
      ],
      exercices: [
        {
          enonce: "Sur une carte, 1 cm représente 3 km.\na) Que représentent 2 cm sur la carte, en km ?\nb) Que représentent 5 cm sur la carte, en km ?\nc) Que veut dire cette échelle ?\nA) 1 cm sur la carte, c'est 3 km en vrai.\nB) 3 cm sur la carte, c'est 1 km en vrai.\nC) 1 km en vrai, c'est 3 cm sur la carte.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "c) L'échelle se lit toujours dans le même sens : 1 cm sur la carte représente 3 km en vrai. C'est le choix A.\na) 2 cm, c'est 2 fois 1 cm. Donc 2 fois 3 km : 2 × 3 = 6 km.\nb) 5 cm, c'est 5 fois 1 cm : 5 × 3 = 15 km.\n⛔ Le piège : lire l'échelle à l'envers, comme au choix B. Le premier nombre est sur la carte, le second dans la réalité.\nRéponse : a) 6 km ; b) 15 km ; c) A.",
          micros: ["echelle_comprendre"],
        },
        {
          enonce: "Voici le plan de deux allées d'un parc. Leur longueur sur le plan est écrite au-dessus.\na) Quelle est la vraie longueur de l'allée a), en m ?\nb) Quelle est la vraie longueur de l'allée b), en m ?",
          figure: plan(34, "1 cm ↔ 10 m", [
            { nom: "a)", cm: 3 },
            { nom: "b)", cm: 7 },
          ]),
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "70" },
          ],
          correction:
            "L'échelle dit : 1 cm sur le plan représente 10 m en vrai. Du plan vers la réalité, je multiplie.\na) L'allée a) mesure 3 cm sur le plan : 3 × 10 = 30 m.\nb) L'allée b) mesure 7 cm sur le plan : 7 × 10 = 70 m.\n⛔ Le piège : additionner, 7 + 10 = 17 m. 7 cm, c'est 7 FOIS 1 cm : je multiplie.\nRéponse : a) 30 m ; b) 70 m.",
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur un plan, 1 cm représente 4 m. Combien de cm faut-il dessiner sur le plan ?\na) Pour un mur de 12 m\nb) Pour un mur de 20 m\nc) Pour une porte de 2 m",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "0,5" },
          ],
          correction:
            "De la réalité vers le plan, je DIVISE par ce que vaut 1 cm.\na) 12 m : combien de fois 4 m ? 12 ÷ 4 = 3. Je dessine 3 cm.\nb) 20 m : 20 ÷ 4 = 5. Je dessine 5 cm.\nc) 2 m, c'est la moitié de 4 m. Je dessine la moitié de 1 cm : 0,5 cm.\n⛔ Le piège : multiplier, 12 × 4 = 48 cm. Le dessin serait plus long que la feuille ! Vers le plan, les nombres deviennent PETITS.\nRéponse : a) 3 cm ; b) 5 cm ; c) 0,5 cm.",
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Sur un plan, 1 cm représente 1 m.\na) La réalité est combien de fois plus grande que le plan ?\nA) 1 000 fois\nB) 10 fois\nC) 100 fois\nb) Un lit mesure 2 cm sur ce plan. Quelle est sa vraie longueur, en m ?",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "2" },
          ],
          correction:
            "a) Je mets les deux longueurs dans la même unité : 1 m = 100 cm.\nDonc 1 cm sur le plan représente 100 cm en vrai : la réalité est 100 fois plus grande. Choix C.\nb) 2 cm sur le plan : 2 × 1 m = 2 m.\n⛔ Le piège : croire que 1 m = 10 cm, et choisir « 10 fois ». Dans 1 m, il y a 100 cm.\nRéponse : a) C ; b) 2 m.",
          micros: ["echelle_comprendre"],
        },
        {
          enonce: "Un maquettiste fabrique la maquette d'un bus. 1 cm de la maquette représente 50 cm du vrai bus. La maquette mesure 24 cm de long et 6 cm de haut.\na) Quelle est la longueur du vrai bus, en cm ?\nb) Écris cette longueur en m.\nc) Quelle est la hauteur du vrai bus, en m ?",
          reponses: [
            { question: "a)", attendu: "1200" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "De la maquette vers le vrai bus, je multiplie par 50.\na) 24 × 50 = 1 200 cm. (24 × 5 = 120, puis × 10 = 1 200.)\nb) 1 m = 100 cm. 1 200 cm ÷ 100 = 12 m.\nc) Hauteur : 6 × 50 = 300 cm. Et 300 cm ÷ 100 = 3 m.\n⛔ Le piège : écrire « 1 200 m ». L'échelle parle en cm : le résultat est en cm, puis je convertis.\nRéponse : a) 1 200 cm ; b) 12 m ; c) 3 m.",
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur une carte de géographie, 1 cm représente 20 km. Combien de cm sur la carte ?\na) Pour 100 km\nb) Pour 60 km\nc) Pour 10 km",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "0,5" },
          ],
          correction:
            "De la réalité vers la carte, je divise par 20.\na) 100 km : 100 ÷ 20 = 5 cm.\nb) 60 km : 60 ÷ 20 = 3 cm.\nc) 10 km, c'est la moitié de 20 km : la moitié de 1 cm, soit 0,5 cm.\nJe vérifie le a) : 5 × 20 = 100 km.\n⛔ Le piège : calculer 100 × 20 = 2 000 cm. Une carte n'est pas longue de 20 m ! Vers la carte, je divise.\nRéponse : a) 5 cm ; b) 3 cm ; c) 0,5 cm.",
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Voici le plan de la chambre de Sacha. 1 cm représente 50 cm.\na) Quelle est la vraie longueur de la chambre, en m ?\nb) Quelle est la vraie largeur de la chambre, en m ?",
          figure: piece(30, "1 cm ↔ 50 cm", "Chambre", 8, 6),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "Sur le plan, la chambre mesure 8 cm sur 6 cm. Je multiplie par 50.\na) Longueur : 8 × 50 = 400 cm. Et 400 cm = 4 m, car 1 m = 100 cm.\nb) Largeur : 6 × 50 = 300 cm = 3 m.\n⛔ Le piège : répondre 400 m. Le calcul donne des cm : je convertis en m à la fin.\nRéponse : a) 4 m ; b) 3 m.",
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Deux cartes. Sur la carte rouge, 1 cm représente 1 km. Sur la carte verte, 1 cm représente 10 km.\na) Sur quelle carte un lac de 2 km est-il dessiné le plus grand ?\nA) sur la carte verte\nB) sur la carte rouge\nC) il a la même taille sur les deux\nb) Sur la carte verte, deux villes sont à 5 cm. Quelle est la vraie distance, en km ?",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "50" },
          ],
          correction:
            "a) Je calcule la taille du lac sur chaque carte.\nCarte rouge : 2 km ÷ 1 = 2 cm.\nCarte verte : 1 cm vaut déjà 10 km. 2 km, c'est bien moins que 10 km : le lac fait moins de 1 cm (2 ÷ 10 = 0,2 cm).\nLe lac est dessiné plus grand sur la carte rouge : choix B.\nb) Carte verte : 5 × 10 = 50 km.\n⛔ Le piège : croire que la carte « à 10 km » dessine plus grand parce que 10 est plus grand que 1. C'est l'inverse : chaque cm couvre plus de pays, donc tout est plus petit.\nRéponse : a) B ; b) 50 km.",
          micros: ["echelle_comprendre", "echelle_distance_reelle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je mets tout dans la même unité, puis je multiplie ou je divise.",
      rappel: [
        "1 m = 100 cm et 1 km = 1 000 m. Je convertis AVANT de diviser.",
        "Pour retrouver l'échelle, je cherche ce que vaut 1 cm : je divise la vraie longueur par la longueur du plan.",
        "Plan → réalité : je multiplie. Réalité → plan : je divise.",
      ],
      exercices: [
        {
          enonce: "Voici le plan d'une randonnée en deux parties. 1 cm représente 200 m.\na) Quelle est la vraie longueur de la partie a), en m ?\nb) Quelle est la vraie longueur de la partie b), en m ?\nc) Quelle est la longueur de toute la randonnée, en km ?",
          figure: plan(36, "1 cm ↔ 200 m", [
            { nom: "a)", cm: 4 },
            { nom: "b)", cm: 6.5 },
          ]),
          reponses: [
            { question: "a)", attendu: "800" },
            { question: "b)", attendu: "1300" },
            { question: "c)", attendu: "2,1" },
          ],
          correction:
            "Du plan vers la réalité, je multiplie par 200.\na) 4 × 200 = 800 m.\nb) 6,5 cm, c'est 6 cm et la moitié d'un cm. 6 × 200 = 1 200 m, et la moitié de 200 m, c'est 100 m. 1 200 + 100 = 1 300 m.\nc) En tout : 800 + 1 300 = 2 100 m.\n1 km = 1 000 m. 2 100 m = 2 km et 100 m = 2,1 km.\n⛔ Le piège : écrire 2 100 km. 2 100, ce sont des mètres : en km, c'est 2,1.\nRéponse : a) 800 m ; b) 1 300 m ; c) 2,1 km.",
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Léo dessine le plan de sa maison. 1 cm représente 3 m. Combien de cm dessine-t-il ?\na) Pour le salon de 9 m\nb) Pour le garage de 6 m\nc) Pour le jardin de 15 m\nd) Pour la terrasse de 4,5 m",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "1,5" },
          ],
          correction:
            "De la réalité vers le plan, je divise par 3.\na) 9 ÷ 3 = 3 cm.\nb) 6 ÷ 3 = 2 cm.\nc) 15 ÷ 3 = 5 cm.\nd) 4,5 m, c'est 3 m + 1,5 m. 3 m donnent 1 cm, et 1,5 m (la moitié de 3 m) donne 0,5 cm. 1 + 0,5 = 1,5 cm.\nJe vérifie : 1,5 × 3 = 4,5.\n⛔ Le piège : multiplier, 9 × 3 = 27 cm pour le salon. Le salon ne tiendrait même pas sur la feuille ! Vers le plan, je divise.\nRéponse : a) 3 cm ; b) 2 cm ; c) 5 cm ; d) 1,5 cm.",
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Une maquette de bateau : 1 cm représente 25 cm. Le vrai bateau mesure 5 m de long. Son mât mesure 3 m.\na) Écris 5 m en cm.\nb) Quelle est la longueur de la maquette, en cm ?\nc) Quelle est la hauteur du mât de la maquette, en cm ?",
          reponses: [
            { question: "a)", attendu: "500" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "L'échelle parle en cm : je convertis d'abord les mètres en cm.\na) 1 m = 100 cm. Donc 5 m = 500 cm.\nb) De la réalité vers la maquette, je divise par 25 : 500 ÷ 25 = 20 cm. (Dans 100, il y a 4 fois 25 ; dans 500, 5 × 4 = 20 fois.)\nc) 3 m = 300 cm. 300 ÷ 25 = 12 cm.\nJe vérifie : 12 × 25 = 300.\n⛔ Le piège : diviser 5 par 25 sans convertir, ou écrire 5 m = 50 cm. Dans 1 m, il y a 100 cm.\nRéponse : a) 500 cm ; b) 20 cm ; c) 12 cm.",
          micros: ["echelle_distance_plan", "echelle_defi"],
        },
        {
          enonce: "Sur une carte routière, 1 cm représente 8 km.\na) Deux villages sont à 3 cm. Quelle est la vraie distance, en km ?\nb) Deux villes sont à 7,5 cm. Quelle est la vraie distance, en km ?\nc) Un camion fait les deux trajets. Combien de km en tout ?",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "84" },
          ],
          correction:
            "De la carte vers la réalité, je multiplie par 8.\na) 3 × 8 = 24 km.\nb) 7,5 cm = 7 cm + 0,5 cm. 7 × 8 = 56 km, et la moitié de 8 km = 4 km. 56 + 4 = 60 km.\nc) 24 + 60 = 84 km.\n⛔ Le piège : additionner, 7,5 + 8 = 15,5 km. L'échelle se multiplie : 7,5 FOIS 8 km.\nRéponse : a) 24 km ; b) 60 km ; c) 84 km.",
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Sur le plan d'une piscine, le grand bassin de 25 m de long mesure 5 cm.\na) Sur ce plan, 1 cm représente combien de m ?\nb) Le bassin mesure 2 cm de large sur le plan. Quelle est sa vraie largeur, en m ?\nc) Sur le même plan, combien de cm pour un bassin olympique de 50 m ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "a) 5 cm représentent 25 m. Pour 1 cm, je divise : 25 ÷ 5 = 5 m. L'échelle : 1 cm représente 5 m.\nb) 2 cm sur le plan : 2 × 5 = 10 m.\nc) 50 m : 50 ÷ 5 = 10 cm.\n⭐ Je vérifie : 50 m, c'est 2 fois 25 m, donc 2 fois 5 cm = 10 cm.\n⛔ Le piège : multiplier 25 × 5 = 125 pour trouver l'échelle. Pour 1 cm, je partage les 25 m entre les 5 cm.\nRéponse : a) 5 m ; b) 10 m ; c) 10 cm.",
          micros: ["echelle_comprendre", "echelle_defi"],
        },
        {
          enonce: "Sur une carte, 1 cm représente 10 km.\na) Deux villes sont à 45 km. Quelle distance sur la carte ?\nA) 4,5 cm\nB) 450 cm\nC) 55 cm\nb) Deux ports sont à 120 km. Combien de cm sur la carte ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "De la réalité vers la carte, je divise par 10.\na) 45 ÷ 10 : le 4 des dizaines devient le chiffre des unités, le 5 des unités devient le chiffre des dixièmes. 4,5 cm : choix A.\nb) 120 ÷ 10 : le 1 des centaines devient le chiffre des dizaines, le 2 des dizaines devient le chiffre des unités. 12 cm.\n⛔ Le piège : multiplier, 45 × 10 = 450 cm (choix B), ou additionner, 45 + 10 = 55 (choix C). Vers la carte, je divise.\nRéponse : a) A ; b) 12 cm.",
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Sur une carte de randonnée, 1 cm représente 4 km. Complète le tableau.\na) 3 cm sur la carte : combien de km ?\nb) 20 km en vrai : combien de cm ?\nc) 10 cm sur la carte : combien de km ?",
          figure: grille([
            ["Carte (cm)", "1", "3", "?", "10"],
            ["Réel (km)", "4", "?", "20", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "40" },
          ],
          correction:
            "C'est un tableau de proportionnalité : on passe de la ligne du haut à celle du bas en multipliant par 4.\na) 3 × 4 = 12 km.\nb) Dans l'autre sens, je divise par 4 : 20 ÷ 4 = 5 cm.\nc) 10 × 4 = 40 km.\n⛔ Le piège du b) : écrire 3 cm, en lisant la case d'à côté. Je calcule : 5 × 4 = 20, c'est bien 5 cm.\nRéponse : a) 12 km ; b) 5 cm ; c) 40 km.",
          micros: ["echelle_comprendre", "echelle_distance_reelle", "echelle_distance_plan"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je note l'échelle, je convertis si besoin, puis je réponds à chaque question.",
      rappel: [
        "Je repère le sens : du plan vers la réalité (×), ou de la réalité vers le plan (÷).",
        "J'additionne des longueurs dans la même unité seulement.",
        "Je vérifie que ma réponse a du sens : un plan tient sur une feuille.",
      ],
      exercices: [
        {
          titre: "La randonnée en trois étapes",
          enonce: "Sur la carte d'un randonneur, 1 cm représente 2 km. Son chemin a trois étapes : 2,5 cm, 4 cm et 3,5 cm sur la carte.\na) Quelle est la longueur du chemin sur la carte, en cm ?\nb) Quelle est la vraie longueur du chemin, en km ?\nc) Il marche 4 km chaque heure. Combien d'heures dure la randonnée ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) J'additionne les trois étapes sur la carte : 2,5 + 4 + 3,5 = 10 cm.\nb) De la carte vers la réalité, je multiplie : 10 × 2 = 20 km.\nc) Chaque heure, 4 km. Pour 20 km : 20 ÷ 4 = 5 heures.\nJe vérifie : 5 × 4 = 20 km.\n⛔ Le piège : oublier une étape, et trouver 2,5 + 4 = 6,5 cm. Le chemin a TROIS étapes.\nRéponse : a) 10 cm ; b) 20 km ; c) 5 heures.",
          micros: ["echelle_distance_reelle", "echelle_defi"],
        },
        {
          titre: "Le plan de l'architecte",
          enonce: "Une architecte dessine une maison. Sur son plan, 1 cm représente 4 m.\na) Quelle est la vraie longueur de la maison, en m ?\nb) Quelle est la vraie largeur de la maison, en m ?\nc) Le terrain mesure 40 m de long. Combien de cm sur le plan ?",
          figure: piece(30, "1 cm ↔ 4 m", "Maison", 5, 3),
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "Sur le plan, la maison mesure 5 cm sur 3 cm.\na) Du plan vers la réalité, je multiplie : 5 × 4 = 20 m.\nb) 3 × 4 = 12 m.\nc) De la réalité vers le plan, je divise : 40 ÷ 4 = 10 cm.\n⛔ Le piège : garder l'unité du plan, et écrire « 20 cm ». En vrai, la maison mesure 20 m.\nRéponse : a) 20 m ; b) 12 m ; c) 10 cm.",
          micros: ["echelle_distance_reelle", "echelle_distance_plan"],
        },
        {
          titre: "Le pilote de ligne",
          enonce: "Un pilote de ligne prépare son vol. Sur sa carte, 1 cm représente 50 km. L'aller mesure 8 cm. Le retour passe par une autre ville : 6 cm, puis 5 cm.\na) Quelle est la vraie distance de l'aller, en km ?\nb) Quelle est la vraie distance du retour, en km ?\nc) Combien de km le retour a-t-il de plus que l'aller ?",
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "550" },
            { question: "c)", attendu: "150" },
          ],
          correction:
            "a) Aller : 8 × 50 = 400 km.\nb) Retour sur la carte : 6 + 5 = 11 cm. En vrai : 11 × 50 = 550 km.\nc) 550 − 400 = 150 km de plus.\n⭐ Autre chemin : 11 − 8 = 3 cm de plus sur la carte, et 3 × 50 = 150 km.\n⛔ Le piège : soustraire des cm et des km, comme 550 − 8. Je compare des longueurs de la même unité.\nRéponse : a) 400 km ; b) 550 km ; c) 150 km.",
          micros: ["echelle_distance_reelle", "echelle_defi"],
        },
        {
          titre: "Le terrain de football",
          enonce: "Léa et Hugo dessinent le même terrain de football, long de 100 m. Sur le plan de Léa, il mesure 10 cm. Sur le plan de Hugo, il mesure 5 cm.\na) Sur le plan de Léa, 1 cm représente combien de m ?\nb) Sur le plan de Hugo, 1 cm représente combien de m ?\nc) Quel dessin est le plus grand ?\nA) ils sont pareils\nB) le plan de Hugo\nC) le plan de Léa",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Pour trouver ce que vaut 1 cm, je divise la vraie longueur par la longueur du plan.\na) Léa : 100 ÷ 10 = 10 m. 1 cm représente 10 m.\nb) Hugo : 100 ÷ 5 = 20 m. 1 cm représente 20 m.\nc) Le terrain mesure 10 cm chez Léa et 5 cm chez Hugo. Le dessin de Léa est le plus grand : choix C.\n⛔ Le piège : choisir Hugo parce que « 20 m » est plus que « 10 m ». Quand 1 cm vaut plus de mètres, le dessin est plus PETIT.\nRéponse : a) 10 m ; b) 20 m ; c) C.",
          micros: ["echelle_defi"],
        },
        {
          titre: "La mare",
          enonce: "Une biologiste dessine le plan d'une mare. 1 cm représente 50 cm. La mare mesure 6 m de long. Il y a 2 m de berge de chaque côté.\na) Écris 6 m en cm.\nb) Quelle est la longueur de la mare sur le plan, en cm ?\nc) Avec les deux berges, combien de cm sur le plan ?\nd) La feuille fait 21 cm de large. Le dessin tient-il ? Réponds par oui ou non.",
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "20" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) 1 m = 100 cm. Donc 6 m = 600 cm.\nb) 600 ÷ 50 = 12 cm. (Dans 100, il y a 2 fois 50 ; dans 600, 6 × 2 = 12 fois.)\nc) En tout : 2 m + 6 m + 2 m = 10 m = 1 000 cm. Sur le plan : 1 000 ÷ 50 = 20 cm.\n⭐ Autre chemin : chaque berge de 2 m = 200 cm donne 200 ÷ 50 = 4 cm. 4 + 12 + 4 = 20 cm.\nd) 20 cm est moins que 21 cm : le dessin tient. Oui.\n⛔ Le piège : oublier une des deux berges, et trouver 16 cm. Il y a une berge de CHAQUE côté.\nRéponse : a) 600 cm ; b) 12 cm ; c) 20 cm ; d) oui.",
          micros: ["echelle_distance_plan", "echelle_defi"],
        },
      ],
    },
  ],
};
