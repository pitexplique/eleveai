// ─── Fiche d'exercices : puissances et écriture scientifique (3e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-puissances.tsx` et sur les
// six micros du coach, notionId entier_puissance. Le périmètre est celui de la
// fiche de cours : exposants entiers POSITIFS pour une base quelconque, et
// exposants NÉGATIFS seulement en base dix — c'est là que le programme de 3e les
// emploie. Ni $a^{-n}$ en général, ni $a^0$ (c'est la feuille de seconde,
// `maths-seconde-puissances.tsx`).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris (Terre-Lune, virus, disque,
// 0,004). La distance Terre-Lune revient seulement comme POINT DE COMPARAISON à
// l'exercice 20.
//
// Les corrigés sont écrits à la première personne, comme la feuille de 3e sur la
// proportionnalité : c'est la voix du cahier, pas celle du manuel.
//
// Les chiffres réels, et d'où ils viennent (arrondis pour le calcul) :
//   · vitesse de la lumière 299 792 km/s ≈ 3 × 10⁵ km/s (définition du mètre, BIPM) ;
//   · distance moyenne Terre-Soleil ≈ 1,496 × 10⁸ km (UAI, unité astronomique) ;
//   · distance moyenne Soleil-Neptune ≈ 4,5 × 10⁹ km (NASA, Neptune Facts, 30,1 ua) ;
//   · diamètre d'un globule rouge ≈ 7 µm (manuels d'hématologie : 6 à 8 µm) ;
//   · 8 milliards d'humains le 15/11/2022 (ONU, World Population Prospects 2022) ;
//   · 2 × 10¹⁶ fourmis sur Terre (Schultheiss et al., PNAS, septembre 2022) ;
//     la longueur de 5 mm par fourmi est une HYPOTHÈSE de l'énoncé, dite comme telle ;
//   · tour de la Terre ≈ 40 000 km (définition historique du mètre) ;
//   · 1 To = 10¹² octets, 1 Mo = 10⁶ octets (préfixes SI, ceux des fabricants) ;
//     une photo de téléphone de 12 Mpx en JPEG pèse 3 à 5 Mo ;
//   · distance moyenne Terre-Lune ≈ 384 400 km ; papier de 80 g ≈ 0,1 mm.
//   · l'échiquier et les grains de riz (ex. 9) sont une LÉGENDE, pas un chiffre.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-puissances-3e.mjs`.
//
// Micro-compétences : entier_puissance_comprendre (1, 9), entier_puissance_calculer
// (2, 3, 9, 10, 20), entier_puissance_dix (4, 5, 11, 18, 20),
// entier_puissance_ecriture_scientifique (6, 12, 13, 14, 17, 18, 19),
// entier_puissance_calcul (7, 8, 13, 15, 17-19), entier_puissance_defi (10, 16,
// 17, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme } from "@/lib/fiches-exercices/figures";

// ⭐ « Les élèves adorent les schémas » (Frédéric, 24/09) : un corrigé DESSINE
// dès que le dessin fait voir quelque chose — l'alternance des signes (3), la
// table des puissances de dix (4), le doublement en barres (9), l'ordre (14),
// le facteur 30 de la lumière (17), les préfixes de l'octet (18), le pliage (20).
// Les cases et les barres sont RELUES par le script de recalcul.

// Le tableau d'un corrigé. Du HTML, pas un canvas : quatre colonnes courtes
// tiennent à 360 px.
// ⚠️ Pas de formule dans les cases : elles ne traversent pas KaTeX. Les
// exposants s'y écrivent en Unicode (10⁻⁴).
const tableau = (lignes: [string, ...string[]][]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <tbody>
        {lignes.map(([entete, ...cases]) => (
          <tr key={entete}>
            <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">
              {entete}
            </th>
            {cases.map((c, i) => (
              <td key={i} className="border border-slate-400 px-3 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesPuissances3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "entier-puissance",
  titre: "Puissances et écriture scientifique",
  accroche:
    "Vingt exercices, du calcul seul au problème, avec un rappel de cours de quelques lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/3e/entier-puissance",
      titre: "Puissances et écriture scientifique",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Tu écris le produit si tu hésites, puis tu calcules.",
      rappel: [
        "$a^n$ est le produit de $n$ facteurs égaux à $a$ : $4^3 = 4 \\times 4 \\times 4 = 64$. Le nombre $a$ est la base, $n$ est l'exposant.",
        "Les parenthèses décident de la base : $(-3)^2 = 9$, mais $-3^2 = -9$.",
        "$10^n$ s'écrit avec un $1$ suivi de $n$ zéros ; $10^{-n}$ place le $1$ au $n$-ième rang après la virgule : $10^{-2} = 0{,}01$.",
        "Avec la même base : $a^m \\times a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$ et $(a^m)^n = a^{m \\times n}$.",
      ],
      exercices: [
        {
          enonce:
            "a) Écris sous la forme d'une puissance : $7 \\times 7 \\times 7 \\times 7$.\nb) Écris sous la forme d'une puissance : $(-3) \\times (-3) \\times (-3)$.\nc) Écris $5^3$ sous la forme d'un produit. Quelle est sa base ? Son exposant ?",
          correction:
            "a) Je compte les facteurs : le $7$ apparaît quatre fois. Réponse : $7 \\times 7 \\times 7 \\times 7 = 7^4$.\nb) Le facteur répété est $-3$ tout entier : je garde les parenthèses. Réponse : $(-3) \\times (-3) \\times (-3) = (-3)^3$.\nc) $5^3 = 5 \\times 5 \\times 5$. Réponse : la base est $5$, le nombre répété ; l'exposant est $3$, le nombre de facteurs.\n⛔ Le piège : confondre avec $7 \\times 4$. L'exposant compte des FACTEURS, il ne multiplie pas la base.",
          micros: ["entier_puissance_comprendre"],
        },
        {
          enonce: "Calcule sans calculatrice :\na) $2^3$\nb) $3^4$\nc) $6^1$\nd) $1^9$",
          correction:
            "a) $2^3 = 2 \\times 2 \\times 2 = 8$.\nb) $3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$. J'avance deux par deux : $3 \\times 3 = 9$, puis $9 \\times 9 = 81$.\nc) $6^1 = 6$ : un seul facteur, c'est le nombre lui-même.\nd) $1^9 = 1$ : $1$ multiplié par lui-même reste $1$, autant de fois qu'on veut.\n⛔ Le piège : $2^3 = 6$. Ça, c'est $2 \\times 3$. Un cube de côté $2$ contient $8$ petits cubes, pas $6$.",
          micros: ["entier_puissance_calculer"],
        },
        {
          enonce: "Calcule :\na) $(-2)^4$\nb) $-2^4$\nc) $(-2)^3$",
          correction:
            "a) La base est $-2$, entre parenthèses : $(-2)^4 = (-2) \\times (-2) \\times (-2) \\times (-2) = 16$. Quatre signes moins, un nombre PAIR : le résultat est positif.\nb) Sans parenthèses, l'exposant ne porte que sur le $2$ : $-2^4 = -(2 \\times 2 \\times 2 \\times 2) = -16$.\nc) $(-2)^3 = (-2) \\times (-2) \\times (-2) = -8$. Trois signes moins, un nombre IMPAIR : le résultat est négatif.\n⛔ Le piège : lire $-2^4$ comme $(-2)^4$. Les parenthèses décident de la base : $(-2)^4$ vaut $16$, mais $-2^4$ vaut $-16$.",
          schema: tableau([
            ["Exposant", "1", "2", "3", "4"],
            ["(−2) puissance n", "−2", "4", "−8", "16"],
            ["Signe", "−", "+", "−", "+"],
          ]),
          micros: ["entier_puissance_calculer"],
        },
        {
          enonce:
            "a) Écris en écriture décimale : $10^6$, puis $10^{-3}$.\nb) Écris sous la forme d'une puissance de $10$ : $0{,}0001$, puis $100\\,000$.",
          correction:
            "a) $10^6$ : un $1$ suivi de six zéros, $10^6 = 1\\,000\\,000$.\n$10^{-3}$ : le $1$ se place au troisième rang après la virgule, $10^{-3} = 0{,}001$.\nb) Dans $0{,}0001$, le $1$ est au quatrième rang après la virgule : $0{,}0001 = 10^{-4}$.\n$100\\,000$ s'écrit avec cinq zéros : $100\\,000 = 10^5$.\n⛔ Le piège : croire que $10^{-3}$ est un nombre négatif. Il est POSITIF, plus petit que $1$ : c'est $\\dfrac{1}{1\\,000}$.",
          schema: tableau([
            ["Puissance", "10⁻⁴", "10⁻³", "10⁻¹", "10¹", "10⁵", "10⁶"],
            ["Décimal", "0,0001", "0,001", "0,1", "10", "100 000", "1 000 000"],
          ]),
          micros: ["entier_puissance_dix"],
        },
        {
          enonce: "Écris en écriture décimale :\na) $3{,}7 \\times 10^4$\nb) $52 \\times 10^{-3}$\nc) $0{,}8 \\times 10^2$",
          correction:
            "a) Multiplier par $10^4$ déplace la virgule de quatre rangs vers la droite : $3{,}7 \\times 10^4 = 37\\,000$.\nb) Multiplier par $10^{-3}$ déplace la virgule de trois rangs vers la GAUCHE : $52 \\times 10^{-3} = 0{,}052$.\nc) Deux rangs vers la droite : $0{,}8 \\times 10^2 = 80$.\n⛔ Le piège : coller quatre zéros derrière $3{,}7$ et écrire $3{,}70000$. C'est la virgule qui se déplace ; des zéros ajoutés au bout d'un décimal ne changent rien.",
          micros: ["entier_puissance_dix"],
        },
        {
          enonce: "Donne l'écriture scientifique de :\na) $45\\,000$\nb) $0{,}0062$\nc) $830$",
          correction:
            "L'écriture scientifique est $a \\times 10^n$ avec un seul chiffre non nul avant la virgule : $1 \\leqslant a < 10$.\na) Je place la virgule après le $4$ : $4{,}5$. Pour revenir à $45\\,000$, il faut la déplacer de quatre rangs vers la droite. Réponse : $45\\,000 = 4{,}5 \\times 10^{4}$.\nb) Je place la virgule après le $6$ : $6{,}2$. Pour revenir à $0{,}0062$, trois rangs vers la gauche, donc un exposant négatif. Réponse : $0{,}0062 = 6{,}2 \\times 10^{-3}$.\nc) Deux rangs vers la droite. Réponse : $830 = 8{,}3 \\times 10^{2}$.\n⛔ Le piège : écrire $45 \\times 10^3$. Le calcul est juste, mais $45$ a deux chiffres avant la virgule : ce n'est pas l'écriture scientifique.",
          micros: ["entier_puissance_ecriture_scientifique"],
        },
        {
          enonce: "Écris sous la forme d'une seule puissance de $10$ :\na) $10^5 \\times 10^3$\nb) $10^7 \\div 10^2$\nc) $(10^2)^3$",
          correction:
            "a) Je compte les zéros : $100\\,000 \\times 1\\,000$ en a $5 + 3$. Réponse : $10^5 \\times 10^3 = 10^{5+3} = 10^8$.\nb) Diviser par $10^2$ retire deux zéros aux sept. Réponse : $10^7 \\div 10^2 = 10^{7-2} = 10^5$.\nc) $(10^2)^3 = 10^2 \\times 10^2 \\times 10^2$ : trois fois deux zéros. Réponse : $(10^2)^3 = 10^{2 \\times 3} = 10^6$.\n⛔ Le piège : multiplier les exposants dans a) et écrire $10^{15}$. Pour un PRODUIT de puissances, on ADDITIONNE les exposants.",
          micros: ["entier_puissance_calcul"],
        },
        {
          enonce: "Écris sous la forme d'une seule puissance :\na) $3^2 \\times 3^5$\nb) $2^9 \\div 2^4$\nc) $(5^2)^3$",
          correction:
            "a) $3^2 \\times 3^5 = (3 \\times 3) \\times (3 \\times 3 \\times 3 \\times 3 \\times 3)$ : sept facteurs $3$. Réponse : $3^2 \\times 3^5 = 3^{2+5} = 3^7$.\nb) Dans $\\dfrac{2^9}{2^4}$, les quatre facteurs $2$ du bas se simplifient avec quatre du haut ; il en reste $9 - 4 = 5$. Réponse : $2^9 \\div 2^4 = 2^{9-4} = 2^5$.\nc) $(5^2)^3 = 5^2 \\times 5^2 \\times 5^2$ : trois paquets de deux facteurs, six facteurs en tout. Réponse : $(5^2)^3 = 5^{2 \\times 3} = 5^6$.\n⛔ Le piège : écrire que $(5^2)^3$ vaut $5^5$. Une puissance de puissance MULTIPLIE les exposants ; c'est le produit $5^2 \\times 5^3$ qui s'écrit avec l'exposant $2 + 3$.",
          micros: ["entier_puissance_calcul"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Tu justifies chaque réponse par un calcul.",
      rappel: [
        "L'écriture scientifique d'un nombre positif est $a \\times 10^n$ avec $1 \\leqslant a < 10$ : un seul chiffre non nul avant la virgule.",
        "Pour multiplier ou diviser deux écritures scientifiques, je regroupe les nombres d'un côté, les puissances de dix de l'autre.",
        "Pour comparer deux écritures scientifiques, je regarde d'abord l'exposant, puis le nombre devant.",
        "Les règles ne valent que pour un produit ou un quotient : il n'y en a AUCUNE pour une somme de puissances.",
      ],
      exercices: [
        {
          enonce:
            "La légende de l'échiquier : on pose $1$ grain de riz sur la première case, $2$ sur la deuxième, $4$ sur la troisième, et chaque case reçoit le double de la précédente.\na) Combien de grains sur la case $4$ ? Écris ce nombre comme une puissance de $2$.\nb) Quelle puissance de $2$ donne le nombre de grains de la case $8$, la dernière de la première rangée ? Calcule-la.\nc) Un élève dit : « sur la case $11$, il y a $2^{11}$ grains ». A-t-il raison ? Combien y en a-t-il ?",
          correction:
            "a) Case $1$ : $1$ grain ; case $2$ : $2$ ; case $3$ : $2 \\times 2 = 4$ ; case $4$ : $2 \\times 2 \\times 2 = 8$. Réponse : $8 = 2^3$ grains.\nb) À chaque case, un facteur $2$ de plus. La case $4$ en compte trois, donc la case $8$ en compte sept : $2^7 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 128$. Réponse : $128$ grains.\nc) La case $n$ porte $n - 1$ facteurs $2$, car la première case n'en a aucun. Case $11$ : $2^{10} = 1\\,024$. Réponse : il a tort, il y a $1\\,024$ grains.\n⛔ Le piège : prendre le numéro de la case pour l'exposant. Je vérifie sur une case que je connais : la case $3$ porte $4$ grains, c'est $2 \\times 2$, deux facteurs seulement.",
          schema: (
            <div className="space-y-3">
              {tableau([
                ["Case", "1", "2", "3", "4", "8", "11"],
                ["Facteurs 2", "aucun", "1", "2", "3", "7", "10"],
                ["Grains", "1", "2", "4", "8", "128", "1 024"],
              ])}
              {diagramme("barres", [
                { label: "Case 1", value: 1 },
                { label: "Case 2", value: 2 },
                { label: "Case 3", value: 4 },
                { label: "Case 4", value: 8 },
                { label: "Case 5", value: 16 },
                { label: "Case 6", value: 32 },
                { label: "Case 7", value: 64 },
                { label: "Case 8", value: 128 },
              ], 7)}
            </div>
          ),
          micros: ["entier_puissance_comprendre", "entier_puissance_calculer"],
        },
        {
          enonce:
            "a) Calcule $2^5$ et $5^2$. Sont-ils égaux ?\nb) Même question avec $3^4$ et $4^3$.\nc) Trouve deux nombres entiers différents $a$ et $b$ tels que $a^b$ et $b^a$ soient égaux.",
          correction:
            "a) $2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$ et $5^2 = 5 \\times 5 = 25$. Réponse : non, $32 \\neq 25$.\nb) $3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$ et $4^3 = 4 \\times 4 \\times 4 = 64$. Réponse : non, $81 \\neq 64$.\nc) J'essaie $2$ et $4$ : $2^4 = 16$ et $4^2 = 16$. Réponse : $a = 2$ et $b = 4$ conviennent.\n⛔ Le piège : croire qu'on peut échanger la base et l'exposant. La base est le nombre répété, l'exposant le nombre de répétitions : ils n'ont pas le même rôle, et le c) est une exception, pas une règle.",
          micros: ["entier_puissance_calculer", "entier_puissance_defi"],
        },
        {
          enonce:
            "Écris sous la forme d'une seule puissance de $10$ :\na) $10^{-2} \\times 10^5$\nb) $10^{-4} \\times 10^{-3}$\nc) $10^3 \\div 10^{-2}$",
          correction:
            "Les règles sont les mêmes qu'avec des exposants positifs ; seul le calcul sur les exposants demande de surveiller les signes.\na) $10^{-2} \\times 10^5 = 10^{-2+5} = 10^3$. Contrôle : $0{,}01 \\times 100\\,000 = 1\\,000$.\nb) $10^{-4} \\times 10^{-3} = 10^{-4+(-3)} = 10^{-7}$.\nc) $10^3 \\div 10^{-2} = 10^{3-(-2)} = 10^{3+2} = 10^5$. Contrôle : $1\\,000 \\div 0{,}01 = 100\\,000$ ; diviser par un centième, c'est multiplier par cent.\n⛔ Le piège : calculer $3 - 2$ au lieu de $3 - (-2)$ dans c), et répondre $10^1$. Soustraire $-2$, c'est ajouter $2$.",
          micros: ["entier_puissance_dix"],
        },
        {
          enonce:
            "Donne l'écriture scientifique de chaque nombre.\na) La distance moyenne de la Terre au Soleil : $150\\,000\\,000$ km.\nb) Le diamètre d'un globule rouge : $0{,}000007$ m.\nc) Le nombre d'êtres humains en novembre 2022 : $8\\,000\\,000\\,000$.\nd) Un élève a écrit $0{,}52 \\times 10^5$. Corrige-le en écriture scientifique.",
          correction:
            "a) Je place la virgule après le premier chiffre : $1{,}5$. Pour revenir au nombre, huit rangs vers la droite. Réponse : $1{,}5 \\times 10^{8}$ km.\nb) Le premier chiffre non nul est le $7$. Pour revenir à $0{,}000007$, six rangs vers la gauche. Réponse : $7 \\times 10^{-6}$ m.\nc) Neuf zéros après le $8$. Réponse : $8 \\times 10^{9}$ êtres humains.\nd) $0{,}52$ est plus petit que $1$ : ce n'est pas une écriture scientifique. $0{,}52 = 5{,}2 \\times 10^{-1}$, donc $0{,}52 \\times 10^5 = 5{,}2 \\times 10^{-1} \\times 10^5$. Réponse : $5{,}2 \\times 10^{4}$.\n⛔ Le piège : dans d), augmenter l'exposant. Le nombre devant devient dix fois plus grand ($0{,}52$ devient $5{,}2$) : pour garder la même valeur, la puissance de dix doit devenir dix fois plus petite, et l'exposant perd $1$.",
          micros: ["entier_puissance_ecriture_scientifique"],
        },
        {
          enonce:
            "Calcule et donne le résultat en écriture scientifique :\n$A = 3 \\times 10^4 \\times 2 \\times 10^5$\n$B = 6 \\times 10^7 \\times 5 \\times 10^{-3}$\n$C = \\dfrac{8 \\times 10^6}{2 \\times 10^2}$",
          correction:
            "Je regroupe les nombres d'un côté, les puissances de dix de l'autre : dans un produit, on a le droit de changer l'ordre des facteurs.\n$A = (3 \\times 2) \\times (10^4 \\times 10^5) = 6 \\times 10^{9}$.\n$B = (6 \\times 5) \\times (10^7 \\times 10^{-3}) = 30 \\times 10^{4}$. Mais $30$ n'est pas entre $1$ et $10$ : $30 = 3 \\times 10$, donc $B = 3 \\times 10^{5}$.\n$C = \\dfrac{8}{2} \\times \\dfrac{10^6}{10^2} = 4 \\times 10^{4}$.\n⛔ Le piège : s'arrêter à $30 \\times 10^4$ pour B. Le calcul est juste, mais l'écriture scientifique demande un seul chiffre avant la virgule.",
          micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_calcul"],
        },
        {
          enonce:
            "Range ces nombres dans l'ordre croissant :\n$3{,}2 \\times 10^{-4}$ ; $5 \\times 10^{-5}$ ; $1{,}1 \\times 10^{-3}$ ; $0{,}0009$.",
          correction:
            "J'écris d'abord $0{,}0009$ en écriture scientifique : $0{,}0009 = 9 \\times 10^{-4}$.\nJe compare les exposants : la plus grande puissance de dix l'emporte.\nLe plus petit exposant est $-5$ : $5 \\times 10^{-5}$ est le plus petit nombre.\nDeux nombres ont l'exposant $-4$ : je compare $3{,}2$ et $9$, donc $3{,}2 \\times 10^{-4}$ est plus petit que $9 \\times 10^{-4}$.\nLe plus grand exposant est $-3$ : $1{,}1 \\times 10^{-3}$ est le plus grand.\nRéponse : $5 \\times 10^{-5} < 3{,}2 \\times 10^{-4} < 0{,}0009 < 1{,}1 \\times 10^{-3}$.\n⛔ Le piège : croire que $-5$ est un « gros » exposant parce que $5$ est grand. $10^{-5} = 0{,}00001$ est dix fois plus petit que $10^{-4}$.",
          schema: tableau([
            ["Écriture", "5 × 10⁻⁵", "3,2 × 10⁻⁴", "9 × 10⁻⁴", "1,1 × 10⁻³"],
            ["Décimal", "0,00005", "0,00032", "0,0009", "0,0011"],
          ]),
          micros: ["entier_puissance_ecriture_scientifique"],
        },
        {
          enonce:
            "Écris sous la forme d'une seule puissance, puis calcule :\n$A = \\dfrac{2^3 \\times 2^4}{2^5}$\n$B = (3^2)^2 \\times 3$",
          correction:
            "A : en haut, $2^3 \\times 2^4 = 2^{3+4} = 2^7$. Puis $\\dfrac{2^7}{2^5} = 2^{7-5} = 2^2$. Réponse : $A = 2^2 = 4$.\n⭐ Contrôle par les nombres : $\\dfrac{8 \\times 16}{32} = \\dfrac{128}{32} = 4$.\nB : $(3^2)^2 = 3^{2 \\times 2} = 3^4$. Le dernier $3$ s'écrit $3^1$ : un facteur de plus. $3^4 \\times 3^1 = 3^{4+1} = 3^5$. Réponse : $B = 3^5 = 243$.\n⛔ Le piège : oublier le $3$ seul, parce qu'aucun exposant n'est écrit. $3 = 3^1$ : il compte pour un facteur.",
          micros: ["entier_puissance_calcul"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie par un calcul.\na) $2^3 + 2^4 = 2^7$\nb) $2^3 \\times 3^3 = 6^3$\nc) $10^2 + 10^3 = 10^5$\nd) $(-1)^{10} = 1$",
          correction:
            "a) $2^3 + 2^4 = 8 + 16 = 24$, alors que $2^7 = 128$. FAUX : aucune règle ne permet d'additionner des puissances en ajoutant les exposants.\nb) $2^3 \\times 3^3 = 8 \\times 27 = 216$ et $6^3 = 6 \\times 6 \\times 6 = 216$. VRAI : l'exposant est commun, et $(2 \\times 3) \\times (2 \\times 3) \\times (2 \\times 3)$ contient trois $2$ et trois $3$.\nc) $10^2 + 10^3 = 100 + 1\\,000 = 1\\,100$, alors que $10^5 = 100\\,000$. FAUX.\nd) Dix facteurs $-1$ : un nombre pair de signes moins, le produit est positif. VRAI : $(-1)^{10} = 1$.\n⛔ Le piège : répondre « faux » au b) par réflexe, parce que les bases sont différentes. Ce qui décide, c'est ce qui est COMMUN : ici, l'exposant.",
          micros: ["entier_puissance_calcul", "entier_puissance_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation réelle, plusieurs questions qui s'enchaînent. Tu calcules en écriture scientifique et tu contrôles l'ordre de grandeur.",
      rappel: [
        "Je traduis l'énoncé en calcul (durée $=$ distance $\\div$ vitesse, longueur totale $=$ nombre $\\times$ longueur d'un seul), puis je calcule en écriture scientifique.",
        "Je contrôle l'ordre de grandeur : un résultat mille fois trop grand se voit tout de suite à l'exposant.",
        "Doubler $n$ fois de suite, c'est multiplier par $2^n$.",
      ],
      exercices: [
        {
          titre: "Le voyage de la lumière",
          enonce:
            "La lumière parcourt environ $3 \\times 10^5$ km par seconde. Le Soleil est à environ $1{,}5 \\times 10^8$ km de la Terre, et à environ $4{,}5 \\times 10^9$ km de Neptune.\na) Combien de secondes la lumière du Soleil met-elle pour arriver sur Terre ? Convertis en minutes et secondes.\nb) Même question pour Neptune, en heures et minutes.\nc) Combien de fois Neptune est-elle plus loin du Soleil que la Terre ?",
          correction:
            "a) Durée $=$ distance $\\div$ vitesse : $\\dfrac{1{,}5 \\times 10^8}{3 \\times 10^5} = \\dfrac{1{,}5}{3} \\times 10^{8-5} = 0{,}5 \\times 10^3 = 500$ s. Et $500 = 8 \\times 60 + 20$. Réponse : $8$ min $20$ s.\nb) $\\dfrac{4{,}5 \\times 10^9}{3 \\times 10^5} = 1{,}5 \\times 10^{4} = 15\\,000$ s. Une heure compte $3\\,600$ s : $4 \\times 3\\,600 = 14\\,400$, il reste $600$ s, soit $10$ min. Réponse : $4$ h $10$ min.\nc) $\\dfrac{4{,}5 \\times 10^9}{1{,}5 \\times 10^8} = 3 \\times 10^{1} = 30$. Réponse : Neptune est environ $30$ fois plus loin du Soleil que la Terre.\n⭐ Contrôle : $30 \\times 500 = 15\\,000$ s, la durée du b). Trente fois plus loin, trente fois plus longtemps.\n⛔ Le piège : diviser les exposants, $8 \\div 5$. Pour un QUOTIENT de puissances de dix, on SOUSTRAIT les exposants.",
          schema: diagramme("barres", [
            { label: "Vers la Terre (s)", value: 500 },
            { label: "Vers Neptune (s)", value: 15000 },
          ], 1),
          micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_calcul", "entier_puissance_defi"],
        },
        {
          titre: "Le disque plein de photos",
          enonce:
            "Un disque dur externe a une capacité de $1$ To, soit $10^{12}$ octets. Une photo prise avec un téléphone pèse environ $4$ Mo, soit $4 \\times 10^6$ octets.\na) Combien de photos le disque peut-il contenir ? Donne le résultat en écriture scientifique, puis en écriture décimale.\nb) Une personne prend $25$ photos par jour. Combien de jours lui faut-il pour remplir le disque ? Environ combien d'années ?\nc) Un Mo vaut $10^6$ octets et un Go vaut $10^9$ octets. Combien de Mo y a-t-il dans un Go ?",
          correction:
            "a) Nombre de photos $=$ capacité $\\div$ poids d'une photo : $\\dfrac{10^{12}}{4 \\times 10^6} = \\dfrac{1}{4} \\times 10^{12-6} = 0{,}25 \\times 10^6$.\n$0{,}25$ est plus petit que $1$ : $0{,}25 \\times 10^6 = 2{,}5 \\times 10^{5}$. Réponse : $2{,}5 \\times 10^{5}$ photos, soit $250\\,000$ photos.\nb) $250\\,000 \\div 25 = 10\\,000$ jours. Une année compte $365$ jours : $10\\,000 \\div 365 \\approx 27{,}4$. Réponse : $10\\,000$ jours, environ $27$ ans.\nc) $\\dfrac{10^9}{10^6} = 10^{9-6} = 10^3$. Réponse : un Go contient $1\\,000$ Mo.\n⛔ Le piège : dans a), s'arrêter à $0{,}25 \\times 10^6$. Le nombre devant doit être entre $1$ et $10$ : il devient dix fois plus grand, l'exposant perd $1$.",
          schema: tableau([
            ["Préfixe", "kilo (ko)", "méga (Mo)", "giga (Go)", "téra (To)"],
            ["Octets", "10³", "10⁶", "10⁹", "10¹²"],
            ["En clair", "mille", "un million", "un milliard", "mille milliards"],
          ]),
          micros: ["entier_puissance_dix", "entier_puissance_ecriture_scientifique", "entier_puissance_calcul"],
        },
        {
          titre: "Les fourmis de la Terre",
          enonce:
            "En 2022, une équipe de chercheurs a estimé qu'il vit sur Terre environ $2 \\times 10^{16}$ fourmis. La même année, l'humanité a franchi les $8 \\times 10^9$ habitants.\na) Combien y a-t-il de fourmis par être humain ? Donne le résultat en écriture scientifique, puis en écriture décimale.\nb) On prend $5$ mm, soit $5 \\times 10^{-3}$ m, pour la longueur d'une fourmi. Quelle longueur, en mètres, feraient toutes les fourmis mises bout à bout ?\nc) Convertis cette longueur en kilomètres. Le tour de la Terre mesure environ $4 \\times 10^4$ km : combien de tours ferait la file ?",
          correction:
            "a) $\\dfrac{2 \\times 10^{16}}{8 \\times 10^9} = \\dfrac{2}{8} \\times 10^{16-9} = 0{,}25 \\times 10^7 = 2{,}5 \\times 10^{6}$. Réponse : environ $2{,}5 \\times 10^{6}$ fourmis par être humain, soit $2\\,500\\,000$.\nb) Longueur $=$ nombre $\\times$ longueur d'une fourmi : $2 \\times 10^{16} \\times 5 \\times 10^{-3} = (2 \\times 5) \\times 10^{16+(-3)} = 10 \\times 10^{13} = 10^{14}$ m.\nc) $1$ km $= 10^3$ m, donc je divise par $10^3$ : $10^{14-3} = 10^{11}$ km. Puis $\\dfrac{10^{11}}{4 \\times 10^4} = 0{,}25 \\times 10^7 = 2{,}5 \\times 10^{6}$. Réponse : la file ferait environ deux millions et demi de tours de la Terre.\n⛔ Le piège : dans b), écrire que $10 \\times 10^{13}$ fait $10^{13}$, en oubliant le $10$ devant. $10 = 10^1$ : il ajoute un zéro.",
          micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_calcul", "entier_puissance_defi"],
        },
        {
          titre: "Plier une feuille jusqu'à la Lune",
          enonce:
            "Une feuille de papier a une épaisseur de $0{,}1$ mm, soit $10^{-4}$ m. À chaque pliage en deux, le nombre de couches double.\na) Combien de couches après $1$, $2$, puis $3$ pliages ? Après $n$ pliages ?\nb) Combien de couches après $10$ pliages ? Quelle épaisseur, en mètres ?\nc) Après $42$ pliages, on aurait environ $4{,}4 \\times 10^{12}$ couches. Quelle serait l'épaisseur, en kilomètres ? Compare-la à la distance Terre-Lune, environ $3{,}84 \\times 10^5$ km.",
          correction:
            "a) $1$ pliage : $2$ couches ; $2$ pliages : $2 \\times 2 = 4$ ; $3$ pliages : $2 \\times 2 \\times 2 = 8$. Réponse : après $n$ pliages, $2^n$ couches, un facteur $2$ par pliage.\nb) $2^{10} = 1\\,024$ couches. Épaisseur : $1\\,024 \\times 10^{-4} = 0{,}1024$ m. Réponse : environ $10$ cm, l'épaisseur d'un gros dictionnaire.\nc) $4{,}4 \\times 10^{12} \\times 10^{-4} = 4{,}4 \\times 10^{8}$ m. En kilomètres, je divise par $10^3$ : $4{,}4 \\times 10^{5}$ km. Même exposant que la distance Terre-Lune, et $4{,}4 > 3{,}84$. Réponse : la pile dépasserait la Lune.\n⭐ En vrai, la feuille refuse de se plier bien avant : vers le septième pliage. Mais le calcul montre la force du doublement : $42$ doublements suffisent pour passer de $0{,}1$ mm à la Lune.\n⛔ Le piège : croire qu'après $10$ pliages on a $2 \\times 10 = 20$ couches. Chaque pliage MULTIPLIE par $2$, il n'ajoute pas $2$.",
          schema: tableau([
            ["Pliages", "1", "2", "3", "10"],
            ["Couches", "2", "4", "8", "1 024"],
            ["Épaisseur", "0,2 mm", "0,4 mm", "0,8 mm", "10,24 cm"],
          ]),
          micros: ["entier_puissance_calculer", "entier_puissance_dix", "entier_puissance_defi"],
        },
      ],
    },
  ],
};
