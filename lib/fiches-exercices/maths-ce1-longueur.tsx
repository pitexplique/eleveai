// ─── Fiche d'exercices : les longueurs (CE1) — 20 exercices corrigés ──────────
//
// 17/11/2026 : la feuille interactive de la notion `longueur` du coach CE1
// (9 micros). Sur la forme de `maths-cm1-longueur.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/longueur.bank.ts`).
// ⛔ LIMITES DU CE1 : trois unités, le mètre, le centimètre et le kilomètre
// (pas de dm ni de mm, même dans un piège) ; 1 m = 100 cm, 1 km = 1 000 m ;
// pas de virgule (« 1 m 20 cm », jamais « 1,20 m ») ; nombres dans le millier.
// ⛔ Aucune question à rédiger, ni « trace » : « où s'arrête-t-il ? », un
// QCM, un nombre, une unité.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE : l'énoncé IMPOSE l'unité (« en
// centimètres ») et l'élève écrit le nombre seul. Les QCM par la LETTRE. Un
// rangement par lettres séparées par « ; ».
//
// Les pièges nommés : partir du 1 au lieu du 0 (1), 1 m = 10 cm (2), le
// trajet en cm (3), lire le nombre d'arrivée (4, 11), comparer 1 et 90 (5,
// 10), un doigt de 1 m (6), compter les traits au lieu des centimètres (7),
// un crayon de 18 m (8), 1 m 5 cm = 15 cm (9), retirer 35 de 1 (12), 140 cm
// plus court que 1 m 30 (13), 1 000 m = 10 km (14), un enfant de 12 m (15), la
// règle cassée lue depuis 0 (16), oublier la moitié plantée (17), un tour
// compté pour 100 m (18), le reste oublié (19), le chemin le plus court pris
// au hasard (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1, 4, 7), bricolage (16, 19),
// couture (12), sport (13, saut ; 18, piste), randonnée (14), jardin (17),
// ville (20), transports (8, bus). Les métiers : couturière (12), jardinier
// (17), entraîneuse (18), menuisier (19).
// UN SEUL contexte réunionnais (14, un sentier vers une cascade, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 8 — un autobus « standard » mesure environ 12 m de long (directive
//     96/53/CE : 12 m de longueur maximale pour un bus à deux essieux).
//   · ex. 15 — un terrain de football mesure de 90 à 120 m de long (Lois du
//     jeu de l'IFAB, loi 1) : « environ 100 m » reste une estimation.
//   · ex. 18 — un tour de piste d'athlétisme mesure 400 m (World Athletics,
//     règle 2 « La piste », couloir 1).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : une règle graduée en centimètres seulement (`regle`), les
// objets posés au-dessus ; une règle cassée qui commence au 4 (ex. 16).
//
// Micro-compétences : ce1_longueur_unites (2, 3, 14), ce1_longueur_mesurer_cm_m
// (1, 4, 11), ce1_longueur_choisir_unite (3), ce1_longueur_convertir_simple
// (2, 9, 10, 13, 14), ce1_longueur_comparer (5, 10, 11, 13, 20),
// ce1_longueur_references (6, 15), ce1_longueur_estimer (8, 15),
// ce1_longueur_tracer (7, 16), ce1_longueur_defi (12, 17, 18, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const VERT = "#16a34a";

/**
 * Une règle graduée en centimètres, de `debut` à `fin` (traits des cm et des
 * demi-cm, pas de mm au CE1), avec des objets posés au-dessus : une barre de
 * `de` à `a` (en cm), son nom à droite, des pointillés jusqu'à la règle.
 * `cassee` : le bout gauche est dentelé (la règle commence au `debut`).
 */
const regle = (objets: { de: number; a: number; label: string; couleur: string }[], fin = 12, debut = 0, cassee = false) => {
  const [x0, pas] = [18, 25];
  const x = (cm: number) => x0 + (cm - debut) * pas;
  const hautObjets = objets.length * 26 + 8;
  const yR = hautObjets + 4;
  const H = yR + 46;
  const W = x(fin) + 64;
  const traits = [];
  for (let d = debut * 2; d <= fin * 2; d++) {
    const long = d % 2 === 0 ? 16 : 9;
    traits.push(<line key={d} x1={x(d / 2)} y1={yR} x2={x(d / 2)} y2={yR + long} stroke={NOIR} strokeWidth={d % 2 === 0 ? 1.5 : 0.8} />);
  }
  const bord = cassee
    ? `M ${x0 - 6} ${yR} L ${x0 - 12} ${yR + 8} L ${x0 - 4} ${yR + 16} L ${x0 - 12} ${yR + 24} L ${x0 - 4} ${yR + 32} L ${x0 - 8} ${yR + 40}`
    : null;
  return (
    <div className="mx-auto w-full max-w-[26rem] print:max-w-[18rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Règle graduée en centimètres">
        <rect x={x0 - 8} y={yR} width={x(fin) - x0 + 16} height={40} fill="#fef9c3" stroke={NOIR} strokeWidth={1.2} rx={cassee ? 0 : 3} />
        {bord ? <path d={bord} fill="#ffffff" stroke={NOIR} strokeWidth={1.4} /> : null}
        {traits}
        {Array.from({ length: fin - debut + 1 }, (_, k) => (
          <text key={k} x={x(debut + k)} y={yR + 32} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {debut + k}
          </text>
        ))}
        <text x={x(fin) + 12} y={yR + 32} fontSize="12" fill={NOIR}>
          cm
        </text>
        {objets.map((o, i) => {
          const y = 6 + i * 26;
          return (
            <g key={i}>
              <rect x={x(o.de)} y={y} width={x(o.a) - x(o.de)} height={14} rx={4} fill={o.couleur} />
              <line x1={x(o.de)} y1={y + 14} x2={x(o.de)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={x(o.a)} y1={y + 14} x2={x(o.a)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
              <text x={x(o.a) + 5} y={y + 12} fontSize="13" fontWeight="700" fill={NOIR}>
                {o.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesLongueurCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du plus simple au problème. Mesurer avec une règle. Choisir entre le centimètre, le mètre et le kilomètre. Savoir que 1 m, c'est 100 cm. Comparer, estimer, calculer une longueur. Une trousse, un ruban, un saut, un sentier, une piste et une étagère. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, ou la lettre.",
      rappel: [
        "Pour mesurer, je pose le 0 de la règle au bout de l'objet.",
        "1 m = 100 cm. 1 km = 1 000 m.",
        "Le cm pour le petit, le m pour la classe, le km pour la route.",
      ],
      exercices: [
        {
          enonce: "Mesure avec la règle. Écris le nombre de centimètres.\na) Le crayon\nb) La gomme",
          figure: regle(
            [
              { de: 0, a: 7, label: "crayon", couleur: BLEU },
              { de: 0, a: 3, label: "gomme", couleur: ORANGE },
            ],
            10,
          ),
          correction:
            "Les deux objets commencent au 0 de la règle.\na) Le bout du crayon est en face du 7. Le crayon mesure 7 cm.\nb) Le bout de la gomme est en face du 3. La gomme mesure 3 cm.\n⛔ Le piège : poser l'objet au bord de la règle, avant le 0. On part toujours du 0.\nRéponse : a) 7 ; b) 3.",
          micros: ["ce1_longueur_mesurer_cm_m"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 m = … cm\nb) 1 km = … m\nc) 100 cm = … m",
          correction:
            "J'utilise le rappel.\na) 1 m, c'est 100 cm.\nb) 1 km, c'est $1\\,000$ m.\nc) 100 cm, c'est 1 m.\n⛔ Le piège : écrire 1 m = 10 cm. Un mètre, c'est grand : 100 petits centimètres.\nRéponse : a) 100 ; b) $1\\,000$ ; c) 1.",
          micros: ["ce1_longueur_unites", "ce1_longueur_convertir_simple"],
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "1000" },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Quelle unité choisir : cm, m ou km ?\na) La longueur d'une gomme\nb) La longueur de la cour\nc) La route jusqu'à la ville voisine",
          correction:
            "Je pense à la taille de chaque chose.\na) Une gomme est petite, plus petite que ma main : cm.\nb) La cour se mesure en grands pas : m.\nc) La route est très longue. On y va en voiture : km.\n⛔ Le piège : mesurer la route en cm. Il faudrait un nombre énorme.\nRéponse : a) cm ; b) m ; c) km.",
          micros: ["ce1_longueur_choisir_unite", "ce1_longueur_unites"],
          reponses: [
            { question: "a)", attendu: ["cm", "centimètre", "centimètres"], exact: true },
            { question: "b)", attendu: ["m", "mètre", "mètres"], exact: true },
            { question: "c)", attendu: ["km", "kilomètre", "kilomètres"], exact: true },
          ],
        },
        {
          enonce: "La clé ne commence pas au 0.\nCombien mesure la clé, en centimètres ?",
          figure: regle([{ de: 2, a: 8, label: "clé", couleur: VERT }], 10),
          correction:
            "La clé va du 2 au 8.\nJe compte les centimètres entre les deux : de 2 à 8.\n$8 - 2 = 6$ cm.\nJe vérifie en comptant les bonds : 3, 4, 5, 6, 7, 8. Six bonds.\n⛔ Le piège : lire 8, le nombre du bout. La clé ne part pas du 0.\nRéponse : 6.",
          micros: ["ce1_longueur_mesurer_cm_m"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 1 m … 90 cm\nb) 100 cm … 1 m\nc) 50 cm … 1 m\nd) 1 km … 900 m",
          correction:
            "J'écris les deux longueurs dans la même unité.\na) 1 m = 100 cm. 100 est plus que 90. Donc 1 m > 90 cm.\nb) 1 m = 100 cm. C'est pareil : 100 cm = 1 m.\nc) 1 m = 100 cm. 50 est moins que 100. Donc 50 cm < 1 m.\nd) 1 km = $1\\,000$ m. $1\\,000$ est plus que 900. Donc 1 km > 900 m.\n⛔ Le piège : comparer 1 et 90 sans les unités. 90 cm est plus court que 1 m.\nRéponse : a) > ; b) = ; c) < ; d) >.",
          micros: ["ce1_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) La largeur d'un doigt : A) 1 cm B) 1 m C) 1 km\nb) Un grand pas d'adulte : A) 1 cm B) 1 m C) 1 km",
          correction:
            "J'utilise mes repères.\na) Un doigt est tout fin : environ 1 cm. Réponse A.\nb) Un grand pas d'adulte fait environ 1 m. Réponse B.\n⛔ Le piège : croire qu'un doigt fait 1 m. 1 m, c'est la hauteur d'une table de cuisine environ.\nRéponse : a) A ; b) B.",
          micros: ["ce1_longueur_references"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 1 cm"] },
            { question: "b)", attendu: ["B", "B) 1 m"] },
          ],
        },
        {
          enonce: "On trace des segments avec la règle.\na) Lina part du 0 pour tracer 5 cm. À quel nombre s'arrête-t-elle ?\nb) Tom part du 3 pour tracer 4 cm. À quel nombre s'arrête-t-il ?",
          figure: regle([], 10),
          correction:
            "Je pars du bon nombre, et j'avance de la longueur demandée.\na) Je pars du 0 et j'avance de 5 : $0 + 5 = 5$. Elle s'arrête au 5.\nb) Je pars du 3 et j'avance de 4 : $3 + 4 = 7$. Il s'arrête au 7.\n⛔ Le piège du b) : s'arrêter au 4. Tom ne part pas du 0.\nRéponse : a) 5 ; b) 7.",
          micros: ["ce1_longueur_tracer"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Un crayon neuf : A) 18 m B) 18 cm C) 18 km\nb) Un bus : A) 12 cm B) 12 km C) 12 m",
          correction:
            "J'imagine l'objet à côté de ma règle de 20 cm.\na) Un crayon neuf est presque aussi long que ma règle : 18 cm. Réponse B.\nb) Un bus est bien plus long qu'une voiture. Il mesure environ 12 m. Réponse C.\n⛔ Le piège : garder le bon nombre avec la mauvaise unité. Un crayon de 18 m serait plus grand qu'une maison !\nRéponse : a) B ; b) C.",
          micros: ["ce1_longueur_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 18 cm"] },
            { question: "b)", attendu: ["C", "C) 12 m"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mets tout dans la même unité avant de calculer.",
      rappel: [
        "1 m = 100 cm. Donc 1 m 20 cm = 100 cm + 20 cm = 120 cm.",
        "Pour comparer, j'écris les longueurs dans la même unité.",
        "Pour mesurer, je compte du début à la fin de l'objet.",
      ],
      exercices: [
        {
          enonce: "Écris en centimètres. Écris seulement le nombre.\na) 2 m = … cm\nb) 1 m 20 cm = … cm\nc) 1 m 5 cm = … cm",
          correction:
            "Je change les mètres en centimètres, puis j'ajoute le reste.\na) 1 m = 100 cm. 2 m = $100 + 100 = 200$ cm.\nb) $100 + 20 = 120$ cm.\nc) $100 + 5 = 105$ cm.\n⛔ Le piège du c) : coller 1 et 5 pour écrire 15 cm. 1 m, c'est déjà 100 cm.\nRéponse : a) 200 ; b) 120 ; c) 105.",
          micros: ["ce1_longueur_convertir_simple"],
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "105" },
          ],
        },
        {
          enonce: "Quatre rubans :\nA = 1 m ; B = 80 cm ; C = 120 cm ; D = 1 m 10 cm.\nRange-les du plus court au plus long.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les longueurs en centimètres.\nA = 1 m = 100 cm. B = 80 cm. C = 120 cm. D = $100 + 10 = 110$ cm.\nJe range : 80 < 100 < 110 < 120.\nDonc B, puis A, puis D, puis C.\n⛔ Le piège : mettre A en premier parce que « 1 » est petit. 1 m, c'est 100 cm.\nRéponse : B ; A ; D ; C.",
          micros: ["ce1_longueur_comparer", "ce1_longueur_convertir_simple"],
          reponses: [{ attendu: ["B ; A ; D ; C", "B < A < D < C", "B, A, D, C"], ordre: true }],
        },
        {
          enonce: "Mesure le pinceau et le feutre.\na) Quel objet est le plus long ?\nb) De combien de centimètres ?",
          figure: regle(
            [
              { de: 1, a: 9, label: "pinceau", couleur: BLEU },
              { de: 3, a: 10, label: "feutre", couleur: ORANGE },
            ],
            11,
          ),
          correction:
            "Aucun objet ne part du 0. Je compte du début à la fin.\nLe pinceau va du 1 au 9 : $9 - 1 = 8$ cm.\nLe feutre va du 3 au 10 : $10 - 3 = 7$ cm.\na) 8 cm est plus que 7 cm : le pinceau est le plus long.\nb) $8 - 7 = 1$ cm de plus.\n⛔ Le piège : choisir le feutre parce qu'il va jusqu'au 10. Il commence plus loin.\nRéponse : a) le pinceau ; b) 1.",
          micros: ["ce1_longueur_mesurer_cm_m", "ce1_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ["pinceau", "le pinceau"] },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "La couturière a un ruban de 1 m.\nElle coupe 35 cm pour une robe.\nCombien de centimètres de ruban reste-t-il ?",
          correction:
            "Je mets tout en centimètres : 1 m = 100 cm.\nJ'enlève ce qui est coupé : $100 - 35 = 65$ cm.\nJe vérifie : $65 + 35 = 100$.\n⛔ Le piège : calculer « 1 − 35 ». Je change d'abord 1 m en 100 cm.\nRéponse : 65.",
          micros: ["ce1_longueur_defi", "ce1_longueur_convertir_simple"],
          reponses: [{ attendu: "65" }],
        },
        {
          enonce: "Au saut en longueur, Léo saute 1 m 30 cm. Nina saute 140 cm.\na) Qui saute le plus loin ?\nb) De combien de centimètres ?",
          correction:
            "J'écris les deux sauts en centimètres.\nLéo : 1 m 30 cm = $100 + 30 = 130$ cm. Nina : 140 cm.\na) 140 est plus que 130 : Nina saute le plus loin.\nb) $140 - 130 = 10$ cm.\n⛔ Le piège : croire que Léo gagne parce qu'il a des « mètres ». Je compare tout en centimètres.\nRéponse : a) Nina ; b) 10.",
          micros: ["ce1_longueur_comparer", "ce1_longueur_convertir_simple"],
          reponses: [
            { question: "a)", attendu: ["Nina"] },
            { question: "b)", attendu: "10" },
          ],
        },
        {
          enonce: "Sur un sentier vers une cascade, Inaya marche 400 m. Puis elle marche 600 m.\na) Combien de mètres en tout ?\nb) Écris cette longueur en kilomètres.",
          correction:
            "a) J'additionne : $400 + 600 = 1\\,000$ m.\nb) $1\\,000$ m, c'est 1 km.\n⛔ Le piège du b) : écrire 10 km. 1 km, c'est $1\\,000$ m : ici, 1 km seulement.\nRéponse : a) $1\\,000$ ; b) 1.",
          micros: ["ce1_longueur_unites", "ce1_longueur_convertir_simple"],
          reponses: [
            { question: "a)", attendu: "1000" },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Un enfant de CE1 : A) 12 m B) 1 m 25 cm C) 25 cm\nb) Un terrain de football : A) 100 m B) 100 cm C) 100 km",
          correction:
            "J'utilise mes repères : un grand pas, c'est 1 m.\na) Un enfant de CE1 est un peu plus grand que 1 m : 1 m 25 cm. Réponse B.\nb) Un terrain de football, c'est environ 100 grands pas : 100 m. Réponse A.\n⛔ Le piège : choisir 12 m pour un enfant. 12 m, c'est la longueur d'un bus !\nRéponse : a) B ; b) A.",
          micros: ["ce1_longueur_references", "ce1_longueur_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 1 m 25 cm"] },
            { question: "b)", attendu: ["A", "A) 100 m"] },
          ],
        },
        {
          enonce: "La règle de Sami est cassée. Elle commence au 4.\nIl veut tracer 7 cm, en partant du 4.\nÀ quel nombre doit-il s'arrêter ?",
          figure: regle([], 14, 4, true),
          correction:
            "Sami ne part pas du 0, mais du 4.\nIl avance de 7 cm : $4 + 7 = 11$.\nJe vérifie en comptant les bonds : 5, 6, 7, 8, 9, 10, 11. Sept bonds.\n⛔ Le piège : s'arrêter au 7, comme si la règle commençait au 0.\nRéponse : 11.",
          micros: ["ce1_longueur_tracer"],
          reponses: [{ attendu: "11" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je choisis une unité et je calcule pas à pas.",
      rappel: [
        "Je mets toutes les longueurs dans la même unité.",
        "Ce qui reste : le tout moins ce qui est fait.",
        "À la fin, je relis la question : quelle unité ?",
      ],
      exercices: [
        {
          titre: "La haie du jardinier",
          enonce: "Le jardinier plante une haie de 3 m.\nIl a déjà planté 1 m 50 cm.\na) Combien de centimètres reste-t-il à planter ?\nb) Il met un arbuste tous les 50 cm, sur ce qui reste. Combien d'arbustes ?",
          correction:
            "Je mets tout en centimètres.\n3 m = 300 cm. 1 m 50 cm = $100 + 50 = 150$ cm.\na) $300 - 150 = 150$ cm.\nb) Dans 150 cm, je compte de 50 en 50 : 50, 100, 150. Cela fait 3 bonds.\nIl faut 3 arbustes.\n⛔ Le piège : calculer $3 - 1 = 2$ m et oublier les 50 cm.\nRéponse : a) 150 ; b) 3.",
          micros: ["ce1_longueur_defi", "ce1_longueur_convertir_simple"],
          reponses: [
            { question: "a)", attendu: "150" },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "La piste de l'entraîneuse",
          enonce: "Un tour de piste mesure 400 m.\nL'entraîneuse fait courir 2 tours à Zoé.\na) Combien de mètres Zoé a-t-elle couru ?\nb) Combien de mètres manque-t-il pour faire 1 km ?",
          correction:
            "a) 2 tours de 400 m : $400 + 400 = 800$ m.\nb) 1 km = $1\\,000$ m.\nCe qui manque : $1\\,000 - 800 = 200$ m.\n⛔ Le piège : croire qu'un tour fait 1 km. Il faut plus de 2 tours pour faire 1 km.\nRéponse : a) 800 ; b) 200.",
          micros: ["ce1_longueur_defi", "ce1_longueur_unites"],
          reponses: [
            { question: "a)", attendu: "800" },
            { question: "b)", attendu: "200" },
          ],
        },
        {
          titre: "L'étagère du menuisier",
          enonce: "Le menuisier a une planche de 1 m.\nIl coupe 3 étagères de 30 cm.\na) Combien de centimètres a-t-il coupés ?\nb) Combien de centimètres reste-t-il ?",
          correction:
            "Je mets tout en centimètres : 1 m = 100 cm.\na) 3 étagères de 30 cm : $30 + 30 + 30 = 90$ cm.\nb) $100 - 90 = 10$ cm.\n⛔ Le piège : s'arrêter au a). La question b) demande le morceau qui reste.\nRéponse : a) 90 ; b) 10.",
          micros: ["ce1_longueur_defi"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "10" },
          ],
        },
        {
          titre: "Le chemin de l'école",
          enonce: "Pour aller à l'école, Inès passe par la boulangerie.\nMaison → boulangerie : 300 m. Boulangerie → école : 450 m.\nLe chemin direct mesure 600 m.\na) Combien de mètres par la boulangerie ?\nb) Le chemin direct est plus court. De combien de mètres ?",
          correction:
            "a) J'additionne les deux morceaux : $300 + 450 = 750$ m.\nb) Je compare : 750 m et 600 m.\n$750 - 600 = 150$ m.\n⛔ Le piège : comparer 450 et 600. Le chemin par la boulangerie a deux morceaux.\nRéponse : a) 750 ; b) 150.",
          micros: ["ce1_longueur_defi", "ce1_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "750" },
            { question: "b)", attendu: "150" },
          ],
        },
      ],
    },
  ],
};
