// ─── Fiche d'exercices : la monnaie et l'écriture à virgule (CE2) — 20 exercices ─
//
// 17/11/2026 : la feuille interactive de la notion `monnaie` du coach CE2
// (« Monnaie et écriture à virgule », 6 micros). Sur la forme de
// `maths-cm1-masse.tsx` et de `maths-ce1-monnaie.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/monnaie.bank.ts`).
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : euros et centimes, 1 € = 100 c,
// l'écriture à virgule (DEUX chiffres après la virgule), additionner,
// soustraire, rendre la monnaie. La virgule n'est au programme QUE pour la
// monnaie : aucune autre grandeur à virgule sur cette feuille.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, oui ou non, un nombre.
// ⛔ 8 ans : phrases de 18 mots au plus, une idée par phrase.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE : l'énoncé IMPOSE l'unité (« en euros,
// avec une virgule », « en centimes ») et l'élève écrit le nombre seul. 4,05
// se tape avec la virgule ; 12,5 et 12,50 valent la même chose.
//
// Les pièges nommés : 7,5 pour 7 € 5 c (1), 0,85 € = 85 € (2), compter les
// pièces au lieu de leur valeur (3, 12), 3,70 sans aligner (4), rendre le prix
// (5), 5,90 < 5,19 parce que 19 > 9 (6), payer trop (7), 250 c = 25 € (8),
// 9,130 € (9), le complément sans passer par l'euro (10), une pièce de 80 c
// (11), 7,95 en oubliant le pain (13), 3,50 + 2,50 = 5,100 (14), « j'ai 5 €,
// donc assez » (15), une pièce de 40 c (16), oublier un ticket (17), oublier
// le 2e ananas (18), 2 € = 20 c (19), compter les pièces de la tirelire (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : papeterie (4), boulangerie (5, 16),
// cinéma (9), librairie (10, 19), marché (13, 18), vacances (14), glacier
// (15), kermesse (17), tirelire (20), bus (11), jeux (7).
// Les métiers : boulangère (5, 16), libraire (10), glacier (15).
// UN SEUL contexte réunionnais (18, le marché de Saint-Paul, prix INVENTÉS).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · les pièces en euros : 1, 2, 5, 10, 20, 50 centimes, 1 € et 2 € ; les
//     billets : 5, 10, 20, 50, 100, 200 € ; il n'existe NI pièce de 40 c NI
//     pièce de 80 c (Banque centrale européenne, « Billets et pièces en
//     euros »). 1 € = 100 centimes.
//   · ex. 18 — le marché forain de Saint-Paul (La Réunion) se tient au bord de
//     la mer (Ville de Saint-Paul) ; tous les prix sont INVENTÉS.
// Tous les autres prix sont des MODÈLES.
//
// ⭐ LES DESSINS : pièces et billets (`tas`, repris de la feuille CE1),
// étiquettes de prix (`etiquettes`). Le dessin n'additionne jamais : la somme
// cherchée n'est jamais écrite.
//
// Micro-compétences : ce2_monnaie_ecriture_virgule (1, 2, 3, 6, 8, 12, 14),
// ce2_monnaie_constituer (3, 7, 11, 12, 16, 19), ce2_monnaie_additionner (4,
// 9, 13, 14, 15, 18), ce2_monnaie_rendre (5, 10, 16, 17, 18, 20),
// ce2_monnaie_probleme (15, 17, 18, 20), ce2_monnaie_defi (19, 20). 6/6.

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
  // Centimes : cuivre (1, 2, 5 c) ou or (10, 20, 50 c). Euros : bicolores.
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
const monnaie = (pieces: string[], nom?: string) => {
  const places: { t: string; x: number; y: number }[] = [];
  let [x, y] = [4, nom ? 22 : 4];
  for (const t of pieces) {
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

const tas = (pieces: string[], nom?: string) => <div className="mx-auto w-full max-w-[22rem] print:max-w-[16rem]">{monnaie(pieces, nom)}</div>;

/** Des étiquettes de prix (un objet, un prix), deux par ligne. Texte NU. */
const etiquettes = (liste: { nom: string; prix: string }[]) => {
  const [w, h] = [150, 58];
  const lignes = Math.ceil(liste.length / 2);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 310 ${lignes * (h + 8) + 4}`} className="block h-auto w-full" role="img" aria-label="Étiquettes de prix">
        {liste.map((e, k) => {
          const x = 4 + (k % 2) * (w + 6);
          const y = 4 + Math.floor(k / 2) * (h + 8);
          return (
            <g key={k}>
              <path d={`M ${x + 14} ${y} H ${x + w} V ${y + h} H ${x + 14} L ${x} ${y + h / 2} Z`} fill="#fef3c7" stroke="#b45309" strokeWidth={1.6} />
              <circle cx={x + 16} cy={y + h / 2} r={4} fill="#ffffff" stroke="#b45309" strokeWidth={1.2} />
              <text x={x + 28} y={y + 23} fontSize="14" fontWeight="700" fill={NOIR}>
                {e.nom}
              </text>
              <text x={x + 28} y={y + 46} fontSize="17" fontWeight="900" fill="#b45309">
                {e.prix}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesMonnaieCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "monnaie",
  titre: "La monnaie et l'écriture à virgule",
  accroche:
    "Vingt exercices, du plus simple au problème. Écrire un prix avec une virgule : 4,05 €. 1 € = 100 centimes. Compter des pièces et des billets. Additionner des prix, rendre la monnaie. Une boulangerie, un cinéma, une librairie, un marché, une kermesse et une tirelire. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, ou la lettre.",
      rappel: [
        "1 € = 100 centimes. Avant la virgule : les euros. Après la virgule : les centimes.",
        "Après la virgule, il y a TOUJOURS deux chiffres : 7 € et 5 c s'écrit 7,05 €.",
        "Je compte la VALEUR des pièces, pas le nombre de pièces.",
      ],
      exercices: [
        {
          enonce: "Écris en euros, avec une virgule.\na) 3 euros et 45 centimes\nb) 7 euros et 5 centimes\nc) 12 euros et 50 centimes",
          correction:
            "J'écris les euros, puis la virgule, puis les centimes sur deux chiffres.\na) 3 € et 45 c : 3,45 €.\nb) 7 € et 5 c. Les centimes doivent tenir sur deux chiffres : 05. J'écris 7,05 €.\nc) 12 € et 50 c : 12,50 €.\n⛔ Le piège du b) : écrire 7,5 €. Mais 7,5 €, c'est 7,50 €, donc 7 € et 50 c.\nRéponse : a) 3,45 ; b) 7,05 ; c) 12,50.",
          micros: ["ce2_monnaie_ecriture_virgule"],
          reponses: [
            { question: "a)", attendu: "3,45" },
            { question: "b)", attendu: "7,05" },
            { question: "c)", attendu: ["12,50", "12,5"] },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 4,30 €, c'est 4 euros et … centimes.\nb) 0,85 €, c'est … centimes.\nc) 1 € = … centimes",
          correction:
            "Je lis les deux chiffres après la virgule : ce sont les centimes.\na) 4,30 € : 4 € et 30 c.\nb) 0,85 € : 0 € et 85 c. C'est 85 centimes.\nc) 1 € = 100 centimes.\n⛔ Le piège du b) : lire 85 €. Le 0 devant la virgule dit : zéro euro.\nRéponse : a) 30 ; b) 85 ; c) 100.",
          micros: ["ce2_monnaie_ecriture_virgule"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "85" },
            { question: "c)", attendu: "100" },
          ],
        },
        {
          enonce: "Combien d'argent y a-t-il ?\nÉcris en euros, avec une virgule.",
          figure: tas(["2 €", "1 €", "50 c", "20 c", "5 c"]),
          correction:
            "Je compte d'abord les euros, puis les centimes.\nLes euros : $2 + 1 = 3$ €.\nLes centimes : $50 + 20 + 5 = 75$ c.\nEn tout : 3 € et 75 c, soit 3,75 €.\n⛔ Le piège : compter les pièces, et dire 5. Il y a 5 pièces, mais elles valent 3,75 €.\nRéponse : 3,75.",
          micros: ["ce2_monnaie_constituer", "ce2_monnaie_ecriture_virgule"],
          reponses: [{ attendu: "3,75" }],
        },
        {
          enonce: "À la papeterie, un cahier coûte 2,40 €. Un stylo coûte 1,30 €.\nCombien coûtent-ils ensemble ? Écris en euros, avec une virgule.",
          figure: etiquettes([
            { nom: "cahier", prix: "2,40 €" },
            { nom: "stylo", prix: "1,30 €" },
          ]),
          correction:
            "J'additionne les euros, puis les centimes.\nLes euros : $2 + 1 = 3$ €.\nLes centimes : $40 + 30 = 70$ c.\nEnsemble : $2{,}40 + 1{,}30 = 3{,}70$ €.\n⛔ Le piège : poser l'opération sans aligner les virgules. Euros sous euros, centimes sous centimes.\nRéponse : 3,70.",
          micros: ["ce2_monnaie_additionner"],
          reponses: [{ attendu: ["3,70", "3,7"] }],
        },
        {
          enonce: "J'achète un croissant à 1,20 €. Je paie avec une pièce de 2 €.\nCombien la boulangère me rend-elle ? Écris en centimes.",
          figure: etiquettes([{ nom: "croissant", prix: "1,20 €" }]),
          correction:
            "Rendre la monnaie, c'est ce que je donne moins le prix.\nJe compte de 1,20 € jusqu'à 2 €.\nDe 1,20 € à 2 €, il manque 80 c, car $20 + 80 = 100$.\nLa boulangère me rend 80 centimes.\n⛔ Le piège : répondre 120, le prix. On rend la différence, pas le prix.\nRéponse : 80.",
          micros: ["ce2_monnaie_rendre"],
          reponses: [{ attendu: "80" }],
        },
        {
          enonce: "Quel est le prix le plus grand ? Écris la lettre.\nA) 5,09 € B) 5,90 € C) 5,19 €",
          correction:
            "Les trois prix ont 5 euros. Je compare les centimes.\nA) 5,09 € : 9 c. B) 5,90 € : 90 c. C) 5,19 € : 19 c.\n90 c est le plus grand. Réponse B.\n⛔ Le piège : choisir 5,19 €, parce que 19 est plus grand que 9. Mais 5,90 €, c'est 90 centimes.\nRéponse : B.",
          micros: ["ce2_monnaie_ecriture_virgule"],
          reponses: [{ attendu: "B" }],
        },
        {
          enonce: "Un jeu de cartes coûte 6,50 €. Quelles pièces donnent juste le prix ?\nA) 5 € + 50 c B) 2 € + 2 € + 50 c C) 5 € + 1 € + 50 c",
          correction:
            "Je calcule chaque choix.\nA) 5 € + 50 c = 5,50 €. Il manque 1 €.\nB) $2 + 2 = 4$ €, + 50 c = 4,50 €. Pas assez.\nC) $5 + 1 = 6$ €, + 50 c = 6,50 €. C'est juste. Réponse C.\n⛔ Le piège : choisir A, parce qu'il y a un 5 et un 50. Je vérifie la somme.\nRéponse : C.",
          micros: ["ce2_monnaie_constituer"],
          reponses: [{ attendu: "C" }],
        },
        {
          enonce: "Complète.\na) 250 centimes = … € (écris avec une virgule)\nb) 3 € = … centimes",
          correction:
            "1 € = 100 centimes.\na) 250 c = 200 c + 50 c. 200 c, c'est 2 €. Donc 250 c = 2,50 €.\nb) 3 € = 100 c + 100 c + 100 c = 300 c.\n⛔ Le piège du a) : écrire 25 €. 250 centimes, c'est bien moins que 25 €.\nRéponse : a) 2,50 ; b) 300.",
          micros: ["ce2_monnaie_ecriture_virgule"],
          reponses: [
            { question: "a)", attendu: ["2,50", "2,5"] },
            { question: "b)", attendu: "300" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mets euros avec euros, centimes avec centimes.",
      rappel: [
        "100 centimes font 1 euro : 50 c + 80 c = 130 c = 1,30 €.",
        "Pour rendre la monnaie, je complète : du prix jusqu'à l'euro rond, puis jusqu'au billet.",
        "Il n'y a pas de pièce de 40 c ni de 80 c.",
      ],
      exercices: [
        {
          enonce: "Au cinéma, un ticket coûte 6,50 €. Un pop-corn coûte 3,80 €.\nCombien en tout ? Écris en euros, avec une virgule.",
          figure: etiquettes([
            { nom: "ticket", prix: "6,50 €" },
            { nom: "pop-corn", prix: "3,80 €" },
          ]),
          correction:
            "J'additionne les euros : $6 + 3 = 9$ €.\nJ'additionne les centimes : $50 + 80 = 130$ c.\n130 c, c'est 100 c + 30 c, donc 1 € et 30 c.\nEn tout : 9 € + 1,30 € = 10,30 €.\n⛔ Le piège : écrire 9,130 €. Cent centimes se changent en un euro.\nRéponse : 10,30.",
          micros: ["ce2_monnaie_additionner"],
          reponses: [{ attendu: ["10,30", "10,3"] }],
        },
        {
          enonce: "À la librairie, Tom achète un livre à 7,35 €.\nIl paie avec un billet de 10 €.\nCombien le libraire lui rend-il ? Écris en euros, avec une virgule.",
          correction:
            "Je complète, par étapes, de 7,35 € jusqu'à 10 €.\nDe 7,35 € à 7,40 € : 5 c.\nDe 7,40 € à 8 € : 60 c.\nDe 8 € à 10 € : 2 €.\nJ'additionne : 2 € + 60 c + 5 c = 2,65 €.\n⛔ Le piège : faire 10 − 7 = 3 et oublier les centimes. Je rends moins de 3 €.\nRéponse : 2,65.",
          micros: ["ce2_monnaie_rendre"],
          reponses: [{ attendu: "2,65" }],
        },
        {
          enonce: "Pour le bus, Lou doit faire 1,80 € avec le moins de pièces possible.\nCombien de pièces lui faut-il ?",
          correction:
            "Je prends à chaque fois la plus grosse pièce qui ne dépasse pas.\n1 € : il reste 80 c.\n50 c : il reste 30 c.\n20 c : il reste 10 c.\n10 c : il reste 0.\n1 € + 50 c + 20 c + 10 c = 1,80 €. Cela fait 4 pièces.\n⛔ Le piège : chercher une pièce de 80 c. Elle n'existe pas.\nRéponse : 4.",
          micros: ["ce2_monnaie_constituer"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Combien d'argent y a-t-il dans ce porte-monnaie ?\nÉcris en euros, avec une virgule.",
          figure: tas(["10 €", "5 €", "2 €", "2 €", "50 c", "50 c", "20 c", "10 c", "2 c"]),
          correction:
            "Les euros : $10 + 5 + 2 + 2 = 19$ €.\nLes centimes : $50 + 50 + 20 + 10 + 2 = 132$ c.\n132 c, c'est 100 c + 32 c, donc 1,32 €.\nEn tout : 19 € + 1,32 € = 20,32 €.\n⛔ Le piège : écrire 19,132 €. Après la virgule, il n'y a que deux chiffres.\nRéponse : 20,32.",
          micros: ["ce2_monnaie_constituer", "ce2_monnaie_ecriture_virgule"],
          reponses: [{ attendu: "20,32" }],
        },
        {
          enonce: "Au marché, j'achète des tomates, du pain et du fromage.\nCombien je paie en tout ? Écris en euros, avec une virgule.",
          figure: etiquettes([
            { nom: "tomates", prix: "2,35 €" },
            { nom: "pain", prix: "1,10 €" },
            { nom: "fromage", prix: "4,50 €" },
          ]),
          correction:
            "J'additionne deux prix, puis le troisième.\nTomates et pain : $2{,}35 + 1{,}10 = 3{,}45$ €.\nPuis le fromage : $3{,}45 + 4{,}50 = 7{,}95$ €.\nVérification : euros $2 + 1 + 4 = 7$ ; centimes $35 + 10 + 50 = 95$.\n⛔ Le piège : oublier un des trois achats.\nRéponse : 7,95.",
          micros: ["ce2_monnaie_additionner"],
          reponses: [{ attendu: "7,95" }],
        },
        {
          enonce: "Vrai ou faux ?\na) 4,5 € = 4 € et 50 c.\nb) 4,05 € = 4 € et 5 c.\nc) 3,50 € + 2,50 € = 5,100 €.",
          correction:
            "a) 4,5 €, c'est 4,50 € : 4 € et 50 c. Vrai.\nb) 4,05 € : 4 € et 05 c, soit 5 c. Vrai.\nc) $50 + 50 = 100$ c = 1 €. Donc $3 + 2 + 1 = 6$ € : 6,00 €. Faux.\n⛔ Le piège du c) : écrire 5,100 €. Cent centimes font un euro.\nRéponse : a) vrai ; b) vrai ; c) faux.",
          micros: ["ce2_monnaie_ecriture_virgule", "ce2_monnaie_additionner"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "Chez le glacier, Lina a 5 €. Elle veut une glace à 2,80 € et un jus à 2,40 €.\na) A-t-elle assez ? Réponds oui ou non.\nb) Combien lui manque-t-il ? Écris en centimes.",
          figure: etiquettes([
            { nom: "glace", prix: "2,80 €" },
            { nom: "jus", prix: "2,40 €" },
          ]),
          correction:
            "a) J'additionne : euros $2 + 2 = 4$ ; centimes $80 + 40 = 120$ c = 1,20 €.\n4 € + 1,20 € = 5,20 €. C'est plus que 5 €. Non, elle n'a pas assez.\nb) De 5 € à 5,20 €, il manque 20 c.\n⛔ Le piège : dire oui, parce que chaque prix est plus petit que 5 €. Je dois additionner les deux.\nRéponse : a) non ; b) 20.",
          micros: ["ce2_monnaie_probleme", "ce2_monnaie_additionner"],
          reponses: [
            { question: "a)", attendu: ["non"] },
            { question: "b)", attendu: "20" },
          ],
        },
        {
          enonce: "La boulangère doit rendre 3,40 €. Quelle monnaie convient ? Écris la lettre.\nA) 1 € + 1 € + 20 c + 20 c\nB) 2 € + 1 € + 20 c + 20 c\nC) 2 € + 2 € + 20 c + 20 c",
          correction:
            "Les trois choix ont 20 c + 20 c = 40 c. Je regarde les euros.\nA) $1 + 1 = 2$ € : 2,40 €. Pas assez.\nB) $2 + 1 = 3$ € : 3,40 €. C'est juste. Réponse B.\nC) $2 + 2 = 4$ € : 4,40 €. Trop.\n⛔ Le piège : chercher une pièce de 40 c. Elle n'existe pas : on donne deux pièces de 20 c.\nRéponse : B.",
          micros: ["ce2_monnaie_rendre", "ce2_monnaie_constituer"],
          reponses: [{ attendu: "B" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je calcule ce qu'on paie, puis ce qui reste.",
      rappel: [
        "D'abord ce que je paie en tout, ensuite ce qu'on me rend.",
        "Je peux tout changer en centimes : 2 € = 200 c.",
        "Je vérifie que ma réponse a du sens : on ne rend jamais plus que ce qu'on donne.",
      ],
      exercices: [
        {
          titre: "Les tickets de la kermesse",
          enonce: "À la kermesse, Zoé a 10 €. Elle achète 3 tickets de manège à 1,50 € chacun.\na) Combien coûtent les 3 tickets ? Écris en euros.\nb) Combien lui reste-t-il ? Écris en euros.",
          correction:
            "a) J'additionne trois fois le prix d'un ticket.\n$1{,}50 + 1{,}50 = 3{,}00$ €. Puis $3{,}00 + 1{,}50 = 4{,}50$ €.\nb) Je complète de 4,50 € jusqu'à 10 €.\nDe 4,50 € à 5 € : 50 c. De 5 € à 10 € : 5 €.\nIl lui reste 5,50 €.\n⛔ Le piège du a) : compter un seul ticket. Elle en achète 3.\nRéponse : a) 4,50 ; b) 5,50.",
          micros: ["ce2_monnaie_probleme", "ce2_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: ["4,50", "4,5"] },
            { question: "b)", attendu: ["5,50", "5,5"] },
          ],
        },
        {
          titre: "Le marché de Saint-Paul",
          enonce: "Au marché de Saint-Paul, Maman achète 2 ananas et des letchis. Elle paie avec 10 €.\na) Combien paie-t-elle ? Écris en euros.\nb) Combien lui rend-on ? Écris en euros.",
          figure: etiquettes([
            { nom: "1 ananas", prix: "2,50 €" },
            { nom: "letchis", prix: "3,20 €" },
          ]),
          correction:
            "a) Deux ananas : $2{,}50 + 2{,}50 = 5{,}00$ €.\nAvec les letchis : $5{,}00 + 3{,}20 = 8{,}20$ €.\nb) Je complète de 8,20 € jusqu'à 10 €.\nDe 8,20 € à 9 € : 80 c. De 9 € à 10 € : 1 €.\nOn lui rend 1,80 €.\n⛔ Le piège du a) : compter un seul ananas. L'étiquette donne le prix de 1 ananas.\nRéponse : a) 8,20 ; b) 1,80.",
          micros: ["ce2_monnaie_probleme", "ce2_monnaie_additionner", "ce2_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: ["8,20", "8,2"] },
            { question: "b)", attendu: ["1,80", "1,8"] },
          ],
        },
        {
          titre: "Les pièces de 20 centimes",
          enonce: "Sacha n'a que des pièces de 20 c.\na) Pour payer un livre à 2 €, combien de pièces lui faut-il ?\nb) Pour une BD à 3,60 €, combien de pièces ?",
          correction:
            "Je change les euros en centimes.\na) 2 € = 200 c. Combien de fois 20 dans 200 ?\n$10 \\times 20 = 200$. Il faut 10 pièces.\nb) 3,60 € = 360 c. $18 \\times 20 = 360$, car $10 \\times 20 = 200$ et $8 \\times 20 = 160$.\nIl faut 18 pièces.\n⛔ Le piège du a) : croire que 2 € = 20 c, et répondre 1. Un euro, c'est 100 centimes.\nRéponse : a) 10 ; b) 18.",
          micros: ["ce2_monnaie_defi", "ce2_monnaie_constituer"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: "18" },
          ],
        },
        {
          titre: "La tirelire",
          enonce: "Voici la tirelire de Malo : 3 pièces de 2 €, 4 de 50 c, 5 de 10 c.\na) Combien d'argent a-t-il ? Écris en euros.\nb) Il veut un jeu à 9 €. Combien lui manque-t-il ? Écris en euros.",
          figure: tas(["2 €", "2 €", "2 €", "50 c", "50 c", "50 c", "50 c", "10 c", "10 c", "10 c", "10 c", "10 c"]),
          correction:
            "a) Les pièces de 2 € : $2 + 2 + 2 = 6$ €.\nLes pièces de 50 c : $50 + 50 + 50 + 50 = 200$ c = 2 €.\nLes pièces de 10 c : $10 + 10 + 10 + 10 + 10 = 50$ c.\nEn tout : 6 € + 2 € + 50 c = 8,50 €.\nb) De 8,50 € à 9 €, il manque 50 c, soit 0,50 €.\n⛔ Le piège du a) : compter les pièces, et dire 12. Je compte leur valeur.\nRéponse : a) 8,50 ; b) 0,50.",
          micros: ["ce2_monnaie_defi", "ce2_monnaie_probleme", "ce2_monnaie_rendre"],
          reponses: [
            { question: "a)", attendu: ["8,50", "8,5"] },
            { question: "b)", attendu: ["0,50", "0,5"] },
          ],
        },
      ],
    },
  ],
};
