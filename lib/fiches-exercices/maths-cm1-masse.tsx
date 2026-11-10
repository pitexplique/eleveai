// ─── Fiche d'exercices : les masses (CM1) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : la feuille interactive de la notion `masse` du coach CM1
// (4 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cm1/maths/masse.bank.ts` : g, kg, t, balance à
// plateaux) et sur la carte mentale `cm1/masse` (lib/cartes/remplies/cm1.json).
// ⛔ LIMITES DU CM1 : g, kg et t seulement (pas de mg, dag, hg), des entiers.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, signe, un nombre, un mot.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 250 kg » vaut 250) : chaque conversion
// IMPOSE l'unité dans l'énoncé (« en grammes ») et l'élève écrit le nombre
// seul. Les QCM se répondent par la LETTRE (ou « C) 150 g »). Le rangement par
// LETTRES séparées par « ; » (collées, le vérificateur les multiplierait).
//
// Les pièges nommés : 2 kg = 200 g (1, 9), ajouter les masses sans regarder
// la balance (2), comparer 800 et 1 sans les unités (3, 8, 12), une masse
// absurde (4, 13), le plateau qui monte pris pour le plus lourd (5), « kg »
// pour une lettre (6), 2 kg 50 g = 2 500 g (9), 250 + 1 + 125 (10), oublier la
// masse posée avec le sac (11), 1 kg 200 g + 800 g = 1 kg 1 000 g (14),
// 2 − 1 250 (15), 1 kg 500 g ÷ 150 sans convertir (16), 3 t − 2 000 (17),
// garder la recette pour 4 (18), 12 kg 400 g = 1 240 g (19), additionner kg
// et g mélangés (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché (2, 14), cuisine (10, 15, 18),
// poste (12), animaux (4, 13, 19), jeux (16, billes), transport (17), voyage
// (20). Les métiers : postière (12), livreur (17), pâtissière (18),
// vétérinaire (19), agent d'aéroport (20).
// UN SEUL contexte réunionnais (14, letchis au marché, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 13 — un éléphant d'Afrique adulte pèse plusieurs tonnes (de 4 à 7 t
//     selon Larousse, « éléphant ») : « environ 5 t » reste une estimation.
// Tout le reste est un MODÈLE (le poids d'une valise permis en avion varie
// selon les compagnies : 23 kg est ici une règle inventée pour l'exercice).
//
// ⭐ LES DESSINS : une balance à plateaux (`balance`), équilibrée ou penchée,
// les objets et les masses marquées posés sur les plateaux.
//
// Micro-compétences : masse_comparer (3, 5, 7, 8, 10, 12, 19), masse_convertir
// (1, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20), masse_estimer (4, 6,
// 13), masse_defi (2, 11, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";

/**
 * Une balance à plateaux. `gauche` et `droite` : les étiquettes empilées sur
 * chaque plateau (objets en orange, masses marquées « … g » ou « … kg » en
 * bleu). `penche` : "gauche" (le plateau gauche descend), "droite", ou
 * "egal" (équilibrée). Texte nu, pas de KaTeX.
 */
const balance = (gauche: string[], droite: string[], penche: "gauche" | "droite" | "egal" = "egal") => {
  const [cx, cy, demi] = [160, 112, 104];
  const a = penche === "egal" ? 0 : ((penche === "gauche" ? 9 : -9) * Math.PI) / 180;
  const g = { x: cx - demi * Math.cos(a), y: cy + demi * Math.sin(a) };
  const d = { x: cx + demi * Math.cos(a), y: cy - demi * Math.sin(a) };
  const estMasse = (t: string) => /^\d[\d\s]*\s?(g|kg|t)$/.test(t);
  const plateau = (p: { x: number; y: number }, objets: string[], cle: string) => (
    <g key={cle}>
      <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 8} stroke={NOIR} strokeWidth={2} />
      <line x1={p.x - 46} y1={p.y - 8} x2={p.x + 46} y2={p.y - 8} stroke={NOIR} strokeWidth={3.5} strokeLinecap="round" />
      {objets.map((t, k) => (
        <g key={k}>
          <rect x={p.x - 40} y={p.y - 32 - k * 24} width={80} height={22} rx={estMasse(t) ? 3 : 10} fill={estMasse(t) ? BLEU : ORANGE} />
          <text x={p.x} y={p.y - 16 - k * 24} textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox="0 0 320 170" className="block h-auto w-full" role="img" aria-label="Balance à plateaux">
        <rect x={110} y={156} width={100} height={10} rx={3} fill={GRIS} />
        <rect x={155} y={cy} width={10} height={46} fill={GRIS} />
        <line x1={g.x} y1={g.y} x2={d.x} y2={d.y} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={6} fill={NOIR} />
        {plateau(g, gauche, "g")}
        {plateau(d, droite, "d")}
      </svg>
    </div>
  );
};

export const exercicesMasseCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "masse",
  titre: "Les masses",
  accroche:
    "Vingt exercices, du geste seul au problème. Passer des kilogrammes aux grammes, des tonnes aux kilogrammes. Lire une balance à plateaux. Comparer deux masses, estimer la masse d'un objet. Une recette de gâteau, des colis, un camion de livraison, une pâtissière, un vétérinaire et une valise d'avion. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, dans l'unité demandée.",
      rappel: [
        "1 kg = 1 000 g. 1 t = 1 000 kg.",
        "Pour comparer deux masses, je les écris d'abord dans la même unité.",
        "Sur une balance, le plateau le plus lourd descend. Équilibrée : les deux côtés ont la même masse.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 2 kg = … g\nb) 5 kg = … g\nc) 3 t = … kg\nd) 4 000 g = … kg",
          correction:
            "J'utilise les égalités du rappel.\na) 1 kg = 1 000 g. Donc 2 kg, c'est $2 \\times 1\\,000 = 2\\,000$ g.\nb) 5 kg, c'est $5 \\times 1\\,000 = 5\\,000$ g.\nc) 1 t = 1 000 kg. Donc 3 t, c'est $3 \\times 1\\,000 = 3\\,000$ kg.\nd) Dans $4\\,000$ g, il y a 4 fois $1\\,000$ g. Donc $4\\,000$ g = 4 kg.\n⛔ Le piège : écrire 2 kg = 200 g. Dans 1 kg, il y a 1 000 g : trois zéros.\nRéponse : a) $2\\,000$ ; b) $5\\,000$ ; c) $3\\,000$ ; d) 4.",
          micros: ["masse_convertir"],
          reponses: [
            { question: "a)", attendu: "2000" },
            { question: "b)", attendu: "5000" },
            { question: "c)", attendu: "3000" },
            { question: "d)", attendu: "4" },
          ],
        },
        {
          enonce: "Au marché, la balance est équilibrée.\nCombien pèse le melon, en grammes ?",
          figure: balance(["melon"], ["100 g", "200 g", "500 g"]),
          correction:
            "La balance est équilibrée : les deux plateaux ont la même masse.\nÀ droite, j'additionne les masses marquées : $500 + 200 + 100 = 800$ g.\nDonc le melon pèse 800 g.\n⛔ Le piège : ne compter qu'une masse, la plus grosse. Toutes les masses du plateau comptent.\nRéponse : 800.",
          micros: ["masse_defi"],
          reponses: [{ attendu: "800" }],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 1 kg … 800 g\nb) 3 000 g … 3 kg\nc) 450 g … 1 kg\nd) 2 t … 1 500 kg",
          correction:
            "J'écris les deux masses dans la même unité, puis je compare.\na) 1 kg = $1\\,000$ g. $1\\,000$ g est plus que 800 g. Donc 1 kg > 800 g.\nb) 3 kg = $3\\,000$ g. Les deux sont égales. Donc $3\\,000$ g = 3 kg.\nc) 1 kg = $1\\,000$ g. 450 g est moins que $1\\,000$ g. Donc 450 g < 1 kg.\nd) 2 t = $2\\,000$ kg. $2\\,000$ kg est plus que $1\\,500$ kg. Donc 2 t > $1\\,500$ kg.\n⛔ Le piège : comparer 1 et 800 sans les unités. 800 est plus grand que 1, mais 800 g est plus léger que 1 kg.\nRéponse : a) > ; b) = ; c) < ; d) >.",
          micros: ["masse_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Choisis la bonne masse. Écris la lettre.\na) Une pomme : A) 150 kg B) 15 g C) 150 g\nb) Un chat : A) 4 kg B) 4 g C) 40 kg\nc) Une voiture : A) 1 kg B) 1 t C) 100 g",
          correction:
            "Je compare à une masse connue : un paquet de sucre pèse 1 kg.\na) Il faut environ 6 pommes pour faire 1 kg. Une pomme : environ 150 g. 15 g, c'est le poids de trois morceaux de sucre. Réponse C.\nb) Un chat se porte dans les bras, comme quatre paquets de sucre : environ 4 kg. Réponse A.\nc) Une voiture est très lourde : environ 1 t, c'est-à-dire $1\\,000$ kg. Réponse B.\n⛔ Le piège : garder le bon nombre et oublier l'unité. « 150 kg » pour une pomme, c'est le poids de deux adultes.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["masse_estimer"],
          reponses: [
            { question: "a)", attendu: ["C", "C) 150 g"] },
            { question: "b)", attendu: ["A", "A) 4 kg"] },
            { question: "c)", attendu: ["B", "B) 1 t"] },
          ],
        },
        {
          enonce: "Regarde la balance.\nL'ananas pèse : A) plus que 1 kg B) moins que 1 kg C) autant que 1 kg",
          figure: balance(["ananas"], ["1 kg"], "gauche"),
          correction:
            "Le plateau de l'ananas est descendu. Le plateau de la masse de 1 kg est monté.\nLe plateau le plus lourd descend.\nDonc l'ananas pèse plus que 1 kg. Réponse A.\n⛔ Le piège : croire que le plateau du haut est le plus lourd, parce qu'il « gagne ». C'est l'inverse : le lourd tire vers le bas.\nRéponse : A.",
          micros: ["masse_comparer"],
          reponses: [{ attendu: ["A", "A) plus que 1 kg", "plus"] }],
        },
        {
          enonce: "Quelle unité choisir : kg ou g ?\na) Un sac de pommes de terre\nb) Une lettre\nc) Un vélo\nd) Une cuillère de sel",
          correction:
            "Je compare au paquet de sucre de 1 kg.\na) Un sac de pommes de terre pèse plusieurs paquets de sucre : kg.\nb) Une lettre est très légère, bien moins que 1 kg : g.\nc) Un vélo pèse plus de dix paquets de sucre : kg.\nd) Une cuillère de sel est très légère : g.\n⛔ Le piège : choisir kg pour tout. Pour un objet léger, plus léger qu'un paquet de sucre, le gramme convient mieux.\nRéponse : a) kg ; b) g ; c) kg ; d) g.",
          micros: ["masse_estimer", "masse_convertir"],
          reponses: [
            { question: "a)", attendu: ["kg", "kilogramme", "kilogrammes", "kilo", "kilos"] },
            { question: "b)", attendu: ["g", "gramme", "grammes"] },
            { question: "c)", attendu: ["kg", "kilogramme", "kilogrammes", "kilo", "kilos"] },
            { question: "d)", attendu: ["g", "gramme", "grammes"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 kg = 100 g\nb) 1 t = 1 000 kg\nc) 500 g, c'est la moitié de 1 kg.\nd) 900 g est plus lourd que 1 kg.",
          correction:
            "Je relis les égalités du rappel.\na) 1 kg = $1\\,000$ g, pas 100 g. Faux.\nb) 1 t = $1\\,000$ kg. Vrai.\nc) La moitié de $1\\,000$ g : $1\\,000 \\div 2 = 500$ g. Vrai.\nd) 1 kg = $1\\,000$ g. 900 g < $1\\,000$ g : 900 g est plus léger. Faux.\n⛔ Le piège : croire 900 g plus lourd parce que 900 est plus grand que 1.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          micros: ["masse_convertir", "masse_comparer"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "Quatre sacs de sable :\nA = 2 kg ; B = 1 900 g ; C = 2 100 g ; D = 1 kg 500 g.\nRange-les du plus léger au plus lourd.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les masses en grammes.\nA = 2 kg = $2\\,000$ g.\nB = $1\\,900$ g.\nC = $2\\,100$ g.\nD = 1 kg 500 g = $1\\,000 + 500 = 1\\,500$ g.\nJe range : $1\\,500$ < $1\\,900$ < $2\\,000$ < $2\\,100$.\nDonc D, puis B, puis A, puis C.\n⛔ Le piège : mettre A en premier parce que « 2 » est un petit nombre. 2 kg, c'est $2\\,000$ g.\nRéponse : D ; B ; A ; C.",
          micros: ["masse_comparer", "masse_convertir"],
          reponses: [{ attendu: ["D ; B ; A ; C", "D < B < A < C", "D, B, A, C"], ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je mets tout en grammes AVANT de calculer.",
      rappel: [
        "De kg en g : × 1 000. De t en kg : × 1 000.",
        "2 kg 300 g = 2 000 g + 300 g = 2 300 g.",
        "Avant d'additionner ou de soustraire, j'écris toutes les masses dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 1 kg 500 g = … g\nb) 2 kg 50 g = … g\nc) 3 200 g = … kg … g\nd) 2 500 kg = … t … kg",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 1 kg = $1\\,000$ g. Donc 1 kg 500 g = $1\\,000 + 500 = 1\\,500$ g.\nb) 2 kg = $2\\,000$ g. Donc 2 kg 50 g = $2\\,000 + 50 = 2\\,050$ g.\nc) $3\\,200$ g = $3\\,000$ g + 200 g = 3 kg 200 g.\nd) $2\\,500$ kg = $2\\,000$ kg + 500 kg = 2 t 500 kg.\n⛔ Le piège du b) : écrire $2\\,500$ g. Il y a 50 g, pas 500 g : $2\\,000 + 50 = 2\\,050$.\nRéponse : a) $1\\,500$ ; b) $2\\,050$ ; c) 3 kg 200 g ; d) 2 t 500 kg.",
          micros: ["masse_convertir"],
          reponses: [
            { question: "a)", attendu: "1500" },
            { question: "b)", attendu: "2050" },
            { question: "c) kg", attendu: "3" },
            { question: "c) g", attendu: "200" },
            { question: "d) t", attendu: "2" },
            { question: "d) kg", attendu: "500" },
          ],
        },
        {
          enonce: "Pour un gâteau, il faut 250 g de farine, 1 kg de pommes et 125 g de sucre.\na) Quelle est la masse totale, en grammes ?\nb) Comparée à 1 kg 500 g, c'est : A) plus B) moins C) autant",
          correction:
            "a) Je mets tout en grammes : 1 kg = $1\\,000$ g.\nJ'additionne : $250 + 1\\,000 + 125 = 1\\,375$ g.\nb) 1 kg 500 g = $1\\,500$ g. $1\\,375$ < $1\\,500$ : c'est moins. Réponse B.\n⛔ Le piège : calculer $250 + 1 + 125 = 376$. Le 1 compte des kilogrammes, pas des grammes.\nRéponse : a) $1\\,375$ ; b) B.",
          micros: ["masse_convertir", "masse_comparer"],
          reponses: [
            { question: "a)", attendu: "1375" },
            { question: "b)", attendu: ["B", "B) moins", "moins"] },
          ],
        },
        {
          enonce: "La balance est équilibrée.\na) Quelle est la masse du plateau de droite, en grammes ?\nb) Combien pèse le sac, en grammes ?",
          figure: balance(["sac", "200 g"], ["500 g", "1 kg"]),
          correction:
            "a) À droite : 1 kg + 500 g = $1\\,000 + 500 = 1\\,500$ g.\nb) À gauche, il y a le sac ET une masse de 200 g.\nLes deux côtés ont la même masse : sac + 200 = $1\\,500$.\nDonc le sac pèse $1\\,500 - 200 = 1\\,300$ g.\n⛔ Le piège : répondre $1\\,500$ g. La masse de 200 g est aussi à gauche, avec le sac : je l'enlève.\nRéponse : a) $1\\,500$ ; b) $1\\,300$.",
          micros: ["masse_convertir", "masse_defi"],
          reponses: [
            { question: "a)", attendu: "1500" },
            { question: "b)", attendu: "1300" },
          ],
        },
        {
          enonce: "Une postière pèse trois colis.\nRouge : 2 kg 300 g. Bleu : 2 030 g. Vert : 2 200 g.\na) Quel colis est le plus lourd ?\nb) Quel colis est le plus léger ?",
          correction:
            "J'écris les trois masses en grammes.\nRouge : 2 kg 300 g = $2\\,000 + 300 = 2\\,300$ g.\nBleu : $2\\,030$ g.\nVert : $2\\,200$ g.\nJe range : $2\\,030$ < $2\\,200$ < $2\\,300$.\na) Le plus lourd : le rouge.\nb) Le plus léger : le bleu.\n⛔ Le piège : lire 2 030 g comme 2 kg 300 g. Ici, il n'y a que 30 g après les 2 kg.\nRéponse : a) le rouge ; b) le bleu.",
          micros: ["masse_comparer", "masse_convertir"],
          reponses: [
            { question: "a)", attendu: ["rouge", "le rouge", "le colis rouge"] },
            { question: "b)", attendu: ["bleu", "le bleu", "le colis bleu"] },
          ],
        },
        {
          enonce: "Choisis la bonne masse. Écris la lettre.\na) Un œuf : A) 60 kg B) 6 g C) 60 g\nb) Un éléphant d'Afrique : A) 5 t B) 5 kg C) 500 g\nc) Un cahier : A) 200 kg B) 200 g C) 2 g",
          correction:
            "Je compare au paquet de sucre de 1 kg.\na) Il faut environ 16 œufs pour faire 1 kg. Un œuf : environ 60 g. 6 g, c'est à peu près un morceau de sucre. Réponse C.\nb) Un éléphant pèse comme plusieurs voitures : environ 5 t. Réponse A.\nc) Cinq cahiers pèsent à peu près 1 kg. Un cahier : environ 200 g. Réponse B.\n⛔ Le piège : prendre 5 kg pour un éléphant. 5 kg, c'est le poids d'un chat.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["masse_estimer"],
          reponses: [
            { question: "a)", attendu: ["C", "C) 60 g"] },
            { question: "b)", attendu: ["A", "A) 5 t"] },
            { question: "c)", attendu: ["B", "B) 200 g"] },
          ],
        },
        {
          enonce: "Au marché de Saint-Pierre, Fatou achète 1 kg 200 g de letchis et 800 g de mangues.\na) Quelle masse de fruits a-t-elle, en grammes ?\nb) Écris cette masse en kilogrammes.",
          correction:
            "a) 1 kg 200 g = $1\\,000 + 200 = 1\\,200$ g.\nJ'ajoute les mangues : $1\\,200 + 800 = 2\\,000$ g.\nb) $2\\,000$ g = 2 fois $1\\,000$ g = 2 kg.\n⛔ Le piège : écrire « 1 kg $1\\,000$ g » et s'arrêter là. $1\\,000$ g, c'est 1 kg de plus.\nRéponse : a) $2\\,000$ ; b) 2.",
          micros: ["masse_convertir"],
          reponses: [
            { question: "a)", attendu: "2000" },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          enonce: "Lucas a un sac de farine de 2 kg.\nIl utilise 1 kg 250 g pour faire des pizzas.\nCombien de grammes de farine reste-t-il dans le sac ?",
          correction:
            "Je mets tout en grammes.\n2 kg = $2\\,000$ g. 1 kg 250 g = $1\\,000 + 250 = 1\\,250$ g.\nJe soustrais : $2\\,000 - 1\\,250 = 750$ g.\nJe vérifie : $1\\,250 + 750 = 2\\,000$.\n⛔ Le piège : calculer $2 - 1 = 1$ kg et oublier les 250 g.\nRéponse : 750.",
          micros: ["masse_convertir"],
          reponses: [{ attendu: "750" }],
        },
        {
          enonce: "Un sachet de billes pèse 150 g.\na) Combien pèsent 4 sachets, en grammes ?\nb) Combien de sachets faut-il pour faire 1 kg 500 g ?",
          correction:
            "a) $4 \\times 150 = 600$ g.\nb) Je mets tout en grammes : 1 kg 500 g = $1\\,500$ g.\nJe cherche combien de fois 150 g tient dans $1\\,500$ g.\n$10 \\times 150 = 1\\,500$. Il faut 10 sachets.\n⛔ Le piège : chercher combien de fois 150 tient dans « 1 kg 500 » sans convertir. Tout doit être en grammes.\nRéponse : a) 600 ; b) 10.",
          micros: ["masse_convertir"],
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque masse dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, et j'y écris toutes les masses.",
        "Pour une limite (« au plus 23 kg »), je calcule ce qui manque : limite − total.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "Le camion du livreur",
          enonce: "Omar est livreur. Son camion peut porter 3 t au plus.\nIl charge 8 caisses de 250 kg.\na) Combien pèsent les 8 caisses, en kilogrammes ?\nb) Combien de kilogrammes peut-il encore charger ?\nc) Combien de caisses de 250 kg en plus, au plus ?",
          correction:
            "Je mets tout en kilogrammes : 3 t = $3\\,000$ kg.\na) $8 \\times 250 = 2\\,000$ kg.\nb) $3\\,000 - 2\\,000 = 1\\,000$ kg.\nc) Combien de fois 250 kg tient dans $1\\,000$ kg ? $4 \\times 250 = 1\\,000$. 4 caisses.\nJe vérifie : 8 + 4 = 12 caisses. $12 \\times 250 = 3\\,000$ kg = 3 t.\n⛔ Le piège : calculer $3 - 2\\,000$. J'écris d'abord 3 t = $3\\,000$ kg.\nRéponse : a) $2\\,000$ ; b) $1\\,000$ ; c) 4.",
          micros: ["masse_convertir", "masse_defi"],
          reponses: [
            { question: "a)", attendu: "2000" },
            { question: "b)", attendu: "1000" },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "La mousse de la pâtissière",
          enonce: "Clara est pâtissière. Pour 4 personnes, sa mousse demande 200 g de chocolat et 100 g de beurre.\nElle prépare la mousse pour 12 personnes.\na) Combien de grammes de chocolat ?\nb) Combien de grammes de beurre ?\nc) Elle a 1 kg de chocolat. Combien de grammes restent ?",
          correction:
            "12 personnes, c'est 3 fois 4 personnes : $3 \\times 4 = 12$.\nJe multiplie donc chaque masse par 3.\na) $3 \\times 200 = 600$ g de chocolat.\nb) $3 \\times 100 = 300$ g de beurre.\nc) 1 kg = $1\\,000$ g. $1\\,000 - 600 = 400$ g.\n⛔ Le piège : garder 200 g, la masse pour 4 personnes. Trois fois plus de personnes, trois fois plus de chocolat.\nRéponse : a) 600 ; b) 300 ; c) 400.",
          micros: ["masse_convertir", "masse_defi"],
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: "400" },
          ],
        },
        {
          titre: "La pesée chez le vétérinaire",
          enonce: "Un vétérinaire pèse un chien : 12 kg 400 g. Puis un chat : 4 kg 800 g.\na) Écris la masse du chien en grammes.\nb) Le chien est plus lourd. De combien de grammes ?\nc) Le chien doit perdre 400 g. Quelle sera sa masse, en kilogrammes ?",
          correction:
            "a) 12 kg = $12\\,000$ g. Donc 12 kg 400 g = $12\\,000 + 400 = 12\\,400$ g.\nb) Le chat : 4 kg 800 g = $4\\,000 + 800 = 4\\,800$ g.\n$12\\,400 - 4\\,800 = 7\\,600$ g.\nc) $12\\,400 - 400 = 12\\,000$ g. Et $12\\,000$ g = 12 kg.\n⛔ Le piège du a) : écrire $1\\,240$ g. 12 kg, ce sont $12\\,000$ g : 12 fois $1\\,000$.\nRéponse : a) $12\\,400$ ; b) $7\\,600$ ; c) 12.",
          micros: ["masse_convertir", "masse_comparer", "masse_defi"],
          reponses: [
            { question: "a)", attendu: "12400" },
            { question: "b)", attendu: "7600" },
            { question: "c)", attendu: "12" },
          ],
        },
        {
          titre: "La valise de l'avion",
          enonce: "À l'aéroport, l'agent pèse les valises. La règle : 23 kg au plus.\nDans la valise de Nina : vêtements 12 kg, chaussures 2 kg 500 g, livres 3 kg 700 g, trousse 800 g.\na) Combien pèse la valise, en kilogrammes ?\nb) Combien de kilogrammes peut-elle encore ajouter ?",
          correction:
            "Je mets tout en grammes.\nVêtements : $12\\,000$ g. Chaussures : $2\\,500$ g. Livres : $3\\,700$ g. Trousse : 800 g.\nJ'additionne : $12\\,000 + 2\\,500 + 3\\,700 + 800 = 19\\,000$ g.\na) $19\\,000$ g = 19 kg.\nb) $23 - 19 = 4$ kg.\n⛔ Le piège : additionner $12 + 2 + 3 = 17$ kg et oublier les grammes : 500 g + 700 g + 800 g font encore 2 kg.\nRéponse : a) 19 ; b) 4.",
          micros: ["masse_convertir", "masse_defi"],
          reponses: [
            { question: "a)", attendu: "19" },
            { question: "b)", attendu: "4" },
          ],
        },
      ],
    },
  ],
};
