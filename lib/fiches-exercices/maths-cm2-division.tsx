// ─── Fiche d'exercices : la division (CM2) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : feuille INTERACTIVE du lot CM2 (session fiches-cm2), sur le ton
// des feuilles CM2 (`maths-cm2-fraction.tsx`) : phrases courtes, corrigés à la
// première personne, un rappel avant chaque niveau.
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (clé `cm2/division`) et sur les 8 micros du coach (notionId division) : sens
// de la division, lien avec la multiplication, division posée, continuer après
// la virgule, décimal ÷ entier, le reste, problèmes, défis.
// ⛔ Division écrite « ÷ », jamais avec une barre de fraction (Frédéric, 06/10).
// ⛔ LIMITES DU CM2 : le diviseur est toujours un ENTIER (au plus deux chiffres).
// ⛔ AUCUNE QUESTION OUVERTE (règle CM1/CM2) : des nombres, vrai/faux, et des
// QCM A/B/C (bonnes réponses : A au 1 ; B au 8 ; C au 11 ; A au 15). Le
// quotient et le reste se tapent dans DEUX cases (« 7 reste 5 » ne se vérifie
// pas comme un nombre).
//
// Micro-compétences par exercice :
//   1 division_sens · 2 division_lien_multiplication · 3 division_posee ·
//   4 division_reste · 5 division_lien_multiplication · 6 division_decimale_posee ·
//   7 division_decimale_dividende · 8 division_reste, division_sens ·
//   9 division_posee · 10 division_posee, division_reste ·
//   11 division_decimale_posee · 12 division_decimale_dividende ·
//   13 division_reste, division_probleme · 14 division_probleme, division_decimale_dividende, division_sens ·
//   15 division_lien_multiplication, division_sens ·
//   16 division_probleme, division_reste, division_defi ·
//   17 division_probleme, division_decimale_dividende ·
//   18 division_probleme, division_decimale_posee ·
//   19 division_probleme, division_reste, division_posee, division_defi ·
//   20 division_defi, division_reste. 8/8.
//
// Les pièges nommés : des parts différentes, × au lieu de ÷ (1, 14), la
// division retournée (2, 5, 15), une seule dizaine oubliée (3), un reste plus
// grand que le diviseur (4, 10), la virgule oubliée au quotient (6, 7, 11, 12,
// 17), « 7 voitures » (8, 16), le 0 du quotient (9), la page pas pleine (13),
// le reste écrit après la virgule (18), le reste confondu avec ce qui manque
// (19), un indice oublié (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : loisirs (1, animatrice), sortie (8, 16),
// photos (13), couture (14, couturière), zoo (16), confiture (17,
// confiturière), sport (18, relais), jardin (19, jardinier). Aucun fait réel :
// tout est un MODÈLE.
//
// ⭐ LES DESSINS : la division posée en potence (`potence`), avec ses
// soustractions sous le dividende et le quotient en bleu.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Etape = { t: string; fin: number; trait?: boolean };

/**
 * LA DIVISION POSÉE (potence) : le dividende en haut à gauche, le diviseur à
 * droite du trait, le quotient dessous en bleu. Chaque étape s'aligne sur la
 * colonne `fin` du dividende (0 = son premier chiffre) ; `trait` tire le trait
 * de la soustraction. La virgule du dividende se pose ENTRE deux colonnes.
 */
const potence = (dividende: string, diviseur: string, quotient: string, etapes: Etape[]) => {
  const W = 300;
  const cw = 20;
  const x0 = 70;
  const chiffres = dividende.replace(/[^0-9]/g, "");
  const n = chiffres.length;
  const X = (c: number) => x0 + c * cw + cw / 2;
  const xL = x0 + n * cw + 10;
  const hl = 24;
  const H = 34 + etapes.length * hl + 8;
  const virgule = dividende.indexOf(",");
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Division posée">
        {chiffres.split("").map((ch, i) => (
          <text key={`d${i}`} x={X(i)} y={24} textAnchor="middle" fontSize="18" fontWeight="800" fill={NOIR}>
            {ch}
          </text>
        ))}
        {virgule > 0 ? (
          <text x={x0 + virgule * cw} y={27} textAnchor="middle" fontSize="18" fontWeight="900" fill={ORANGE}>
            ,
          </text>
        ) : null}
        <line x1={xL} y1={6} x2={xL} y2={H - 4} stroke={NOIR} strokeWidth={2} />
        <line x1={xL} y1={32} x2={Math.min(W - 6, xL + 90)} y2={32} stroke={NOIR} strokeWidth={2} />
        <text x={xL + 10} y={24} fontSize="18" fontWeight="800" fill={NOIR}>
          {diviseur}
        </text>
        <text x={xL + 10} y={54} fontSize="18" fontWeight="800" fill={BLEU}>
          {quotient}
        </text>
        {etapes.map((e, k) => {
          const y = 24 + (k + 1) * hl;
          const cars = e.t.split("");
          return (
            <g key={`e${k}`}>
              {cars.map((ch, j) => (
                <text key={j} x={X(e.fin - (cars.length - 1 - j))} y={y} textAnchor="middle" fontSize="18" fontWeight="700" fill={ch === "−" ? ROUGE : NOIR}>
                  {ch}
                </text>
              ))}
              {e.trait ? <line x1={x0 + (e.fin - cars.length + 1) * cw - 2} y1={y + 6} x2={x0 + (e.fin + 1) * cw + 2} y2={y + 6} stroke={NOIR} strokeWidth={1.6} /> : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesDivisionCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "division",
  titre: "La division",
  accroche:
    "Vingt exercices, du geste seul au problème. Partager en parts égales. Vérifier une division avec une multiplication. Poser une division. Comprendre le reste. Continuer après la virgule. Puis des problèmes : des voitures, un album photo, du tissu, des cars, de la confiture, une course de relais et un jardin. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/division", titre: "La division" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche dans les tables, puis je vérifie avec une multiplication.",
      rappel: [
        "Diviser, c'est partager en parts égales, ou chercher combien de fois un nombre rentre dans un autre.",
        "Une division se vérifie avec une multiplication : 56 ÷ 8 = 7 car 8 × 7 = 56.",
        "Le reste est toujours plus petit que le diviseur.",
        "S'il reste quelque chose, je peux continuer : je mets une virgule au quotient et j'ajoute un 0.",
      ],
      exercices: [
        {
          enonce:
            "Une animatrice prépare des jeux.\na) Elle partage 36 billes entre 4 enfants, en parts égales. Combien de billes pour chacun ?\nb) Elle range 48 livres sur 6 étagères, autant sur chaque étagère. Combien de livres par étagère ?\nc) 28 enfants font des équipes de 4. Quel calcul donne le nombre d'équipes ?\nA) 28 ÷ 4   B) 28 × 4   C) 28 − 4\nd) Combien d'équipes y a-t-il ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "7" },
          ],
          correction:
            "Partager en parts égales, ou faire des groupes égaux : je divise.\na) 36 ÷ 4 = 9 billes chacun, car 4 × 9 = 36.\nb) 48 ÷ 6 = 8 livres par étagère, car 6 × 8 = 48.\nc) Je cherche combien de fois 4 rentre dans 28 : c'est 28 ÷ 4, la réponse A.\nd) 28 ÷ 4 = 7 équipes, car 4 × 7 = 28.\n⛔ Le piège du c) : choisir 28 × 4 = 112. Il y aurait plus d'équipes que d'enfants !\nRéponse : a) 9 ; b) 8 ; c) A ; d) 7.",
          micros: ["division_sens"],
        },
        {
          enonce: "Utilise les tables de multiplication.\na) 7 × 8 = 56, donc 56 ÷ 7 = …\nb) 63 ÷ 9 = …\nc) 48 ÷ 6 = …\nd) … ÷ 5 = 9",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "45" },
          ],
          correction:
            "Une division se lit dans une table de multiplication.\na) 7 × 8 = 56, donc 56 ÷ 7 = 8.\nb) Dans la table de 9 : 9 × 7 = 63. Donc 63 ÷ 9 = 7.\nc) Dans la table de 6 : 6 × 8 = 48. Donc 48 ÷ 6 = 8.\nd) Je cherche le nombre qui, divisé par 5, donne 9. C'est 5 × 9 = 45. Je vérifie : 45 ÷ 5 = 9.\n⛔ Le piège : retourner la division. 56 ÷ 7 = 8, mais 7 ÷ 56 ne fait pas 8.\nRéponse : a) 8 ; b) 7 ; c) 8 ; d) 45.",
          micros: ["division_lien_multiplication"],
        },
        {
          enonce: "Pose et calcule.\na) 96 ÷ 4\nb) 135 ÷ 5",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "27" },
          ],
          correction:
            "a) Dans 9 dizaines, combien de fois 4 ? 4 × 2 = 8 : 2 fois. Il reste 9 − 8 = 1 dizaine.\nJ'abaisse le 6 : 16. Dans 16, 4 rentre 4 fois : 4 × 4 = 16. Il reste 0.\n96 ÷ 4 = 24. Je vérifie : 4 × 24 = 96.\nb) 1 est plus petit que 5 : je prends 13 dizaines. 5 × 2 = 10 : 2 fois. Il reste 3.\nJ'abaisse le 5 : 35. 5 × 7 = 35. Il reste 0.\n135 ÷ 5 = 27. Je vérifie : 5 × 27 = 135.\n⛔ Le piège : oublier la dizaine qui reste. Au a), 9 ÷ 4 = 2 reste 1 : ce 1 se joint au 6 pour faire 16.\nRéponse : a) 24 ; b) 27.",
          schema: potence("96", "4", "24", [
            { t: "−8", fin: 0, trait: true },
            { t: "16", fin: 1 },
            { t: "−16", fin: 1, trait: true },
            { t: "0", fin: 1 },
          ]),
          micros: ["division_posee"],
        },
        {
          enonce: "a) Dans 47 ÷ 6, quel est le quotient ?\nb) Quel est le reste ?\nc) Dans 50 ÷ 8, quel est le quotient ?\nd) Quel est le reste ?",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "Je cherche le plus grand nombre de fois, sans dépasser.\na) 6 × 7 = 42 et 6 × 8 = 48. 48 dépasse 47. Le quotient est 7.\nb) 47 − 42 = 5. Le reste est 5. Il est bien plus petit que 6.\nJe vérifie : 6 × 7 + 5 = 42 + 5 = 47.\nc) 8 × 6 = 48 et 8 × 7 = 56. 56 dépasse 50. Le quotient est 6.\nd) 50 − 48 = 2. Le reste est 2.\n⛔ Le piège : garder un reste trop grand. « 47 ÷ 6 = 6 reste 11 » est faux : 11 est plus grand que 6, il rentre encore une fois.\nRéponse : a) 7 ; b) 5 ; c) 6 ; d) 2.",
          micros: ["division_reste"],
        },
        {
          enonce:
            "Vrai ou faux ? Vérifie avec une multiplication.\na) 84 ÷ 7 = 12\nb) 91 ÷ 7 = 12\nc) 8 ÷ 56 = 7\nd) 59 ÷ 7 = 8 reste 3",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "vrai" },
          ],
          correction:
            "Je vérifie avec une multiplication.\na) 7 × 12 = 70 + 14 = 84. Vrai.\nb) 7 × 12 = 84, pas 91. En fait, 7 × 13 = 91 : 91 ÷ 7 = 13. Faux.\nc) 8 est plus petit que 56. 8 ÷ 56 ne fait pas 7 : c'est 56 ÷ 8 = 7. Faux.\nd) 7 × 8 = 56, et 56 + 3 = 59. Le reste 3 est plus petit que 7. Vrai.\n⛔ Le piège du c) : lire la division à l'envers. L'ordre compte : 56 ÷ 8 n'est pas 8 ÷ 56.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          micros: ["division_lien_multiplication"],
        },
        {
          enonce: "Calcule. Continue après la virgule jusqu'à ce que le reste soit 0.\na) 9 ÷ 2\nb) 17 ÷ 4\nc) 3 ÷ 5",
          reponses: [
            { question: "a)", attendu: "4,5" },
            { question: "b)", attendu: "4,25" },
            { question: "c)", attendu: "0,6" },
          ],
          correction:
            "a) 9 ÷ 2 = 4, il reste 1. Je mets une virgule au quotient et j'ajoute un 0 : 1 unité = 10 dixièmes.\n10 ÷ 2 = 5 dixièmes. Donc 9 ÷ 2 = 4,5. Je vérifie : 2 × 4,5 = 9.\nb) 17 ÷ 4 = 4, il reste 1. Virgule. 10 dixièmes ÷ 4 = 2, il reste 2.\n20 centièmes ÷ 4 = 5. Donc 17 ÷ 4 = 4,25. Je vérifie : 4 × 4,25 = 17.\nc) 3 ÷ 5 = 0, il reste 3. Virgule. 30 dixièmes ÷ 5 = 6. Donc 3 ÷ 5 = 0,6.\n⛔ Le piège : oublier la virgule au quotient. 9 ÷ 2 = 4,5, pas 45.\nRéponse : a) 4,5 ; b) 4,25 ; c) 0,6.",
          micros: ["division_decimale_posee"],
        },
        {
          enonce: "Calcule.\na) 7,2 ÷ 3\nb) 9,5 ÷ 5\nc) 0,8 ÷ 2",
          reponses: [
            { question: "a)", attendu: "2,4" },
            { question: "b)", attendu: "1,9" },
            { question: "c)", attendu: "0,4" },
          ],
          correction:
            "Je divise comme d'habitude. Quand j'abaisse les dixièmes, je mets la virgule au quotient.\na) 7 ÷ 3 = 2, il reste 1. J'abaisse le 2 des dixièmes : virgule. 12 dixièmes ÷ 3 = 4 dixièmes. Donc 2,4.\nJe vérifie : 3 × 2,4 = 7,2.\nb) 9 ÷ 5 = 1, il reste 4. Virgule. 45 dixièmes ÷ 5 = 9 dixièmes. Donc 1,9.\nJe vérifie : 5 × 1,9 = 9,5.\nc) 0 ÷ 2 = 0. Virgule. 8 dixièmes ÷ 2 = 4 dixièmes. Donc 0,4.\n⛔ Le piège : placer la virgule au hasard. 7,2 ÷ 3 = 2,4, pas 24 ni 0,24. L'ordre de grandeur aide : 7 ÷ 3, c'est un peu plus que 2.\nRéponse : a) 2,4 ; b) 1,9 ; c) 0,4.",
          micros: ["division_decimale_dividende"],
        },
        {
          enonce:
            "29 enfants partent en sortie. Chaque voiture emmène 4 enfants.\na) Dans 29 ÷ 4, quel est le quotient ?\nb) Quel est le reste ?\nc) Combien de voitures faut-il ?\nA) 7   B) 8   C) 7,25",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) 4 × 7 = 28 et 4 × 8 = 32. Le quotient est 7.\nb) 29 − 28 = 1. Le reste est 1.\nc) 7 voitures emmènent 28 enfants. Il reste 1 enfant : il faut une voiture de plus. 7 + 1 = 8 voitures : B.\n⛔ Le piège : répondre 7 voitures. L'enfant du reste doit partir aussi ! Et 7,25 voitures, ça n'existe pas.\nRéponse : a) 7 ; b) 1 ; c) B (8 voitures).",
          micros: ["division_reste", "division_sens"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je pose au brouillon, et je vérifie toujours avec une multiplication.",
      rappel: [
        "Pour poser : combien de fois le diviseur rentre ? Je multiplie, je soustrais, j'abaisse le chiffre suivant.",
        "Avec un diviseur à 2 chiffres, j'écris d'abord sa table au brouillon : 12, 24, 36, 48…",
        "Selon la question, je garde le quotient, j'ajoute 1, ou je réponds avec le reste.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule.\na) 552 ÷ 12\nb) 875 ÷ 25",
          reponses: [
            { question: "a)", attendu: "46" },
            { question: "b)", attendu: "35" },
          ],
          correction:
            "a) J'écris la table de 12 : 12, 24, 36, 48, 60, 72.\n5 est plus petit que 12 : je prends 55 dizaines. 12 × 4 = 48 : 4 fois. Il reste 55 − 48 = 7.\nJ'abaisse le 2 : 72. 12 × 6 = 72. Il reste 0.\n552 ÷ 12 = 46. Je vérifie : 12 × 46 = 480 + 72 = 552.\nb) Je prends 87 dizaines. 25 × 3 = 75 : 3 fois. Il reste 87 − 75 = 12.\nJ'abaisse le 5 : 125. 25 × 5 = 125. Il reste 0.\n875 ÷ 25 = 35. Je vérifie : 25 × 35 = 750 + 125 = 875.\n⛔ Le piège : commencer par 5 ÷ 12. Le quotient n'a pas de chiffre des centaines : il a 2 chiffres.\nRéponse : a) 46 ; b) 35.",
          schema: potence("552", "12", "46", [
            { t: "−48", fin: 1, trait: true },
            { t: "72", fin: 2 },
            { t: "−72", fin: 2, trait: true },
            { t: "0", fin: 2 },
          ]),
          micros: ["division_posee"],
        },
        {
          enonce: "Pose la division 1 234 ÷ 8.\na) Quel est le quotient ?\nb) Quel est le reste ?\nc) Vérifie : calcule 8 × 154 + 2.",
          reponses: [
            { question: "a)", attendu: "154" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "1234" },
          ],
          correction:
            "1 est plus petit que 8 : je prends 12 centaines. 8 × 1 = 8 : 1 fois. Il reste 4.\nJ'abaisse le 3 : 43. 8 × 5 = 40 : 5 fois. Il reste 3.\nJ'abaisse le 4 : 34. 8 × 4 = 32 : 4 fois. Il reste 2.\na) Le quotient est 154.\nb) Le reste est 2. Il est plus petit que 8 : c'est fini.\nc) 8 × 154 = 1 232. Et 1 232 + 2 = 1 234 : c'est bien le nombre de départ.\n⛔ Le piège : s'arrêter avec un reste de 10 ou plus. À chaque étape, le reste doit être plus petit que 8.\nRéponse : a) 154 ; b) 2 ; c) 1 234.",
          schema: ecranSeulement(
            potence("1234", "8", "154", [
              { t: "−8", fin: 1, trait: true },
              { t: "43", fin: 2 },
              { t: "−40", fin: 2, trait: true },
              { t: "34", fin: 3 },
              { t: "−32", fin: 3, trait: true },
              { t: "2", fin: 3 },
            ]),
          ),
          micros: ["division_posee", "division_reste"],
        },
        {
          enonce: "Calcule en continuant après la virgule.\na) 45 ÷ 4\nb) 51 ÷ 6\nc) Où est la virgule ? 15 ÷ 4 = …\nA) 37,5   B) 375   C) 3,75",
          reponses: [
            { question: "a)", attendu: "11,25" },
            { question: "b)", attendu: "8,5" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "a) 45 ÷ 4 = 11, il reste 1. Virgule au quotient, j'ajoute un 0 : 10 dixièmes.\n10 ÷ 4 = 2, il reste 2. J'ajoute un 0 : 20 centièmes. 20 ÷ 4 = 5.\n45 ÷ 4 = 11,25. Je vérifie : 4 × 11,25 = 45.\nb) 51 ÷ 6 = 8, il reste 3. Virgule. 30 dixièmes ÷ 6 = 5. 51 ÷ 6 = 8,5.\nJe vérifie : 6 × 8,5 = 51.\nc) Ordre de grandeur : 4 × 4 = 16, donc 15 ÷ 4 est un peu moins que 4. C'est 3,75 : C.\n⛔ Le piège : oublier la virgule et écrire 375. Le résultat doit être proche de 4.\nRéponse : a) 11,25 ; b) 8,5 ; c) C.",
          schema: ecranSeulement(
            potence("45,00", "4", "11,25", [
              { t: "−4", fin: 0, trait: true },
              { t: "5", fin: 1 },
              { t: "−4", fin: 1, trait: true },
              { t: "10", fin: 2 },
              { t: "−8", fin: 2, trait: true },
              { t: "20", fin: 3 },
              { t: "−20", fin: 3, trait: true },
              { t: "0", fin: 3 },
            ]),
          ),
          micros: ["division_decimale_posee"],
        },
        {
          enonce: "Calcule.\na) 12,6 ÷ 3\nb) 25,5 ÷ 5\nc) 4,8 ÷ 6",
          reponses: [
            { question: "a)", attendu: "4,2" },
            { question: "b)", attendu: "5,1" },
            { question: "c)", attendu: "0,8" },
          ],
          correction:
            "Je divise la partie entière, puis je mets la virgule au quotient avant les dixièmes.\na) 12 ÷ 3 = 4. Virgule. 6 dixièmes ÷ 3 = 2 dixièmes. Donc 4,2. Je vérifie : 3 × 4,2 = 12,6.\nb) 25 ÷ 5 = 5. Virgule. 5 dixièmes ÷ 5 = 1 dixième. Donc 5,1. Je vérifie : 5 × 5,1 = 25,5.\nc) 4 ÷ 6 = 0, il reste 4. Virgule. 48 dixièmes ÷ 6 = 8 dixièmes. Donc 0,8. Je vérifie : 6 × 0,8 = 4,8.\n⛔ Le piège du c) : écrire 8. 4,8 ÷ 6 doit être plus petit que 1, car 4,8 est plus petit que 6.\nRéponse : a) 4,2 ; b) 5,1 ; c) 0,8.",
          micros: ["division_decimale_dividende"],
        },
        {
          enonce:
            "Zoé range 53 photos dans un album. Elle met 4 photos par page.\na) Combien de pages complètes remplit-elle ?\nb) Combien de pages utilise-t-elle en tout ?\nc) Combien de photos y a-t-il sur la dernière page ?",
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "14" },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "Je calcule 53 ÷ 4. 4 × 13 = 52 et 4 × 14 = 56. Le quotient est 13. Le reste : 53 − 52 = 1.\na) Le quotient donne les pages pleines : 13 pages complètes.\nb) La photo du reste prend une page de plus : 13 + 1 = 14 pages.\nc) Le reste donne les photos de la dernière page : 1 photo.\n⛔ Le piège : donner la même réponse aux trois questions. Chaque question demande autre chose : le quotient, le quotient + 1, ou le reste.\nRéponse : a) 13 ; b) 14 ; c) 1.",
          micros: ["division_reste", "division_probleme"],
        },
        {
          enonce:
            "a) Une couturière a 7,5 m de tissu. Elle le coupe en 3 morceaux égaux. Combien mesure un morceau ?\nb) 6 amis paient ensemble un repas de 87 €. Ils partagent en parts égales. Combien paie chacun ?",
          reponses: [
            { question: "a)", attendu: "2,5" },
            { question: "b)", attendu: "14,5" },
          ],
          correction:
            "Partager en parts égales : je divise.\na) 7,5 ÷ 3 : 7 ÷ 3 = 2, il reste 1. Virgule. 15 dixièmes ÷ 3 = 5. Un morceau mesure 2,5 m.\nJe vérifie : 3 × 2,5 = 7,5.\nb) 87 ÷ 6 = 14, il reste 3. Virgule. 30 dixièmes ÷ 6 = 5. Chacun paie 14,5 €, soit 14,50 €.\nJe vérifie : 6 × 14,5 = 87.\n⛔ Le piège : multiplier. 7,5 × 3 = 22,5 m : un morceau serait plus long que tout le tissu !\nRéponse : a) 2,5 m ; b) 14,50 €.",
          micros: ["division_probleme", "division_decimale_dividende", "division_sens"],
        },
        {
          enonce:
            "On sait que 8 × 15 = 120.\na) 120 ÷ 8 = …\nb) 120 ÷ 15 = …\nc) 240 ÷ 8 = …\nd) Quel calcul est FAUX ?\nA) 8 ÷ 120 = 15   B) 120 ÷ 8 = 15   C) 15 × 8 = 120",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "30" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "Une multiplication donne deux divisions.\na) 8 × 15 = 120, donc 120 ÷ 8 = 15.\nb) 8 × 15 = 120, donc 120 ÷ 15 = 8.\nc) 240, c'est 2 fois 120. Le quotient est 2 fois plus grand : 15 × 2 = 30. Je vérifie : 8 × 30 = 240.\nd) A est faux : 8 est plus petit que 120, 8 ÷ 120 ne peut pas faire 15. B et C sont justes.\n⛔ Le piège : retourner la division. On divise le grand nombre (120) par le petit (8).\nRéponse : a) 15 ; b) 8 ; c) 30 ; d) A.",
          micros: ["division_lien_multiplication", "division_sens"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je fais la division, puis je me demande ce que veut dire le reste.",
      rappel: [
        "Partager ou faire des groupes égaux : je divise.",
        "Avec un reste, je réfléchis : faut-il une voiture de plus ? Ce qui reste, combien est-ce ?",
        "Je vérifie toujours : diviseur × quotient + reste = le nombre de départ.",
      ],
      exercices: [
        {
          titre: "Les cars du zoo",
          enonce:
            "Une école emmène 160 personnes au zoo. Un car a 48 places. Un car coûte 360 €.\na) Combien de cars faut-il ?\nb) Combien coûtent tous les cars ?\nc) On partage ce prix entre les 160 personnes. Combien paie chacun ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "1440" },
            { question: "c)", attendu: "9" },
          ],
          correction:
            "a) 160 ÷ 48 : 48 × 3 = 144 et 48 × 4 = 192. Le quotient est 3. Le reste : 160 − 144 = 16.\n3 cars emmènent 144 personnes. Il reste 16 personnes : il faut un car de plus. 3 + 1 = 4 cars.\nb) 4 cars à 360 € : 4 × 360 = 1 440 €.\nc) 1 440 ÷ 160 = 9 €, car 160 × 9 = 1 440.\n⛔ Le piège du a) : répondre 3 cars. Les 16 personnes du reste resteraient à l'école !\nRéponse : a) 4 cars ; b) 1 440 € ; c) 9 €.",
          micros: ["division_probleme", "division_reste", "division_defi"],
        },
        {
          titre: "La confiture",
          enonce:
            "Une confiturière a 6,3 kg de confiture. Elle la verse dans 9 pots, autant dans chaque pot. Elle vend chaque pot 4,50 €.\na) Combien de kilogrammes y a-t-il dans chaque pot ?\nb) Écris ce poids en grammes.\nc) Combien gagne-t-elle si elle vend les 9 pots ?",
          reponses: [
            { question: "a)", attendu: "0,7", unite: "kg" },
            { question: "b)", attendu: "700" },
            { question: "c)", attendu: "40,5" },
          ],
          correction:
            "a) 6,3 ÷ 9 : 6 ÷ 9 = 0, il reste 6. Virgule. 63 dixièmes ÷ 9 = 7 dixièmes. Chaque pot contient 0,7 kg.\nJe vérifie : 9 × 0,7 = 6,3.\nb) 1 kg = 1 000 g. Donc 0,7 kg = 0,7 × 1 000 = 700 g.\nc) 9 pots à 4,50 € : 9 × 4,50 = 40,50 €.\n⛔ Le piège du a) : oublier la virgule et écrire 7 kg. Un pot contiendrait plus que toute la confiture !\nRéponse : a) 0,7 kg ; b) 700 g ; c) 40,50 €.",
          micros: ["division_probleme", "division_decimale_dividende"],
        },
        {
          titre: "La course de relais",
          enonce:
            "Une course de relais fait 42 km. 8 coureurs se partagent la distance en parts égales.\na) Combien de kilomètres court chaque coureur ?\nb) Écris cette distance en mètres.\nc) Avec 6 coureurs, combien de kilomètres court chacun ?",
          reponses: [
            { question: "a)", attendu: "5,25", unite: "km" },
            { question: "b)", attendu: "5250" },
            { question: "c)", attendu: "7", unite: "km" },
          ],
          correction:
            "a) 42 ÷ 8 = 5, il reste 2. Virgule. 20 dixièmes ÷ 8 = 2, il reste 4. 40 centièmes ÷ 8 = 5.\nChaque coureur court 5,25 km. Je vérifie : 8 × 5,25 = 42.\nb) 1 km = 1 000 m. 5,25 × 1 000 = 5 250 m.\nc) 42 ÷ 6 = 7 km, car 6 × 7 = 42.\n⛔ Le piège du a) : écrire le reste après la virgule, 5,2. « 5 reste 2 » ne veut pas dire 5,2 : je continue la division.\nRéponse : a) 5,25 km ; b) 5 250 m ; c) 7 km.",
          micros: ["division_probleme", "division_decimale_posee"],
        },
        {
          titre: "Le jardin partagé",
          enonce:
            "Un jardinier a 245 plants de salade. Il les plante en rangées de 15.\na) Combien de rangées complètes peut-il planter ?\nb) Combien de plants restent ?\nc) Combien de plants lui manque-t-il pour faire une rangée complète de plus ?",
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "Je pose 245 ÷ 15. Je prends 24 dizaines : 15 × 1 = 15, il reste 9. J'abaisse le 5 : 95. 15 × 6 = 90, il reste 5.\nJe vérifie : 15 × 16 = 240, et 240 + 5 = 245.\na) Le quotient : 16 rangées complètes.\nb) Le reste : 5 plants.\nc) Une rangée a 15 plants. Il en a 5 : il en manque 15 − 5 = 10.\n⛔ Le piège du c) : répondre 5. Les 5 plants, c'est ce qu'il A ; ce qui MANQUE, c'est 10.\nRéponse : a) 16 rangées ; b) 5 plants ; c) 10 plants.",
          micros: ["division_probleme", "division_reste", "division_posee", "division_defi"],
        },
        {
          titre: "Le nombre mystère",
          enonce:
            "Je suis un nombre entre 50 et 70.\nDivisé par 7, il reste 2.\nDivisé par 5, il ne reste rien.\na) Qui suis-je ?\nb) Dans ma division par 7, quel est le quotient ?\nc) Combien fais-je divisé par 5 ?",
          reponses: [
            { question: "a)", attendu: "65" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "13" },
          ],
          correction:
            "a) Divisé par 7, il reste 2 : le nombre est 7 × … + 2.\n7 × 7 + 2 = 51 ; 7 × 8 + 2 = 58 ; 7 × 9 + 2 = 65. (7 × 10 + 2 = 72 dépasse 70.)\nDivisé par 5 sans reste : il finit par 0 ou par 5. Parmi 51, 58 et 65, seul 65 marche.\nb) 65 = 7 × 9 + 2 : le quotient est 9.\nc) 65 ÷ 5 = 13, car 5 × 13 = 65.\n⛔ Le piège : oublier un indice. 51 et 58 marchent pour 7, mais pas pour 5.\nRéponse : a) 65 ; b) 9 ; c) 13.",
          micros: ["division_defi", "division_reste"],
        },
      ],
    },
  ],
};
