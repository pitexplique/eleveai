// ─── Fiche de cours : les vecteurs du plan (2de) ──────────────────────────────
//
// Neuvième fiche de seconde, et la dernière notion du contrôle commun de
// mars 2025. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/vecteurs-plan.bank.ts
// (notion vecteurs_plan), et sur la 5e comme étalon.
//
// ⭐ CE QUE LA MESURE A CHANGÉ AU COACH, le 09/09/2026 : sur les 60 items de la
// notion, 40 travaillaient EN COORDONNÉES et les 20 autres étaient tous FIXES —
// pas un seul générateur ne fonctionnait sans repère. Or l'exercice 3 du
// contrôle est entièrement « vecteurs SANS repérage ». Deux micros ont été
// écrites pour ça : `vecteur_chasles_calcul` et `vecteur_point_defini`.
//
// ⛔ ET LA SOUSTRACTION N'EXISTAIT NULLE PART : zéro item sur AB − AC, qui est
// pourtant LE piège de Chasles. La fiche lui donne un piège et un exercice.
//
// ⭐ L'IDÉE DIRECTRICE : un vecteur n'est pas un objet posé quelque part, c'est
// un DÉPLACEMENT. Il n'a pas de position — seulement une direction, un sens et
// une longueur. C'est ce qui explique que deux flèches éloignées puissent être
// le même vecteur, et c'est le point qui bloque le plus d'élèves.
//
// Micro-compétences couvertes :
// - vecteur_definition       → définition, propriété « Trois données », exemple 1
// - vecteur_egalite          → propriété « Deux vecteurs égaux », usages, exo 2
// - vecteur_somme            → propriété « Chasles », exemple 2
// - vecteur_chasles_calcul   → méthode entière, exemples 2-3, exos 3-4-5-6
// - vecteur_point_defini     → usages « Placer un point », exemple 4, exos 7-8
// - vecteur_coordonnees      → propriété « En coordonnées », exo 9
// - vecteur_norme            → propriété « En coordonnées », exo 10
// - vecteur_colinearite      → usages « Prouver un alignement »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * ⛔ PLUS AUCUN TABLEAU DANS CETTE FICHE — Frédéric, 09/09/2026 : « j'ai du
 * mal avec les tableaux, je préfère dessin et schéma », puis « tu n'auras pas de
 * problème de largeur, et utilise les couleurs ».
 *
 * Le helper `tableau()` a donc été RETIRÉ. Trois raisons, dont deux mesurées :
 *
 * 1. ⛔ UN TABLEAU DE QUATRE COLONNES NE TIENT PAS dans une carte de propriété.
 *    Captures à l'appui : barre de défilement horizontale, colonnes coupées
 *    (« erreu classiq »), et « AB + BC + CA » empilé un terme par ligne.
 * 2. ⛔ IL NE SAIT PAS ÉCRIRE UNE FLÈCHE. `tableau_donnees` ne traverse jamais
 *    `TexteMath`, donc aucune notation vectorielle ; et la flèche Unicode
 *    U+20D7 ne se compose pas — mesuré dans le tableau lui-même, elle ajoute
 *    9 px au lieu de 0, donc elle s'affiche comme un glyphe séparé.
 * 3. ⭐ ET SURTOUT : un tableau qui dit « la lettre du milieu disparaît » est une
 *    PÉRIPHRASE. La formule avec le B en rouge le dit d'un coup d'œil.
 *
 * À la place : `figureVecteurs` pour ce qui est une POSITION, `egalite` pour ce
 * qui est un CALCUL. Les deux rendent du vrai KaTeX, donc de vraies flèches.
 */

/**
 * ⭐ DESSINER UN VECTEUR — ajouté le 09/09/2026, Frédéric : « ce qui me dérange,
 * c'est aucun dessin ». Une fiche sur les vecteurs sans une seule flèche,
 * pendant que la règle du site demande un visuel par bloc.
 *
 * ⛔ AUCUN CANVAS NE SAIT DESSINER UN VECTEUR. Le catalogue en compte trente-cinq
 * et pas un ne trace de flèche entre deux points — c'est pour ça que la fiche
 * était vide. On le fabrique donc avec `fonctionGraphique`, dont le champ
 * `courbes` accepte PLUSIEURS polylignes : une pour la hampe, deux pour les
 * barbes de la pointe. Trois polylignes de la même couleur font une flèche.
 *
 * ⚠️ LA FENÊTRE DOIT ÊTRE CARRÉE, sinon la pointe part de travers : le canvas
 * met à l'échelle x et y indépendamment. On garde donc `xmax - xmin` égal à
 * `ymax - ymin`, et une taille 220 × 220.
 */
function fleche(
  id: string,
  de: { x: number; y: number },
  vers: { x: number; y: number },
  couleur: string,
) {
  const dx = vers.x - de.x;
  const dy = vers.y - de.y;
  const L = Math.hypot(dx, dy);
  const [ux, uy] = [dx / L, dy / L];
  // Une barbe part de la pointe, en arrière, à 30° de part et d'autre de l'axe.
  const r = Math.min(0.55, L * 0.22);
  const barbe = (angle: number) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: +(vers.x + r * (ux * c - uy * s)).toFixed(3),
      y: +(vers.y + r * (ux * s + uy * c)).toFixed(3),
    };
  };
  const a = (150 * Math.PI) / 180;
  return [
    { id: `${id}-hampe`, type: "points" as const, couleur, points: [de, vers] },
    { id: `${id}-b1`, type: "points" as const, couleur, points: [vers, barbe(a)] },
    { id: `${id}-b2`, type: "points" as const, couleur, points: [vers, barbe(-a)] },
  ];
}

/**
 * Le repère qui accueille les flèches — SVG, donc réservé à `proprietes`
 * (225 px) et `usages` (220 px), et fenêtre étroite : la leçon des treize
 * étiquettes qui se chevauchaient est payée depuis la fiche du repère.
 *
 * ⛔ Aucun point ne se pose SUR le bord : son étiquette déborderait. Une unité
 * de marge au minimum.
 */
function figureVecteurs(
  courbes: ReturnType<typeof fleche>[],
  points: { x: number; y: number; label: string; couleur?: string }[],
  fenetre: { min: number; max: number },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 220, height: 220 },
        xmin: fenetre.min,
        xmax: fenetre.max,
        ymin: fenetre.min,
        ymax: fenetre.max,
        grille: true,
        courbes: courbes.flat(),
        points,
      }}
    />
  );
}

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#059669";

/**
 * ⭐ UNE ÉGALITÉ, PAS UN TABLEAU — Frédéric, 09/09/2026 : « tu fais des tableaux
 * mais des schémas c'est plus simple : AB + BC = AC avec B colorié en rouge ».
 *
 * Il a raison, et sur deux plans à la fois. Un tableau de quatre colonnes pour
 * dire « la lettre du milieu disparaît » est une PÉRIPHRASE : il faut lire
 * l'en-tête, puis la cellule, puis faire le lien. La formule avec le B en rouge
 * le dit d'un coup d'œil.
 *
 * ⭐ Et ça règle du même geste le problème des flèches. `tableau_donnees` ne
 * traverse jamais `TexteMath`, donc il ne sait écrire ni $\vec{AB}$ ni sa flèche
 * Unicode (mesuré : le diacritique combinant ajoute 9 px au lieu de 0, il ne se
 * compose pas). Ici on rend du VRAI KaTeX : la flèche est celle du cours.
 *
 * ⚠️ `schema` est un `ReactNode` rendu tel quel par `FicheCoursClient` — on peut
 * donc y mettre n'importe quel JSX, et pas seulement un canvas.
 */
function egalite(tex: string, legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center">
      <div className="text-lg text-slate-900">
        <TexteMath>{`$${tex}$`}</TexteMath>
      </div>
      {legende ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/** La même chose, avec deux lignes : l'énoncé puis sa conclusion. */
function egalites(lignes: string[], legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center">
      {lignes.map((l, i) => (
        <div key={i} className={`text-lg text-slate-900 ${i ? "mt-2" : ""}`}>
          <TexteMath>{`$${l}$`}</TexteMath>
        </div>
      ))}
      {legende ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/** La lettre qu'on veut faire ressortir, en rouge. */
const R = (s: string) => `\\textcolor{${ROUGE}}{${s}}`;

/**
 * ⭐ UN DESSIN QUI SE DÉPLACE — Frédéric, 09/09/2026 : « outil : translation de
 * A vers B, tu peux monter un dessin qui se déplace ».
 *
 * C'est LA bonne image pour ouvrir le chapitre : un vecteur n'est pas une
 * flèche posée quelque part, c'est l'ORDRE DE BOUGER que cette flèche donne. Un
 * triangle qui glisse le long du vecteur le dit mieux que n'importe quelle
 * phrase — et il le dit avant qu'on ait défini quoi que ce soit.
 *
 * ⚠️ SMIL (`<animateTransform>`) et non CSS : l'animation vit alors DANS le SVG,
 * donc elle survit au `dangerouslySetInnerHTML` comme au rendu serveur, sans
 * feuille de style à embarquer.
 *
 * ⚠️ ET ELLE S'ARRÊTE POUR QUI LE DEMANDE. `prefers-reduced-motion` coupe le
 * mouvement — la figure reste alors lisible : la position de départ et la
 * position d'arrivée sont dessinées en dur, seule la copie qui glisse disparaît.
 * ⛔ À l'impression aussi : un PDF ne bouge pas, et une forme figée au milieu du
 * trajet serait incompréhensible. D'où `print:hidden` sur la seule copie mobile.
 */
function translationAnimee() {
  const A = { x: 30, y: 120 };
  const B = { x: 150, y: 60 };
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  // Le motif qui glisse : un petit triangle, dessine autour de l'origine.
  const motif = "-14,10 14,10 0,-14";
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 200 160" className="w-full" role="img"
        aria-label="Un triangle glisse de A vers B le long du vecteur AB">
        <defs>
          <marker id="pointe-vec" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={BLEU} />
          </marker>
        </defs>

        {/* Le vecteur, qui ne bouge pas : c'est la CONSIGNE. */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={BLEU} strokeWidth="2.5"
          markerEnd="url(#pointe-vec)" />
        <circle cx={A.x} cy={A.y} r="3.5" fill={VERT} />
        <circle cx={B.x} cy={B.y} r="3.5" fill={VERT} />
        <text x={A.x - 12} y={A.y + 6} fontSize="14" fill={VERT} fontWeight="700">A</text>
        <text x={B.x + 7} y={B.y + 4} fontSize="14" fill={VERT} fontWeight="700">B</text>

        {/* Depart et arrivee, en pointilles : la figure reste lisible a l'arret. */}
        <polygon points={motif} transform={`translate(${A.x} ${A.y + 22})`}
          fill="none" stroke={ROUGE} strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points={motif} transform={`translate(${B.x} ${B.y + 22})`}
          fill="none" stroke={ROUGE} strokeWidth="1.5" strokeDasharray="4 3" />

        {/* La copie qui glisse. */}
        <g className="motion-safe:block motion-reduce:hidden print:hidden">
          <polygon points={motif} fill={ROUGE} fillOpacity="0.75">
            <animateTransform attributeName="transform" type="translate"
              values={`${A.x} ${A.y + 22}; ${A.x + dx} ${A.y + dy + 22}; ${A.x} ${A.y + 22}`}
              keyTimes="0; 0.55; 1" dur="3.2s" repeatCount="indefinite"
              calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
          </polygon>
        </g>
      </svg>
      <p className="mt-1 text-center text-xs leading-5 text-slate-500">
        Le vecteur bleu ne bouge pas : c&apos;est l&apos;ordre de se déplacer. Le triangle rouge
        obéit.
      </p>
    </div>
  );
}

export const ficheVecteursSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "vecteurs-plan",
  titre: "Les vecteurs du plan",
  accroche:
    "Un vecteur n'est pas un point : c'est un DÉPLACEMENT. Il ne dit pas où l'on est, il dit de combien on bouge et dans quelle direction. Deux flèches situées à l'autre bout de la figure peuvent donc être le même vecteur — et c'est ce qui va tout simplifier.",
  // ⛔⛔ CE BLOC SE LIT AVANT LE COURS — Frédéric, 09/09/2026 : « l'élève qui
  // arrive au début ne comprend pas, Chasles n'a pas été abordé ». Ma première
  // version y mettait « Chasles, dans les deux sens » et « la différence
  // retourne les lettres » : deux phrases qui ne veulent rien dire tant qu'on
  // n'a pas lu la fiche. Elles annonçaient la conclusion à qui n'a pas encore
  // la question.
  // ⭐ LA RÈGLE : l'identité se rédige avec les mots de QUELQU'UN QUI NE SAIT
  // PAS ENCORE. Aucun nom propre, aucune formule, aucun terme que la fiche
  // elle-même doit introduire.
  // ⛔ Et pas de formule longue non plus : le bloc est étroit et KaTeX ne coupe
  // pas — mesuré au rendu, « $\vec{AB} - \vec{AC} = \vec{CB}$ » s'empilait en
  // cinq lignes d'un terme chacune.
  identite: [
    { label: "Mots clés", valeur: "Déplacement, direction, sens, longueur" },
    { label: "Le secret", valeur: "Un vecteur n'a pas de place : on peut le déplacer" },
    { label: "Outil", valeur: "La translation qui va de A vers B" },
  ],

  definition: {
    texte:
      "Le vecteur $\\vec{AB}$ est le déplacement qui mène de $A$ à $B$. Il est défini par trois données seulement : sa DIRECTION (celle de la droite $(AB)$), son SENS (de $A$ vers $B$) et sa NORME $\\|\\vec{AB}\\|$, qui est la longueur $AB$. ⭐ Aucune de ces trois données ne dit OÙ se trouve le vecteur : il n'a pas de position.",
  },

  figure: {
    schema: translationAnimee(),
    legende:
      "$\\vec{AB}$ est la TRANSLATION qui mène de $A$ à $B$. Le triangle ne fait qu'obéir : il garde sa forme, sa taille et son orientation, et se contente de glisser. ⭐ C'est pour cela qu'un vecteur n'a pas de position — il ne dit pas OÙ l'on est, il dit COMMENT bouger.",
  },

  proprietes: [
    {
      titre: "Deux vecteurs égaux, c'est un parallélogramme",
      texte:
        "⭐ $ABCD$ est un parallélogramme SI ET SEULEMENT SI $\\vec{AB} = \\vec{DC}$. Ces deux vecteurs sont les côtés $[AB]$ et $[DC]$ : même direction, même sens, même longueur — c'est exactement ce que dit un parallélogramme. ⚠️ Bien $\\vec{DC}$, et non $\\vec{CD}$ : il faut parcourir le second côté dans le MÊME sens que le premier.",
      // A(1;1) B(4;2) C(5;5) D(2;4) : AB⃗ = C − D = (3;1) = DC⃗, et ABCD est bien
      // un parallelogramme. Les deux fleches sont PARALLELES et de MEME LONGUEUR
      // a l'ecran — c'est ce que l'eleve doit voir avant toute formule.
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 1 }, { x: 4, y: 2 }, BLEU),
          fleche("dc", { x: 2, y: 4 }, { x: 5, y: 5 }, BLEU),
        ],
        [
          { x: 1, y: 1, label: "A", couleur: ROUGE },
          { x: 4, y: 2, label: "B", couleur: ROUGE },
          { x: 5, y: 5, label: "C", couleur: ROUGE },
          { x: 2, y: 4, label: "D", couleur: ROUGE },
        ],
        { min: 0, max: 6 },
      ),
    },
    {
      titre: "La relation de Chasles",
      texte:
        "$\\vec{AB} + \\vec{BC} = \\vec{AC}$ : aller de $A$ à $B$ puis de $B$ à $C$, c'est aller de $A$ à $C$. La lettre du milieu DISPARAÎT — c'est le point de passage.",
      // Le chemin A → B → C en bleu, et le raccourci A → C en rouge. Les deux
      // arrivent au meme endroit : c'est TOUT Chasles, et ca se voit sans un mot.
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 1 }, { x: 4, y: 2 }, BLEU),
          fleche("bc", { x: 4, y: 2 }, { x: 5, y: 5 }, BLEU),
          fleche("ac", { x: 1, y: 1 }, { x: 5, y: 5 }, ROUGE),
        ],
        [
          { x: 1, y: 1, label: "A", couleur: VERT },
          { x: 4, y: 2, label: "B", couleur: VERT },
          { x: 5, y: 5, label: "C", couleur: VERT },
        ],
        { min: 0, max: 6 },
      ),
    },
    {
      titre: "⛔ La différence retourne les lettres",
      texte:
        "$\\vec{AB} - \\vec{AC} = \\vec{CB}$, et NON $\\vec{BC}$. Soustraire un vecteur, c'est ajouter son opposé : $-\\vec{AC} = \\vec{CA}$, donc $\\vec{AB} - \\vec{AC} = \\vec{CA} + \\vec{AB} = \\vec{CB}$. L'ordre du résultat est l'inverse de celui qu'on lit.",
      // Les deux vecteurs bleus partent du MEME point A — c'est la forme sous
      // laquelle le sujet pose la question. Le rouge, qui les joint, va de C
      // vers B : l'ordre inverse de celui qu'on lit dans « AB − AC ».
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 1 }, { x: 5, y: 2 }, BLEU),
          fleche("ac", { x: 1, y: 1 }, { x: 2, y: 5 }, BLEU),
          fleche("cb", { x: 2, y: 5 }, { x: 5, y: 2 }, ROUGE),
        ],
        [
          { x: 1, y: 1, label: "A", couleur: VERT },
          { x: 5, y: 2, label: "B", couleur: VERT },
          { x: 2, y: 5, label: "C", couleur: VERT },
        ],
        { min: 0, max: 6 },
      ),
    },
    {
      titre: "En coordonnées : une soustraction",
      texte:
        "Si $A(x_A \\,;\\, y_A)$ et $B(x_B \\,;\\, y_B)$, alors $\\vec{AB}\\,(x_B - x_A \\,;\\, y_B - y_A)$ — l'arrivée MOINS le départ. Ci-contre $A(1\\,;1)$ et $B(4\\,;5)$ donnent $\\vec{AB}\\,(3\\,;4)$, et les deux écarts verts forment le triangle rectangle qui donne la norme : $\\|\\vec{AB}\\| = \\sqrt{3^2+4^2} = 5$.",
      // A(1;1) et B(4;5) : le vecteur en bleu, et ses deux ECARTS en vert — 3
      // horizontalement, 4 verticalement. Le triangle rectangle qui donne la
      // norme apparait alors de lui-meme : 3, 4 et 5.
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 1 }, { x: 4, y: 5 }, BLEU),
          fleche("dx", { x: 1, y: 1 }, { x: 4, y: 1 }, VERT),
          fleche("dy", { x: 4, y: 1 }, { x: 4, y: 5 }, VERT),
        ],
        [
          { x: 1, y: 1, label: "A", couleur: ROUGE },
          { x: 4, y: 5, label: "B", couleur: ROUGE },
        ],
        { min: 0, max: 6 },
      ),
    },
  ],

  reel: {
    texte:
      "Un avion vole vers l'ouest à $800$ km/h et rencontre un vent du sud à $60$ km/h. Sa trajectoire réelle n'est ni l'une ni l'autre : c'est la SOMME des deux vecteurs vitesse, et le pilote doit corriger son cap pour compenser. C'est exactement la relation de Chasles, appliquée à des vitesses plutôt qu'à des points. Les vecteurs sont nés de là — de la nécessité de composer deux effets qui agissent en même temps.",
  },

  historique: {
    texte:
      "L'idée de composer deux déplacements est très ancienne — Aristote parlait déjà de mouvements combinés — mais le vecteur comme objet mathématique n'apparaît qu'au XIXᵉ siècle. Michel Chasles, dont la relation porte le nom, publie en 1852 ; Hermann Grassmann avait posé les bases d'une « théorie de l'extension » dès 1844, dans un livre que presque personne ne comprit à l'époque. Le mot « vecteur » vient du latin vehere, « transporter » — ce qui décrit bien ce que fait un déplacement.",
  },

  methode: [
    {
      titre: "Je cherche la lettre de passage",
      texte:
        "Dans une somme, deux vecteurs s'enchaînent quand l'arrivée du premier est le départ du second. Cette lettre-là disparaît.",
      schema: egalite(
        `\\vec{A${R("B")}} + \\vec{${R("B")}C} = \\vec{AC}`,
        "La lettre rouge est le point de passage : elle disparaît.",
      ),
    },
    {
      titre: "Je réorganise si besoin",
      texte:
        "Une somme se réordonne librement. $\\vec{AB} + \\vec{CD} + \\vec{BC}$ ne s'enchaîne pas tel quel — remis dans l'ordre, il devient $\\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AD}$.",
      schema: egalites(
        [
          `\\vec{AB} + \\vec{CD} + ${R("\\vec{BC}")}`,
          `\\vec{AB} + ${R("\\vec{BC}")} + \\vec{CD} = \\vec{AD}`,
        ],
        "Le vecteur rouge remonte d'un cran, et la chaîne se referme.",
      ),
    },
    {
      titre: "Je coupe quand je bloque",
      texte:
        "Chasles se lit aussi à l'envers : $\\vec{AB} = \\vec{AM} + \\vec{MB}$ pour N'IMPORTE quel point $M$. Insérer un point de passage bien choisi débloque presque tous les exercices sans repérage.",
      schema: egalite(
        `\\vec{AB} = \\vec{A${R("M")}} + \\vec{${R("M")}B}`,
        "Le point rouge est libre : on le choisit.",
      ),
    },
  ],

  usages: [
    {
      titre: "Prouver un parallélogramme",
      detail:
        "$ABCD$ est un parallélogramme si et seulement si $\\vec{AB} = \\vec{DC}$. ⭐ C'est la deuxième preuve du programme, à côté de celle par les milieux des diagonales — et celle-ci ne demande aucun repère.",
      schema: egalites(
        [
          `\\vec{${R("AB")}} = \\vec{${R("DC")}}`,
          "\\Updownarrow",
          "ABCD \\text{ parallélogramme}",
        ],
        "Les deux côtés rouges, parcourus dans le même sens.",
      ),
    },
    {
      titre: "Placer un point",
      detail:
        "Une égalité vectorielle DÉFINIT un point, et un seul. $\\vec{AM} = 2\\vec{AB}$ place $M$ tel que $B$ soit le milieu de $[AM]$ ; $\\vec{AM} = -\\vec{AB}$ place $M$ symétrique de $B$ par rapport à $A$.",
      schema: egalites(
        [
          `\\vec{AM} = ${R("2")}\\,\\vec{AB} \\;\\Rightarrow\\; B \\text{ milieu de } [AM]`,
          `\\vec{AM} = ${R("-")}\\vec{AB} \\;\\Rightarrow\\; A \\text{ milieu de } [BM]`,
        ],
        "C'est le coefficient rouge qui dit où l'on tombe.",
      ),
    },
    {
      titre: "Prouver un alignement",
      detail:
        "$A$, $B$, $C$ sont alignés si et seulement si $\\vec{AB}$ et $\\vec{AC}$ sont COLINÉAIRES. En coordonnées, on le teste par le déterminant $xy' - x'y = 0$.",
      schema: egalites(
        [
          `\\vec{AC} = ${R("k")}\\,\\vec{AB}`,
          "\\Updownarrow",
          "A,\\; B,\\; C \\text{ alignés}",
        ],
        "Un seul nombre rouge suffit : s'il existe, les trois points sont alignés.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Deux vecteurs opposés",
      donnees: "Les vecteurs $\\vec{AB}$ et $\\vec{BA}$.",
      question: "Sont-ils égaux ?",
      schema: egalite(
        `\\vec{BA} = ${R("-")}\\vec{AB}`,
        "Seul le signe rouge les sépare : ils sont opposés, pas égaux.",
      ),
      solution:
        "Non. Ils ont la même direction et la même norme, mais des sens opposés : $\\vec{BA} = -\\vec{AB}$. ⭐ Leur somme vaut donc $\\vec{0}$ — on part de $A$, on revient en $A$.",
    },
    {
      titre: "Chasles avec un détour",
      donnees: "$\\vec{AB} + \\vec{CD} + \\vec{BC}$.",
      question: "Simplifier.",
      schema: egalites(
        [
          `\\vec{AB} + \\vec{CD} + ${R("\\vec{BC}")}`,
          `\\vec{AB} + ${R("\\vec{BC}")} + \\vec{CD}`,
          "\\vec{AC} + \\vec{CD} = \\vec{AD}",
        ],
        "On remonte le vecteur rouge, puis la chaîne se referme d'elle-même.",
      ),
      solution:
        "Tel quel, rien ne s'enchaîne. Mais une somme se réordonne : $\\vec{AB} + \\vec{BC} + \\vec{CD}$. Alors $\\vec{AB} + \\vec{BC} = \\vec{AC}$, puis $\\vec{AC} + \\vec{CD} = \\vec{AD}$. Le résultat est $\\vec{AD}$ — on part de la première lettre et on arrive à la dernière.",
    },
    {
      titre: "⛔ La différence",
      donnees: "$\\vec{AB} - \\vec{AC}$.",
      question: "Simplifier.",
      schema: egalites(
        [
          `\\vec{${R("A")}B} - \\vec{${R("A")}C}`,
          `\\vec{C${R("A")}} + \\vec{${R("A")}B}`,
          "\\vec{CB}",
        ],
        "Les deux partent du même point rouge — et c'est lui qui disparaît.",
      ),
      solution:
        "Soustraire, c'est ajouter l'opposé : $-\\vec{AC} = \\vec{CA}$. Donc $\\vec{AB} - \\vec{AC} = \\vec{AB} + \\vec{CA} = \\vec{CA} + \\vec{AB} = \\vec{CB}$. ⛔ Et non $\\vec{BC}$ : les deux vecteurs partent du même point $A$, et le résultat va du SECOND vers le PREMIER.",
    },
    {
      titre: "Placer un point",
      donnees: "$M$ est le point tel que $\\vec{AM} = 2\\vec{AB}$.",
      question: "Où se trouve $M$ ?",
      // Un dessin plutot qu'une formule : la question demande OU se trouve M,
      // et c'est une position — donc ca se montre.
      schema: figureVecteurs(
        [
          fleche("ab", { x: 1, y: 2 }, { x: 3, y: 3 }, BLEU),
          fleche("am", { x: 1, y: 2 }, { x: 5, y: 4 }, ROUGE),
        ],
        [
          { x: 1, y: 2, label: "A", couleur: VERT },
          { x: 3, y: 3, label: "B", couleur: VERT },
          { x: 5, y: 4, label: "M", couleur: VERT },
        ],
        { min: 0, max: 6 },
      ),
      solution:
        "On part de $A$ et on parcourt DEUX fois le déplacement qui mène à $B$, dans le même sens. On arrive donc au-delà de $B$, à la même distance : $A$, $B$, $M$ sont alignés dans cet ordre et $AB = BM$. Autrement dit, $B$ est le milieu de $[AM]$ — et $M$ est le symétrique de $A$ par rapport à $B$.",
    },
  ],

  pieges: [
    "⛔ $\\vec{AB} - \\vec{AC} = \\vec{CB}$, et non $\\vec{BC}$. Soustraire, c'est ajouter l'opposé, et l'opposé retourne les lettres. C'est le piège numéro un du chapitre.",
    "⛔ $\\vec{AB}$ et $\\vec{BA}$ ne sont pas égaux : ils sont OPPOSÉS. Seul le sens change, mais ça suffit.",
    "⛔ Un vecteur n'a pas de position. Deux flèches éloignées l'une de l'autre sont le même vecteur si direction, sens et norme coïncident — c'est même tout l'intérêt de la notion.",
    "⛔ $\\vec{AB} = \\vec{DC}$ donne le parallélogramme $ABCD$, mais $\\vec{AB} = \\vec{CD}$ donne $ABDC$. L'ordre des sommets se lit sur l'égalité, il ne se devine pas.",
    "⛔ Les coordonnées d'un vecteur sont l'ARRIVÉE MOINS LE DÉPART : $\\vec{AB}\\,(x_B - x_A \\,;\\, y_B - y_A)$. Dans l'autre sens, on obtient $\\vec{BA}$.",
    "⛔ Une norme n'est jamais négative : c'est une longueur. Si un calcul en donne une, c'est qu'on a oublié un carré.",
  ],

  aRetenir: [
    "Un vecteur, c'est trois données : direction, sens, norme — et aucune position.",
    "Chasles : $\\vec{AB} + \\vec{BC} = \\vec{AC}$ — la lettre du milieu disparaît.",
    "Et à l'envers : $\\vec{AB} = \\vec{AM} + \\vec{MB}$ pour n'importe quel $M$.",
    "⛔ $\\vec{AB} - \\vec{AC} = \\vec{CB}$ — l'ordre s'inverse.",
    "$ABCD$ parallélogramme $\\iff$ $\\vec{AB} = \\vec{DC}$.",
    "Coordonnées : arrivée moins départ. Norme : $\\sqrt{x^2 + y^2}$, en repère orthonormé.",
  ],

  entrainement: [
    {
      question: "Que peut-on dire de $\\vec{AB}$ et $\\vec{BA}$ ?",
      correction:
        "Ils sont opposés : $\\vec{BA} = -\\vec{AB}$. Même direction, même norme, sens contraires. Leur somme vaut $\\vec{0}$.",
    },
    {
      question: "On sait que $\\vec{AB} = \\vec{DC}$. Quelle est la nature de $ABCD$ ?",
      correction:
        "Un parallélogramme. Les côtés $[AB]$ et $[DC]$ sont parallèles, de même longueur et orientés pareil.",
    },
    {
      question: "Simplifier $\\vec{EF} + \\vec{FG}$.",
      correction:
        "$\\vec{EG}$, par Chasles : la lettre $F$ est le point de passage, elle disparaît.",
    },
    {
      question: "Simplifier $\\vec{AB} + \\vec{CD} + \\vec{BC}$.",
      correction:
        "On réordonne en $\\vec{AB} + \\vec{BC} + \\vec{CD}$, ce qui donne $\\vec{AD}$. Une somme de vecteurs se réorganise librement.",
    },
    {
      question: "Simplifier $\\vec{MN} - \\vec{MP}$.",
      correction:
        "$\\vec{MN} - \\vec{MP} = \\vec{MN} + \\vec{PM} = \\vec{PM} + \\vec{MN} = \\vec{PN}$. ⛔ Et non $\\vec{NP}$ : c'est son opposé.",
    },
    {
      question: "Simplifier $\\vec{AB} + \\vec{BC} + \\vec{CA}$.",
      correction:
        "$\\vec{AC} + \\vec{CA} = \\vec{AA} = \\vec{0}$. Le circuit est fermé : on revient au point de départ.",
    },
    {
      question: "Où se trouve le point $M$ tel que $\\vec{AM} = -\\vec{AB}$ ?",
      correction:
        "Le coefficient négatif retourne le sens : $M$ est de l'autre côté de $A$, à la même distance que $B$. Donc $A$ est le milieu de $[BM]$.",
    },
    {
      question: "Le point $M$ vérifie $\\vec{AM} = \\vec{BC}$. Que peut-on dire de $ABCM$ ?",
      correction:
        "C'est un parallélogramme : $\\vec{AM} = \\vec{BC}$ équivaut à $\\vec{AB} = \\vec{MC}$, donc $[AB]$ et $[MC]$ sont parallèles et de même longueur.",
    },
    {
      question: "Calculer les coordonnées de $\\vec{AB}$ avec $A(-2 \\,;\\, 3)$ et $B(1 \\,;\\, -1)$.",
      correction:
        "Arrivée moins départ : $(1 - (-2) \\,;\\, -1 - 3) = (3 \\,;\\, -4)$.",
    },
    {
      question: "Calculer la norme du vecteur $\\vec{u}\\,(3 \\,;\\, -4)$ en repère orthonormé.",
      correction:
        "$\\|\\vec{u}\\| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Le carré efface le signe : une norme est toujours positive.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesVecteursSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Vecteurs du plan - 2de",
    section: {
      type: "objectif",
      phrase: "Calculer avec des déplacements, sans repère",
      sousPhrase:
        "Chasles rassemble deux vecteurs et en coupe un en deux. Et la différence retourne les lettres : $\\vec{AB} - \\vec{AC} = \\vec{CB}$.",
    },
  },
];
