// ─── Fiche d'exercices : la monnaie (CP) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `monnaie` du coach CP
// (6 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/monnaie.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : des euros ENTIERS, 100 € au
// plus, PAS de centimes donc PAS de virgule (ils arrivent au CE1). Les pièces
// de 1 € et de 2 €, les billets de 5, 10, 20 et 50 €.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 5 € » vaut 5) : l'élève écrit le
// nombre, avec ou sans « € ».
// ⛔ Phrases de 14 mots au plus, une idée par phrase.
//
// Les pièges nommés (le BO nomme le premier) : compter les PIÈCES au lieu de
// leur VALEUR (6, 12), une pièce de 5 € ou un billet de 2 € (1), ajouter un
// seul billet (2, 3, 9), 12 et 21 (4), 10 pièces = 1 pièce (5), prendre la
// première somme venue (7, 15), rendre le prix (8, 16), oublier une pièce (10),
// rendre trop (11), 5 billets = 5 € (13), lire les chiffres un à un (14),
// oublier une dépense (17, 18), compter les tours comme des euros (19), deux
// prix mais un seul compté (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : boulangerie (3, 20), magasin de sport (4),
// papeterie (8), marché (11, 18), cirque (12), magasin de vélos (14),
// librairie (10, 17), jeux (16), fête foraine (19). Les métiers : marchande
// (11), vendeur (14), boulanger (20).
// UN SEUL contexte réunionnais (18, le marché forain de Saint-Paul, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · les pièces en euros vont de 1 centime à 2 € ; les billets de 5 € à
//     500 € (Banque centrale européenne, « Les billets et les pièces en
//     euros ») : il n'existe ni pièce de 5 €, ni billet de 2 € (ex. 1) ;
//   · ex. 18 — le marché forain de Saint-Paul, en front de mer, a lieu le
//     vendredi et le samedi matin (office de tourisme de l'Ouest de La
//     Réunion). Les PRIX sont un MODÈLE.
// Tous les prix de la feuille sont des MODÈLES, arrondis à l'euro.
//
// ⭐ LES DESSINS : les pièces et les billets (`argent`), à leur couleur et à
// leur valeur. ⛔ Le dessin n'écrit jamais la somme cherchée.
//
// Micro-compétences : cp_monnaie_reconnaitre (1, 13, 20), cp_monnaie_valeur
// (2, 3, 9, 10, 12, 17), cp_monnaie_comparer (4, 6, 12, 14), cp_monnaie_constituer
// (5, 7, 10, 13, 15, 19), cp_monnaie_rendre (8, 11, 16, 18, 20),
// cp_monnaie_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const NOIR = "#0f172a";
const GRIS = "#64748b";

/** Les couleurs des billets en euros (gris 5, rouge 10, bleu 20, orange 50). */
const BILLET: Record<number, { fond: string; bord: string }> = {
  5: { fond: "#e2e8f0", bord: "#64748b" },
  10: { fond: "#fecaca", bord: "#dc2626" },
  20: { fond: "#bfdbfe", bord: "#2563eb" },
  50: { fond: "#fed7aa", bord: "#ea580c" },
};

/**
 * Des pièces et des billets, rangés en lignes. `liste` : les valeurs (1 et 2
 * sont des pièces, 5, 10, 20, 50 des billets). `nom` : un prénom ou une lettre
 * écrit à gauche. ⛔ Jamais la somme écrite.
 */
const argent = (liste: number[], nom?: string) => {
  const W = 320;
  const x0 = nom ? 50 : 10;
  let [x, y, hLigne] = [x0, 10, 0];
  const places = liste.map((v) => {
    const [w, h] = v <= 2 ? [46, 46] : [78, 42];
    if (x + w > W - 6) {
      x = x0;
      y += hLigne + 8;
      hLigne = 0;
    }
    const p = { v, x, y, w, h };
    x += w + 6;
    hLigne = Math.max(hLigne, h);
    return p;
  });
  const H = y + hLigne + 10;
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Pièces et billets en euros">
        {nom ? (
          <text x={8} y={H / 2 + 5} fontSize="15" fontWeight="800" fill={GRIS}>
            {nom}
          </text>
        ) : null}
        {places.map((p, i) =>
          p.v <= 2 ? (
            <g key={i}>
              {/* 1 € : cœur argenté, anneau doré ; 2 € : l'inverse. */}
              <circle cx={p.x + 23} cy={p.y + 23} r={22} fill={p.v === 1 ? "#facc15" : "#cbd5e1"} stroke={NOIR} strokeWidth={1.5} />
              <circle cx={p.x + 23} cy={p.y + 23} r={16} fill={p.v === 1 ? "#e2e8f0" : "#fde047"} stroke={NOIR} strokeWidth={0.8} />
              <text x={p.x + 23} y={p.y + 27.5} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={NOIR}>
                {p.v} €
              </text>
            </g>
          ) : (
            <g key={i}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={5} fill={BILLET[p.v].fond} stroke={BILLET[p.v].bord} strokeWidth={2} />
              <rect x={p.x + 6} y={p.y + 6} width={p.w - 12} height={p.h - 12} rx={3} fill="none" stroke={BILLET[p.v].bord} strokeWidth={0.8} strokeDasharray="3 2" />
              <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill={NOIR}>
                {p.v} €
              </text>
            </g>
          ),
        )}
      </svg>
    </div>
  );
};

/** Plusieurs porte-monnaie l'un sous l'autre, chacun avec son nom. */
const bourses = (liste: { nom: string; argent: number[] }[]) => (
  <div className="space-y-2">
    {liste.map((b) => (
      <div key={b.nom} className="rounded-xl border border-slate-200 bg-white p-1">
        {argent(b.argent, b.nom)}
      </div>
    ))}
  </div>
);

export const exercicesMonnaieCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "monnaie",
  titre: "La monnaie",
  accroche:
    "Vingt exercices avec des pièces et des billets. Compter l'argent, comparer deux sommes, payer un prix, rendre la monnaie. Une boulangerie, un marché, une librairie, un cirque et une fête foraine. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre d'euros.",
      rappel: [
        "Les pièces : 1 € et 2 €. Les billets : 5 €, 10 €, 20 € et 50 €.",
        "Pour savoir combien j'ai, j'ajoute la valeur de chaque pièce et de chaque billet.",
        "Beaucoup de pièces, ce n'est pas toujours beaucoup d'argent.",
      ],
      exercices: [
        {
          enonce: "Vrai ou faux ?\na) Il existe une pièce de 2 €.\nb) Il existe un billet de 2 €.\nc) Il existe une pièce de 5 €.\nd) Il existe un billet de 10 €.",
          correction:
            "Je relis le rappel : pièces de 1 € et 2 €, billets de 5 €, 10 €, 20 € et 50 €.\na) La pièce de 2 € existe. Vrai.\nb) 2 €, c'est une pièce, pas un billet. Faux.\nc) 5 €, c'est un billet, pas une pièce. Faux.\nd) Le billet de 10 € existe. Vrai.\n⛔ Le piège : croire que toutes les sommes existent en pièce et en billet.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          micros: ["cp_monnaie_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["faux", "non"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "Combien d'argent y a-t-il ?\nÉcris le nombre d'euros.",
          figure: argent([2, 2, 1]),
          correction:
            "J'ajoute la valeur de chaque pièce.\n2 € + 2 € = 4 €.\n4 € + 1 € = 5 €.\n⛔ Le piège : compter les pièces, et répondre 3. Il y a 3 pièces, mais 5 €.\nRéponse : 5.",
          micros: ["cp_monnaie_valeur"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "À la boulangerie, Maya compte son argent.\nCombien d'argent a-t-elle ?",
          figure: argent([10, 5, 2]),
          correction:
            "Je commence par le plus gros billet.\n10 € + 5 € = 15 €.\n15 € + 2 € = 17 €.\n⛔ Le piège : oublier la pièce de 2 €. Je compte TOUT ce qui est dessiné.\nRéponse : 17.",
          micros: ["cp_monnaie_valeur"],
          reponses: [{ attendu: ["17", "dix-sept"] }],
        },
        {
          enonce: "Au magasin de sport, quel est le plus cher ?\na) un ballon à 8 € ou une balle à 3 € ?\nb) un livre à 12 € ou un jeu à 21 € ?",
          correction:
            "Je compare les deux prix.\na) 8 est plus grand que 3. Le ballon est le plus cher.\nb) 21, c'est 2 dizaines. 12, c'est 1 dizaine. 21 est plus grand que 12.\nLe jeu est le plus cher.\n⛔ Le piège du b) : 12 et 21 ont les mêmes chiffres. Je regarde d'abord les dizaines.\nRéponse : a) le ballon ; b) le jeu.",
          micros: ["cp_monnaie_comparer"],
          reponses: [
            { question: "a)", attendu: ["ballon", "le ballon"] },
            { question: "b)", attendu: ["jeu", "le jeu"] },
          ],
        },
        {
          enonce: "a) Combien de pièces de 1 € pour faire 10 € ?\nb) Combien de billets de 5 € pour faire 10 € ?",
          correction:
            "a) Je compte de 1 en 1 jusqu'à 10 : il faut 10 pièces de 1 €.\nb) 5 € + 5 € = 10 €. Il faut 2 billets de 5 €.\n⛔ Le piège : croire que 10 pièces de 1 € valent plus qu'un billet de 10 €. C'est pareil.\nRéponse : a) 10 ; b) 2.",
          micros: ["cp_monnaie_constituer"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Voici l'argent de Léa et de Tom.\nQui a le plus d'argent ?",
          figure: bourses([
            { nom: "Léa", argent: [1, 1, 1, 1, 1] },
            { nom: "Tom", argent: [10] },
          ]),
          correction:
            "Je calcule la valeur, pas le nombre de pièces.\nLéa : 1 + 1 + 1 + 1 + 1 = 5 €.\nTom : un billet de 10 €, donc 10 €.\n10 € est plus que 5 €. Tom a le plus d'argent.\n⛔ Le piège : choisir Léa, parce qu'elle a 5 pièces. Tom n'a qu'un billet, mais il vaut 10 €.\nRéponse : Tom.",
          micros: ["cp_monnaie_comparer"],
          reponses: [{ attendu: ["Tom"] }],
        },
        {
          enonce: "Lilou doit payer 7 €.\nQuel paquet donne-t-elle ? Écris la lettre.",
          figure: bourses([
            { nom: "A", argent: [5, 2] },
            { nom: "B", argent: [5, 1] },
            { nom: "C", argent: [2, 2, 2] },
          ]),
          correction:
            "Je calcule chaque paquet.\nA : 5 € + 2 € = 7 €.\nB : 5 € + 1 € = 6 €.\nC : 2 € + 2 € + 2 € = 6 €.\nSeul le paquet A fait 7 €.\n⛔ Le piège : prendre le paquet qui a le plus de pièces, le C. Il ne fait que 6 €.\nRéponse : A.",
          micros: ["cp_monnaie_constituer"],
          reponses: [{ attendu: ["A"] }],
        },
        {
          enonce: "Un cahier coûte 4 €.\nNina paie avec un billet de 5 €.\nCombien la papetière lui rend-elle ?",
          figure: argent([5]),
          correction:
            "Nina donne 5 €. Le cahier coûte 4 €.\nJe compte de 4 jusqu'à 5 : il manque 1.\n5 − 4 = 1. On lui rend 1 €.\n⛔ Le piège : répondre 4, le prix du cahier. On rend ce qui dépasse le prix.\nRéponse : 1.",
          micros: ["cp_monnaie_rendre"],
          reponses: [{ attendu: ["1", "un"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je compte l'argent, puis je réponds.",
      rappel: [
        "Je compte d'abord les billets, puis les pièces.",
        "Ce qui manque : le prix moins ce que j'ai.",
        "Rendre la monnaie : ce que je donne moins le prix.",
      ],
      exercices: [
        {
          enonce: "Le grand frère de Noa ouvre son porte-monnaie.\nCombien d'argent a-t-il ?",
          figure: argent([20, 10, 10, 2, 1]),
          correction:
            "Je commence par les billets, du plus gros au plus petit.\n20 + 10 + 10 = 40 €.\nPuis les pièces : 40 + 2 = 42, et 42 + 1 = 43 €.\n⛔ Le piège : compter un seul billet de 10 €. Il y en a deux.\nRéponse : 43.",
          micros: ["cp_monnaie_valeur"],
          reponses: [{ attendu: ["43"] }],
        },
        {
          enonce: "Un livre coûte 15 €. Voici l'argent de Sami.\na) Combien a-t-il ?\nb) Combien lui manque-t-il ?",
          figure: argent([10, 2]),
          correction:
            "a) 10 € + 2 € = 12 €. Sami a 12 €.\nb) Le livre coûte 15 €. Je compte de 12 jusqu'à 15 : 13, 14, 15.\nIl manque 3 €. Je vérifie : 12 + 3 = 15.\n⛔ Le piège : répondre 15, le prix. La question demande ce qui MANQUE.\nRéponse : a) 12 ; b) 3.",
          micros: ["cp_monnaie_valeur", "cp_monnaie_constituer"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Au marché, des tomates coûtent 6 €.\nLou paie avec un billet de 10 €.\nCombien la marchande lui rend-elle ?",
          figure: argent([10]),
          correction:
            "Lou donne 10 €. Les tomates coûtent 6 €.\nJe compte de 6 jusqu'à 10 : 7, 8, 9, 10. Cela fait 4.\n10 − 6 = 4. La marchande rend 4 €.\n⛔ Le piège : rendre 6 €. On ne rend pas le prix : on rend ce qui reste.\nRéponse : 4.",
          micros: ["cp_monnaie_rendre"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Au cirque, Ana et Bilal comptent leur argent.\na) Qui a le plus d'argent ?\nb) Combien a Ana ?",
          figure: bourses([
            { nom: "Ana", argent: [2, 2, 2, 2] },
            { nom: "Bilal", argent: [5, 1, 1] },
          ]),
          correction:
            "Je calcule la valeur de chaque porte-monnaie.\nAna : 2 + 2 + 2 + 2 = 8 €.\nBilal : 5 + 1 + 1 = 7 €.\na) 8 est plus grand que 7 : Ana a le plus d'argent.\nb) Ana a 8 €.\n⛔ Le piège : choisir Bilal, à cause du billet. Son billet vaut 5 €, pas plus.\nRéponse : a) Ana ; b) 8.",
          micros: ["cp_monnaie_comparer", "cp_monnaie_valeur"],
          reponses: [
            { question: "a)", attendu: ["Ana"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "a) Combien de billets de 10 € pour faire 50 € ?\nb) Combien de pièces de 2 € pour faire 10 € ?",
          correction:
            "a) Je compte de 10 en 10 : 10, 20, 30, 40, 50. Cela fait 5 billets.\nb) Je compte de 2 en 2 : 2, 4, 6, 8, 10. Cela fait 5 pièces.\n⛔ Le piège : croire que 5 billets font 5 €. Chaque billet vaut 10 €.\nRéponse : a) 5 ; b) 5.",
          micros: ["cp_monnaie_constituer", "cp_monnaie_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Au magasin de vélos, le vendeur affiche trois prix.\nA) un vélo : 90 €\nB) une trottinette : 45 €\nC) un casque : 19 €\nRange-les du moins cher au plus cher. Écris les lettres séparées par « ; ».",
          correction:
            "Je compare les dizaines.\nLe casque : 19, 1 dizaine. La trottinette : 45, 4 dizaines. Le vélo : 90, 9 dizaines.\nDu moins cher au plus cher : 19, 45, 90.\nDonc C, puis B, puis A.\n⛔ Le piège : lire le 9 de 19 et croire le casque très cher. Je regarde d'abord les dizaines.\nRéponse : C ; B ; A.",
          micros: ["cp_monnaie_comparer"],
          reponses: [{ attendu: ["C ; B ; A", "C, B, A"], ordre: true }],
        },
        {
          enonce: "Eva paie 25 € avec 2 billets de son porte-monnaie.\nLesquels ? Écris la lettre.\nA) 20 € et 5 €\nB) 10 € et 10 €\nC) 20 € et 10 €",
          figure: argent([20, 10, 10, 5]),
          correction:
            "Je calcule chaque choix.\nA : 20 + 5 = 25 €. C'est juste.\nB : 10 + 10 = 20 €. Il manque 5 €.\nC : 20 + 10 = 30 €. C'est trop.\n⛔ Le piège : prendre les deux plus gros billets, le C. 30 €, c'est plus que 25 €.\nRéponse : A.",
          micros: ["cp_monnaie_constituer"],
          reponses: [{ attendu: ["A", "A) 20 € et 5 €"] }],
        },
        {
          enonce: "Un jeu de cartes coûte 13 €.\nMalik paie avec un billet de 20 €.\nCombien lui rend-on ?",
          figure: argent([20]),
          correction:
            "Malik donne 20 €. Le jeu coûte 13 €.\nJe compte de 13 jusqu'à 20 : de 13 à 20, il y a 7.\n20 − 13 = 7. On lui rend 7 €.\nJe vérifie : 13 + 7 = 20.\n⛔ Le piège : rendre 13 €, le prix du jeu. On rend ce qui dépasse.\nRéponse : 7.",
          micros: ["cp_monnaie_rendre"],
          reponses: [{ attendu: ["7", "sept"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je compte l'argent, puis je calcule pas à pas.",
      rappel: [
        "Payer deux choses : j'ajoute les deux prix.",
        "Ce qui reste : ce que j'ai moins ce que je dépense.",
        "Je vérifie toujours avec une addition.",
      ],
      exercices: [
        {
          titre: "La tirelire de Jade",
          enonce: "Jade casse sa tirelire.\na) Combien d'argent a-t-elle ?\nb) Elle achète un livre à 12 €. Combien lui reste-t-il ?",
          figure: argent([10, 5, 2, 2, 1]),
          correction:
            "a) Je commence par les billets : 10 + 5 = 15 €.\nPuis les pièces : 15 + 2 + 2 + 1 = 20 €.\nb) Elle dépense 12 € : 20 − 12 = 8 €.\nJe vérifie : 12 + 8 = 20.\n⛔ Le piège du b) : répondre 20. Jade a dépensé une partie de son argent.\nRéponse : a) 20 ; b) 8.",
          micros: ["cp_monnaie_valeur", "cp_monnaie_defi"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "Le marché de Saint-Paul",
          enonce: "Au marché de Saint-Paul, Mamie achète un ananas à 3 €.\nElle achète aussi des letchis à 5 €.\na) Combien paie-t-elle en tout ?\nb) Elle donne un billet de 10 €. Combien lui rend-on ?",
          figure: argent([10]),
          correction:
            "a) J'ajoute les deux prix : 3 + 5 = 8 €.\nb) Mamie donne 10 €. Elle doit 8 €.\nJe compte de 8 jusqu'à 10 : 9, 10. Cela fait 2.\n10 − 8 = 2. On lui rend 2 €.\n⛔ Le piège : oublier l'ananas, et rendre 5 €. Il y a deux achats.\nRéponse : a) 8 ; b) 2.",
          micros: ["cp_monnaie_rendre", "cp_monnaie_defi"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Les tours de manège",
          enonce: "À la fête foraine, un tour de manège coûte 2 €.\nLéo a un billet de 10 €.\na) Combien de tours peut-il faire ?\nb) Il fait seulement 3 tours. Combien lui reste-t-il ?",
          figure: argent([10]),
          correction:
            "a) Je compte de 2 en 2 jusqu'à 10 : 2, 4, 6, 8, 10.\nCela fait 5 tours.\nb) 3 tours : 2 + 2 + 2 = 6 €.\nIl lui reste 10 − 6 = 4 €.\n⛔ Le piège du b) : répondre 7, comme si un tour coûtait 1 €. Un tour coûte 2 €.\nRéponse : a) 5 ; b) 4.",
          micros: ["cp_monnaie_constituer", "cp_monnaie_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "La monnaie du boulanger",
          enonce: "Une baguette coûte 1 €. Un gâteau coûte 4 €.\nPaul achète les deux. Il paie avec un billet de 10 €.\na) Combien coûtent ses achats ?\nb) Combien le boulanger lui rend-il ?\nc) Le boulanger rend un seul billet. Lequel ?\nA) 5 € B) 10 € C) 2 €",
          figure: argent([10]),
          correction:
            "a) J'ajoute les prix : 1 + 4 = 5 €.\nb) Paul donne 10 €. 10 − 5 = 5. Le boulanger rend 5 €.\nc) Le billet de 5 € existe. Il n'y a pas de billet de 2 €. Réponse A.\n⛔ Le piège du b) : rendre 9 €, en oubliant le gâteau. Paul achète deux choses.\nRéponse : a) 5 ; b) 5 ; c) A.",
          micros: ["cp_monnaie_rendre", "cp_monnaie_reconnaitre", "cp_monnaie_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["A", "A) 5 €"] },
          ],
        },
      ],
    },
  ],
};
