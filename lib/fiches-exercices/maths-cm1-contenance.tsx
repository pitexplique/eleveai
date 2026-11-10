// ─── Fiche d'exercices : les contenances (CM1) — 20 exercices corrigés ────────
//
// 10/11/2026 : la feuille interactive de la notion `contenance` du coach CM1
// (4 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cm1/maths/contenance.bank.ts` : L, cL, mL) et
// sur la carte mentale `cm1/contenance` (lib/cartes/remplies/cm1.json).
// ⛔ LIMITES DU CM1 : L, cL et mL seulement (pas de dL, hL), des entiers.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, signe, un nombre, un mot.
//
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 250 L » vaut 250) : chaque conversion
// IMPOSE l'unité dans l'énoncé (« en centilitres ») et l'élève écrit le nombre
// seul. Les QCM se répondent par la LETTRE (ou « B) 5 mL »). Le rangement par
// LETTRES séparées par « ; ».
//
// Les pièges nommés : 3 L = 300 mL (1, 9), lire le trait du dessous au lieu
// du niveau (2, 11), comparer 75 et 1 sans les unités (3, 8, 12), une
// contenance absurde (4, 13), cL pour une baignoire (5), 300 cL = 30 L (6),
// 1 L = 100 mL (7), 2 L 5 cL = 250 cL (9), 1 ÷ 20 (10), 1 + 75 (14), oublier
// l'unité de la cuillère (15), 6 × 50 = 300 L (16), 6 seaux pour 25 L déjà
// versés (17), 12 × 50 = 600 L (18), arrondir 11 verres trop tôt (19),
// 3 bouteilles pour 480 cL (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (10, 14, 19), santé (15, sirop),
// pique-nique (16), aquarium (17), jardin (18), fête de classe (20), maison
// (5). Les métiers : pharmacien (15), soigneuse d'aquarium (17), jardinier
// (18), cuisinier (19), animatrice (20).
// AUCUN contexte réunionnais sur cette feuille (règle : ≈ 1 sur 25).
//
// ⭐ FAITS : aucun fait réel sourcé. La canette de 33 cL est le format
// courant des boissons, donné comme une estimation (déjà dans la carte
// mentale cm1/contenance) ; tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : des verres doseurs gradués (`doseurs`), le liquide à son
// niveau, les graduations écrites à droite.
//
// Micro-compétences : contenance_comparer (2, 3, 7, 8, 11, 12), contenance_convertir
// (1, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20), contenance_estimer
// (4, 5, 13), contenance_defi (10, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/**
 * Des verres doseurs côte à côte : chacun gradué de 0 à `max` par pas de
 * `pas` (le nombre écrit à droite de chaque trait, avec `unite`), le liquide
 * jusqu'au `niveau`. Texte nu, pas de KaTeX.
 */
const doseurs = (liste: { max: number; pas: number; niveau: number; unite: string; label: string; couleur?: string }[]) => {
  const [larg, haut, y0] = [56, 170, 14];
  const W = liste.length * 150;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]" style={{ maxWidth: liste.length === 1 ? "11rem" : undefined }}>
      <svg viewBox={`0 0 ${W} ${haut + y0 + 34}`} className="block h-auto w-full" role="img" aria-label="Verres doseurs gradués">
        {liste.map((d, i) => {
          const x0 = 22 + i * 150;
          const y = (v: number) => y0 + haut - (v / d.max) * haut;
          const traits = Array.from({ length: Math.round(d.max / d.pas) + 1 }, (_, k) => k * d.pas);
          return (
            <g key={i}>
              <rect x={x0} y={y(d.niveau)} width={larg} height={y(0) - y(d.niveau)} fill={d.couleur ?? BLEU} opacity={0.55} />
              <path d={`M ${x0} ${y0 - 6} L ${x0} ${y(0)} L ${x0 + larg} ${y(0)} L ${x0 + larg} ${y0 - 6}`} fill="none" stroke={NOIR} strokeWidth={2} />
              {traits.map((v) =>
                v === 0 ? null : (
                  <g key={v}>
                    <line x1={x0 + larg - 16} y1={y(v)} x2={x0 + larg} y2={y(v)} stroke={NOIR} strokeWidth={1.3} />
                    <text x={x0 + larg + 5} y={y(v) + 4} fontSize="11" fontWeight="700" fill={NOIR}>
                      {v >= 1000 ? `${Math.floor(v / 1000)} ${String(v % 1000).padStart(3, "0")}` : v} {d.unite}
                    </text>
                  </g>
                ),
              )}
              <text x={x0 + larg / 2} y={y(0) + 22} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesContenanceCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "contenance",
  titre: "Les contenances",
  accroche:
    "Vingt exercices, du geste seul au problème. Passer des litres aux centilitres et aux millilitres. Lire un verre doseur. Comparer deux contenances, estimer ce que contient un objet. Une carafe et des verres, un sirop, un aquarium, un arrosoir, une limonade et le goûter de la classe. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, dans l'unité demandée.",
      rappel: [
        "1 L = 100 cL. 1 L = 1 000 mL. 1 cL = 10 mL.",
        "Pour comparer deux contenances, je les écris d'abord dans la même unité.",
        "Sur un verre doseur, je lis le trait à la hauteur du liquide.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 2 L = … cL\nb) 3 L = … mL\nc) 5 cL = … mL\nd) 400 cL = … L",
          correction:
            "J'utilise les égalités du rappel.\na) 1 L = 100 cL. Donc 2 L, c'est $2 \\times 100 = 200$ cL.\nb) 1 L = $1\\,000$ mL. Donc 3 L, c'est $3 \\times 1\\,000 = 3\\,000$ mL.\nc) 1 cL = 10 mL. Donc 5 cL, c'est $5 \\times 10 = 50$ mL.\nd) Dans 400 cL, il y a 4 fois 100 cL. Donc 400 cL = 4 L.\n⛔ Le piège : écrire 3 L = 300 mL. 100, c'est pour les cL. Pour les mL, c'est $1\\,000$.\nRéponse : a) 200 ; b) $3\\,000$ ; c) 50 ; d) 4.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "3000" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "4" },
          ],
        },
        {
          enonce: "Lis chaque verre doseur.\na) Combien de centilitres de lait dans le verre A ?\nb) Combien de millilitres d'eau dans le verre B ?",
          figure: doseurs([
            { max: 100, pas: 10, niveau: 60, unite: "cL", label: "A", couleur: "#94a3b8" },
            { max: 500, pas: 50, niveau: 350, unite: "mL", label: "B" },
          ]),
          correction:
            "Je regarde le trait à la hauteur du liquide, et le nombre écrit à côté.\na) Verre A : le lait arrive au trait « 60 cL ». Il y a 60 cL.\nb) Verre B : chaque trait ajoute 50 mL. L'eau arrive au trait « 350 mL ». Il y a 350 mL.\n⛔ Le piège : compter les traits au lieu de lire les nombres. Dans le verre B, 7 traits valent $7 \\times 50 = 350$ mL, pas 7 mL.\nRéponse : a) 60 ; b) 350.",
          micros: ["contenance_comparer"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "350" },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 75 cL … 1 L\nb) 2 L … 200 cL\nc) 1 L … 900 mL\nd) 3 L … 2 500 mL",
          correction:
            "J'écris les deux contenances dans la même unité, puis je compare.\na) 1 L = 100 cL. 75 cL est moins que 100 cL. Donc 75 cL < 1 L.\nb) 2 L = 200 cL. Les deux sont égales. Donc 2 L = 200 cL.\nc) 1 L = $1\\,000$ mL. $1\\,000$ mL est plus que 900 mL. Donc 1 L > 900 mL.\nd) 3 L = $3\\,000$ mL. $3\\,000$ mL est plus que $2\\,500$ mL. Donc 3 L > $2\\,500$ mL.\n⛔ Le piège : comparer 75 et 1 sans les unités. 75 cL, c'est moins qu'un litre.\nRéponse : a) < ; b) = ; c) > ; d) >.",
          micros: ["contenance_comparer"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Choisis la bonne contenance. Écris la lettre.\na) Une petite cuillère : A) 5 L B) 5 mL C) 5 cL\nb) Un seau : A) 10 L B) 10 cL C) 100 L\nc) Une canette : A) 33 mL B) 3 L C) 33 cL",
          correction:
            "Je compare à une bouteille d'eau de 1 L.\na) Une petite cuillère contient très peu : environ 5 mL. 5 cL, c'est déjà un petit verre de sirop. Réponse B.\nb) Un seau se remplit avec une dizaine de bouteilles : environ 10 L. 100 L, c'est une baignoire. Réponse A.\nc) Une canette contient un peu moins qu'une demi-bouteille : 33 cL. Réponse C.\n⛔ Le piège : choisir 33 mL pour la canette parce que le nombre est le même. 33 mL, c'est moins de sept petites cuillères.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["contenance_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 5 mL"] },
            { question: "b)", attendu: ["A", "A) 10 L"] },
            { question: "c)", attendu: ["C", "C) 33 cL"] },
          ],
        },
        {
          enonce: "Quelle unité choisir : L ou mL ?\na) L'eau d'une baignoire\nb) Une petite fiole de parfum\nc) L'eau d'un aquarium\nd) Une cuillère de sirop",
          correction:
            "Je compare à une bouteille d'eau de 1 L.\na) Une baignoire contient beaucoup de bouteilles : L.\nb) Une petite fiole contient bien moins qu'une bouteille : mL.\nc) Un aquarium contient plusieurs bouteilles : L.\nd) Une cuillère contient quelques millilitres : mL.\n⛔ Le piège : choisir mL pour tout ce qui est « de l'eau ». Pour beaucoup d'eau, c'est le litre.\nRéponse : a) L ; b) mL ; c) L ; d) mL.",
          micros: ["contenance_estimer"],
          reponses: [
            { question: "a)", attendu: ["L", "litre", "litres"] },
            { question: "b)", attendu: ["mL", "millilitre", "millilitres"] },
            { question: "c)", attendu: ["L", "litre", "litres"] },
            { question: "d)", attendu: ["mL", "millilitre", "millilitres"] },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 300 cL = … L\nb) 2 000 mL = … L\nc) 80 mL = … cL",
          correction:
            "Je cherche combien de fois la grande unité tient dedans.\na) 100 cL = 1 L. Dans 300 cL, il y a 3 fois 100 cL. Donc 300 cL = 3 L.\nb) $1\\,000$ mL = 1 L. Dans $2\\,000$ mL, il y a 2 fois $1\\,000$ mL. Donc $2\\,000$ mL = 2 L.\nc) 10 mL = 1 cL. Dans 80 mL, il y a 8 fois 10 mL. Donc 80 mL = 8 cL.\n⛔ Le piège : écrire 300 cL = 30 L. Je divise par 100, pas par 10.\nRéponse : a) 3 ; b) 2 ; c) 8.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "8" },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 L = 100 mL\nb) 1 cL = 10 mL\nc) 50 cL, c'est la moitié de 1 L.\nd) 1 L = 10 cL",
          correction:
            "Je relis les égalités du rappel.\na) 1 L = $1\\,000$ mL, pas 100 mL. Faux.\nb) 1 cL = 10 mL. Vrai.\nc) 1 L = 100 cL. La moitié : $100 \\div 2 = 50$ cL. Vrai.\nd) 1 L = 100 cL, pas 10 cL. Faux.\n⛔ Le piège : mélanger les cL et les mL. 1 L, c'est 100 cL, ou $1\\,000$ mL.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          micros: ["contenance_convertir", "contenance_comparer"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "Quatre bouteilles :\nA = 80 cL ; B = 1 L ; C = 950 mL ; D = 1 500 mL.\nRange-les de la plus petite à la plus grande contenance.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les contenances en millilitres.\nA = 80 cL = $80 \\times 10 = 800$ mL.\nB = 1 L = $1\\,000$ mL.\nC = 950 mL.\nD = $1\\,500$ mL.\nJe range : 800 < 950 < $1\\,000$ < $1\\,500$.\nDonc A, puis C, puis B, puis D.\n⛔ Le piège : mettre B en premier parce que « 1 » est un petit nombre. 1 L, c'est $1\\,000$ mL.\nRéponse : A ; C ; B ; D.",
          micros: ["contenance_comparer", "contenance_convertir"],
          reponses: [{ attendu: ["A ; C ; B ; D", "A < C < B < D", "A, C, B, D"], ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je mets tout dans la petite unité AVANT de calculer.",
      rappel: [
        "De L en cL : × 100. De L en mL : × 1 000. De cL en mL : × 10.",
        "1 L 25 cL = 100 cL + 25 cL = 125 cL.",
        "Pour un partage, je mets tout dans la même unité, puis je cherche combien de fois la petite quantité tient dans la grande.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 1 L 25 cL = … cL\nb) 2 L 5 cL = … cL\nc) 350 cL = … L … cL\nd) 1 L 500 mL = … mL",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 1 L = 100 cL. Donc 1 L 25 cL = $100 + 25 = 125$ cL.\nb) 2 L = 200 cL. Donc 2 L 5 cL = $200 + 5 = 205$ cL.\nc) 350 cL = 300 cL + 50 cL = 3 L 50 cL.\nd) 1 L = $1\\,000$ mL. Donc 1 L 500 mL = $1\\,000 + 500 = 1\\,500$ mL.\n⛔ Le piège du b) : écrire 250 cL. Il y a 5 cL, pas 50 : $200 + 5 = 205$.\nRéponse : a) 125 ; b) 205 ; c) 3 L 50 cL ; d) $1\\,500$.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "125" },
            { question: "b)", attendu: "205" },
            { question: "c) L", attendu: "3" },
            { question: "c) cL", attendu: "50" },
            { question: "d)", attendu: "1500" },
          ],
        },
        {
          enonce: "Ana a une carafe pleine de 1 L d'eau.\na) Combien de verres de 20 cL peut-elle remplir ?\nb) Et avec des verres de 25 cL ?",
          correction:
            "Je mets tout en centilitres : 1 L = 100 cL.\na) Combien de fois 20 cL dans 100 cL ? $5 \\times 20 = 100$. 5 verres.\nb) Combien de fois 25 cL dans 100 cL ? $4 \\times 25 = 100$. 4 verres.\nLes verres sont plus grands : il y en a moins.\n⛔ Le piège : vouloir calculer $1 \\div 20$. J'écris d'abord 1 L = 100 cL.\nRéponse : a) 5 ; b) 4.",
          micros: ["contenance_convertir", "contenance_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Le verre doseur est gradué en millilitres.\na) Combien de millilitres de jus y a-t-il ?\nb) Combien de millilitres faut-il ajouter pour avoir 1 L ?",
          figure: doseurs([{ max: 1000, pas: 100, niveau: 700, unite: "mL", label: "jus", couleur: "#f59e0b" }]),
          correction:
            "a) Le jus arrive au trait « 700 mL ». Il y a 700 mL.\nb) 1 L = $1\\,000$ mL. Il manque $1\\,000 - 700 = 300$ mL.\n⛔ Le piège : répondre 3 mL, en comptant les 3 traits vides. Chaque trait vaut 100 mL : $3 \\times 100 = 300$.\nRéponse : a) 700 ; b) 300.",
          micros: ["contenance_comparer", "contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "700" },
            { question: "b)", attendu: "300" },
          ],
        },
        {
          enonce: "Trois bouteilles de jus :\norange : 1 L 50 cL ; pomme : 1 200 mL ; raisin : 125 cL.\na) Quelle bouteille contient le plus ?\nb) Quelle bouteille contient le moins ?",
          correction:
            "J'écris les trois contenances en centilitres.\nOrange : 1 L 50 cL = $100 + 50 = 150$ cL.\nPomme : $1\\,200$ mL. 10 mL = 1 cL, donc $1\\,200$ mL = 120 cL.\nRaisin : 125 cL.\nJe range : 120 < 125 < 150.\na) Le plus : l'orange.\nb) Le moins : la pomme.\n⛔ Le piège : croire que la pomme gagne parce que $1\\,200$ est un grand nombre. Ce sont des mL, l'unité la plus petite.\nRéponse : a) orange ; b) pomme.",
          micros: ["contenance_comparer", "contenance_convertir"],
          reponses: [
            { question: "a)", attendu: ["orange", "l'orange", "jus d'orange", "la bouteille d'orange"] },
            { question: "b)", attendu: ["pomme", "la pomme", "jus de pomme", "la bouteille de pomme"] },
          ],
        },
        {
          enonce: "Choisis la bonne contenance. Écris la lettre.\na) Un bol de soupe : A) 30 cL B) 30 L C) 3 mL\nb) Un arrosoir : A) 8 mL B) 8 L C) 80 L\nc) Une bouteille de lait : A) 1 mL B) 10 L C) 1 L",
          correction:
            "Je compare à une bouteille d'eau de 1 L.\na) Un bol contient un peu moins d'un tiers de bouteille : environ 30 cL. Réponse A.\nb) Un arrosoir se remplit avec plusieurs bouteilles : environ 8 L. 80 L, c'est presque une baignoire. Réponse B.\nc) Une bouteille de lait : 1 L. Réponse C.\n⛔ Le piège : choisir 3 mL pour la soupe. 3 mL, c'est moins d'une petite cuillère.\nRéponse : a) A ; b) B ; c) C.",
          micros: ["contenance_estimer"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 30 cL"] },
            { question: "b)", attendu: ["B", "B) 8 L"] },
            { question: "c)", attendu: ["C", "C) 1 L"] },
          ],
        },
        {
          enonce: "Pour une soupe, Élif met 1 L d'eau et 75 cL de lait dans une casserole.\na) Combien de liquide y a-t-il, en centilitres ?\nb) La casserole contient 2 L au plus. Combien de centilitres de place reste-t-il ?",
          correction:
            "a) Je mets tout en centilitres : 1 L = 100 cL.\n$100 + 75 = 175$ cL.\nb) 2 L = 200 cL. $200 - 175 = 25$ cL.\n⛔ Le piège : calculer $1 + 75 = 76$. Le 1 compte des litres, pas des centilitres.\nRéponse : a) 175 ; b) 25.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "175" },
            { question: "b)", attendu: "25" },
          ],
        },
        {
          enonce: "Le pharmacien donne un flacon de sirop de 150 mL.\nUne cuillère contient 5 mL.\na) Combien de cuillères y a-t-il dans le flacon ?\nb) On prend 3 cuillères par jour. Le flacon dure combien de jours ?",
          correction:
            "a) Combien de fois 5 mL dans 150 mL ?\n$150 \\div 5 = 30$, car $30 \\times 5 = 150$. 30 cuillères.\nb) 3 cuillères par jour : $30 \\div 3 = 10$ jours.\n⛔ Le piège : faire $150 \\div 3 = 50$ jours. On divise les CUILLÈRES par 3, pas les millilitres.\nRéponse : a) 30 ; b) 10.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Pour un pique-nique, Théo emporte 6 bouteilles de 50 cL.\na) Combien de centilitres en tout ?\nb) Écris ce total en litres.",
          correction:
            "a) $6 \\times 50 = 300$ cL.\nb) 100 cL = 1 L. Dans 300 cL, il y a 3 fois 100 cL. Donc 3 L.\n⛔ Le piège : écrire 300 L. Ce sont des centilitres : 300 cL, c'est 3 L, trois bouteilles d'eau.\nRéponse : a) 300 ; b) 3.",
          micros: ["contenance_convertir"],
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "3" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque contenance dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, souvent la plus petite, et j'y écris toutes les contenances.",
        "Combien de récipients ? Je cherche combien de fois le petit tient dans le grand. S'il reste un peu, il faut un récipient de plus.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "L'aquarium de la soigneuse",
          enonce: "Maya est soigneuse dans un aquarium. Elle remplit un bassin de 60 L avec un seau de 10 L.\na) Combien de seaux faut-il pour le bassin vide ?\nb) Un autre jour, il y a déjà 25 L d'eau. Elle prend un seau de 5 L. Combien de seaux faut-il pour finir ?",
          correction:
            "a) Combien de fois 10 L dans 60 L ? $6 \\times 10 = 60$. 6 seaux.\nb) Il manque $60 - 25 = 35$ L.\nCombien de fois 5 L dans 35 L ? $7 \\times 5 = 35$. 7 seaux.\n⛔ Le piège du b) : répondre $60 \\div 5 = 12$ seaux. Il y a déjà 25 L : je ne verse que ce qui manque.\nRéponse : a) 6 ; b) 7.",
          micros: ["contenance_convertir", "contenance_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          titre: "L'arrosoir du jardinier",
          enonce: "Hugo est jardinier. Son arrosoir contient 8 L.\nIl arrose 12 plants. Chaque plant reçoit 50 cL.\na) Combien de centilitres d'eau faut-il en tout ?\nb) Écris ce total en litres.\nc) Un seul arrosoir plein suffit-il ? Réponds oui ou non.",
          correction:
            "a) $12 \\times 50 = 600$ cL.\nb) 100 cL = 1 L. Dans 600 cL, il y a 6 fois 100 cL : 6 L.\nc) L'arrosoir contient 8 L. 6 L < 8 L : oui, il suffit. Il restera $8 - 6 = 2$ L.\n⛔ Le piège : écrire 600 L. Ce sont des centilitres : 600 cL = 6 L.\nRéponse : a) 600 ; b) 6 ; c) oui.",
          micros: ["contenance_convertir", "contenance_comparer", "contenance_defi"],
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          titre: "La limonade du cuisinier",
          enonce: "Un cuisinier prépare une limonade : 2 L d'eau, 50 cL de jus de citron et 25 cL de sirop.\na) Combien de centilitres de limonade en tout ?\nb) Combien de verres de 25 cL peut-il servir ?",
          correction:
            "a) Je mets tout en centilitres : 2 L = 200 cL.\n$200 + 50 + 25 = 275$ cL.\nb) Combien de fois 25 cL dans 275 cL ?\n4 verres font 100 cL. Donc 8 verres font 200 cL, et 3 verres de plus font 75 cL.\n$8 + 3 = 11$ verres. Je vérifie : $11 \\times 25 = 275$.\n⛔ Le piège : calculer $2 + 50 + 25 = 77$. Les 2 sont des litres : 200 cL.\nRéponse : a) 275 ; b) 11.",
          micros: ["contenance_convertir", "contenance_defi"],
          reponses: [
            { question: "a)", attendu: "275" },
            { question: "b)", attendu: ["11", "onze"] },
          ],
        },
        {
          titre: "Le goûter de l'animatrice",
          enonce: "Une animatrice prépare le goûter de 24 enfants. Chaque enfant boit 20 cL de jus.\nUne bouteille contient 1 L 50 cL.\na) Combien de centilitres de jus faut-il ?\nb) Combien de bouteilles faut-il acheter ?\nc) Combien de centilitres restera-t-il ?",
          correction:
            "a) $24 \\times 20 = 480$ cL.\nb) Une bouteille : 1 L 50 cL = $100 + 50 = 150$ cL.\n3 bouteilles : $3 \\times 150 = 450$ cL. C'est moins que 480 cL : pas assez.\n4 bouteilles : $4 \\times 150 = 600$ cL. C'est assez. Il faut 4 bouteilles.\nc) $600 - 480 = 120$ cL.\n⛔ Le piège : acheter 3 bouteilles. Il manquerait $480 - 450 = 30$ cL : un enfant et demi sans jus.\nRéponse : a) 480 ; b) 4 ; c) 120.",
          micros: ["contenance_convertir", "contenance_defi"],
          reponses: [
            { question: "a)", attendu: "480" },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: "120" },
          ],
        },
      ],
    },
  ],
};
