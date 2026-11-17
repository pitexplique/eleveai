// ─── Fiche d'exercices : droites et segments (CE1) — 20 exercices corrigés ─────
//
// 17/11/2026 : la feuille interactive de la notion `droites_segments` du coach
// CE1 (5 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/droites-segments.bank.ts` : point,
// droite, segment, points alignés vérifiés à la règle, la règle graduée pour
// mesurer et tracer, le milieu trouvé PAR PLIAGE.
// ⛔ LIMITES DU CE1 : des centimètres et des mètres entiers, des nombres
// < 100. Aucune construction à rendre : un tracé devient une lecture de règle
// ou un QCM. Phrases de 16 mots au plus (les élèves de 7 ans lisent mal).
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot.
//
// Les pièges nommés : la droite prise pour un segment (1, 8), juger
// l'alignement à l'œil (2, 12), lire le bout de la règle au lieu de compter
// depuis le 0 (9, 16), partir du 1 de la règle (4), compter les points au
// lieu des traits (7), le milieu confondu avec le bout (6), répondre 8 au lieu
// de 4 (10), oublier de doubler (11), oublier le premier morceau (13), compter
// deux fois le côté commun (14), « une seule droite par un point » (15),
// oublier un piquet au bout (17), plier une seule fois (18), oublier le reste
// de la planche (19), oublier les fils en diagonale (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1, 3, 9), jardin (17), couture
// (18), menuiserie (19), électricité (20), jeux de cour (5, 12), bricolage
// (13), maison (14). Métiers : jardinier (17), couturière (18), menuisier
// (19), électricienne (20). Aucun contexte réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Les longueurs sont des MODÈLES.
//
// ⭐ LES DESSINS : `dessin` (repère en carreaux, y vers le bas, de
// `dessins-geometrie-cm1.tsx`) et `regle` (locale) : une règle graduée en cm,
// les segments posés au-dessus. Le dessin montre la question, jamais la réponse.
//
// Micro-compétences : ce1_droite_segment_reconnaitre (1, 5, 7, 8, 14, 15),
// ce1_droite_alignement_regle (2, 8, 12), ce1_droite_segment_tracer (3, 4, 5,
// 9, 13, 16, 19), ce1_droite_milieu (6, 10, 11, 17, 18), ce1_droite_defi (14,
// 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ENCRE, ORANGE, ROUGE, VERT, dessin, ecranSeulement, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

const GRIS = "#64748b";

type SegmentRegle = { de: number; a?: number; c?: string; noms?: [string, string?] };

/**
 * Une RÈGLE graduée de 0 à `max` cm (grands traits aux cm, petits aux
 * demi-cm), et des segments posés juste au-dessus, chacun sur sa ligne. Un
 * segment sans `a` n'est qu'un point (le premier bout). Texte NU.
 */
const regle = (segments: SegmentRegle[], max = 10) => {
  const cm = 27;
  const x0 = 22;
  // 26 de plus à droite : la place du « cm », après le dernier nombre.
  const W = x0 * 2 + max * cm + 26;
  const haut = 14 + segments.length * 34;
  const H = haut + 52;
  const X = (v: number) => x0 + v * cm;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Une règle graduée et des segments">
        {segments.map((s, k) => {
          const y = haut - 12 - k * 34;
          const c = s.c ?? BLEU;
          const croix = (v: number, key: string) => (
            <g key={key} stroke={c} strokeWidth={2.4} strokeLinecap="round">
              <line x1={X(v) - 5} y1={y - 5} x2={X(v) + 5} y2={y + 5} />
              <line x1={X(v) - 5} y1={y + 5} x2={X(v) + 5} y2={y - 5} />
            </g>
          );
          return (
            <g key={k}>
              {s.a !== undefined ? <line x1={X(s.de)} y1={y} x2={X(s.a)} y2={y} stroke={c} strokeWidth={3.5} strokeLinecap="round" /> : null}
              {croix(s.de, "d")}
              {s.a !== undefined ? croix(s.a, "a") : null}
              {s.noms?.[0] ? (
                <text x={X(s.de)} y={y - 11} textAnchor="middle" fontSize="15" fontWeight="800" fill={c}>
                  {s.noms[0]}
                </text>
              ) : null}
              {s.a !== undefined && s.noms?.[1] ? (
                <text x={X(s.a)} y={y - 11} textAnchor="middle" fontSize="15" fontWeight="800" fill={c}>
                  {s.noms[1]}
                </text>
              ) : null}
            </g>
          );
        })}
        <rect x={6} y={haut} width={W - 12} height={44} rx={5} fill="#fef9c3" stroke={ENCRE} strokeWidth={1.5} />
        {Array.from({ length: max * 2 + 1 }, (_, i) => (
          <line key={`t${i}`} x1={X(i / 2)} y1={haut} x2={X(i / 2)} y2={haut + (i % 2 ? 9 : 16)} stroke={ENCRE} strokeWidth={i % 2 ? 1 : 1.6} />
        ))}
        {Array.from({ length: max + 1 }, (_, i) => (
          <text key={`n${i}`} x={X(i)} y={haut + 34} textAnchor="middle" fontSize="14" fontWeight="800" fill={ENCRE}>
            {i}
          </text>
        ))}
        <text x={W - 10} y={haut + 34} textAnchor="end" fontSize="12" fontWeight="700" fill={GRIS}>
          cm
        </text>
      </svg>
    </div>
  );
};

/** Un point (croix) et son nom. */
const pt = (en: P, nom: string, vers: "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd" = "h", c = ENCRE): Forme => ({ t: "point", en, nom, vers, c });

/** Une maison (petit carré + toit), pour l'exercice 20. */
const maison = (x: number, y: number): Forme[] => [
  { t: "poly", pts: [[x - 0.45, y - 0.1], [x + 0.45, y - 0.1], [x + 0.45, y + 0.6], [x - 0.45, y + 0.6]], fill: "#fed7aa", c: ORANGE },
  { t: "poly", pts: [[x - 0.6, y - 0.1], [x, y - 0.7], [x + 0.6, y - 0.1]], fill: "#fecaca", c: ROUGE },
];

/** Un piquet planté (petit rectangle vertical). */
const piquet = (x: number, y: number): Forme => ({ t: "poly", pts: [[x - 0.15, y - 1.1], [x + 0.15, y - 1.1], [x + 0.15, y + 0.3], [x - 0.15, y + 0.3]], fill: "#a16207", c: "#713f12" });

export const exercicesDroitesSegmentsCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "droites-segments",
  titre: "Droites et segments",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un segment et une droite. Dire si des points sont alignés. Mesurer avec la règle, en partant du 0. Trouver le milieu en pliant. Un jardinier, une couturière, un menuisier et une électricienne. Un rappel avant chaque niveau. Cherche d'abord avec ta règle. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien le dessin.",
      rappel: [
        "Un segment s'arrête à ses deux bouts. Une droite ne s'arrête jamais.",
        "Des points alignés sont sur la même ligne droite. Je vérifie avec la règle.",
        "Pour mesurer, je pose le 0 de la règle sur le premier bout.",
      ],
      exercices: [
        {
          enonce: "Regarde les traits 1, 2 et 3.\nÉcris « segment » ou « droite ».\na) le trait 1\nb) le trait 2\nc) le trait 3",
          figure: dessin({
            l: 12,
            h: 6,
            label: "Trois traits numérotés 1, 2 et 3",
            formes: [
              { t: "texte", en: [0.3, 1], txt: "1" },
              { t: "seg", de: [2, 1], vers: [7, 1], c: BLEU, w: 3 },
              pt([2, 1], "", "h", BLEU),
              pt([7, 1], "", "h", BLEU),
              { t: "texte", en: [0.3, 3], txt: "2" },
              { t: "seg", de: [1, 3], vers: [12, 3], c: ORANGE, w: 3 },
              pt([4, 3], "", "h", ORANGE),
              pt([8, 3], "", "h", ORANGE),
              { t: "texte", en: [0.3, 5], txt: "3" },
              { t: "seg", de: [4, 5.4], vers: [10, 4.6], c: VERT, w: 3 },
              pt([4, 5.4], "", "h", VERT),
              pt([10, 4.6], "", "h", VERT),
            ],
          }),
          correction:
            "Je regarde les bouts de chaque trait.\na) Le trait 1 s'arrête à deux croix. C'est un segment.\nb) Le trait 2 traverse tout le dessin. Il continue des deux côtés : c'est une droite.\nc) Le trait 3 penche, mais il s'arrête à deux croix. C'est un segment.\n⛔ Le piège : croire qu'un trait penché n'est pas un segment. Seuls les bouts comptent.\nRéponse : a) segment ; b) droite ; c) segment.",
          micros: ["ce1_droite_segment_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["segment", "un segment"] },
            { question: "b)", attendu: ["droite", "une droite"] },
            { question: "c)", attendu: ["segment", "un segment"] },
          ],
        },
        {
          enonce: "Regarde les points.\na) A, B et C sont-ils alignés ?\nb) D, E et F sont-ils alignés ?\nÉcris oui ou non.",
          figure: dessin({
            l: 12,
            h: 5,
            label: "Six points nommés A, B, C, D, E et F",
            formes: [pt([1, 4], "A", "b"), pt([3, 3], "B", "b"), pt([5, 2], "C", "b"), pt([7, 4], "D", "b"), pt([9, 1], "E", "h"), pt([11, 3.5], "F", "b")],
          }),
          correction:
            "Je pose ma règle sur les points.\na) La règle touche A, B et C en même temps. Ils sont alignés : oui.\nb) Si la règle touche D et F, elle passe loin de E. E n'est pas sur la ligne : non.\n⛔ Le piège : dire « oui » parce que les points se suivent. Ils doivent être sur la même ligne droite.\nRéponse : a) oui ; b) non.",
          micros: ["ce1_droite_alignement_regle"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Le segment est posé sur la règle.\nCombien mesure-t-il, en centimètres ?",
          figure: regle([{ de: 0, a: 7, noms: ["A", "B"] }]),
          correction:
            "Le bout A est sur le 0 de la règle.\nLe bout B est sur le 7.\nDe 0 à 7, il y a 7 centimètres.\n⛔ Le piège : compter les petits traits. Je lis seulement les grands nombres.\nRéponse : 7.",
          micros: ["ce1_droite_segment_tracer"],
          reponses: [{ attendu: "7", unite: "cm" }],
        },
        {
          enonce: "Je veux tracer un segment de 5 cm.\nLe point A est sur le 0 de la règle.\nOù je marque le point B ?\nA) sur le 6   B) sur le 5   C) sur le 4",
          figure: regle([{ de: 0, noms: ["A"] }]),
          correction:
            "A est sur le 0. Je compte 5 centimètres à partir du 0.\nJe marque B sur le 5.\nPuis je relie A et B avec la règle.\n⛔ Le piège : poser A sur le 1, au bout de la règle. Il faut partir du 0.\nRéponse : B.",
          micros: ["ce1_droite_segment_tracer"],
          reponses: [{ attendu: ["B", "B) sur le 5", "sur le 5"] }],
        },
        {
          enonce: "Dans la cour, Sami trace à la craie.\na) Pour un segment, combien de points faut-il ?\nb) Par deux points, combien de droites peut-il tracer ?",
          figure: dessin({ l: 8, h: 3, max: "max-w-[14rem] print:max-w-[10rem]", label: "Deux points A et B", formes: [pt([1.5, 1.5], "A", "b"), pt([6.5, 1.5], "B", "b")] }),
          correction:
            "a) Un segment a deux bouts. Il faut 2 points.\nb) Je pose la règle sur A et B. Elle ne peut passer que d'une seule façon.\nPar deux points, je trace une seule droite : 1.\n⛔ Le piège : b) répondre 2, un trait par point. La droite passe par les deux points à la fois.\nRéponse : a) 2 ; b) 1.",
          micros: ["ce1_droite_segment_reconnaitre", "ce1_droite_segment_tracer"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["1", "une", "un"] },
          ],
        },
        {
          enonce: "Je plie une bande de papier.\nJe pose le bout A sur le bout B.\nLe pli marque : A) le milieu   B) le bout A   C) le bout B",
          figure: dessin({
            l: 10,
            h: 3,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Une bande de papier, bouts A et B",
            formes: [{ t: "poly", pts: [[1, 1], [9, 1], [9, 2], [1, 2]], fill: "#e0f2fe", c: BLEU }, { t: "texte", en: [0.4, 1.5], txt: "A" }, { t: "texte", en: [9.6, 1.5], txt: "B" }],
          }),
          correction:
            "Quand A touche B, la bande est pliée en deux parts égales.\nLe pli est à la même distance de A et de B.\nC'est le milieu de la bande.\n⛔ Le piège : croire que le pli est un bout. Les bouts sont l'un sur l'autre, le pli est au centre.\nRéponse : A.",
          micros: ["ce1_droite_milieu"],
          reponses: [{ attendu: ["A", "A) le milieu", "le milieu", "milieu"] }],
        },
        {
          enonce: "Cette ligne brisée est faite de segments.\nCombien de segments compte-t-elle ?",
          figure: dessin({
            l: 12,
            h: 5,
            label: "Une ligne brisée en zigzag",
            formes: [
              { t: "poly", pts: [[1, 4], [4, 1], [6, 4], [9, 1], [11, 3]], ouvert: true, c: BLEU, w: 3 },
              ...([[1, 4], [4, 1], [6, 4], [9, 1], [11, 3]] as P[]).map((p) => pt(p, "", "h", BLEU)),
            ],
          }),
          correction:
            "Je suis la ligne avec mon doigt, d'une croix à la suivante.\nPremier trait, deuxième, troisième, quatrième.\nIl y a 4 segments.\n⛔ Le piège : compter les croix. Il y a 5 croix, mais seulement 4 traits entre elles.\nRéponse : 4.",
          micros: ["ce1_droite_segment_reconnaitre"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Vrai ou faux ?\na) Une droite s'arrête à deux points.\nb) Un segment a deux bouts.\nc) Je vérifie un alignement avec la règle.",
          correction:
            "Je relis le rappel.\na) Une droite ne s'arrête jamais. Faux.\nb) Un segment s'arrête à ses deux bouts. Vrai.\nc) La règle montre si les points sont sur la même ligne. Vrai.\n⛔ Le piège : a) confondre droite et segment. C'est le segment qui a deux bouts.\nRéponse : a) faux ; b) vrai ; c) vrai.",
          micros: ["ce1_droite_segment_reconnaitre", "ce1_droite_alignement_regle"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je lis la règle, puis je calcule.",
      rappel: [
        "Si le segment ne part pas du 0, je compte les centimètres entre ses deux bouts.",
        "Le milieu partage le segment en deux parts égales.",
        "Par un seul point, je peux tracer autant de droites que je veux.",
      ],
      exercices: [
        {
          enonce: "Le segment ne commence pas au 0.\nCombien mesure-t-il, en centimètres ?",
          figure: regle([{ de: 2, a: 8, c: ORANGE, noms: ["C", "D"] }]),
          correction:
            "Le bout C est sur le 2. Le bout D est sur le 8.\nJe compte les centimètres de 2 à 8 : 3, 4, 5, 6, 7, 8.\nCela fait 6 centimètres. Je vérifie : 8 − 2 = 6.\n⛔ Le piège : répondre 8, le nombre sous le bout D. La règle ne part pas du 0 ici.\nRéponse : 6.",
          micros: ["ce1_droite_segment_tracer"],
          reponses: [{ attendu: "6", unite: "cm" }],
        },
        {
          enonce: "Le segment AB mesure 8 cm.\nJe le plie pour trouver son milieu M.\nÀ combien de centimètres de A est le point M ?",
          figure: dessin({
            l: 10,
            h: 3,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Un segment AB de 8 cm",
            formes: [{ t: "seg", de: [1, 2], vers: [9, 2], c: BLEU, w: 3 }, pt([1, 2], "A", "b", BLEU), pt([9, 2], "B", "b", BLEU), { t: "texte", en: [5, 1], txt: "8 cm", c: BLEU }],
          }),
          correction:
            "Le milieu partage le segment en deux parts égales.\nJe cherche la moitié de 8 : 4 + 4 = 8.\nM est à 4 cm de A, et à 4 cm de B.\n⛔ Le piège : répondre 8. 8 cm, c'est tout le segment, de A jusqu'à B.\nRéponse : 4.",
          micros: ["ce1_droite_milieu"],
          reponses: [{ attendu: ["4", "quatre"], unite: "cm" }],
        },
        {
          enonce: "M est le milieu du segment AB.\nDe A à M, il y a 5 cm.\nCombien mesure tout le segment AB ?",
          figure: dessin({
            l: 12,
            h: 3,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Un segment AB et son milieu M",
            formes: [
              { t: "seg", de: [1, 2], vers: [11, 2], c: BLEU, w: 3 },
              pt([1, 2], "A", "b", BLEU),
              pt([6, 2], "M", "b", ROUGE),
              pt([11, 2], "B", "b", BLEU),
              { t: "code", de: [1, 2], vers: [6, 2], n: 2 },
              { t: "code", de: [6, 2], vers: [11, 2], n: 2 },
              { t: "texte", en: [3.5, 1], txt: "5 cm", c: BLEU },
            ],
          }),
          correction:
            "M est le milieu : de M à B, il y a aussi 5 cm.\nLes petits traits rouges le disent : les deux parts sont égales.\nJ'ajoute les deux parts : 5 + 5 = 10.\n⛔ Le piège : répondre 5. 5 cm, c'est seulement la moitié du segment.\nRéponse : 10.",
          micros: ["ce1_droite_milieu"],
          reponses: [{ attendu: ["10", "dix"], unite: "cm" }],
        },
        {
          enonce: "Pose ta règle sur A et B.\nUn seul point n'est pas aligné avec A et B.\nLequel : C, D ou E ?",
          figure: dessin({
            l: 10,
            h: 7,
            grille: true,
            label: "Cinq points sur un quadrillage",
            formes: [pt([1, 6], "A", "b"), pt([3, 5], "B", "b"), pt([5, 4], "C", "b"), pt([7, 3], "D", "b"), pt([9, 1], "E", "h")],
          }),
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 7,
              grille: true,
              label: "La règle posée sur A et B",
              formes: [{ t: "seg", de: [0, 6.5], vers: [10, 1.5], c: VERT, w: 2.5, pt: true }, pt([1, 6], "A", "b"), pt([3, 5], "B", "b"), pt([5, 4], "C", "b"), pt([7, 3], "D", "b"), pt([9, 1], "E", "h", ROUGE)],
            }),
          ),
          correction:
            "Je pose ma règle sur A et B, et je la fais glisser jusqu'au bout.\nElle touche C, puis D : ils sont alignés avec A et B.\nE est un carreau au-dessus de la règle.\nE n'est pas aligné.\n⛔ Le piège : juger à l'œil. E a l'air presque sur la ligne. La règle, elle, ne se trompe pas.\nRéponse : E.",
          micros: ["ce1_droite_alignement_regle"],
          reponses: [{ attendu: ["E", "le point E"] }],
        },
        {
          enonce: "Léo trace un segment de 4 cm.\nAu bout, il ajoute 3 cm sur la même ligne.\nCombien mesure le grand segment ?",
          figure: dessin({
            l: 10,
            h: 3,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Un segment de 4 cm suivi de 3 cm",
            formes: [
              { t: "seg", de: [1, 2], vers: [5, 2], c: BLEU, w: 3 },
              { t: "seg", de: [5, 2], vers: [8, 2], c: ORANGE, w: 3 },
              pt([1, 2], "", "h", BLEU),
              pt([5, 2], "", "h", ENCRE),
              pt([8, 2], "", "h", ORANGE),
              { t: "texte", en: [3, 1], txt: "4 cm", c: BLEU },
              { t: "texte", en: [6.5, 1], txt: "3 cm", c: ORANGE },
            ],
          }),
          correction:
            "Le grand segment va du premier bout au dernier.\nIl contient le morceau de 4 cm et le morceau de 3 cm.\nJ'ajoute : 4 + 3 = 7.\n⛔ Le piège : répondre 3, la dernière longueur lue. Le premier morceau compte aussi.\nRéponse : 7.",
          micros: ["ce1_droite_segment_tracer"],
          reponses: [{ attendu: ["7", "sept"], unite: "cm" }],
        },
        {
          enonce: "Lina dessine une maison avec des segments.\nCombien de segments a-t-elle tracés en tout ?",
          figure: dessin({
            l: 8,
            h: 8,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Une maison : un carré et un toit",
            formes: [{ t: "poly", pts: [[2, 3], [6, 3], [6, 7], [2, 7]], c: BLEU, w: 3 }, { t: "poly", pts: [[2, 3], [4, 1], [6, 3]], ouvert: true, c: ROUGE, w: 3 }],
          }),
          correction:
            "Je compte d'abord le carré : 4 côtés, donc 4 segments.\nPuis le toit : 2 traits rouges.\nLe bas du toit, c'est le haut du carré : je l'ai déjà compté.\n4 + 2 = 6 segments.\n⛔ Le piège : compter 7. Le trait du milieu sert au carré et au toit, mais c'est un seul segment.\nRéponse : 6.",
          micros: ["ce1_droite_segment_reconnaitre", "ce1_droite_defi"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Voici un point A tout seul.\nPar A, combien de droites peut-on tracer ?\nA) une seule   B) deux   C) autant qu'on veut",
          figure: dessin({ l: 6, h: 3, max: "max-w-[10rem] print:max-w-[8rem]", label: "Un point A", formes: [pt([3, 1.5], "A", "b")] }),
          schema: ecranSeulement(
            dessin({
              l: 8,
              h: 6,
              max: "max-w-[12rem] print:max-w-[9rem]",
              label: "Plusieurs droites passent par A",
              formes: [
                { t: "seg", de: [0, 3], vers: [8, 3], c: BLEU },
                { t: "seg", de: [1, 0], vers: [7, 6], c: ORANGE },
                { t: "seg", de: [4, 0], vers: [4, 6], c: VERT },
                { t: "seg", de: [7, 0], vers: [1, 6], c: ROUGE },
                pt([4, 3], "", "hd"),
                { t: "texte", en: [5.2, 2.5], txt: "A" },
              ],
            }),
          ),
          correction:
            "Je pose ma règle sur A. Je la tourne un peu, et je trace encore.\nÀ chaque position, j'obtiens une nouvelle droite qui passe par A.\nJe peux continuer sans m'arrêter.\n⛔ Le piège : répondre « une seule ». C'est par DEUX points qu'il ne passe qu'une droite.\nRéponse : C.",
          micros: ["ce1_droite_segment_reconnaitre"],
          reponses: [{ attendu: ["C", "C) autant qu'on veut", "autant qu'on veut"] }],
        },
        {
          enonce: "Deux segments sont posés sur la règle.\na) Combien mesure le segment rouge ?\nb) Combien mesure le segment bleu ?\nc) Lequel est le plus long ?",
          figure: regle([
            { de: 1, a: 6, c: ROUGE },
            { de: 4, a: 10, c: BLEU },
          ]),
          correction:
            "a) Le rouge va du 1 au 6. Je compte : 2, 3, 4, 5, 6. Il mesure 5 cm.\nb) Le bleu va du 4 au 10. Je compte : 5, 6, 7, 8, 9, 10. Il mesure 6 cm.\nc) 6 est plus grand que 5 : le bleu est le plus long.\n⛔ Le piège : lire seulement le bout de droite. Aucun des deux segments ne part du 0.\nRéponse : a) 5 ; b) 6 ; c) le bleu.",
          micros: ["ce1_droite_segment_tracer"],
          reponses: [
            { question: "a)", attendu: "5", unite: "cm" },
            { question: "b)", attendu: "6", unite: "cm" },
            { question: "c)", attendu: ["bleu", "le bleu", "le segment bleu"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je fais un petit dessin si besoin.",
      rappel: [
        "Le milieu est à la même distance des deux bouts.",
        "Pour des piquets tous les 3 m, je n'oublie pas le piquet du bout.",
        "Je relis la question avant d'écrire ma réponse.",
      ],
      exercices: [
        {
          titre: "Les piquets du jardinier",
          enonce: "Un jardinier tend une corde de 12 m entre deux piquets.\na) Le milieu de la corde est à combien de mètres du premier piquet ?\nb) Il plante un piquet tous les 3 m, les deux bouts compris. Combien de piquets ?",
          figure: dessin({
            l: 13,
            h: 4,
            max: "max-w-[20rem] print:max-w-[14rem]",
            label: "Une corde de 12 m entre deux piquets",
            formes: [piquet(0.5, 2.5), piquet(12.5, 2.5), { t: "seg", de: [0.5, 1.6], vers: [12.5, 1.6], c: VERT, w: 2.5 }, { t: "texte", en: [6.5, 0.7], txt: "12 m", c: VERT }],
          }),
          schema: ecranSeulement(
            dessin({
              l: 13,
              h: 4,
              max: "max-w-[20rem] print:max-w-[14rem]",
              label: "Cinq piquets, tous les 3 m",
              formes: [
                ...[0.5, 3.5, 6.5, 9.5, 12.5].map((x) => piquet(x, 2.5)),
                { t: "seg", de: [0.5, 1.6], vers: [12.5, 1.6], c: VERT, w: 2.5 },
                ...["0", "3", "6", "9", "12"].map((t, i) => ({ t: "texte" as const, en: [0.5 + 3 * i, 3.5] as P, txt: t, c: GRIS })),
              ],
            }),
          ),
          correction:
            "a) Le milieu partage la corde en deux parts égales. 6 + 6 = 12. Le milieu est à 6 m.\nb) Je compte les piquets de 3 en 3, à partir de 0 : 0, 3, 6, 9, 12.\nJ'ai cité 5 nombres : il faut 5 piquets.\n⛔ Le piège : b) répondre 4, car 4 fois 3 font 12. Il y a 4 espaces, mais 5 piquets : celui du début compte.\nRéponse : a) 6 ; b) 5.",
          micros: ["ce1_droite_milieu", "ce1_droite_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"], unite: "m" },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Le ruban de la couturière",
          enonce: "Une couturière a un ruban de 20 cm.\nElle le plie en deux pour trouver le milieu.\na) Combien mesure chaque moitié ?\nb) Elle plie encore chaque moitié en deux. Combien mesure chaque petit morceau ?",
          figure: dessin({
            l: 12,
            h: 3,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Un ruban de 20 cm",
            formes: [{ t: "poly", pts: [[1, 1.4], [11, 1.4], [11, 2.2], [1, 2.2]], fill: "#fbcfe8", c: "#be185d" }, { t: "texte", en: [6, 0.6], txt: "20 cm", c: "#be185d" }],
          }),
          correction:
            "a) Plier en deux, c'est faire deux parts égales. 10 + 10 = 20. Chaque moitié mesure 10 cm.\nb) Je plie 10 cm en deux. 5 + 5 = 10. Chaque petit morceau mesure 5 cm.\nJe vérifie : 4 morceaux de 5 cm, 5 + 5 + 5 + 5 = 20.\n⛔ Le piège : b) répondre 10 en oubliant le second pliage.\nRéponse : a) 10 ; b) 5.",
          micros: ["ce1_droite_milieu", "ce1_droite_defi"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"], unite: "cm" },
            { question: "b)", attendu: ["5", "cinq"], unite: "cm" },
          ],
        },
        {
          titre: "La planche du menuisier",
          enonce: "Un menuisier a une planche de 30 cm.\nIl trace un segment de 12 cm, puis un de 9 cm, bout à bout.\na) Combien mesurent les deux segments ensemble ?\nb) Combien de centimètres de planche restent après ?",
          figure: dessin({
            l: 12,
            h: 3,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Une planche de 30 cm",
            formes: [{ t: "poly", pts: [[1, 1.3], [11, 1.3], [11, 2.3], [1, 2.3]], fill: "#fde68a", c: "#a16207" }, { t: "texte", en: [6, 0.5], txt: "30 cm", c: "#a16207" }],
          }),
          correction:
            "a) Bout à bout, j'ajoute les deux longueurs : 12 + 9 = 21. Les segments mesurent 21 cm.\nb) La planche fait 30 cm. J'enlève ce qui est tracé : 30 − 21 = 9.\nJe vérifie : 21 + 9 = 30.\n⛔ Le piège : b) répondre 18, en enlevant seulement le premier segment.\nRéponse : a) 21 ; b) 9.",
          micros: ["ce1_droite_segment_tracer", "ce1_droite_defi"],
          reponses: [
            { question: "a)", attendu: "21", unite: "cm" },
            { question: "b)", attendu: ["9", "neuf"], unite: "cm" },
          ],
        },
        {
          titre: "Les fils de l'électricienne",
          enonce: "Une électricienne relie des maisons par des fils bien droits.\nChaque maison est reliée à toutes les autres.\na) Avec 3 maisons, combien de fils ?\nb) Avec les 4 maisons du dessin, combien de fils ?",
          figure: dessin({
            l: 8,
            h: 7,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Quatre maisons aux coins d'un carré",
            formes: [...maison(1.5, 1.3), ...maison(6.5, 1.3), ...maison(1.5, 5.8), ...maison(6.5, 5.8)],
          }),
          schema: ecranSeulement(
            dessin({
              l: 8,
              h: 7,
              max: "max-w-[12rem] print:max-w-[9rem]",
              label: "Les six fils entre les quatre maisons",
              formes: [
                { t: "seg", de: [1.5, 1.6], vers: [6.5, 1.6], c: BLEU, w: 2.5 },
                { t: "seg", de: [1.5, 6.1], vers: [6.5, 6.1], c: BLEU, w: 2.5 },
                { t: "seg", de: [1.5, 1.6], vers: [1.5, 6.1], c: BLEU, w: 2.5 },
                { t: "seg", de: [6.5, 1.6], vers: [6.5, 6.1], c: BLEU, w: 2.5 },
                { t: "seg", de: [1.5, 1.6], vers: [6.5, 6.1], c: ORANGE, w: 2.5 },
                { t: "seg", de: [6.5, 1.6], vers: [1.5, 6.1], c: ORANGE, w: 2.5 },
                ...maison(1.5, 1.3),
                ...maison(6.5, 1.3),
                ...maison(1.5, 5.8),
                ...maison(6.5, 5.8),
              ],
            }),
          ),
          correction:
            "a) Avec 3 maisons, je dessine un triangle : 3 fils.\nb) Avec 4 maisons, je trace d'abord le tour du carré : 4 fils bleus.\nPuis les 2 fils en diagonale, d'un coin à l'autre : 2 fils orange.\n4 + 2 = 6 fils.\n⛔ Le piège : b) répondre 4. Chaque maison est aussi reliée à celle du coin opposé.\nRéponse : a) 3 ; b) 6.",
          micros: ["ce1_droite_segment_reconnaitre", "ce1_droite_defi"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
      ],
    },
  ],
};
