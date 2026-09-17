// ─── Fiche de cours : variations et courbes des fonctions (1re spé) ───────────
//
// Troisième fiche de première spécialité, après la dérivation et le second
// degré. Alignée sur la banque
// lib/tutor-v4/questionBank/premiere-spe/maths/variations-fonctions.bank.ts
// (notion variations_fonctions), vérifiée et renforcée le 12/09/2026 : 10
// micros sur 10 robustes.
//
// ⭐⭐ LE FIL : C'EST LE SIGNE DE f′ QUI PARLE, PAS SON SENS DE VARIATION. Toute
// la difficulté du chapitre tient dans une confusion, et une seule : l'élève
// regarde la courbe de f′ et lit ses variations à elle, alors qu'on ne lui
// demande que de savoir si elle est au-dessus ou en dessous de l'axe.
//
//     f′ > 0 sur un intervalle  →  f est CROISSANTE dessus
//     f′ < 0 sur un intervalle  →  f est DÉCROISSANTE dessus
//     f′ s'annule EN CHANGEANT de signe  →  f a un extremum
//
// ⛔ La dernière ligne porte la condition qu'on oublie d'énoncer : « f′(a) = 0 »
// ne suffit PAS. Il faut que f′ CHANGE de signe. Sur x ↦ x³ en 0, la dérivée
// s'annule et la fonction continue de croître — le tableau de variations n'a
// pas d'extremum en 0, seulement une tangente horizontale.
//
// ⭐ ET LE GESTE DU SUJET, sur la position relative : on ne compare pas deux
// courbes, on POSE h = f − g et l'on étudie SON signe. Comparer f′ et g′ ne
// répond pas — deux courbes peuvent croître à la même vitesse sans être à la
// même hauteur. Le coach ne le demandait presque jamais avant le 12/09 : sa
// micro plafonnait à 8 énoncés parce qu'un gabarit ne variait pas.
//
// Micro-compétences couvertes :
// - var_signe_derivee      → propriété « Le signe de f′ commande », figure, méthode 1
// - var_tableau            → propriété « Le tableau », méthode 2, exemple 1, exo 3
// - var_extremum           → propriété « L'extremum », exemple 2, exos 4-5
// - var_extremum_tangente  → propriété « L'extremum », pièges
// - var_lecture_courbe     → figure, usages « Lire une courbe », exo 1
// - var_second_degre       → propriété « Le trinôme sans dériver », exo 2
// - var_constante          → propriété « Le signe de f′ commande », exo 6
// - var_optimisation       → usages « Optimiser », exemple 3, exos 7-8
// - var_position_relative  → usages « Comparer deux courbes », exemple 4, exo 9
// - var_inegalite          → usages « Démontrer une inégalité », exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import {
  egalite,
  egalites,
  cas,
  etapes,
  enBleu,
  enRouge,
  enVert,
  BLEU,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

/**
 * ⭐ LE SCHÉMA CENTRAL : la courbe de f′, et ce qu'elle dit de f.
 *
 * Une droite qui traverse l'axe, et sous elle les deux verdicts. Le point de ce
 * dessin est de montrer que la SEULE chose à regarder est le côté de l'axe —
 * pas si la droite monte. Ici elle monte partout, et pourtant f commence par
 * décroître : c'est exactement la confusion qu'on veut casser.
 *
 * ⚠️ viewBox 320 : la largeur d'une carte de fiche en poche. Un cadre plus
 * large rétrécirait le texte d'autant.
 */
function signeDeFPrime() {
  // ⛔ Cadre ramené de 320 à 230 le 17/09/2026. Mesuré au rendu : ce dessin
  // s'affiche sur 234 px en poche — un cadre de 320 y réduisait tout de 27 %, et
  // ce texte écrit en 14 arrivait à 10 px sur le téléphone de l'élève.
  const G = 19;   // marge gauche
  const D = 211;  // bord droit
  const axeY = 62;
  const zero = 108; // abscisse où f′ s'annule
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="La courbe de f prime et le signe qu'elle donne">
        {/* Le demi-plan négatif, teinté */}
        <rect x={G} y={axeY} width={D - G} height={34} fill="#fef2f2" />
        <rect x={G} y={axeY - 34} width={D - G} height={34} fill="#f0fdf4" />

        {/* L'axe des abscisses */}
        <line x1={G} y1={axeY} x2={D} y2={axeY} stroke="#0f172a" strokeWidth={1.8} />

        {/* La courbe de f′ : une droite croissante qui traverse l'axe en `zero` */}
        <line x1={G + 6} y1={axeY + 30} x2={D - 6} y2={axeY - 35} stroke="#7c3aed" strokeWidth={3} strokeLinecap="round" />
        <text x={D - 4} y={axeY - 40} textAnchor="end" fontSize="14" fontWeight="900" fill="#7c3aed">
          f ′
        </text>

        {/* Le point où elle s'annule */}
        <circle cx={zero} cy={axeY} r={4.5} fill="#7c3aed" />
        <line x1={zero} y1={axeY - 40} x2={zero} y2={axeY + 40} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />

        {/* Les deux verdicts */}
        <text x={(G + zero) / 2} y={axeY + 56} textAnchor="middle" fontSize="13" fontWeight="800" fill={ROUGE}>
          f ′ &lt; 0
        </text>
        <text x={(G + zero) / 2} y={axeY + 72} textAnchor="middle" fontSize="13" fontWeight="800" fill={ROUGE}>
          f décroît
        </text>
        <text x={(zero + D) / 2} y={axeY + 56} textAnchor="middle" fontSize="13" fontWeight="800" fill={VERT}>
          f ′ &gt; 0
        </text>
        <text x={(zero + D) / 2} y={axeY + 72} textAnchor="middle" fontSize="13" fontWeight="800" fill={VERT}>
          f croît
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        f ′ positif : f est croissante. f ′ négatif : f est strictement
        décroissante. ⛔ Ici la droite monte partout, et pourtant f commence par
        descendre : c&apos;est le SIGNE de f ′ qui parle, pas son sens de
        variation.
      </p>
    </div>
  );
}

/**
 * Le tableau de variations, dessiné plutôt que tabulé.
 *
 * ⭐ Frédéric, 10/09 : « mieux vaut des schémas que des tableaux ». Un tableau
 * de variations EST un tableau — mais celui-ci se dessine : deux flèches et un
 * extremum marqué disent tout, et se projettent sans se couper.
 */
function tableauDessine() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      {/* ⛔ Cadre ramené de 320 à 230 le 17/09/2026, même raison que ci-dessus. */}
      <svg viewBox="0 0 230 104" className="block h-auto w-full" aria-label="Un tableau de variations dessiné">
        <line x1={14} y1={22} x2={216} y2={22} stroke="#94a3b8" strokeWidth={1.2} />
        <text x={14} y={16} fontSize="12" fontWeight="800" fill="#475569">x</text>
        <text x={19} y={38} fontSize="12" fontWeight="700" fill="#475569">−∞</text>
        <text x={107} y={38} fontSize="12" fontWeight="800" fill={BLEU}>2</text>
        <text x={196} y={38} fontSize="12" fontWeight="700" fill="#475569">+∞</text>

        {/* La flèche descendante, puis la montante */}
        <path d="M 29 56 L 106 92" fill="none" stroke={ROUGE} strokeWidth={2.6} strokeLinecap="round" />
        <path d="M 99 86 L 108 93 L 98 96" fill="none" stroke={ROUGE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 115 92 L 196 56" fill="none" stroke={VERT} strokeWidth={2.6} strokeLinecap="round" />
        <path d="M 188 55 L 197 55 L 193 65" fill="none" stroke={VERT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />

        <circle cx={111} cy={93} r={4} fill={BLEU} />
        <text x={111} y={78} textAnchor="middle" fontSize="12" fontWeight="900" fill={BLEU}>−3</text>
      </svg>
      <p className="mt-1 text-center text-xs leading-5 text-slate-500">
        Le minimum vaut −3, et il est atteint en 2. ⚠️ Deux nombres à donner, pas
        un : la VALEUR et l&apos;ABSCISSE.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LES CINQ DESSINS AJOUTÉS LE 17/09/2026
 *
 * Frédéric : « n'oublie pas les canvas et un schéma sont appréciés des élèves »,
 * « prépare la fiche de cours avec un maximum de schémas ». La fiche du 12/09
 * portait quinze schémas, mais treize d'entre eux étaient TYPOGRAPHIQUES (des
 * lignes d'égalités) : seuls deux se dessinaient vraiment.
 *
 * ⛔ viewBox de 230 de large, et pas 320. Mesuré au rendu ce jour-là : une carte
 * de cette fiche fait 225 px en poche, un exemple 199 px. Un cadre de 320 y est
 * réduit de 30 %, et un texte écrit en 12 s'affiche à 8 px — lisible sur l'écran
 * du bureau, illisible sur le téléphone de l'élève.
 *
 * ⛔ Dans du JSX, « < » et « > » s'écrivent &lt; et &gt;.
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ⭐⭐ LE DESSIN DU CHAPITRE : f en haut, f′ en dessous, sur les mêmes abscisses.
 *
 * Le trait pointillé descend du sommet de f jusqu'au zéro de f′. Tant que la
 * droite du bas est SOUS l'axe, la courbe du haut descend ; dès qu'elle passe
 * au-dessus, la courbe monte. C'est la traduction que tout le chapitre demande,
 * et elle ne se voit que sur deux dessins empilés.
 */
function courbeEtDerivee() {
  const G = 24;
  const D = 212;
  const x0 = 118;
  const axeP = 150; // l'axe des abscisses du panneau de f′
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 196" className="block h-auto w-full" aria-label="La courbe de f au-dessus de celle de sa dérivée">
        {/* ── Panneau du haut : la courbe de f ── */}
        <text x={G} y={14} fontSize="11" fontWeight="900" fill="#0f172a">f</text>
        <path d={`M ${G} 26 Q ${x0} 138 ${D} 26`} fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={x0} cy={82} r={4} fill={BLEU} />
        <line x1={x0 - 22} y1={82} x2={x0 + 22} y2={82} stroke={BLEU} strokeWidth={2} strokeDasharray="4 3" />
        {/* ⛔ Étiquettes posées DANS la cuvette, sous le creux : à mi-hauteur
            elles passaient sur le tracé de f (vu au rendu, 17/09). */}
        <text x={(G + x0) / 2 - 4} y={106} textAnchor="middle" fontSize="11" fontWeight="800" fill={ROUGE}>f descend</text>
        <text x={(x0 + D) / 2 + 4} y={106} textAnchor="middle" fontSize="11" fontWeight="800" fill={VERT}>f monte</text>

        {/* Le fil qui relie le sommet de f au zéro de f′ */}
        <line x1={x0} y1={86} x2={x0} y2={axeP - 4} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />

        {/* ── Panneau du bas : la courbe de f′ ── */}
        <rect x={G} y={axeP} width={x0 - G} height={22} fill="#fef2f2" />
        <rect x={x0} y={axeP - 22} width={D - x0} height={22} fill="#f0fdf4" />
        <line x1={G} y1={axeP} x2={D} y2={axeP} stroke="#0f172a" strokeWidth={1.6} />
        <line x1={G + 6} y1={axeP + 20} x2={D - 6} y2={axeP - 20} stroke="#7c3aed" strokeWidth={2.8} strokeLinecap="round" />
        <circle cx={x0} cy={axeP} r={4} fill="#7c3aed" />
        <text x={D} y={axeP - 26} textAnchor="end" fontSize="11" fontWeight="900" fill="#7c3aed">f ′</text>
        <text x={(G + x0) / 2} y={axeP + 34} textAnchor="middle" fontSize="11" fontWeight="800" fill={ROUGE}>f ′ &lt; 0</text>
        <text x={(x0 + D) / 2} y={axeP + 34} textAnchor="middle" fontSize="11" fontWeight="800" fill={VERT}>f ′ &gt; 0</text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Le trait descend du creux de f jusqu&apos;au zéro de f ′. À gauche f ′ est
        sous l&apos;axe et f descend ; à droite elle est au-dessus et f monte.
      </p>
    </div>
  );
}

/**
 * ⛔ Le contraste en un seul dessin : deux tangentes horizontales, un seul
 * extremum. À gauche la courbe rebrousse, à droite elle fait un palier et
 * continue de monter. C'est la différence que le texte peine à faire sentir.
 */
function extremumOuPas() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 126" className="block h-auto w-full" aria-label="Une tangente horizontale avec extremum, une autre sans">
        {/* Gauche : la parabole, elle rebrousse */}
        <path d="M 16 30 Q 60 118 104 30" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
        <line x1={38} y1={74} x2={82} y2={74} stroke={VERT} strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={60} cy={74} r={4} fill={VERT} />
        <text x={60} y={100} textAnchor="middle" fontSize="11" fontWeight="900" fill={VERT}>extremum</text>
        <text x={60} y={114} textAnchor="middle" fontSize="10" fill="#64748b">f ′ change de signe</text>

        {/* Droite : la cubique, elle fait un palier et repart.
            ⛔ Remontée le 17/09 : elle descendait jusqu'à 106 et passait
            derrière l'étiquette posée à 100. */}
        <path d="M 128 88 C 150 88 156 56 173 56 C 190 56 196 24 218 24" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
        <line x1={151} y1={56} x2={195} y2={56} stroke={ROUGE} strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={173} cy={56} r={4} fill={ROUGE} />
        <text x={173} y={100} textAnchor="middle" fontSize="11" fontWeight="900" fill={ROUGE}>pas d&apos;extremum</text>
        <text x={173} y={114} textAnchor="middle" fontSize="10" fill="#64748b">f ′ garde son signe</text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Les deux tangentes sont horizontales. Une seule des deux courbes
        rebrousse : c&apos;est le CHANGEMENT de signe qui décide, pas
        l&apos;annulation.
      </p>
    </div>
  );
}

/** Les deux paraboles, sommet marqué : a positif creuse, a négatif culmine. */
function deuxParaboles() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 112" className="block h-auto w-full" aria-label="Une parabole vers le haut et une parabole vers le bas">
        <path d="M 16 22 Q 60 106 104 22" fill="none" stroke={BLEU} strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={60} cy={64} r={4} fill={BLEU} />
        <text x={60} y={86} textAnchor="middle" fontSize="11" fontWeight="900" fill={BLEU}>a &gt; 0 : minimum</text>

        <path d="M 128 90 Q 172 6 216 90" fill="none" stroke={ROUGE} strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={172} cy={48} r={4} fill={ROUGE} />
        <text x={172} y={86} textAnchor="middle" fontSize="11" fontWeight="900" fill={ROUGE}>a &lt; 0 : maximum</text>

        <text x={115} y={106} textAnchor="middle" fontSize="10" fill="#64748b">
          sommet en x = −b / 2a, dans les deux cas
        </text>
      </svg>
    </div>
  );
}

/** Deux courbes et leur écart : la zone teintée est celle où f passe au-dessus. */
function positionRelative() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 128" className="block h-auto w-full" aria-label="Deux courbes qui se croisent, et la zone où l'une est au-dessus">
        {/* La zone où f est au-dessus de g, à l'extérieur des points de croisement */}
        <path d="M 18 28 Q 62 96 118 96 L 118 74 Q 70 74 18 46 Z" fill="#f0fdf4" />
        <path d="M 190 24 Q 150 88 118 96 L 118 74 Q 152 66 190 40 Z" fill="#f0fdf4" />

        {/* g : la droite */}
        <line x1={14} y1={44} x2={214} y2={28} stroke="#7c3aed" strokeWidth={2.4} strokeLinecap="round" />
        <text x={214} y={20} textAnchor="end" fontSize="11" fontWeight="900" fill="#7c3aed">g</text>

        {/* f : la parabole qui la coupe deux fois */}
        <path d="M 18 26 Q 118 128 198 22" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
        <text x={24} y={18} fontSize="11" fontWeight="900" fill="#0f172a">f</text>

        <circle cx={31} cy={43} r={3.6} fill={ROUGE} />
        <circle cx={186} cy={30} r={3.6} fill={ROUGE} />
        <text x={108} y={120} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={VERT}>
          f au-dessus ⇔ h = f − g &gt; 0
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Les deux points rouges sont les solutions de h(x) = 0. Entre eux, la
        courbe passe dessous ; de part et d&apos;autre, au-dessus.
      </p>
    </div>
  );
}

/** L'enclos contre le mur : le croquis qui empêche d'écrire x(40 − x). */
function enclosContreMur() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 120" className="block h-auto w-full" aria-label="Un enclos rectangulaire adossé à un mur">
        {/* Le mur : trait épais et hachures */}
        <line x1={40} y1={22} x2={190} y2={22} stroke="#475569" strokeWidth={4} strokeLinecap="round" />
        {[46, 58, 70, 82, 94, 106, 118, 130, 142, 154, 166, 178].map((x) => (
          <line key={x} x1={x} y1={20} x2={x - 7} y2={11} stroke="#94a3b8" strokeWidth={1.6} strokeLinecap="round" />
        ))}
        <text x={115} y={9} textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">le mur</text>

        {/* Les trois côtés grillagés */}
        <path d="M 40 22 L 40 86 L 190 86 L 190 22" fill="#eff6ff" stroke={BLEU} strokeWidth={2.6} strokeLinejoin="round" />

        <text x={30} y={58} textAnchor="middle" fontSize="12" fontWeight="900" fill={BLEU}>x</text>
        <text x={200} y={58} textAnchor="middle" fontSize="12" fontWeight="900" fill={BLEU}>x</text>
        <text x={115} y={102} textAnchor="middle" fontSize="12" fontWeight="900" fill={BLEU}>40 − 2x</text>
        <text x={115} y={116} textAnchor="middle" fontSize="10" fill="#64748b">
          A(x) = x (40 − 2x)
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        ⛔ Le mur remplace UN côté, pas deux : le grillage paie deux fois x, et ce
        qui reste fait la longueur. Le croquis évite l&apos;erreur.
      </p>
    </div>
  );
}

export const ficheVariationsPremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "variations-fonctions",
  titre: "Variations et courbes",
  accroche:
    "Dériver ne sert pas à dériver : ce qui compte, c'est le SIGNE de f′. f′ positif, f est croissante ; f′ négatif, f est strictement décroissante. Tout le chapitre tient dans ces deux lignes — et dans le piège qui va avec : devant la courbe de f′, c'est son signe qu'on lit, jamais son sens de variation.",
  identite: [
    {
      label: "Prérequis",
      valeur: "Dérivation, signe d'un trinôme, résolution d'inéquations",
    },
    {
      label: "L'idée clé",
      valeur: "Le SIGNE de f′ donne le sens de variation de f",
    },
    {
      label: "Outil",
      valeur: "Le tableau de variations : signe de f′ en haut, flèches en bas",
    },
  ],

  definition: {
    texte:
      "Une fonction est CROISSANTE sur un intervalle si $f(x)$ augmente quand $x$ augmente. Elle est DÉCROISSANTE si $f(x)$ diminue quand $x$ augmente. La règle du chapitre fait le lien avec la dérivée : si $f'(x) > 0$, alors $f$ est croissante ; si $f'(x) < 0$, alors $f$ est strictement décroissante ; et si $f'$ est nulle sur tout un intervalle, $f$ y est constante. ⚠️ Ces règles valent SUR UN INTERVALLE, jamais en un seul point : une dérivée positive en un seul nombre ne dit rien de ce qui se passe autour.",
  },

  figure: {
    schema: signeDeFPrime(),
    legende:
      "⭐ Voici le seul geste du chapitre : on repère où f′ change de signe, puis on traduit. f′ positif, f est croissante ; f′ négatif, f est strictement décroissante. ⛔ Le piège, le plus fréquent de toute la première : lire les variations de la courbe qu'on voit. Cette droite-là monte partout, et pourtant f commence par descendre.",
  },

  proprietes: [
    {
      titre: "⭐ Le signe de f′ commande",
      texte:
        "Sur un intervalle : $f' > 0$ donne $f$ croissante, $f' < 0$ donne $f$ strictement décroissante, et $f'$ nulle PARTOUT sur l'intervalle donne $f$ constante. ⚠️ Attention : $f'$ nulle en UN point, ce n'est pas $f'$ nulle sur tout un intervalle. Dans le premier cas, la fonction n'est pas constante.",
      schema: (
        <>
          {courbeEtDerivee()}
          {cas(
            [
              { formule: "f' > 0", verdict: "f croît", couleur: VERT },
              { formule: "f' < 0", verdict: "f décroît", couleur: ROUGE },
            ],
            "Et si f′ est nulle sur tout un intervalle, f y est constante — un palier, pas un extremum.",
          )}
        </>
      ),
    },
    {
      titre: "Le tableau de variations",
      texte:
        "On écrit d'abord la ligne du SIGNE de $f'$, puis on en déduit les flèches. On ajoute les valeurs de $f$ aux bornes et aux extremums. ⭐ Chaque flèche vient d'un signe qu'on a trouvé avant : on ne dessine pas au hasard.",
      schema: tableauDessine(),
    },
    {
      titre: "⛔ L'extremum demande un CHANGEMENT de signe",
      texte:
        "$f$ a un extremum en $a$ si $f'$ s'annule en $a$ EN CHANGEANT DE SIGNE. Dire « $f'(a) = 0$ » ne suffit pas. Exemple : pour $f(x) = x^3$, la dérivée s'annule en $0$ et pourtant la fonction continue de monter. La tangente est horizontale, mais il n'y a ni maximum ni minimum.",
      schema: (
        <>
          {extremumOuPas()}
          {/* ⛔ Lignes coupées le 17/09 : mesurées à 220 et 146 px de trop en
              poche, elles obligeaient l'élève à faire défiler chaque formule.
              La flèche passe EN TÊTE de la ligne suivante, le lien est gardé. */}
          {egalites(
            [
              `f'(a) = 0 \\text{ et change de signe}`,
              `\\longrightarrow\\; ${enVert("extremum")}`,
              `f'(0) = 0 \\text{ pour } x^3`,
              `\\longrightarrow\\; ${enRouge("pas d'extremum")}`,
            ],
            "Une tangente horizontale n'est pas un sommet : la courbe peut la traverser et repartir.",
          )}
        </>
      ),
    },
    {
      titre: "Un trinôme se lit sans dériver",
      texte:
        "Pour $f(x) = ax^2 + bx + c$, le sommet est en $\\alpha = -\\dfrac{b}{2a}$. C'est là, et seulement là, que la parabole change de sens. Si $a > 0$, elle descend puis elle monte : le sommet est un minimum. Si $a < 0$, c'est l'inverse. ⭐ On peut dériver pour le retrouver, mais ce n'est pas la peine.",
      schema: (
        <>
          {deuxParaboles()}
          {/* ⛔ 319 px de trop en poche sur une seule ligne : scindée en trois. */}
          {egalites(
            [
              `\\alpha = -\\dfrac{b}{2a}`,
              `a > 0 \\Rightarrow ${enBleu("minimum")}`,
              `a < 0 \\Rightarrow ${enRouge("maximum")}`,
            ],
            "Le signe de a décide du sens, l'abscisse du sommet décide de l'endroit.",
          )}
        </>
      ),
    },
  ],

  reel: {
    texte:
      "Un loueur de kayaks à Saint-Gilles cherche son prix. Trop bas, il remplit ses kayaks mais gagne peu. Trop haut, il gagne beaucoup sur chaque location, mais il n'en fait presque plus. Si le prix est $x$ euros, sa recette du jour s'écrit $R(x) = x(50 - x)$. « Quel prix fixer ? » n'est pas une devinette : on dérive, on cherche où $R'$ s'annule en changeant de signe, et on trouve $25$ € pour une recette de $625$ €. ⭐ Tous les problèmes d'optimisation ont cette forme : une grandeur qui monte, puis qui redescend, et un sommet à trouver.",
  },

  historique: {
    texte:
      "Avant la dérivée, on cherchait les maximums au cas par cas, par des astuces géométriques propres à chaque problème. C'est Fermat qui, vers 1636, remarque le premier qu'au voisinage d'un extremum la fonction varie très peu — sa « méthode des maxima et minima » annonce l'annulation de la dérivée sans encore la nommer. Newton et Leibniz en font ensuite un calcul général. ⚠️ Le contre-exemple de $x^3$, qui montre qu'annuler la dérivée ne suffit pas, n'a été clairement formulé qu'au XIXᵉ siècle, quand on a cherché à énoncer les théorèmes avec précision — la confusion des élèves d'aujourd'hui a donc occupé les mathématiciens pendant deux siècles.",
  },

  methode: [
    {
      titre: "1. Je dérive, puis j'étudie le SIGNE de f′",
      texte:
        "Calculer $f'$ n'est qu'une étape. Ce qu'on cherche, c'est son SIGNE. Le plus souvent $f'$ est un trinôme : on cherche alors ses racines, puis on applique la règle des signes.",
      schema: etapes(
        ["f", "f'", "\\text{signe de } f'", "\\text{variations de } f"],
        "Trois flèches, et la dernière est la seule qui répond à la question posée.",
      ),
    },
    {
      titre: "2. Je dresse le tableau",
      texte:
        "Une ligne pour $x$, une pour le signe de $f'$, une pour les flèches. On place les valeurs aux bornes et aux extremums. ⚠️ Les zéros de $f'$ sont les seuls endroits où une flèche peut changer de sens.",
      schema: egalites(
        [
          `f(x) = x^2 - 4x + 1`,
          `\\longrightarrow\\; f'(x) = 2x - 4`,
          `f'(x) = 0 \\;\\Longleftrightarrow\\; x = ${enBleu("2")}`,
        ],
        "Un seul zéro, donc un seul changement de sens possible.",
      ),
    },
    {
      titre: "3. Je conclus par une phrase",
      texte:
        "Un tableau n'est pas une réponse : on écrit ce qu'il montre. « $f$ admet un minimum égal à $-3$, atteint en $x = 2$. » ⚠️ Deux nombres, toujours — la VALEUR de l'extremum et l'ABSCISSE où il est atteint.",
      schema: egalite(
        `f(2) = 4 - 8 + 1 = ${enRouge("-3")}`,
        "On calcule la valeur de l'extremum, on ne la laisse pas en suspens.",
      ),
    },
  ],

  usages: [
    {
      titre: "⭐ Comparer deux courbes",
      detail:
        "Pour savoir laquelle est au-dessus, on POSE $h = f - g$ et on étudie le SIGNE de $h$. ⛔ Comparer $f'$ et $g'$ ne répond pas : deux courbes peuvent croître à la même vitesse sans être à la même hauteur.",
      schema: (
        <>
          {positionRelative()}
          {egalites(
            [
              `h(x) = f(x) - g(x)`,
              `= x^2 - 4x + 3`,
              `h > 0 \\text{ sur } \\left] -\\infty ; 1 \\right[ \\cup \\left] 3 ; +\\infty \\right[`,
              `\\longrightarrow\\; ${enVert("f \\text{ au-dessus}")}`,
            ],
            "La position se lit sur le signe de la DIFFÉRENCE, jamais sur deux dessins côte à côte.",
          )}
        </>
      ),
    },
    {
      titre: "Optimiser une grandeur",
      detail:
        "Aire, volume, coût, recette : on écrit d'abord la fonction, on dit entre quelles valeurs $x$ a un sens, on dérive, puis on vérifie le changement de signe. ⚠️ L'intervalle compte : une longueur négative n'existe pas.",
      schema: (
        <>
          {enclosContreMur()}
          {egalites(
            [
              `R(x) = x(50 - x)`,
              `\\longrightarrow\\; R'(x) = 50 - 2x`,
              `R'(x) = 0 \\text{ en } x = ${enBleu("25")}`,
              `\\longrightarrow\\; R = ${enVert("625")}`,
            ],
            "Le prix optimal est 25 €, la recette maximale 625 € : deux nombres différents.",
          )}
        </>
      ),
    },
    {
      titre: "Démontrer une inégalité",
      detail:
        "Pour montrer que $f(x) \\geqslant g(x)$ pour TOUT $x$, on étudie $h = f - g$ et on montre que son minimum est positif. ⭐ Vérifier sur trois valeurs ne démontre rien : une inégalité vraie partout demande un argument valable partout.",
      schema: egalites(
        [
          `h(x) = x^2 - 2x + 3`,
          `h_{\\min} = h(1) = ${enVert("2")} > 0`,
          `\\longrightarrow\\; h > 0 \\text{ sur } \\mathbb{R}`,
        ],
        "Un minimum strictement positif prouve l'inégalité d'un coup, pour tous les réels.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Dresser un tableau de variations",
      donnees: "$f(x) = x^2 - 4x + 1$ sur $\\mathbb{R}$.",
      question: "Étudier les variations de $f$.",
      schema: tableauDessine(),
      solution:
        "$f'(x) = 2x - 4$, qui s'annule en $x = 2$. Pour $x < 2$, $f'(x) < 0$ : $f$ décroît. Pour $x > 2$, $f'(x) > 0$ : $f$ croît. La dérivée change de signe en $2$, donc $f$ admet un MINIMUM, égal à $f(2) = 4 - 8 + 1 = -3$. Conclusion : $f$ est décroissante sur $\\left] -\\infty \\,;\\, 2 \\right]$, croissante sur $\\left[ 2 \\,;\\, +\\infty \\right[$, et son minimum vaut $-3$ en $x = 2$.",
    },
    {
      titre: "Quand annuler la dérivée ne suffit pas",
      donnees: "$f(x) = x^3$ sur $\\mathbb{R}$.",
      question: "$f$ admet-elle un extremum en $0$ ?",
      schema: egalites([
        `f'(x) = 3x^2 \\;\\longrightarrow\\; f'(0) = ${enBleu("0")}`,
        `3x^2 \\geqslant 0 \\text{ pour tout } x`,
        `\\longrightarrow\\; ${enRouge("pas de changement de signe")}`,
      ]),
      solution:
        "$f'(x) = 3x^2$ s'annule bien en $0$. Mais $3x^2$ est positif ou nul PARTOUT : la dérivée ne change pas de signe. Donc $f$ est croissante sur $\\mathbb{R}$ tout entier, et il n'y a AUCUN extremum en $0$ — seulement une tangente horizontale, que la courbe traverse. ⛔ C'est le contre-exemple à connaître : « $f'(a) = 0$ » n'est pas « extremum en $a$ ».",
    },
    {
      titre: "Un problème d'optimisation",
      donnees:
        "Un loueur fixe le prix $x$ d'une location. Sa recette est $R(x) = x(50 - x)$ euros, pour $x$ entre $0$ et $50$.",
      question: "Quel prix maximise la recette, et quelle est cette recette ?",
      schema: egalites([
        `R(x) = 50x - x^2`,
        `\\longrightarrow\\; R'(x) = 50 - 2x`,
        `R'(x) = 0 \\;\\Longleftrightarrow\\; x = ${enBleu("25")}`,
        `\\longrightarrow\\; R(25) = ${enVert("625")}`,
      ]),
      solution:
        "On développe : $R(x) = 50x - x^2$, donc $R'(x) = 50 - 2x$. Elle s'annule en $x = 25$, est positive avant et négative après : c'est bien un MAXIMUM. La recette maximale vaut $R(25) = 25 \\times 25 = 625$ €. ⚠️ Deux réponses sont attendues : le prix ($25$ €) et la recette ($625$ €). Et l'intervalle $[0 \\,;\\, 50]$ n'est pas décoratif — au-delà, la recette deviendrait négative, ce qui n'a pas de sens.",
    },
    {
      titre: "Position relative de deux courbes",
      donnees: "$f(x) = x^2 - 2x + 4$ et $g(x) = 2x - 1$.",
      question: "Sur quel ensemble la courbe de $f$ est-elle au-dessus de celle de $g$ ?",
      schema: egalites([
        `h(x) = f(x) - g(x) = x^2 - 4x + 5`,
        `\\Delta = 16 - 20 = ${enRouge("-4")} < 0`,
        `\\longrightarrow\\; h > 0 \\text{ partout}`,
      ]),
      solution:
        "On pose $h = f - g = x^2 - 4x + 5$. Son discriminant vaut $-4 < 0$ : $h$ ne s'annule jamais, et comme son coefficient dominant est $1 > 0$, elle est strictement positive sur $\\mathbb{R}$. Donc la courbe de $f$ est au-dessus de celle de $g$ PARTOUT, et les deux courbes ne se coupent jamais. ⭐ Le discriminant du chapitre précédent sert ici directement : Δ < 0 signifie « pas d'intersection ».",
    },
  ],

  pieges: [
    "⛔ Lire les VARIATIONS de la courbe de $f'$ au lieu de son SIGNE. Une courbe de $f'$ qui monte ne dit pas que $f$ monte.",
    "⛔ Conclure à un extremum dès que $f'(a) = 0$ : il faut que $f'$ CHANGE de signe. Contre-exemple : $x^3$ en $0$.",
    "⛔ Donner l'abscisse de l'extremum sans sa valeur, ou l'inverse. La réponse complète contient les deux.",
    "⛔ Comparer $f'$ et $g'$ pour savoir quelle courbe est au-dessus : il faut le signe de $f - g$.",
    "⚠️ Une règle de variation vaut SUR UN INTERVALLE. « $f$ croissante sur $\\left] -\\infty ; 0 \\right[$ et sur $\\left] 0 ; +\\infty \\right[$ » ne donne pas « $f$ croissante sur $\\mathbb{R}$ ».",
    "⚠️ Dans un problème concret, préciser l'intervalle d'étude : une longueur, un prix ou une durée ne sont pas négatifs.",
  ],

  aRetenir: [
    "⭐ $f' > 0$ sur un intervalle $\\Rightarrow$ $f$ croissante dessus. $f' < 0$ $\\Rightarrow$ décroissante.",
    "Extremum en $a$ : $f'(a) = 0$ ET $f'$ change de signe en $a$.",
    "Le tableau de variations se dresse depuis le SIGNE de $f'$, ligne par ligne.",
    "Position relative : on étudie le signe de $h = f - g$, jamais $f'$ contre $g'$.",
    "Optimiser : dériver, annuler, vérifier le changement de signe, et donner VALEUR et ABSCISSE.",
    "Démontrer $f \\geqslant g$ partout : montrer que le minimum de $f - g$ est positif.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question:
        "La courbe de $f$ descend sur $\\left] -\\infty ; 1 \\right]$ puis monte. Quel est le signe de $f'$ sur $\\left] -\\infty ; 1 \\right[$ ?",
      correction: "$f'$ est négative : une fonction qui décroît a une dérivée négative.",
    },
    {
      question: "Donner le sens de variation de $f(x) = -2x^2 + 8x - 1$ sans dériver.",
      correction:
        "$a = -2 < 0$ et $\\alpha = -\\dfrac{8}{-4} = 2$ : $f$ croît sur $\\left] -\\infty ; 2 \\right]$ puis décroît. Maximum en $x = 2$.",
    },
    {
      question: "Dresser le tableau de variations de $f(x) = x^2 - 6x + 5$.",
      correction:
        "$f'(x) = 2x - 6$ s'annule en $3$. Décroissante sur $\\left] -\\infty ; 3 \\right]$, croissante après. Minimum $f(3) = -4$.",
    },
    {
      question: "$f'(x) = (x - 1)(x - 4)$. Sur quel intervalle $f$ est-elle décroissante ?",
      correction:
        "$f'$ est négative entre ses racines : $f$ décroît sur $\\left[ 1 \\,;\\, 4 \\right]$.",
    },
    {
      question: "$f'(x) = x^2$ s'annule en $0$. $f$ a-t-elle un extremum en $0$ ?",
      correction:
        "Non : $x^2 \\geqslant 0$ partout, donc $f'$ ne change pas de signe. $f$ est croissante sur $\\mathbb{R}$.",
    },
    {
      question: "Que peut-on dire de $f$ si $f'(x) = 0$ pour tout $x$ d'un intervalle $I$ ?",
      correction: "$f$ est CONSTANTE sur $I$. ⚠️ Sur $I$ seulement, pas forcément ailleurs.",
    },
    {
      question:
        "L'aire d'un rectangle de demi-périmètre $18$ est $A(x) = x(18 - x)$. Pour quel $x$ est-elle maximale ?",
      correction:
        "$A'(x) = 18 - 2x$, nulle en $x = 9$, positive avant, négative après : maximum en $x = 9$, aire $81$. Le carré gagne.",
    },
    {
      question: "Avec $A(x) = x(18 - x)$, quelle est l'aire maximale ?",
      correction: "$A(9) = 9 \\times 9 = 81$. ⚠️ C'est la VALEUR, à ne pas confondre avec l'abscisse $9$.",
    },
    {
      question:
        "$f(x) = x^2 + 1$ et $g(x) = 2x$. Quelle courbe est au-dessus, et où ?",
      correction:
        "$h = f - g = x^2 - 2x + 1 = (x - 1)^2 \\geqslant 0$ : la courbe de $f$ est au-dessus partout, et les deux se touchent en $x = 1$.",
    },
    {
      question: "Démontrer que $x^2 - 4x + 7 > 0$ pour tout réel $x$.",
      correction:
        "Forme canonique : $(x - 2)^2 + 3$. Un carré est positif, donc l'expression vaut au moins $3 > 0$. (Ou : $\\Delta = -12 < 0$ et $a > 0$.)",
    },
  ],
};

export const slidesVariationsPremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Variations et courbes - 1re spé",
    section: {
      type: "objectif",
      phrase: "C'est le SIGNE de f ′ qui parle",
      sousPhrase:
        "Positive, la fonction monte ; négative, elle descend. Et un extremum demande que f ′ CHANGE de signe, pas seulement qu'elle s'annule.",
    },
  },
];
