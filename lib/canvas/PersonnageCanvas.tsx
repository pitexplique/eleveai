// lib/canvas/PersonnageCanvas.tsx
"use client";

import type { CanvasFigure, PersonnageCanvasData } from "@/lib/tutor-v4/types";

// ─── LE PREMIER CANVAS ILLUSTRATIF ────────────────────────────────────────────
// Voir le bloc de commentaire de `PersonnageCanvasData` (types_canvas.ts) pour
// ce qu'il montre et pourquoi il existe. Ici : comment il se dessine.
//
// ⭐ TOUT EST FERMÉ, RIEN N'EST UN TRAIT. C'est la contrainte qui commande le
// fichier entier. Un membre dessiné au trait épais est un trait NOIR : l'enfant
// ne peut pas le colorier, et le mode `coloriage` ne servirait à rien. Chaque
// membre est donc tracé DEUX FOIS — un trait épais sombre, puis un trait plus
// fin de la couleur de remplissage par-dessus. On obtient une capsule cernée,
// donc une zone fermée, sans avoir à calculer un contour à la main.
//
// ⚠️ L'ORDRE DE DESSIN EST CELUI DE LA BD : jambes, bras, tronc, tête. Le tronc
// recouvre le haut des membres, la tête recouvre le haut du tronc — c'est ce qui
// évite les coutures aux épaules et aux hanches.
//
// ⚠️ AUCUNE POLICE SOUS 13 ICI, alors que les autres canvas descendent à 12.
// Le lecteur a six ans : il déchiffre, il ne lit pas. La bulle est à 16.

/**
 * ⛔⛔ « MARELLE BÂTON » N'EST PAS UNE POLICE D'IMPRESSION — vérifié au rendu le
 * 02/09/2026, après l'avoir employée ici par erreur pendant une heure.
 *
 * Son nom trompe : son `b` porte une BOUCLE cursive, et « billes » en sort
 * entièrement ATTACHÉ. C'est une variante de la cursive, pas le script des
 * livres. Employée dans les bulles, elle donnait à lire à un CP la seule
 * écriture qu'il ne sait pas encore lire.
 *
 * ⭐ LA RÈGLE VISÉE RESTE LA BONNE, elle attend seulement sa police : ON LIT EN
 * SCRIPT, ON ÉCRIT EN CURSIVE. Le modèle de la réglure est en cursive Marelle ;
 * ce qui se LIT est en ANDIKA (SIL, conçue pour l'alphabétisation, OFL) : son
 * `a` et son `g` sont d'UN SEUL ÉTAGE — les lettres qu'un CP apprend — et son
 * `b` est droit. Une police système a un `a` à deux étages, avec un crochet que
 * l'enfant n'a jamais vu ailleurs. Déclarée dans `app/globals.css`.
 */
const ECOLE = '"Andika", ui-sans-serif, system-ui, sans-serif';

type Props = { figure: CanvasFigure };

function isPersonnageCanvas(figure: CanvasFigure): figure is PersonnageCanvasData {
  return figure.kind === "personnage";
}

const FONT_BULLE = 16;
const FONT_CONSIGNE = 13;
const LH_BULLE = 21;
const LH_CONSIGNE = 16;

const PAD = 8;
const PAD_BULLE = 10;
const H_QUEUE = 15;

/** Le personnage est dessiné dans une boite naturelle de 100 × 150, puis mis à
 *  l'échelle. Toutes les coordonnées du fichier sont dans CETTE boite. */
const CHAR_W = 100;
const CHAR_H = 150;

const TRAIT = 2.4;

// ⭐ LA COULEUR NE VIENT JAMAIS DE L'APPELANT — même principe que `phrase` et
// `conjugaison`. La fiche écrit `personnage: "nina"`, jamais un code couleur :
// Nina a le même tee-shirt sur les 45 fiches du cycle 2, et deux fiches ne
// peuvent pas la faire changer de tête.
type Teinte = { peau: string; cheveux: string; haut: string; bas: string };

const TROUPE: Record<string, Teinte> = {
  nina: { peau: "#f8d3b0", cheveux: "#7c3f12", haut: "#f9a8d4", bas: "#2563eb" },
  teo: { peau: "#e9b98a", cheveux: "#27272a", haut: "#93c5fd", bas: "#475569" },
  zoe: { peau: "#a9704a", cheveux: "#3f2412", haut: "#86efac", bas: "#7c3aed" },
  ravi: { peau: "#d99f6e", cheveux: "#1c1917", haut: "#fde68a", bas: "#0f766e" },
  // Le paille-en-queue : corps blanc, bec et filets rouges. Sa silhouette tient
  // dans deux signes — la queue plus longue que le corps, et le bandeau sur l'œil.
  pic: { peau: "#ffffff", cheveux: "#1f2937", haut: "#ffffff", bas: "#ef4444" },
};

const ENCRE = "#111827";

/** Le mode `coloriage` vide TOUS les aplats. Une seule fonction décide, pour que
 *  personne n'oublie une zone et n'imprime un aplat gris au photocopieur. */
function teintes(id: string, coloriage: boolean): Teinte {
  const t = TROUPE[id] ?? TROUPE.nina;
  if (!coloriage) return t;
  return { peau: "#ffffff", cheveux: "#ffffff", haut: "#ffffff", bas: "#ffffff" };
}

/**
 * ⛔ 0,52 ET NON 0,58 — MESURÉ AU RENDU LE 01/09/2026, PAS ESTIMÉ.
 *
 * Avec 0,58, « Le chat dort. » était annoncé à 121 px et en occupait 100 : le
 * rond censé entourer le point final flottait 18 px à sa droite, dans le vide.
 * L'exercice devenait faux — un enfant à qui l'on demande d'entourer le point
 * voyait un rond posé à côté de rien.
 */

/**
 * ⛔ ET UNE LARGEUR PAR LETTRE, PAS UNE MOYENNE — second rendu du 01/09.
 *
 * Avec une largeur uniforme, le rond du point tombait sur le « t » de « dort. » :
 * un point occupe le quart d'un « d », et la moyenne le poussait d'une demi-lettre.
 * ⭐ Et le même défaut se voyait à l'œil nu ailleurs : « J'ai » s'étalait pendant
 * que « gagne » se serrait, parce qu'on donnait quatre lettres larges à un mot
 * qui en a deux étroites.
 *
 * `lengthAdjust="spacingAndGlyphs"` met le mot à l'échelle SANS changer les
 * proportions entre ses lettres : les poids ci-dessous suffisent donc à situer
 * n'importe quel signe exactement, une fois la largeur du mot imposée.
 */
const POIDS_ETROIT = new Set([..."iljItf.,;:'!|()[]"]);
const POIDS_LARGE = new Set([..."mwMW"]);

function poidsCaractere(ch: string) {
  if (POIDS_ETROIT.has(ch)) return 0.3;
  if (POIDS_LARGE.has(ch)) return 0.88;
  if (ch === " ") return 0.3;
  if (ch >= "A" && ch <= "Z") return 0.68;
  return 0.57;
}

/** Ajusté au rendu : la somme des poids sous-estimait de 6 % la largeur réelle
 *  d'une police système sans empattement. */
const CALIBRE = 1.06;

function poidsTexte(texte: string) {
  let s = 0;
  for (const ch of texte) s += poidsCaractere(ch);
  return s * CALIBRE;
}

function largeurTexte(texte: string, fontSize: number) {
  return poidsTexte(texte) * fontSize;
}

/** La position d'un signe DANS son mot, une fois le mot contraint à `w`.
 *  Rendue exacte par `spacingAndGlyphs`, qui conserve les proportions. */
function bornesSigne(mot: string, x: number, w: number, index: number) {
  const total = poidsTexte(mot);
  let avant = 0;
  for (let i = 0; i < index; i++) avant += poidsCaractere(mot[i]) * CALIBRE;
  const large = poidsCaractere(mot[index]) * CALIBRE;
  return { centre: x + (w * (avant + large / 2)) / total, largeur: (w * large) / total };
}

/**
 * ⭐ LE TEXTE DE LA BULLE SE POSE MOT PAR MOT, ET CHAQUE MOT EST CONTRAINT À SA
 * LARGEUR CALCULÉE (`textLength`). C'est ce qui rend l'estimation VRAIE au lieu
 * d'approximative : le navigateur n'a plus le droit d'écrire le mot plus large
 * que prévu, donc la position de chaque signe est connue exactement. Sans cela,
 * aucune marque ne peut viser une lettre — et la marque est tout l'intérêt.
 *
 * `spacingAndGlyphs` plutôt que `spacing` : sur un mot d'une seule lettre
 * (« a », « À »), il n'y a aucun espace à répartir, et `spacing` laisserait le
 * mot à sa largeur naturelle.
 */
type MotPose = { mot: string; x: number; w: number };

function poserMots(ligne: string, x0: number, fontSize: number): MotPose[] {
  const espace = fontSize * 0.3;
  let x = x0;
  return ligne.split(" ").map((mot) => {
    const w = largeurTexte(mot, fontSize);
    const pose = { mot, x, w };
    x += w + espace;
    return pose;
  });
}

function largeurLigne(ligne: string, fontSize: number) {
  const mots = ligne.split(" ");
  return (
    mots.reduce((s, m) => s + largeurTexte(m, fontSize), 0) +
    (mots.length - 1) * fontSize * 0.3
  );
}

function couper(texte: string, largeurDispo: number, fontSize: number, maxLignes = 4) {
  if (largeurTexte(texte, fontSize) <= largeurDispo) return [texte];
  const lignes: string[] = [];
  let courante = "";
  for (const mot of texte.split(" ")) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (courante && largeurTexte(essai, fontSize) > largeurDispo) {
      lignes.push(courante);
      courante = mot;
    } else {
      courante = essai;
    }
  }
  if (courante) lignes.push(courante);
  return lignes.slice(0, maxLignes);
}

// ─── Les membres : deux traits superposés, donc une zone fermée ───────────────

type Point = [number, number];

function Membre({
  points,
  epaisseur,
  remplissage,
}: {
  points: Point[];
  epaisseur: number;
  remplissage: string;
}) {
  const d = points.map((p) => p.join(",")).join(" ");
  return (
    <>
      <polyline
        points={d}
        fill="none"
        stroke={ENCRE}
        strokeWidth={epaisseur + 2 * TRAIT}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={d}
        fill="none"
        stroke={remplissage}
        strokeWidth={epaisseur}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

// ─── Les poses : ce que le personnage FAIT ────────────────────────────────────
// ⭐ La pose n'est pas un décor : au cycle 2, l'action DESSINÉE est très souvent
// la notion cherchée (le verbe, ce qu'on raconte). On la nomme donc en clair.

type Squelette = { brasG: Point[]; brasD: Point[]; jambeG: Point[]; jambeD: Point[] };

const POSES: Record<string, Squelette> = {
  debout: {
    brasG: [[35, 68], [26, 97]],
    brasD: [[65, 68], [74, 97]],
    jambeG: [[43, 103], [40, 142]],
    jambeD: [[57, 103], [60, 142]],
  },
  // Le bras tendu vers la bulle, qui est au-dessus : le personnage MONTRE ce
  // qu'il dit. C'est la pose des fiches où la phrase est l'objet du cours.
  montre: {
    brasG: [[35, 68], [27, 96]],
    brasD: [[65, 68], [80, 56], [76, 32]],
    jambeG: [[43, 103], [40, 142]],
    jambeD: [[57, 103], [60, 142]],
  },
  bras_leves: {
    brasG: [[35, 68], [22, 46], [26, 26]],
    brasD: [[65, 68], [78, 46], [74, 26]],
    jambeG: [[43, 103], [38, 142]],
    jambeD: [[57, 103], [62, 142]],
  },
  marche: {
    brasG: [[35, 68], [23, 88]],
    brasD: [[65, 68], [77, 84]],
    jambeG: [[43, 103], [30, 138]],
    jambeD: [[57, 103], [70, 138]],
  },
  // ⛔ ASSIS SE DESSINE EN TAILLEUR, PAS DE PROFIL (corrigé au rendu, 01/09).
  // Deux jambes tendues vers la gauche donnaient un personnage debout dont les
  // pieds partaient de côté — on ne lisait pas « assis ». Repliées en losange
  // devant le corps, elles se lisent d'un coup, et de face comme le reste de la
  // troupe.
  assis: {
    brasG: [[35, 68], [26, 100]],
    brasD: [[65, 68], [74, 100]],
    jambeG: [[43, 104], [24, 122], [52, 130]],
    jambeD: [[57, 104], [76, 122], [48, 130]],
  },
};

// ─── Les visages : ce que le personnage RESSENT ───────────────────────────────
// Les yeux sont en (42, 30) et (58, 30), la bouche autour de (50, 42).

function Visage({ expression, coloriage }: { expression: string; coloriage: boolean }) {
  const bouchePleine = coloriage ? "#ffffff" : "#be123c";
  const blanc = "#ffffff";

  const yeuxRonds = (
    <>
      <circle cx={42} cy={30} r={3.1} fill={ENCRE} />
      <circle cx={58} cy={30} r={3.1} fill={ENCRE} />
    </>
  );

  const nez = (
    <path d="M 48 35 Q 50.5 38.5 53 36" fill="none" stroke={ENCRE} strokeWidth={1.6} strokeLinecap="round" />
  );

  if (expression === "rire") {
    return (
      <>
        <path d="M 37 31 Q 42 24 47 31" fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 53 31 Q 58 24 63 31" fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" />
        {nez}
        <path d="M 40 40 Q 50 52 60 40 Z" fill={bouchePleine} stroke={ENCRE} strokeWidth={2} strokeLinejoin="round" />
      </>
    );
  }

  if (expression === "surpris") {
    return (
      <>
        <path d="M 36 22 Q 42 18 48 22" fill="none" stroke={ENCRE} strokeWidth={2} strokeLinecap="round" />
        <path d="M 52 22 Q 58 18 64 22" fill="none" stroke={ENCRE} strokeWidth={2} strokeLinecap="round" />
        <circle cx={42} cy={31} r={5} fill={blanc} stroke={ENCRE} strokeWidth={1.8} />
        <circle cx={58} cy={31} r={5} fill={blanc} stroke={ENCRE} strokeWidth={1.8} />
        <circle cx={42} cy={31} r={2.3} fill={ENCRE} />
        <circle cx={58} cy={31} r={2.3} fill={ENCRE} />
        {nez}
        <ellipse cx={50} cy={44} rx={4.2} ry={5.4} fill={bouchePleine} stroke={ENCRE} strokeWidth={2} />
      </>
    );
  }

  if (expression === "pense") {
    return (
      <>
        <circle cx={42} cy={29} r={3.1} fill={ENCRE} />
        <circle cx={58} cy={29} r={3.1} fill={ENCRE} />
        <path d="M 36 23 Q 42 20 48 23" fill="none" stroke={ENCRE} strokeWidth={1.8} strokeLinecap="round" />
        {nez}
        <path d="M 43 43 Q 47 41 50 43 Q 53 45 57 43" fill="none" stroke={ENCRE} strokeWidth={2} strokeLinecap="round" />
      </>
    );
  }

  if (expression === "triste") {
    return (
      <>
        <path d="M 36 22 L 47 26" fill="none" stroke={ENCRE} strokeWidth={2} strokeLinecap="round" />
        <path d="M 64 22 L 53 26" fill="none" stroke={ENCRE} strokeWidth={2} strokeLinecap="round" />
        {yeuxRonds}
        {nez}
        <path d="M 42 46 Q 50 39 58 46" fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" />
      </>
    );
  }

  return (
    <>
      {yeuxRonds}
      {nez}
      <path d="M 42 41 Q 50 48 58 41" fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" />
    </>
  );
}

// ─── Les coiffures : le seul signe qui distingue les quatre enfants ───────────
// ⭐ Un seul signe par personnage, et il est en HAUT. À la taille où ces dessins
// vivent (≈ 130 px de large), un détail de vêtement ne se voit pas ; une
// silhouette de cheveux, si. C'est ce qui rend la troupe reconnaissable.

function CheveuxDerriere({ id, c }: { id: string; c: Teinte }) {
  if (id === "zoe") {
    // Les boucles débordent de la tête : elles se dessinent AVANT elle.
    return (
      <g fill={c.cheveux} stroke={ENCRE} strokeWidth={TRAIT}>
        <circle cx={31} cy={22} r={12} />
        <circle cx={44} cy={11} r={13} />
        <circle cx={58} cy={11} r={13} />
        <circle cx={70} cy={23} r={12} />
        <circle cx={50} cy={18} r={14} />
      </g>
    );
  }
  if (id === "nina") {
    return (
      <g fill={c.cheveux} stroke={ENCRE} strokeWidth={TRAIT}>
        <circle cx={22} cy={28} r={9.5} />
        <circle cx={78} cy={28} r={9.5} />
      </g>
    );
  }
  return null;
}

function CheveuxDevant({ id, c }: { id: string; c: Teinte }) {
  const style = { fill: c.cheveux, stroke: ENCRE, strokeWidth: TRAIT, strokeLinejoin: "round" as const };

  if (id === "nina") {
    return <path d="M 27 31 Q 29 8 50 8 Q 71 8 73 31 Q 65 19 50 20 Q 35 19 27 31 Z" {...style} />;
  }
  if (id === "teo") {
    // ⛔ Les épis étaient des triangles réguliers posés sur un bandeau : on y
    // lisait une COURONNE, pas des cheveux (rendu du 01/09). Des pointes
    // inégales, arrondies à leur base, redeviennent une tignasse.
    return (
      <path
        d="M 27 32 Q 26 12 34 15 Q 38 3 45 12 Q 50 1 56 12 Q 62 4 66 15 Q 73 12 73 32 Q 62 21 50 21 Q 38 21 27 32 Z"
        {...style}
      />
    );
  }
  if (id === "zoe") {
    return (
      <>
        <path d="M 28 30 Q 32 14 50 14 Q 68 14 72 30 Q 62 22 50 22 Q 38 22 28 30 Z" {...style} />
        {/* Les lunettes : le second signe de Zoé, et le seul accessoire de la troupe. */}
        <g fill="none" stroke={ENCRE} strokeWidth={2}>
          <circle cx={42} cy={30} r={8.5} />
          <circle cx={58} cy={30} r={8.5} />
          <path d="M 50.5 30 L 49.5 30" />
          <path d="M 33.5 29 L 28 27" />
          <path d="M 66.5 29 L 72 27" />
        </g>
      </>
    );
  }
  if (id === "ravi") {
    return (
      <>
        {/* ⛔ LA CASQUETTE DESCENDAIT SUR LES YEUX (rendu du 01/09). Sa bordure
            tombait à y ≈ 29 et les yeux sont à y = 30 : Ravi n'avait plus de
            regard, donc plus d'expression — le seul canal qui porte le ton de
            la phrase au cycle 2. Bordure remontée à 24, visière au-dessus. */}
        <path d="M 27 26 Q 27 4 50 4 Q 73 4 73 26 Q 50 19 27 26 Z" fill={c.haut} stroke={ENCRE} strokeWidth={TRAIT} strokeLinejoin="round" />
        <path d="M 62 21 Q 88 18 91 27 Q 78 30 61 27 Z" fill={c.haut} stroke={ENCRE} strokeWidth={TRAIT} strokeLinejoin="round" />
        <circle cx={50} cy={5} r={3.4} fill={c.bas} stroke={ENCRE} strokeWidth={1.8} />
      </>
    );
  }
  return null;
}

// ─── Le paille-en-queue ───────────────────────────────────────────────────────
// ⛔ Il ignore `pose` et `expression` : c'est un oiseau, pas un enfant. Il porte
// la même bulle et la même consigne que les autres, et c'est ce qui suffit.

/** ⛔ L'oiseau n'occupe pas la boite d'un enfant : il tient dans 112 unités de
 *  haut, pas 150. Dessiné dans la boite commune, il laissait 40 px de vide
 *  au-dessus de lui — et un vide en haut d'un dessin ressemble à un bogue. */
const PIC_H = 112;
const PIC_REMONTE = 40;

function Pic({ c }: { c: Teinte }) {
  return (
    <g transform={`translate(0, ${-PIC_REMONTE})`}>
      {/* Les deux filets de la queue — le signe qui nomme l'oiseau. */}
      <Membre points={[[30, 92], [12, 124], [2, 146]]} epaisseur={3.4} remplissage={c.bas} />
      <Membre points={[[32, 96], [18, 128], [12, 149]]} epaisseur={3.4} remplissage={c.bas} />
      {/* Les pattes, derrière le corps. */}
      <Membre points={[[48, 104], [46, 120]]} epaisseur={3} remplissage={c.bas} />
      <Membre points={[[58, 104], [61, 120]]} epaisseur={3} remplissage={c.bas} />
      <ellipse cx={44} cy={122} rx={7} ry={3} fill={c.bas} stroke={ENCRE} strokeWidth={TRAIT} />
      <ellipse cx={63} cy={122} rx={7} ry={3} fill={c.bas} stroke={ENCRE} strokeWidth={TRAIT} />
      {/* Le corps, puis l'aile posée dessus. */}
      <ellipse cx={52} cy={84} rx={27} ry={20} fill={c.haut} stroke={ENCRE} strokeWidth={TRAIT} />
      <path d="M 38 76 Q 56 64 74 82 Q 54 90 38 76 Z" fill={c.haut} stroke={ENCRE} strokeWidth={TRAIT} strokeLinejoin="round" />
      {/* La tête, le bandeau sur l'œil, le bec. */}
      <circle cx={72} cy={60} r={14} fill={c.haut} stroke={ENCRE} strokeWidth={TRAIT} />
      <path d="M 64 55 Q 72 50 82 55 Q 72 60 64 55 Z" fill={c.cheveux} stroke={ENCRE} strokeWidth={1.6} strokeLinejoin="round" />
      <circle cx={75} cy={56} r={2.4} fill={ENCRE} />
      <path d="M 84 62 L 99 66 L 84 70 Z" fill={c.bas} stroke={ENCRE} strokeWidth={TRAIT} strokeLinejoin="round" />
    </g>
  );
}

function Enfant({
  id,
  pose,
  expression,
  c,
}: {
  id: string;
  pose: string;
  expression: string;
  c: Teinte;
}) {
  const s = POSES[pose] ?? POSES.debout;
  return (
    <g>
      {/* L'ordre de la BD : jambes, bras, tronc, tête. */}
      <Membre points={s.jambeG} epaisseur={7} remplissage={c.bas} />
      <Membre points={s.jambeD} epaisseur={7} remplissage={c.bas} />
      <Membre points={s.brasG} epaisseur={6} remplissage={c.peau} />
      <Membre points={s.brasD} epaisseur={6} remplissage={c.peau} />
      <circle
        cx={s.brasG[s.brasG.length - 1][0]}
        cy={s.brasG[s.brasG.length - 1][1]}
        r={5.4}
        fill={c.peau}
        stroke={ENCRE}
        strokeWidth={TRAIT}
      />
      <circle
        cx={s.brasD[s.brasD.length - 1][0]}
        cy={s.brasD[s.brasD.length - 1][1]}
        r={5.4}
        fill={c.peau}
        stroke={ENCRE}
        strokeWidth={TRAIT}
      />
      {/* Le cou, caché par le tronc et la tête : il ne sert qu'à fermer le trou. */}
      <rect x={45} y={50} width={10} height={16} fill={c.peau} stroke={ENCRE} strokeWidth={TRAIT} />
      {/* Le tee-shirt. */}
      <path
        d="M 34 71 Q 34 58 50 57 Q 66 58 66 71 L 68 103 Q 50 110 32 103 Z"
        fill={c.haut}
        stroke={ENCRE}
        strokeWidth={TRAIT}
        strokeLinejoin="round"
      />
      <CheveuxDerriere id={id} c={c} />
      <circle cx={50} cy={32} r={24} fill={c.peau} stroke={ENCRE} strokeWidth={TRAIT} />
      <Visage expression={expression} coloriage={c.peau === "#ffffff"} />
      <CheveuxDevant id={id} c={c} />
    </g>
  );
}

// ─── La bulle ─────────────────────────────────────────────────────────────────

/**
 * Le contour en éclats du cri : une ellipse dont le rayon alterne.
 *
 * ⛔ DEUX RÉGLAGES QUI L'AVAIENT RENDU INUTILISABLE (mesuré au rendu, 01/09) :
 * · le nombre de pointes était calculé sur la largeur — 50 pointes à 360 px,
 *   ce qui ne donnait pas une bulle mais un gribouillis ;
 * · le texte était posé dans le rectangle, la bulle dessinée dans l'ellipse
 *   INSCRITE à ce rectangle : les quatre coins du texte sortaient donc de la
 *   bulle, et le premier mot s'écrivait dehors.
 * La bulle se dimensionne maintenant pour CONTENIR le texte : c'est le rayon
 * intérieur (le creux entre deux pointes) qui doit passer au large des lettres.
 */
const CRI_POINTES = 20;
const CRI_CREUX = 0.86;

function contourCri(cx: number, cy: number, rx: number, ry: number) {
  const pts: string[] = [];
  for (let i = 0; i < CRI_POINTES * 2; i++) {
    const a = (i / (CRI_POINTES * 2)) * Math.PI * 2 - Math.PI / 2;
    const k = i % 2 === 0 ? 1 : CRI_CREUX;
    pts.push(`${(cx + Math.cos(a) * rx * k).toFixed(1)},${(cy + Math.sin(a) * ry * k).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function PersonnageCanvas({ figure }: Props) {
  if (!isPersonnageCanvas(figure)) return null;

  const coloriage = (figure.mode ?? "coloriage") === "coloriage";
  const c = teintes(figure.personnage, coloriage);
  const pose = figure.pose ?? "debout";
  const expression = figure.expression ?? "sourire";

  const width = Math.max(160, figure.size?.width ?? 250);

  // ⭐ LE PERSONNAGE OCCUPE 55 % DE LA LARGEUR. Plus grand, il chasse la bulle ;
  // plus petit, le visage devient illisible dans une carte de 200 px.
  const echelle = Math.min(1.8, Math.max(0.85, (width * 0.55) / CHAR_W));
  const persoW = CHAR_W * echelle;
  const persoH = (figure.personnage === "pic" ? PIC_H : CHAR_H) * echelle;

  const largeurUtile = width - 2 * PAD;
  const forme = figure.bulle?.forme ?? "parole";

  // ⭐ LE CRI SE PLIE PLUS TÔT QUE LES AUTRES. Sa bulle est une ellipse en
  // éclats : à hauteur égale, elle tient beaucoup moins de texte qu'un
  // rectangle, et c'est aux COINS que les lettres sortent.
  const largeurTexteBulle =
    forme === "cri" ? largeurUtile * 0.62 : largeurUtile - 2 * PAD_BULLE;

  const lignesBulle = figure.bulle
    ? couper(figure.bulle.texte, largeurTexteBulle, FONT_BULLE, 3)
    : [];
  const hTexteBulle = lignesBulle.length * LH_BULLE + 2 * PAD_BULLE;
  // Le cri se dessine sur une ellipse : il lui faut de quoi passer AU LARGE des
  // quatre coins du bloc de texte, creux compris.
  const hBulle = figure.bulle ? (forme === "cri" ? hTexteBulle * 1.5 : hTexteBulle) : 0;
  const hQueue = figure.bulle ? H_QUEUE : 0;

  const lignesConsigne = figure.consigne
    ? couper(figure.consigne, largeurUtile, FONT_CONSIGNE, 3)
    : [];
  const hConsigne = lignesConsigne.length ? lignesConsigne.length * LH_CONSIGNE + 10 : 0;

  const yPerso = PAD + hBulle + hQueue;
  const height = yPerso + persoH + hConsigne + PAD;

  const bx = PAD;
  const by = PAD;
  const bw = largeurUtile;

  // La queue de la bulle pointe vers la tête, qui est au milieu du personnage.
  const xTete = (width - persoW) / 2 + persoW / 2;

  // Le cri centre son texte ; la parole et la pensée l'alignent à gauche, comme
  // un enfant lit une phrase.
  const yTexte0 = by + (hBulle - hTexteBulle) / 2 + PAD_BULLE;
  const motsParLigne = lignesBulle.map((ligne) =>
    poserMots(
      ligne,
      forme === "cri"
        ? bx + bw / 2 - largeurLigne(ligne, FONT_BULLE) / 2
        : bx + PAD_BULLE,
      FONT_BULLE
    )
  );

  const marques = figure.bulle?.marques ?? [];
  const premierMot = motsParLigne[0]?.[0];
  const derniersMots = motsParLigne[motsParLigne.length - 1];
  const dernierMot = derniersMots?.[derniersMots.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.consigne ?? figure.bulle?.texte ?? "personnage"}
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />

      {figure.bulle && (
        <g>
          {forme === "cri" ? (
            <polygon
              points={contourCri(bx + bw / 2, by + hBulle / 2, bw / 2, hBulle / 2)}
              fill="#ffffff"
              stroke={ENCRE}
              strokeWidth={TRAIT}
              strokeLinejoin="round"
            />
          ) : (
            <rect
              x={bx}
              y={by}
              width={bw}
              height={hBulle}
              rx={forme === "pensee" ? hBulle / 2 : 12}
              fill="#ffffff"
              stroke={ENCRE}
              strokeWidth={TRAIT}
            />
          )}

          {/* La queue : un triangle pour la parole, des ronds qui s'éloignent
              pour la pensée, un éclat pour le cri. La forme EST la leçon. */}
          {forme === "pensee" ? (
            <g fill="#ffffff" stroke={ENCRE} strokeWidth={TRAIT}>
              <circle cx={xTete} cy={by + hBulle + 5} r={4.5} />
              <circle cx={xTete + 5} cy={by + hBulle + 13} r={2.8} />
            </g>
          ) : (
            <path
              d={`M ${xTete - 10} ${by + hBulle - 1} L ${xTete + 10} ${by + hBulle - 1} L ${
                xTete + (forme === "cri" ? 1 : 4)
              } ${by + hBulle + H_QUEUE - 2} Z`}
              fill="#ffffff"
              stroke={ENCRE}
              strokeWidth={TRAIT}
              strokeLinejoin="round"
            />
          )}

          {/* ⭐ LES MARQUES : la majuscule et le point entourés. C'est ce qui fait
              de la bulle un exercice et non un décor. Les deux ellipses visent
              une LETTRE : elles ne peuvent le faire que parce que chaque mot est
              contraint à sa largeur calculée (voir `poserMots`). */}
          {marques.includes("majuscule") && premierMot && (() => {
            const b = bornesSigne(premierMot.mot, premierMot.x, premierMot.w, 0);
            return (
              <ellipse
                cx={b.centre}
                cy={yTexte0 + LH_BULLE / 2 - 1}
                rx={b.largeur / 2 + 3.5}
                ry={FONT_BULLE * 0.66}
                fill="none"
                stroke={ENCRE}
                strokeWidth={1.8}
              />
            );
          })()}
          {marques.includes("point") && dernierMot && (() => {
            const b = bornesSigne(
              dernierMot.mot,
              dernierMot.x,
              dernierMot.w,
              dernierMot.mot.length - 1
            );
            return (
              <ellipse
                cx={b.centre}
                cy={yTexte0 + (motsParLigne.length - 0.5) * LH_BULLE + 1}
                rx={b.largeur / 2 + 3.5}
                ry={FONT_BULLE * 0.42}
                fill="none"
                stroke={ENCRE}
                strokeWidth={1.8}
              />
            );
          })()}

          {motsParLigne.map((mots, i) =>
            mots.map((m, j) => (
              <text
                key={`${i}-${j}`}
                x={m.x}
                y={yTexte0 + (i + 0.5) * LH_BULLE + FONT_BULLE * 0.35}
                textLength={m.w}
                lengthAdjust="spacingAndGlyphs"
                fontSize={FONT_BULLE}
                fill={ENCRE}
                fontFamily={ECOLE}
              >
                {m.mot}
              </text>
            ))
          )}
        </g>
      )}

      <g transform={`translate(${(width - persoW) / 2}, ${yPerso}) scale(${echelle})`}>
        {figure.personnage === "pic" ? (
          <Pic c={c} />
        ) : (
          <Enfant id={figure.personnage} pose={pose} expression={expression} c={c} />
        )}
      </g>

      {lignesConsigne.map((ligne, i) => (
        <text
          key={i}
          x={width / 2}
          y={yPerso + persoH + 18 + i * LH_CONSIGNE}
          fontSize={FONT_CONSIGNE}
          fill="#334155"
          textAnchor="middle"
          fontFamily={ECOLE}
        >
          {ligne}
        </text>
      ))}
    </svg>
  );
}
