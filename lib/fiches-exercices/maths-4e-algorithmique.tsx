// ─── Fiche d'exercices : algorithmique et programmation (4e) — 20 exercices corrigés ─
//
// Feuille du 25/09/2026. Alignée sur la fiche de cours
// `lib/fiches/maths-4e-algorithmique.tsx` (« Algorithmique et programmation »)
// et sur les six micros du coach de 4e, notionId algo_programmation. Le niveau
// est celui de la 4e : des blocs façon Scratch écrits en texte (`programme()`),
// des variables (« mettre », « ajouter »), « répéter … fois », « répéter
// jusqu'à », « si … alors … sinon », et le lutin qui trace. ⛔ Pas de bloc
// « définir » (pas de fonctions), pas de « et » / « ou » (c'est la 3e) : des
// conditions SIMPLES, avec >, <, =, ≥ et ≤, comme la fiche de cours.
//
// ⭐ LE VISUEL EST LE PROGRAMME : chaque programme est dans la FIGURE de
// l'énoncé, et CHAQUE corrigé (20/20) a son schéma : la TRACE des variables
// (bloc après bloc ou tour après tour), le programme corrigé avec sa ligne en
// couleur, ou le tracé du lutin dessiné à l'échelle (`lutin()`, SVG local).
// ⛔ Guillemets SIMPLES dans les blocs (`dire 'glace'`), et jamais
// d'apostrophe dans un texte dit (« même prix », pas « c'est pareil ») : le
// script de recalcul exécute ces blocs.
// ⛔ Lignes de 30 signes au plus (`programme()` ne replie pas, 375 px).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni « score 0, trois fois
// ajouter 4 », ni le seuil 10 et « Gagné », ni le bonus 2, ni 3 × x + 2 avec 5,
// ni la note, ni la livraison à 50 €) ; ⛔ ni ceux de la feuille de 3e (volley,
// kayak, glacier, podomètre, hexagone, somme 1 à 10, parc, nombre secret…).
//
// Les pièges nommés : « mettre » pris pour « ajouter » (1), l'échange raté de
// deux variables (2), l'égalité au seuil avec > (3, 6, 7, 12, 19), ≤ qui
// inclut la borne (4), le « si » sans « sinon » cru bloquant (5), ajouter un
// négatif (8), la priorité des opérations (9, 10), les deux branches
// exécutées (11, 15), arrondir 5,4 au lieu de monter à 6 (14), le seuil écrit
// à deux endroits (16), l'ordre des blocs dans la boucle (17), « ≤ 5 » au lieu
// de « < 5 » (18), le double quart de tour à gauche (13, 20).
//
// Les chiffres du monde, et d'où ils viennent :
// - l'eau gèle à 0 °C et bout à 100 °C à la pression normale ; 32 °F et 212 °F
//   (définition de l'échelle Fahrenheit, d'où F = 1,8 × C + 32) — ex. 4 et 9 ;
// - indice UV : l'OMS conseille de se protéger dès l'indice 3 (OMS, « Global
//   Solar UV Index : a practical guide », 2002) — ex. 7 ;
// - Ligue 1 : 3 points la victoire depuis la saison 1994-1995, 1 le nul (LFP) ;
//   18 clubs depuis 2023-2024, donc 34 matchs (20 + 8 + 6) — ex. 10 ;
// - pH : 7 neutre ; jus de citron environ 2 ; océans de surface environ 8,1
//   aujourd'hui contre 8,2 avant l'ère industrielle (NOAA, « Ocean
//   acidification ») — ex. 15 ;
// - chauffage : 19 °C dans les pièces à vivre (Code de l'énergie, art.
//   R241-26) ; 16 à 17 °C dans les chambres la nuit (ADEME, guide « Se chauffer
//   mieux et moins cher ») — ex. 16 ;
// - la piscine, la valise de 12 kg, le manège de 120 cm, le ticket à 2 € et le
//   pass à 30 €, les hirondelles, la gourde : IMAGINÉS pour l'exercice, et dits
//   comme tels dans l'énoncé quand c'est un tarif ou un relevé.
//
// Les corrigés sont écrits à la première personne (« je suis la variable »),
// comme les feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-algorithmique-4e.mjs`
// EXÉCUTE chaque programme avec un petit interprète de blocs écrit en JS, relit
// les traces et les tracés du lutin dans le source et les compare à l'exécution.
//
// Micro-compétences : algo_variable (1, 2, 8, 9, 10, 11, 14, 16, 17, 18),
// algo_condition (3, 4, 6, 12, 15, 17, 19), algo_instruction_conditionnelle
// (4, 5, 11, 15, 19), algo_programme_objectif (6, 9, 10, 13, 14, 16, 18, 19,
// 20), algo_modifier (2, 7, 12, 13, 16, 17, 19, 20), algo_defi (8, 11, 14,
// 17-20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme, trace } from "@/lib/fiches-exercices/figures";

/**
 * Le TRACÉ du lutin, à l'échelle : ses sommets dans l'ordre, en pas, y vers le
 * haut. Rond vert au départ, rond rouge à l'arrivée. Helper local (25/09) :
 * `figures.tsx` n'a pas de tortue.
 * ⭐ Le script de recalcul relit ces sommets et les compare à l'exécution.
 */
const lutin = (sommets: [number, number][], legende: string) => {
  const xs = sommets.map((p) => p[0]);
  const ys = sommets.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const k = 150 / Math.max(x1 - x0, y1 - y0, 1);
  const m = 12;
  const X = (x: number) => m + (x - x0) * k;
  const Y = (y: number) => m + (y1 - y) * k;
  const [dx, dy] = sommets[0];
  const [fx, fy] = sommets[sommets.length - 1];
  return (
    <figure className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
      <svg viewBox={`0 0 ${(x1 - x0) * k + 2 * m} ${(y1 - y0) * k + 2 * m}`} className="w-full" role="img" aria-label={legende}>
        <polyline
          points={sommets.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}
          fill="none"
          stroke="#2563eb"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <circle cx={X(dx)} cy={Y(dy)} r={6} fill="#16a34a" />
        <circle cx={X(fx)} cy={Y(fy)} r={4} fill="#dc2626" />
      </svg>
      <figcaption className="mt-1 text-center text-xs font-semibold text-slate-600">{legende}</figcaption>
    </figure>
  );
};

export const exercicesAlgorithmique4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Vingt exercices façon Scratch, du bloc seul au petit problème, avec un rappel de cours avant chaque niveau. Suis chaque programme au brouillon, bloc par bloc, en notant la valeur des variables, puis ouvre la correction : elle montre la trace du programme et nomme le piège.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/4e/algo-programmation",
      titre: "Algorithmique et programmation",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme court. Tu le suis bloc par bloc, en notant la valeur de chaque variable.",
      rappel: [
        "Une variable est une case qui porte un nom. « mettre a à 5 » ÉCRASE ce qu'elle contenait ; « ajouter 5 à a » part de l'ancienne valeur et lui ajoute $5$.",
        "Une condition est vraie ou fausse. « > » veut dire STRICTEMENT plus grand ; « ≥ » veut dire plus grand OU égal.",
        "« si … alors … sinon » exécute UNE seule branche : celle du « alors » si la condition est vraie, celle du « sinon » si elle est fausse. Puis le programme continue en dessous.",
      ],
      exercices: [
        {
          enonce: "Dans un jeu, la variable billes compte les billes d'un joueur. Que dit le lutin à la fin ?",
          figure: programme(["mettre billes à 20", "ajouter 6 à billes", "mettre billes à 9", "ajouter 6 à billes", "dire billes"]),
          correction:
            "Je suis la variable billes, bloc par bloc.\n« mettre billes à 20 » : billes vaut $20$.\n« ajouter 6 » : $20 + 6 = 26$.\n« mettre billes à 9 » ÉCRASE le $26$ : billes vaut $9$.\n« ajouter 6 » : $9 + 6 = 15$.\nRéponse : le lutin dit $15$.\n⛔ Le piège : tout additionner, $20 + 6 + 9 + 6 = 41$. « mettre à » ne s'ajoute pas : il remplace.",
          schema: trace(["bloc", "billes"], [["mettre à 20", 20], ["+ 6", 26], ["mettre à 9", 9], ["+ 6", 15]]),
          micros: ["algo_variable"],
        },
        {
          enonce: "Un élève veut ÉCHANGER les valeurs de a et de b.\na) Que dit le lutin ?\nb) L'échange a-t-il réussi ? Sinon, corrige le programme.",
          figure: programme(["mettre a à 4", "mettre b à 10", "mettre a à b", "mettre b à a", "dire a", "dire b"]),
          correction:
            "Je note a et b après chaque bloc.\nAprès les deux premiers blocs : a vaut $4$ et b vaut $10$.\n« mettre a à b » : a prend la valeur de b, $10$. Le $4$ est perdu.\n« mettre b à a » : b prend la valeur de a, qui vaut maintenant $10$.\na) Réponse : le lutin dit $10$, puis $10$.\nb) Non : b devait valoir $4$. Je range d'abord a dans une troisième variable c : « mettre c à a », puis « mettre a à b », puis « mettre b à c ». Le lutin dit alors $10$, puis $4$.\n⛔ Le piège : croire que « mettre a à b » échange les deux cases. Il COPIE b dans a, et l'ancien a est effacé.",
          schema: (
            <div className="space-y-2">
              {trace(["bloc", "a", "b"], [["a à 4", 4, "—"], ["b à 10", 4, 10], ["a à b", 10, 10], ["b à a", 10, 10]])}
              {programme(["mettre a à 4", "mettre b à 10", "mettre c à a", "mettre a à b", "mettre b à c", "dire a", "dire b"], 2)}
            </div>
          ),
          micros: ["algo_variable", "algo_modifier"],
        },
        {
          enonce:
            "La variable v vaut $7$. Pour chaque condition, dis si elle est vraie ou fausse.\na) « v > 7 »\nb) « v ≥ 7 »\nc) « v < 9 »\nd) « v = 7 »\ne) « v + 8 > 15 »",
          correction:
            "v vaut $7$ : je remplace v par $7$ dans chaque condition.\na) $7 > 7$ est faux : $7$ n'est pas STRICTEMENT plus grand que $7$.\nb) $7 \\geq 7$ est vrai : « ≥ » accepte l'égalité.\nc) $7 < 9$ est vrai.\nd) $7 = 7$ est vrai.\ne) $7 + 8 = 15$, et $15 > 15$ est faux.\nRéponse : faux, vrai, vrai, vrai, faux.\n⛔ Le piège : l'égalité. Avec « > », la valeur exacte du seuil donne toujours faux.",
          schema: trace(["condition", "avec v = 7"], [["v > 7", "faux"], ["v ≥ 7", "vrai"], ["v < 9", "vrai"], ["v = 7", "vrai"], ["v + 8 > 15", "faux"]]),
          micros: ["algo_condition"],
        },
        {
          enonce: "À la pression normale, l'eau gèle à $0$ °C. Que dit le lutin si on répond $-4$ ? $0$ ? $15$ ?",
          figure: programme(["demander 'Température ?'", "si réponse ≤ 0 alors", "  dire 'glace'", "sinon", "  dire 'eau liquide'"]),
          correction:
            "Le programme teste « réponse ≤ 0 » : la condition est vraie si la réponse est plus petite que $0$ OU égale à $0$.\nAvec $-4$ : $-4 \\leq 0$ est vrai, le lutin dit « glace ».\nAvec $0$ : $0 \\leq 0$ est vrai, le lutin dit « glace ».\nAvec $15$ : $15 \\leq 0$ est faux, seule la branche « sinon » s'exécute : le lutin dit « eau liquide ».\nRéponse : « glace », « glace », « eau liquide ».\n⛔ Le piège : le $0$. « ≤ » inclut l'égalité : à $0$ °C pile, le programme dit « glace ».\n⭐ À $120$ °C, ce programme dirait encore « eau liquide », alors que l'eau bout à $100$ °C : un programme ne sait que ce qu'on lui a écrit.",
          schema: trace(["réponse", "réponse ≤ 0", "le lutin dit"], [["−4", "vrai", "glace"], [0, "vrai", "glace"], [15, "faux", "eau liquide"]]),
          micros: ["algo_condition", "algo_instruction_conditionnelle"],
        },
        {
          enonce: "Une piscine affiche ses tarifs avec ce programme (tarifs choisis pour l'exercice). Quel prix dit-il pour un enfant de $3$ ans ? De $6$ ans ? De $11$ ans ?",
          figure: programme(["mettre prix à 4", "demander 'Âge ?'", "si réponse < 6 alors", "  mettre prix à 2", "dire prix"]),
          correction:
            "Le prix est d'abord mis à $4$. Le bloc du « si » peut le changer, mais seulement si la condition est vraie.\n$3$ ans : $3 < 6$ est vrai, le prix passe à $2$. Le lutin dit $2$.\n$6$ ans : $6 < 6$ est faux. Le bloc du « si » est sauté, le prix reste $4$. Le lutin dit $4$.\n$11$ ans : $11 < 6$ est faux, le prix reste $4$.\nRéponse : $2$ €, $4$ €, $4$ €.\n⛔ Le piège : croire qu'un « si » sans « sinon » arrête tout quand la condition est fausse. Le programme saute seulement le bloc du « si » et continue : « dire prix » s'exécute toujours.",
          schema: trace(["âge", "réponse < 6", "prix (€)"], [[3, "vrai", 2], [6, "faux", 4], [11, "faux", 4]]),
          micros: ["algo_instruction_conditionnelle"],
        },
        {
          enonce:
            "Un manège accepte les personnes qui mesurent AU MOINS $120$ cm. Par quelle condition faut-il remplacer les pointillés : « t > 120 », « t ≥ 120 », « t < 120 » ou « t = 120 » ?",
          figure: programme(["demander 'Taille en cm ?'", "mettre t à réponse", "si ... alors", "  dire 'tu peux monter'", "sinon", "  dire 'trop petit'"]),
          correction:
            "« Au moins $120$ » veut dire $120$ ou plus : $120$ est accepté.\nJe teste aux bornes, avec $119$, $120$ et $121$.\n« t > 120 » refuse $120$ : ce n'est pas elle. « t < 120 » et « t = 120 » refusent $121$ : ce n'est pas elles.\n« t ≥ 120 » refuse $119$, accepte $120$ et $121$.\nRéponse : « si t ≥ 120 alors ».\n⛔ Le piège : écrire « t > 120 ». Un enfant qui mesure $120$ cm pile resterait au bord du manège.",
          schema: (
            <div className="space-y-2">
              {trace(["t", "t ≥ 120", "le lutin dit"], [[119, "faux", "trop petit"], [120, "vrai", "tu peux monter"], [121, "vrai", "tu peux monter"]])}
              {programme(["demander 'Taille en cm ?'", "mettre t à réponse", "si t ≥ 120 alors", "  dire 'tu peux monter'", "sinon", "  dire 'trop petit'"], 2)}
            </div>
          ),
          micros: ["algo_programme_objectif", "algo_condition"],
        },
        {
          enonce:
            "L'OMS conseille de se protéger du soleil dès que l'indice UV atteint $3$. Ce programme n'alerte qu'à partir de $6$.\na) Modifie UN bloc pour suivre le conseil de l'OMS.\nb) Que dit le programme corrigé pour un indice de $2$, de $3$ et de $5$ ?",
          figure: programme(["demander 'Indice UV ?'", "si réponse ≥ 6 alors", "  dire 'protège-toi'", "sinon", "  dire 'risque faible'"]),
          correction:
            "a) Seul le seuil change : je remplace « réponse ≥ 6 » par « réponse ≥ 3 ». Le reste du programme ne bouge pas.\nb) $2 \\geq 3$ est faux : « risque faible ». $3 \\geq 3$ est vrai : « protège-toi ». $5 \\geq 3$ est vrai : « protège-toi ».\nRéponse : « risque faible », « protège-toi », « protège-toi ».\n⭐ Avant la correction, l'indice $5$ donnait « risque faible » : c'est justement le cas que l'OMS veut couvrir.\n⛔ Le piège : écrire « réponse > 3 ». À l'indice $3$, où l'OMS conseille déjà de se protéger, l'alerte ne se déclencherait pas.",
          schema: (
            <div className="space-y-2">
              {programme(["demander 'Indice UV ?'", "si réponse ≥ 3 alors", "  dire 'protège-toi'", "sinon", "  dire 'risque faible'"], 1)}
              {trace(["indice", "avant", "après"], [[2, "risque faible", "risque faible"], [3, "risque faible", "protège-toi"], [5, "risque faible", "protège-toi"]])}
            </div>
          ),
          micros: ["algo_modifier"],
        },
        {
          enonce: "Une gourde contient $50$ cL d'eau. À chaque pause, on en boit $7$ cL. Que dit le lutin après les $4$ pauses ?",
          figure: programme(["mettre gourde à 50", "répéter 4 fois", "  ajouter -7 à gourde", "dire gourde"]),
          correction:
            "« ajouter -7 » enlève $7$ à chaque tour. La gourde part de $50$.\nTour 1 : $50 - 7 = 43$. Tour 2 : $43 - 7 = 36$. Tour 3 : $36 - 7 = 29$. Tour 4 : $29 - 7 = 22$.\nContrôle : on a bu $4 \\times 7 = 28$ cL, et $50 - 28 = 22$.\nRéponse : le lutin dit $22$ : il reste $22$ cL.\n⛔ Le piège : lire « ajouter » et faire des additions, $50 + 28 = 78$ cL, plus que la gourde n'en contenait ! Ajouter un nombre négatif, c'est retirer.",
          schema: trace(["tour", "gourde"], [["départ", 50], [1, 43], [2, 36], [3, 29], [4, 22]]),
          micros: ["algo_variable", "algo_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions qui s'enchaînent. Tu testes le programme, tu le corriges ou tu le complètes.",
      rappel: [
        "Pour suivre un programme, je fais un tableau : une colonne par variable, une ligne par bloc ou par tour de boucle.",
        "« répéter jusqu'à » teste sa condition AVANT chaque tour, et s'arrête dès qu'elle est vraie.",
        "« au moins 12 » s'écrit « ≥ 12 », « au plus 12 » s'écrit « ≤ 12 », « plus de 12 » s'écrit « > 12 ».",
        "Pour vérifier un programme, je le teste AUX BORNES : juste en dessous du seuil, sur le seuil, juste au-dessus.",
      ],
      exercices: [
        {
          enonce:
            "Aux États-Unis, les températures se donnent en degrés Fahrenheit (°F). Ce programme convertit des degrés Celsius (°C).\na) Que dit le lutin avec $20$ ?\nb) Avec $100$, la température où l'eau bout ?\nc) Avec $-40$ ? Que remarques-tu ?\nd) Écris le calcul du programme avec la lettre $c$.",
          figure: programme(["demander 'Degrés Celsius ?'", "mettre c à réponse", "mettre f à c * 9 / 5 + 32", "dire f"]),
          correction:
            "a) Le programme respecte les priorités : d'abord la multiplication et la division, de gauche à droite, puis l'addition.\nAvec $20$ : $20 \\times 9 = 180$, puis $180 \\div 5 = 36$, puis $36 + 32 = 68$. Réponse : $68$ °F.\nb) Avec $100$ : $100 \\times 9 = 900$, $900 \\div 5 = 180$, $180 + 32 = 212$. Réponse : l'eau bout à $212$ °F.\nc) Avec $-40$ : $-40 \\times 9 = -360$, $-360 \\div 5 = -72$, $-72 + 32 = -40$. Réponse : $-40$ °C, c'est aussi $-40$ °F : les deux échelles se rejoignent là.\nd) Multiplier par $9$ puis diviser par $5$, c'est multiplier par $1{,}8$. Réponse : le programme calcule $c \\times 1{,}8 + 32$, soit $1{,}8c + 32$.\n⛔ Le piège : ajouter $32$ en premier, $(20 + 32) \\times 9 \\div 5 = 93{,}6$. L'ordinateur respecte les priorités, comme sur une copie.",
          schema: trace(["c", "× 9", "÷ 5", "+ 32"], [[20, 180, 36, 68], [100, 900, 180, 212], ["−40", "−360", "−72", "−40"]]),
          micros: ["algo_variable", "algo_programme_objectif"],
        },
        {
          enonce:
            "En Ligue 1, une victoire rapporte $3$ points, un match nul $1$ point, une défaite $0$ point.\na) Complète le bloc « mettre pts à … ».\nb) Une équipe finit la saison avec $20$ victoires, $8$ nuls et $6$ défaites. Que dit le lutin ?\nc) Un élève a écrit « mettre pts à 3 * (v + n) ». Que dirait son programme ? Pourquoi est-ce faux ?",
          figure: programme(["demander 'Victoires ?'", "mettre v à réponse", "demander 'Nuls ?'", "mettre n à réponse", "mettre pts à ...", "dire pts"]),
          correction:
            "a) Chaque victoire vaut $3$ points : v victoires valent $3 \\times v$. Chaque nul vaut $1$ point : n nuls valent n points. Les défaites ne rapportent rien.\nJe complète : « mettre pts à 3 * v + n ».\nb) $3 \\times 20 + 8 = 60 + 8 = 68$. Réponse : le lutin dit $68$.\nc) Son programme dirait $3 \\times (20 + 8) = 3 \\times 28 = 84$. Il donne $3$ points à chaque nul, au lieu de $1$.\n⛔ Le piège : les parenthèses. « 3 * (v + n) » multiplie AUSSI les nuls par $3$ ; sans parenthèses, seul v est multiplié.",
          schema: programme(["demander 'Victoires ?'", "mettre v à réponse", "demander 'Nuls ?'", "mettre n à réponse", "mettre pts à 3 * v + n", "dire pts"], 4),
          micros: ["algo_programme_objectif", "algo_variable"],
        },
        {
          enonce:
            "Dans un jeu de plateau, chaque lancer de dé rapporte des pièces : $3$ pour un six, $1$ sinon.\na) On lance $6$, $2$, $6$, $5$, $1$. Que dit le lutin ?\nb) Quel est le plus petit nombre de pièces possible en $5$ lancers ? Le plus grand ?",
          figure: programme(["mettre pièces à 0", "répéter 5 fois", "  demander 'Dé ?'", "  si réponse = 6 alors", "    ajouter 3 à pièces", "  sinon", "    ajouter 1 à pièces", "dire pièces"]),
          correction:
            "a) Je fais un tableau, une ligne par tour de boucle. À chaque tour, UNE seule des deux branches s'exécute.\nTour 1 : $6$, la condition est vraie, j'ajoute $3$ : pièces vaut $3$.\nTour 2 : $2$, la condition est fausse, j'ajoute $1$ : $4$.\nTour 3 : $6$ : $4 + 3 = 7$. Tour 4 : $5$ : $8$. Tour 5 : $1$ : $9$.\nRéponse : le lutin dit $9$.\nb) Sans aucun six : $5 \\times 1 = 5$. Avec cinq six : $5 \\times 3 = 15$.\nRéponse : au moins $5$ pièces, au plus $15$.\n⛔ Le piège : exécuter les deux branches quand on fait six, $3 + 1 = 4$ pièces. On trouverait $11$ au lieu de $9$.",
          schema: trace(["tour", "dé", "pièces"], [[1, 6, 3], [2, 2, 4], [3, 6, 7], [4, 5, 8], [5, 1, 9]]),
          micros: ["algo_instruction_conditionnelle", "algo_variable", "algo_defi"],
        },
        {
          enonce:
            "Une compagnie aérienne accepte en cabine les valises de $12$ kg AU PLUS (valeur choisie pour l'exercice).\na) Que dit ce programme pour $11$ kg, $12$ kg et $13$ kg ?\nb) Quelle valise est mal traitée ?\nc) Corrige le bloc faux.",
          figure: programme(["demander 'Poids en kg ?'", "si réponse < 12 alors", "  dire 'en cabine'", "sinon", "  dire 'en soute'"]),
          correction:
            "a) $11 < 12$ est vrai : « en cabine ». $12 < 12$ est faux : « en soute ». $13 < 12$ est faux : « en soute ».\nRéponse : « en cabine », « en soute », « en soute ».\nb) « Au plus $12$ kg » veut dire $12$ kg ou moins : la valise de $12$ kg pile a droit à la cabine. Réponse : c'est la valise de $12$ kg qui est mal traitée.\nc) J'écris « si réponse ≤ 12 alors ». Je reteste aux bornes : $11$ et $12$ vont en cabine, $13$ en soute.\n⛔ Le piège : tester seulement $5$ kg et $20$ kg. Le programme faux y répond juste : l'erreur ne se voit qu'au seuil exact.",
          schema: (
            <div className="space-y-2">
              {trace(["kg", "réponse < 12", "réponse ≤ 12"], [[11, "vrai", "vrai"], [12, "faux", "vrai"], [13, "faux", "faux"]])}
              {programme(["demander 'Poids en kg ?'", "si réponse ≤ 12 alors", "  dire 'en cabine'", "sinon", "  dire 'en soute'"], 1)}
            </div>
          ),
          micros: ["algo_condition", "algo_modifier"],
        },
        {
          enonce:
            "Le lutin part vers la droite et laisse une trace quand il avance.\na) Quelle figure trace ce programme ? Donne ses dimensions.\nb) Quelle est la longueur totale du tracé ?\nc) Modifie le programme pour qu'il trace un carré de côté $50$.",
          figure: programme(["stylo en position d'écriture", "répéter 2 fois", "  avancer de 80", "  tourner à gauche de 90", "  avancer de 30", "  tourner à gauche de 90"]),
          correction:
            "a) Je suis le lutin : $80$ pas vers la droite, un quart de tour à gauche, $30$ pas vers le haut, un quart de tour à gauche. Puis la même chose une deuxième fois, et il revient à son point de départ.\nRéponse : un rectangle de $80$ pas sur $30$ pas.\nb) $2 \\times (80 + 30) = 2 \\times 110 = 220$. Réponse : le tracé mesure $220$ pas.\nc) Un carré a $4$ côtés égaux : je répète $4$ fois « avancer de 50 » puis « tourner à gauche de 90 ». Le tracé mesure alors $4 \\times 50 = 200$ pas.\n⛔ Le piège : garder « répéter 2 fois » avec un seul « avancer » dans la boucle. Le lutin ne tracerait que deux côtés du carré.",
          schema: (
            <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2 print:grid-cols-2">
              {lutin([[0, 0], [80, 0], [80, 30], [0, 30], [0, 0]], "80 sur 30, départ en vert")}
              {programme(["stylo en position d'écriture", "répéter 4 fois", "  avancer de 50", "  tourner à gauche de 90"], 1)}
            </div>
          ),
          micros: ["algo_programme_objectif", "algo_modifier"],
        },
        {
          enonce:
            "Léa a $35$ € et met $12$ € de côté chaque semaine. Elle veut s'acheter un casque de vélo à $100$ €.\na) Que dit le lutin ?\nb) Combien Léa a-t-elle alors ?\nc) Son frère calcule $65 \\div 12 \\approx 5{,}4$ et annonce $5$ semaines. A-t-il raison ?",
          figure: programme(["mettre argent à 35", "mettre sem à 0", "répéter jusqu'à argent ≥ 100", "  ajouter 12 à argent", "  ajouter 1 à sem", "dire sem"]),
          correction:
            "a) Avant chaque tour, le programme teste « argent ≥ 100 ». Tant que c'est faux, il ajoute $12$ € et une semaine.\nL'argent passe à $47$, $59$, $71$, $83$, $95$, puis $107$.\nAprès $5$ semaines, $95 \\geq 100$ est faux : la boucle continue. Après $6$ semaines, $107 \\geq 100$ est vrai : elle s'arrête.\nRéponse : le lutin dit $6$.\nb) $35 + 6 \\times 12 = 35 + 72 = 107$. Réponse : Léa a $107$ €.\nc) Non : en $5$ semaines, elle n'a que $35 + 5 \\times 12 = 95$ €. Il lui manque $5$ € : il faut une sixième semaine.\n⛔ Le piège : arrondir $5{,}4$ à $5$. Ici, il faut monter à l'entier SUIVANT : $5$ semaines ne suffisent pas.",
          schema: trace(["sem", "argent"], [[1, 47], [2, 59], [3, 71], [4, 83], [5, 95], [6, 107]]),
          micros: ["algo_variable", "algo_programme_objectif", "algo_defi"],
        },
        {
          enonce:
            "Le pH dit si une solution est acide (moins de $7$), neutre ($7$) ou basique (plus de $7$).\na) Que dit le lutin pour le jus de citron (pH environ $2$), l'eau pure ($7$) et l'eau de mer (pH moyen $8{,}1$) ?\nb) Combien de blocs « dire » s'exécutent à chaque fois ?",
          figure: programme(["demander 'pH ?'", "si réponse < 7 alors", "  dire 'acide'", "sinon", "  si réponse = 7 alors", "    dire 'neutre'", "  sinon", "    dire 'basique'"]),
          correction:
            "Le deuxième « si » est RANGÉ dans le « sinon » du premier : il n'est testé que si le pH n'est pas plus petit que $7$.\na) Jus de citron, $2$ : $2 < 7$ est vrai. Le lutin dit « acide », et tout le « sinon » est sauté.\nEau pure, $7$ : $7 < 7$ est faux, je passe au « sinon ». $7 = 7$ est vrai : « neutre ».\nEau de mer, $8{,}1$ : $8{,}1 < 7$ est faux, puis $8{,}1 = 7$ est faux : « basique ».\nRéponse : « acide », « neutre », « basique ».\nb) Réponse : à chaque fois, UN SEUL bloc « dire » s'exécute.\n⛔ Le piège : croire que pour le citron, le programme teste aussi « = 7 ». Le second test est dans le « sinon » : il ne tourne que si le premier est faux.\n⭐ Le pH moyen des océans était d'environ $8{,}2$ avant l'ère industrielle. En absorbant du CO₂, l'océan devient moins basique : c'est l'acidification des océans.",
          schema: trace(["pH", "< 7", "= 7", "le lutin dit"], [[2, "vrai", "—", "acide"], [7, "faux", "vrai", "neutre"], ["8,1", "faux", "faux", "basique"]]),
          micros: ["algo_instruction_conditionnelle", "algo_condition"],
        },
        {
          enonce:
            "Un thermostat allume le chauffage quand la pièce est sous $19$ °C, la température conseillée dans les pièces à vivre.\na) Que dit le programme pour $17$, $19$ et $21$ °C ?\nb) Réécris-le avec une variable consigne, pour que le seuil se change en UN seul bloc.\nc) La nuit, on conseille $16$ °C dans les chambres. Quel bloc changes-tu ? Que dit alors le programme pour $17$ °C ?",
          figure: programme(["demander 'Température ?'", "si réponse < 19 alors", "  dire 'on chauffe'", "sinon", "  dire 'on arrête'"]),
          correction:
            "a) $17 < 19$ est vrai : « on chauffe ». $19 < 19$ est faux : « on arrête ». $21 < 19$ est faux : « on arrête ».\nRéponse : « on chauffe », « on arrête », « on arrête ».\nb) Je range le seuil dans une variable, en haut du programme : « mettre consigne à 19 », puis je teste « réponse < consigne ». Le programme dit exactement la même chose qu'avant.\nc) Je ne change qu'un bloc : « mettre consigne à 16 ». Avec $17$ : $17 < 16$ est faux. Réponse : le programme dit « on arrête ».\n⭐ Une variable pour le seuil, c'est la molette d'un vrai thermostat : on la tourne, on ne réécrit pas le programme.\n⛔ Le piège : un seuil écrit à plusieurs endroits. On en change un, on oublie l'autre. Avec une variable, il n'est écrit qu'UNE fois.",
          schema: programme(["mettre consigne à 16", "demander 'Température ?'", "si réponse < consigne alors", "  dire 'on chauffe'", "sinon", "  dire 'on arrête'"], 0),
          micros: ["algo_modifier", "algo_variable", "algo_programme_objectif"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un programme plus long, plusieurs questions qui s'enchaînent. Fais tourner le programme au brouillon avant de répondre.",
      rappel: [
        "Un problème se découpe : ce que le programme reçoit (demander), ce qu'il retient (les variables), ce qu'il décide (si), ce qu'il répète (répéter).",
        "Une variable qui compte se met à $0$ AVANT la boucle. Dans une boucle, l'ORDRE des blocs change le résultat.",
        "Après chaque modification, je refais tourner le programme sur un exemple dont je connais la réponse.",
      ],
      exercices: [
        {
          titre: "Le comptage des hirondelles",
          enonce:
            "Chaque printemps, des bénévoles comptent les couples d'hirondelles d'un village (relevé fictif) : $520$, puis $480$, $495$, $450$ et $410$. Ce programme compte les années de baisse.\na) Que dit le lutin ?\nb) Un élève déplace « mettre avant à réponse » juste après le « demander » de la boucle. Que dit alors le lutin ? Pourquoi ?\nc) Complète le programme pour qu'il dise aussi la perte totale entre la première et la dernière année.",
          figure: programme(["demander 'Année 1 ?'", "mettre avant à réponse", "mettre baisses à 0", "répéter 4 fois", "  demander 'Année suivante ?'", "  si réponse < avant alors", "    ajouter 1 à baisses", "  mettre avant à réponse", "dire baisses"]),
          correction:
            "a) La variable avant retient le nombre de l'année d'avant. À chaque tour, je compare le nouveau nombre à avant, PUIS je mets avant à jour.\n$480 < 520$ : baisse, baisses vaut $1$. $495 < 480$ : faux. $450 < 495$ : baisse, $2$. $410 < 450$ : baisse, $3$.\nRéponse : le lutin dit $3$.\nb) avant vaudrait déjà la réponse au moment du test : « réponse < avant » compare un nombre à lui-même, et c'est toujours faux. Réponse : le lutin dit $0$.\nc) Je garde le premier nombre dans une variable : « mettre premier à réponse », au début. À la fin, réponse contient le dernier nombre : j'ajoute « dire premier - réponse ».\nRéponse : le lutin dit $3$, puis $520 - 410 = 110$ : $110$ couples perdus en quatre ans.\n⛔ Le piège : l'ORDRE des blocs dans la boucle. La mise à jour de avant doit venir APRÈS le test, sinon le programme a oublié l'année d'avant.",
          schema: (
            <div className="space-y-2">
              {trace(["année", "compté", "baisse ?", "baisses"], [[2, 480, "oui", 1], [3, 495, "non", 1], [4, 450, "oui", 2], [5, 410, "oui", 3]])}
              {programme(["demander 'Année 1 ?'", "mettre avant à réponse", "mettre premier à réponse", "mettre baisses à 0", "répéter 4 fois", "  demander 'Année suivante ?'", "  si réponse < avant alors", "    ajouter 1 à baisses", "  mettre avant à réponse", "dire baisses", "dire premier - réponse"], 2)}
            </div>
          ),
          micros: ["algo_variable", "algo_condition", "algo_modifier", "algo_defi"],
        },
        {
          titre: "La monnaie rendue",
          enonce:
            "Une caisse automatique doit rendre $13$ € avec des billets de $5$ € et des pièces de $2$ €. Ce programme s'occupe des billets.\na) Que dit le lutin ?\nb) Complète le programme pour qu'il rende ensuite des pièces de $2$ €, puis dise le nombre de pièces et ce qui reste.\nc) Que dit le programme complet si la caisse doit rendre $17$ € ?",
          figure: programme(["mettre reste à 13", "mettre billets à 0", "répéter jusqu'à reste < 5", "  ajouter -5 à reste", "  ajouter 1 à billets", "dire billets", "dire reste"]),
          correction:
            "a) Tant que reste n'est pas plus petit que $5$, la caisse donne un billet : reste perd $5$, billets gagne $1$.\nreste vaut $13$, puis $8$, puis $3$. $3 < 5$ : la boucle s'arrête.\nRéponse : le lutin dit $2$ (billets), puis $3$ (euros qui restent).\nb) J'ajoute la même boucle pour les pièces : « mettre pièces à 0 », « répéter jusqu'à reste < 2 » avec « ajouter -2 à reste » et « ajouter 1 à pièces » dedans, puis « dire pièces » et « dire reste ».\nAvec $13$ €, reste passe de $3$ à $1$. Réponse : le lutin dit $2$, $3$, puis $1$ (pièce) et $1$ (euro qui reste).\nc) Avec $17$ € : reste vaut $17$, $12$, $7$, $2$ : $3$ billets. Puis $2$, $0$ : $1$ pièce.\nRéponse : le lutin dit $3$, $2$, $1$, puis $0$ : il ne reste rien, car $3 \\times 5 + 2 = 17$.\n⛔ Le piège : écrire « répéter jusqu'à reste ≤ 5 ». Avec $15$ €, la caisse s'arrêterait à $5$ € sans donner le dernier billet.",
          schema: (
            <div className="space-y-2">
              {trace(["tour", "reste", "billets"], [[1, 8, 1], [2, 3, 2]])}
              {programme(["mettre reste à 13", "mettre billets à 0", "répéter jusqu'à reste < 5", "  ajouter -5 à reste", "  ajouter 1 à billets", "dire billets", "dire reste", "mettre pièces à 0", "répéter jusqu'à reste < 2", "  ajouter -2 à reste", "  ajouter 1 à pièces", "dire pièces", "dire reste"], 8)}
            </div>
          ),
          micros: ["algo_variable", "algo_programme_objectif", "algo_defi"],
        },
        {
          titre: "Le pass ou le ticket",
          enonce:
            "Dans une ville (tarifs choisis pour l'exercice), un ticket de bus coûte $2$ € et un pass mensuel $30$ €. Ce programme conseille un voyageur.\na) Que dit-il pour $10$, $15$ et $20$ trajets par mois ?\nb) Que représente la variable a ?\nc) Pour $15$ trajets, les deux choix coûtent-ils la même chose ? Modifie le programme pour qu'il dise « même prix » dans ce cas.\nd) À partir de combien de trajets le pass est-il moins cher ?",
          figure: programme(["demander 'Trajets par mois ?'", "mettre t à réponse", "mettre a à 2 * t", "si a > 30 alors", "  dire 'prends le pass'", "sinon", "  dire 'garde les tickets'"]),
          correction:
            "a) $10$ trajets : a vaut $20$, et $20 > 30$ est faux : « garde les tickets ».\n$15$ trajets : a vaut $30$, et $30 > 30$ est faux : « garde les tickets ».\n$20$ trajets : a vaut $40$, et $40 > 30$ est vrai : « prends le pass ».\nb) a est le prix du mois si l'on paie chaque trajet avec un ticket, à $2$ € le trajet.\nc) Oui : $2 \\times 15 = 30$, le prix du pass. Dans le « sinon », je range un second test : « si a = 30 alors dire 'même prix' », avec « dire 'garde les tickets' » dans son « sinon ».\nd) Le pass est moins cher quand $2 \\times t > 30$, c'est-à-dire quand t dépasse $15$. Réponse : à partir de $16$ trajets, qui coûtent $32$ € en tickets.\n⛔ Le piège : répondre $15$. À $15$ trajets, les deux choix coûtent pareil : le pass n'est pas MOINS cher.",
          schema: (
            <div className="space-y-2">
              {trace(["trajets", "a", "le lutin dit"], [[10, 20, "garde les tickets"], [15, 30, "même prix"], [20, 40, "prends le pass"]])}
              {programme(["demander 'Trajets par mois ?'", "mettre t à réponse", "mettre a à 2 * t", "si a > 30 alors", "  dire 'prends le pass'", "sinon", "  si a = 30 alors", "    dire 'même prix'", "  sinon", "    dire 'garde les tickets'"], 6)}
            </div>
          ),
          micros: ["algo_programme_objectif", "algo_condition", "algo_instruction_conditionnelle", "algo_modifier", "algo_defi"],
        },
        {
          titre: "L'escalier du lutin",
          enonce:
            "Le lutin part vers la droite et laisse une trace.\na) Dessine le tracé. Combien mesure-t-il ?\nb) Où arrive le lutin par rapport à son point de départ ?\nc) On veut un escalier de $5$ marches qui arrive au même endroit. Quelle longueur faut-il donner à chaque « avancer » ? Écris le programme.\nd) Combien mesure alors le tracé ? Que remarques-tu ?",
          figure: programme(["stylo en position d'écriture", "répéter 3 fois", "  avancer de 20", "  tourner à gauche de 90", "  avancer de 20", "  tourner à droite de 90"]),
          correction:
            "a) Dans la boucle : $20$ pas vers la droite, un quart de tour à gauche, $20$ pas vers le haut, un quart de tour à droite pour repartir vers la droite. C'est une marche d'escalier, répétée $3$ fois.\nLe tracé mesure $3 \\times (20 + 20) = 120$ pas.\nb) Le lutin a fait $3 \\times 20 = 60$ pas vers la droite, et $60$ vers le haut. Réponse : il arrive $60$ pas plus à droite et $60$ pas plus haut.\nc) $5$ marches doivent monter de $60$ : chaque « avancer » vaut $60 \\div 5 = 12$. Je change « répéter 3 fois » en « répéter 5 fois », et les deux « avancer de 20 » en « avancer de 12 ».\nd) $5 \\times (12 + 12) = 120$. Réponse : le tracé mesure encore $120$ pas.\n⭐ Avec $10$ marches de $6$, on trouve toujours $120$ : l'escalier ressemble de plus en plus à une pente, mais il ne raccourcit jamais.\n⛔ Le piège : tourner deux fois à gauche. Le lutin ferait demi-tour et tracerait un carré de côté $20$ au lieu de monter.",
          schema: (
            <div className="space-y-2">
              <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 print:grid-cols-2">
                {lutin([[0, 0], [20, 0], [20, 20], [40, 20], [40, 40], [60, 40], [60, 60]], "3 marches de 20 : 120 pas")}
                {lutin([[0, 0], [12, 0], [12, 12], [24, 12], [24, 24], [36, 24], [36, 36], [48, 36], [48, 48], [60, 48], [60, 60]], "5 marches de 12 : 120 pas")}
              </div>
              {programme(["stylo en position d'écriture", "répéter 5 fois", "  avancer de 12", "  tourner à gauche de 90", "  avancer de 12", "  tourner à droite de 90"], 1)}
            </div>
          ),
          micros: ["algo_programme_objectif", "algo_modifier", "algo_defi"],
        },
      ],
    },
  ],
};
