// ─── Fiche d'exercices : le théorème de Pythagore (4e) — 20 exercices corrigés ──
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-pythagore.tsx` et sur les
// HUIT micros du coach de 4e (notionId pythagore_theoreme). L'angle de la 4e,
// comme le cours : les carrés et les racines carrées d'abord (les carrés
// parfaits de 1 à 144, la racine à la calculatrice AVEC UN ARRONDI DIT), puis
// l'hypoténuse repérée, le calcul d'une longueur dans les deux sens (additionner
// pour l'hypoténuse, soustraire pour un côté de l'angle droit), et la réciproque
// pour prouver — ou refuser — un angle droit. La rédaction en trois lignes de la
// fiche de cours (« Dans le triangle… rectangle en…, d'après le théorème de
// Pythagore… », le calcul, la phrase avec l'unité).
// ⛔ Pas de trigonométrie (notion `trigo_cosinus`), pas de « contraposée » comme
// mot à apprendre : quand l'égalité est fausse, le corrigé dit pourquoi le
// triangle ne PEUT pas être rectangle (s'il l'était, le théorème donnerait
// l'égalité).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les triplets 3-4-5,
// 6-8-10, 5-12-13 (ni leurs multiples), ni le triangle 4-5-6, ni l'écran de
// 3 dm sur 4, l'échelle de 13 m, l'étagère 8-6-10. ⛔ Ni ceux de la feuille de
// 3e : 8-15-17, 9-40-41, 20-21-29, 11-60-61, 7-24-25, 16-30-34, 10-11-15,
// 6-9-11, 8-9-12, les décimaux 2,8-4,5-5,3 / 3,3-5,6-6,5 / 1,2-3,5-3,7 /
// 0,9-4-4,1, l'échelle de 6 m, la tyrolienne, le voilier, la rampe, le terrain
// de football. Les triplets d'ici : 28-45-53, 60-91-109, 65-72-97, 48-55-73,
// 36-77-85, 39-80-89, 133-156-205, 16-63-65, 119-120-169, 88-105-137 — un par
// exercice, jamais deux fois.
//
// Les pièges nommés : l'hypoténuse cherchée « en bas » (2, 16), additionner les
// longueurs au lieu des carrés (3, 13), additionner au lieu de soustraire pour
// un côté de l'angle droit (4, 10, 16), la racine oubliée (5), soustraire les
// longueurs (6), le plus grand côté mal choisi (7, 12), « presque égal » pris
// pour égal (8, 17), le carré d'un décimal pris pour un double (1, 9), le
// théorème cité pour PROUVER un angle droit (11), la base entière prise pour un
// côté du petit triangle (14), les unités mêlées (15), l'arrondi pris trop tôt
// (14, 20), la longueur « par les lignes » prise pour la diagonale (18),
// l'arrondi « au plus proche » quand il faut une garantie (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - feuille A4 : 210 mm × 297 mm, A3 : 297 mm × 420 mm (norme ISO 216) — ex. 13 ;
// - court de tennis : 23,77 m de long, 8,23 m de large en simple, 10,97 m en
//   double (ITF, Rules of Tennis, règle 1) — ex. 18 ;
// - bagage cabine : 55 cm × 35 cm × 25 cm au plus, poignées et roues comprises
//   (Air France, conditions du bagage cabine) — ex. 20 ; le bâton de marche
//   replié de 68 cm est à l'ordre de grandeur des bâtons télescopiques ;
// - la voile du dériveur (ex. 15), la terrasse (ex. 17) et la tente de bivouac
//   (ex. 19) sont IMAGINÉES, à l'ordre de grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés ont
// leur dessin. Dix-neuf triangles tracés avec leurs VRAIES coordonnées (un
// triangle 28-45-53 est dessiné 28-45-53), l'angle droit marqué, l'hypoténuse
// nommée, le côté cherché « ? » suivi de sa valeur ; un triangle qui n'est PAS
// rectangle est dessiné tel qu'il est (l'angle de 89,6° de l'exercice 8 ne se
// voit pas : c'est la leçon). L'exercice 1 a le tableau des carrés parfaits.
// Deux triangles côte à côte (2, 12, 17, 18, 20) : l'un sous l'autre sur
// téléphone, côte à côte à partir de `sm` et sur papier.
// ⭐ CONVENTION DES SEGMENTS (celle de la feuille de trigonométrie de 3e) : le
// texte nomme un côté dessiné dans l'ORDRE DES CLÉS du canvas — clé CA avec
// les noms D…F → « $FD$ ». L'angle droit est toujours la clé B : l'hypoténuse
// est la clé CA.
//
// Les corrigés sont écrits à la première personne (« je repère »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-pythagore-4e.mjs` —
// chaque carré refait en entiers, chaque racine cherchée par dichotomie, chaque
// triangle relu (angle droit au sommet marqué, côtés à l'échelle, noms des
// côtés lus dans l'énoncé).
//
// Micro-compétences : pythagore_carre_racine (1, 3, 5, 6, 13), pythagore_
// reconnaitre (2, 16), pythagore_calculer_hypotenuse (3, 5, 9, 13, 18, 20),
// pythagore_calculer_cote (4, 6, 10, 14, 16, 19), pythagore_reciproque_verifier
// (7, 8, 12), pythagore_reciproque_conclure (7, 11, 12, 15, 17),
// pythagore_rediger (9, 10, 11, 15, 16, 17), pythagore_defi (14, 17, 18, 19,
// 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau, triangle } from "@/lib/fiches-exercices/figures";

/** Deux triangles côte à côte : l'un sous l'autre sur téléphone (mesuré à
 *  375 px sur la feuille de Pythagore de 3e, 24/09), côte à côte à partir de
 *  `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

export const exercicesPythagore4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "pythagore-theoreme",
  titre: "Le théorème de Pythagore et sa réciproque",
  accroche:
    "Vingt exercices, du calcul seul au problème : les carrés et les racines carrées, repérer l'hypoténuse, calculer une longueur, prouver qu'un triangle est rectangle — ou qu'il ne l'est pas —, puis rédiger. La diagonale d'une feuille A4, la voile d'un dériveur, la terrasse d'un maçon, un court de tennis, une tente de bivouac, une valise cabine. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le triangle dessiné à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/pythagore-theoreme", titre: "Le théorème de Pythagore" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je repère toujours l'angle droit avant de calculer.",
      rappel: [
        "Le CARRÉ d'un nombre, c'est ce nombre multiplié par lui-même : $7^2 = 7 \\times 7 = 49$. La RACINE CARRÉE fait le chemin inverse : $\\sqrt{49} = 7$.",
        "L'HYPOTÉNUSE est le côté en face de l'angle droit : le seul qui ne touche pas son sommet. C'est toujours le plus long côté.",
        "THÉORÈME : si $ABC$ est rectangle en $B$, alors $CA^2 = AB^2 + BC^2$. Je cherche l'hypoténuse : j'additionne les carrés. Je cherche un autre côté : je soustrais.",
        "RÉCIPROQUE : si le carré du plus grand côté est égal à la somme des carrés des deux autres, le triangle est rectangle. Sinon, il ne l'est pas.",
      ],
      exercices: [
        {
          enonce:
            "a) Calculer $11^2$, $0{,}6^2$ et $1{,}2^2$.\nb) Donner $\\sqrt{81}$, $\\sqrt{144}$ et $\\sqrt{1}$.\nc) Entre quels nombres entiers qui se suivent se trouve $\\sqrt{50}$ ? Donner ensuite son arrondi au dixième, à la calculatrice.",
          correction:
            "a) Élever au carré, c'est multiplier le nombre par LUI-MÊME. $11^2 = 11 \\times 11 = 121$ ; $0{,}6^2 = 0{,}6 \\times 0{,}6 = 0{,}36$ ; $1{,}2^2 = 1{,}2 \\times 1{,}2 = 1{,}44$.\nb) Je cherche le nombre positif dont le carré est donné. $9^2 = 81$, donc $\\sqrt{81} = 9$ ; $12^2 = 144$, donc $\\sqrt{144} = 12$ ; $1^2 = 1$, donc $\\sqrt{1} = 1$.\nc) $50$ n'est pas dans le tableau des carrés parfaits. Je l'encadre : $7^2 = 49 < 50 < 64 = 8^2$, donc $\\sqrt{50}$ est entre $7$ et $8$, tout près de $7$.\nÀ la calculatrice, $\\sqrt{50} \\approx 7{,}07$, donc $\\sqrt{50} \\approx 7{,}1$ au dixième.\n⛔ Le piège : $0{,}6^2 = 1{,}2$ ou $0{,}6^2 = 3{,}6$. Le carré n'est pas le double, et $0{,}6 \\times 0{,}6$ a deux chiffres après la virgule : $0{,}36$. Et $\\sqrt{50}$ n'est pas $25$ : la racine n'est pas la moitié.\nRéponse : $121$ ; $0{,}36$ ; $1{,}44$ — puis $9$ ; $12$ ; $1$ — et $\\sqrt{50}$ est entre $7$ et $8$, $\\sqrt{50} \\approx 7{,}1$.",
          schema: tableau(["nombre", "1", "7", "8", "9", "11", "12"], ["son carré", 1, 49, 64, 81, 121, 144], true),
          micros: ["pythagore_carre_racine"],
        },
        {
          enonce:
            "Nommer l'hypoténuse de chaque triangle rectangle.\na) Le triangle $GHJ$ est rectangle en $H$.\nb) Le triangle $NPO$ est rectangle en $P$.\nc) Dans le triangle $BUS$, l'angle $\\widehat{U}$ est droit.\nd) Sur le dessin du a), l'hypoténuse est en HAUT. Est-ce une erreur ?",
          correction:
            "L'hypoténuse est le côté EN FACE de l'angle droit. Je repère d'abord le sommet de l'angle droit, puis je prends le côté formé par les deux autres lettres.\na) L'angle droit est en $H$. Les deux autres sommets sont $J$ et $G$ : l'hypoténuse est $[JG]$.\nb) L'angle droit est en $P$ : l'hypoténuse est $[ON]$.\nc) L'angle droit est en $U$ : l'hypoténuse est $[BS]$.\nd) Non. L'hypoténuse ne dépend pas de la position du dessin sur la feuille : seul l'angle droit décide. Ici l'angle droit est en bas, donc l'hypoténuse est en haut.\n⛔ Le piège : chercher l'hypoténuse « en bas » ou « la plus penchée ». Je tourne la feuille dans ma tête : le côté qui ne touche pas le petit carré reste le même.\nRéponse : $[JG]$ ; $[ON]$ ; $[BS]$ ; et une hypoténuse en haut n'a rien d'anormal.",
          schema: deux(
            triangle({ A: [0, 3], B: [2, 0], C: [6.5, 3] }, { noms: { A: "G", B: "H", C: "J" }, cotes: { CA: "hypoténuse" }, droit: "B" }),
            triangle({ A: [0, 0], B: [4, 1], C: [3, 5] }, { noms: { A: "N", B: "P", C: "O" }, cotes: { CA: "hypoténuse" }, droit: "B" }),
          ),
          micros: ["pythagore_reconnaitre"],
        },
        {
          enonce: "Le triangle $DEF$ est rectangle en $E$, avec $DE = 28$ cm et $EF = 45$ cm. Calculer la longueur $FD$.",
          correction:
            "Je repère l'angle droit : il est en $E$. L'hypoténuse est le côté en face, $[FD]$ : c'est elle que je cherche, donc j'additionne les carrés.\nD'après le théorème de Pythagore, $FD^2 = DE^2 + EF^2$.\nJe remplace par les longueurs : $FD^2 = 28^2 + 45^2 = 784 + 2\\,025 = 2\\,809$.\nJe connais $FD^2$ et je veux $FD$ : je prends la racine carrée. $FD = \\sqrt{2\\,809} = 53$ cm. Je vérifie : $53 \\times 53 = 2\\,809$.\n⭐ Contrôle : $53$ est plus grand que $28$ et que $45$. L'hypoténuse est bien le plus long côté.\n⛔ Le piège : additionner les longueurs, $28 + 45 = 73$ cm. On additionne les CARRÉS, puis on prend la racine.\nRéponse : $FD = 53$ cm.",
          schema: triangle({ A: [0, 28], B: [0, 0], C: [45, 0] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "28 cm", BC: "45 cm", CA: "? = 53 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_carre_racine"],
        },
        {
          enonce: "Le triangle $BOL$ est rectangle en $O$, avec $LB = 109$ mm et $BO = 60$ mm. Calculer $OL$.",
          correction:
            "L'angle droit est en $O$ : l'hypoténuse est $[LB]$, qui mesure $109$ mm. Cette fois, je connais l'hypoténuse et je cherche un côté de l'angle droit.\nD'après le théorème de Pythagore, $LB^2 = BO^2 + OL^2$, donc $OL^2 = LB^2 - BO^2$. Je SOUSTRAIS : le carré de l'hypoténuse est le total, j'en retire la part connue.\n$OL^2 = 109^2 - 60^2 = 11\\,881 - 3\\,600 = 8\\,281$.\n$OL = \\sqrt{8\\,281} = 91$ mm.\n⭐ Contrôle : $91 < 109$, le côté trouvé est plus court que l'hypoténuse.\n⛔ Le piège : additionner par habitude. $109^2 + 60^2 = 15\\,481$ donnerait $OL \\approx 124$ mm : un côté plus long que l'hypoténuse, c'est impossible.\nRéponse : $OL = 91$ mm.",
          schema: triangle({ A: [0, 60], B: [0, 0], C: [91, 0] }, { noms: { A: "B", B: "O", C: "L" }, cotes: { AB: "60 mm", BC: "? = 91 mm", CA: "109 mm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote"],
        },
        {
          enonce: "Le triangle $TIC$ est rectangle en $I$, avec $TI = 6$ cm et $IC = 7$ cm. Calculer $CT$, arrondie au dixième.",
          correction:
            "L'angle droit est en $I$ : l'hypoténuse est $[CT]$. Je l'attends plus longue que $7$ cm.\nD'après le théorème de Pythagore, $CT^2 = TI^2 + IC^2 = 6^2 + 7^2 = 36 + 49 = 85$.\n$85$ n'est pas un carré parfait : $9^2 = 81 < 85 < 100 = 10^2$, donc $CT$ est entre $9$ et $10$ cm.\nÀ la calculatrice, $\\sqrt{85} \\approx 9{,}22$, donc $CT \\approx 9{,}2$ cm au dixième.\n⛔ Le piège : s'arrêter à $CT = 85$ cm. $85$, c'est $CT^2$. Un triangle de côtés $6$ et $7$ cm n'a pas un côté de $85$ cm : sans la racine, la réponse est absurde.\nRéponse : $CT = \\sqrt{85} \\approx 9{,}2$ cm.",
          schema: triangle({ A: [0, 6], B: [0, 0], C: [7, 0] }, { noms: { A: "T", B: "I", C: "C" }, cotes: { AB: "6 cm", BC: "7 cm", CA: "? ≈ 9,2 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_carre_racine"],
        },
        {
          enonce: "Le triangle $MER$ est rectangle en $E$, avec $RM = 10$ cm et $ME = 7$ cm. Calculer $ER$, arrondie au dixième.",
          correction:
            "L'angle droit est en $E$ : l'hypoténuse est $[RM]$, $10$ cm. Je cherche un côté de l'angle droit : je soustrais.\nD'après le théorème de Pythagore, $RM^2 = ME^2 + ER^2$, donc $ER^2 = RM^2 - ME^2 = 10^2 - 7^2 = 100 - 49 = 51$.\n$7^2 = 49 < 51 < 64 = 8^2$ : $ER$ est entre $7$ et $8$ cm.\nÀ la calculatrice, $\\sqrt{51} \\approx 7{,}141$, donc $ER \\approx 7{,}1$ cm au dixième.\n⛔ Le piège : soustraire les longueurs, $10 - 7 = 3$ cm. On soustrait les CARRÉS, puis on prend la racine.\nRéponse : $ER = \\sqrt{51} \\approx 7{,}1$ cm.",
          schema: triangle({ A: [0, 7], B: [0, 0], C: [7.1414, 0] }, { noms: { A: "M", B: "E", C: "R" }, cotes: { AB: "7 cm", BC: "? ≈ 7,1 cm", CA: "10 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote", "pythagore_carre_racine"],
        },
        {
          enonce: "Le triangle $VUE$ a pour côtés $VU = 65$ mm, $UE = 72$ mm et $EV = 97$ mm.\na) Quel est son plus grand côté ?\nb) Comparer le carré de ce côté à la somme des carrés des deux autres.\nc) Le triangle est-il rectangle ? Si oui, en quel sommet ?",
          correction:
            "Je ne sais pas si le triangle est rectangle : je ne peux pas écrire l'égalité d'avance. Je calcule les deux nombres SÉPARÉMENT.\na) Le plus grand côté est $[EV]$ : c'est le seul qui puisse être l'hypoténuse.\nb) D'une part, $EV^2 = 97^2 = 9\\,409$.\nD'autre part, $VU^2 + UE^2 = 65^2 + 72^2 = 4\\,225 + 5\\,184 = 9\\,409$.\nc) Les deux nombres sont égaux : d'après la réciproque du théorème de Pythagore, le triangle $VUE$ est rectangle en $U$, le sommet que le plus grand côté $[EV]$ ne touche pas.\n⛔ Le piège : mettre au carré les côtés dans l'ordre de l'énoncé, $VU^2 = UE^2 + EV^2$. Je pars toujours du PLUS GRAND côté.\nRéponse : $VUE$ est rectangle en $U$.",
          schema: triangle({ A: [0, 65], B: [0, 0], C: [72, 0] }, { noms: { A: "V", B: "U", C: "E" }, cotes: { AB: "65 mm", BC: "72 mm", CA: "97 mm" }, droit: "B" }),
          micros: ["pythagore_reciproque_verifier", "pythagore_reciproque_conclure"],
        },
        {
          enonce: "Le triangle $FOU$ a pour côtés $FO = 7$ cm, $OU = 11$ cm et $UF = 13$ cm. Sur un dessin, l'angle en $O$ a l'air droit. Est-il rectangle ?",
          correction:
            "Je ne me fie pas au dessin : je calcule. Le plus grand côté est $[UF]$.\nD'une part, $UF^2 = 13^2 = 169$.\nD'autre part, $FO^2 + OU^2 = 7^2 + 11^2 = 49 + 121 = 170$.\n$169 \\neq 170$ : l'égalité de Pythagore est fausse. Or, si le triangle était rectangle, le théorème de Pythagore dirait que ces deux nombres sont égaux. Donc $FOU$ n'est pas rectangle.\n⭐ L'angle en $O$ mesure environ $89{,}6°$ : à l'œil, et même au rapporteur, on jurerait un angle droit. C'est pour cela qu'on calcule.\n⛔ Le piège : dire « presque égal, donc rectangle ». $169$ et $170$ ne sont pas égaux : la réponse est non.\nRéponse : $FOU$ n'est pas rectangle.",
          schema: triangle({ A: [0.0455, 6.9999], B: [0, 0], C: [11, 0] }, { noms: { A: "F", B: "O", C: "U" }, cotes: { AB: "7 cm", BC: "11 cm", CA: "13 cm" } }),
          micros: ["pythagore_reciproque_verifier"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Rédiger en trois temps : le triangle et son angle droit, l'égalité, le calcul avec la phrase de conclusion.",
      rappel: [
        "CALCULER une longueur : « Dans le triangle $ABC$ rectangle en $B$, d'après le théorème de Pythagore, $CA^2 = AB^2 + BC^2$. » Puis le calcul, la racine, l'unité.",
        "PROUVER qu'un triangle est rectangle : je calcule SÉPARÉMENT le carré du plus grand côté (« d'une part ») et la somme des carrés des deux autres (« d'autre part »).",
        "Égaux : « d'après la réciproque du théorème de Pythagore, le triangle est rectangle ». Différents : il n'est pas rectangle, sinon l'égalité serait vraie.",
        "Toutes les longueurs dans la MÊME unité avant de calculer ; j'arrondis à la FIN seulement.",
      ],
      exercices: [
        {
          enonce: "Le triangle $SUD$ est rectangle en $U$, avec $SU = 4{,}8$ cm et $UD = 5{,}5$ cm. Calculer $DS$ en rédigeant.",
          correction:
            "Je rédige en trois temps.\n1. Dans le triangle $SUD$ rectangle en $U$, l'hypoténuse est $[DS]$. D'après le théorème de Pythagore, $DS^2 = SU^2 + UD^2$.\n2. $DS^2 = 4{,}8^2 + 5{,}5^2 = 23{,}04 + 30{,}25 = 53{,}29$.\n3. Donc $DS = \\sqrt{53{,}29} = 7{,}3$ cm.\n⭐ La racine tombe juste : je le vérifie, $7{,}3 \\times 7{,}3 = 53{,}29$.\n⛔ Le piège : écrire $4{,}8^2 = 9{,}6$. Élever au carré, c'est multiplier par LUI-MÊME : $4{,}8 \\times 4{,}8 = 23{,}04$, pas $4{,}8 \\times 2$.\nRéponse : $DS = 7{,}3$ cm.",
          schema: triangle({ A: [0, 4.8], B: [0, 0], C: [5.5, 0] }, { noms: { A: "S", B: "U", C: "D" }, cotes: { AB: "4,8 cm", BC: "5,5 cm", CA: "? = 7,3 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
        },
        {
          enonce: "Le triangle $LOT$ est rectangle en $O$, avec $TL = 8{,}5$ cm et $LO = 7{,}7$ cm. Calculer $OT$ en rédigeant.",
          correction:
            "1. Dans le triangle $LOT$ rectangle en $O$, l'hypoténuse est $[TL]$. D'après le théorème de Pythagore, $TL^2 = LO^2 + OT^2$.\n2. Je cherche un côté de l'angle droit, donc je soustrais : $OT^2 = TL^2 - LO^2 = 8{,}5^2 - 7{,}7^2 = 72{,}25 - 59{,}29 = 12{,}96$.\n3. Donc $OT = \\sqrt{12{,}96} = 3{,}6$ cm.\n⭐ Contrôle : $3{,}6 \\times 3{,}6 = 12{,}96$, et $3{,}6 < 8{,}5$ : le côté est plus court que l'hypoténuse.\n⛔ Le piège : écrire $OT^2 = TL^2 + LO^2$ parce qu'on a retenu « on additionne ». On additionne seulement quand on cherche l'hypoténuse.\nRéponse : $OT = 3{,}6$ cm.",
          schema: triangle({ A: [0, 7.7], B: [0, 0], C: [3.6, 0] }, { noms: { A: "L", B: "O", C: "T" }, cotes: { AB: "7,7 cm", BC: "? = 3,6 cm", CA: "8,5 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_cote", "pythagore_rediger"],
        },
        {
          enonce: "Le triangle $NID$ a pour côtés $NI = 3{,}9$ cm, $ID = 8$ cm et $DN = 8{,}9$ cm. Démontrer qu'il est rectangle, en rédigeant.",
          correction:
            "Je ne sais PAS encore qu'il est rectangle : c'est la réciproque qui travaille ici, pas le théorème.\n1. Dans le triangle $NID$, le plus grand côté est $[DN]$.\n2. D'une part, $DN^2 = 8{,}9^2 = 79{,}21$. D'autre part, $NI^2 + ID^2 = 3{,}9^2 + 8^2 = 15{,}21 + 64 = 79{,}21$.\n3. Les deux résultats sont égaux. D'après la réciproque du théorème de Pythagore, le triangle $NID$ est rectangle en $I$.\n⭐ Deux calculs séparés, « d'une part », « d'autre part » : je n'écris pas $DN^2 = NI^2 + ID^2$ au début, puisque c'est justement ce que je veux montrer.\n⛔ Le piège : écrire « d'après le théorème de Pythagore ». Le théorème SUPPOSE le triangle rectangle : il ne peut pas le prouver.\nRéponse : $NID$ est rectangle en $I$.",
          schema: triangle({ A: [0, 3.9], B: [0, 0], C: [8, 0] }, { noms: { A: "N", B: "I", C: "D" }, cotes: { AB: "3,9 cm", BC: "8 cm", CA: "8,9 cm" }, droit: "B" }),
          micros: ["pythagore_reciproque_conclure", "pythagore_rediger"],
        },
        {
          enonce:
            "Lequel de ces deux triangles est rectangle ? Justifier.\na) Le triangle $ROC$ : $RO = 13{,}3$ cm, $OC = 15{,}6$ cm, $CR = 20{,}5$ cm.\nb) Le triangle $MIR$ : $RM = 7{,}6$ cm, $MI = 4{,}5$ cm, $IR = 6$ cm.",
          correction:
            "Pour chacun, je repère le PLUS GRAND côté, puis je compare son carré à la somme des carrés des deux autres.\na) Le plus grand côté est $[CR]$. D'une part, $CR^2 = 20{,}5^2 = 420{,}25$. D'autre part, $RO^2 + OC^2 = 13{,}3^2 + 15{,}6^2 = 176{,}89 + 243{,}36 = 420{,}25$. Égalité : d'après la réciproque du théorème de Pythagore, $ROC$ est rectangle en $O$.\nb) Le plus grand côté est $[RM]$, donné en premier. D'une part, $RM^2 = 7{,}6^2 = 57{,}76$. D'autre part, $MI^2 + IR^2 = 4{,}5^2 + 6^2 = 20{,}25 + 36 = 56{,}25$. $57{,}76 \\neq 56{,}25$ : si $MIR$ était rectangle, ces deux nombres seraient égaux. Il n'est donc pas rectangle.\n⭐ Au b), $57{,}76 > 56{,}25$ : l'angle en $I$ est un peu plus ouvert qu'un angle droit, environ $91{,}6°$.\n⛔ Le piège : au b), prendre les côtés dans l'ordre de l'énoncé et comparer $IR^2$ à $RM^2 + MI^2$. Le plus grand côté n'est pas toujours écrit en dernier.\nRéponse : le triangle $ROC$ est rectangle en $O$ ; le triangle $MIR$ ne l'est pas.",
          schema: deux(
            triangle({ A: [0, 13.3], B: [0, 0], C: [15.6, 0] }, { noms: { A: "R", B: "O", C: "C" }, cotes: { AB: "13,3 cm", BC: "15,6 cm", CA: "20,5 cm" }, droit: "B" }),
            triangle({ A: [-0.1258, 4.4982], B: [0, 0], C: [6, 0] }, { noms: { A: "M", B: "I", C: "R" }, cotes: { AB: "4,5 cm", BC: "6 cm", CA: "7,6 cm" } }),
          ),
          micros: ["pythagore_reciproque_verifier", "pythagore_reciproque_conclure"],
        },
        {
          enonce:
            "Une feuille A4 est un rectangle de $21$ cm sur $29{,}7$ cm. On nomme $A$, $B$ et $C$ trois de ses coins : $AB = 21$ cm, $BC = 29{,}7$ cm, et l'angle en $B$ est droit.\na) Calculer la longueur de sa diagonale $CA$, arrondie au millimètre.\nb) Une feuille A3 mesure $29{,}7$ cm sur $42$ cm. Calculer sa diagonale, arrondie au millimètre.",
          correction:
            "a) Les coins d'un rectangle sont des angles droits : le triangle $ABC$ est rectangle en $B$, et la diagonale $[CA]$ est son hypoténuse.\nD'après le théorème de Pythagore, $CA^2 = AB^2 + BC^2 = 21^2 + 29{,}7^2 = 441 + 882{,}09 = 1\\,323{,}09$.\nÀ la calculatrice, $CA = \\sqrt{1\\,323{,}09} \\approx 36{,}37$ cm, soit $36{,}4$ cm au millimètre (un millimètre, c'est un dixième de centimètre).\nb) Même triangle rectangle, avec $29{,}7$ et $42$ : $d^2 = 29{,}7^2 + 42^2 = 882{,}09 + 1\\,764 = 2\\,646{,}09$, et $d = \\sqrt{2\\,646{,}09} \\approx 51{,}4$ cm.\n⭐ La diagonale de l'A3 n'est pas le double de celle de l'A4 : une feuille A3, c'est deux feuilles A4 côte à côte, pas une A4 deux fois plus longue ET deux fois plus large.\n⛔ Le piège : additionner les côtés, $21 + 29{,}7 = 50{,}7$ cm, c'est le chemin par les bords. La diagonale est plus courte que ce détour.\nRéponse : la diagonale de l'A4 mesure environ $36{,}4$ cm, celle de l'A3 environ $51{,}4$ cm.",
          schema: triangle({ A: [0, 21], B: [0, 0], C: [29.7, 0] }, { cotes: { AB: "21 cm", BC: "29,7 cm", CA: "? ≈ 36,4 cm" }, droit: "B" }),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_carre_racine"],
        },
        {
          enonce:
            "Le triangle $SOI$ est isocèle en $I$ : $IS = OI = 9$ cm et $SO = 8$ cm. Le point $H$ est le milieu de $[SO]$, et la droite $(IH)$ est perpendiculaire à $(SO)$.\na) Calculer la hauteur $IH$, arrondie au dixième.\nb) Calculer l'aire du triangle $SOI$, arrondie au dixième de cm².",
          correction:
            "a) La hauteur coupe le triangle en deux triangles rectangles en $H$. Je travaille dans $SHI$, rectangle en $H$ : son hypoténuse est $[IS]$, $9$ cm.\n$H$ est le milieu de $[SO]$, donc $SH = 8 \\div 2 = 4$ cm.\nD'après le théorème de Pythagore, $IS^2 = SH^2 + IH^2$, donc $IH^2 = 9^2 - 4^2 = 81 - 16 = 65$.\n$IH = \\sqrt{65} \\approx 8{,}06$, soit $IH \\approx 8{,}1$ cm au dixième.\nb) Aire d'un triangle : base fois hauteur, divisé par $2$. Je garde la valeur de la calculatrice : $8 \\times \\sqrt{65} \\div 2 \\approx 32{,}2$ cm².\n⛔ Le piège au a) : prendre $SO = 8$ cm comme côté du petit triangle. Le côté de l'angle droit, c'est la MOITIÉ, $SH = 4$ cm.\n⛔ Le piège au b) : calculer avec l'arrondi, $8 \\times 8{,}1 \\div 2 = 32{,}4$ cm². Le dixième change : j'arrondis à la FIN.\nRéponse : $IH \\approx 8{,}1$ cm et l'aire mesure environ $32{,}2$ cm².",
          schema: triangle({ A: [0, 0], B: [8, 0], C: [4, 8.0623] }, { noms: { A: "S", B: "O", C: "I" }, cotes: { AB: "8 cm", BC: "9 cm", CA: "9 cm" }, hauteur: { depuis: "C", label: "? ≈ 8,1 cm" } }),
          micros: ["pythagore_calculer_cote", "pythagore_defi"],
        },
        {
          enonce:
            "La voile d'un dériveur est un triangle $TAE$ : $T$ en haut du mât, $A$ au pied du mât, $E$ au bout de la bôme. Le côté le long du mât mesure $TA = 6{,}3$ m, le côté le long de la bôme $AE = 160$ cm, et le troisième côté $ET = 6{,}5$ m. Le mât et la bôme forment-ils un angle droit ? Rédiger.",
          correction:
            "Je mets d'abord toutes les longueurs dans la MÊME unité : $AE = 160$ cm $= 1{,}6$ m.\n1. Dans le triangle $TAE$, le plus grand côté est $[ET]$.\n2. D'une part, $ET^2 = 6{,}5^2 = 42{,}25$. D'autre part, $TA^2 + AE^2 = 6{,}3^2 + 1{,}6^2 = 39{,}69 + 2{,}56 = 42{,}25$.\n3. Les deux résultats sont égaux. D'après la réciproque du théorème de Pythagore, le triangle $TAE$ est rectangle en $A$ : le mât et la bôme sont perpendiculaires.\n⛔ Le piège : calculer avec $160$ sans convertir. $6{,}3^2 + 160^2 = 25\\,639{,}69$ ne se compare à rien : on mêlerait des mètres et des centimètres.\nRéponse : oui, le mât et la bôme forment un angle droit en $A$.",
          schema: triangle({ A: [0, 6.3], B: [0, 0], C: [1.6, 0] }, { noms: { A: "T", B: "A", C: "E" }, cotes: { AB: "6,3 m", BC: "1,6 m", CA: "6,5 m" }, droit: "B" }),
          micros: ["pythagore_reciproque_conclure", "pythagore_rediger"],
        },
        {
          enonce:
            "Le triangle $SEL$ est rectangle en $E$, avec $SE = 12$ cm et $LS = 16{,}9$ cm. Tom écrit : « $EL^2 = 12^2 + 16{,}9^2 = 144 + 285{,}61 = 429{,}61$, donc $EL \\approx 20{,}7$ cm. »\na) Sans refaire le calcul, pourquoi sa réponse est-elle forcément fausse ?\nb) Trouver son erreur, puis rédiger correctement.",
          correction:
            "a) L'angle droit est en $E$ : l'hypoténuse est $[LS]$, le plus long côté du triangle. Tom trouve $EL \\approx 20{,}7$ cm, plus long que $LS = 16{,}9$ cm : c'est impossible.\nb) Tom a additionné comme s'il cherchait l'hypoténuse. Or $[EL]$ est un côté de l'angle droit : il faut soustraire.\nDans le triangle $SEL$ rectangle en $E$, d'après le théorème de Pythagore, $LS^2 = SE^2 + EL^2$.\nDonc $EL^2 = LS^2 - SE^2 = 16{,}9^2 - 12^2 = 285{,}61 - 144 = 141{,}61$.\n$EL = \\sqrt{141{,}61} = 11{,}9$ cm.\n⭐ Contrôle : $11{,}9 < 16{,}9$, et $11{,}9 \\times 11{,}9 = 141{,}61$.\n⛔ Le piège : écrire l'égalité sans avoir nommé l'hypoténuse. Je commence TOUJOURS par « l'angle droit est en…, l'hypoténuse est… ».\nRéponse : $EL = 11{,}9$ cm.",
          schema: triangle({ A: [0, 12], B: [0, 0], C: [11.9, 0] }, { noms: { A: "S", B: "E", C: "L" }, cotes: { AB: "12 cm", BC: "? = 11,9 cm", CA: "16,9 cm" }, droit: "B" }),
          micros: ["pythagore_reconnaitre", "pythagore_calculer_cote", "pythagore_rediger"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je cherche l'angle droit caché, je dessine le triangle, je calcule, puis une phrase de réponse.",
      rappel: [
        "L'angle droit se cache dans la situation : le coin d'un rectangle, un poteau vertical sur un sol horizontal, l'arête d'une boîte.",
        "Je dessine le triangle, je nomme l'hypoténuse, je convertis tout dans la même unité.",
        "J'arrondis à la FIN seulement, et je réponds par une phrase avec l'unité.",
      ],
      exercices: [
        {
          titre: "La terrasse du maçon",
          enonce:
            "Un maçon coffre une terrasse rectangulaire $ABCD$ : $AB = 10{,}5$ m et $DA = 8{,}8$ m. Pour contrôler que l'angle en $A$ est droit, il mesure la diagonale $BD$.\na) Il trouve $BD = 13{,}7$ m. L'angle en $A$ est-il droit ? Rédiger.\nb) Sur un autre chantier, avec les mêmes côtés, il trouve $BD = 13{,}6$ m. Et là ?\nc) Pourquoi mesurer une diagonale plutôt que poser une équerre ?",
          correction:
            "a) Je ne sais pas si l'angle est droit : c'est à prouver, avec la réciproque, dans le triangle $DAB$.\nLe plus grand côté est la diagonale $[BD]$.\nD'une part, $BD^2 = 13{,}7^2 = 187{,}69$. D'autre part, $DA^2 + AB^2 = 8{,}8^2 + 10{,}5^2 = 77{,}44 + 110{,}25 = 187{,}69$.\nLes deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle $DAB$ est rectangle en $A$. L'angle est droit.\nb) D'une part, $BD^2 = 13{,}6^2 = 184{,}96$ ; d'autre part, toujours $187{,}69$. $184{,}96 \\neq 187{,}69$ : si l'angle était droit, ces deux nombres seraient égaux. L'angle n'est pas droit, il faut reprendre le coffrage.\n⭐ Dix centimètres d'écart sur la diagonale, et l'angle ne mesure qu'environ $89{,}2°$ : invisible à l'œil, mais une terrasse de travers se voit quand on pose le carrelage.\nc) Une équerre de chantier fait moins d'un mètre : posée dans le coin, elle ne dit rien de précis sur dix mètres. Trois mesures au mètre ruban, et le calcul, sont bien plus sûrs.\n⛔ Le piège au b) : « $13{,}6$ ou $13{,}7$, c'est presque pareil ». Une égalité est vraie ou fausse.\nRéponse : sur le premier chantier, l'angle en $A$ est droit ; sur le second, il ne l'est pas.",
          schema: deux(
            triangle({ A: [0, 8.8], B: [0, 0], C: [10.5, 0] }, { noms: { A: "D", B: "A", C: "B" }, cotes: { AB: "8,8 m", BC: "10,5 m", CA: "13,7 m" }, droit: "B" }),
            triangle({ A: [0.13, 8.799], B: [0, 0], C: [10.5, 0] }, { noms: { A: "D", B: "A", C: "B" }, cotes: { AB: "8,8 m", BC: "10,5 m", CA: "13,6 m" } }),
          ),
          micros: ["pythagore_reciproque_conclure", "pythagore_rediger", "pythagore_defi"],
        },
        {
          titre: "La diagonale du court de tennis",
          enonce:
            "Un court de tennis mesure $23{,}77$ m de long. Il mesure $10{,}97$ m de large pour le double, et $8{,}23$ m pour le simple.\na) Calculer la diagonale du terrain de double, au centimètre.\nb) Calculer la diagonale du terrain de simple, au centimètre.\nc) Un joueur va d'un coin du terrain de double au coin opposé en longeant les lignes. Combien de mètres économise-t-il en coupant par la diagonale ?",
          correction:
            "a) Les coins du terrain sont des angles droits : la longueur, la largeur et la diagonale forment un triangle rectangle, dont l'hypoténuse est la DIAGONALE.\nD'après le théorème de Pythagore, $d^2 = 23{,}77^2 + 10{,}97^2 = 565{,}0129 + 120{,}3409 = 685{,}3538$.\n$d = \\sqrt{685{,}3538} \\approx 26{,}18$ m.\nb) $s^2 = 23{,}77^2 + 8{,}23^2 = 565{,}0129 + 67{,}7329 = 632{,}7458$, et $s = \\sqrt{632{,}7458} \\approx 25{,}15$ m.\nc) En longeant les lignes : $23{,}77 + 10{,}97 = 34{,}74$ m. Par la diagonale : environ $26{,}18$ m. Il économise $34{,}74 - 26{,}18 = 8{,}56$ m.\n⛔ Le piège : croire que la diagonale vaut la somme des deux côtés, $34{,}74$ m. C'est le détour ; la ligne droite est toujours plus courte.\nRéponse : environ $26{,}18$ m en double, $25{,}15$ m en simple, et $8{,}56$ m économisés.",
          schema: deux(
            triangle({ A: [0, 10.97], B: [0, 0], C: [23.77, 0] }, { cotes: { AB: "10,97 m", BC: "23,77 m", CA: "? ≈ 26,18 m" }, droit: "B" }),
            triangle({ A: [0, 8.23], B: [0, 0], C: [23.77, 0] }, { cotes: { AB: "8,23 m", BC: "23,77 m", CA: "? ≈ 25,15 m" }, droit: "B" }),
          ),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_defi"],
        },
        {
          titre: "La tente de bivouac",
          enonce:
            "De face, une tente de bivouac est un triangle isocèle $GDS$ : les piquets $G$ et $D$ sont au sol, à $GD = 1{,}4$ m l'un de l'autre, et les deux pans de toile mesurent $DS = SG = 1{,}2$ m jusqu'au sommet $S$. Le point $H$ est le milieu de $[GD]$, et $(SH)$ est verticale.\na) Calculer la hauteur $SH$ de la tente, en cm (arrondie à l'unité).\nb) Assis, un randonneur mesure $90$ cm. Tient-il assis au milieu de la tente ?\nc) Quelle longueur de pans faudrait-il pour une tente de $1$ m de haut, avec la même largeur au sol ? Arrondir au centimètre SUPÉRIEUR.",
          correction:
            "a) $(SH)$ est verticale et le sol horizontal : le triangle $SHD$ est rectangle en $H$. Son hypoténuse est le pan de toile $[DS]$, $1{,}2$ m.\n$H$ est le milieu de $[GD]$ : $HD = 1{,}4 \\div 2 = 0{,}7$ m.\nD'après le théorème de Pythagore, $SH^2 = DS^2 - HD^2 = 1{,}2^2 - 0{,}7^2 = 1{,}44 - 0{,}49 = 0{,}95$.\n$SH = \\sqrt{0{,}95} \\approx 0{,}975$ m, soit environ $97$ cm.\nb) Oui : $97$ cm de haut au milieu, pour $90$ cm assis. Il lui reste environ $7$ cm au-dessus de la tête.\nc) Cette fois, je cherche l'hypoténuse : $SD^2 = 0{,}7^2 + 1^2 = 0{,}49 + 1 = 1{,}49$, et $SD = \\sqrt{1{,}49} \\approx 1{,}2207$ m. Il faut au moins $1{,}23$ m de toile.\n⭐ Au c), l'arrondi au plus proche donnerait $1{,}22$ m : une toile trop courte de moins d'un millimètre, mais la tente n'atteint plus tout à fait $1$ m. Quand on fabrique, on arrondit du côté qui garantit la mesure.\n⛔ Le piège au a) : prendre toute la largeur $GD = 1{,}4$ m comme côté du triangle rectangle. Le côté de l'angle droit, c'est la moitié.\nRéponse : la tente fait environ $97$ cm de haut, le randonneur y tient assis ; pour $1$ m de haut, il faudrait des pans de $1{,}23$ m.",
          schema: triangle({ A: [0, 0], B: [1.4, 0], C: [0.7, 0.9747] }, { noms: { A: "G", B: "D", C: "S" }, cotes: { AB: "1,4 m", BC: "1,2 m", CA: "1,2 m" }, hauteur: { depuis: "C", label: "? ≈ 0,97 m" } }),
          micros: ["pythagore_calculer_cote", "pythagore_defi"],
        },
        {
          titre: "Le bâton dans la valise",
          enonce:
            "Une valise cabine est un pavé droit de $55$ cm de long, $35$ cm de large et $25$ cm de haut, les dimensions maximales d'une grande compagnie aérienne. Un randonneur veut y ranger son bâton de marche replié, long de $68$ cm.\na) Calculer la diagonale du fond de la valise, au millimètre. Le bâton tient-il à plat au fond ?\nb) Le bâton peut aussi partir d'un coin du fond et monter jusqu'au coin opposé du couvercle. Cette grande diagonale forme un triangle rectangle avec la diagonale du fond et une arête verticale de $25$ cm. Calculer sa longueur au millimètre.\nc) Le bâton tient-il dans la valise ?",
          correction:
            "a) Le fond est un rectangle de $55$ cm sur $35$ cm : sa diagonale $d$ est l'hypoténuse d'un triangle rectangle.\nD'après le théorème de Pythagore, $d^2 = 55^2 + 35^2 = 3\\,025 + 1\\,225 = 4\\,250$, et $d = \\sqrt{4\\,250} \\approx 65{,}2$ cm.\n$65{,}2 < 68$ : à plat au fond, le bâton ne tient pas.\nb) L'arête verticale est perpendiculaire au fond : le triangle formé par la diagonale du fond, l'arête de $25$ cm et la grande diagonale $D$ est rectangle, et $D$ est son hypoténuse.\n$D^2 = d^2 + 25^2 = 4\\,250 + 625 = 4\\,875$, et $D = \\sqrt{4\\,875} \\approx 69{,}8$ cm.\n⭐ Je garde $d^2 = 4\\,250$ tel quel : pas besoin de repasser par la racine, et aucun arrondi ne s'accumule.\nc) Oui : $69{,}8 > 68$. En travers, d'un coin du fond au coin opposé du haut, le bâton tient, avec moins de deux centimètres de marge.\n⛔ Le piège : conclure dès le a) que le bâton ne rentre pas. La valise a une TROISIÈME dimension, et la plus longue ligne droite d'une boîte traverse sa hauteur.\nRéponse : le bâton ne tient pas à plat (diagonale du fond d'environ $65{,}2$ cm), mais il tient en travers (grande diagonale d'environ $69{,}8$ cm).",
          schema: deux(
            triangle({ A: [0, 35], B: [0, 0], C: [55, 0] }, { cotes: { AB: "35 cm", BC: "55 cm", CA: "? ≈ 65,2 cm" }, droit: "B" }),
            triangle({ A: [0, 25], B: [0, 0], C: [65.192, 0] }, { cotes: { AB: "25 cm", BC: "65,2 cm", CA: "? ≈ 69,8 cm" }, droit: "B" }),
          ),
          micros: ["pythagore_calculer_hypotenuse", "pythagore_defi"],
        },
      ],
    },
  ],
};
