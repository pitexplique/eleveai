// ─── Fiche d'exercices : les probabilités (4e) — 20 exercices corrigés ─────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-probabilites.tsx` et sur
// les huit micros du coach de 4e (notionId proba_experience). L'angle de la 4e,
// comme le cours : UNE SEULE ÉPREUVE. On liste les issues, on vérifie qu'elles
// ont la même chance, on divise, puis on écrit le résultat en fraction, en
// décimal ou en pourcentage, et on compare.
// ⛔ Programme de 4e : ni expérience à deux épreuves, ni arbre pondéré (la fiche
// de cours l'a tranché avec Frédéric le 26/08 ; c'est la 3e qui les porte). Le
// vérificateur contrôle qu'aucun `arbre(` n'est appelé. ⛔ Pas de fréquence
// observée : `proba_frequence` a sa propre feuille.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le dé et ses nombres
// pairs, ni le sac de 3 rouges, 2 bleues, 1 verte, ni la roue 4 / 2 / 1, ni
// l'urne d'une rouge et quatre oranges, ni « gagner 0,4 », ni « supérieur à 4 »,
// ni « contraire de 0,3 », ni la pluie sur les Hauts. ⛔ Ni ceux de la feuille
// de 3e (roue de 8, urne 4-3-1, roue 200°-100°-60°, diviseurs de 6, tombola de
// 20 jetons, garçons et filles, pièce, deux dés, tirs au but, météo, donneurs),
// ni de la seconde (digicode, mois de naissance, roulette, groupes sanguins).
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin — le matériel lui-même (urne, roue, tableau des cas), le tableau
// des trois écritures, le diagramme, et l'ÉCHELLE DES PROBABILITÉS de 0 à 1,
// dessinée ici en SVG local (`echelle`) parce que `figures.tsx` n'en a pas.
// ⛔ LISIBLE À 375 PX : la roue du canvas écrit en 14 dans un viewBox de 320 ;
// dans le cadre de `figures.tsx` (≈ 211 px utiles au téléphone), ses étiquettes
// tombaient à 9 px. D'où la `roue` LOCALE : même canvas, mais une largeur
// minimale de 17,5 rem (14 × 254 ÷ 320 ≈ 11 px) dans un conteneur qui défile
// sur écran — pas sur papier. L'échelle : police 15 dans 320, 16,5 rem minimum.
//
// ⛔ LES PIÈGES NOMMÉS : compter les sortes au lieu des cas — les lettres
// différentes (2), les goûts (9), les couleurs de la roue (4, 11), les zones du
// monde (19) — ; « deux issues, donc une chance sur deux » (17) ; « trois
// couleurs du feu, donc un tiers » (8) ; oublier une issue (1, 10) ; compter
// l'as parmi les figures (5) ; recopier les chiffres d'une fraction, 2/5 = 2,5
// (6) ; comparer des nombres de billes au lieu de probabilités (7) ; confondre
// 0,5 et 0,5 % (12) ; comparer 35 % et 0,4 sans les écrire pareil (13) ; diviser
// par le mauvais total (14) ; un quotient renversé, plus grand que 1 (15) ;
// croire qu'il manque une donnée quand la somme fait 1 (16) ; oublier de passer
// au contraire (18) ; un total juste mais pas le plus petit (20). Et le
// contraire pris pour « un autre événement » (3).
//
// Les chiffres du monde, et d'où ils viennent :
// - feu tricolore : le feu jaune (l'« orange ») dure 3 s en agglomération
//   (Instruction interministérielle sur la signalisation routière, 6e partie,
//   feux de circulation) ; les 45 s de vert et 52 s de rouge sont IMAGINÉES,
//   pour un cycle de 100 s — ex. 8 ;
// - la surface de la Terre, environ 510 millions de km², dont environ
//   361 millions de km² d'océans, soit 71 % (NOAA, National Ocean Service ;
//   USGS, Water Science School) ; la France métropolitaine, environ 550 000 km²
//   (IGN : 543 940 km² hors lacs, glaciers et estuaires, 551 695 avec) — ex. 17 ;
// - Liste rouge de l'UICN (version 2024) : 41 % des espèces d'amphibiens
//   évaluées sont menacées d'extinction, 26 % des mammifères, 12 % des oiseaux
//   (arrondis de la page de résumé de l'UICN ; ⚠️ À REVÉRIFIER à chaque mise à
//   jour de la Liste rouge) — ex. 18 ;
// - Coupe du monde 2026 : 48 équipes, places réparties par le Conseil de la
//   FIFA (mai 2017) — Europe 16, Afrique 9, Asie 8, Amérique du Sud 6,
//   Amérique du Nord, centrale et Caraïbes 6 (dont les trois organisateurs),
//   Océanie 1, et 2 places de barrage intercontinental — ex. 19 ;
// - le jeu de 32 cartes (ex. 5) est le jeu de belote ; la kermesse, la classe,
//   les sacs de la fête et le sac de jetons d'insectes sont IMAGINÉS.
//
// Les corrigés sont écrits à la première personne (« je compte »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-probabilites-4e.mjs` —
// chaque probabilité est retrouvée en ÉNUMÉRANT les cas (les jetons un à un,
// les 32 cartes, les secteurs de la roue découpés en parts égales, les jours,
// les faces), puis lue dans la phrase du corrigé ; les dessins sont relus dans
// le source et doivent dire la même chose que le texte.
//
// Micro-compétences : proba_vocabulaire (1, 3, 15), proba_issue (1, 2, 9, 14),
// proba_evenement (3, 8, 10, 12, 16, 17, 18, 19), proba_equiprobabilite (2, 4,
// 11, 17), proba_calculer_fraction (2, 5, 9, 10, 12, 14, 19, 20),
// proba_convertir (6, 8, 9, 12, 13, 14, 16, 17, 18, 20), proba_comparer (7, 9,
// 11, 13, 18, 19), proba_defi (15, 16, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, diagramme, tableauProba } from "@/lib/fiches-exercices/figures";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const R = "#dc2626", B = "#2563eb", V = "#059669", J = "#eab308", G = "#94a3b8", O = "#f97316", P = "#7c3aed";

/** La roue du coach, LISIBLE à 375 px : une largeur minimale dans un conteneur
 *  qui défile sur écran (voir l'en-tête). Texte NU dans `label`. */
const roue = (segments: { label: string; poids: number; couleur?: string }[]) => (
  <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[12rem] print:overflow-visible">
    <div className="min-w-[17.5rem] print:min-w-0">
      <CanvasRenderer figure={{ kind: "probabilites", variant: "roue", roue: { segments } }} />
    </div>
  </div>
);

/** Deux dessins côte à côte (à partir de `sm` et sur papier), l'un sous l'autre au téléphone. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);
const nomme = (nom: string, dessin: ReactNode) => (
  <div>
    <p className="mb-1 text-center text-sm font-black text-slate-700">{nom}</p>
    {dessin}
  </div>
);

/**
 * L'ÉCHELLE DES PROBABILITÉS : une droite de `min` à `max`, la bande verte de
 * 0 à 1 (les seules valeurs possibles), rouge au-delà, et des points nommés.
 * Les noms alternent sur deux hauteurs : deux valeurs voisines ne se
 * chevauchent pas. ⛔ Texte NU (SVG). ⭐ Le vérificateur relit les `valeur`.
 */
const echelle = (points: { label: string; valeur: number }[], min = 0, max = 1) => {
  const x = (v: number) => 24 + ((v - min) / (max - min)) * 272;
  const possible = (v: number) => v >= 0 && v <= 1;
  return (
    <div className="mx-auto w-full max-w-[22rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
      <div className="min-w-[16.5rem] print:min-w-0">
        <svg viewBox="0 0 320 104" className="block h-auto w-full" role="img" aria-label="Échelle des probabilités">
          {min < 0 ? <rect x={x(min)} y="60" width={x(0) - x(min)} height="8" fill="#fecaca" /> : null}
          {max > 1 ? <rect x={x(1)} y="60" width={x(max) - x(1)} height="8" fill="#fecaca" /> : null}
          <rect x={x(0)} y="60" width={x(1) - x(0)} height="8" fill="#bbf7d0" />
          <line x1={x(min)} y1="64" x2={x(max)} y2="64" stroke="#334155" strokeWidth="2" />
          {[0, 1].map((t) => (
            <g key={t}>
              <line x1={x(t)} y1="56" x2={x(t)} y2="74" stroke="#334155" strokeWidth="2" />
              <text x={x(t)} y="94" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">
                {t}
              </text>
            </g>
          ))}
          {points.map((p, i) => {
            const haut = i % 2 === 0 ? 20 : 40;
            const couleur = possible(p.valeur) ? "#2563eb" : "#dc2626";
            return (
              <g key={i}>
                <line x1={x(p.valeur)} y1={haut + 4} x2={x(p.valeur)} y2="64" stroke={couleur} strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx={x(p.valeur)} cy="64" r="5" fill={couleur} />
                <text x={x(p.valeur)} y={haut} textAnchor="middle" fontSize="15" fontWeight="900" fill={couleur}>
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const exercicesProbabilites4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème : issues et événements, équiprobabilité, calcul d'une probabilité en fraction, en décimal et en pourcentage, événement contraire, comparer deux chances. Un jeu de cartes, un feu tricolore, une tombola, une météorite qui tombe sur la Terre, les espèces menacées de la Liste rouge, les places de la Coupe du monde 2026. Chaque corrigé a son schéma : urne, roue, tableau des cas, diagramme ou échelle des probabilités. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/proba-experience", titre: "Les probabilités" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lister les issues, compter, convertir, passer au contraire.",
      rappel: [
        "Une expérience est ALÉATOIRE quand on connaît tous les résultats possibles sans pouvoir prévoir lequel sortira. Chaque résultat est une ISSUE ; un ÉVÉNEMENT est un ensemble d'issues.",
        "Une probabilité est un nombre entre $0$ (événement impossible) et $1$ (événement certain).",
        "Si toutes les issues ont la même chance (ÉQUIPROBABILITÉ) : $P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$.",
        "Une probabilité s'écrit en fraction, en décimal ou en pourcentage : $\\dfrac{1}{4} = 0{,}25$, soit $25$ %.",
      ],
      exercices: [
        {
          enonce:
            "On lance un dé équilibré à $12$ faces, numérotées de $1$ à $12$, et on lit la face du dessus.\na) Pourquoi est-ce une expérience aléatoire ? Combien a-t-elle d'issues ?\nb) Quelles issues réalisent l'événement $A$ : « obtenir un multiple de $5$ » ?\nc) L'événement « obtenir $7$ » est-il élémentaire ? Comment appelle-t-on l'événement « obtenir $13$ » ?",
          correction:
            "a) Je connais tous les résultats possibles, mais je ne peux pas savoir à l'avance lequel sortira : c'est une expérience aléatoire. Ses issues sont les nombres de $1$ à $12$ : $12$ issues.\nb) Je cherche les multiples de $5$ qui sont sur le dé : $5$ et $10$. $A$ est réalisé par $2$ issues.\nc) « Obtenir $7$ » n'est réalisé que par une seule issue : c'est un événement élémentaire.\nAucune face ne porte $13$ : aucune issue ne réalise cet événement, il est IMPOSSIBLE et sa probabilité vaut $0$.\n⛔ Le piège au b) : oublier le $10$, ou compter $15$, qui n'est pas sur le dé. Je cherche les multiples PARMI les issues.\nRéponse : $12$ issues ; $A$ est réalisé par $5$ et $10$ ; « obtenir $13$ » est impossible.",
          // Les 12 faces rangées par quatre ; les multiples de 5 surlignés.
          schema: tableauProba(["Rangée", "a", "b", "c", "d"], [["1re", "1", "2", "3", "4"], ["2e", "5", "6", "7", "8"], ["3e", "9", "10", "11", "12"]], [[1, 1], [2, 2]]),
          micros: ["proba_vocabulaire", "proba_issue"],
        },
        {
          enonce:
            "On écrit chaque lettre du mot PARAPLUIE sur un jeton, on met les $9$ jetons dans un sac et on en tire un au hasard.\na) Combien y a-t-il de cas possibles ? Quelles lettres peut-on obtenir ?\nb) Calculer la probabilité de tirer la lettre A, puis celle de tirer la lettre R.\nc) Calculer la probabilité de tirer une voyelle.",
          correction:
            "a) Chaque JETON est un cas possible : $9$ cas, qui ont tous la même chance puisqu'on tire au hasard. On peut obtenir les lettres P, A, R, L, U, I et E : $7$ lettres différentes, mais le P et le A sont écrits sur deux jetons chacun.\nb) Deux jetons portent un A : $P(\\text{A}) = \\dfrac{2}{9}$. Un seul porte le R : $P(\\text{R}) = \\dfrac{1}{9}$.\nc) Les voyelles sont A, A, U, I et E : $5$ jetons. $P(\\text{voyelle}) = \\dfrac{5}{9}$.\n⛔ Le piège : diviser par $7$, le nombre de lettres différentes. Les lettres n'ont pas toutes la même chance ; ce sont les $9$ jetons qui l'ont.\nRéponse : $9$ cas possibles ; $P(\\text{A}) = \\dfrac{2}{9}$, $P(\\text{R}) = \\dfrac{1}{9}$ et $P(\\text{voyelle}) = \\dfrac{5}{9}$.",
          // Les voyelles en orange, les consonnes en gris.
          schema: billes([{ label: "P", couleur: G }, { label: "A", couleur: O }, { label: "R", couleur: G }, { label: "A", couleur: O }, { label: "P", couleur: G }, { label: "L", couleur: G }, { label: "U", couleur: O }, { label: "I", couleur: O }, { label: "E", couleur: O }]),
          micros: ["proba_issue", "proba_equiprobabilite", "proba_calculer_fraction"],
        },
        {
          enonce:
            "On choisit au hasard un jour de la semaine, en tirant son nom dans un chapeau.\na) Combien y a-t-il d'issues ?\nb) Pour chaque événement, dire s'il est certain, impossible, ou ni l'un ni l'autre.\n$A$ : « le nom du jour commence par M » ; $B$ : « le nom du jour contient la lettre I » ; $C$ : « le nom du jour a plus de $8$ lettres ».\nc) Décrire l'événement contraire de $A$ et donner ses issues.",
          correction:
            "a) Les issues sont les $7$ jours : lundi, mardi, mercredi, jeudi, vendredi, samedi et dimanche.\nb) $A$ : mardi et mercredi le réalisent, les cinq autres jours non. $A$ n'est ni certain ni impossible.\n$B$ : je relis les sept noms, lettre par lettre : tous contiennent un I, même dimanche. $B$ est CERTAIN.\n$C$ : les noms les plus longs, mercredi, vendredi et dimanche, ont $8$ lettres, pas plus. Aucun jour ne réalise $C$ : il est IMPOSSIBLE.\nc) Le contraire de $A$ est « le nom du jour ne commence pas par M ». Il est réalisé par les $5$ autres jours : lundi, jeudi, vendredi, samedi et dimanche.\n⛔ Le piège au c) : prendre pour contraire « commence par L », qui est un autre événement. Le contraire réunit TOUTES les issues qui ne réalisent pas $A$.\nRéponse : $7$ issues ; $A$ ni l'un ni l'autre, $B$ certain, $C$ impossible ; contraire de $A$ : lundi, jeudi, vendredi, samedi, dimanche.",
          schema: tableauProba(["Jour", "Lettres", "Commence par M"], [["lundi", "5", "non"], ["mardi", "5", "oui"], ["mercredi", "8", "oui"], ["jeudi", "5", "non"], ["vendredi", "8", "non"], ["samedi", "6", "non"], ["dimanche", "8", "non"]], [[1, 2], [2, 2]]),
          micros: ["proba_vocabulaire", "proba_evenement"],
        },
        {
          enonce:
            "Dans chaque situation, les issues sont-elles équiprobables ? Justifier.\na) On tire une carte au hasard dans un jeu de $32$ cartes bien mélangé.\nb) On fait tourner une roue : le jaune couvre la moitié de la roue, le violet et le vert un quart chacun.\nc) On note le résultat d'un match de football pour une équipe : victoire, nul ou défaite.\nd) Pour la roue du b), donner la probabilité de chaque couleur.",
          correction:
            "a) Oui : le jeu est bien mélangé et on tire au hasard, chaque carte a la même chance, $\\dfrac{1}{32}$.\nb) Non : le secteur jaune est deux fois plus grand que le violet ou le vert. Plus le secteur est grand, plus la couleur a de chances de sortir.\nc) Non : rien ne dit que les trois résultats ont la même chance. Ils dépendent des deux équipes : une grande équipe gagne plus souvent qu'elle ne perd.\nd) $P(\\text{jaune}) = \\dfrac{1}{2}$ ; $P(\\text{violet}) = \\dfrac{1}{4}$ ; $P(\\text{vert}) = \\dfrac{1}{4}$.\n⭐ Contrôle : $\\dfrac{1}{2} + \\dfrac{1}{4} + \\dfrac{1}{4} = 1$.\n⛔ Le piège au b) et au c) : « trois issues, donc une chance sur trois chacune ». Trois issues ne font pas forcément trois chances égales.\nRéponse : a) oui ; b) non ; c) non ; d) jaune $\\dfrac{1}{2}$, violet et vert $\\dfrac{1}{4}$ chacun.",
          schema: roue([{ label: "jaune", poids: 180, couleur: J }, { label: "violet", poids: 90, couleur: P }, { label: "vert", poids: 90, couleur: V }]),
          micros: ["proba_equiprobabilite"],
        },
        {
          enonce:
            "Un jeu de $32$ cartes compte quatre couleurs (cœur, carreau, trèfle, pique) et, dans chaque couleur, huit cartes : $7$, $8$, $9$, $10$, valet, dame, roi et as. On tire une carte au hasard.\na) Calculer la probabilité de tirer un roi.\nb) Calculer la probabilité de tirer un cœur.\nc) Calculer la probabilité de tirer une figure (valet, dame ou roi).",
          correction:
            "Les $32$ cartes ont la même chance d'être tirées : je compte les cartes favorables et je divise par $32$.\na) Un roi dans chaque couleur, donc $4$ rois : $P(\\text{roi}) = \\dfrac{4}{32} = \\dfrac{1}{8}$.\nb) $8$ cartes par couleur : $P(\\text{cœur}) = \\dfrac{8}{32} = \\dfrac{1}{4}$.\nc) Trois figures par couleur, dans quatre couleurs : $3 \\times 4 = 12$ cartes. $P(\\text{figure}) = \\dfrac{12}{32} = \\dfrac{3}{8}$.\n⛔ Le piège au c) : compter l'as parmi les figures, et trouver $\\dfrac{16}{32}$. L'as n'est pas une figure : il ne porte pas de personnage.\nRéponse : $\\dfrac{1}{8}$ ; $\\dfrac{1}{4}$ ; $\\dfrac{3}{8}$.",
          // Les 32 cartes ; les 12 figures surlignées.
          schema: tableauProba(
            ["", "cœur", "carreau", "trèfle", "pique"],
            [
              ["7", "7♥", "7♦", "7♣", "7♠"],
              ["8", "8♥", "8♦", "8♣", "8♠"],
              ["9", "9♥", "9♦", "9♣", "9♠"],
              ["10", "10♥", "10♦", "10♣", "10♠"],
              ["valet", "V♥", "V♦", "V♣", "V♠"],
              ["dame", "D♥", "D♦", "D♣", "D♠"],
              ["roi", "R♥", "R♦", "R♣", "R♠"],
              ["as", "A♥", "A♦", "A♣", "A♠"],
            ],
            [[4, 1], [4, 2], [4, 3], [4, 4], [5, 1], [5, 2], [5, 3], [5, 4], [6, 1], [6, 2], [6, 3], [6, 4]],
          ),
          micros: ["proba_calculer_fraction"],
        },
        {
          enonce:
            "Écrire chaque probabilité sous forme décimale, puis en pourcentage.\na) $\\dfrac{3}{4}$ ; b) $\\dfrac{2}{5}$ ; c) $\\dfrac{7}{20}$ ; d) $\\dfrac{1}{8}$.\ne) Dans l'autre sens : écrire $0{,}6$ et $5$ % sous forme de fractions simplifiées.",
          correction:
            "Pour passer à l'écriture décimale, je divise le numérateur par le dénominateur ; pour le pourcentage, je multiplie par $100$.\na) $3 \\div 4 = 0{,}75$, soit $75$ %.\nb) $2 \\div 5 = 0{,}4$, soit $40$ %.\nc) $7 \\div 20 = 0{,}35$, soit $35$ %.\nd) $1 \\div 8 = 0{,}125$, soit $12{,}5$ %.\ne) $0{,}6 = \\dfrac{6}{10} = \\dfrac{3}{5}$, et $5$ % s'écrit $\\dfrac{5}{100} = \\dfrac{1}{20}$.\n⛔ Le piège au b) : écrire $2{,}5$ en recopiant les chiffres de la fraction. Une fraction se DIVISE : $2 \\div 5$. Et $2{,}5$ dépasse $1$, ce ne peut pas être une probabilité.\nRéponse : $0{,}75$ et $75$ % ; $0{,}4$ et $40$ % ; $0{,}35$ et $35$ % ; $0{,}125$ et $12{,}5$ % ; $\\dfrac{3}{5}$ et $\\dfrac{1}{20}$.",
          schema: tableauProba(["Fraction", "Décimal", "Pourcentage"], [["3/4", "0,75", "75 %"], ["2/5", "0,4", "40 %"], ["7/20", "0,35", "35 %"], ["1/8", "0,125", "12,5 %"], ["3/5", "0,6", "60 %"], ["1/20", "0,05", "5 %"]], [[1, 1]]),
          micros: ["proba_convertir"],
        },
        {
          enonce:
            "À la fête du village, on tire une bille au hasard dans un sac : une bille verte fait gagner. Le sac A contient $3$ billes vertes et $5$ grises ; le sac B, $4$ vertes et $6$ grises.\na) Calculer la probabilité de gagner avec chaque sac.\nb) Quel sac vaut-il mieux choisir ?",
          correction:
            "a) Sac A : $3$ vertes sur $3 + 5 = 8$ billes, donc $P_A = \\dfrac{3}{8}$. Sac B : $4$ vertes sur $4 + 6 = 10$ billes, donc $P_B = \\dfrac{4}{10}$.\nb) Pour comparer, j'écris les deux en décimal : $\\dfrac{3}{8} = 0{,}375$ et $\\dfrac{4}{10} = 0{,}4$. Comme $0{,}4 > 0{,}375$, le sac B donne un peu plus de chances de gagner.\n⛔ Le piège : choisir le sac A « parce qu'il a moins de billes grises » ($5$ contre $6$). On compare des PROBABILITÉS, pas des nombres de billes.\nRéponse : $P_A = 0{,}375$ et $P_B = 0{,}4$ : je choisis le sac B.",
          schema: deux(
            nomme("Sac A", billes([{ couleur: V }, { couleur: V }, { couleur: V }, { couleur: G }, { couleur: G }, { couleur: G }, { couleur: G }, { couleur: G }])),
            nomme("Sac B", billes([{ couleur: V }, { couleur: V }, { couleur: V }, { couleur: V }, { couleur: G }, { couleur: G }, { couleur: G }, { couleur: G }, { couleur: G }, { couleur: G }])),
          ),
          micros: ["proba_comparer"],
        },
        {
          enonce:
            "Sur un cycle de $100$ secondes, un feu tricolore reste $45$ s au vert, $3$ s à l'orange et $52$ s au rouge. Un cycliste arrive au feu à un instant pris au hasard.\na) Calculer la probabilité qu'il arrive au vert, à l'orange, puis au rouge.\nb) Calculer de deux façons la probabilité qu'il n'arrive PAS au vert.\nc) Écrire ces probabilités en pourcentage.",
          correction:
            "a) Chaque instant du cycle a la même chance : la probabilité d'une couleur est sa durée divisée par $100$. $P(\\text{vert}) = \\dfrac{45}{100} = 0{,}45$ ; $P(\\text{orange}) = \\dfrac{3}{100} = 0{,}03$ ; $P(\\text{rouge}) = \\dfrac{52}{100} = 0{,}52$.\nb) « Pas au vert » est le CONTRAIRE de « au vert » : $1 - 0{,}45 = 0{,}55$.\nAutre façon : pas au vert, c'est à l'orange ou au rouge : $0{,}03 + 0{,}52 = 0{,}55$. Les deux calculs donnent le même résultat.\nc) $45$ % au vert, $3$ % à l'orange, $52$ % au rouge, et $55$ % de ne pas avoir le vert.\n⛔ Le piège : « trois couleurs, donc une chance sur trois d'avoir le vert ». Les trois couleurs ne durent pas le même temps.\nRéponse : $0{,}45$ ; $0{,}03$ ; $0{,}52$ ; pas au vert : $0{,}55$, soit $55$ %.",
          schema: roue([{ label: "vert", poids: 45, couleur: V }, { label: "orange", poids: 3, couleur: O }, { label: "rouge", poids: 52, couleur: R }]),
          micros: ["proba_evenement", "proba_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme en devoir : compter les cas, écrire la probabilité de trois façons, comparer.",
      rappel: [
        "Je compte les CAS (jetons, cartes, tickets, élèves), pas les sortes : trois couleurs ne font pas trois chances égales.",
        "Le CONTRAIRE : $P(\\text{non } A) = 1 - P(A)$. La somme des probabilités de toutes les issues vaut $1$.",
        "Pour COMPARER deux probabilités, je les écris de la même façon, en décimal de préférence.",
      ],
      exercices: [
        {
          enonce:
            "Un paquet contient $25$ bonbons de même forme : $10$ à la fraise, $9$ au citron et $6$ à la menthe. Sans regarder, Inès en prend un.\na) Combien y a-t-il de cas possibles ? Les trois goûts ont-ils la même chance ?\nb) Calculer la probabilité de chaque goût, en fraction puis en pourcentage.\nc) Ranger les goûts du plus probable au moins probable, puis vérifier que les trois probabilités font $1$.",
          correction:
            "a) Chaque BONBON est un cas possible : $25$ cas, qui ont tous la même chance. Les goûts, eux, ne sont pas équiprobables : il y a plus de bonbons à la fraise.\nb) $P(\\text{fraise}) = \\dfrac{10}{25} = \\dfrac{2}{5} = 0{,}4$, soit $40$ %.\n$P(\\text{citron}) = \\dfrac{9}{25} = 0{,}36$, soit $36$ %.\n$P(\\text{menthe}) = \\dfrac{6}{25} = 0{,}24$, soit $24$ %.\nc) $0{,}4 > 0{,}36 > 0{,}24$ : la fraise, puis le citron, puis la menthe.\n⭐ Contrôle : $0{,}4 + 0{,}36 + 0{,}24 = 1$.\n⛔ Le piège : diviser par $3$, le nombre de goûts. Je divise par le nombre de BONBONS, $25$.\nRéponse : fraise $\\dfrac{2}{5}$ ($40$ %), citron $\\dfrac{9}{25}$ ($36$ %), menthe $\\dfrac{6}{25}$ ($24$ %).",
          schema: billes([{ couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: J }, { couleur: V }, { couleur: V }, { couleur: V }, { couleur: V }, { couleur: V }, { couleur: V }]),
          micros: ["proba_issue", "proba_calculer_fraction", "proba_convertir", "proba_comparer"],
        },
        {
          enonce:
            "On lance un dé équilibré à $8$ faces, numérotées de $1$ à $8$.\na) Calculer la probabilité des événements $A$ : « obtenir un diviseur de $8$ » et $B$ : « obtenir un multiple de $3$ ».\nb) Calculer la probabilité de $C$ : « obtenir plus de $8$ », puis de $D$ : « obtenir au plus $8$ ». Comment appelle-t-on ces deux événements ?\nc) Décrire l'événement contraire de $A$ et calculer sa probabilité.",
          correction:
            "Les $8$ faces ont la même chance : je compte les faces favorables et je divise par $8$.\na) Les diviseurs de $8$ sont les nombres qui divisent $8$ exactement : $1$, $2$, $4$ et $8$. $P(A) = \\dfrac{4}{8} = \\dfrac{1}{2}$.\nLes multiples de $3$ sur le dé : $3$ et $6$. $P(B) = \\dfrac{2}{8} = \\dfrac{1}{4}$.\nb) Aucune face ne dépasse $8$ : $P(C) = 0$, $C$ est impossible. Toutes les faces valent au plus $8$ : $P(D) = 1$, $D$ est certain.\nc) Le contraire de $A$ est « obtenir un nombre qui ne divise pas $8$ », réalisé par $3$, $5$, $6$ et $7$. $P = 1 - \\dfrac{1}{2} = \\dfrac{1}{2}$.\n⛔ Le piège au a) : oublier $1$ et $8$ parmi les diviseurs de $8$. Tout nombre est divisible par $1$ et par lui-même.\nRéponse : $P(A) = \\dfrac{1}{2}$ ; $P(B) = \\dfrac{1}{4}$ ; $P(C) = 0$ ; $P(D) = 1$ ; contraire de $A$ : $\\dfrac{1}{2}$.",
          schema: tableauProba(["Face", "Divise 8", "Multiple de 3"], [["1", "oui", "non"], ["2", "oui", "non"], ["3", "non", "oui"], ["4", "oui", "non"], ["5", "non", "non"], ["6", "non", "oui"], ["7", "non", "non"], ["8", "oui", "non"]], [[0, 1], [1, 1], [3, 1], [7, 1]]),
          micros: ["proba_evenement", "proba_calculer_fraction"],
        },
        {
          enonce:
            "Une roue de loterie est partagée en quatre secteurs : bleu ($90°$), rouge ($60°$), vert ($120°$) et jaune ($90°$).\na) Lou affirme : « quatre couleurs, donc une chance sur quatre pour chacune ». A-t-elle raison ?\nb) Calculer la probabilité de chaque couleur.\nc) Quelle couleur est la plus probable ? Laquelle est la moins probable ?",
          figure: roue([{ label: "bleu", poids: 90, couleur: B }, { label: "rouge", poids: 60, couleur: R }, { label: "vert", poids: 120, couleur: V }, { label: "jaune", poids: 90, couleur: J }]),
          correction:
            "a) Non : les secteurs n'ont pas la même taille, donc les couleurs n'ont pas la même chance. Elle n'a raison que pour le bleu et le jaune, qui font chacun un quart du tour.\nb) Un tour complet fait $360°$ ; la probabilité d'une couleur est l'angle de son secteur divisé par $360$.\n$P(\\text{bleu}) = \\dfrac{90}{360} = \\dfrac{1}{4}$ ; $P(\\text{rouge}) = \\dfrac{60}{360} = \\dfrac{1}{6}$ ; $P(\\text{vert}) = \\dfrac{120}{360} = \\dfrac{1}{3}$ ; $P(\\text{jaune}) = \\dfrac{90}{360} = \\dfrac{1}{4}$.\nc) Le plus grand secteur donne la plus grande probabilité : le vert est le plus probable, le rouge le moins probable.\n⭐ Contrôle : $\\dfrac{3}{12} + \\dfrac{2}{12} + \\dfrac{4}{12} + \\dfrac{3}{12} = 1$.\n⛔ Le piège : compter les couleurs sans regarder les secteurs. « Une chance sur quatre » suppose quatre secteurs égaux.\nRéponse : vert $\\dfrac{1}{3}$, bleu et jaune $\\dfrac{1}{4}$, rouge $\\dfrac{1}{6}$ ; le vert est le plus probable.",
          schema: tableauProba(["Couleur", "Angle", "Probabilité"], [["bleu", "90°", "1/4"], ["rouge", "60°", "1/6"], ["vert", "120°", "1/3"], ["jaune", "90°", "1/4"], ["total", "360°", "1"]], [[2, 2]]),
          micros: ["proba_equiprobabilite", "proba_comparer"],
        },
        {
          enonce:
            "Pour la kermesse du collège, on vend $200$ tickets de tombola. Un seul ticket gagne le gros lot, $15$ tickets gagnent un petit lot, les autres ne gagnent rien. Léo achète un ticket.\na) Calculer la probabilité qu'il gagne le gros lot, puis un petit lot. Donner chaque résultat en décimal et en pourcentage.\nb) Calculer la probabilité qu'il gagne quelque chose.\nc) En déduire la probabilité qu'il ne gagne rien.",
          correction:
            "Les $200$ tickets ont la même chance : je divise le nombre de tickets favorables par $200$.\na) $P(\\text{gros lot}) = \\dfrac{1}{200} = 0{,}005$, soit $0{,}5$ %.\n$P(\\text{petit lot}) = \\dfrac{15}{200} = 0{,}075$, soit $7{,}5$ %.\nb) Gagner quelque chose : $1 + 15 = 16$ tickets. $P = \\dfrac{16}{200} = 0{,}08$, soit $8$ %.\nc) « Ne rien gagner » est le contraire de « gagner quelque chose » : $1 - 0{,}08 = 0{,}92$, soit $92$ %.\n⭐ Contrôle en comptant : $200 - 16 = 184$ tickets perdants, et $\\dfrac{184}{200} = 0{,}92$.\n⛔ Le piège au a) : écrire $0{,}5$ pour $\\dfrac{1}{200}$. $0{,}5$, c'est une chance sur deux ; $0{,}5$ %, une chance sur deux cents.\nRéponse : $0{,}005$ ($0{,}5$ %) ; $0{,}075$ ($7{,}5$ %) ; $0{,}08$ ; $0{,}92$, soit $92$ %.",
          schema: tableauProba(["Ticket", "Nombre", "Probabilité", "Pourcentage"], [["gros lot", "1", "0,005", "0,5 %"], ["petit lot", "15", "0,075", "7,5 %"], ["perdant", "184", "0,92", "92 %"], ["total", "200", "1", "100 %"]], [[2, 3]]),
          micros: ["proba_calculer_fraction", "proba_convertir", "proba_evenement"],
        },
        {
          enonce:
            "Quatre stands de fête foraine annoncent leurs chances de gagner : stand A, « une chance sur $4$ » ; stand B, $0{,}4$ ; stand C, $35$ % ; stand D, $\\dfrac{3}{5}$.\na) Écrire les quatre probabilités sous forme décimale.\nb) Les ranger de la plus petite à la plus grande. Quel stand donne le plus de chances de gagner ?\nc) Sami dit : « $35$ est plus grand que $0{,}4$, donc le stand C bat le stand B ». Qu'en penser ?",
          correction:
            "a) A : $\\dfrac{1}{4} = 0{,}25$ ; B : $0{,}4$ ; C : $\\dfrac{35}{100} = 0{,}35$ ; D : $\\dfrac{3}{5} = 0{,}6$.\nb) Écrits de la même façon, ils se comparent comme des décimaux : $0{,}25 < 0{,}35 < 0{,}4 < 0{,}6$. L'ordre est A, C, B, D : le stand D donne le plus de chances de gagner.\nc) Sami compare $35$ et $0{,}4$, deux écritures différentes. En décimal, $35$ % vaut $0{,}35$, plus petit que $0{,}4$ : c'est le stand B qui bat le stand C.\n⛔ Le piège : comparer un pourcentage et un décimal sans les écrire de la même façon. Je mets tout en décimal d'abord.\nRéponse : $0{,}25 < 0{,}35 < 0{,}4 < 0{,}6$ ; le stand D est le plus avantageux.",
          schema: echelle([{ label: "A", valeur: 0.25 }, { label: "C", valeur: 0.35 }, { label: "B", valeur: 0.4 }, { label: "D", valeur: 0.6 }]),
          micros: ["proba_comparer", "proba_convertir"],
        },
        {
          enonce:
            "Dans une classe de $25$ élèves, $14$ sont des filles. $9$ élèves font du sport en club, dont $5$ filles. On choisit un élève au hasard pour représenter la classe au cross du collège.\na) Construire le tableau des effectifs (filles, garçons ; en club, pas en club).\nb) Calculer la probabilité que l'élève choisi soit une fille, puis qu'il fasse du sport en club.\nc) Calculer la probabilité que ce soit un garçon qui fait du sport en club. L'écrire en pourcentage.",
          correction:
            "a) Garçons : $25 - 14 = 11$. En club : $5$ filles, donc $9 - 5 = 4$ garçons. Pas en club : $14 - 5 = 9$ filles et $11 - 4 = 7$ garçons, soit $16$ élèves.\nb) Chaque élève a la même chance d'être choisi : $25$ cas possibles. $P(\\text{fille}) = \\dfrac{14}{25} = 0{,}56$ et $P(\\text{en club}) = \\dfrac{9}{25} = 0{,}36$.\nc) Un garçon en club : $4$ élèves. $P = \\dfrac{4}{25} = 0{,}16$, soit $16$ %.\n⛔ Le piège au c) : diviser par $11$, le nombre de garçons. On choisit un élève parmi les $25$ de la classe : le dénominateur est $25$.\nRéponse : $P(\\text{fille}) = 0{,}56$ ; $P(\\text{en club}) = 0{,}36$ ; un garçon en club : $\\dfrac{4}{25}$, soit $16$ %.",
          schema: tableauProba(["", "En club", "Pas en club", "Total"], [["Filles", "5", "9", "14"], ["Garçons", "4", "7", "11"], ["Total", "9", "16", "25"]], [[1, 1]]),
          micros: ["proba_issue", "proba_calculer_fraction", "proba_convertir"],
        },
        {
          enonce:
            "Un sac contient $5$ jetons : $3$ jaunes et $2$ noirs. Nina a calculé des probabilités, mais certaines sont impossibles : $\\dfrac{5}{3}$ ; $0{,}6$ ; $-0{,}4$ ; $120$ % ; $\\dfrac{2}{5}$.\na) Lesquels de ces nombres ne peuvent PAS être des probabilités ? Pourquoi ?\nb) Retrouver la probabilité de tirer un jeton jaune, puis un jeton noir.\nc) D'où vient sans doute l'erreur $\\dfrac{5}{3}$ ?",
          correction:
            "a) Une probabilité est toujours comprise entre $0$ (impossible) et $1$ (certain). $\\dfrac{5}{3} \\approx 1{,}67$ dépasse $1$ ; $-0{,}4$ est négatif ; $120$ %, c'est $1{,}2$, qui dépasse $1$. Ces trois nombres ne sont PAS des probabilités.\nb) $3$ jaunes sur $5$ jetons : $P(\\text{jaune}) = \\dfrac{3}{5} = 0{,}6$. $2$ noirs sur $5$ : $P(\\text{noir}) = \\dfrac{2}{5} = 0{,}4$.\n⭐ Contrôle : $0{,}6 + 0{,}4 = 1$.\nc) Nina a divisé le nombre TOTAL de jetons par le nombre de jaunes, $5 \\div 3$ : le quotient est renversé. On divise les cas favorables par les cas possibles, jamais l'inverse.\n⛔ Le piège : ne pas contrôler son résultat. Une probabilité plus grande que $1$, ou négative, signale toujours une erreur de calcul.\nRéponse : $\\dfrac{5}{3}$, $-0{,}4$ et $120$ % sont impossibles ; $P(\\text{jaune}) = 0{,}6$ et $P(\\text{noir}) = 0{,}4$.",
          // En vert, de 0 à 1 : les seules valeurs possibles. En rouge : les trois intrus.
          schema: echelle([{ label: "−0,4", valeur: -0.4 }, { label: "2/5", valeur: 0.4 }, { label: "0,6", valeur: 0.6 }, { label: "120 %", valeur: 1.2 }, { label: "5/3", valeur: 1.6667 }], -0.5, 1.8),
          micros: ["proba_defi", "proba_vocabulaire"],
        },
        {
          enonce:
            "Une roue de loterie a quatre couleurs. On sait que $P(\\text{rouge}) = 0{,}35$, $P(\\text{bleu}) = 0{,}25$ et $P(\\text{vert}) = 0{,}3$ ; le reste de la roue est jaune.\na) Calculer $P(\\text{jaune})$.\nb) Quelle est la probabilité de ne pas obtenir le rouge ? L'écrire en pourcentage.\nc) Combien de degrés mesure le secteur jaune ?",
          correction:
            "a) Les quatre couleurs sont toutes les issues : la somme de leurs probabilités vaut $1$. $P(\\text{jaune}) = 1 - (0{,}35 + 0{,}25 + 0{,}3) = 1 - 0{,}9 = 0{,}1$.\nb) « Ne pas obtenir le rouge » est le contraire de « obtenir le rouge » : $1 - 0{,}35 = 0{,}65$, soit $65$ %.\nc) Le secteur jaune occupe $0{,}1$ du tour complet : $0{,}1 \\times 360 = 36$, soit $36°$.\n⛔ Le piège au a) : croire qu'il manque une donnée. La somme des probabilités de toutes les issues vaut $1$ : c'est elle qui donne la dernière.\nRéponse : $P(\\text{jaune}) = 0{,}1$ ; $0{,}65$, soit $65$ % ; $36°$.",
          schema: roue([{ label: "rouge 0,35", poids: 35, couleur: R }, { label: "bleu 0,25", poids: 25, couleur: B }, { label: "vert 0,3", poids: 30, couleur: V }, { label: "jaune", poids: 10, couleur: J }]),
          micros: ["proba_defi", "proba_evenement", "proba_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : je repère ce qui a la même chance, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je repère ce qui a la même chance (un point de la surface, une place, un jeton), je compte les cas, puis je divise.",
        "Un pourcentage est une fraction sur $100$ : $71$ %, c'est $\\dfrac{71}{100}$, soit $0{,}71$.",
        "Je contrôle : une probabilité est entre $0$ et $1$, et les probabilités de toutes les issues font $1$.",
      ],
      exercices: [
        {
          titre: "La météorite",
          enonce:
            "La surface de la Terre mesure environ $510$ millions de km², dont environ $361$ millions de km² d'océans (NOAA). Une petite météorite tombe en un point pris au hasard à la surface de la Terre.\na) Mia dit : « deux issues, la mer ou la terre ferme, donc une chance sur deux ». Qu'en penser ?\nb) Calculer la probabilité qu'elle tombe dans un océan, arrondie au centième, puis en pourcentage.\nc) En déduire la probabilité qu'elle tombe sur la terre ferme.\nd) La France métropolitaine mesure environ $0{,}55$ million de km². Calculer la probabilité que la météorite y tombe, en pourcentage.",
          correction:
            "a) Mia se trompe : les deux issues n'ont pas la même chance. Ce sont les POINTS de la surface qui ont tous la même chance, et les océans en couvrent bien plus que les terres.\nb) Je divise la surface des océans par la surface totale : $P(\\text{océan}) = \\dfrac{361}{510} \\approx 0{,}71$, soit environ $71$ %.\nc) La terre ferme est le contraire de l'océan : $1 - 0{,}71 = 0{,}29$, soit environ $29$ %.\nd) $P(\\text{France}) = \\dfrac{0{,}55}{510} \\approx 0{,}001$, soit environ $0{,}1$ % : à peu près une chance sur mille.\n⛔ Le piège au a) : croire que deux issues font toujours une chance sur deux. Ici, l'océan est presque deux fois et demie plus probable que la terre ferme.\nRéponse : $P(\\text{océan}) \\approx 0{,}71$ ; $P(\\text{terre ferme}) \\approx 0{,}29$ ; France métropolitaine : environ $0{,}1$ %.",
          // Les deux secteurs à la vraie proportion : 361 et 149 millions de km².
          schema: roue([{ label: "océans 71 %", poids: 361, couleur: B }, { label: "terres 29 %", poids: 149, couleur: V }]),
          micros: ["proba_equiprobabilite", "proba_convertir", "proba_evenement"],
        },
        {
          titre: "Les espèces menacées",
          enonce:
            "Selon la Liste rouge de l'UICN (2024), environ $41$ % des espèces d'amphibiens évaluées sont menacées d'extinction, $26$ % des espèces de mammifères et $12$ % des espèces d'oiseaux. On choisit au hasard une espèce évaluée dans chacun de ces trois groupes.\na) Écrire ces trois probabilités sous forme de fraction sur $100$, puis sous forme décimale.\nb) Ranger les trois groupes, du plus menacé au moins menacé.\nc) Calculer la probabilité qu'une espèce d'oiseau choisie au hasard ne soit PAS menacée.\nd) Léna dit : « pour les amphibiens, c'est à peu près deux chances sur cinq ». A-t-elle raison ?",
          correction:
            "a) Un pourcentage est une fraction sur $100$ : amphibiens $\\dfrac{41}{100} = 0{,}41$ ; mammifères $\\dfrac{26}{100} = 0{,}26$ ; oiseaux $\\dfrac{12}{100} = 0{,}12$.\nb) $0{,}41 > 0{,}26 > 0{,}12$ : les amphibiens, puis les mammifères, puis les oiseaux. Une espèce d'amphibien a plus de trois fois plus de risques d'être menacée qu'une espèce d'oiseau.\nc) « Pas menacée » est le contraire de « menacée » : $1 - 0{,}12 = 0{,}88$, soit $88$ %.\nd) $\\dfrac{2}{5} = 0{,}4$, très proche de $0{,}41$ : oui, c'est à peu près deux chances sur cinq, et même un peu plus.\n⛔ Le piège au c) : répondre $0{,}12$. $12$ % est la probabilité d'être MENACÉE ; « pas menacée » est l'événement contraire, il se calcule.\nRéponse : $0{,}41$, $0{,}26$ et $0{,}12$ ; amphibiens, mammifères, oiseaux ; $0{,}88$ ; oui, $\\dfrac{2}{5} = 0{,}4$.",
          schema: diagramme("barres", [{ label: "amphibiens", value: 41 }, { label: "mammifères", value: 26 }, { label: "oiseaux", value: 12 }], 0),
          micros: ["proba_comparer", "proba_convertir", "proba_evenement"],
        },
        {
          titre: "Les places de la Coupe du monde",
          enonce:
            "La Coupe du monde de football 2026 réunit $48$ équipes. La FIFA a réparti les places ainsi : Europe $16$, Afrique $9$, Asie $8$, Amérique du Sud $6$, Amérique du Nord, centrale et Caraïbes $6$, Océanie $1$, et $2$ places gagnées par des barrages entre continents. Pour une émission, on tire au sort une des $48$ places.\na) Calculer la probabilité que la place tirée soit européenne, puis africaine.\nb) Calculer la probabilité qu'elle ne soit pas européenne.\nc) Qu'est-ce qui est le plus probable : une place d'Asie, ou une place d'Amérique (Sud et Nord réunis) ?",
          correction:
            "Les $48$ places ont la même chance d'être tirées : je compte les places favorables et je divise par $48$.\na) $P(\\text{Europe}) = \\dfrac{16}{48} = \\dfrac{1}{3} \\approx 0{,}33$. $P(\\text{Afrique}) = \\dfrac{9}{48} = \\dfrac{3}{16} = 0{,}1875$, soit environ $19$ %.\nb) C'est le contraire de « européenne » : $1 - \\dfrac{1}{3} = \\dfrac{2}{3} \\approx 0{,}67$.\n⭐ Contrôle en comptant : $48 - 16 = 32$ places, et $\\dfrac{32}{48} = \\dfrac{2}{3}$.\nc) Asie : $\\dfrac{8}{48} = \\dfrac{1}{6} \\approx 0{,}17$. Amérique : $6 + 6 = 12$ places, $\\dfrac{12}{48} = \\dfrac{1}{4} = 0{,}25$. Une place d'Amérique est plus probable.\n⛔ Le piège : « sept groupes de places, donc une chance sur sept pour l'Europe ». Les groupes n'ont pas la même taille : je compte les PLACES.\nRéponse : $\\dfrac{1}{3}$ et $\\dfrac{3}{16}$ ; $\\dfrac{2}{3}$ ; l'Amérique ($\\dfrac{1}{4}$) plus que l'Asie ($\\dfrac{1}{6}$).",
          schema: tableauProba(["Zone", "Places", "Probabilité"], [["Europe", "16", "16/48"], ["Afrique", "9", "9/48"], ["Asie", "8", "8/48"], ["Am. du Sud", "6", "6/48"], ["Am. du Nord", "6", "6/48"], ["Océanie", "1", "1/48"], ["Barrages", "2", "2/48"], ["Total", "48", "1"]], [[0, 1], [0, 2]]),
          micros: ["proba_calculer_fraction", "proba_comparer", "proba_evenement"],
        },
        {
          titre: "Le sac des insectes",
          enonce:
            "Pour un jeu sur les petites bêtes du jardin, une animatrice remplit un sac de jetons « abeille », « papillon » et « coccinelle ». Elle veut que la probabilité de tirer une abeille soit $0{,}25$ et celle de tirer un papillon $0{,}4$ ; les autres jetons sont des coccinelles.\na) Calculer la probabilité de tirer une coccinelle.\nb) Écrire $0{,}25$ et $0{,}4$ sous forme de fractions simplifiées.\nc) Combien lui faut-il de jetons de chaque sorte, au minimum ?\nd) Avec $60$ jetons, combien en faudrait-il de chaque sorte ?",
          correction:
            "a) Les trois sortes de jetons sont toutes les issues : $P(\\text{coccinelle}) = 1 - 0{,}25 - 0{,}4 = 0{,}35$.\nb) $0{,}25 = \\dfrac{25}{100} = \\dfrac{1}{4}$ et $0{,}4 = \\dfrac{4}{10} = \\dfrac{2}{5}$.\nc) Il faut qu'un quart des jetons soient des abeilles et deux cinquièmes des papillons : le nombre total doit être un multiple de $4$ ET de $5$. Le plus petit est $20$.\nAbeilles : $\\dfrac{1}{4}$ de $20$, soit $5$ ; papillons : $\\dfrac{2}{5}$ de $20$, soit $8$ ; coccinelles : $20 - 5 - 8 = 7$.\n⭐ Contrôle : $\\dfrac{7}{20} = 0{,}35$, comme au a).\nd) $60$ jetons, c'est $3$ fois plus : $15$ abeilles, $24$ papillons et $21$ coccinelles.\n⛔ Le piège au c) : prendre $25$ abeilles, $40$ papillons et $35$ coccinelles « pour lire les pourcentages ». Les probabilités sont justes, mais ce n'est pas le minimum : $100$ jetons au lieu de $20$.\nRéponse : $0{,}35$ ; $\\dfrac{1}{4}$ et $\\dfrac{2}{5}$ ; $5$ abeilles, $8$ papillons, $7$ coccinelles ; $15$, $24$ et $21$.",
          schema: billes([{ label: "A", couleur: J }, { label: "A", couleur: J }, { label: "A", couleur: J }, { label: "A", couleur: J }, { label: "A", couleur: J }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "P", couleur: B }, { label: "C", couleur: R }, { label: "C", couleur: R }, { label: "C", couleur: R }, { label: "C", couleur: R }, { label: "C", couleur: R }, { label: "C", couleur: R }, { label: "C", couleur: R }]),
          micros: ["proba_defi", "proba_convertir", "proba_calculer_fraction"],
        },
      ],
    },
  ],
};
