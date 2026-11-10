// ─── Fiche d'exercices : les nombres décimaux (CM2) — 20 exercices corrigés ───
//
// 10/11/2026 : feuille NOUVELLE, sur la forme de `maths-6e-decimal-nombre.tsx`
// et des feuilles CM2 (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`, clé
// `cm2/nombre_decimal`) et sur la banque `nombres-decimaux.bank.ts` : lire et
// écrire, fraction décimale ↔ nombre décimal, somme de fractions décimales,
// comparer et ranger des fractions décimales, ÷ 10, 100, 1 000 par la VALEUR
// DES CHIFFRES, valeur d'un chiffre, comparer et ranger, droite graduée,
// arrondir, défis.
// ⛔ LIMITES DU CM2 : aucun calcul de + ou − (feuille `calcul`) ; deux chiffres
// après la virgule, trois seulement dans les ÷ 100 et ÷ 1 000.
// ⛔ CM2 = AUCUNE question ouverte : nombres, signes < > =, QCM A/B/C (réponses
// A : 13, 15 ; B : 3 ; C : 12, 19), vrai/faux, un prénom, une lettre.
// ⛔ Aucun exemple de la carte mentale n'est repris (4,25 ; 7/10 ; 35/100 ;
// 5,36 ; 38,52 ; 3,8 et 3,75 ; 45,6 ; 7,6 ; 2,38 ; 4,5 et 4,6…).
//
// Les pièges nommés : douze unités et trois centièmes écrits 12,3 (1), 5/100
// écrit 0,5 (2), dixièmes pris pour des dizaines (3, 12), le 0 qui garde un
// rang oublié (4, 19), « le plus long est le plus grand » (5, 11, 17), un saut
// qui vaudrait 1 (6), arrondir en coupant (7, 14), ÷ 10 qui rendrait plus
// grand (8, 15, 19), comparer des fractions décimales sans même dénominateur
// (9, 10, 18), « rien entre 6,3 et 6,4 » (16), 7,09 placé près de 7,9 (13),
// le plus petit temps pris pour le plus lent (17).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bureau de poste (11, postière), marché (14,
// maraîchère), boulangerie (15, boulangère), athlétisme (17, entraîneuse),
// laboratoire (18, chimiste), cadenas (19), randonnée (20, guide de montagne,
// le seul contexte réunionnais). Tout est un MODÈLE.
//
// ⭐ LES DESSINS : le TABLEAU DE NUMÉRATION (colonnes D, U, d, c, m, la
// virgule orange après les unités), la DROITE GRADUÉE et la GRILLE DE 100
// (`dessins-fractions-cm2.tsx`). Ceux qui redisent le corrigé sont
// `ecranSeulement`.
//
// Micro-compétences : decimal_lire (1, 12), decimal_fraction (2, 18),
// decimal_somme_fractions (4, 19), fraction_decimale_comparer (9),
// fraction_decimale_ordonner (10, 18), decimal_diviser_puissance_dix (8, 15,
// 19), decimal_valeur_chiffre (3, 12), decimal_comparer (5, 16, 17, 18, 20),
// decimal_ordonner (11, 17), decimal_droite (6, 13, 20), decimal_arrondir (7,
// 14, 16, 17, 20), decimal_defi (16, 19). 12/12.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { cent, droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

/**
 * LE TABLEAU DE NUMÉRATION, prolongé après la virgule (comme en 6e). Une
 * colonne par rang, un chiffre par case ("" pour rien), la virgule orange
 * après les unités quand la ligne a une partie décimale. `surligne` : le rang
 * regardé, en jaune. Cinq colonnes au plus : rien ne déborde à 375 px.
 */
const NOMS_RANGS: Record<string, string> = { C: "centaines", D: "dizaines", U: "unités", d: "dixièmes", c: "centièmes", m: "millièmes" };
type LigneNumeration = { chiffres: string[]; nom?: string };
const numeration = (colonnes: string[], lignes: LigneNumeration[], surligne?: string) => {
  const avecNom = lignes.some((l) => l.nom);
  const u = colonnes.indexOf("U");
  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <table className="mx-auto border-collapse text-sm">
        <thead>
          <tr>
            {avecNom ? <th className="border border-slate-400 bg-slate-100 px-1.5 py-1" /> : null}
            {colonnes.map((c) => (
              <th key={c} className={`border border-slate-400 px-2 py-1 font-semibold text-slate-800 ${c === surligne ? "bg-yellow-200" : "bg-slate-100"}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((li, i) => {
            const decimale = li.chiffres.slice(u + 1).some((x) => x !== "");
            return (
              <tr key={i}>
                {avecNom ? <td className="border border-slate-400 px-1.5 py-1 text-center font-semibold text-slate-700">{li.nom ?? ""}</td> : null}
                {li.chiffres.map((x, j) => (
                  <td key={j} className={`border border-slate-400 px-2 py-1 text-center font-mono text-slate-900 ${colonnes[j] === surligne ? "bg-yellow-100" : ""}`}>
                    <span>{x || " "}</span>
                    {j === u && decimale ? <span className="font-bold text-orange-600">,</span> : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-1 text-center text-xs font-semibold text-slate-600">{colonnes.map((c) => `${c} : ${NOMS_RANGS[c]}`).join(" · ")}</p>
    </div>
  );
};

export const exercicesNombreDecimalCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "nombre-decimal",
  titre: "Les nombres décimaux",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire et écrire un nombre à virgule. Passer d'une fraction décimale à un nombre décimal. Trouver la valeur d'un chiffre. Comparer, ranger, placer sur la droite, arrondir. Diviser par 10, 100 ou 1 000. Des colis à la poste, le marché, la boulangerie, une course, un laboratoire, un cadenas et un sentier de randonnée. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/nombre-decimal", titre: "Les nombres décimaux" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde le rang de chaque chiffre.",
      rappel: [
        "La virgule sépare la partie entière (à gauche) et la partie décimale (à droite).",
        "Après la virgule : 1er chiffre = les dixièmes, 2e chiffre = les centièmes.",
        "Pour comparer : d'abord la partie entière, puis les dixièmes, puis les centièmes.",
      ],
      exercices: [
        {
          enonce: "Écris chaque nombre en chiffres.\na) six unités et quatre dixièmes\nb) douze unités et trois centièmes\nc) zéro unité et cinquante-huit centièmes\nd) huit unités et quinze centièmes",
          reponses: [
            { question: "a)", attendu: "6,4" },
            { question: "b)", attendu: "12,03" },
            { question: "c)", attendu: "0,58" },
            { question: "d)", attendu: "8,15" },
          ],
          correction:
            "Je place la partie entière avant la virgule, puis les rangs après la virgule.\na) 6 unités, puis 4 dixièmes au 1er rang : 6,4.\nb) 12 unités. Il n'y a pas de dixièmes : j'écris 0 au 1er rang. Puis 3 centièmes au 2e rang : 12,03.\nc) 0 unité, puis 58 centièmes, c'est 5 dixièmes et 8 centièmes : 0,58.\nd) 8 unités et 15 centièmes, c'est 1 dixième et 5 centièmes : 8,15.\n⛔ Le piège du b) : écrire 12,3. Ça, ce sont 3 DIXIÈMES. Le 0 garde la place des dixièmes.\nRéponse : a) 6,4 ; b) 12,03 ; c) 0,58 ; d) 8,15.",
          schema: ecranSeulement(
            numeration(["D", "U", "d", "c"], [
              { nom: "a)", chiffres: ["", "6", "4", ""] },
              { nom: "b)", chiffres: ["1", "2", "0", "3"] },
              { nom: "c)", chiffres: ["", "0", "5", "8"] },
              { nom: "d)", chiffres: ["", "8", "1", "5"] },
            ]),
          ),
          micros: ["decimal_lire"],
        },
        {
          enonce: "Écris chaque fraction décimale avec une virgule.\na) $\\dfrac{9}{10}$\nb) $\\dfrac{46}{100}$\nc) $\\dfrac{5}{100}$\nd) $\\dfrac{318}{100}$",
          reponses: [
            { question: "a)", attendu: ["0,9"], exact: true },
            { question: "b)", attendu: ["0,46"], exact: true },
            { question: "c)", attendu: ["0,05"], exact: true },
            { question: "d)", attendu: ["3,18"], exact: true },
          ],
          correction:
            "Le nombre du bas dit le rang : 10, ce sont des dixièmes ; 100, des centièmes.\na) 9 dixièmes : 0,9.\nb) 46 centièmes, c'est 4 dixièmes et 6 centièmes : 0,46.\nc) 5 centièmes : le 5 va au 2e rang après la virgule. 0,05.\nd) 318 centièmes, c'est 300 centièmes et 18 centièmes. 300 centièmes font 3 unités : 3,18.\n⛔ Le piège du c) : écrire 0,5. Ça, ce sont 5 DIXIÈMES. Des centièmes ont deux chiffres après la virgule.\nRéponse : a) 0,9 ; b) 0,46 ; c) 0,05 ; d) 3,18.",
          schema: ecranSeulement(cent(46)),
          micros: ["decimal_fraction"],
        },
        {
          enonce: "Regarde le nombre 63,47.\na) Quel est le chiffre des dixièmes ?\nb) Quel est le chiffre des dizaines ?\nc) Quel est le chiffre des centièmes ?\nd) Que vaut le chiffre 4 ?\nA : 4 dizaines ; B : 4 dixièmes ; C : 4 centièmes",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "Je range chaque chiffre dans le tableau de numération.\nAvant la virgule : 6 dizaines et 3 unités.\nAprès la virgule : 4 dixièmes (1er rang) et 7 centièmes (2e rang).\na) Le chiffre des dixièmes est 4.\nb) Le chiffre des dizaines est 6.\nc) Le chiffre des centièmes est 7.\nd) Le 4 est juste après la virgule : il vaut 4 dixièmes. Choix B.\n⛔ Le piège : confondre DIZAINES et DIXIÈMES. Les dizaines sont à gauche de la virgule, les dixièmes à droite.\nRéponse : a) 4 ; b) 6 ; c) 7 ; d) B.",
          schema: numeration(["D", "U", "d", "c"], [{ nom: "63,47", chiffres: ["6", "3", "4", "7"] }], "d"),
          micros: ["decimal_valeur_chiffre"],
        },
        {
          enonce: "Complète.\na) $3{,}59 = 3 + \\dfrac{\\ldots}{10} + \\dfrac{9}{100}$\nb) $8{,}04 = 8 + \\dfrac{\\ldots}{100}$\nc) $2 + \\dfrac{6}{10} + \\dfrac{1}{100} = \\ldots$\nd) $7 + \\dfrac{3}{100} = \\ldots$",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: ["2,61"], exact: true },
            { question: "d)", attendu: ["7,03"], exact: true },
          ],
          correction:
            "Je découpe le nombre : les unités, puis les dixièmes, puis les centièmes.\na) Dans 3,59 : 3 unités, 5 dixièmes, 9 centièmes. Il manque 5 : $\\dfrac{5}{10}$.\nb) Dans 8,04 : 8 unités, 0 dixième, 4 centièmes. Il manque 4 : $\\dfrac{4}{100}$.\nc) 2 unités, 6 dixièmes, 1 centième : 2,61.\nd) 7 unités, 0 dixième, 3 centièmes : 7,03.\n⛔ Le piège du d) : écrire 7,3. Il n'y a pas de dixièmes : j'écris 0 au 1er rang.\nRéponse : a) 5 ; b) 4 ; c) 2,61 ; d) 7,03.",
          micros: ["decimal_somme_fractions"],
        },
        {
          enonce: "Compare avec <, > ou =.\na) 5,7 … 5,63\nb) 0,8 … 0,80\nc) 12,09 … 12,1\nd) 3,5 … 3,49",
          reponses: [
            { question: "a)", attendu: [">"] },
            { question: "b)", attendu: ["="] },
            { question: "c)", attendu: ["<"] },
            { question: "d)", attendu: [">"] },
          ],
          correction:
            "Je compare d'abord les parties entières. Si elles sont égales, je compare les dixièmes, puis les centièmes.\na) 5 = 5. Dixièmes : 7 contre 6. Donc 5,7 > 5,63.\nb) J'ajoute un zéro : 0,8 = 0,80. Les deux nombres sont égaux.\nc) 12 = 12. Dixièmes : 0 contre 1. Donc 12,09 < 12,1.\nd) 3 = 3. Dixièmes : 5 contre 4. Donc 3,5 > 3,49.\n⭐ Astuce : j'écris les deux nombres avec autant de chiffres après la virgule. 5,70 et 5,63 : 70 centièmes > 63 centièmes.\n⛔ Le piège : croire que le nombre le plus LONG est le plus grand. 5,63 a plus de chiffres, mais 5,63 < 5,7.\nRéponse : a) > ; b) = ; c) < ; d) >.",
          micros: ["decimal_comparer"],
        },
        {
          enonce: "Regarde la droite graduée.\na) Combien vaut un petit saut, d'un trait au suivant ?\nb) Quelle est l'abscisse du point A ?\nc) Quelle est l'abscisse du point B ?\nd) Quelle est l'abscisse du point C ?",
          figure: droiteRel(2, 3, 0.1, [
            { value: 2.2, label: "A" },
            { value: 2.7, label: "B" },
            { value: 2.9, label: "C" },
          ], { nombres: 1 }),
          reponses: [
            { question: "a)", attendu: "0,1" },
            { question: "b)", attendu: "2,2" },
            { question: "c)", attendu: "2,7" },
            { question: "d)", attendu: "2,9" },
          ],
          correction:
            "a) De 2 à 3, je compte 10 sauts égaux. Une unité coupée en 10 : chaque saut vaut 1 dixième, soit 0,1.\nb) A est à 2 sauts après 2 : 2 unités et 2 dixièmes. A a pour abscisse 2,2.\nc) B est à 7 sauts après 2 : 2,7.\nd) C est à 9 sauts après 2, un saut avant 3 : 2,9.\n⛔ Le piège : croire qu'un petit saut vaut 1. Ici, 10 sauts vont de 2 à 3 : un saut vaut 0,1.\nRéponse : a) 0,1 ; b) 2,2 ; c) 2,7 ; d) 2,9.",
          micros: ["decimal_droite"],
        },
        {
          enonce: "Arrondis.\na) 4,7 à l'unité\nb) 12,3 à l'unité\nc) 9,5 à l'unité\nd) 6,84 au dixième",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "6,8" },
          ],
          correction:
            "Je regarde le chiffre JUSTE APRÈS le rang demandé. De 0 à 4, je garde. De 5 à 9, je monte.\na) 4,7 est entre 4 et 5. Le chiffre des dixièmes est 7 : je monte. 4,7 → 5.\nb) 12,3 est entre 12 et 13. Le chiffre des dixièmes est 3 : je garde. 12,3 → 12.\nc) 9,5 est entre 9 et 10. Le chiffre des dixièmes est 5 : je monte. 9,5 → 10.\nd) Au dixième : 6,84 est entre 6,8 et 6,9. Le chiffre des centièmes est 4 : je garde. 6,84 → 6,8.\n⛔ Le piège : couper sans regarder. 4,7 arrondi à l'unité donne 5, pas 4.\nRéponse : a) 5 ; b) 12 ; c) 10 ; d) 6,8.",
          schema: ecranSeulement(droiteRel(4, 5, 0.1, [{ value: 4.7, label: "4,7" }], { nombres: 1 })),
          micros: ["decimal_arrondir"],
        },
        {
          enonce: "Calcule.\na) 37 ÷ 10\nb) 52,8 ÷ 10\nc) 6,4 ÷ 100\nd) 125 ÷ 1 000",
          reponses: [
            { question: "a)", attendu: "3,7" },
            { question: "b)", attendu: "5,28" },
            { question: "c)", attendu: "0,064" },
            { question: "d)", attendu: "0,125" },
          ],
          correction:
            "Diviser par 10, c'est rendre chaque chiffre 10 fois plus petit : il recule d'un rang vers la droite.\na) 37 : les 3 dizaines deviennent 3 unités, les 7 unités deviennent 7 dixièmes. 37 ÷ 10 = 3,7.\nb) 52,8 : 5 dizaines → 5 unités ; 2 unités → 2 dixièmes ; 8 dixièmes → 8 centièmes. 52,8 ÷ 10 = 5,28.\nc) ÷ 100 : chaque chiffre recule de DEUX rangs. 6 unités → 6 centièmes ; 4 dixièmes → 4 millièmes. 6,4 ÷ 100 = 0,064.\nd) ÷ 1 000 : chaque chiffre recule de TROIS rangs. 1 centaine → 1 dixième ; 2 dizaines → 2 centièmes ; 5 unités → 5 millièmes. 125 ÷ 1 000 = 0,125.\n⭐ Le raccourci, une fois compris : la virgule avance d'un rang vers la gauche pour ÷ 10, de deux pour ÷ 100, de trois pour ÷ 1 000.\n⛔ Le piège : trouver un nombre PLUS GRAND. Diviser par 10 rend toujours le nombre plus petit : 37 ÷ 10 n'est pas 370.\nRéponse : a) 3,7 ; b) 5,28 ; c) 0,064 ; d) 0,125.",
          schema: numeration(["D", "U", "d"], [
            { nom: "37", chiffres: ["3", "7", ""] },
            { nom: "37 ÷ 10", chiffres: ["", "3", "7"] },
          ]),
          micros: ["decimal_diviser_puissance_dix"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris les nombres avec autant de chiffres après la virgule avant de comparer.",
      rappel: [
        "Pour comparer des fractions décimales, je les écris toutes sur 100 : 6 dixièmes = 60 centièmes.",
        "Pour ranger des nombres décimaux, j'ajoute des zéros : 2,8 = 2,80. Puis je compare rang par rang.",
        "Diviser par 10, 100, 1 000 : chaque chiffre recule de 1, 2 ou 3 rangs vers la droite.",
      ],
      exercices: [
        {
          enonce: "a) Compare avec <, > ou = : $\\dfrac{6}{10}$ … $\\dfrac{58}{100}$\nb) Compare avec <, > ou = : $\\dfrac{3}{10}$ … $\\dfrac{30}{100}$\nc) Compare avec <, > ou = : $\\dfrac{9}{100}$ … $\\dfrac{1}{10}$\nd) $\\dfrac{386}{100}$ est entre deux nombres entiers qui se suivent. Lesquels ? Écris le plus petit d'abord.",
          reponses: [
            { question: "a)", attendu: [">"] },
            { question: "b)", attendu: ["="] },
            { question: "c)", attendu: ["<"] },
            { question: "d)", attendu: "3 ; 4", ordre: true },
          ],
          correction:
            "Pour comparer, je veux le même nombre en bas : j'écris tout en centièmes.\na) $\\dfrac{6}{10} = \\dfrac{60}{100}$. Et 60 > 58. Donc $\\dfrac{6}{10} > \\dfrac{58}{100}$.\nb) $\\dfrac{3}{10} = \\dfrac{30}{100}$. Les deux fractions sont égales.\nc) $\\dfrac{1}{10} = \\dfrac{10}{100}$. Et 9 < 10. Donc $\\dfrac{9}{100} < \\dfrac{1}{10}$.\nd) $\\dfrac{386}{100} = 3{,}86$ : 3 unités et 86 centièmes. Donc 3 < 3,86 < 4.\n⛔ Le piège du a) : croire $\\dfrac{58}{100}$ plus grand parce que 58 > 6. Je compare le haut seulement quand le bas est le même.\nRéponse : a) > ; b) = ; c) < ; d) 3 et 4.",
          micros: ["fraction_decimale_comparer"],
        },
        {
          enonce: "Range ces fractions du plus petit au plus grand.\n$\\dfrac{7}{10}$ ; $\\dfrac{65}{100}$ ; $\\dfrac{4}{100}$ ; $\\dfrac{9}{10}$ ; $\\dfrac{72}{100}$",
          reponses: [{ attendu: "4/100 < 65/100 < 7/10 < 72/100 < 9/10", ordre: true }],
          correction:
            "Je mets toutes les fractions sur 100.\n$\\dfrac{7}{10} = \\dfrac{70}{100}$ et $\\dfrac{9}{10} = \\dfrac{90}{100}$.\nJ'ai donc 70, 65, 4, 90 et 72 centièmes.\nJe range les nombres du haut : 4 < 65 < 70 < 72 < 90.\n⛔ Le piège : ranger avec le haut seul. $\\dfrac{7}{10}$ n'est pas petit : il vaut 70 centièmes, plus que $\\dfrac{65}{100}$.\nRéponse : $\\dfrac{4}{100} < \\dfrac{65}{100} < \\dfrac{7}{10} < \\dfrac{72}{100} < \\dfrac{9}{10}$.",
          micros: ["fraction_decimale_ordonner"],
        },
        {
          enonce: "Au bureau de poste, Maëlle, la postière, pèse cinq colis : 2,8 kg ; 2,75 kg ; 3,1 kg ; 2,09 kg ; 2,9 kg.\na) Range les masses du plus léger au plus lourd.\nb) Quelle est la masse du colis le plus lourd ?\nc) Combien de colis pèsent moins de 2,8 kg ?",
          reponses: [
            { question: "a)", attendu: "2,09 < 2,75 < 2,8 < 2,9 < 3,1", ordre: true },
            { question: "b)", attendu: "3,1" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "J'écris toutes les masses avec deux chiffres après la virgule : 2,80 ; 2,75 ; 3,10 ; 2,09 ; 2,90.\na) Partie entière : seul 3,10 a 3 unités. C'est le plus lourd.\nLes autres ont 2 unités. Je compare les centièmes : 9 < 75 < 80 < 90.\nDonc 2,09 < 2,75 < 2,8 < 2,9 < 3,1.\nb) Le plus lourd : 3,1 kg.\nc) Moins de 2,8 kg : 2,09 kg et 2,75 kg. Il y a 2 colis.\n⛔ Le piège : croire 2,75 > 2,8 parce que 75 > 8. Avec les zéros : 2,75 < 2,80.\nRéponse : a) 2,09 < 2,75 < 2,8 < 2,9 < 3,1 ; b) 3,1 kg ; c) 2 colis.",
          micros: ["decimal_ordonner"],
        },
        {
          enonce: "Devine le nombre mystère. J'ai 4 dizaines, 0 unité, 7 dixièmes et 2 centièmes.\na) Écris le nombre mystère en chiffres.\nb) Que vaut le chiffre 2 dans ce nombre ?\nA : 2 dixièmes ; B : 2 unités ; C : 2 centièmes\nc) J'ajoute 1 dixième au nombre mystère. Quel nombre j'obtiens ?",
          reponses: [
            { question: "a)", attendu: ["40,72"], exact: true },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "40,82" },
          ],
          correction:
            "Je range chaque chiffre à sa place : D, U, puis d, c après la virgule.\na) 4 dizaines, 0 unité : 40. Puis 7 dixièmes et 2 centièmes : 40,72.\nb) Le 2 est au 2e rang après la virgule : il vaut 2 centièmes. Choix C.\nc) J'ajoute 1 au chiffre des dixièmes : 7 devient 8. J'obtiens 40,82.\n⛔ Le piège du a) : oublier le 0 des unités et écrire 4,72. Le 0 garde la place des unités.\nRéponse : a) 40,72 ; b) C ; c) 40,82.",
          schema: numeration(["D", "U", "d", "c"], [{ nom: "40,72", chiffres: ["4", "0", "7", "2"] }], "c"),
          micros: ["decimal_lire", "decimal_valeur_chiffre"],
        },
        {
          enonce: "La droite est graduée en dixièmes. Le point B est pile au milieu de deux petits traits.\na) Quelle est l'abscisse du point A ?\nb) Quelle est l'abscisse du point B ?\nc) Où se place le nombre 7,09 ?\nA : tout près de 7 ; B : tout près de 8 ; C : au milieu, près de 7,5",
          figure: droiteRel(7, 8, 0.1, [
            { value: 7.4, label: "A" },
            { value: 7.65, label: "B" },
          ], { nombres: 0.5 }),
          reponses: [
            { question: "a)", attendu: "7,4" },
            { question: "b)", attendu: "7,65" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "De 7 à 8, il y a 10 sauts : un saut vaut 0,1.\na) A est à 4 sauts après 7 : 7,4.\nb) B est entre 7,6 et 7,7, pile au milieu. En centièmes : entre 7,60 et 7,70. Le milieu est 7,65.\nc) 7,09, c'est 7 unités et 9 centièmes : même pas 1 dixième. Il est tout près de 7, avant le premier trait 7,1. Choix A.\n⛔ Le piège du c) : lire 7,09 comme 7,9 et le placer près de 8. Le 9 est au rang des CENTIÈMES.\nRéponse : a) 7,4 ; b) 7,65 ; c) A.",
          micros: ["decimal_droite"],
        },
        {
          enonce: "Au marché, Rose, la maraîchère, arrondit ses prix à l'euro le plus proche.\na) Un melon à 3,49 €\nb) Un panier de fraises à 7,50 €\nc) Une salade à 0,89 €\nd) Arrondis 5,96 au dixième.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "1" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "À l'euro (à l'unité), je regarde le chiffre des dixièmes.\na) 3,49 : le chiffre des dixièmes est 4. Je garde : 3 €.\nb) 7,50 : le chiffre des dixièmes est 5. Je monte : 8 €.\nc) 0,89 : le chiffre des dixièmes est 8. Je monte : 1 €.\nd) Au dixième, je regarde les centièmes. 5,96 : le chiffre des centièmes est 6. Je monte : 9 dixièmes deviennent 10 dixièmes, soit 1 unité de plus. 5,96 → 6,0, c'est 6.\n⛔ Le piège du a) : regarder le 9 des centièmes et monter à 4 €. À l'unité, seul le chiffre des dixièmes compte.\nRéponse : a) 3 € ; b) 8 € ; c) 1 € ; d) 6.",
          micros: ["decimal_arrondir"],
        },
        {
          enonce: "Léna est boulangère.\na) Elle partage 25 kg de farine en 10 fournées égales. Combien de kg par fournée ?\nb) Pour 100 baguettes, il lui faut 45 kg de farine. Combien de kg pour une baguette ?\nc) Elle vend 1 000 croissants pour 950 €. Combien coûte un croissant ?\nd) Combien fait 3,6 ÷ 10 ?\nA : 0,36 ; B : 36 ; C : 0,036",
          reponses: [
            { question: "a)", attendu: "2,5" },
            { question: "b)", attendu: "0,45" },
            { question: "c)", attendu: "0,95" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "Partager en 10, en 100, en 1 000 : je divise. Chaque chiffre recule vers la droite.\na) 25 ÷ 10 : 2 dizaines → 2 unités ; 5 unités → 5 dixièmes. 2,5 kg par fournée.\nb) 45 ÷ 100 : chaque chiffre recule de deux rangs. 4 dizaines → 4 dixièmes ; 5 unités → 5 centièmes. 0,45 kg par baguette.\nc) 950 ÷ 1 000 : chaque chiffre recule de trois rangs. 9 centaines → 9 dixièmes ; 5 dizaines → 5 centièmes. 0,95 € le croissant.\nd) 3,6 ÷ 10 : 3 unités → 3 dixièmes ; 6 dixièmes → 6 centièmes. 0,36. Choix A.\n⛔ Le piège du d) : répondre 36. On a multiplié au lieu de diviser : ÷ 10 rend le nombre plus PETIT.\nRéponse : a) 2,5 kg ; b) 0,45 kg ; c) 0,95 € ; d) A.",
          micros: ["decimal_diviser_puissance_dix"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris les nombres en centièmes quand il faut comparer.",
      rappel: [
        "Entre deux nombres décimaux, il y a toujours d'autres nombres : entre 1,2 et 1,3, il y a 1,25.",
        "Le plus petit temps, c'est le plus rapide.",
        "Pour arrondir, je regarde le chiffre juste après le rang demandé.",
      ],
      exercices: [
        {
          titre: "Le nombre caché",
          enonce: "Un nombre est caché entre 6,3 et 6,4.\na) Vrai ou faux : il n'existe aucun nombre entre 6,3 et 6,4.\nb) Le nombre caché a 5 centièmes. Quel est ce nombre ?\nc) Arrondis le nombre caché au dixième.",
          reponses: [
            { question: "a)", attendu: "faux" },
            { question: "b)", attendu: "6,35" },
            { question: "c)", attendu: "6,4" },
          ],
          correction:
            "J'écris les deux bornes en centièmes : 6,30 et 6,40.\na) Entre 6,30 et 6,40, il y a 6,31 ; 6,32 ; … ; 6,39. C'est faux : il y a plein de nombres.\nb) Le nombre est 6,3… avec 5 au rang des centièmes : 6,35.\nc) 6,35 est entre 6,3 et 6,4. Le chiffre des centièmes est 5 : je monte. 6,35 → 6,4.\n⛔ Le piège du a) : croire que 6,4 vient juste après 6,3. En centièmes, il y a 9 nombres entre les deux, et encore plus avec les millièmes.\nRéponse : a) faux ; b) 6,35 ; c) 6,4.",
          schema: ecranSeulement(droiteRel(6.3, 6.4, 0.01, [{ value: 6.35, label: "6,35" }], { nombres: 0.1 })),
          micros: ["decimal_defi", "decimal_comparer", "decimal_arrondir"],
        },
        {
          titre: "La course de 60 mètres",
          enonce: "Au stade, Sarah, l'entraîneuse, chronomètre quatre coureurs, en secondes : Lina 9,8 ; Tom 10,05 ; Adam 9,75 ; Zoé 10,2.\na) Qui est le plus rapide ?\nb) Range les temps du plus petit au plus grand.\nc) Arrondis le temps de Tom à la seconde.\nd) Combien de coureurs ont mis moins de 10 secondes ?",
          reponses: [
            { question: "a)", attendu: "Adam" },
            { question: "b)", attendu: "9,75 < 9,8 < 10,05 < 10,2", ordre: true },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "J'écris tous les temps en centièmes : 9,80 ; 10,05 ; 9,75 ; 10,20.\na) Le plus rapide met le MOINS de temps. Avec 9 unités : 9,75 et 9,80. Et 75 centièmes < 80 centièmes. Adam est le plus rapide.\nb) Avec 10 unités : 10,05 < 10,20. Donc 9,75 < 9,8 < 10,05 < 10,2.\nc) 10,05 : le chiffre des dixièmes est 0. Je garde : 10 secondes.\nd) Moins de 10 s : Adam (9,75) et Lina (9,8). Il y a 2 coureurs.\n⛔ Le piège du a) : choisir le plus grand nombre. En course, le plus grand temps, c'est le plus LENT.\nRéponse : a) Adam ; b) 9,75 < 9,8 < 10,05 < 10,2 ; c) 10 s ; d) 2.",
          micros: ["decimal_ordonner", "decimal_comparer", "decimal_arrondir"],
        },
        {
          titre: "Le laboratoire",
          enonce: "Une chimiste mesure le liquide de quatre flacons, en litres. A : $\\dfrac{7}{10}$ L ; B : 0,75 L ; C : $\\dfrac{68}{100}$ L ; D : 0,07 L.\na) Écris la quantité du flacon A en nombre décimal.\nb) Écris la quantité du flacon C en nombre décimal.\nc) Quel flacon contient le plus de liquide ? Écris sa lettre.\nd) Range les flacons du moins rempli au plus rempli. Écris les lettres.",
          reponses: [
            { question: "a)", attendu: ["0,7"], exact: true },
            { question: "b)", attendu: ["0,68"], exact: true },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: ["D ; C ; A ; B", "D < C < A < B"], ordre: true },
          ],
          correction:
            "a) 7 dixièmes : $\\dfrac{7}{10} = 0{,}7$.\nb) 68 centièmes : $\\dfrac{68}{100} = 0{,}68$.\nJ'écris tout en centièmes : A = 0,70 ; B = 0,75 ; C = 0,68 ; D = 0,07.\nc) Le plus grand : 75 centièmes. C'est le flacon B.\nd) Je range : 7 < 68 < 70 < 75 centièmes. D, puis C, puis A, puis B.\n⛔ Le piège : croire D bien rempli parce qu'il y a un 7, comme A. Mais 0,07, ce sont 7 CENTIÈMES : 10 fois moins que 0,7.\nRéponse : a) 0,7 ; b) 0,68 ; c) B ; d) D, C, A, B.",
          micros: ["decimal_fraction", "fraction_decimale_ordonner", "decimal_comparer"],
        },
        {
          titre: "Le code du cadenas",
          enonce: "Le code du cadenas de Hugo est un nombre décimal : $9 + \\dfrac{2}{10} + \\dfrac{6}{100}$.\na) Écris ce code avec une virgule.\nb) Le code du vélo de sa sœur est $4 + \\dfrac{7}{100}$. Écris-le avec une virgule.\nc) Quel nombre est 10 fois plus petit que le code de Hugo ?\nA : 92,6 ; B : 9,026 ; C : 0,926",
          reponses: [
            { question: "a)", attendu: ["9,26"], exact: true },
            { question: "b)", attendu: ["4,07"], exact: true },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "a) 9 unités, 2 dixièmes, 6 centièmes : 9,26.\nb) 4 unités, 0 dixième, 7 centièmes : 4,07.\nc) 10 fois plus petit : je divise par 10. Chaque chiffre recule d'un rang.\n9 unités → 9 dixièmes ; 2 dixièmes → 2 centièmes ; 6 centièmes → 6 millièmes. 9,26 ÷ 10 = 0,926. Choix C.\n⛔ Le piège du b) : écrire 4,7. Il n'y a pas de dixièmes : le 0 garde leur place.\nRéponse : a) 9,26 ; b) 4,07 ; c) C.",
          micros: ["decimal_somme_fractions", "decimal_diviser_puissance_dix", "decimal_defi"],
        },
        {
          titre: "Le sentier de randonnée",
          enonce: "Sur un sentier de La Réunion, Noé, guide de montagne, note les distances depuis le parking, en km. R est un refuge, S est une source. S est pile au milieu de deux petits traits.\na) À quelle distance est le refuge R ?\nb) À quelle distance est la source S ?\nc) Arrondis la distance de la source au dixième.\nd) Lequel est le plus loin du parking : R ou S ?",
          figure: droiteRel(3, 4, 0.1, [
            { value: 3.6, label: "R" },
            { value: 3.15, label: "S" },
          ], { nombres: 1 }),
          reponses: [
            { question: "a)", attendu: "3,6" },
            { question: "b)", attendu: "3,15" },
            { question: "c)", attendu: "3,2" },
            { question: "d)", attendu: "R" },
          ],
          correction:
            "De 3 à 4, il y a 10 sauts : un saut vaut 0,1 km.\na) R est à 6 sauts après 3 : 3,6 km.\nb) S est entre 3,1 et 3,2, pile au milieu : entre 3,10 et 3,20. C'est 3,15 km.\nc) 3,15 : le chiffre des centièmes est 5. Je monte : 3,2 km.\nd) Je compare 3,60 et 3,15 : 6 dixièmes > 1 dixième. Le refuge R est plus loin.\n⛔ Le piège du d) : choisir S parce que 15 > 6. Avec les zéros : 3,60 > 3,15.\nRéponse : a) 3,6 km ; b) 3,15 km ; c) 3,2 km ; d) R.",
          micros: ["decimal_droite", "decimal_arrondir", "decimal_comparer"],
        },
      ],
    },
  ],
};
