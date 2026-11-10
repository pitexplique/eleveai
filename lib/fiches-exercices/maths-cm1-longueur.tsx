// ─── Fiche d'exercices : les longueurs (CM1) — 20 exercices corrigés ──────────
//
// 10/11/2026 : la feuille interactive de la notion `longueur` du coach CM1
// (5 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cm1/maths/longueur.bank.ts`) et sur la carte
// mentale `cm1/longueur` (lib/cartes/remplies/cm1.json) : comparer, convertir
// (km, m, cm, mm), estimer, mesurer avec une règle, défis.
// ⛔ LIMITES DU CM1 : entiers, et seulement des tailles en m à deux décimales
// (1,32 m) ; pas de tableau de conversion complet (dam, hm), pas de périmètre
// (c'est une autre notion).
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, signe, un nombre, un nom.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 250 km » vaut 250) : chaque conversion
// IMPOSE l'unité dans l'énoncé (« en centimètres ») et l'élève écrit le nombre
// seul. Les QCM d'unités se répondent par la LETTRE (ou « C) 2 m »), jamais par
// « 2 m » seul, qui laisserait passer « 2 km ».
// ⛔ Un rangement se répond par des LETTRES séparées par « ; » (lu dans
// l'ordre) : collées, « BDAC » vaudrait « BADC » (le vérificateur multiplie
// les lettres).
//
// Les pièges nommés : 3 m = 30 cm (1, 5), lire le nombre d'arrivée sans
// retirer le départ (2, 6), comparer les nombres sans les unités (3, 8, 11),
// une unité absurde (4, 13), 2 m 40 cm = 42 cm (9), additionner 1 + 35 (10),
// les mm oubliés (12), 3 − 80 (14), 1 km 200 m + 800 m = 1 km 1 000 m laissé
// tel quel (15), 1,32 m = 1 m 32 mm (16), 5 robes au lieu de 3 (17), 12 − 4
// km sans les 500 m (18), oublier le reste (19), 1 600 m = 16 km (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bricolage (2), bijoux (6), jeux (10,
// circuit), sport (11, saut en longueur ; 15, course ; 20, relais), dessin
// (12), escalade (14), santé (16, infirmière scolaire), couture (17),
// montagne (18), menuiserie (19). Les métiers : infirmier (16), couturière
// (17), guide de montagne (18), menuisier (19), entraîneuse (20).
// UN SEUL contexte réunionnais (18, un MODÈLE de sentier au Maïdo).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 20 — un tour de piste d'athlétisme mesure 400 m (World Athletics,
//     règle 2 « La piste », couloir 1).
//   · ex. 13 — une girafe adulte mesure environ 5 m de haut (Larousse,
//     « girafe » : jusqu'à 5,50 m). Estimation, « environ ».
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : une règle graduée en cm et mm (`regle`), les objets posés
// au-dessus, des pointillés à leurs deux bouts.
//
// Micro-compétences : longueur_comparer (3, 8, 11, 12, 15, 16), longueur_convertir
// (1, 5, 7, 9, 10, 14, 15, 16, 17, 18, 19, 20), longueur_estimer (4, 13),
// longueur_mesurer (2, 6, 12), longueur_defi (17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

/**
 * Une règle graduée de 0 à `max` cm (traits des mm, des demi-cm et des cm),
 * avec des objets posés au-dessus : une barre de `de` à `a` (en cm, décimaux
 * permis : 4,6 cm = 4 cm 6 mm), son nom à droite, des pointillés jusqu'à la
 * règle à ses deux bouts. Texte nu, pas de KaTeX.
 */
const regle = (objets: { de: number; a: number; label: string; couleur: string }[], max = 13) => {
  const [x0, pas] = [16, 24];
  const x = (cm: number) => x0 + cm * pas;
  const hautObjets = objets.length * 24 + 8;
  const yR = hautObjets + 4;
  const H = yR + 46;
  const W = x(max) + 60;
  const traits = [];
  for (let mm = 0; mm <= max * 10; mm++) {
    const long = mm % 10 === 0 ? 16 : mm % 5 === 0 ? 11 : 6;
    traits.push(<line key={mm} x1={x(mm / 10)} y1={yR} x2={x(mm / 10)} y2={yR + long} stroke={NOIR} strokeWidth={mm % 10 === 0 ? 1.4 : 0.8} />);
  }
  return (
    <div className="mx-auto w-full max-w-[26rem] print:max-w-[18rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Règle graduée en centimètres">
        <rect x={x0 - 8} y={yR} width={x(max) - x0 + 16} height={40} fill="#fef9c3" stroke={NOIR} strokeWidth={1.2} rx={3} />
        {traits}
        {Array.from({ length: max + 1 }, (_, k) => (
          <text key={k} x={x(k)} y={yR + 32} textAnchor="middle" fontSize="11" fontWeight="700" fill={NOIR}>
            {k}
          </text>
        ))}
        <text x={x(max) + 12} y={yR + 32} fontSize="11" fill={NOIR}>
          cm
        </text>
        {objets.map((o, i) => {
          const y = 6 + i * 24;
          return (
            <g key={i}>
              <rect x={x(o.de)} y={y} width={x(o.a) - x(o.de)} height={13} rx={4} fill={o.couleur} />
              <line x1={x(o.de)} y1={y + 13} x2={x(o.de)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={x(o.a)} y1={y + 13} x2={x(o.a)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
              <text x={x(o.a) + 5} y={y + 11} fontSize="12" fontWeight="700" fill={NOIR}>
                {o.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesLongueurCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du geste seul au problème. Mesurer avec une règle. Passer des mètres aux centimètres, des kilomètres aux mètres. Comparer deux longueurs, estimer la taille d'un objet. Un saut en longueur, un circuit de voitures, une infirmière qui mesure les élèves, une couturière, un guide de montagne, un menuisier et un relais. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, dans l'unité demandée.",
      rappel: [
        "1 km = 1 000 m. 1 m = 100 cm. 1 cm = 10 mm.",
        "Pour comparer deux longueurs, je les écris d'abord dans la même unité.",
        "Pour mesurer, je pose le 0 de la règle au bout de l'objet. Je lis l'autre bout.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 3 m = … cm\nb) 5 cm = … mm\nc) 2 km = … m\nd) 7 m = … cm",
          correction:
            "J'utilise les égalités du rappel.\na) 1 m = 100 cm. Donc 3 m, c'est $3 \\times 100 = 300$ cm.\nb) 1 cm = 10 mm. Donc 5 cm, c'est $5 \\times 10 = 50$ mm.\nc) 1 km = 1 000 m. Donc 2 km, c'est $2 \\times 1\\,000 = 2\\,000$ m.\nd) 7 m, c'est $7 \\times 100 = 700$ cm.\n⛔ Le piège : écrire 3 m = 30 cm. Dans 1 m, il y a 100 cm, pas 10.\nRéponse : a) 300 ; b) 50 ; c) $2\\,000$ ; d) 700.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "2000" },
            { question: "d)", attendu: "700" },
          ],
        },
        {
          enonce: "Zoé pose un crayon et une clé au-dessus de sa règle.\na) Combien mesure le crayon, en centimètres ?\nb) Combien mesure la clé, en centimètres ?",
          figure: regle([
            { de: 0, a: 9, label: "crayon", couleur: BLEU },
            { de: 2, a: 7, label: "clé", couleur: ORANGE },
          ], 11),
          correction:
            "Je regarde où commence et où finit chaque objet.\na) Le crayon part du 0 et finit sur le 9. Il mesure 9 cm.\nb) La clé part du 2 et finit sur le 7. Elle ne part pas du 0.\nJe compte les centimètres entre les deux : $7 - 2 = 5$. La clé mesure 5 cm.\n⛔ Le piège : lire 7 cm pour la clé. Le 7 dit où elle finit, pas sa longueur.\nRéponse : a) 9 ; b) 5.",
          micros: ["longueur_mesurer"],
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "5" },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 2 m … 150 cm\nb) 40 mm … 4 cm\nc) 1 km … 900 m\nd) 35 cm … 1 m",
          correction:
            "J'écris les deux longueurs dans la même unité, puis je compare.\na) 2 m = 200 cm. 200 cm est plus grand que 150 cm. Donc 2 m > 150 cm.\nb) 4 cm = 40 mm. Les deux sont égales. Donc 40 mm = 4 cm.\nc) 1 km = 1 000 m. 1 000 m est plus grand que 900 m. Donc 1 km > 900 m.\nd) 1 m = 100 cm. 35 cm est plus petit que 100 cm. Donc 35 cm < 1 m.\n⛔ Le piège : comparer 2 et 150 sans les unités. 150 est plus grand que 2, mais 150 cm est plus court que 2 m.\nRéponse : a) > ; b) = ; c) > ; d) <.",
          micros: ["longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: "<" },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) La hauteur d'une porte : A) 2 km B) 2 cm C) 2 m\nb) La longueur d'une gomme : A) 5 cm B) 5 m C) 5 mm\nc) Une balade à vélo d'une journée : A) 80 m B) 80 cm C) 80 km",
          correction:
            "Je compare à des longueurs que je connais. Un doigt fait environ 1 cm de large. Un grand pas fait environ 1 m.\na) Une porte est un peu plus haute qu'un adulte : environ 2 m. 2 cm, c'est deux doigts ; 2 km, c'est une longue marche. Réponse C.\nb) Une gomme tient dans la main : environ 5 cm. Réponse A.\nc) À vélo, on roule des heures : environ 80 km. 80 m, c'est un seul tour de cour. Réponse C.\n⛔ Le piège : garder le bon nombre et oublier l'unité. « 2 », c'est juste ; « 2 cm » pour une porte, c'est absurde.\nRéponse : a) C ; b) A ; c) C.",
          micros: ["longueur_estimer"],
          reponses: [
            { question: "a)", attendu: ["C", "C) 2 m"] },
            { question: "b)", attendu: ["A", "A) 5 cm"] },
            { question: "c)", attendu: ["C", "C) 80 km"] },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 400 cm = … m\nb) 60 mm = … cm\nc) 5 000 m = … km",
          correction:
            "Je cherche combien de fois la grande unité tient dans la longueur.\na) 100 cm = 1 m. Dans 400 cm, il y a 4 fois 100 cm. Donc 400 cm = 4 m.\nb) 10 mm = 1 cm. Dans 60 mm, il y a 6 fois 10 mm. Donc 60 mm = 6 cm.\nc) 1 000 m = 1 km. Dans $5\\,000$ m, il y a 5 fois $1\\,000$ m. Donc $5\\,000$ m = 5 km.\n⛔ Le piège : écrire 400 cm = 40 m. 1 m, c'est 100 cm : je divise par 100, pas par 10.\nRéponse : a) 4 ; b) 6 ; c) 5.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "5" },
          ],
        },
        {
          enonce: "Malik fabrique un collier. Il mesure aussi une aiguille.\na) Combien mesure le collier, en centimètres ?\nb) Combien mesure l'aiguille, en millimètres ?",
          figure: regle([
            { de: 1, a: 8, label: "collier", couleur: VERT },
            { de: 0, a: 4.6, label: "aiguille", couleur: ROUGE },
          ], 10),
          correction:
            "a) Le collier part du 1 et finit sur le 8.\nJe retire le départ : $8 - 1 = 7$. Le collier mesure 7 cm.\nb) L'aiguille part du 0. Elle finit 6 petits traits après le 4.\nUn petit trait, c'est 1 mm. 4 cm = 40 mm.\nDonc l'aiguille mesure $40 + 6 = 46$ mm.\n⛔ Le piège : lire 8 cm pour le collier. Il ne commence pas au 0 : je retire 1.\nRéponse : a) 7 ; b) 46.",
          micros: ["longueur_mesurer", "longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "46" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 m = 10 cm\nb) 1 cm = 10 mm\nc) 1 km = 100 m\nd) 3 m = 300 cm",
          correction:
            "Je relis les égalités du rappel.\na) 1 m = 100 cm, pas 10 cm. Faux.\nb) 1 cm = 10 mm. Vrai : il y a 10 petits traits dans 1 cm sur la règle.\nc) 1 km = 1 000 m, pas 100 m. Faux.\nd) 3 m = $3 \\times 100 = 300$ cm. Vrai.\n⛔ Le piège : mélanger les « 10 », « 100 » et « 1 000 ». Je les récite : km → m : 1 000 ; m → cm : 100 ; cm → mm : 10.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "Quatre rubans :\nA = 1 m ; B = 85 cm ; C = 120 cm ; D = 950 mm.\nRange-les du plus court au plus long.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les longueurs dans la même unité : le millimètre.\nA = 1 m = 1 000 mm.\nB = 85 cm = 850 mm.\nC = 120 cm = $1\\,200$ mm.\nD = 950 mm.\nJe range : 850 < 950 < $1\\,000$ < $1\\,200$.\nDonc B, puis D, puis A, puis C.\n⛔ Le piège : ranger 1 ; 85 ; 120 ; 950 sans les unités. A serait le plus court, alors que 1 m est plus long que 85 cm.\nRéponse : B ; D ; A ; C.",
          micros: ["longueur_comparer", "longueur_convertir"],
          reponses: [{ attendu: ["B ; D ; A ; C", "B < D < A < C", "B, D, A, C"], ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je mets tout dans la même unité AVANT de calculer.",
      rappel: [
        "De m en cm : × 100. De km en m : × 1 000. De cm en mm : × 10.",
        "2 m 40 cm = 200 cm + 40 cm = 240 cm.",
        "Avant d'additionner ou de soustraire, j'écris toutes les longueurs dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 2 m 40 cm = … cm\nb) 6 cm 3 mm = … mm\nc) 1 km 500 m = … m\nd) 305 cm = … m … cm",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 2 m = 200 cm. Donc 2 m 40 cm = $200 + 40 = 240$ cm.\nb) 6 cm = 60 mm. Donc 6 cm 3 mm = $60 + 3 = 63$ mm.\nc) 1 km = 1 000 m. Donc 1 km 500 m = $1\\,000 + 500 = 1\\,500$ m.\nd) 305 cm = 300 cm + 5 cm. Et 300 cm = 3 m. Donc 305 cm = 3 m 5 cm.\n⛔ Le piège du a) : écrire 42 cm en ajoutant 2 et 40. Les 2 m valent 200 cm.\n⛔ Le piège du d) : écrire 3 m 50 cm. Il reste 5 cm, pas 50.\nRéponse : a) 240 ; b) 63 ; c) $1\\,500$ ; d) 3 m 5 cm.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "240" },
            { question: "b)", attendu: "63" },
            { question: "c)", attendu: "1500" },
            { question: "d) m", attendu: "3" },
            { question: "d) cm", attendu: "5" },
          ],
        },
        {
          enonce: "Mei construit un circuit de petites voitures.\nElle met bout à bout une piste de 1 m et une piste de 35 cm.\na) Quelle est la longueur totale, en centimètres ?\nb) Combien de centimètres manque-t-il pour faire 2 m ?",
          correction:
            "a) Je mets tout en centimètres : 1 m = 100 cm.\nJ'additionne : $100 + 35 = 135$ cm.\nb) 2 m = 200 cm.\nJe cherche ce qui manque : $200 - 135 = 65$ cm.\nJe vérifie : $135 + 65 = 200$.\n⛔ Le piège : calculer $1 + 35 = 36$. Le 1 compte des mètres, le 35 des centimètres.\nRéponse : a) 135 ; b) 65.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "135" },
            { question: "b)", attendu: "65" },
          ],
        },
        {
          enonce: "Au saut en longueur :\nAïcha saute 2 m 85 cm. Tom saute 279 cm. Noah saute 3 m.\na) Qui saute le plus loin ?\nb) Qui saute le moins loin ?",
          correction:
            "J'écris les trois sauts en centimètres.\nAïcha : 2 m 85 cm = $200 + 85 = 285$ cm.\nTom : 279 cm.\nNoah : 3 m = 300 cm.\nJe range : 279 < 285 < 300.\na) Le plus loin : Noah, avec 300 cm.\nb) Le moins loin : Tom, avec 279 cm.\n⛔ Le piège : croire que Tom gagne parce que 279 est un grand nombre. 279 cm, c'est moins que 3 m.\nRéponse : a) Noah ; b) Tom.",
          micros: ["longueur_comparer", "longueur_convertir"],
          reponses: [
            { question: "a)", attendu: ["Noah"] },
            { question: "b)", attendu: ["Tom"] },
          ],
        },
        {
          enonce: "Ilona compare ses deux crayons de couleur.\na) Combien mesure le crayon rouge, en centimètres ?\nb) Combien mesure le crayon vert, en millimètres ?\nc) Le rouge est plus long. De combien de millimètres ?",
          figure: regle([
            { de: 0, a: 11, label: "rouge", couleur: ROUGE },
            { de: 0, a: 7.5, label: "vert", couleur: VERT },
          ], 12),
          correction:
            "Les deux crayons partent du 0.\na) Le rouge finit sur le 11. Il mesure 11 cm.\nb) Le vert finit au demi-trait entre 7 et 8 : 5 mm après le 7.\n7 cm = 70 mm. Donc le vert mesure $70 + 5 = 75$ mm.\nc) Je mets le rouge en millimètres : 11 cm = 110 mm.\nJe soustrais : $110 - 75 = 35$ mm.\n⛔ Le piège : calculer $11 - 7 = 4$. J'oublie alors les 5 mm du vert.\nRéponse : a) 11 ; b) 75 ; c) 35.",
          micros: ["longueur_mesurer", "longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "75" },
            { question: "c)", attendu: "35" },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Une baguette de pain : A) 60 m B) 60 cm C) 60 mm\nb) La hauteur d'une girafe : A) 5 m B) 50 m C) 5 cm\nc) La longueur d'une fourmi : A) 40 cm B) 4 m C) 4 mm",
          correction:
            "Je compare à une longueur connue : 1 m, c'est un grand pas.\na) Une baguette va du coude au bout des doigts, et plus. Environ 60 cm. 60 mm, c'est la taille d'un doigt. Réponse B.\nb) Une girafe est plus haute qu'une maison d'un étage : environ 5 m. 50 m, c'est un immeuble de 15 étages. Réponse A.\nc) Une fourmi est plus petite qu'un ongle : environ 4 mm. Réponse C.\n⛔ Le piège : choisir le « gros » nombre pour un grand animal. 50 m pour une girafe, c'est dix fois trop.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["longueur_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 60 cm"] },
            { question: "b)", attendu: ["A", "A) 5 m"] },
            { question: "c)", attendu: ["C", "C) 4 mm"] },
          ],
        },
        {
          enonce: "Lina grimpe au mur d'escalade. Elle a une corde de 3 m.\nElle coupe un morceau de 80 cm.\na) Combien de centimètres de corde reste-t-il ?\nb) Elle coupe encore 1 m 20 cm. Combien de centimètres reste-t-il ?",
          correction:
            "Je mets tout en centimètres : 3 m = 300 cm.\na) $300 - 80 = 220$ cm.\nb) 1 m 20 cm = $100 + 20 = 120$ cm.\n$220 - 120 = 100$ cm. Il reste 100 cm, donc 1 m.\n⛔ Le piège : vouloir calculer $3 - 80$. J'écris d'abord 3 m = 300 cm.\nRéponse : a) 220 ; b) 100.",
          micros: ["longueur_convertir"],
          reponses: [
            { question: "a)", attendu: "220" },
            { question: "b)", attendu: "100" },
          ],
        },
        {
          enonce: "Paul court 1 km 200 m, puis encore 800 m.\na) Quelle distance a-t-il courue, en mètres ?\nb) Comparée à 2 km, c'est : A) plus B) moins C) autant",
          correction:
            "a) 1 km 200 m = $1\\,000 + 200 = 1\\,200$ m.\nJ'ajoute les 800 m : $1\\,200 + 800 = 2\\,000$ m.\nb) 2 km = $2\\,000$ m. Paul a couru $2\\,000$ m : c'est autant. Réponse C.\n⛔ Le piège : écrire « 1 km 1 000 m » et s'arrêter là. 1 000 m, c'est 1 km de plus : 2 km en tout.\nRéponse : a) $2\\,000$ ; b) C.",
          micros: ["longueur_convertir", "longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "2000" },
            { question: "b)", attendu: ["C", "C) autant", "autant"] },
          ],
        },
        {
          enonce: "Un infirmier scolaire mesure les élèves.\nInès mesure 1,32 m. Ravi mesure 128 cm.\na) Écris la taille d'Inès en centimètres.\nb) Qui est le plus grand ?\nc) De combien de centimètres ?",
          correction:
            "a) 1,32 m, c'est 1 m et 32 cm. 1 m = 100 cm.\nDonc 1,32 m = $100 + 32 = 132$ cm.\nb) Je compare : 132 cm > 128 cm. Inès est la plus grande.\nc) $132 - 128 = 4$ cm.\n⛔ Le piège : lire 1,32 m comme « 1 m 32 mm ». Après la virgule des mètres, ce sont des centimètres.\nRéponse : a) 132 ; b) Inès ; c) 4.",
          micros: ["longueur_convertir", "longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "132" },
            { question: "b)", attendu: ["Inès"] },
            { question: "c)", attendu: "4" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque longueur dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, souvent la plus petite, et j'y écris toutes les longueurs.",
        "Pour savoir combien de fois une longueur tient dans une autre, j'ajoute cette longueur jusqu'à dépasser.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "Les robes de la couturière",
          enonce: "Sofia est couturière. Elle a 5 m de tissu.\nPour une robe, il faut 1 m 50 cm de tissu.\na) Combien de robes entières peut-elle coudre ?\nb) Combien de centimètres de tissu restent ?",
          correction:
            "Je mets tout en centimètres. 5 m = 500 cm. 1 m 50 cm = $100 + 50 = 150$ cm.\na) J'ajoute 150 cm robe après robe.\n1 robe : 150 cm. 2 robes : 300 cm. 3 robes : 450 cm. 4 robes : 600 cm.\n600 cm, c'est plus que 500 cm. Elle peut coudre 3 robes.\nb) Elle utilise 450 cm. Il reste $500 - 450 = 50$ cm.\n⛔ Le piège : répondre 5 robes, une par mètre. Une robe prend plus d'un mètre.\nRéponse : a) 3 ; b) 50.",
          micros: ["longueur_convertir", "longueur_defi"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: "50" },
          ],
        },
        {
          titre: "Le sentier du guide",
          enonce: "Yanis est guide de montagne à La Réunion. Il prépare une randonnée de 12 km au Maïdo.\nLe groupe fait une pause après 4 km 500 m.\na) Quelle distance le groupe a-t-il faite, en mètres ?\nb) Quelle distance reste-t-il, en mètres ?\nc) Le groupe a fait : A) plus de la moitié B) moins de la moitié C) pile la moitié",
          correction:
            "Je mets tout en mètres. 12 km = $12\\,000$ m.\na) 4 km 500 m = $4\\,000 + 500 = 4\\,500$ m.\nb) $12\\,000 - 4\\,500 = 7\\,500$ m.\nJe vérifie : $4\\,500 + 7\\,500 = 12\\,000$.\nc) La moitié de 12 km, c'est 6 km, donc $6\\,000$ m.\n$4\\,500$ m < $6\\,000$ m : moins de la moitié. Réponse B.\n⛔ Le piège : calculer $12 - 4 = 8$ km et oublier les 500 m.\nRéponse : a) $4\\,500$ ; b) $7\\,500$ ; c) B.",
          micros: ["longueur_convertir", "longueur_comparer", "longueur_defi"],
          reponses: [
            { question: "a)", attendu: "4500" },
            { question: "b)", attendu: "7500" },
            { question: "c)", attendu: ["B", "B) moins de la moitié"] },
          ],
        },
        {
          titre: "Les étagères du menuisier",
          enonce: "Karim est menuisier. Il a une planche de 2 m.\nIl coupe 4 étagères de 45 cm chacune.\na) Quelle longueur a-t-il coupée en tout, en centimètres ?\nb) Combien de centimètres de planche restent ?\nc) Peut-il couper une 5e étagère de 45 cm ? Réponds oui ou non.",
          correction:
            "Je mets tout en centimètres : 2 m = 200 cm.\na) 4 étagères de 45 cm : $4 \\times 45 = 180$ cm.\nb) $200 - 180 = 20$ cm.\nc) Il reste 20 cm. Une étagère demande 45 cm. 20 < 45 : non.\n⛔ Le piège : oublier le reste. Je fais toujours la soustraction pour savoir ce qui reste.\nRéponse : a) 180 ; b) 20 ; c) non.",
          micros: ["longueur_convertir", "longueur_defi"],
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
        },
        {
          titre: "Le relais de l'entraîneuse",
          enonce: "Une entraîneuse d'athlétisme prépare un relais.\n4 coureurs courent chacun un tour de piste de 400 m.\na) Quelle distance courent-ils en tout, en mètres ?\nb) Combien de mètres manque-t-il pour faire 2 km ?\nc) Écris la distance du a) en km et m : … km … m.",
          correction:
            "a) 4 tours de 400 m : $4 \\times 400 = 1\\,600$ m.\nb) 2 km = $2\\,000$ m. $2\\,000 - 1\\,600 = 400$ m. Un tour de plus !\nc) $1\\,600$ m = $1\\,000$ m + 600 m. Et $1\\,000$ m = 1 km.\nDonc $1\\,600$ m = 1 km 600 m.\n⛔ Le piège : écrire $1\\,600$ m = 16 km. 1 km, c'est $1\\,000$ m : $1\\,600$ m, c'est à peine plus d'un kilomètre.\nRéponse : a) $1\\,600$ ; b) 400 ; c) 1 km 600 m.",
          micros: ["longueur_convertir", "longueur_defi"],
          reponses: [
            { question: "a)", attendu: "1600" },
            { question: "b)", attendu: "400" },
            { question: "c) km", attendu: "1" },
            { question: "c) m", attendu: "600" },
          ],
        },
      ],
    },
  ],
};
