// ─── Fiche d'exercices : le cosinus (4e) — 20 exercices corrigés ─────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-cosinus.tsx` et sur les
// six micros du coach de 4e (notionId trigo_cosinus). ⛔ En 4e, SEUL le
// cosinus : ni sinus, ni tangente, ni « CAH-SOH-TOA ». Le troisième côté du
// triangle n'est jamais nommé « opposé » : quand il faut sa longueur, c'est le
// théorème de Pythagore (au programme de 4e) qui la donne.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le triangle 6-8-10 et
// son cosinus 0,8, ni l'angle de 37°, ni cos 60° = 0,5, ni l'échelle de 10 m, ni
// la route à 12° sur 800 m, ni le cosinus de 1,25. ⛔ Ni ceux de la feuille de
// trigonométrie de 3e (tour Eiffel, échelle, cerf-volant, Baldwin Street, avion,
// rampe, 52° et 8 cm, 24-7-25, 5,6 ÷ 8 = 0,7, 9 ÷ 12 = 0,75…).
//
// ⛔ LE BUG CONNU DE CETTE NOTION : `AC` et `CA` mêlés. Comme en 3e, chaque
// triangle a l'angle étudié en A (clé du canvas), l'angle droit en B :
// l'ADJACENT est toujours la clé AB, l'HYPOTÉNUSE la clé CA — et le texte nomme
// les segments dans l'ORDRE DES CLÉS (clé CA avec noms M…P → « $[PM]$ »).
// Seule exception voulue : le second dessin des exercices 1 et 12, où l'angle
// étudié passe en C pour montrer que l'adjacent CHANGE de côté.
// Le script de recalcul relit chaque figure et vérifie que le mot écrit sur un
// côté (« adjacent », « hypoténuse ») est le bon PAR RAPPORT À L'ANGLE MARQUÉ.
//
// Les pièges nommés : l'hypoténuse prise pour l'adjacent parce qu'elle touche
// aussi l'angle (1, 9), l'adjacent gardé quand on change d'angle (2), le
// quotient renversé, plus grand que 1 (3), la calculatrice en radians (4),
// multiplier quand l'inconnue est en bas (5, 18), la parenthèse oubliée après
// cos⁻¹ (6), la touche cos au lieu de cos⁻¹ (7), l'angle et son cosinus crus
// proportionnels (8), le cosinus arrondi trop tôt (10), le quotient arrondi
// trop tôt (11), la racine carrée oubliée dans Pythagore (12), diviser au lieu
// de multiplier (13), la longueur du panneau prise pour son emprise (14),
// l'angle avec la verticale donné pour l'angle avec le sol (15), partir de
// l'angle droit (16), le dénivelé pris pour l'adjacent (17), le rayon de la
// Terre pris pour celui du cercle de Paris (19), la dérive calculée par une
// soustraction (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - funiculaire de Montmartre : voie de 108 m pour 36 m de dénivelé (RATP,
//   fiche du funiculaire de Montmartre) — ex. 17 ;
// - Terre : rayon moyen de 6 371 km (UGGI / IUGG, rayon moyen R1) ; Paris à
//   48°51′ de latitude Nord (IGN), arrondie à 49° — ex. 19 ; la rotation en
//   24 h est le jour solaire (le jour sidéral fait 23 h 56 min) ;
// - panneau solaire : inclinaison conseillée d'environ 30°, plein sud, en France
//   métropolitaine (ADEME, guide « Installer des panneaux solaires
//   photovoltaïques ») ; le panneau de 1,7 m est la taille courante d'un module
//   résidentiel — ex. 14 ;
// - voilier : un voilier de croisière remonte au mieux à 40-45° du vent (ordre
//   de grandeur des manuels de voile) — ex. 18 ;
// - le télésiège (1 200 m à 22°), le toboggan (4,5 m) et la rivière de 45 m
//   sont IMAGINÉS, à l'ordre de grandeur réel — ex. 13, 15 et 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés. Dix-neuf ont leur triangle, avec ses VRAIES coordonnées — un angle
// de 41° est dessiné à 41° —, l'angle droit marqué, l'angle étudié écrit, les
// côtés nommés adjacent / hypoténuse par rapport à CET angle, le côté cherché
// « ? » suivi de sa valeur. Les triangles « d'école » sont TOURNÉS (aucun côté
// vertical), ceux du monde gardent leur verticale. Le vingtième (ex. 8) est un
// quart de cercle de rayon 1 en SVG local : le cosinus y est l'OMBRE de
// l'hypoténuse sur le sol, et on la voit raccourcir quand l'angle s'ouvre.
//
// Les corrigés sont écrits à la première personne (« je me place en »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cosinus-4e.mjs`.
//
// Micro-compétences : cos_cotes (1, 2, 9, 12, 16), cos_definition (2, 3, 8),
// cos_calculer_longueur (4, 5, 9, 10, 13, 14, 18, 19, 20), cos_calculer_angle
// (6, 7, 11, 12, 15, 16, 17, 20), cos_probleme (13, 14, 15, 17, 18, 19, 20),
// cos_defi (12, 17, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { triangle } from "@/lib/fiches-exercices/figures";

/** Deux triangles côte à côte (exercices 1 et 12) : l'un sous l'autre sur
 *  téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/**
 * Un QUART DE CERCLE de rayon 1 (exercice 8) : pour chaque angle, le rayon est
 * l'hypoténuse (longueur 1) et son ombre sur le sol est le côté adjacent — donc
 * le cosinus lui-même. Les positions sont CALCULÉES à partir des angles ; les
 * valeurs écrites sous l'axe sont données en clair, et le script de recalcul
 * vérifie qu'elles sont les bons arrondis.
 * Lisibilité : viewBox de 260, police 13, dessin d'au moins 235 px de large au
 * téléphone → 11,75 px effectifs.
 */
const quartDeCercle = (rayons: [number, string][]) => {
  const ox = 40, oy = 180, R = 160;
  const couleurs = ["#2563eb", "#dc2626", "#059669"];
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox="0 0 260 210" className="h-auto w-full" role="img" aria-label="Quart de cercle de rayon 1 : le cosinus est l'ombre du rayon sur le sol">
        <path d={`M ${ox + R} ${oy} A ${R} ${R} 0 0 0 ${ox} ${oy - R}`} fill="none" stroke="#94a3b8" strokeDasharray="4 4" />
        <line x1={ox - 10} y1={oy} x2={ox + R + 30} y2={oy} stroke="#334155" strokeWidth={1.5} />
        <text x={ox} y={oy + 20} fontSize={13} textAnchor="middle" fill="#334155">0</text>
        <text x={ox + R + 8} y={oy - 6} fontSize={13} fill="#334155">1</text>
        {rayons.map(([a, cos], i) => {
          const x = ox + R * Math.cos((a * Math.PI) / 180);
          const y = oy - R * Math.sin((a * Math.PI) / 180);
          const c = couleurs[i % couleurs.length];
          return (
            <g key={a}>
              <line x1={ox} y1={oy} x2={x} y2={y} stroke={c} strokeWidth={2} />
              <line x1={x} y1={y} x2={x} y2={oy} stroke={c} strokeDasharray="3 3" />
              <circle cx={x} cy={oy} r={3} fill={c} />
              <text x={x + 5} y={y - 4} fontSize={13} fontWeight={700} fill={c}>{`${a}°`}</text>
              <text x={x} y={oy + 20} fontSize={13} fontWeight={700} textAnchor="middle" fill={c}>{cos}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesCosinus4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "trigo-cosinus",
  titre: "Le cosinus dans le triangle rectangle",
  accroche:
    "Vingt exercices, du geste seul au problème : repérer l'hypoténuse et le côté adjacent, écrire le cosinus, calculer une longueur, puis un angle avec la touche cos⁻¹. Un télésiège, des panneaux solaires, le funiculaire de Montmartre, un voilier qui remonte au vent, la vitesse de Paris autour de l'axe de la Terre, une traversée à la nage. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le triangle dessiné à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/trigo-cosinus", titre: "Le cosinus d'un angle aigu" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je repère l'angle droit, puis je me place sur l'angle aigu étudié, avant d'écrire quoi que ce soit.",
      rappel: [
        "Dans un triangle rectangle, l'HYPOTÉNUSE est le côté en face de l'angle droit. Le côté ADJACENT à un angle aigu est celui qui touche cet angle sans être l'hypoténuse.",
        "Le cosinus d'un angle aigu : cos = adjacent ÷ hypoténuse. C'est un nombre sans unité, toujours entre 0 et 1.",
        "Un angle connu, une longueur cherchée : la touche cos. Deux longueurs connues, l'angle cherché : la touche cos⁻¹.",
        "La calculatrice doit être en DEGRÉS : un « D » ou « DEG » affiché à l'écran.",
      ],
      exercices: [
        {
          enonce:
            "Le triangle $MNP$ est rectangle en $N$.\na) Nommer son hypoténuse.\nb) Nommer le côté adjacent à l'angle $\\widehat{M}$.\nc) Nommer le côté adjacent à l'angle $\\widehat{P}$.\nd) Le côté $[MN]$ est-il adjacent à $\\widehat{P}$ ?",
          correction:
            "Je repère d'abord l'angle droit : il est en $N$.\na) L'hypoténuse est le côté en face de l'angle droit, le seul qui ne touche pas $N$ : l'hypoténuse est $[PM]$.\nb) Je me place en $M$. Deux côtés touchent $M$ : $[PM]$ et $[MN]$. $[PM]$ est déjà l'hypoténuse, donc le côté adjacent est $[MN]$.\nc) Je me place en $P$. Les deux côtés qui touchent $P$ sont $[PM]$, l'hypoténuse, et $[NP]$ : le côté adjacent à $\\widehat{P}$ est $[NP]$.\nd) Non : $[MN]$ ne touche pas $P$. Il est adjacent à $\\widehat{M}$ seulement.\n⛔ Le piège : prendre l'hypoténuse pour le côté adjacent, parce qu'elle touche AUSSI l'angle. Elle touche les deux angles aigus et n'est adjacente à aucun : l'adjacent, c'est l'AUTRE côté qui touche l'angle.\nRéponse : hypoténuse $[PM]$ ; adjacent à $\\widehat{M}$ : $[MN]$ ; adjacent à $\\widehat{P}$ : $[NP]$.",
          schema: deux(
            triangle({ A: [0, 0], B: [4.7553, 1.5451], C: [3.1059, 6.6214] }, { noms: { A: "M", B: "N", C: "P" }, cotes: { AB: "adjacent à M", CA: "hypoténuse" }, angles: { A: "M" }, droit: "B" }),
            triangle({ A: [0, 0], B: [4.7553, 1.5451], C: [3.1059, 6.6214] }, { noms: { A: "M", B: "N", C: "P" }, cotes: { BC: "adjacent à P", CA: "hypoténuse" }, angles: { C: "P" }, droit: "B" }),
          ),
          micros: ["cos_cotes"],
        },
        {
          enonce:
            "Le triangle $RST$ est rectangle en $S$, avec $RS = 12$ cm, $ST = 5$ cm et $TR = 13$ cm.\na) Écrire $\\cos \\widehat{R}$ avec les noms des côtés, puis donner sa valeur au centième.\nb) Même travail pour $\\cos \\widehat{T}$.",
          correction:
            "L'angle droit est en $S$ : l'hypoténuse est $[TR]$, $13$ cm.\na) Je me place en $R$ : le côté adjacent est $[RS]$.\n$\\cos \\widehat{R} = \\dfrac{RS}{TR} = \\dfrac{12}{13} \\approx 0{,}92$.\nb) Je me place en $T$ : l'adjacent change de côté, c'est maintenant $[ST]$.\n$\\cos \\widehat{T} = \\dfrac{ST}{TR} = \\dfrac{5}{13} \\approx 0{,}38$.\n⭐ Contrôle : les deux cosinus sont entre $0$ et $1$, et l'hypoténuse reste en bas dans les deux quotients.\n⛔ Le piège : garder l'adjacent de $\\widehat{R}$ pour calculer $\\cos \\widehat{T}$, et retrouver $0{,}92$. L'adjacent est une PLACE par rapport à l'angle : il bouge quand l'angle bouge.\nRéponse : $\\cos \\widehat{R} \\approx 0{,}92$ et $\\cos \\widehat{T} \\approx 0{,}38$.",
          schema: triangle({ A: [0, 0], B: [11.2763, 4.1042], C: [9.5662, 8.8027] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "adjacent 12 cm", BC: "5 cm", CA: "hyp. 13 cm" }, angles: { A: "R" }, droit: "B" }),
          micros: ["cos_cotes", "cos_definition"],
        },
        {
          enonce:
            "Le triangle $EFG$ est rectangle en $F$, avec $EF = 15$ cm, $FG = 8$ cm et $GE = 17$ cm. Un élève écrit : « $\\cos \\widehat{E} = \\dfrac{17}{15} \\approx 1{,}13$ ».\na) Sans rien recalculer, pourquoi est-ce forcément faux ?\nb) Écrire le bon quotient et donner $\\cos \\widehat{E}$ au centième.",
          correction:
            "a) L'hypoténuse est le plus long côté d'un triangle rectangle. Le côté adjacent est plus court qu'elle, donc le quotient adjacent sur hypoténuse est plus PETIT que $1$. Un cosinus de $1{,}13$ est impossible.\nb) L'angle droit est en $F$ : l'hypoténuse est $[GE]$, $17$ cm. Je me place en $E$ : le côté adjacent est $[EF]$, $15$ cm.\n$\\cos \\widehat{E} = \\dfrac{EF}{GE} = \\dfrac{15}{17} \\approx 0{,}88$.\n⛔ Le piège : renverser le quotient. L'adjacent est EN HAUT, l'hypoténuse EN BAS ; un résultat plus grand que $1$ est le signal qu'on les a échangés.\nRéponse : $\\cos \\widehat{E} \\approx 0{,}88$.",
          schema: triangle({ A: [0, 0], B: [14.3446, 4.3856], C: [12.0056, 12.036] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "adjacent 15 cm", BC: "8 cm", CA: "hyp. 17 cm" }, angles: { A: "E" }, droit: "B" }),
          micros: ["cos_definition"],
        },
        {
          enonce: "Le triangle $KLM$ est rectangle en $L$, avec $\\widehat{K} = 41°$ et $MK = 12$ cm. Calculer $KL$, arrondi au dixième.",
          correction:
            "L'angle droit est en $L$ : l'hypoténuse est $[MK]$, $12$ cm. Je me place en $K$ : le côté adjacent est $[KL]$.\nDans le triangle $KLM$ rectangle en $L$ : $\\cos \\widehat{K} = \\dfrac{KL}{MK}$, donc $\\cos 41° = \\dfrac{KL}{12}$.\nL'inconnue est EN HAUT : je multiplie les deux membres par $12$. $KL = 12 \\times \\cos 41° \\approx 9{,}1$ cm (la calculatrice affiche $9{,}056\\ldots$).\n⭐ Contrôle : $9{,}1 < 12$, l'adjacent est plus court que l'hypoténuse.\n⛔ Le piège : la calculatrice réglée en radians. Elle affiche $12 \\times \\cos 41 \\approx -11{,}85$ : une longueur NÉGATIVE. Je vérifie le « D » ou « DEG » à l'écran avant de calculer.\nRéponse : $KL \\approx 9{,}1$ cm.",
          schema: triangle({ A: [0, 0], B: [8.7479, 2.344], C: [6.7103, 9.9485] }, { noms: { A: "K", B: "L", C: "M" }, cotes: { AB: "adj. ? ≈ 9,1 cm", CA: "hyp. 12 cm" }, angles: { A: "41°" }, droit: "B" }),
          micros: ["cos_calculer_longueur"],
        },
        {
          enonce: "Le triangle $DEF$ est rectangle en $E$, avec $\\widehat{D} = 28°$ et $DE = 7{,}5$ cm. Calculer l'hypoténuse $FD$, arrondie au dixième.",
          correction:
            "L'angle droit est en $E$ : l'hypoténuse est $[FD]$. Je me place en $D$ : le côté adjacent est $[DE]$, $7{,}5$ cm.\n$\\cos \\widehat{D} = \\dfrac{DE}{FD}$, donc $\\cos 28° = \\dfrac{7{,}5}{FD}$.\nCette fois, l'inconnue est EN BAS. Je multiplie par $FD$ : $FD \\times \\cos 28° = 7{,}5$, puis je divise par $\\cos 28°$ : $FD = \\dfrac{7{,}5}{\\cos 28°} \\approx 8{,}5$ cm (la calculatrice affiche $8{,}494\\ldots$).\n⭐ Contrôle : $8{,}5 > 7{,}5$, l'hypoténuse est bien le plus long côté.\n⛔ Le piège : multiplier par habitude, $7{,}5 \\times \\cos 28° \\approx 6{,}6$ cm. Une hypoténuse plus courte que l'adjacent, c'est impossible.\nRéponse : $FD \\approx 8{,}5$ cm.",
          schema: triangle({ A: [0, 0], B: [6.8516, 3.0505], C: [5.2296, 6.6936] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "adjacent 7,5 cm", CA: "hyp. ? ≈ 8,5 cm" }, angles: { A: "28°" }, droit: "B" }),
          micros: ["cos_calculer_longueur"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $B$, avec $AB = 5{,}2$ cm et $CA = 8$ cm. Calculer l'angle $\\widehat{A}$, arrondi au dixième de degré.",
          correction:
            "L'angle droit est en $B$ : l'hypoténuse est $[CA]$, $8$ cm. Je me place en $A$ : le côté adjacent est $[AB]$, $5{,}2$ cm.\n$\\cos \\widehat{A} = \\dfrac{AB}{CA} = \\dfrac{5{,}2}{8} = 0{,}65$.\nJe connais le cosinus, je cherche l'angle : la touche $\\cos^{-1}$ fait le chemin inverse (parfois « Arccos », ou « seconde » puis « cos »).\n$\\widehat{A} = \\cos^{-1}(0{,}65) \\approx 49{,}5°$.\n⭐ Contrôle : $49{,}5°$ est bien un angle aigu.\n⛔ Le piège : oublier la parenthèse. En tapant $\\cos^{-1} 5{,}2 \\div 8$, la calculatrice calcule d'abord $\\cos^{-1}(5{,}2)$ et affiche « Erreur » : aucun angle n'a un cosinus plus grand que $1$. J'écris $\\cos^{-1}(5{,}2 \\div 8)$.\nRéponse : $\\widehat{A} \\approx 49{,}5°$.",
          schema: triangle({ A: [0, 0], B: [4.8864, 1.7785], C: [2.8071, 7.4913] }, { cotes: { AB: "adjacent 5,2 cm", CA: "hyp. 8 cm" }, angles: { A: "? ≈ 49,5°" }, droit: "B" }),
          micros: ["cos_calculer_angle"],
        },
        {
          enonce: "Le triangle $PQR$ est rectangle en $Q$, avec $PQ = 6{,}6$ cm et $RP = 11$ cm. Calculer l'angle $\\widehat{P}$, arrondi au dixième de degré.",
          correction:
            "L'angle droit est en $Q$ : l'hypoténuse est $[RP]$, $11$ cm. Je me place en $P$ : le côté adjacent est $[PQ]$, $6{,}6$ cm.\n$\\cos \\widehat{P} = \\dfrac{PQ}{RP} = \\dfrac{6{,}6}{11} = 0{,}6$.\n$\\widehat{P} = \\cos^{-1}(0{,}6) \\approx 53{,}1°$.\n⭐ Contrôle : je repars de l'angle, $\\cos 53{,}1° \\approx 0{,}60$ : la boucle est bouclée.\n⛔ Le piège : appuyer sur $\\cos$ au lieu de $\\cos^{-1}$. La calculatrice affiche $\\cos(0{,}6) \\approx 0{,}9999$ : c'est le cosinus d'un angle de $0{,}6°$, pas un angle. La touche $\\cos$ va de l'angle vers le nombre, la touche $\\cos^{-1}$ du nombre vers l'angle.\nRéponse : $\\widehat{P} \\approx 53{,}1°$.",
          schema: triangle({ A: [0, 0], B: [6.3443, 1.8192], C: [3.9187, 10.2783] }, { noms: { A: "P", B: "Q", C: "R" }, cotes: { AB: "adjacent 6,6 cm", CA: "hyp. 11 cm" }, angles: { A: "? ≈ 53,1°" }, droit: "B" }),
          micros: ["cos_calculer_angle"],
        },
        {
          enonce:
            "a) Avec la calculatrice, donner au centième $\\cos 25°$, $\\cos 50°$ et $\\cos 75°$.\nb) Quand l'angle double, de $25°$ à $50°$, le cosinus est-il divisé par deux ?\nc) Sans calculatrice, ranger $\\cos 10°$, $\\cos 40°$ et $\\cos 80°$ dans l'ordre croissant.",
          correction:
            "a) $\\cos 25° \\approx 0{,}91$, $\\cos 50° \\approx 0{,}64$ et $\\cos 75° \\approx 0{,}26$.\nJe le VOIS sur le dessin : chaque rayon du quart de cercle est l'hypoténuse d'un triangle rectangle, de longueur $1$. Son ombre sur le sol est le côté adjacent, et le cosinus vaut exactement cette ombre, puisque diviser par $1$ ne change rien.\nb) Non. La moitié de $0{,}91$, c'est environ $0{,}45$, alors que $\\cos 50° \\approx 0{,}64$. Le cosinus diminue quand l'angle grandit, mais il n'est pas proportionnel à l'angle.\nc) Plus l'angle s'ouvre, plus le rayon se relève et plus son ombre raccourcit : le cosinus DIMINUE. Donc $\\cos 80° < \\cos 40° < \\cos 10°$.\n⛔ Le piège : croire que l'angle et son cosinus sont proportionnels, « deux fois plus d'angle, deux fois moins de cosinus ». Le dessin le dément : les ombres ne raccourcissent pas au même rythme.\nRéponse : $0{,}91$, $0{,}64$ et $0{,}26$ ; non ; $\\cos 80° < \\cos 40° < \\cos 10°$.",
          schema: quartDeCercle([[25, "0,91"], [50, "0,64"], [75, "0,26"]]),
          micros: ["cos_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Rédiger comme en devoir : le triangle rectangle, l'égalité du cosinus avec les noms des côtés, le calcul, l'arrondi, le contrôle.",
      rappel: [
        "La phrase d'ouverture : « Dans le triangle … rectangle en …, cos … = adjacent ÷ hypoténuse », avec les NOMS des côtés.",
        "Inconnue en haut du quotient (l'adjacent) : je multiplie. Inconnue en bas (l'hypoténuse) : je divise.",
        "Je garde la valeur de la calculatrice jusqu'au bout, et j'arrondis à la FIN seulement.",
        "Contrôle : l'adjacent est plus court que l'hypoténuse, et l'angle trouvé est aigu.",
      ],
      exercices: [
        {
          enonce:
            "Le triangle $JKL$ est rectangle en $K$, avec $\\widehat{J} = 33°$ et $LJ = 9{,}4$ cm.\na) Calculer $JK$ au dixième, en rédigeant.\nb) Calculer $KL$ au dixième avec le théorème de Pythagore.",
          correction:
            "a) Dans le triangle $JKL$ rectangle en $K$, l'hypoténuse est $[LJ]$. Je me place en $J$ : le côté adjacent est $[JK]$.\n$\\cos \\widehat{J} = \\dfrac{JK}{LJ}$, donc $\\cos 33° = \\dfrac{JK}{9{,}4}$ et $JK = 9{,}4 \\times \\cos 33° \\approx 7{,}9$ cm.\nb) Le théorème de Pythagore dans le même triangle : $LJ^2 = JK^2 + KL^2$, donc $KL^2 = LJ^2 - JK^2$.\nAvec la valeur de $JK$ gardée en mémoire : $KL = \\sqrt{9{,}4^2 - JK^2} \\approx 5{,}1$ cm.\n⭐ Contrôle : $7{,}9$ et $5{,}1$ sont bien plus courts que $9{,}4$.\n⛔ Le piège : prendre $9{,}4$ cm pour l'adjacent, parce que $[LJ]$ touche aussi $J$, et calculer $9{,}4 \\div \\cos 33° \\approx 11{,}2$ cm. Un côté plus long que l'hypoténuse : impossible.\nRéponse : $JK \\approx 7{,}9$ cm et $KL \\approx 5{,}1$ cm.",
          schema: triangle({ A: [0, 0], B: [7.3599, 2.8252], C: [5.5252, 7.6048] }, { noms: { A: "J", B: "K", C: "L" }, cotes: { AB: "adj. ? ≈ 7,9 cm", BC: "? ≈ 5,1 cm", CA: "hyp. 9,4 cm" }, angles: { A: "33°" }, droit: "B" }),
          micros: ["cos_cotes", "cos_calculer_longueur"],
        },
        {
          enonce: "Le triangle $GHI$ est rectangle en $H$, avec $\\widehat{I} = 57°$ et $IH = 4{,}6$ cm. Calculer $GI$ au dixième, en rédigeant.",
          correction:
            "Je me place en $I$, l'angle connu. L'angle droit est en $H$ : l'hypoténuse est $[GI]$. Le côté adjacent est $[IH]$, $4{,}6$ cm.\nDans le triangle $GHI$ rectangle en $H$ : $\\cos \\widehat{I} = \\dfrac{IH}{GI}$, donc $\\cos 57° = \\dfrac{4{,}6}{GI}$.\nL'inconnue est en BAS : $GI = \\dfrac{4{,}6}{\\cos 57°} \\approx 8{,}4$ cm (la calculatrice affiche $8{,}445\\ldots$).\n⭐ Contrôle : $8{,}4 > 4{,}6$, l'hypoténuse est la plus longue.\n⛔ Le piège : arrondir le cosinus trop tôt. $\\cos 57° \\approx 0{,}5446$ ; arrondi à $0{,}5$, il donne $4{,}6 \\div 0{,}5 = 9{,}2$ cm, presque un centimètre de trop. Je tape tout le calcul d'un coup, et j'arrondis à la FIN.\nRéponse : $GI \\approx 8{,}4$ cm.",
          schema: triangle({ A: [0, 0], B: [4.4995, 0.9564], C: [3.0268, 7.885] }, { noms: { A: "I", B: "H", C: "G" }, cotes: { AB: "adjacent 4,6 cm", CA: "hyp. ≈ 8,4 cm" }, angles: { A: "57°" }, droit: "B" }),
          micros: ["cos_calculer_longueur"],
        },
        {
          enonce: "Le triangle $VWX$ est rectangle en $W$, avec $VW = 6{,}1$ cm et $XV = 7{,}4$ cm. Calculer l'angle $\\widehat{V}$ au dixième de degré, en rédigeant.",
          correction:
            "L'angle droit est en $W$ : l'hypoténuse est $[XV]$. Je me place en $V$ : le côté adjacent est $[VW]$.\nDans le triangle $VWX$ rectangle en $W$ : $\\cos \\widehat{V} = \\dfrac{VW}{XV} = \\dfrac{6{,}1}{7{,}4}$.\n$\\widehat{V} = \\cos^{-1}\\left(\\dfrac{6{,}1}{7{,}4}\\right) \\approx 34{,}5°$. Je tape la division DANS la parenthèse, sans l'arrondir.\n⛔ Le piège : arrondir le quotient d'abord. $6{,}1 \\div 7{,}4 = 0{,}8243\\ldots$ ; coupé à $0{,}82$, il donne $\\cos^{-1}(0{,}82) \\approx 34{,}9°$ : le dixième demandé est faux.\nRéponse : $\\widehat{V} \\approx 34{,}5°$.",
          schema: triangle({ A: [0, 0], B: [5.6558, 2.2851], C: [4.0865, 6.1693] }, { noms: { A: "V", B: "W", C: "X" }, cotes: { AB: "adjacent 6,1 cm", CA: "hyp. 7,4 cm" }, angles: { A: "? ≈ 34,5°" }, droit: "B" }),
          micros: ["cos_calculer_angle"],
        },
        {
          enonce:
            "Le triangle $ABC$ est rectangle en $B$, avec $AB = 7$ cm et $BC = 2{,}4$ cm.\na) Calculer l'hypoténuse $CA$ avec le théorème de Pythagore.\nb) Calculer $\\widehat{A}$ au dixième de degré.\nc) Calculer $\\widehat{C}$ au dixième de degré, avec le cosinus.\nd) Contrôler avec la somme des angles du triangle.",
          correction:
            "a) Dans le triangle $ABC$ rectangle en $B$, le théorème de Pythagore donne $CA^2 = AB^2 + BC^2 = 49 + 5{,}76 = 54{,}76$, donc $CA = \\sqrt{54{,}76} = 7{,}4$ cm.\nb) L'hypoténuse est $[CA]$. Je me place en $A$ : le côté adjacent est $[AB]$. $\\cos \\widehat{A} = \\dfrac{7}{7{,}4}$, donc $\\widehat{A} = \\cos^{-1}\\left(\\dfrac{7}{7{,}4}\\right) \\approx 18{,}9°$.\nc) Je me place en $C$ : l'adjacent devient $[BC]$. $\\cos \\widehat{C} = \\dfrac{2{,}4}{7{,}4}$, donc $\\widehat{C} = \\cos^{-1}\\left(\\dfrac{2{,}4}{7{,}4}\\right) \\approx 71{,}1°$.\nd) $18{,}9° + 71{,}1° = 90°$, et avec l'angle droit on retrouve les $180°$ du triangle.\n⛔ Le piège : oublier la racine carrée et prendre $54{,}76$ pour l'hypoténuse. On trouverait $\\cos \\widehat{A} = \\dfrac{7}{54{,}76} \\approx 0{,}13$ et un angle de $82{,}7°$, en face du plus petit côté : absurde.\nRéponse : $CA = 7{,}4$ cm, $\\widehat{A} \\approx 18{,}9°$ et $\\widehat{C} \\approx 71{,}1°$.",
          schema: deux(
            triangle({ A: [0, 0], B: [6.3442, 2.9583], C: [5.3299, 5.1335] }, { cotes: { AB: "adjacent 7 cm", BC: "2,4 cm", CA: "hyp. 7,4 cm" }, angles: { A: "≈ 18,9°" }, droit: "B" }),
            triangle({ A: [0, 0], B: [6.3442, 2.9583], C: [5.3299, 5.1335] }, { cotes: { AB: "7 cm", BC: "adj. 2,4 cm", CA: "hyp. 7,4 cm" }, angles: { C: "≈ 71,1°" }, droit: "B" }),
          ),
          micros: ["cos_cotes", "cos_calculer_angle", "cos_defi"],
        },
        {
          enonce:
            "Le câble d'un télésiège monte en ligne droite du départ $D$ à l'arrivée $A$, sur $1\\,200$ m, avec un angle de $22°$ par rapport à l'horizontale. On note $H$ le point à la hauteur de $D$, à la verticale de $A$ : le triangle $DHA$ est rectangle en $H$.\na) Calculer la distance horizontale $DH$, au mètre.\nb) Une carte montre les distances horizontales. Combien de mètres « manque »-t-elle par rapport au câble ?",
          correction:
            "a) Dans le triangle $DHA$ rectangle en $H$, l'hypoténuse est le câble $[AD]$, $1\\,200$ m. Je me place en $D$ : le côté adjacent est $[DH]$, la distance horizontale.\n$\\cos \\widehat{D} = \\dfrac{DH}{AD}$, donc $DH = 1\\,200 \\times \\cos 22° \\approx 1\\,113$ m.\nb) La carte affiche environ $1\\,113$ m, soit $1\\,200 - 1\\,113 = 87$ m de moins que le câble.\n⛔ Le piège : diviser au lieu de multiplier, $1\\,200 \\div \\cos 22° \\approx 1\\,294$ m. La distance au sol serait plus longue que le câble : impossible.\nRéponse : la distance horizontale est d'environ $1\\,113$ m, $87$ m de moins que le câble.",
          schema: triangle({ A: [0, 0], B: [1112.6206, 0], C: [1112.6206, 449.5279] }, { noms: { A: "D", B: "H", C: "A" }, cotes: { AB: "adj. ? ≈ 1 113 m", CA: "hyp. 1 200 m" }, angles: { A: "22°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_longueur"],
        },
        {
          enonce:
            "Un panneau solaire mesure $1{,}7$ m de long. Posé sur un toit plat, il est incliné de $30°$ par rapport à l'horizontale, face au sud. On note $P$ son bord bas, $H$ son bord haut et $S$ le point du toit à la verticale de $H$ : le triangle $PSH$ est rectangle en $S$.\na) Quelle longueur de toit $PS$ le panneau occupe-t-il, au centimètre ?\nb) Le toit mesure $6$ m de profondeur. Combien de rangées de panneaux peut-on poser l'une derrière l'autre, sans compter l'ombre ?",
          correction:
            "a) L'hypoténuse est le panneau $[HP]$, $1{,}7$ m. Je me place en $P$ : le côté adjacent est $[PS]$, posé sur le toit.\nDans le triangle $PSH$ rectangle en $S$ : $\\cos \\widehat{P} = \\dfrac{PS}{HP}$, donc $PS = 1{,}7 \\times \\cos 30° \\approx 1{,}47$ m.\nb) $6 \\div 1{,}47 \\approx 4{,}08$ : $4$ rangées entières tiennent, la cinquième dépasserait.\n⛔ Le piège : diviser $6$ par la longueur du panneau, $6 \\div 1{,}7 \\approx 3{,}53$, et ne poser que $3$ rangées. Incliné, le panneau prend MOINS de place au sol que sa longueur.\nRéponse : chaque panneau occupe environ $1{,}47$ m de toit, et on peut poser $4$ rangées.",
          schema: triangle({ A: [0, 0], B: [1.4722, 0], C: [1.4722, 0.85] }, { noms: { A: "P", B: "S", C: "H" }, cotes: { AB: "adj. ? ≈ 1,47 m", CA: "hyp. 1,7 m" }, angles: { A: "30°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_longueur"],
        },
        {
          enonce:
            "Le toboggan droit d'une aire de jeux mesure $4{,}5$ m de long. Vu du dessus, il avance de $3{,}9$ m. On note $B$ son bas, $H$ son haut et $S$ le point du sol sous $H$ : le triangle $BSH$ est rectangle en $S$. Calculer l'angle $\\widehat{B}$ que fait le toboggan avec le sol, au dixième de degré.",
          correction:
            "L'hypoténuse est le toboggan $[HB]$, $4{,}5$ m. Je me place en $B$ : le côté adjacent est $[BS]$, $3{,}9$ m, la longueur vue du dessus.\nDans le triangle $BSH$ rectangle en $S$ : $\\cos \\widehat{B} = \\dfrac{BS}{HB} = \\dfrac{3{,}9}{4{,}5}$, donc $\\widehat{B} = \\cos^{-1}\\left(\\dfrac{3{,}9}{4{,}5}\\right) \\approx 29{,}9°$.\n⭐ Contrôle : le toboggan avance de $3{,}9$ m pour $4{,}5$ m de long, il est plutôt couché ; un angle de moins de $45°$ avec le sol est cohérent.\n⛔ Le piège : répondre avec l'angle en $H$. Les deux angles aigus font $90°$ ensemble : $90° - 29{,}9° = 60{,}1°$ est l'angle du toboggan avec la VERTICALE, pas avec le sol.\nRéponse : le toboggan fait un angle d'environ $29{,}9°$ avec le sol.",
          schema: triangle({ A: [0, 0], B: [3.9, 0], C: [3.9, 2.245] }, { noms: { A: "B", B: "S", C: "H" }, cotes: { AB: "adj. 3,9 m", CA: "hyp. 4,5 m" }, angles: { A: "? ≈ 29,9°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_angle"],
        },
        {
          enonce:
            "Le triangle $UVW$ est rectangle en $V$, avec $UV = 5{,}5$ cm et $WU = 12{,}5$ cm. Pour trouver un angle, un élève écrit : « $\\cos \\widehat{V} = \\dfrac{UV}{WU} = 0{,}44$ ».\na) Pourquoi cette égalité n'a-t-elle pas de sens ?\nb) De quel angle $0{,}44$ est-il vraiment le cosinus ? Calculer cet angle au dixième de degré.\nc) En déduire l'angle $\\widehat{W}$.",
          correction:
            "a) $\\widehat{V}$ est l'angle DROIT. Le cosinus se calcule pour un angle AIGU du triangle rectangle : en $V$, il n'y a pas d'adjacent à choisir, puisque l'hypoténuse est justement en face de $V$.\nb) L'hypoténuse est $[WU]$. Le côté $[UV]$ touche $U$ sans être l'hypoténuse : c'est le côté adjacent à $\\widehat{U}$. Donc $\\dfrac{UV}{WU} = \\dfrac{5{,}5}{12{,}5} = 0{,}44$ est $\\cos \\widehat{U}$, et $\\widehat{U} = \\cos^{-1}(0{,}44) \\approx 63{,}9°$.\nc) Les trois angles font $180°$, dont $90°$ en $V$ : $\\widehat{W} \\approx 90° - 63{,}9° = 26{,}1°$.\n⛔ Le piège : partir de l'angle droit. Je repère l'angle droit pour trouver l'hypoténuse, puis je me place TOUJOURS sur un angle aigu.\nRéponse : $0{,}44$ est $\\cos \\widehat{U}$ ; $\\widehat{U} \\approx 63{,}9°$ et $\\widehat{W} \\approx 26{,}1°$.",
          schema: triangle({ A: [0, 0], B: [5.4164, 0.9551], C: [3.4672, 12.0095] }, { noms: { A: "U", B: "V", C: "W" }, cotes: { AB: "adjacent 5,5 cm", CA: "hyp. 12,5 cm" }, angles: { A: "? ≈ 63,9°" }, droit: "B" }),
          micros: ["cos_cotes", "cos_calculer_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je trouve le triangle rectangle caché, je le dessine, je repère l'adjacent et l'hypoténuse, puis une phrase de réponse.",
      rappel: [
        "Le triangle rectangle se cache dans le monde : une verticale et une horizontale, la largeur d'une rivière et sa berge, le rayon d'un cercle et son axe.",
        "Le côté adjacent est souvent la distance HORIZONTALE, celle d'une carte ; l'hypoténuse, le trajet réel, en pente.",
        "Si l'adjacent manque, le théorème de Pythagore le donne d'abord.",
      ],
      exercices: [
        {
          titre: "Le funiculaire de Montmartre",
          enonce:
            "Le funiculaire de Montmartre, à Paris, monte en ligne droite de la gare basse $G$ à la gare haute $S$ : la voie mesure $108$ m et le dénivelé est de $36$ m. On note $H$ le point à la hauteur de $G$, à la verticale de $S$ : le triangle $GHS$ est rectangle en $H$.\na) Calculer la distance horizontale $GH$ au dixième de mètre.\nb) En déduire l'angle $\\widehat{G}$ de la voie avec l'horizontale, au dixième de degré.\nc) Un élève calcule $\\cos^{-1}\\left(\\dfrac{36}{108}\\right)$. Quel angle trouve-t-il, et qu'a-t-il confondu ?",
          correction:
            "La voie $[SG]$ est l'hypoténuse, $108$ m ; le dénivelé $[HS]$ mesure $36$ m. Je me place en $G$ : le côté adjacent est $[GH]$, que je ne connais pas encore.\na) Le théorème de Pythagore dans le triangle $GHS$ rectangle en $H$ : $GH^2 = SG^2 - HS^2 = 11\\,664 - 1\\,296 = 10\\,368$, donc $GH = \\sqrt{10\\,368} \\approx 101{,}8$ m.\nb) $\\cos \\widehat{G} = \\dfrac{GH}{SG}$, avec la valeur de $GH$ gardée en mémoire : $\\widehat{G} = \\cos^{-1}\\left(\\dfrac{GH}{108}\\right) \\approx 19{,}5°$.\nc) Il trouve $\\cos^{-1}\\left(\\dfrac{36}{108}\\right) \\approx 70{,}5°$. Mais $[HS]$ ne touche pas $G$ : ce n'est pas l'adjacent de $\\widehat{G}$. Il a calculé l'angle en $S$, celui de la voie avec la verticale. D'ailleurs $19{,}5° + 70{,}5° = 90°$.\n⛔ Le piège : prendre le dénivelé pour l'adjacent. Avec le cosinus, il faut l'adjacent : ici, Pythagore le donne d'abord.\nRéponse : la voie avance d'environ $101{,}8$ m à l'horizontale et monte avec un angle d'environ $19{,}5°$.",
          schema: triangle({ A: [0, 0], B: [101.8234, 0], C: [101.8234, 36] }, { noms: { A: "G", B: "H", C: "S" }, cotes: { AB: "adj. ? ≈ 101,8 m", BC: "36 m", CA: "hyp. 108 m" }, angles: { A: "? ≈ 19,5°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_angle", "cos_defi"],
        },
        {
          titre: "Le voilier qui remonte au vent",
          enonce:
            "Un voilier doit rejoindre une bouée à $12$ milles marins, exactement face au vent. Il ne peut pas avancer droit contre le vent : il remonte au mieux à $45°$ du vent, et fait donc deux bords égaux, en zigzag. Pour le premier bord, on note $D$ le départ, $V$ le point où il vire de bord et $M$ le point de l'axe du vent à la hauteur de $V$ : le triangle $DMV$ est rectangle en $M$, avec $DM = 6$ milles et $\\widehat{D} = 45°$.\na) Calculer la longueur $VD$ du premier bord, au centième de mille.\nb) Quelle distance le voilier parcourt-il en tout ? Combien de fois les $12$ milles en ligne droite ?\nc) Un équipier calcule $6 \\times \\cos 45°$. Pourquoi son résultat est-il forcément faux ?",
          correction:
            "Je me place en $D$. L'hypoténuse est le bord $[VD]$, le trajet réel. Le côté adjacent est $[DM]$, $6$ milles : le chemin gagné face au vent.\na) $\\cos \\widehat{D} = \\dfrac{DM}{VD}$, donc $\\cos 45° = \\dfrac{6}{VD}$. L'inconnue est en bas : $VD = \\dfrac{6}{\\cos 45°} \\approx 8{,}49$ milles.\nb) Deux bords égaux : $2 \\times VD \\approx 16{,}97$ milles. Et $16{,}97 \\div 12 \\approx 1{,}41$ : le voilier parcourt environ $1{,}41$ fois la ligne droite, soit $41$ % de plus.\nc) $6 \\times \\cos 45° \\approx 4{,}24$ milles : un bord plus court que les $6$ milles gagnés face au vent. L'hypoténuse serait plus courte que l'adjacent, c'est impossible.\n⛔ Le piège : multiplier par réflexe. Quand l'inconnue est l'hypoténuse, elle est EN BAS du quotient : je divise.\nRéponse : chaque bord mesure environ $8{,}49$ milles ; le voilier parcourt environ $16{,}97$ milles, $1{,}41$ fois la ligne droite.",
          schema: triangle({ A: [0, 0], B: [6, 0], C: [6, 6] }, { noms: { A: "D", B: "M", C: "V" }, cotes: { AB: "adj. 6 milles", CA: "hyp. ? ≈ 8,49 milles" }, angles: { A: "45°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_longueur"],
        },
        {
          titre: "Paris tourne moins vite que l'équateur",
          enonce:
            "La Terre est une boule de rayon $6\\,371$ km qui fait un tour sur elle-même en $24$ h environ. Paris, en $P$, est à la latitude $49°$ Nord (arrondie). Pendant un tour, Paris décrit un cercle de centre $H$, sur l'axe des pôles. Dans le triangle $PHO$ rectangle en $H$, où $O$ est le centre de la Terre, on a $OP = 6\\,371$ km et $\\widehat{P} = 49°$.\na) Calculer le rayon $PH$ du cercle de Paris, au kilomètre.\nb) Calculer la longueur de ce cercle, au kilomètre.\nc) En déduire la vitesse de Paris autour de l'axe, en km/h, et la comparer à celle d'un point de l'équateur.",
          correction:
            "Je me place en $P$. L'angle droit est en $H$ : l'hypoténuse est $[OP]$, le rayon de la Terre. Le côté adjacent est $[PH]$, le rayon du cercle de Paris.\na) $\\cos \\widehat{P} = \\dfrac{PH}{OP}$, donc $PH = 6\\,371 \\times \\cos 49° \\approx 4\\,180$ km.\nb) La longueur d'un cercle de rayon $r$ est $2 \\times \\pi \\times r$ : $2 \\times \\pi \\times PH \\approx 26\\,262$ km, avec la valeur de $PH$ gardée en mémoire.\nc) Paris fait ce tour en $24$ h : $26\\,262 \\div 24 \\approx 1\\,094$ km/h. À l'équateur, le cercle a pour rayon $6\\,371$ km : $2 \\times \\pi \\times 6\\,371 \\approx 40\\,030$ km, soit environ $1\\,668$ km/h.\n⛔ Le piège : prendre le rayon de la Terre pour celui du cercle de Paris. Plus on monte vers le pôle, plus le cercle rétrécit, et le cosinus mesure ce rétrécissement : $\\cos 49° \\approx 0{,}66$.\nRéponse : le cercle de Paris a un rayon d'environ $4\\,180$ km et une longueur d'environ $26\\,262$ km ; Paris tourne à environ $1\\,094$ km/h, contre $1\\,668$ km/h à l'équateur.",
          schema: triangle({ A: [4179.7521, 4808.2547], B: [0, 4808.2547], C: [0, 0] }, { noms: { A: "P", B: "H", C: "O" }, cotes: { AB: "adj. ? ≈ 4 180 km", CA: "hyp. 6 371 km" }, angles: { A: "49°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_longueur", "cos_defi"],
        },
        {
          titre: "La traversée à la nage",
          enonce:
            "Une nageuse part du point $D$ d'une berge pour traverser une rivière de $45$ m de large. Le point $F$ est juste en face de $D$, sur l'autre berge. Emportée par le courant, elle nage en ligne droite et touche l'autre berge en $P$, après $52$ m : le triangle $DFP$ est rectangle en $F$.\na) Calculer l'angle $\\widehat{D}$ entre son trajet et la direction « tout droit en face », au dixième de degré.\nb) À quelle distance $FP$ du point visé arrive-t-elle ? Au dixième de mètre.\nc) Par une eau plus calme, son trajet ne s'écarte que de $15°$. Quelle distance nage-t-elle alors, au dixième de mètre ?",
          correction:
            "Je me place en $D$. L'angle droit est en $F$ : l'hypoténuse est le trajet $[PD]$, $52$ m. Le côté adjacent est $[DF]$, la largeur de la rivière, $45$ m.\na) $\\cos \\widehat{D} = \\dfrac{DF}{PD} = \\dfrac{45}{52}$, donc $\\widehat{D} = \\cos^{-1}\\left(\\dfrac{45}{52}\\right) \\approx 30{,}1°$.\nb) Le théorème de Pythagore : $FP^2 = PD^2 - DF^2 = 2\\,704 - 2\\,025 = 679$, donc $FP = \\sqrt{679} \\approx 26{,}1$ m.\nc) Le côté adjacent reste la largeur, $45$ m, et le trajet est l'hypoténuse cherchée. L'inconnue est en bas : $\\dfrac{45}{\\cos 15°} \\approx 46{,}6$ m.\n⛔ Le piège : calculer la dérive par une soustraction, $52 - 45 = 7$ m. Les côtés d'un triangle rectangle ne se soustraient pas : c'est Pythagore qui relie les trois.\nRéponse : elle nage avec un angle d'environ $30{,}1°$ et arrive à environ $26{,}1$ m du point visé ; par eau calme, elle nagerait environ $46{,}6$ m.",
          schema: triangle({ A: [0, 0], B: [45, 0], C: [45, 26.0576] }, { noms: { A: "D", B: "F", C: "P" }, cotes: { AB: "adj. 45 m", BC: "≈ 26,1 m", CA: "hyp. 52 m" }, angles: { A: "? ≈ 30,1°" }, droit: "B" }),
          micros: ["cos_probleme", "cos_calculer_angle", "cos_calculer_longueur", "cos_defi"],
        },
      ],
    },
  ],
};
