// ─── Fiche d'exercices : le théorème de Pythagore (3e) — 20 exercices corrigés ──
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-pythagore.tsx` et sur les
// micros du coach de 3e (notionId pythagore_theoreme). L'angle de la 3e, comme
// le cours : la RÉCIPROQUE (démontrer qu'un angle est droit, ou qu'il ne l'est
// pas) et la RÉDACTION en quatre temps que le brevet note. Le calcul d'une
// longueur, vu en 4e, sert de premier niveau.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les triplets 3-4-5,
// 6-8-10, 5-12-13, 9-12-15, ni le triangle 4-5-6, ni l'échelle de 5 m à 3 m du
// mur. ⛔ Ni les deux diagonales de la feuille de la racine carrée (terrain de
// handball, écran « 15,6 pouces »).
//
// Les pièges nommés : l'hypoténuse mal repérée (1, 2, 4, 7, 14, 17),
// additionner les longueurs au lieu des carrés (3, 6, 18), oublier la racine
// (5), le théorème au lieu de la réciproque pour démontrer un angle droit (11,
// 13, 20), « presque égal » pris pour égal (8, 12), les unités mêlées (19),
// l'arrondi pris trop tôt (15).
//
// Les chiffres du monde, et d'où ils viennent :
// - échelle : la règle du « un pour quatre », pied de l'échelle à environ un
//   quart de sa longueur du mur (OSHA, 29 CFR 1926.1053(b)(5)(i) ; l'INRS dit
//   la même chose en angle, environ 75°) — ex. 17 ;
// - mille marin = 1 852 m (Conférence hydrographique internationale, 1929 ;
//   valeur admise par le BIPM) — ex. 15 ;
// - rampe : pente au plus 5 % (arrêté du 20 avril 2017, accessibilité des
//   établissements recevant du public lors de leur construction) — ex. 19 ;
// - terrain de football : 105 m × 68 m, les dimensions recommandées par la FIFA
//   pour les matchs internationaux (IFAB, Lois du jeu, loi 1 : de 100 à 110 m
//   sur 64 à 75 m) — ex. 20 ;
// - la tyrolienne (45 m de dénivelée, 200 m à l'horizontale) est IMAGINÉE, à
//   l'ordre de grandeur d'un parc de loisirs — ex. 18.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés ont
// leur triangle, dessiné avec ses VRAIES coordonnées — un triangle 8-15-17 est
// dessiné 8-15-17 —, l'angle droit marqué, l'hypoténuse nommée, le côté cherché
// « ? » suivi de sa valeur. Pour la réciproque, le triangle porte ses trois
// côtés ; un triangle qui n'est PAS rectangle est dessiné tel qu'il est (l'angle
// de 89,6° de l'exercice 12 ne se voit pas : c'est la leçon).
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// autres feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-pythagore-3e.mjs` —
// chaque carré est refait en entiers, chaque racine cherchée par dichotomie,
// chaque triangle relu : angle droit au sommet marqué, côtés chiffrés à
// l'échelle, hypoténuse en face de l'angle droit.
//
// Micro-compétences : pythagore_reconnaitre (1, 2, 14), pythagore_calculer_
// hypotenuse (3, 5, 9, 15, 18, 19), pythagore_calculer_cote (4, 6, 10, 14, 17,
// 18), pythagore_reciproque (7, 8, 11, 12, 13, 16, 20), pythagore_rediger (9,
// 10, 11, 12, 13, 15, 17, 20), pythagore_defi (14, 16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { triangle } from "@/lib/fiches-exercices/figures";

/** Deux triangles côte à côte (exercices 16 et 20) : l'un rectangle, l'autre non.
 *  ⛔ MESURÉ À 375 PX (24/09) : côte à côte, les cotes tombaient à 9 px — l'un
 *  sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

export const exercicesPythagore3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "pythagore-theoreme",
  titre: "Le théorème de Pythagore et sa réciproque",
  accroche:
    "Vingt exercices, du calcul seul au problème : repérer l'hypoténuse, calculer une longueur, démontrer qu'un triangle est rectangle — ou qu'il ne l'est pas —, puis rédiger comme au brevet. Une échelle, une tyrolienne, un voilier, une rampe, le coin d'un terrain de football. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le triangle dessiné à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/pythagore-theoreme", titre: "Pythagore, sa réciproque, et la rédaction attendue" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je repère toujours l'angle droit avant de calculer.",
      rappel: [
        "L'HYPOTÉNUSE est le côté opposé à l'angle droit : le seul côté qui ne touche pas son sommet. C'est toujours le plus long côté.",
        "THÉORÈME : si le triangle $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$. Je cherche l'hypoténuse : j'additionne les carrés. Je cherche un autre côté : je soustrais.",
        "Je termine par la racine carrée : je connais $BC^2$, je veux $BC$.",
        "RÉCIPROQUE : si le carré du plus grand côté est égal à la somme des carrés des deux autres, alors le triangle est rectangle. Sinon, il ne l'est pas.",
      ],
      exercices: [
        {
          enonce:
            "Dans chaque triangle rectangle, nommer l'hypoténuse.\na) Le triangle $RST$ est rectangle en $S$.\nb) Le triangle $KLM$ est rectangle en $K$.\nc) Dans le triangle $UVW$, l'angle $\\widehat{W}$ est droit.\nd) L'hypoténuse est-elle toujours le côté « du bas » ? Toujours le plus long ?",
          correction:
            "L'hypoténuse est le côté OPPOSÉ à l'angle droit : celui qui ne touche pas son sommet. Je repère donc d'abord le sommet de l'angle droit, puis je prends le côté formé par les deux autres lettres.\na) L'angle droit est en $S$. Les deux autres sommets sont $R$ et $T$ : l'hypoténuse est $[RT]$.\nb) L'angle droit est en $K$ : l'hypoténuse est $[LM]$.\nc) L'angle droit est en $W$ : l'hypoténuse est $[UV]$.\nd) Pas toujours « en bas » : sur le dessin, $[RT]$ est penché, et c'est pourtant l'hypoténuse. En revanche, c'est TOUJOURS le plus long côté du triangle rectangle.\n⛔ Le piège : prendre le côté horizontal, ou le côté le plus « visible ». Seul l'angle droit décide.\nRéponse : $[RT]$ ; $[LM]$ ; $[UV]$ ; et l'hypoténuse est toujours le plus long côté.",
          schema: triangle({ A: [0, 0], B: [4, 2], C: [2, 6] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { CA: "hypoténuse" }, droit: "B" }),
          micros: ["pythagore_reconnaitre"],
        },
        {
          enonce:
            "Le triangle $ABC$ est rectangle en $A$.\na) Quelle est son hypoténuse ?\nb) Écrire l'égalité de Pythagore pour ce triangle.\nc) Un élève écrit $AB^2 = AC^2 + BC^2$. Où est l'erreur ?",
          correction:
            "a) L'angle droit est en $A$ : l'hypoténuse est le côté opposé, $[BC]$.\nb) Le théorème dit : le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés. J'écris donc l'hypoténuse SEULE d'un côté du signe égal : $BC^2 = AB^2 + AC^2$.\nc) Il a récité l'égalité comme si l'angle droit était en $C$, sans regarder la figure. Son égalité isole $AB$, qui n'est pas l'hypoténuse.\n⛔ Le piège : écrire l'égalité par habitude. Les lettres changent d'un triangle à l'autre : je repars toujours du sommet de l'angle droit.\nRéponse : l'hypoténuse est $[BC]$, et $BC^2 = AB^2 + AC^2$.",
          schema: triangle({ A: [2, 1], B: [6, 3], C: [0, 5] }, { cotes: { BC: "hypoténuse" }, droit: "A" }),
          micros: ["pythagore_reconnaitre"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $B$, avec $AB = 8$ cm et $BC = 15$ cm. Calculer $AC$.",
          correction:
            "Je repère l'angle droit : il est en $B$. L'hypoténuse est le côté opposé, $[AC]$ : c'est elle que je cherche.\nJ'écris l'égalité de Pythagore : $AC^2 = AB^2 + BC^2$.\nJe remplace par les longueurs : $AC^2 = 8^2 + 15^2 = 64 + 225 = 289$.\nJe connais $AC^2$ et je veux $AC$ : je prends la racine carrée. $AC = \\sqrt{289} = 17$ cm.\n⭐ Contrôle : $17$ est plus grand que $8$ et que $15$. L'hypoténuse est bien le plus long côté.\n⛔ Le piège : additionner les longueurs, $8 + 15 = 23$ cm. On additionne les CARRÉS, puis on prend la racine.\nRéponse : $AC = 17$ cm.",
          schema: triangle({ A: [0, 8], B: [0, 0], C: [15, 0] }, { cotes: { AB: "8 cm", BC: "15 cm", CA: "? = 17 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse"],
        },
        {
          enonce: "Le triangle $DEF$ est rectangle en $E$, avec $DF = 41$ cm et $DE = 9$ cm. Calculer $EF$.",
          correction:
            "L'angle droit est en $E$ : l'hypoténuse est $[DF]$, qui mesure $41$ cm. Cette fois, je connais l'hypoténuse et je cherche un côté de l'angle droit.\nPythagore : $DF^2 = DE^2 + EF^2$, donc $EF^2 = DF^2 - DE^2$. Je SOUSTRAIS, parce que le carré de l'hypoténuse est le total.\n$EF^2 = 41^2 - 9^2 = 1\\,681 - 81 = 1\\,600$.\n$EF = \\sqrt{1\\,600} = 40$ cm.\n⭐ Contrôle : $40 < 41$, le côté trouvé est bien plus court que l'hypoténuse.\n⛔ Le piège : prendre $[EF]$ pour l'hypoténuse et additionner. $41^2 + 9^2 = 1\\,762$ donnerait $EF \\approx 42$ cm : un côté plus long que l'hypoténuse, c'est impossible.\nRéponse : $EF = 40$ cm.",
          schema: triangle({ A: [0, 9], B: [0, 0], C: [40, 0] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "9 cm", BC: "? = 40 cm", CA: "41 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote"],
        },
        {
          enonce: "Le triangle $KLM$ est rectangle en $K$, avec $KL = 5$ cm et $KM = 9$ cm. Calculer la valeur exacte de $LM$, puis son arrondi au dixième.",
          correction:
            "L'angle droit est en $K$ : l'hypoténuse est $[LM]$.\n$LM^2 = KL^2 + KM^2 = 5^2 + 9^2 = 25 + 81 = 106$.\n$106$ n'est pas un carré parfait ($10^2 = 100$ et $11^2 = 121$) : la valeur exacte est $LM = \\sqrt{106}$ cm, et je sais déjà que $10 < LM < 11$.\nÀ la calculatrice, $\\sqrt{106} \\approx 10{,}296$, donc $LM \\approx 10{,}3$ cm au dixième.\n⛔ Le piège : s'arrêter à $LM = 106$ cm. $106$, c'est $LM^2$. Un triangle de côtés $5$ et $9$ cm n'a pas un côté de plus d'un mètre : sans la racine, la réponse est absurde.\nRéponse : $LM = \\sqrt{106} \\approx 10{,}3$ cm.",
          schema: triangle({ A: [0, 5], B: [0, 0], C: [9, 0] }, { noms: { A: "L", B: "K", C: "M" }, cotes: { AB: "5 cm", BC: "9 cm", CA: "? ≈ 10,3 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse"],
        },
        {
          enonce: "Le triangle $UVW$ est rectangle en $V$, avec $UW = 12$ cm et $UV = 7$ cm. Calculer $VW$, arrondi au dixième.",
          correction:
            "L'angle droit est en $V$ : l'hypoténuse est $[UW]$, $12$ cm. Je cherche un côté de l'angle droit : je soustrais.\n$UW^2 = UV^2 + VW^2$, donc $VW^2 = UW^2 - UV^2 = 12^2 - 7^2 = 144 - 49 = 95$.\n$VW = \\sqrt{95} \\approx 9{,}7$ cm (la calculatrice affiche $9{,}746\\ldots$).\n⭐ Contrôle : $9^2 = 81 < 95 < 100 = 10^2$, donc $VW$ est bien entre $9$ et $10$.\n⛔ Le piège : soustraire les longueurs, $12 - 7 = 5$ cm. Comme pour l'addition, on soustrait les CARRÉS.\nRéponse : $VW = \\sqrt{95} \\approx 9{,}7$ cm.",
          schema: triangle({ A: [0, 7], B: [0, 0], C: [9.7468, 0] }, { noms: { A: "U", B: "V", C: "W" }, cotes: { AB: "7 cm", BC: "? ≈ 9,7 cm", CA: "12 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote"],
        },
        {
          enonce: "Le triangle $LMN$ a pour côtés $LM = 20$ cm, $MN = 21$ cm et $LN = 29$ cm. Est-il rectangle ? Si oui, en quel sommet ?",
          correction:
            "Je ne sais pas si le triangle est rectangle : je ne peux PAS écrire « d'après le théorème de Pythagore ». J'utilise la réciproque, et je calcule les deux membres séparément.\nLe plus grand côté est $[LN]$ : c'est le seul qui puisse être l'hypoténuse.\nD'une part, $LN^2 = 29^2 = 841$.\nD'autre part, $LM^2 + MN^2 = 20^2 + 21^2 = 400 + 441 = 841$.\nLes deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle $LMN$ est rectangle en $M$ : l'angle droit est en face du plus grand côté $[LN]$, au sommet qu'il ne touche pas.\n⛔ Le piège : chercher l'angle droit en $L$ ou en $N$. Il est au sommet que le plus grand côté ne touche pas.\nRéponse : $LMN$ est rectangle en $M$.",
          schema: triangle({ A: [0, 20], B: [0, 0], C: [21, 0] }, { noms: { A: "L", B: "M", C: "N" }, cotes: { AB: "20 cm", BC: "21 cm", CA: "29 cm" }, droit: "B" }),
          micros: ["pythagore_reciproque"],
        },
        {
          enonce: "Le triangle $ABC$ a pour côtés $AB = 11$ cm, $BC = 9$ cm et $CA = 6$ cm. Est-il rectangle ?",
          correction:
            "Je teste avec la réciproque. Le plus grand côté est $[AB]$.\nD'une part, $AB^2 = 11^2 = 121$.\nD'autre part, $BC^2 + CA^2 = 9^2 + 6^2 = 81 + 36 = 117$.\n$121 \\neq 117$ : l'égalité de Pythagore n'est pas vérifiée. Or, si le triangle était rectangle, elle le serait forcément. D'après la contraposée du théorème de Pythagore, $ABC$ n'est pas rectangle.\n⭐ Comme $121 > 117$, l'angle en $C$ est un peu plus ouvert qu'un angle droit : environ $92°$ sur le dessin.\n⛔ Le piège : dire « presque égal, donc rectangle ». $121$ et $117$ ne sont pas égaux : la réponse est non.\nRéponse : $ABC$ n'est pas rectangle.",
          schema: triangle({ A: [0, 0], B: [11, 0], C: [3.4545, 4.9057] }, { cotes: { AB: "11 cm", BC: "9 cm", CA: "6 cm" } }),
          micros: ["pythagore_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Rédiger comme au brevet : la situation, l'égalité, le calcul, la conclusion.",
      rappel: [
        "CALCULER une longueur : « Dans le triangle $ABC$ rectangle en $A$, d'après le théorème de Pythagore, $BC^2 = AB^2 + AC^2$. » Puis le calcul, puis la racine, puis l'unité.",
        "DÉMONTRER qu'un triangle est rectangle : je calcule SÉPARÉMENT le carré du plus grand côté (« d'une part ») et la somme des carrés des deux autres (« d'autre part »).",
        "Égaux : « d'après la réciproque du théorème de Pythagore, le triangle est rectangle ». Différents : « d'après la contraposée du théorème de Pythagore, il n'est pas rectangle ».",
      ],
      exercices: [
        {
          enonce: "Le triangle $RST$ est rectangle en $S$, avec $RS = 2{,}8$ cm et $ST = 4{,}5$ cm. Calculer $RT$ en rédigeant comme au brevet.",
          correction:
            "Je rédige en quatre temps : la situation, l'égalité, le calcul, la conclusion.\n1. Dans le triangle $RST$ rectangle en $S$, l'hypoténuse est $[RT]$.\n2. D'après le théorème de Pythagore, $RT^2 = RS^2 + ST^2$.\n3. $RT^2 = 2{,}8^2 + 4{,}5^2 = 7{,}84 + 20{,}25 = 28{,}09$.\n4. Donc $RT = \\sqrt{28{,}09} = 5{,}3$ cm.\n⭐ La racine tombe juste : je le vérifie en élevant au carré, $5{,}3^2 = 28{,}09$.\n⛔ Le piège : écrire $2{,}8^2 = 5{,}6$. Élever au carré, c'est multiplier le nombre par LUI-MÊME : $2{,}8 \\times 2{,}8 = 7{,}84$, pas $2{,}8 \\times 2$.\nRéponse : $RT = 5{,}3$ cm.",
          schema: triangle({ A: [0, 2.8], B: [0, 0], C: [4.5, 0] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "2,8 cm", BC: "4,5 cm", CA: "? = 5,3 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
        },
        {
          enonce: "Le triangle $IJK$ est rectangle en $I$, avec $JK = 6{,}5$ cm et $IJ = 3{,}3$ cm. Calculer $IK$ en rédigeant comme au brevet.",
          correction:
            "1. Dans le triangle $IJK$ rectangle en $I$, l'hypoténuse est $[JK]$.\n2. D'après le théorème de Pythagore, $JK^2 = IJ^2 + IK^2$.\n3. Je cherche un côté de l'angle droit, donc je soustrais : $IK^2 = JK^2 - IJ^2 = 6{,}5^2 - 3{,}3^2 = 42{,}25 - 10{,}89 = 31{,}36$.\n4. Donc $IK = \\sqrt{31{,}36} = 5{,}6$ cm.\n⭐ Contrôle : $5{,}6^2 = 31{,}36$, et $5{,}6 < 6{,}5$ : le côté est plus court que l'hypoténuse.\n⛔ Le piège : écrire tout de suite $IK^2 = JK^2 + IJ^2$, parce qu'on a retenu « on additionne ». On additionne seulement quand on cherche l'hypoténuse.\nRéponse : $IK = 5{,}6$ cm.",
          schema: triangle({ A: [0, 3.3], B: [0, 0], C: [5.6, 0] }, { noms: { A: "J", B: "I", C: "K" }, cotes: { AB: "3,3 cm", BC: "? = 5,6 cm", CA: "6,5 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote", "pythagore_rediger"],
        },
        {
          enonce: "Le triangle $PQR$ a pour côtés $PQ = 1{,}2$ cm, $QR = 3{,}5$ cm et $PR = 3{,}7$ cm. Démontrer qu'il est rectangle, en rédigeant comme au brevet.",
          correction:
            "Je ne sais PAS encore qu'il est rectangle : c'est la réciproque qui travaille ici, pas le théorème.\n1. Dans le triangle $PQR$, le plus grand côté est $[PR]$.\n2. D'une part, $PR^2 = 3{,}7^2 = 13{,}69$.\n3. D'autre part, $PQ^2 + QR^2 = 1{,}2^2 + 3{,}5^2 = 1{,}44 + 12{,}25 = 13{,}69$.\n4. On constate que $PR^2 = PQ^2 + QR^2$. D'après la réciproque du théorème de Pythagore, le triangle $PQR$ est rectangle en $Q$.\n⭐ Deux calculs séparés, « d'une part », « d'autre part » : je n'écris pas $PR^2 = PQ^2 + QR^2$ au début, puisque c'est justement ce que je veux montrer.\n⛔ Le piège : écrire « d'après le théorème de Pythagore ». Le théorème SUPPOSE le triangle rectangle : il ne peut pas le démontrer.\nRéponse : $PQR$ est rectangle en $Q$.",
          schema: triangle({ A: [0, 1.2], B: [0, 0], C: [3.5, 0] }, { noms: { A: "P", B: "Q", C: "R" }, cotes: { AB: "1,2 cm", BC: "3,5 cm", CA: "3,7 cm" }, droit: "B" }),
          micros: ["pythagore_reciproque", "pythagore_rediger"],
        },
        {
          enonce: "Le triangle $EFG$ a pour côtés $EF = 8$ cm, $FG = 9$ cm et $EG = 12$ cm. Sur un dessin, l'angle en $F$ a l'air droit. Le triangle est-il rectangle ? Rédiger.",
          correction:
            "1. Dans le triangle $EFG$, le plus grand côté est $[EG]$.\n2. D'une part, $EG^2 = 12^2 = 144$.\n3. D'autre part, $EF^2 + FG^2 = 8^2 + 9^2 = 64 + 81 = 145$.\n4. On constate que $EG^2 \\neq EF^2 + FG^2$. D'après la contraposée du théorème de Pythagore, le triangle $EFG$ n'est pas rectangle.\n⭐ L'angle en $F$ mesure environ $89{,}6°$ : à l'œil, et même au rapporteur, on jurerait un angle droit. C'est pour cela qu'on calcule.\n⛔ Le piège : conclure « rectangle » parce que $144$ et $145$ sont très proches, ou parce que le dessin le montre. Une égalité est vraie ou fausse : ici, elle est fausse.\nRéponse : $EFG$ n'est pas rectangle.",
          schema: triangle({ A: [0, 0], B: [5.2917, 5.9999], C: [12, 0] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "8 cm", BC: "9 cm", CA: "12 cm" } }),
          micros: ["pythagore_reciproque", "pythagore_rediger"],
        },
        {
          enonce:
            "Un élève rédige : « Dans le triangle $XYZ$, $XY = 11$ cm, $YZ = 60$ cm et $XZ = 61$ cm. D'après le théorème de Pythagore, $XZ^2 = XY^2 + YZ^2$, donc $XYZ$ est rectangle en $Y$. »\na) Ses calculs seraient justes. Pourquoi sa rédaction est-elle fausse ?\nb) Rédiger correctement.",
          correction:
            "a) Le théorème de Pythagore commence par « si le triangle est rectangle ». L'élève s'en sert pour démontrer que le triangle est rectangle : il suppose ce qu'il veut prouver. C'est un raisonnement circulaire.\nb) Je rédige avec la réciproque, les deux membres calculés séparément.\nDans le triangle $XYZ$, le plus grand côté est $[XZ]$.\nD'une part, $XZ^2 = 61^2 = 3\\,721$.\nD'autre part, $XY^2 + YZ^2 = 11^2 + 60^2 = 121 + 3\\,600 = 3\\,721$.\nOn constate que $XZ^2 = XY^2 + YZ^2$. D'après la réciproque du théorème de Pythagore, le triangle $XYZ$ est rectangle en $Y$.\n⛔ Le piège : utiliser le théorème pour prouver un angle droit. Le théorème CALCULE une longueur dans un triangle déjà rectangle ; la réciproque DÉMONTRE qu'un angle est droit.\nRéponse : $XYZ$ est rectangle en $Y$, d'après la réciproque.",
          schema: triangle({ A: [0, 11], B: [0, 0], C: [60, 0] }, { noms: { A: "X", B: "Y", C: "Z" }, cotes: { AB: "11 cm", BC: "60 cm", CA: "61 cm" }, droit: "B" }),
          micros: ["pythagore_reciproque", "pythagore_rediger"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $H$ est le pied de la hauteur issue de $A$ : $H$ est sur $[BC]$ et $(AH)$ est perpendiculaire à $(BC)$. On donne $AB = 25$ cm, $AC = 26$ cm et $AH = 24$ cm.\na) Calculer $BH$.\nb) Calculer $HC$.\nc) En déduire $BC$.\nd) Le triangle $ABC$ est-il rectangle en $A$ ?",
          correction:
            "La hauteur coupe le triangle en DEUX triangles rectangles en $H$ : $ABH$ et $ACH$. J'applique Pythagore dans chacun.\na) Dans le triangle $ABH$ rectangle en $H$, l'hypoténuse est $[AB]$. D'après le théorème de Pythagore, $AB^2 = AH^2 + BH^2$, donc $BH^2 = 25^2 - 24^2 = 625 - 576 = 49$ et $BH = \\sqrt{49} = 7$ cm.\nb) Dans le triangle $ACH$ rectangle en $H$, l'hypoténuse est $[AC]$ : $HC^2 = 26^2 - 24^2 = 676 - 576 = 100$ et $HC = \\sqrt{100} = 10$ cm.\nc) $H$ est entre $B$ et $C$ : $BC = BH + HC = 7 + 10 = 17$ cm. Ici j'additionne des LONGUEURS, car ce sont deux morceaux d'un même segment.\nd) Non. S'il était rectangle en $A$, son hypoténuse serait $[BC]$, le côté opposé à $A$, et ce serait le plus long côté. Or $BC = 17$ cm est plus court que $AB$ et que $AC$.\n⛔ Le piège : appliquer Pythagore dans $ABC$ tout entier. Rien ne dit qu'il est rectangle : les angles droits sont en $H$.\nRéponse : $BH = 7$ cm, $HC = 10$ cm, $BC = 17$ cm, et $ABC$ n'est pas rectangle en $A$.",
          schema: triangle({ A: [7, 24], B: [0, 0], C: [17, 0] }, { cotes: { AB: "25 cm", BC: "? = 17 cm", CA: "26 cm" }, hauteur: { depuis: "A", label: "24 cm" } }),
          micros: ["pythagore_reconnaitre", "pythagore_calculer_cote", "pythagore_defi"],
        },
        {
          enonce:
            "Un voilier quitte le port $P$. Il navigue $18$ milles marins plein nord jusqu'à une bouée $B$, puis $25$ milles plein est jusqu'à une île $I$.\na) Pourquoi le triangle $PBI$ est-il rectangle ? En quel sommet ?\nb) Calculer la distance $PI$ en ligne droite, au dixième de mille, en rédigeant.\nc) Un mille marin vaut $1\\,852$ m. Convertir $PI$ en kilomètres, au dixième.",
          correction:
            "a) Le nord et l'est sont perpendiculaires : le bateau tourne d'un quart de tour en $B$. Le triangle $PBI$ est rectangle en $B$, et son hypoténuse est $[PI]$.\nb) Dans le triangle $PBI$ rectangle en $B$, d'après le théorème de Pythagore, $PI^2 = PB^2 + BI^2 = 18^2 + 25^2 = 324 + 625 = 949$.\nDonc $PI = \\sqrt{949} \\approx 30{,}8$ milles.\n⭐ Contrôle : $30^2 = 900 < 949 < 961 = 31^2$.\nc) Je convertis la valeur de la calculatrice : $\\sqrt{949} \\times 1\\,852 \\approx 57\\,052$ m, soit environ $57{,}1$ km.\n⛔ Le piège au c) : convertir l'arrondi. $30{,}8 \\times 1\\,852 = 57\\,041{,}6$ m, soit $57{,}0$ km : le dixième change. J'arrondis toujours à la FIN.\nRéponse : l'île est à environ $30{,}8$ milles du port, soit $57{,}1$ km.",
          schema: triangle({ A: [0, 0], B: [0, 18], C: [25, 18] }, { noms: { A: "P", B: "B", C: "I" }, cotes: { AB: "18 milles", BC: "25 milles", CA: "? ≈ 30,8 milles" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
        },
        {
          enonce:
            "Parmi ces trois triangles, lesquels sont rectangles ? Justifier.\na) $16$ cm, $30$ cm, $34$ cm\nb) $10$ cm, $11$ cm, $15$ cm\nc) $0{,}9$ m, $4$ m, $4{,}1$ m",
          correction:
            "Pour chacun, je compare le carré du PLUS GRAND côté à la somme des carrés des deux autres.\na) $34^2 = 1\\,156$ et $16^2 + 30^2 = 256 + 900 = 1\\,156$. Égalité : d'après la réciproque du théorème de Pythagore, ce triangle est rectangle.\nb) $15^2 = 225$ et $10^2 + 11^2 = 100 + 121 = 221$. $225 \\neq 221$ : d'après la contraposée, il n'est pas rectangle.\nc) $4{,}1^2 = 16{,}81$ et $0{,}9^2 + 4^2 = 0{,}81 + 16 = 16{,}81$. Égalité : il est rectangle.\n⭐ Le a) est un agrandissement du triangle $8$, $15$, $17$ : tout multiplier par $2$ garde l'égalité, puisque chaque carré est multiplié par $4$.\n⛔ Le piège : prendre les côtés dans l'ordre de l'énoncé au lieu de partir du plus grand. Au c), comparer $0{,}9^2$ à $4^2 + 4{,}1^2$ ne peut jamais donner l'égalité.\nRéponse : les triangles a) et c) sont rectangles, le b) ne l'est pas.",
          schema: deux(
            triangle({ A: [0, 16], B: [0, 0], C: [30, 0] }, { cotes: { AB: "16 cm", BC: "30 cm", CA: "34 cm" }, droit: "B" }),
            triangle({ A: [0, 0], B: [15, 0], C: [6.8, 7.3321] }, { cotes: { AB: "15 cm", BC: "11 cm", CA: "10 cm" } }),
          ),
          micros: ["pythagore_reciproque", "pythagore_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je cherche l'angle droit du monde réel, je dessine, je rédige, puis une phrase de réponse.",
      rappel: [
        "L'angle droit se cache dans la situation : un mur vertical sur un sol horizontal, le nord et l'est, le coin d'un terrain.",
        "Je dessine le triangle, je nomme l'hypoténuse, je convertis tout dans la même unité, puis je rédige.",
        "J'arrondis à la FIN seulement, et je réponds par une phrase avec l'unité.",
      ],
      exercices: [
        {
          titre: "L'échelle du couvreur",
          enonce:
            "Une échelle de $6$ m est appuyée contre un mur vertical, sur un sol horizontal. La règle de sécurité demande de poser le pied de l'échelle à environ un quart de sa longueur du mur.\na) À quelle distance du mur faut-il poser le pied ?\nb) À quelle hauteur le haut de l'échelle touche-t-il le mur ? Arrondir au centimètre.\nc) Le couvreur veut atteindre une gouttière à $6$ m de haut avec cette échelle. Est-ce possible ?",
          correction:
            "a) Un quart de $6$ m : $6 \\div 4 = 1{,}5$ m.\nb) Le mur est vertical et le sol horizontal : l'angle au pied du mur est droit. Le mur, le sol et l'échelle forment un triangle rectangle, dont l'hypoténuse est l'ÉCHELLE, opposée à cet angle droit.\nD'après le théorème de Pythagore, $6^2 = 1{,}5^2 + h^2$, donc $h^2 = 36 - 2{,}25 = 33{,}75$.\n$h = \\sqrt{33{,}75} \\approx 5{,}81$ m.\nc) Non. L'échelle est l'hypoténuse, le plus long côté : la hauteur atteinte est forcément plus petite que $6$ m. Il lui faut une échelle plus longue.\n⛔ Le piège au b) : additionner, $6^2 + 1{,}5^2 = 38{,}25$, et trouver $h \\approx 6{,}18$ m, plus que la longueur de l'échelle. L'échelle n'est pas un côté de l'angle droit.\nRéponse : le pied est à $1{,}5$ m du mur, le haut touche le mur à environ $5{,}81$ m ; la gouttière à $6$ m est hors de portée.",
          schema: triangle({ A: [0, 0], B: [1.5, 0], C: [1.5, 5.8095] }, { noms: { A: "pied", B: "mur", C: "haut" }, cotes: { AB: "1,5 m", BC: "? ≈ 5,81 m", CA: "6 m" }, droit: "B" }),
          micros: ["pythagore_calculer_cote", "pythagore_rediger", "pythagore_defi"],
        },
        {
          titre: "La tyrolienne",
          enonce:
            "Le câble d'une tyrolienne est tendu en ligne droite entre une plateforme de départ et une plateforme d'arrivée située $45$ m plus bas. À l'horizontale, les deux plateformes sont à $200$ m l'une de l'autre.\na) Calculer la longueur du câble.\nb) Sur un autre site, le câble mesure $250$ m, pour la même dénivelée de $45$ m. Quelle distance parcourt-on à l'horizontale ? Arrondir au mètre.\nc) Un visiteur affirme : « le câble mesure $200 + 45 = 245$ m ». Qu'en penser ?",
          correction:
            "a) La verticale et l'horizontale sont perpendiculaires : la dénivelée, la distance horizontale et le câble forment un triangle rectangle, dont l'hypoténuse est le CÂBLE.\nD'après le théorème de Pythagore, $c^2 = 45^2 + 200^2 = 2\\,025 + 40\\,000 = 42\\,025$.\n$c = \\sqrt{42\\,025} = 205$ m. Je vérifie : $205^2 = 42\\,025$.\nb) Cette fois, je connais l'hypoténuse, $250$ m : je soustrais. $d^2 = 250^2 - 45^2 = 62\\,500 - 2\\,025 = 60\\,475$.\n$d = \\sqrt{60\\,475} \\approx 246$ m.\nc) Il additionne les longueurs : $245$ m, c'est le trajet « descendre, puis avancer ». La ligne droite est plus courte : $205$ m.\n⛔ Le piège : additionner les longueurs au lieu des carrés.\nRéponse : le câble mesure $205$ m ; sur l'autre site, on parcourt environ $246$ m à l'horizontale.",
          schema: triangle({ A: [0, 45], B: [0, 0], C: [200, 0] }, { noms: { A: "départ", C: "arrivée" }, cotes: { AB: "45 m", BC: "200 m", CA: "? = 205 m" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_defi"],
        },
        {
          titre: "La rampe d'accès",
          enonce:
            "Pour qu'un fauteuil roulant puisse entrer dans un bâtiment public, la réglementation française impose une rampe de pente au plus $5$ % : elle monte d'au plus $5$ cm pour $100$ cm parcourus à l'horizontale. Une entrée est $50$ cm plus haute que le trottoir.\na) Quelle longueur horizontale faut-il au minimum pour la rampe ?\nb) Calculer alors la longueur de la rampe elle-même, arrondie au centimètre.\nc) Un menuisier pense qu'il faut « beaucoup plus » de planche que la longueur horizontale. A-t-il raison ?",
          correction:
            "a) $5$ cm de montée pour $100$ cm d'horizontale : pour $50$ cm de montée, il en faut $10$ fois plus, soit $1\\,000$ cm, c'est-à-dire $10$ m.\nb) La montée est verticale, le trottoir horizontal : ils forment un angle droit. La rampe est l'HYPOTÉNUSE.\nJe mets tout en mètres : $50$ cm $= 0{,}5$ m. D'après le théorème de Pythagore, $r^2 = 10^2 + 0{,}5^2 = 100 + 0{,}25 = 100{,}25$.\n$r = \\sqrt{100{,}25} \\approx 10{,}01$ m.\nc) Non : la rampe ne mesure qu'environ $1$ cm de plus que l'horizontale. Quand la pente est très douce, l'hypoténuse est presque égale au grand côté.\n⛔ Le piège : mêler les unités, $10^2 + 50^2$, avec des mètres et des centimètres. Je convertis tout AVANT de calculer.\nRéponse : il faut $10$ m à l'horizontale, et une rampe d'environ $10{,}01$ m.",
          schema: triangle({ A: [0, 0], B: [10, 0], C: [10, 0.5] }, { cotes: { AB: "10 m", BC: "0,5 m", CA: "? ≈ 10,01 m" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_defi"],
        },
        {
          titre: "Le coin du terrain de football",
          enonce:
            "Un jardinier trace un terrain de football de $105$ m sur $68$ m, les dimensions recommandées pour les matchs internationaux. Il plante un piquet $B$ au coin, un piquet $A$ à $105$ m sur la ligne de touche et un piquet $C$ à $68$ m sur la ligne de but. Pour vérifier que l'angle en $B$ est droit, il mesure $AC$ : il trouve $126$ m.\na) Le coin est-il droit ? Rédiger.\nb) Quelle longueur $AC$ devrait-il trouver, au dixième de mètre ?",
          correction:
            "a) Je ne sais pas si l'angle est droit : c'est à démontrer, avec la réciproque.\nDans le triangle $ABC$, le plus grand côté est $[AC]$.\nD'une part, $AC^2 = 126^2 = 15\\,876$.\nD'autre part, $AB^2 + BC^2 = 105^2 + 68^2 = 11\\,025 + 4\\,624 = 15\\,649$.\nOn constate que $AC^2 \\neq AB^2 + BC^2$. D'après la contraposée du théorème de Pythagore, le triangle $ABC$ n'est pas rectangle : le coin n'est pas droit, il faut déplacer un piquet.\nb) Si l'angle en $B$ était droit, $[AC]$ serait l'hypoténuse : $AC^2 = 15\\,649$, et $AC = \\sqrt{15\\,649} \\approx 125{,}1$ m.\n⭐ C'est la méthode des traceurs de terrain : trois longueurs au mètre ruban remplacent une équerre, bien trop petite pour un terrain de $105$ m. Sur le dessin, les deux coins se ressemblent : l'écart n'est que d'un degré.\n⛔ Le piège : écrire au a) « d'après le théorème de Pythagore, $AC^2 = AB^2 + BC^2$ ». Ce serait supposer le coin droit, alors que c'est la question.\nRéponse : non, le coin n'est pas droit ; la diagonale devrait mesurer environ $125{,}1$ m.",
          schema: deux(
            triangle({ A: [105, 0], B: [0, 0], C: [-1.081, 67.9914] }, { cotes: { AB: "105 m", BC: "68 m", CA: "126 m" } }),
            triangle({ A: [105, 0], B: [0, 0], C: [0, 68] }, { cotes: { AB: "105 m", BC: "68 m", CA: "? ≈ 125,1 m" }, droit: "B" }),
          ),
          micros: ["pythagore_reciproque", "pythagore_rediger", "pythagore_defi"],
        },
      ],
    },
  ],
};
