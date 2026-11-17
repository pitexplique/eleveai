// ─── Fiche d'exercices : la monnaie (CE1) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `monnaie` du coach CE1
// (8 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/monnaie.bank.ts`).
// ⛔ LIMITES DU CE1 : EUROS ENTIERS D'ABORD (valeur d'un tas, comparer,
// constituer, rendre, problèmes) ; les centimes et l'écriture à virgule
// seulement dans les micros qui les nomment (2, 6, 7, 12, 15, 16) ; nombres
// dans le millier.
// ⛔ Aucune question à rédiger : QCM, un nombre, un prénom, des lettres.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE : l'énoncé IMPOSE l'unité (« en euros »,
// « en centimes ») et l'élève écrit le nombre seul. 4,05 se tape avec la
// virgule. Les QCM par la LETTRE ; un choix de deux objets par deux lettres
// séparées par « ; » (dans n'importe quel ordre).
//
// ⭐ LES DESSINS : pièces et billets (`monnaie`), dessinés à leur valeur.
// Le dessin n'additionne jamais : la somme cherchée n'est jamais écrite.
//
// Les pièges nommés : compter les pièces au lieu de leur valeur (1, 3, 9,
// 13), 1 € = 10 c (2), payer trop ou pas assez (4), 10 − 7 compté à l'envers
// (5), 3,50 € lu 350 € (6), 100 c = 100 € (7), oublier un achat (8), 10 €
// + 5 € = 105 € (9), le plus de pièces au lieu du moins (10), rendre le prix
// au lieu de la monnaie (11, 17), 4,5 € pour 4 € 5 c (12), 1,7 pour 1,75
// (15), 5 pièces de 50 c (16), payer avant de compter (14), le billet rangé
// avec les pièces (18), le prix d'un seul fruit (19), le premier objet pris
// au hasard (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché (8, 19), librairie (5), boulangerie
// (7), magasin de sport (11), tirelire (18), fête de l'école (14), fleuriste
// (17), magasin de jouets (20), cantine (16). Les métiers : libraire (5),
// boulanger (7), fleuriste (17), maraîchère (19).
// UN SEUL contexte réunionnais (19, le marché forain de Saint-Paul, prix
// INVENTÉS).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · les pièces et billets en euros : 1, 2, 5, 10, 20, 50 centimes, 1 € et
//     2 € ; billets de 5, 10, 20, 50 € (Banque centrale européenne,
//     « Billets et pièces en euros »). 1 € = 100 centimes.
// Tous les prix sont des MODÈLES.
//
// Micro-compétences : ce1_monnaie_euros_centimes (2, 7, 15, 16),
// ce1_monnaie_valeur_ensemble (1, 7, 9, 18), ce1_monnaie_comparer_ensembles
// (3, 13), ce1_monnaie_constituer (4, 10, 16), ce1_monnaie_rendre (5, 11, 14,
// 17, 19), ce1_monnaie_virgule (6, 12, 15), ce1_monnaie_probleme (8, 14, 17,
// 19), ce1_monnaie_defi (10, 18, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const NOIR = "#0f172a";

/** Une pièce ou un billet, d'après son étiquette : « 2 € », « 50 c », « 10 € » (billet à partir de 5 €). */
const objet = (t: string, x: number, y: number, k: number) => {
  const centimes = /c$/.test(t);
  const v = parseInt(t, 10);
  if (!centimes && v >= 5) {
    const couleur = v === 5 ? "#94a3b8" : v === 10 ? "#f87171" : v === 20 ? "#60a5fa" : "#fb923c";
    return (
      <g key={k}>
        <rect x={x} y={y + 4} width={76} height={42} rx={4} fill={couleur} stroke={NOIR} strokeWidth={1.4} />
        <rect x={x + 6} y={y + 10} width={64} height={30} rx={3} fill="none" stroke="#ffffff" strokeWidth={1.2} strokeOpacity={0.8} />
        <text x={x + 38} y={y + 31} textAnchor="middle" fontSize="16" fontWeight="900" fill={NOIR}>
          {t}
        </text>
      </g>
    );
  }
  const r = centimes ? (v >= 10 ? 21 : 18) : 24;
  const [cx, cy] = [x + 25, y + 25];
  // Centimes : cuivre (1, 2, 5 c) ou or (10, 20, 50 c). Euros : bicolores,
  // cœur or et bague argent pour 1 €, l'inverse pour 2 €.
  const [bague, coeur] = centimes ? [v >= 10 ? "#facc15" : "#d97706", ""] : v === 1 ? ["#e2e8f0", "#facc15"] : ["#facc15", "#e2e8f0"];
  return (
    <g key={k}>
      <circle cx={cx} cy={cy} r={r} fill={bague} stroke={NOIR} strokeWidth={1.4} />
      {coeur ? <circle cx={cx} cy={cy} r={r - 7} fill={coeur} stroke={NOIR} strokeWidth={0.8} /> : null}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={t.length > 3 ? 12 : 14} fontWeight="900" fill={NOIR}>
        {t}
      </text>
    </g>
  );
};

/** Un tas de pièces et de billets, en ligne, qui passe à la ligne (largeur 320). */
const monnaie = (tas: string[], nom?: string) => {
  const places: { t: string; x: number; y: number }[] = [];
  let [x, y] = [4, nom ? 22 : 4];
  for (const t of tas) {
    const w = /c$/.test(t) || parseInt(t, 10) < 5 ? 54 : 82;
    if (x + w > 320) {
      x = 4;
      y += 54;
    }
    places.push({ t, x, y });
    x += w;
  }
  const H = y + 54;
  return (
    <svg viewBox={`0 0 324 ${H}`} className="block h-auto w-full" role="img" aria-label="Pièces et billets">
      {nom ? (
        <text x={4} y={15} fontSize="14" fontWeight="900" fill={NOIR}>
          {nom}
        </text>
      ) : null}
      {places.map((p, k) => objet(p.t, p.x, p.y, k))}
    </svg>
  );
};

/** Un ou deux tas, l'un sous l'autre. */
const tas = (...liste: { pieces: string[]; nom?: string }[]) => (
  <div className="mx-auto grid w-full max-w-[22rem] gap-2 print:max-w-[16rem]">
    {liste.map((l, k) => (
      <div key={k}>{monnaie(l.pieces, l.nom)}</div>
    ))}
  </div>
);

export const exercicesMonnaieCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "monnaie",
  titre: "La monnaie",
  accroche:
    "Vingt exercices, du plus simple au problème. Compter des pièces et des billets. Payer un prix, rendre la monnaie. 1 €, c'est 100 centimes. Lire un prix à virgule. Une librairie, une boulangerie, un marché, une fête d'école, un fleuriste et une tirelire. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, ou la lettre.",
      rappel: [
        "Je compte la VALEUR des pièces, pas le nombre de pièces.",
        "1 € = 100 centimes (100 c).",
        "Rendre la monnaie : ce que je donne moins le prix.",
      ],
      exercices: [
        {
          enonce: "Combien d'euros y a-t-il ?\na) Le tas 1\nb) Le tas 2",
          figure: tas({ pieces: ["2 €", "2 €", "1 €"], nom: "Tas 1" }, { pieces: ["10 €", "5 €", "2 €"], nom: "Tas 2" }),
          correction:
            "J'ajoute la valeur de chaque pièce ou billet.\na) $2 + 2 + 1 = 5$ €.\nb) Je commence par le plus grand : $10 + 5 + 2 = 17$ €.\n⛔ Le piège : compter les pièces, et dire 3. Il y a 3 pièces, mais elles valent 5 €.\nRéponse : a) 5 ; b) 17.",
          micros: ["ce1_monnaie_valeur_ensemble"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: "17" },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 € = … centimes\nb) 2 € = … centimes\nc) 100 centimes = … €",
          correction:
            "J'utilise le rappel : 1 € = 100 c.\na) 1 €, c'est 100 centimes.\nb) 2 €, c'est $100 + 100 = 200$ centimes.\nc) 100 centimes, c'est 1 €.\n⛔ Le piège : écrire 1 € = 10 c. Dans un euro, il y a 100 centimes.\nRéponse : a) 100 ; b) 200 ; c) 1.",
          micros: ["ce1_monnaie_euros_centimes"],
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "200" },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Léo et Zoé comparent leur argent.\nQui a le plus d'argent ?",
          figure: tas({ pieces: ["5 €", "2 €"], nom: "Léo" }, { pieces: ["2 €", "2 €", "2 €"], nom: "Zoé" }),
          correction:
            "Je calcule la valeur de chaque tas.\nLéo : $5 + 2 = 7$ €.\nZoé : $2 + 2 + 2 = 6$ €.\n7 est plus que 6 : Léo a le plus d'argent.\n⛔ Le piège : choisir Zoé parce qu'elle a 3 pièces. Le nombre de pièces ne compte pas, leur valeur compte.\nRéponse : Léo.",
          micros: ["ce1_monnaie_comparer_ensembles"],
          reponses: [{ attendu: ["Léo"] }],
        },
        {
          enonce: "Je dois payer 8 € tout juste.\nQuel tas choisir ? A) 5 € + 2 € + 1 € B) 5 € + 2 € C) 2 € + 2 € + 2 €",
          correction:
            "Je calcule chaque tas.\nA) $5 + 2 + 1 = 8$ €. C'est juste.\nB) $5 + 2 = 7$ €. Il manque 1 €.\nC) $2 + 2 + 2 = 6$ €. Il manque 2 €.\nRéponse A.\n⛔ Le piège : prendre B parce qu'il y a un gros billet. Je vérifie toujours la somme.\nRéponse : A.",
          micros: ["ce1_monnaie_constituer"],
          reponses: [{ attendu: ["A", "A) 5 € + 2 € + 1 €"] }],
        },
        {
          enonce: "À la librairie, Nina achète un livre à 7 €.\nElle donne un billet de 10 €.\nCombien d'euros le libraire lui rend-il ?",
          figure: tas({ pieces: ["10 €"], nom: "Nina donne" }),
          correction:
            "Le libraire rend ce que Nina donne moins le prix.\n$10 - 7 = 3$ €.\nJe vérifie en comptant : de 7 € à 10 €, il y a 8, 9, 10. Trois euros.\n⛔ Le piège : rendre 7 €, le prix du livre. Il rend la différence.\nRéponse : 3.",
          micros: ["ce1_monnaie_rendre"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Un jouet coûte 3,50 €. Que veut dire ce prix ?\nA) 3 euros et 50 centimes B) 350 euros C) 3 euros et 5 centimes",
          correction:
            "Dans un prix, la virgule sépare les euros et les centimes.\nAvant la virgule : 3, les euros. Après la virgule : 50, les centimes.\n3,50 €, c'est 3 euros et 50 centimes. Réponse A.\n⛔ Le piège : oublier la virgule et lire 350 €. Ce serait le prix d'un vélo !\nRéponse : A.",
          micros: ["ce1_monnaie_virgule"],
          reponses: [{ attendu: ["A", "A) 3 euros et 50 centimes"] }],
        },
        {
          enonce: "À la boulangerie, Sami a ces pièces.\na) Combien de centimes a-t-il ?\nb) Cela fait combien d'euros ?",
          figure: tas({ pieces: ["50 c", "20 c", "20 c", "10 c"] }),
          correction:
            "a) J'ajoute les centimes : $50 + 20 + 20 + 10 = 100$ centimes.\nb) 100 centimes = 1 €.\n⛔ Le piège : croire que 100 centimes font 100 €. 100 centimes, c'est 1 € seulement.\nRéponse : a) 100 ; b) 1.",
          micros: ["ce1_monnaie_euros_centimes", "ce1_monnaie_valeur_ensemble"],
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Au marché, une salade coûte 2 €. Les tomates coûtent 3 €.\nCombien d'euros faut-il pour payer les deux ?",
          correction:
            "Je veux le prix des deux achats ensemble : j'additionne.\n$2 + 3 = 5$ €.\n⛔ Le piège : ne payer que les tomates. Il y a deux achats.\nRéponse : 5.",
          micros: ["ce1_monnaie_probleme"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je compte en commençant par le plus gros billet.",
      rappel: [
        "Je range les billets et les pièces du plus grand au plus petit, puis j'additionne.",
        "4,05 € = 4 euros et 5 centimes. Les centimes prennent toujours deux chiffres.",
        "Pour rendre, je compte du prix jusqu'à la somme donnée.",
      ],
      exercices: [
        {
          enonce: "Combien d'euros y a-t-il en tout ?",
          figure: tas({ pieces: ["20 €", "10 €", "5 €", "2 €", "2 €"] }),
          correction:
            "Je commence par les billets, du plus grand au plus petit.\n$20 + 10 = 30$. $30 + 5 = 35$.\nPuis les pièces : $35 + 2 + 2 = 39$ €.\n⛔ Le piège : écrire 105 en collant 10 et 5. Je calcule $10 + 5 = 15$.\nRéponse : 39.",
          micros: ["ce1_monnaie_valeur_ensemble"],
          reponses: [{ attendu: "39" }],
        },
        {
          enonce: "Je veux faire 15 € avec le MOINS de billets possible.\nA) 10 € + 5 € B) 5 € + 5 € + 5 € C) 10 € + 2 € + 2 € + 1 €\nÉcris la lettre.",
          correction:
            "Je vérifie que chaque tas fait 15 €.\nA) $10 + 5 = 15$ : 2 billets.\nB) $5 + 5 + 5 = 15$ : 3 billets.\nC) $10 + 2 + 2 + 1 = 15$ : 4 morceaux.\nLe moins, c'est A, avec 2 billets.\n⛔ Le piège : choisir le tas qui a le plus de morceaux. On cherche le moins.\nRéponse : A.",
          micros: ["ce1_monnaie_constituer", "ce1_monnaie_defi"],
          reponses: [{ attendu: ["A", "A) 10 € + 5 €"] }],
        },
        {
          enonce: "Au magasin de sport, Tom achète un ballon à 13 €.\nIl paie avec un billet de 20 €.\nCombien d'euros lui rend-on ?",
          correction:
            "On rend ce que Tom donne moins le prix : $20 - 13$.\nJe compte de 13 à 20 : de 13 à 20, il y a 7.\n$20 - 13 = 7$ €.\nJe vérifie : $13 + 7 = 20$.\n⛔ Le piège : rendre 13 €, le prix du ballon.\nRéponse : 7.",
          micros: ["ce1_monnaie_rendre"],
          reponses: [{ attendu: ["7", "sept"] }],
        },
        {
          enonce: "a) 4 euros et 5 centimes s'écrit : A) 4,5 € B) 4,05 € C) 45 €\nb) 2,30 €, c'est combien de centimes ?",
          correction:
            "a) Après la virgule, les centimes prennent deux chiffres.\n5 centimes s'écrit 05. Donc 4 euros et 5 centimes, c'est 4,05 €. Réponse B.\nb) 2,30 €, c'est 2 € et 30 c.\n2 € = 200 c. $200 + 30 = 230$ centimes.\n⛔ Le piège du a) : écrire 4,5 €. 4,5 €, c'est 4 euros et 50 centimes.\nRéponse : a) B ; b) 230.",
          micros: ["ce1_monnaie_virgule", "ce1_monnaie_euros_centimes"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 4,05 €"] },
            { question: "b)", attendu: "230" },
          ],
        },
        {
          enonce: "Tom et Lina comparent leur argent.\na) Qui a le plus d'argent ?\nb) Combien d'euros de plus ?",
          figure: tas({ pieces: ["10 €"], nom: "Tom" }, { pieces: ["2 €", "2 €", "2 €", "2 €", "1 €"], nom: "Lina" }),
          correction:
            "Je calcule la valeur de chaque tas.\nTom : 10 €.\nLina : $2 + 2 + 2 + 2 + 1 = 9$ €.\na) 10 est plus que 9 : Tom a le plus.\nb) $10 - 9 = 1$ € de plus.\n⛔ Le piège : choisir Lina, qui a 5 pièces. Un seul billet peut valoir plus que beaucoup de pièces.\nRéponse : a) Tom ; b) 1.",
          micros: ["ce1_monnaie_comparer_ensembles"],
          reponses: [
            { question: "a)", attendu: ["Tom"] },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "À la fête de l'école, un ticket coûte 2 €. Zoé achète 3 tickets.\na) Combien d'euros paie-t-elle ?\nb) Elle donne 10 €. Combien d'euros lui rend-on ?",
          correction:
            "a) 3 tickets à 2 € : $2 + 2 + 2 = 6$ €. C'est $3 \\times 2 = 6$.\nb) On rend $10 - 6 = 4$ €.\n⛔ Le piège : rendre avant de calculer le prix. Je cherche d'abord combien coûtent les 3 tickets.\nRéponse : a) 6 ; b) 4.",
          micros: ["ce1_monnaie_probleme", "ce1_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Une pomme coûte 1 euro et 75 centimes.\na) Écris ce prix avec une virgule, sans le signe €.\nb) 0,50 €, c'est combien de centimes ?",
          correction:
            "a) Les euros avant la virgule : 1. Les centimes après : 75.\nLe prix s'écrit 1,75 €.\nb) 0,50 € : 0 euro et 50 centimes. C'est 50 centimes.\n⛔ Le piège du a) : écrire 1,7. Les centimes prennent deux chiffres : 75.\nRéponse : a) 1,75 ; b) 50.",
          micros: ["ce1_monnaie_virgule", "ce1_monnaie_euros_centimes"],
          reponses: [
            { question: "a)", attendu: "1,75" },
            { question: "b)", attendu: "50" },
          ],
        },
        {
          enonce: "Pour payer 1 € à la cantine :\na) combien de pièces de 20 c faut-il ?\nb) combien de pièces de 50 c faut-il ?",
          correction:
            "1 € = 100 centimes.\na) Je compte de 20 en 20 : 20, 40, 60, 80, 100. Cinq pièces.\nb) $50 + 50 = 100$. Deux pièces.\n⛔ Le piège du b) : répondre 5, comme au a). Une pièce de 50 c vaut plus qu'une pièce de 20 c.\nRéponse : a) 5 ; b) 2.",
          micros: ["ce1_monnaie_euros_centimes", "ce1_monnaie_constituer"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je calcule le prix, puis la monnaie.",
      rappel: [
        "D'abord le prix total : j'additionne les achats.",
        "Puis la monnaie : ce que je donne moins le prix total.",
        "À la fin, je vérifie : prix + monnaie = ce que j'ai donné.",
      ],
      exercices: [
        {
          titre: "Chez le fleuriste",
          enonce: "Chez le fleuriste, Maman achète un bouquet à 12 € et un vase à 6 €.\na) Combien d'euros paie-t-elle ?\nb) Elle donne un billet de 20 €. Combien d'euros lui rend-on ?",
          correction:
            "a) J'additionne : $12 + 6 = 18$ €.\nb) On rend $20 - 18 = 2$ €.\nJe vérifie : $18 + 2 = 20$.\n⛔ Le piège : rendre $20 - 12 = 8$ €, en oubliant le vase.\nRéponse : a) 18 ; b) 2.",
          micros: ["ce1_monnaie_probleme", "ce1_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "La tirelire de Sam",
          enonce: "Sam vide sa tirelire.\na) Combien d'euros a-t-il ?\nb) Il veut un jeu à 25 €. Combien d'euros lui manque-t-il ?",
          figure: tas({ pieces: ["5 €", "5 €", "2 €", "2 €", "2 €", "1 €", "1 €", "1 €", "1 €"] }),
          correction:
            "a) Les billets : $5 + 5 = 10$ €.\nLes pièces de 2 € : $2 + 2 + 2 = 6$ €.\nLes pièces de 1 € : $1 + 1 + 1 + 1 = 4$ €.\nEn tout : $10 + 6 + 4 = 20$ €.\nb) Il manque $25 - 20 = 5$ €.\n⛔ Le piège : compter les 9 morceaux et dire 9 €. Je compte leur valeur.\nRéponse : a) 20 ; b) 5.",
          micros: ["ce1_monnaie_valeur_ensemble", "ce1_monnaie_defi"],
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Au marché de Saint-Paul",
          enonce: "Au marché de Saint-Paul, la maraîchère vend l'ananas à 3 €.\nAïcha achète 2 ananas et une salade à 2 €.\na) Combien d'euros paie-t-elle ?\nb) Elle donne 20 €. Combien d'euros lui rend-on ?",
          correction:
            "a) 2 ananas à 3 € : $3 + 3 = 6$ €.\nJ'ajoute la salade : $6 + 2 = 8$ €.\nb) On rend $20 - 8 = 12$ €.\nJe vérifie : $8 + 12 = 20$.\n⛔ Le piège : compter un seul ananas. Elle en achète 2.\nRéponse : a) 8 ; b) 12.",
          micros: ["ce1_monnaie_probleme", "ce1_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: "12" },
          ],
        },
        {
          titre: "Le défi du magasin de jouets",
          enonce: "Inès a 10 €. Elle veut dépenser tout juste 10 € pour 2 jouets.\nA) livre 6 € B) crayons 3 € C) ballon 5 € D) puzzle 4 €\nQuels jouets choisit-elle ? Écris les deux lettres séparées par « ; ».",
          correction:
            "Je cherche deux prix qui font 10 ensemble.\nLivre + crayons : $6 + 3 = 9$. Non.\nLivre + puzzle : $6 + 4 = 10$. Oui !\nBallon + puzzle : $5 + 4 = 9$. Non.\nBallon + crayons : $5 + 3 = 8$. Non.\nElle choisit le livre et le puzzle : A et D.\n⛔ Le piège : prendre le premier jouet, puis n'importe lequel. Je teste les paires une par une.\nRéponse : A ; D.",
          micros: ["ce1_monnaie_defi", "ce1_monnaie_comparer_ensembles"],
          reponses: [{ attendu: ["A ; D", "A et D", "D ; A"] }],
        },
      ],
    },
  ],
};
