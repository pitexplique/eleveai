// ─── Fiche d'exercices : la trigonométrie (3e) — 20 exercices corrigés ───────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-trigonometrie.tsx` et sur
// les huit micros du coach de 3e (notionId trigo_trigonometrie). L'angle de la
// 3e, comme le cours : la 4e n'avait que le cosinus ; avec le sinus et la
// tangente, le vrai geste devient le CHOIX du rapport, lu sur les données.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni l'hypoténuse de 10 cm
// avec 60° ou 30°, ni tan 45° = 1, ni la paire 40° / 50°. ⛔ Ni ceux de la
// feuille de géométrie de seconde (35° et 10 cm, 6-8-10, 40° et 12, le
// bâtiment à 30 m, la route de 2 000 m, l'avion à 800 m).
//
// ⛔ LE BUG CONNU DE CETTE NOTION : `AC` et `CA` mêlés. Ici, chaque triangle a
// l'angle étudié en A (clé du canvas), l'angle droit en B : l'ADJACENT est
// toujours la clé AB, l'OPPOSÉ la clé BC, l'HYPOTÉNUSE la clé CA — et le texte
// nomme les segments dans l'ORDRE DES CLÉS (clé CA avec noms F…D → « $[FD]$ »).
// Le script de recalcul relit chaque figure et vérifie que le mot écrit sur un
// côté (« adjacent », « opposé », « hypoténuse ») est le bon PAR RAPPORT À
// L'ANGLE MARQUÉ, et que le corrigé nomme le même segment.
//
// Les pièges nommés : l'adjacent et l'opposé lus par rapport au MAUVAIS angle
// (1, 2, 8), la calculatrice en radians (3, 15), le cosinus pris au lieu du
// sinus, l'hypoténuse prise pour l'adjacent (4, 9, 17), le rapport renversé
// (5), multiplier au lieu de diviser quand l'inconnue est au dénominateur (6,
// 10), cos⁻¹ confondu avec 1 ÷ cos (7, 14), l'arrondi pris trop tôt (11, 12,
// 13), la tangente dans un triangle qui n'est pas rectangle (13), le choix du
// rapport à l'aveugle (16), un pourcentage de pente pris pour des degrés (19),
// la longueur du trajet prise pour la distance au sol (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - tour Eiffel : 330 m depuis l'antenne posée en mars 2022 (Société
//   d'exploitation de la tour Eiffel, SETE) — ex. 17 ; l'angle de 39,5° mesuré
//   à 400 m est construit pour retrouver cette hauteur ;
// - échelle : angle d'environ 75° avec le sol (INRS, travail en hauteur ; la
//   règle « un pour quatre » de l'OSHA, 29 CFR 1926.1053(b)(5)(i), dit la même
//   chose en longueur) — ex. 18 ;
// - Baldwin Street (Dunedin, Nouvelle-Zélande) : rue la plus pentue du monde
//   pour le Guinness World Records (titre rendu en 2020), pente d'environ 35 %
//   (34,8 %) — ex. 19 ; le panneau de pente en % : Code de la route, panneaux
//   A2 / « descente dangereuse » ;
// - approche d'un avion : pente de descente standard de 3° sur l'ILS (OACI,
//   Annexe 10 et PANS-OPS, Doc 8168) — ex. 20 ; l'altitude de 900 m est choisie
//   pour l'exercice (environ 3 000 pieds, l'ordre de grandeur d'une interception) ;
// - le cerf-volant (fil de 14 m) et la rampe (4,2 m pour 35 cm) sont IMAGINÉS,
//   à l'ordre de grandeur réel — ex. 11 et 15.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés ont
// leur triangle, dessiné avec ses VRAIES coordonnées — un angle de 52° est
// dessiné à 52° —, l'angle droit marqué, l'angle étudié écrit en degrés, et les
// côtés nommés hypoténuse / adjacent / opposé par rapport à CET angle, le côté
// cherché « ? » suivi de sa valeur. Les triangles « d'école » sont TOURNÉS
// (aucun côté vertical) : une étiquette longue posée sur un côté vertical, au
// bord du cadre, sortait du dessin. Les triangles du monde (tour, mur, route)
// gardent leur verticale, avec des étiquettes courtes.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// autres feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-trigonometrie-3e.mjs`.
//
// Micro-compétences : trigo_triangle_rectangle (1, 2, 16), trigo_cosinus (2, 3,
// 6, 7, 14, 16, 18), trigo_sinus (2, 4, 9, 11, 12, 15, 18, 20), trigo_tangente
// (2, 5, 8, 10, 12, 13, 16, 17, 19, 20), trigo_calculer_longueur (3, 4, 5, 6,
// 9, 10, 12, 13, 15, 16, 17, 18, 20), trigo_calculer_angle (7, 8, 11, 12, 14,
// 16, 19), trigo_choisir_rapport (9, 16, 17, 18), trigo_defi (13, 17, 18, 19,
// 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { triangle } from "@/lib/fiches-exercices/figures";

/** Deux triangles côte à côte (exercices 1, 16 et 19) : l'un sous l'autre sur
 *  téléphone, côte à côte à partir de `sm` et sur papier (mesuré à 375 px sur
 *  la feuille de Pythagore, 24/09). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

export const exercicesTrigonometrie3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "trigo-trigonometrie",
  titre: "La trigonométrie : cosinus, sinus, tangente",
  accroche:
    "Vingt exercices, du geste seul au problème de brevet : nommer l'hypoténuse, l'adjacent et l'opposé, choisir entre cosinus, sinus et tangente, calculer une longueur, puis un angle. La hauteur de la tour Eiffel, une échelle, un cerf-volant, la rue la plus pentue du monde, la descente d'un avion. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le triangle dessiné à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/trigo-trigonometrie", titre: "Trigonométrie : sinus, cosinus, tangente" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un rapport par exercice. Je repère l'angle droit, puis l'angle étudié, avant d'écrire quoi que ce soit.",
      rappel: [
        "Dans un triangle rectangle, par rapport à un angle aigu : l'HYPOTÉNUSE est en face de l'angle droit, l'ADJACENT touche l'angle étudié, l'OPPOSÉ est en face de lui.",
        "CAH-SOH-TOA : Cosinus = Adjacent ÷ Hypoténuse, Sinus = Opposé ÷ Hypoténuse, Tangente = Opposé ÷ Adjacent.",
        "Un angle connu, une longueur cherchée : je multiplie ou je divise. Deux longueurs connues, un angle cherché : cos⁻¹, sin⁻¹ ou tan⁻¹.",
        "La calculatrice doit être en DEGRÉS : un « D » ou « DEG » affiché à l'écran.",
      ],
      exercices: [
        {
          enonce:
            "Le triangle $DEF$ est rectangle en $E$.\na) Nommer son hypoténuse.\nb) Nommer le côté adjacent à l'angle $\\widehat{D}$, puis le côté opposé à $\\widehat{D}$.\nc) Même question pour l'angle $\\widehat{F}$.\nd) Quel côté garde le même nom quel que soit l'angle choisi ?",
          correction:
            "Je repère d'abord l'angle droit : il est en $E$.\na) L'hypoténuse est en face de l'angle droit, c'est le seul côté qui ne touche pas $E$ : l'hypoténuse est $[FD]$.\nb) Je me place en $D$. Deux côtés touchent $D$ : $[FD]$, déjà pris par l'hypoténuse, et $[DE]$. Le côté adjacent est $[DE]$. Le côté qui ne touche pas $D$ est en face : le côté opposé est $[EF]$.\nc) Je me place maintenant en $F$ : les rôles s'échangent. Le côté adjacent à $\\widehat{F}$ est $[EF]$ et le côté opposé à $\\widehat{F}$ est $[DE]$.\nd) L'hypoténuse : elle ne dépend que de l'angle droit.\n⛔ Le piège : apprendre « l'adjacent, c'est le côté du bas ». Adjacent et opposé n'existent que PAR RAPPORT à un angle : je change d'angle, ils changent de côté.\nRéponse : hypoténuse $[FD]$ ; pour $\\widehat{D}$, adjacent $[DE]$ et opposé $[EF]$ ; pour $\\widehat{F}$, c'est l'inverse.",
          schema: deux(
            triangle({ A: [0, 0], B: [4.4501, 2.2795], C: [2.8089, 5.4836] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "adjacent à D", BC: "opposé à D", CA: "hypoténuse" }, angles: { A: "D" }, droit: "B" }),
            triangle({ A: [0, 0], B: [4.4501, 2.2795], C: [2.8089, 5.4836] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "opposé à F", BC: "adjacent à F", CA: "hypoténuse" }, angles: { C: "F" }, droit: "B" }),
          ),
          micros: ["trigo_triangle_rectangle"],
        },
        {
          enonce:
            "Le triangle $KLM$ est rectangle en $L$, avec $KL = 24$ cm, $LM = 7$ cm et $MK = 25$ cm.\na) Écrire $\\cos \\widehat{K}$, $\\sin \\widehat{K}$ et $\\tan \\widehat{K}$ sous forme de fractions, puis en décimal (au centième si besoin).\nb) Calculer $\\cos \\widehat{M}$. Que remarque-t-on ?",
          correction:
            "L'angle droit est en $L$ : l'hypoténuse est $[MK]$, $25$ cm. Par rapport à $\\widehat{K}$, le côté adjacent est $[KL]$ et le côté opposé est $[LM]$.\na) CAH : $\\cos \\widehat{K} = \\dfrac{KL}{MK} = \\dfrac{24}{25} = 0{,}96$.\nSOH : $\\sin \\widehat{K} = \\dfrac{LM}{MK} = \\dfrac{7}{25} = 0{,}28$.\nTOA : $\\tan \\widehat{K} = \\dfrac{LM}{KL} = \\dfrac{7}{24} \\approx 0{,}29$.\nb) Je me place en $M$ : l'adjacent devient $[LM]$. $\\cos \\widehat{M} = \\dfrac{LM}{MK} = \\dfrac{7}{25} = 0{,}28$.\n⭐ C'est $\\sin \\widehat{K}$ : ce qui est opposé à $K$ est adjacent à $M$. Le cosinus d'un angle aigu est le sinus de l'autre.\n⛔ Le piège : garder les rôles de $\\widehat{K}$ pour calculer $\\cos \\widehat{M}$, et trouver $0{,}96$ encore.\nRéponse : $\\cos \\widehat{K} = 0{,}96$, $\\sin \\widehat{K} = 0{,}28$, $\\tan \\widehat{K} \\approx 0{,}29$ ; $\\cos \\widehat{M} = 0{,}28$.",
          schema: triangle({ A: [0, 0], B: [19.2, 14.4], C: [15, 20] }, { noms: { A: "K", B: "L", C: "M" }, cotes: { AB: "adjacent 24 cm", BC: "opposé 7 cm", CA: "hypoténuse 25 cm" }, angles: { A: "K" }, droit: "B" }),
          micros: ["trigo_triangle_rectangle", "trigo_cosinus", "trigo_sinus", "trigo_tangente"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $B$, avec $\\widehat{A} = 52°$ et $CA = 8$ cm. Calculer $AB$, arrondi au dixième.",
          correction:
            "L'angle droit est en $B$ : l'hypoténuse est $[CA]$, $8$ cm. Par rapport à $\\widehat{A}$, le côté adjacent est $[AB]$ : il touche $A$ et ce n'est pas l'hypoténuse.\nJe connais l'hypoténuse, je cherche l'adjacent : CAH, le cosinus.\n$\\cos \\widehat{A} = \\dfrac{AB}{CA}$, donc $\\cos 52° = \\dfrac{AB}{8}$.\nJe multiplie les deux membres par $8$ : $AB = 8 \\times \\cos 52° \\approx 4{,}9$ cm (la calculatrice affiche $4{,}925\\ldots$).\n⭐ Contrôle : $4{,}9 < 8$ ; un côté de l'angle droit est toujours plus court que l'hypoténuse.\n⛔ Le piège : la calculatrice en radians. Elle affiche $8 \\times \\cos 52 \\approx -1{,}30$, une longueur NÉGATIVE. Avant tout calcul, je vérifie le « D » ou « DEG » à l'écran.\nRéponse : $AB \\approx 4{,}9$ cm.",
          schema: triangle({ A: [0, 0], B: [4.657, 1.6035], C: [2.6045, 7.5641] }, { cotes: { AB: "adj. ? ≈ 4,9 cm", BC: "opposé", CA: "hyp. 8 cm" }, angles: { A: "52°" }, droit: "B" }),
          micros: ["trigo_cosinus", "trigo_calculer_longueur"],
        },
        {
          enonce: "Le triangle $PQR$ est rectangle en $Q$, avec $\\widehat{P} = 23°$ et $RP = 15$ cm. Calculer $QR$, arrondi au dixième.",
          correction:
            "L'angle droit est en $Q$ : l'hypoténuse est $[RP]$, $15$ cm. Par rapport à $\\widehat{P}$, $[QR]$ ne touche pas $P$ : le côté opposé est $[QR]$.\nJe connais l'hypoténuse, je cherche l'opposé : SOH, le sinus.\n$\\sin \\widehat{P} = \\dfrac{QR}{RP}$, donc $\\sin 23° = \\dfrac{QR}{15}$.\n$QR = 15 \\times \\sin 23° \\approx 5{,}9$ cm (la calculatrice affiche $5{,}860\\ldots$).\n⭐ Contrôle : un angle de $23°$ est petit, le côté en face de lui est court.\n⛔ Le piège : prendre le cosinus par habitude de 4e. $15 \\times \\cos 23° \\approx 13{,}8$ cm, c'est la longueur de l'ADJACENT $[PQ]$, pas celle de $[QR]$.\nRéponse : $QR \\approx 5{,}9$ cm.",
          schema: triangle({ A: [0, 0], B: [11.5139, 7.6209], C: [8.2791, 12.5083] }, { noms: { A: "P", B: "Q", C: "R" }, cotes: { AB: "adjacent", BC: "opposé ? ≈ 5,9 cm", CA: "hypoténuse 15 cm" }, angles: { A: "23°" }, droit: "B" }),
          micros: ["trigo_sinus", "trigo_calculer_longueur"],
        },
        {
          enonce: "Le triangle $UVW$ est rectangle en $V$, avec $\\widehat{U} = 38°$ et $UV = 6{,}5$ cm. Calculer $VW$, arrondi au dixième.",
          correction:
            "L'angle droit est en $V$ : l'hypoténuse est $[WU]$, mais je ne la connais pas et je ne la cherche pas. Par rapport à $\\widehat{U}$, le côté adjacent est $[UV]$ et le côté opposé est $[VW]$.\nOpposé et adjacent, sans hypoténuse : TOA, la tangente.\n$\\tan \\widehat{U} = \\dfrac{VW}{UV}$, donc $\\tan 38° = \\dfrac{VW}{6{,}5}$.\n$VW = 6{,}5 \\times \\tan 38° \\approx 5{,}1$ cm (la calculatrice affiche $5{,}078\\ldots$).\n⭐ Contrôle : $38°$ est un peu moins que la moitié d'un angle droit, l'opposé est donc un peu plus court que l'adjacent.\n⛔ Le piège : renverser le rapport, « adjacent sur opposé », et calculer $6{,}5 \\div \\tan 38° \\approx 8{,}3$ cm. TOA : l'Opposé est en HAUT.\nRéponse : $VW \\approx 5{,}1$ cm.",
          schema: triangle({ A: [0, 0], B: [5.8422, 2.8494], C: [3.616, 7.4138] }, { noms: { A: "U", B: "V", C: "W" }, cotes: { AB: "adjacent 6,5 cm", BC: "opposé ? ≈ 5,1 cm", CA: "hypoténuse" }, angles: { A: "38°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_calculer_longueur"],
        },
        {
          enonce: "Le triangle $EFG$ est rectangle en $F$, avec $\\widehat{E} = 34°$ et $EF = 9$ cm. Calculer l'hypoténuse $GE$, arrondie au dixième.",
          correction:
            "L'angle droit est en $F$ : l'hypoténuse est $[GE]$. Par rapport à $\\widehat{E}$, le côté adjacent est $[EF]$, $9$ cm.\nAdjacent connu, hypoténuse cherchée : CAH, le cosinus.\n$\\cos 34° = \\dfrac{EF}{GE} = \\dfrac{9}{GE}$.\nCette fois, l'inconnue est EN BAS. Je multiplie par $GE$ : $GE \\times \\cos 34° = 9$, puis je divise par $\\cos 34°$ : $GE = \\dfrac{9}{\\cos 34°} \\approx 10{,}9$ cm (la calculatrice affiche $10{,}855\\ldots$).\n⭐ Contrôle : $10{,}9 > 9$ ; l'hypoténuse est le plus long côté.\n⛔ Le piège : multiplier par réflexe, $9 \\times \\cos 34° \\approx 7{,}5$ cm. Une hypoténuse plus courte que l'adjacent, c'est impossible.\nRéponse : $GE \\approx 10{,}9$ cm.",
          schema: triangle({ A: [0, 0], B: [7.9465, 4.2252], C: [5.0966, 9.5852] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "adjacent 9 cm", BC: "opposé", CA: "hyp. ? ≈ 10,9 cm" }, angles: { A: "34°" }, droit: "B" }),
          micros: ["trigo_cosinus", "trigo_calculer_longueur"],
        },
        {
          enonce: "Le triangle $XYZ$ est rectangle en $Y$, avec $XY = 7$ cm et $ZX = 11$ cm. Calculer l'angle $\\widehat{X}$, arrondi au dixième de degré.",
          correction:
            "L'angle droit est en $Y$ : l'hypoténuse est $[ZX]$, $11$ cm. Par rapport à $\\widehat{X}$, le côté adjacent est $[XY]$, $7$ cm.\nAdjacent et hypoténuse : le cosinus. $\\cos \\widehat{X} = \\dfrac{XY}{ZX} = \\dfrac{7}{11}$.\nJe connais le cosinus, je veux l'angle : j'utilise la touche $\\cos^{-1}$ (parfois « Arccos », ou « seconde » puis « cos »).\n$\\widehat{X} = \\cos^{-1}\\left(\\dfrac{7}{11}\\right) \\approx 50{,}5°$.\n⭐ Contrôle : l'autre angle aigu vaut $90° - 50{,}5° = 39{,}5°$, un angle aigu ; tout est cohérent.\n⛔ Le piège : lire $\\cos^{-1}$ comme « 1 divisé par cos ». $1 \\div \\cos(7 \\div 11)$ donne $\\approx 1{,}0001$ : ce n'est pas un angle. $\\cos^{-1}$ est la touche qui REMONTE du cosinus à l'angle.\nRéponse : $\\widehat{X} \\approx 50{,}5°$.",
          schema: triangle({ A: [0, 0], B: [6.5878, 2.3666], C: [3.719, 10.3522] }, { noms: { A: "X", B: "Y", C: "Z" }, cotes: { AB: "adjacent 7 cm", BC: "opposé", CA: "hyp. 11 cm" }, angles: { A: "? ≈ 50,5°" }, droit: "B" }),
          micros: ["trigo_cosinus", "trigo_calculer_angle"],
        },
        {
          enonce: "Le triangle $RST$ est rectangle en $S$, avec $RS = 7{,}5$ cm et $ST = 4{,}2$ cm. Calculer l'angle $\\widehat{R}$, arrondi au dixième de degré.",
          correction:
            "L'angle droit est en $S$ : l'hypoténuse est $[TR]$, que je ne connais pas. Par rapport à $\\widehat{R}$, le côté adjacent est $[RS]$ et le côté opposé est $[ST]$.\nOpposé et adjacent : la tangente. $\\tan \\widehat{R} = \\dfrac{ST}{RS} = \\dfrac{4{,}2}{7{,}5} = 0{,}56$.\n$\\widehat{R} = \\tan^{-1}(0{,}56) \\approx 29{,}2°$.\n⛔ Le piège : se placer en $T$ sans le vouloir, et écrire $\\dfrac{7{,}5}{4{,}2}$. On trouve alors $\\tan^{-1}\\left(\\dfrac{7{,}5}{4{,}2}\\right) \\approx 60{,}8°$ : c'est l'angle $\\widehat{T}$, pas $\\widehat{R}$. D'ailleurs $29{,}2° + 60{,}8° = 90°$.\nRéponse : $\\widehat{R} \\approx 29{,}2°$.",
          schema: triangle({ A: [0, 0], B: [6.4705, 3.7925], C: [4.3467, 7.416] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "adjacent 7,5 cm", BC: "opposé 4,2 cm", CA: "hypoténuse" }, angles: { A: "? ≈ 29,2°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_calculer_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Rédiger comme au brevet : le triangle rectangle, le rapport choisi et pourquoi, l'égalité, le calcul, l'arrondi.",
      rappel: [
        "La phrase d'ouverture : « Dans le triangle ABC rectangle en B, … ». Sans triangle rectangle, pas de trigonométrie.",
        "CHOISIR le rapport : je surligne les deux côtés qui comptent (le connu et le cherché) par rapport à l'angle. Adjacent et hypoténuse : CAH. Opposé et hypoténuse : SOH. Opposé et adjacent : TOA.",
        "Inconnue en haut de la fraction : je multiplie. Inconnue en bas : je divise.",
        "Je garde la valeur de la calculatrice jusqu'au bout, et j'arrondis à la FIN seulement.",
      ],
      exercices: [
        {
          enonce:
            "Le triangle $STU$ est rectangle en $T$, avec $\\widehat{S} = 27°$ et $US = 13$ cm.\na) Quel rapport permet de calculer $TU$ ? Pourquoi pas le cosinus ?\nb) Calculer $TU$ au dixième, en rédigeant comme au brevet.",
          correction:
            "a) L'angle droit est en $T$ : l'hypoténuse est $[US]$. Par rapport à $\\widehat{S}$, le côté opposé est $[TU]$ (il ne touche pas $S$), et le côté adjacent est $[ST]$. Je connais l'hypoténuse, je cherche l'opposé : SOH, le sinus. Le cosinus relie l'ADJACENT $[ST]$ à l'hypoténuse : il ne parle pas de $[TU]$.\nb) Dans le triangle $STU$ rectangle en $T$, $\\sin \\widehat{S} = \\dfrac{TU}{US}$.\nDonc $\\sin 27° = \\dfrac{TU}{13}$ et $TU = 13 \\times \\sin 27° \\approx 5{,}9$ cm.\n⛔ Le piège : prendre l'hypoténuse pour l'adjacent parce qu'elle touche aussi $S$. Avec le cosinus, $13 \\times \\cos 27° \\approx 11{,}6$ cm : c'est $ST$, l'autre côté.\nRéponse : $TU \\approx 5{,}9$ cm.",
          schema: triangle({ A: [0, 0], B: [9.8762, 6.0521], C: [6.7925, 11.0843] }, { noms: { A: "S", B: "T", C: "U" }, cotes: { AB: "adjacent", BC: "opposé ? ≈ 5,9 cm", CA: "hypoténuse 13 cm" }, angles: { A: "27°" }, droit: "B" }),
          micros: ["trigo_choisir_rapport", "trigo_sinus", "trigo_calculer_longueur"],
        },
        {
          enonce: "Le triangle $GHI$ est rectangle en $H$, avec $\\widehat{I} = 61°$ et $HG = 7{,}4$ cm. Calculer $IH$ au dixième, en rédigeant.",
          correction:
            "Je me place en $I$, l'angle connu. L'angle droit est en $H$ : l'hypoténuse est $[GI]$. Par rapport à $\\widehat{I}$, le côté adjacent est $[IH]$ et le côté opposé est $[HG]$.\nOpposé connu, adjacent cherché : TOA, la tangente.\nDans le triangle $GHI$ rectangle en $H$, $\\tan \\widehat{I} = \\dfrac{HG}{IH}$, donc $\\tan 61° = \\dfrac{7{,}4}{IH}$.\nL'inconnue est en BAS : $IH \\times \\tan 61° = 7{,}4$, donc $IH = \\dfrac{7{,}4}{\\tan 61°} \\approx 4{,}1$ cm.\n⭐ Contrôle : $61°$ est plus grand que la moitié d'un angle droit, donc l'opposé ($7{,}4$ cm) est plus long que l'adjacent. $4{,}1 < 7{,}4$ : c'est cohérent.\n⛔ Le piège : multiplier, $7{,}4 \\times \\tan 61° \\approx 13{,}3$ cm. Ce serait vrai si l'inconnue était en haut.\nRéponse : $IH \\approx 4{,}1$ cm.",
          schema: triangle({ A: [0, 0], B: [3.9712, 1.027], C: [2.1184, 8.1913] }, { noms: { A: "I", B: "H", C: "G" }, cotes: { AB: "adj. ? ≈ 4,1 cm", BC: "opposé 7,4 cm", CA: "hypoténuse" }, angles: { A: "61°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_calculer_longueur", "trigo_choisir_rapport"],
        },
        {
          enonce:
            "Une rampe pour fauteuil roulant mesure $4{,}2$ m de long. Son sommet $S$ est $35$ cm plus haut que son pied $P$. On note $H$ le point du sol à la verticale de $S$ : le triangle $PHS$ est rectangle en $H$.\na) Calculer l'angle $\\widehat{P}$ que fait la rampe avec le sol, au dixième de degré.\nb) Un élève arrondit d'abord $0{,}35 \\div 4{,}2$ à $0{,}08$. Quel angle trouve-t-il ?",
          correction:
            "a) Je convertis : $35$ cm $= 0{,}35$ m. L'angle droit est en $H$ : l'hypoténuse est la rampe $[SP]$, $4{,}2$ m. Par rapport à $\\widehat{P}$, la hauteur $[HS]$ est le côté opposé.\nOpposé et hypoténuse : le sinus. Dans le triangle $PHS$ rectangle en $H$, $\\sin \\widehat{P} = \\dfrac{HS}{SP} = \\dfrac{0{,}35}{4{,}2}$.\n$\\widehat{P} = \\sin^{-1}\\left(\\dfrac{0{,}35}{4{,}2}\\right) \\approx 4{,}8°$. Je tape la division DANS la parenthèse, sans l'arrondir.\nb) $\\sin^{-1}(0{,}08) \\approx 4{,}6°$ : l'élève se trompe de $0{,}2°$ au dixième demandé.\n⛔ Le piège : l'arrondi pris trop tôt. $0{,}35 \\div 4{,}2 = 0{,}0833\\ldots$ ; en coupant à $0{,}08$, on perd $4$ % de la valeur, et l'angle change.\nRéponse : la rampe fait un angle d'environ $4{,}8°$ avec le sol.",
          schema: triangle({ A: [0, 0], B: [4.1854, 0], C: [4.1854, 0.35] }, { noms: { A: "P", B: "H", C: "S" }, cotes: { AB: "adjacent", BC: "0,35 m", CA: "hypoténuse 4,2 m" }, angles: { A: "? ≈ 4,8°" }, droit: "B" }),
          micros: ["trigo_sinus", "trigo_calculer_angle"],
        },
        {
          enonce:
            "Le triangle $ABC$ est rectangle en $B$, avec $AB = 5{,}3$ cm et $BC = 3{,}8$ cm.\na) Calculer $\\widehat{A}$ au dixième de degré.\nb) En déduire $CA$ au centième avec le sinus.\nc) Vérifier avec le théorème de Pythagore.",
          correction:
            "a) L'angle droit est en $B$ : l'hypoténuse est $[CA]$. Par rapport à $\\widehat{A}$, le côté adjacent est $[AB]$ et le côté opposé est $[BC]$. Opposé et adjacent : la tangente.\n$\\tan \\widehat{A} = \\dfrac{BC}{AB} = \\dfrac{3{,}8}{5{,}3}$, donc $\\widehat{A} = \\tan^{-1}\\left(\\dfrac{3{,}8}{5{,}3}\\right) \\approx 35{,}6°$.\nb) $\\sin \\widehat{A} = \\dfrac{BC}{CA}$ : l'inconnue est en bas, je divise. $CA = \\dfrac{3{,}8}{\\sin \\widehat{A}}$.\nJe garde en mémoire la valeur EXACTE de l'angle (touche « Ans ») : $CA \\approx 6{,}52$ cm.\nc) $CA^2 = 5{,}3^2 + 3{,}8^2 = 28{,}09 + 14{,}44 = 42{,}53$, et $\\sqrt{42{,}53} \\approx 6{,}52$ cm. Les deux chemins donnent le même centième.\n⛔ Le piège : l'arrondi pris trop tôt. Avec $36°$ on trouve $3{,}8 \\div \\sin 36° \\approx 6{,}46$ cm, avec $35{,}6°$ on trouve $6{,}53$ cm : deux centièmes faux.\nRéponse : $\\widehat{A} \\approx 35{,}6°$ et $CA \\approx 6{,}52$ cm.",
          schema: triangle({ A: [0, 0], B: [4.7147, 2.421], C: [2.979, 5.8014] }, { cotes: { AB: "adjacent 5,3 cm", BC: "opposé 3,8 cm", CA: "hyp. ? ≈ 6,52 cm" }, angles: { A: "≈ 35,6°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_sinus", "trigo_calculer_angle", "trigo_calculer_longueur"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $H$ est le pied de la hauteur issue de $A$ : $H$ est sur $[BC]$ et $(AH)$ est perpendiculaire à $(BC)$. On donne $AH = 6$ cm, $\\widehat{B} = 42°$ et $\\widehat{C} = 28°$.\na) Calculer $BH$ et $HC$ au centième.\nb) En déduire $BC$ au dixième.",
          correction:
            "Le triangle $ABC$ n'est pas rectangle : je ne peux pas y appliquer la trigonométrie. Mais la hauteur le coupe en DEUX triangles rectangles en $H$ : $ABH$ et $ACH$.\na) Dans le triangle $ABH$ rectangle en $H$, par rapport à $\\widehat{B}$, $[AH]$ est opposé et $[BH]$ adjacent : la tangente. $\\tan 42° = \\dfrac{6}{BH}$, donc $BH = \\dfrac{6}{\\tan 42°} \\approx 6{,}66$ cm.\nDans le triangle $ACH$ rectangle en $H$, de même : $HC = \\dfrac{6}{\\tan 28°} \\approx 11{,}28$ cm.\nb) $H$ est entre $B$ et $C$ : $BC = BH + HC$. Avec les valeurs de la calculatrice, $BC \\approx 17{,}95$, soit $17{,}9$ cm au dixième.\n⛔ Le piège : arrondir chaque morceau au dixième avant d'additionner, $6{,}7 + 11{,}3 = 18{,}0$ cm. Deux petits arrondis vers le haut se cumulent.\nRéponse : $BH \\approx 6{,}66$ cm, $HC \\approx 11{,}28$ cm, $BC \\approx 17{,}9$ cm.",
          schema: triangle({ A: [0, 0], B: [17.948, 0], C: [6.6637, 6] }, { noms: { A: "B", B: "C", C: "A" }, cotes: { AB: "? ≈ 17,9 cm" }, angles: { A: "42°", B: "28°" }, hauteur: { depuis: "C", label: "6 cm" } }),
          micros: ["trigo_tangente", "trigo_calculer_longueur", "trigo_defi"],
        },
        {
          enonce:
            "Le triangle $JKL$ est rectangle en $K$, avec $JK = 5{,}6$ cm et $LJ = 8$ cm. Un élève veut $\\widehat{J}$ : il calcule $5{,}6 \\div 8 = 0{,}7$, puis tape « 1 ÷ cos(0,7) » et trouve $1{,}0001$.\na) Où est l'erreur ?\nb) Calculer $\\widehat{J}$ au dixième de degré.",
          correction:
            "a) Son début est juste : l'angle droit est en $K$, l'hypoténuse est $[LJ]$, et $[JK]$ est adjacent à $\\widehat{J}$ ; donc $\\cos \\widehat{J} = \\dfrac{5{,}6}{8} = 0{,}7$. L'erreur est à la fin : il a lu $\\cos^{-1}$ comme « 1 divisé par cos ». Il a calculé l'inverse du cosinus de l'angle $0{,}7°$, un nombre qui n'a rien à voir avec un angle.\nb) $\\cos^{-1}$ est la fonction qui REMONTE : elle part du cosinus, $0{,}7$, et rend l'angle. $\\widehat{J} = \\cos^{-1}(0{,}7) \\approx 45{,}6°$.\n⭐ Contrôle : je repars de l'angle, $\\cos 45{,}6° \\approx 0{,}70$. La boucle est bouclée.\n⛔ Le piège : $\\cos^{-1}$ n'est PAS $\\dfrac{1}{\\cos}$. Le petit « $-1$ » veut dire « la touche réciproque », comme remonter un escalier qu'on vient de descendre.\nRéponse : $\\widehat{J} \\approx 45{,}6°$.",
          schema: triangle({ A: [0, 0], B: [5.1844, 2.1171], C: [3.0245, 7.4063] }, { noms: { A: "J", B: "K", C: "L" }, cotes: { AB: "adjacent 5,6 cm", BC: "opposé", CA: "hyp. 8 cm" }, angles: { A: "? ≈ 45,6°" }, droit: "B" }),
          micros: ["trigo_cosinus", "trigo_calculer_angle"],
        },
        {
          enonce:
            "Le fil d'un cerf-volant, bien tendu, mesure $14$ m entre la main $M$ et le cerf-volant $V$. Il fait un angle de $48°$ avec l'horizontale. On note $H$ le point à la hauteur de la main, à la verticale de $V$.\na) Calculer la hauteur $HV$ du cerf-volant au-dessus de la main, au dixième.\nb) Un camarade trouve $-10{,}76$ m. Que s'est-il passé ?",
          correction:
            "a) Le triangle $MHV$ est rectangle en $H$ (verticale et horizontale). L'hypoténuse est le fil $[VM]$, $14$ m. Par rapport à $\\widehat{M}$, le côté opposé est $[HV]$.\nOpposé cherché, hypoténuse connue : le sinus. $\\sin 48° = \\dfrac{HV}{14}$, donc $HV = 14 \\times \\sin 48° \\approx 10{,}4$ m.\nb) Sa calculatrice est en RADIANS : elle a calculé le sinus de $48$ radians, et $14 \\times \\sin 48 \\approx -10{,}76$. Une hauteur négative est absurde : c'est le signal d'alarme.\n⛔ Le piège : la calculatrice en radians. Je règle le mode DEGRÉS, et je teste avec un angle connu : $\\sin 30°$ doit donner $0{,}5$.\nRéponse : le cerf-volant vole à environ $10{,}4$ m au-dessus de la main.",
          schema: triangle({ A: [0, 0], B: [9.3679, 0], C: [9.3679, 10.404] }, { noms: { A: "M", B: "H", C: "V" }, cotes: { AB: "adjacent", BC: "opposé ? ≈ 10,4 m", CA: "hypoténuse 14 m" }, angles: { A: "48°" }, droit: "B" }),
          micros: ["trigo_sinus", "trigo_calculer_longueur"],
        },
        {
          enonce:
            "Pour chaque triangle, choisir le rapport, puis calculer.\na) $EFG$ est rectangle en $F$, $\\widehat{E} = 20°$ et $FG = 3{,}5$ cm. Calculer $EF$ au dixième.\nb) $RST$ est rectangle en $S$, $RS = 9$ cm et $TR = 12$ cm. Calculer $\\widehat{R}$ au dixième de degré.",
          correction:
            "Pour chacun, je nomme d'abord les deux côtés qui comptent par rapport à l'angle, PUIS je choisis.\na) L'angle droit est en $F$ : l'hypoténuse est $[GE]$. Par rapport à $\\widehat{E}$, $[FG]$ est l'opposé (connu) et $[EF]$ l'adjacent (cherché). Opposé et adjacent : TOA.\n$\\tan 20° = \\dfrac{3{,}5}{EF}$ ; l'inconnue est en bas, je divise : $EF = \\dfrac{3{,}5}{\\tan 20°} \\approx 9{,}6$ cm.\nb) L'angle droit est en $S$ : l'hypoténuse est $[TR]$, $12$ cm. Par rapport à $\\widehat{R}$, $[RS]$ est l'adjacent. Adjacent et hypoténuse : CAH.\n$\\cos \\widehat{R} = \\dfrac{9}{12} = 0{,}75$, donc $\\widehat{R} = \\cos^{-1}(0{,}75) \\approx 41{,}4°$.\n⛔ Le piège : choisir le rapport à l'aveugle, ou prendre toujours le cosinus. Au a), l'hypoténuse n'apparaît NULLE PART : ni le cosinus ni le sinus ne peuvent servir.\nRéponse : a) $EF \\approx 9{,}6$ cm ; b) $\\widehat{R} \\approx 41{,}4°$.",
          schema: deux(
            triangle({ A: [0, 0], B: [7.8771, 5.5156], C: [5.8696, 8.3826] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "adj. ? ≈ 9,6 cm", BC: "opposé 3,5 cm", CA: "hypoténuse" }, angles: { A: "20°" }, droit: "B" }),
            triangle({ A: [0, 0], B: [8.2029, 3.7029], C: [4.9373, 10.9373] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "adjacent 9 cm", BC: "opposé", CA: "hyp. 12 cm" }, angles: { A: "? ≈ 41,4°" }, droit: "B" }),
          ),
          micros: ["trigo_choisir_rapport", "trigo_triangle_rectangle", "trigo_tangente", "trigo_cosinus", "trigo_calculer_longueur", "trigo_calculer_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je trouve le triangle rectangle caché, je le dessine, je choisis le rapport, puis une phrase de réponse.",
      rappel: [
        "L'angle droit se cache dans le monde : un mur ou une tour verticale sur un sol horizontal, la verticale d'un avion au-dessus de la piste.",
        "L'angle d'élévation se mesure à partir de l'HORIZONTALE, en levant les yeux ; une pente en % est une TANGENTE : 10 % veut dire 10 m de montée pour 100 m à l'horizontale.",
        "Je vérifie l'ordre de grandeur : une échelle ne dépasse pas sa longueur, une tour de 300 m ne mesure pas 3 km.",
      ],
      exercices: [
        {
          titre: "La hauteur de la tour Eiffel",
          enonce:
            "Posée au sol à $400$ m du pied $P$ de la tour Eiffel, en $O$, une élève vise le sommet $S$ avec un clinomètre : l'angle d'élévation $\\widehat{O}$ mesure $39{,}5°$.\na) Calculer la hauteur $PS$ de la tour, au dixième de mètre. La hauteur officielle est de $330$ m : la mesure est-elle bonne ?\nb) À quelle distance $SO$ du sommet est-elle, au mètre ?\nc) Un camarade calcule $400 \\times \\sin 39{,}5°$. Qu'a-t-il confondu ?",
          correction:
            "La tour est verticale, le sol horizontal : le triangle $OPS$ est rectangle en $P$. Par rapport à $\\widehat{O}$, $[OP]$ ($400$ m) est l'adjacent, la hauteur $[PS]$ l'opposé, et la ligne de visée $[SO]$ l'hypoténuse.\na) Adjacent connu, opposé cherché : la tangente. $\\tan 39{,}5° = \\dfrac{PS}{400}$, donc $PS = 400 \\times \\tan 39{,}5° \\approx 329{,}7$ m. À $27$ cm près sur $330$ m : la mesure est excellente.\nb) Adjacent connu, hypoténuse cherchée : le cosinus, inconnue en bas. $SO = \\dfrac{400}{\\cos 39{,}5°} \\approx 518$ m.\nc) Il a pris la distance au sol pour l'hypoténuse : $400 \\times \\sin 39{,}5° \\approx 254$ m, une tour trop petite de $76$ m.\n⛔ Le piège : l'hypoténuse prise pour l'adjacent. La distance au SOL touche l'angle et l'angle droit : c'est l'adjacent ; l'hypoténuse est la ligne de visée, en face de l'angle droit.\nRéponse : la tour mesure environ $329{,}7$ m, en accord avec les $330$ m officiels ; le sommet est à environ $518$ m de l'élève.",
          schema: triangle({ A: [0, 0], B: [400, 0], C: [400, 329.7346] }, { noms: { A: "O", B: "P", C: "S" }, cotes: { AB: "adjacent 400 m", BC: "? ≈ 329,7 m", CA: "hypoténuse" }, angles: { A: "39,5°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_calculer_longueur", "trigo_choisir_rapport", "trigo_defi"],
        },
        {
          titre: "L'échelle bien posée",
          enonce:
            "Une échelle de $7$ m est appuyée contre un mur vertical. Pour qu'elle ne glisse pas et ne bascule pas, on recommande un angle d'environ $75°$ avec le sol.\na) À quelle hauteur l'échelle touche-t-elle le mur ? Arrondir au centimètre.\nb) À quelle distance du mur faut-il poser le pied ? Arrondir au centimètre.\nc) Une autre règle dit : « le pied à un quart de la longueur du mur ». Les deux règles sont-elles d'accord ?",
          correction:
            "Le mur est vertical, le sol horizontal : le pied de l'échelle $P$, le bas du mur $M$ et le haut $H$ forment un triangle rectangle en $M$. L'échelle $[HP]$ est l'hypoténuse, $7$ m. Par rapport à $\\widehat{P} = 75°$, le mur $[MH]$ est l'opposé et le sol $[PM]$ l'adjacent.\na) Opposé cherché, hypoténuse connue : le sinus. $MH = 7 \\times \\sin 75° \\approx 6{,}76$ m.\nb) Adjacent cherché, hypoténuse connue : le cosinus. $PM = 7 \\times \\cos 75° \\approx 1{,}81$ m.\nc) Un quart de $7$ m, c'est $7 \\div 4 = 1{,}75$ m. $1{,}81$ m et $1{,}75$ m : à $6$ cm près, les deux règles disent la même chose.\n⭐ Contrôle : $6{,}76 < 7$ et $1{,}81 < 7$, les deux côtés de l'angle droit sont plus courts que l'échelle.\n⛔ Le piège : échanger sinus et cosinus. Le mur est EN FACE de l'angle au sol : c'est l'opposé, donc le sinus.\nRéponse : l'échelle touche le mur à environ $6{,}76$ m, le pied est à environ $1{,}81$ m du mur, et les deux règles concordent.",
          schema: triangle({ A: [0, 0], B: [1.8117, 0], C: [1.8117, 6.7615] }, { noms: { A: "P", B: "M", C: "H" }, cotes: { AB: "? ≈ 1,81 m", BC: "? ≈ 6,76 m", CA: "hyp. 7 m" }, angles: { A: "75°" }, droit: "B" }),
          micros: ["trigo_sinus", "trigo_cosinus", "trigo_calculer_longueur", "trigo_choisir_rapport", "trigo_defi"],
        },
        {
          titre: "La rue la plus pentue du monde",
          enonce:
            "Un panneau routier annonce une descente à $10$ %. Baldwin Street, à Dunedin (Nouvelle-Zélande), a une pente d'environ $35$ %.\na) Quel angle avec l'horizontale correspond à une pente de $10$ % ? Au dixième de degré.\nb) Même question pour $35$ %.\nc) Une voiture parcourt $2$ km sur la route à $10$ %. De combien descend-elle, au mètre ?\nd) Un élève dit : « $10$ %, c'est $10°$ ». A-t-il raison ?",
          correction:
            "Une pente de $10$ % : $10$ m de dénivelé pour $100$ m à l'horizontale. Dénivelé et horizontale forment un angle droit ; par rapport à l'angle de la route, le dénivelé est l'opposé et l'horizontale l'adjacent. La pente est donc une TANGENTE.\na) $\\tan \\alpha = \\dfrac{10}{100} = 0{,}1$, donc $\\alpha = \\tan^{-1}(0{,}1) \\approx 5{,}7°$.\nb) $\\tan \\beta = 0{,}35$, donc $\\beta = \\tan^{-1}(0{,}35) \\approx 19{,}3°$. La rue la plus pentue du monde ne fait même pas $20°$.\nc) Les $2\\,000$ m se mesurent SUR la route : c'est l'hypoténuse. Le dénivelé est l'opposé : le sinus. $2\\,000 \\times \\sin \\alpha \\approx 199$ m, avec la valeur exacte de $\\alpha$ gardée en mémoire.\nd) Non. Un angle de $10°$ donne $\\tan 10° \\approx 0{,}176$, soit une pente de $17{,}6$ % : presque le double.\n⛔ Le piège : confondre le pourcentage de pente et l'angle en degrés. Le pourcentage est une tangente, pas un angle.\nRéponse : $10$ % correspond à environ $5{,}7°$, $35$ % à environ $19{,}3°$ ; la voiture descend d'environ $199$ m.",
          schema: deux(
            triangle({ A: [0, 0], B: [100, 0], C: [100, 10] }, { cotes: { AB: "adjacent 100 m", BC: "10 m", CA: "hypoténuse" }, angles: { A: "≈ 5,7°" }, droit: "B" }),
            triangle({ A: [0, 0], B: [100, 0], C: [100, 35] }, { cotes: { AB: "adjacent 100 m", BC: "35 m", CA: "hypoténuse" }, angles: { A: "≈ 19,3°" }, droit: "B" }),
          ),
          micros: ["trigo_tangente", "trigo_calculer_angle", "trigo_sinus", "trigo_defi"],
        },
        {
          titre: "La descente de l'avion",
          enonce:
            "Pour atterrir, un avion de ligne descend en ligne droite vers le point de toucher $T$ de la piste, en suivant une pente de $3°$ avec l'horizontale. On note $A$ l'avion et $B$ le point du sol à sa verticale. L'avion vole à $900$ m d'altitude.\na) À quelle distance horizontale $TB$ de la piste est-il ? Au dixième de kilomètre.\nb) Quelle altitude devrait-il avoir à $5$ km de la piste, à l'horizontale ? Au mètre.\nc) Calculer la longueur $AT$ du trajet de descente au mètre, et la comparer à $TB$.",
          correction:
            "Le triangle $TBA$ est rectangle en $B$ : l'altitude est verticale, le sol horizontal. Par rapport à $\\widehat{T} = 3°$, l'altitude $[BA]$ est l'opposé, la distance au sol $[TB]$ l'adjacent, le trajet $[AT]$ l'hypoténuse.\na) Opposé connu, adjacent cherché : la tangente, inconnue en bas. $TB = \\dfrac{900}{\\tan 3°} \\approx 17\\,173$ m, soit environ $17{,}2$ km.\nb) Adjacent connu ($5\\,000$ m), opposé cherché : $5\\,000 \\times \\tan 3° \\approx 262$ m.\nc) Opposé connu, hypoténuse cherchée : le sinus. $AT = \\dfrac{900}{\\sin 3°} \\approx 17\\,197$ m. C'est seulement $24$ m de plus que $TB$ : avec un angle aussi petit, l'hypoténuse et l'adjacent sont presque égaux.\n⛔ Le piège : prendre le trajet pour la distance au sol. Ici l'écart est petit, mais le raisonnement serait faux : on garde le bon côté, et le bon rapport.\nRéponse : l'avion est à environ $17{,}2$ km de la piste ; à $5$ km, il devrait voler à environ $262$ m ; il parcourt environ $17\\,197$ m avant de toucher le sol.",
          schema: triangle({ A: [0, 0], B: [17173.023, 0], C: [17173.023, 900] }, { noms: { A: "T", B: "B", C: "A" }, cotes: { AB: "adjacent ? ≈ 17 173 m", BC: "900 m", CA: "hypoténuse" }, angles: { A: "3°" }, droit: "B" }),
          micros: ["trigo_tangente", "trigo_sinus", "trigo_calculer_longueur", "trigo_defi"],
        },
      ],
    },
  ],
};
