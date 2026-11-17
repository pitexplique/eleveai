// ─── Fiche d'exercices : les masses (CE1) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `masse` du coach CE1
// (7 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/masse.bank.ts`).
// ⛔ LIMITES DU CE1 : le gramme et le kilogramme seulement (pas de tonne, pas
// de mg), une seule relation, 1 kg = 1 000 g ; pas de virgule (« 1 kg 200 g »).
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, signe, un nombre, un mot.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE : chaque réponse IMPOSE l'unité dans
// l'énoncé (« en grammes ») et l'élève écrit le nombre seul. Les QCM se
// répondent par la LETTRE. Un rangement : des lettres séparées par « ; ».
//
// ⭐ LA BALANCE : le dessin montre ce que l'enfant verrait (le plateau qui
// descend), jamais une masse calculée. Sur une question de conversion, pas de
// balance penchée qui donnerait la réponse (cf. la note de la banque).
//
// Les pièges nommés : le plateau du haut pris pour le plus lourd (1), 1 kg =
// 100 g (2, 4), choisir kg pour tout (3), un kilo de plumes plus léger (4),
// garder le nombre et oublier l'unité (5, 13), ne compter qu'une masse (6),
// 900 g plus lourd que 1 kg (7), « kg » écrit « kgr » (8), comparer deux
// balances au hasard (9), ranger les nombres sans les unités (10), oublier le
// panier (11), 500 + 500 = 1 000 g = 2 kg (12), ajouter 1 kg à des grammes
// (14), compter jusqu'à 100 au lieu de 1 000 (15), 1 kg 50 g = 1 500 g (16),
// garder la caisse (17), un seul gâteau (18), la balance « en chaîne » (19),
// un colis de 1 050 g accepté (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fruits (1, 9), cuisine (6, 12, 18),
// jardin (15), animaux (5, 13, 17), marché (14), école (8, 10), poste (20).
// Les métiers : épicière (6), maraîcher (14), vétérinaire (17), pâtissier
// (18), postier (20).
// UN SEUL contexte réunionnais (14, letchis au marché de Saint-Paul, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 13 — un œuf moyen (calibre M) pèse de 53 à 63 g (règlement (CE)
//     n° 589/2008, article 4 : classes de poids des œufs).
//   · ex. 13 — un litre d'eau pèse environ 1 kg (c'est la définition du
//     kilogramme de 1795, loi du 18 germinal an III) ; le lait est très proche.
// Tout le reste est un MODÈLE.
//
// Micro-compétences : ce1_masse_soupeser (1, 6, 9, 19), ce1_masse_kg_g (3, 5,
// 8), ce1_masse_relation_kg_g (2, 4, 12, 15, 16, 18), ce1_masse_comparer (4,
// 7, 9, 10, 20), ce1_masse_estimer (5, 13), ce1_masse_probleme (11, 14, 17,
// 18), ce1_masse_defi (12, 15, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";

/**
 * Une balance à plateaux. `gauche` et `droite` : les étiquettes empilées sur
 * chaque plateau (objets en orange, masses marquées « … g » ou « … kg » en
 * bleu). `penche` : "gauche" (le plateau gauche descend), "droite", "egal".
 */
const balance = (gauche: string[], droite: string[], penche: "gauche" | "droite" | "egal" = "egal") => {
  const [cx, cy, demi] = [160, 112, 104];
  const a = penche === "egal" ? 0 : ((penche === "gauche" ? 9 : -9) * Math.PI) / 180;
  const g = { x: cx - demi * Math.cos(a), y: cy + demi * Math.sin(a) };
  const d = { x: cx + demi * Math.cos(a), y: cy - demi * Math.sin(a) };
  const estMasse = (t: string) => /^\d[\d\s]*\s?(g|kg)$/.test(t);
  const plateau = (p: { x: number; y: number }, objets: string[], cle: string) => (
    <g key={cle}>
      <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 8} stroke={NOIR} strokeWidth={2} />
      <line x1={p.x - 46} y1={p.y - 8} x2={p.x + 46} y2={p.y - 8} stroke={NOIR} strokeWidth={3.5} strokeLinecap="round" />
      {objets.map((t, k) => (
        <g key={k}>
          <rect x={p.x - 42} y={p.y - 32 - k * 24} width={84} height={22} rx={estMasse(t) ? 3 : 10} fill={estMasse(t) ? BLEU : ORANGE} />
          <text x={p.x} y={p.y - 16 - k * 24} textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 320 170" className="block h-auto w-full" role="img" aria-label="Balance à plateaux">
      <rect x={110} y={156} width={100} height={10} rx={3} fill={GRIS} />
      <rect x={155} y={cy} width={10} height={46} fill={GRIS} />
      <line x1={g.x} y1={g.y} x2={d.x} y2={d.y} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill={NOIR} />
      {plateau(g, gauche, "g")}
      {plateau(d, droite, "d")}
    </svg>
  );
};

/** Une ou deux balances côte à côte (deux : l'une sous l'autre sur téléphone). */
const balances = (liste: { gauche: string[]; droite: string[]; penche?: "gauche" | "droite" | "egal"; nom?: string }[]) => (
  <div className={`mx-auto grid w-full gap-3 ${liste.length > 1 ? "max-w-[36rem] sm:grid-cols-2" : "max-w-[22rem]"} print:max-w-[24rem]`}>
    {liste.map((b, k) => (
      <div key={k}>
        {b.nom ? <p className="mb-1 text-center text-sm font-extrabold text-slate-700">{b.nom}</p> : null}
        {balance(b.gauche, b.droite, b.penche)}
      </div>
    ))}
  </div>
);

export const exercicesMasseCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "masse",
  titre: "Les masses",
  accroche:
    "Vingt exercices, du plus simple au problème. Lire une balance à plateaux. Choisir entre le gramme et le kilogramme. Savoir que 1 kg, c'est 1 000 g. Comparer, estimer, calculer une masse. Des fruits, un gâteau, un chat chez la vétérinaire, un marché et un colis. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, ou la lettre.",
      rappel: [
        "Sur une balance, le plateau le plus lourd descend.",
        "Si la balance est droite, les deux côtés ont la même masse.",
        "1 kg = 1 000 g. Le kilogramme (kg) pour le lourd, le gramme (g) pour le léger.",
      ],
      exercices: [
        {
          enonce: "Regarde la balance.\nQuel fruit est le plus lourd : la pomme ou la banane ?",
          figure: balances([{ gauche: ["pomme"], droite: ["banane"], penche: "gauche" }]),
          correction:
            "Je regarde quel plateau est en bas.\nLe plateau de la pomme est descendu.\nLe plateau le plus lourd descend.\nDonc la pomme est la plus lourde.\n⛔ Le piège : croire que le plateau du haut « gagne ». C'est l'inverse : le lourd tire vers le bas.\nRéponse : la pomme.",
          micros: ["ce1_masse_soupeser"],
          reponses: [{ attendu: ["pomme", "la pomme"] }],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 kg = … g\nb) 2 kg = … g\nc) 1 000 g = … kg",
          correction:
            "J'utilise le rappel : 1 kg = $1\\,000$ g.\na) 1 kg, c'est $1\\,000$ g.\nb) 2 kg, c'est $1\\,000 + 1\\,000 = 2\\,000$ g.\nc) $1\\,000$ g, c'est 1 kg.\n⛔ Le piège : écrire 1 kg = 100 g. Dans 1 kg, il y a $1\\,000$ g : trois zéros.\nRéponse : a) $1\\,000$ ; b) $2\\,000$ ; c) 1.",
          micros: ["ce1_masse_relation_kg_g"],
          reponses: [
            { question: "a)", attendu: "1000" },
            { question: "b)", attendu: "2000" },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Quelle unité choisir : kg ou g ?\na) Un sac de pommes de terre\nb) Une fraise\nc) Un chien\nd) Un crayon",
          correction:
            "Je compare à un paquet de sucre, qui pèse 1 kg.\na) Le sac de pommes de terre est plus lourd que le sucre : kg.\nb) Une fraise est très légère : g.\nc) Un chien est lourd, plus que le paquet de sucre : kg.\nd) Un crayon est très léger : g.\n⛔ Le piège : choisir kg pour tout. Pour un objet léger, j'utilise le gramme.\nRéponse : a) kg ; b) g ; c) kg ; d) g.",
          micros: ["ce1_masse_kg_g"],
          reponses: [
            { question: "a)", attendu: ["kg", "kilogramme", "kilogrammes", "kilo", "kilos"] },
            { question: "b)", attendu: ["g", "gramme", "grammes"] },
            { question: "c)", attendu: ["kg", "kilogramme", "kilogrammes", "kilo", "kilos"] },
            { question: "d)", attendu: ["g", "gramme", "grammes"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 kg = 100 g\nb) 1 000 g = 1 kg\nc) 1 kg de plumes pèse autant que 1 kg de cailloux.",
          correction:
            "Je relis le rappel.\na) 1 kg = $1\\,000$ g, pas 100 g. Faux.\nb) $1\\,000$ g, c'est bien 1 kg. Vrai.\nc) Les deux pèsent 1 kg. Ils ont la même masse. Vrai.\n⛔ Le piège du c) : croire les plumes plus légères. Il faut un gros sac de plumes, mais il pèse aussi 1 kg.\nRéponse : a) faux ; b) vrai ; c) vrai.",
          micros: ["ce1_masse_relation_kg_g", "ce1_masse_comparer"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "Choisis la bonne masse. Écris la lettre.\na) Un chat : A) 4 g B) 4 kg C) 40 kg\nb) Une pomme : A) 150 g B) 150 kg C) 15 kg",
          correction:
            "Je compare au paquet de sucre de 1 kg.\na) Un chat se porte dans les bras. Il pèse comme 4 paquets de sucre : 4 kg. Réponse B.\nb) Il faut environ 6 pommes pour faire 1 kg. Une pomme : environ 150 g. Réponse A.\n⛔ Le piège : garder le bon nombre et oublier l'unité. 4 g, c'est le poids d'une feuille de papier, pas d'un chat.\nRéponse : a) B ; b) A.",
          micros: ["ce1_masse_estimer", "ce1_masse_kg_g"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 4 kg"] },
            { question: "b)", attendu: ["A", "A) 150 g"] },
          ],
        },
        {
          enonce: "L'épicière pèse un sac de riz. La balance est droite.\nCombien pèse le sac, en grammes ?",
          figure: balances([{ gauche: ["riz"], droite: ["500 g", "200 g", "100 g"] }]),
          correction:
            "La balance est droite : les deux plateaux ont la même masse.\nÀ droite, j'additionne les trois masses : $500 + 200 + 100 = 800$ g.\nDonc le sac de riz pèse 800 g.\n⛔ Le piège : ne compter que la plus grosse masse, 500 g. Toutes les masses du plateau comptent.\nRéponse : 800.",
          micros: ["ce1_masse_soupeser"],
          reponses: [{ attendu: "800" }],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 900 g … 1 kg\nb) 1 000 g … 1 kg\nc) 300 g … 30 g\nd) 2 kg … 1 kg",
          correction:
            "J'écris les deux masses dans la même unité, puis je compare.\na) 1 kg = $1\\,000$ g. 900 g est moins que $1\\,000$ g. Donc 900 g < 1 kg.\nb) 1 kg = $1\\,000$ g. C'est pareil : $1\\,000$ g = 1 kg.\nc) 300 g est plus que 30 g. Donc 300 g > 30 g.\nd) 2 kg est plus que 1 kg. Donc 2 kg > 1 kg.\n⛔ Le piège du a) : 900 est plus grand que 1, mais 900 g est plus léger que 1 kg.\nRéponse : a) < ; b) = ; c) > ; d) >.",
          micros: ["ce1_masse_comparer"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Écris le symbole de l'unité.\na) kilogramme : …\nb) gramme : …",
          correction:
            "Le symbole est une écriture courte de l'unité.\na) Kilogramme s'écrit kg : k pour « kilo », g pour « gramme ».\nb) Gramme s'écrit g.\n⛔ Le piège : écrire « kgr » ou « gr ». Le bon symbole est kg, et g, sans point.\nRéponse : a) kg ; b) g.",
          micros: ["ce1_masse_kg_g"],
          reponses: [
            { question: "a)", attendu: ["kg"], exact: true },
            { question: "b)", attendu: ["g"], exact: true },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mets tout en grammes avant de calculer.",
      rappel: [
        "1 kg = 1 000 g. Donc 1 kg 200 g = 1 000 g + 200 g = 1 200 g.",
        "Pour comparer, j'écris les masses dans la même unité.",
        "500 g + 500 g = 1 000 g = 1 kg.",
      ],
      exercices: [
        {
          enonce: "Regarde les deux balances.\na) Quel fruit est le plus lourd des trois ?\nb) Quel fruit est le plus léger des trois ?",
          figure: balances([
            { gauche: ["melon"], droite: ["ananas"], penche: "gauche", nom: "Balance 1" },
            { gauche: ["ananas"], droite: ["orange"], penche: "gauche", nom: "Balance 2" },
          ]),
          correction:
            "Balance 1 : le melon descend. Le melon est plus lourd que l'ananas.\nBalance 2 : l'ananas descend. L'ananas est plus lourd que l'orange.\nJe range : melon, puis ananas, puis orange.\na) Le plus lourd : le melon.\nb) Le plus léger : l'orange.\n⛔ Le piège : regarder une seule balance. L'ananas est sur les deux : il fait le lien.\nRéponse : a) le melon ; b) l'orange.",
          micros: ["ce1_masse_soupeser", "ce1_masse_comparer"],
          reponses: [
            { question: "a)", attendu: ["melon", "le melon"] },
            { question: "b)", attendu: ["orange", "l'orange"] },
          ],
        },
        {
          enonce: "Quatre trousses :\nA = 1 kg ; B = 800 g ; C = 1 200 g ; D = 90 g.\nRange-les de la plus légère à la plus lourde.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les masses en grammes.\nA = 1 kg = $1\\,000$ g. B = 800 g. C = $1\\,200$ g. D = 90 g.\nJe range : 90 < 800 < $1\\,000$ < $1\\,200$.\nDonc D, puis B, puis A, puis C.\n⛔ Le piège : mettre A en premier parce que « 1 » est petit. 1 kg, c'est $1\\,000$ g.\nRéponse : D ; B ; A ; C.",
          micros: ["ce1_masse_comparer", "ce1_masse_relation_kg_g"],
          reponses: [{ attendu: ["D ; B ; A ; C", "D < B < A < C", "D, B, A, C"], ordre: true }],
        },
        {
          enonce: "Le panier plein de pommes pèse 1 kg.\nLe panier vide pèse 300 g.\nCombien pèsent les pommes, en grammes ?",
          correction:
            "Je mets tout en grammes : 1 kg = $1\\,000$ g.\nLe panier plein, c'est le panier + les pommes.\nJ'enlève le panier : $1\\,000 - 300 = 700$ g.\nJe vérifie : $700 + 300 = 1\\,000$.\n⛔ Le piège : répondre $1\\,000$ g. Le panier compte aussi : je l'enlève.\nRéponse : 700.",
          micros: ["ce1_masse_probleme", "ce1_masse_relation_kg_g"],
          reponses: [{ attendu: "700" }],
        },
        {
          enonce: "Pour faire 1 kg de farine :\na) combien de paquets de 500 g faut-il ?\nb) combien de paquets de 250 g faut-il ?",
          correction:
            "1 kg = $1\\,000$ g.\na) $500 + 500 = 1\\,000$. Il faut 2 paquets de 500 g.\nb) $250 + 250 + 250 + 250 = 1\\,000$. C'est $4 \\times 250$. Il faut 4 paquets de 250 g.\n⛔ Le piège : croire que 2 paquets de 500 g font 2 kg. Ils font $1\\,000$ g, donc 1 kg.\nRéponse : a) 2 ; b) 4.",
          micros: ["ce1_masse_relation_kg_g", "ce1_masse_defi"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Choisis la bonne masse. Écris la lettre.\na) Un œuf : A) 60 kg B) 60 g C) 6 kg\nb) Une brique de lait de 1 litre : A) 10 g B) 10 kg C) 1 kg\nc) Un vélo d'enfant : A) 10 kg B) 10 g C) 100 kg",
          correction:
            "Je compare au paquet de sucre de 1 kg.\na) Il faut environ 16 œufs pour faire 1 kg. Un œuf : environ 60 g. Réponse B.\nb) Une brique de lait pèse comme le paquet de sucre : environ 1 kg. Réponse C.\nc) Un vélo d'enfant se soulève avec deux mains. Il pèse environ 10 kg. Réponse A.\n⛔ Le piège : choisir 60 kg pour l'œuf. 60 kg, c'est le poids d'un adulte !\nRéponse : a) B ; b) C ; c) A.",
          micros: ["ce1_masse_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 60 g"] },
            { question: "b)", attendu: ["C", "C) 1 kg"] },
            { question: "c)", attendu: ["A", "A) 10 kg"] },
          ],
        },
        {
          enonce: "Au marché de Saint-Paul, le maraîcher pèse 400 g de letchis et 350 g de tomates.\na) Quelle masse en tout, en grammes ?\nb) C'est : A) plus que 1 kg B) moins que 1 kg",
          correction:
            "a) J'additionne : $400 + 350 = 750$ g.\nb) 1 kg = $1\\,000$ g. 750 est moins que $1\\,000$.\nDonc c'est moins que 1 kg. Réponse B.\n⛔ Le piège : ajouter 1 kg à des grammes sans convertir. J'écris tout en grammes.\nRéponse : a) 750 ; b) B.",
          micros: ["ce1_masse_probleme", "ce1_masse_comparer"],
          reponses: [
            { question: "a)", attendu: "750" },
            { question: "b)", attendu: ["B", "B) moins que 1 kg", "moins"] },
          ],
        },
        {
          enonce: "Au jardin, Noé pose 650 g de haricots sur la balance.\nIl en veut 1 kg.\nCombien de grammes doit-il ajouter ?",
          correction:
            "1 kg = $1\\,000$ g.\nJe cherche ce qui manque de 650 pour aller à $1\\,000$.\nJe compte : de 650 à 700, il y a 50. De 700 à $1\\,000$, il y a 300.\n$50 + 300 = 350$ g.\nJe vérifie : $650 + 350 = 1\\,000$.\n⛔ Le piège : chercher ce qui manque jusqu'à 100. 1 kg, c'est $1\\,000$ g.\nRéponse : 350.",
          micros: ["ce1_masse_defi", "ce1_masse_relation_kg_g"],
          reponses: [{ attendu: "350" }],
        },
        {
          enonce: "Écris en grammes. Écris seulement le nombre.\na) 1 kg 200 g = … g\nb) 1 kg 50 g = … g\nc) 2 kg = … g",
          correction:
            "Je change les kilogrammes en grammes, puis j'ajoute le reste.\na) 1 kg = $1\\,000$ g. $1\\,000 + 200 = 1\\,200$ g.\nb) $1\\,000 + 50 = 1\\,050$ g.\nc) 2 kg = $1\\,000 + 1\\,000 = 2\\,000$ g.\n⛔ Le piège du b) : écrire $1\\,500$ g. Il y a 50 g, pas 500 g.\nRéponse : a) $1\\,200$ ; b) $1\\,050$ ; c) $2\\,000$.",
          micros: ["ce1_masse_relation_kg_g"],
          reponses: [
            { question: "a)", attendu: "1200" },
            { question: "b)", attendu: "1050" },
            { question: "c)", attendu: "2000" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je calcule pas à pas.",
      rappel: [
        "Je choisis une unité, et j'y écris toutes les masses.",
        "Ce qui reste : le grand moins le petit.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Chez la vétérinaire",
          enonce: "La vétérinaire pèse un chat dans sa caisse : 5 kg.\nLa caisse vide pèse 1 kg.\na) Combien pèse le chat, en kilogrammes ?\nb) Le chien pèse 3 fois plus que le chat. Combien de kilogrammes ?",
          correction:
            "a) 5 kg, c'est le chat + la caisse.\nJ'enlève la caisse : $5 - 1 = 4$ kg.\nb) 3 fois 4 kg : $3 \\times 4 = 12$ kg.\n⛔ Le piège : garder 5 kg pour le chat. La caisse est pesée avec lui.\nRéponse : a) 4 ; b) 12.",
          micros: ["ce1_masse_probleme", "ce1_masse_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: "12" },
          ],
        },
        {
          titre: "Les gâteaux du pâtissier",
          enonce: "Le pâtissier fait un gâteau.\nIl met 250 g de farine, 150 g de sucre et 100 g de beurre.\na) Combien de grammes pour un gâteau ?\nb) Il fait 2 gâteaux. Combien de grammes ?\nc) Écris ce b) en kilogrammes.",
          correction:
            "a) $250 + 150 + 100 = 500$ g.\nb) 2 gâteaux : $500 + 500 = 1\\,000$ g.\nc) $1\\,000$ g = 1 kg.\n⛔ Le piège : s'arrêter à un seul gâteau. Il en fait deux.\nRéponse : a) 500 ; b) $1\\,000$ ; c) 1.",
          micros: ["ce1_masse_probleme", "ce1_masse_relation_kg_g"],
          reponses: [
            { question: "a)", attendu: "500" },
            { question: "b)", attendu: "1000" },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          titre: "Le défi des balances",
          enonce: "Les deux balances sont droites.\na) Combien pèse une orange, en grammes ?\nb) Combien pèse le melon, en grammes ?",
          figure: balances([
            { gauche: ["orange"], droite: ["200 g"], nom: "Balance 1" },
            { gauche: ["melon"], droite: ["orange", "orange", "orange"], nom: "Balance 2" },
          ]),
          correction:
            "a) Balance 1 : l'orange et la masse de 200 g s'équilibrent. Une orange pèse 200 g.\nb) Balance 2 : le melon pèse autant que 3 oranges.\nJe calcule : $200 + 200 + 200 = 600$ g.\n⛔ Le piège : répondre 3. Le melon ne pèse pas 3 g : il pèse comme 3 oranges de 200 g.\nRéponse : a) 200 ; b) 600.",
          micros: ["ce1_masse_soupeser", "ce1_masse_defi"],
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "600" },
          ],
        },
        {
          titre: "Le colis du postier",
          enonce: "Le postier accepte les colis de 1 kg au plus.\nDans le colis de Lina : 300 g, 400 g et 250 g.\na) Combien pèse le colis, en grammes ?\nb) Elle ajoute une boîte de 100 g. Le postier accepte-t-il ? Oui ou non ?",
          correction:
            "a) $300 + 400 + 250 = 950$ g.\n950 g, c'est moins que 1 kg ($1\\,000$ g) : le colis passe.\nb) $950 + 100 = 1\\,050$ g.\n$1\\,050$ g, c'est plus que $1\\,000$ g. C'est trop lourd.\n⛔ Le piège : croire que « 1 050 » passe parce qu'il est proche. Au plus 1 kg, c'est $1\\,000$ g ou moins.\nRéponse : a) 950 ; b) non.",
          micros: ["ce1_masse_comparer", "ce1_masse_defi"],
          reponses: [
            { question: "a)", attendu: "950" },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
      ],
    },
  ],
};
