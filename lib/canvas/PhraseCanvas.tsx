// lib/canvas/PhraseCanvas.tsx
"use client";

import type { CanvasFigure, PhraseCanvasData } from "@/lib/tutor-v4/types";
import { useLargeurProjetee } from "@/lib/canvas/largeur-projetee";

// ─── LE CANVAS DU FRANÇAIS ────────────────────────────────────────────────────
// Ce que la droite graduée est aux nombres, la phrase segmentée l'est à la
// grammaire : l'objet unique sur lequel toutes les notions viennent se poser.
// Voir le bloc de commentaire de `PhraseCanvasData` (types_canvas.ts) pour ce
// qu'elle montre — ici, comment elle se dessine sans qu'aucune légende n'en
// touche une autre (REGLES.md § 2 ter, 20/08/2026).
//
// ⭐ ELLE PASSE À LA LIGNE (20/08, mesuré sur la fiche réelle en 375 px). Sur un
// téléphone, le bloc qui reçoit un dessin ne fait que 226 px : une phrase de
// huit mots dessinée sur une seule ligne y arrivait à 7,8 px de police. Le
// canvas plie donc la phrase à `largeurMax` (250 par défaut) et lui donne de la
// HAUTEUR, jamais moins de taille de lettre. Chaque ligne emporte ses propres
// bandes — c'est ce qui fait que le deuxième rang de mots n'écrase pas les
// étiquettes du premier :
//
//   ligne 1 : [ arcs ][ natures ][ LES MOTS ][ crochets + fonctions ][ reprises ]
//   ligne 2 : [ arcs ][ natures ][ LES MOTS ][ crochets + fonctions ][ reprises ]
//   [ le fantôme du groupe déplacé ]
//   [ légende ]

type Props = {
  figure: CanvasFigure;
};

function isPhraseCanvas(figure: CanvasFigure): figure is PhraseCanvasData {
  return figure.kind === "phrase";
}

// ⭐ LA COULEUR PORTE LA FONCTION, DANS TOUTE LA MATIÈRE. Le sujet est bleu
// dans la fiche du CM2 comme dans celle de la 5e ; l'élève n'a la couleur à
// apprendre qu'une fois. La fiche écrit « sujet », pas « #2563eb » : c'est le
// canvas qui déduit, sinon deux fiches finiraient par diverger.
const PALETTE = {
  bleu: { fill: "#dbeafe", stroke: "#2563eb", text: "#1d4ed8" },
  rouge: { fill: "#fee2e2", stroke: "#dc2626", text: "#b91c1c" },
  vert: { fill: "#dcfce7", stroke: "#16a34a", text: "#15803d" },
  orange: { fill: "#fef3c7", stroke: "#d97706", text: "#b45309" },
  violet: { fill: "#ede9fe", stroke: "#7c3aed", text: "#6d28d9" },
  rose: { fill: "#fce7f3", stroke: "#db2777", text: "#be185d" },
  // Les propositions d'une phrase complexe : deux teintes de même force, parce
  // qu'une coordination met justement les deux propositions à ÉGALITÉ. Elles ne
  // reprennent aucune couleur de fonction — une proposition n'est pas une
  // fonction, c'est un morceau de phrase.
  indigo: { fill: "#e0e7ff", stroke: "#4f46e5", text: "#4338ca" },
  sarcelle: { fill: "#ccfbf1", stroke: "#0d9488", text: "#0f766e" },
  // Les petits mots outils qui relient : et, mais, quand, parce que, qui, que, où.
  outil: { fill: "#e2e8f0", stroke: "#475569", text: "#334155" },
  neutre: { fill: "#f1f5f9", stroke: "#94a3b8", text: "#475569" },
} as const;

// ⚠️ L'ORDRE DES TESTS EST LA RÈGLE : « attribut du sujet » contient « sujet ».
// Le plus spécifique d'abord, toujours.
function couleurFonction(label: string) {
  const l = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  // Une proposition se numérote (« proposition 1 ») : le chiffre choisit la
  // teinte, pour que deux propositions voisines ne soient pas le même bloc.
  if (l.includes("proposition")) {
    return /2|subordonn/.test(l) ? PALETTE.sarcelle : PALETTE.indigo;
  }
  if (/coordination|subordination|conjonction|relatif|liaison/.test(l)) {
    return PALETTE.outil;
  }
  if (l.includes("attribut")) return PALETTE.violet;
  if (l.includes("circonstanciel") || l.startsWith("cc")) return PALETTE.orange;
  if (l.includes("objet") || l.includes("cod") || l.includes("coi")) return PALETTE.vert;
  if (l.includes("verbe") || l.includes("predicat")) return PALETTE.rouge;
  if (l.includes("sujet")) return PALETTE.bleu;
  if (l.includes("nom") || l.includes("epithete") || l.includes("expansion")) return PALETTE.rose;
  return PALETTE.neutre;
}

// La place réellement occupée par un texte, avant de poser quoi que ce soit à
// côté (REGLES.md § 2 ter : « calculer la place occupée »). Large exprès : un
// dessin trop aéré se lit, deux légendes qui se touchent ne se lisent pas.
//
// ⚠️ 0,58 SOUS-ESTIMAIT, ET C'EST UNE ESTIMATION QUI SERT À NE PAS DÉBORDER
// (24/08/2026). Mesuré au rendu, getBBox() contre le viewBox : « complément du
// nom » en gras occupe 133 px là où la formule en annonçait 118. L'étiquette
// passait donc le test du cadre et sortait quand même. 0,62 est la largeur
// réelle du gras de cette fonte ; l'écart de layout est de trois pixels par
// étiquette, la phrase ne se replie pas pour autant.
function largeurTexte(texte: string, fontSize: number) {
  return texte.length * fontSize * 0.62;
}

/**
 * Ramène une étiquette centrée à l'intérieur du cadre.
 *
 * ⛔ TROISIÈME FOIS QUE LE MÊME DÉFAUT REVIENT, À TROIS ENDROITS DIFFÉRENTS.
 * L'étiquette de FONCTION a été ramenée dans le cadre le 20/08 (« CC de temps »
 * sous « Hier » perdait son premier C), celle de NATURE le 24/08 au matin
 * (« déterminant » sur « un » sortait de 8 px). Restaient les labels de LIEN :
 * « qui est-ce qui ? », posé au sommet d'un arc qui part du premier mot,
 * dépassait de 3 px à gauche sur trois fiches — le CM2 et la 6e.
 * Un SVG masque ce qui sort de son `viewBox` : l'étiquette n'est pas « mal
 * placée », elle est COUPÉE, et rien à l'écran ne le dit.
 *
 * ⚠️ Le fond blanc de l'étiquette se décale AVEC elle, sinon le rectangle reste
 * en arrière et le texte flotte à côté de son propre fond.
 */
function centreDansCadre(x: number, largeurEtiquette: number, largeurCadre: number) {
  return Math.min(
    Math.max(x, largeurEtiquette / 2 + 2),
    largeurCadre - largeurEtiquette / 2 - 2
  );
}

// ⭐ ON SERRE LES ÉTIQUETTES, PAS LES LETTRES (20/08). Chaque mot portait 16 px
// de marge intérieure et 7 px d'écart : sur une phrase de cinq mots, c'est
// 100 px de vide, soit un tiers de la largeur — et c'est ce tiers qui forçait le
// retour à la ligne, donc les groupes coupés en deux et les flèches en
// diagonale. Marges resserrées, la phrase tient sur une ligne et le mot reste
// gros. La police, elle, ne descend pas plus bas que 15.
// ⛔ AUCUNE POLICE SOUS 11 UNE FOIS À L'ÉCHELLE (24/08/2026), ET C'EST POURQUOI
// AUCUNE N'EST ÉCRITE À 11. REGLES.md § 2 quater pose le plancher ; la nature et
// le label d'un lien étaient à 10, donc DÉJÀ dessous avant toute réduction — et à
// 8,6 px sur un téléphone une fois le dessin mis à l'échelle de son bloc. Mesuré
// sur la page rendue en 375 px, pas estimé : sur la fiche du groupe nominal de
// 5e, 67 des 98 textes trop petits étaient des natures.
//
// ⚠️ ÉCRIRE 11 NE SUFFIT PAS, ET C'EST L'ERREUR QUE J'AI FAITE D'ABORD. Un dessin
// se met à l'échelle de son bloc : le plus étroit d'une fiche mesure 201 px sur un
// téléphone, et le moindre rapport de 0,98 fait retomber un 11 à 10,8. On écrit
// donc 12, ce qui laisse la marge — et la fiche règle son `largeurMax` pour que le
// rapport ne descende jamais loin de 1.
// ⚠️ Les largeurs se calculent depuis ces constantes (`largeurTexte`) et la bande
// des natures réserve 16 px de haut : monter à 12 ne chevauche rien.
const FONT_MOT = 15;
const FONT_NATURE = 12;
const FONT_FONCTION = 12;
const FONT_LIEN = 12;

const PAD_X = 12;
const GAP_MOT = 5;
const H_MOT = 30;
const PAS_ARC = 22;
// L'arc de reprise est plus creux que l'arc d'accord : il passe SOUS la phrase,
// où il doit rester lisible malgré son pointillé, et laisser sa place à
// l'étiquette qui se pose dessous (constaté au rendu, 20/08 — à 22 px de creux,
// « remplace » et l'arc se disputaient les mêmes pixels).
const PAS_ARC_BAS = 30;
// ⚠️ NE PAS L'AUGMENTER POUR ÉCARTER LES ÉTIQUETTES : ÇA LES RAPPROCHE
// (essayé et mesuré le 24/08/2026). Quand un lien relie deux mots posés sur DEUX
// lignes — « Léa mange | une mangue », la flèche « quoi ? » va du verbe au COD —
// son étiquette se place à mi-hauteur entre les deux lignes, donc juste au-dessus
// des étiquettes de fonction de la première. Écarter les lignes de 10 à 16 a
// fait descendre l'étiquette de l'arc d'autant : les boîtes se chevauchaient de
// 7 px au lieu de 5. Les lettres, elles, gardent un pixel d'écart — c'est serré,
// et c'est le prix des arcs qui traversent un retour à la ligne.
const ESPACE_LIGNES = 10;
// 250, et le nombre se déduit du bloc le PLUS ÉTROIT, pas du bloc moyen : sur un
// téléphone de 375, un dessin posé dans une carte de méthode ne reçoit que
// 201 px (226 dans une carte de propriété). Un dessin de 250 px s'y affiche donc
// à 201/250 = 0,80, et les mots écrits en 15 px arrivent à 12. À 270, la carte
// la plus serrée retombait à 10,9.
// ⛔ 250 ÉTAIT ENCORE TROP LARGE, ET LE COMMENTAIRE CI-DESSUS LE DISAIT SANS EN
// TIRER LA CONSÉQUENCE (24/08/2026). Il calculait bien 201/250 = 0,80, et
// concluait « les mots écrits en 15 arrivent à 12 » — vrai pour les MOTS, faux
// pour tout le reste : une fonction en 12 y arrive à 9,6, et le plancher est 11.
// Mesuré ensuite sur les dix-sept fiches de CM2 et de 6e : minimum entre 9,1 et
// 9,9 px, sur toutes, sans exception.
// À 190, le dessin tient dans la carte la plus serrée sans être réduit du tout,
// et l'échelle ne descend plus jamais sous 1. La phrase se plie une ligne de
// plus : c'est le prix, et c'est celui qu'on a choisi de payer partout ailleurs.
const LARGEUR_MAX_DEFAUT = 190;

// Un signe de ponctuation ne commence jamais une ligne : il reste collé au mot
// qu'il suit, comme dans un texte imprimé.
function estPonctuation(texte: string) {
  return /^[.,;:!?»…]+$/.test(texte.trim());
}

export default function PhraseCanvas({ figure }: Props) {
  if (!isPhraseCanvas(figure)) return null;

  const mots = figure.mots ?? [];
  if (mots.length === 0) return null;

  const groupes = figure.groupes ?? [];
  const liens = figure.liens ?? [];

  const showNatures =
    figure.display?.showNatures ?? mots.some((m) => Boolean(m.nature));
  const showGroupes = figure.display?.showGroupes ?? groupes.length > 0;

  // ── Les mots, mesurés puis pliés en lignes ─────────────────────────────────
  const largeurs = mots.map((m) => {
    const brut = largeurTexte(m.texte, FONT_MOT);
    const padding = m.texte.length <= 1 ? 6 : 11;
    return Math.max(15, brut + padding);
  });

  // ⭐ La surface passe avant la fiche : le mode classe impose sa largeur de
  //   repli (voir lib/canvas/largeur-projetee.tsx). Sans contexte — donc sur
  //   toutes les pages de fiches — le calcul est exactement celui d'avant.
  const largeurImposee = useLargeurProjetee();
  const largeurMax =
    largeurImposee ?? figure.size?.width ?? figure.largeurMax ?? LARGEUR_MAX_DEFAUT;
  const largeurUtile = Math.max(120, largeurMax - 2 * PAD_X);

  // ⛔ ON NE COUPE PAS UN GROUPE EN DEUX (constaté au rendu, 20/08). La coupure
  // se faisait au mot près : « une | mangue » laissait un crochet orphelin sur
  // la ligne du dessus, une étiquette « COD » posée sous un demi-groupe, et la
  // flèche « quoi ? » traversait le dessin en diagonale par-dessus les autres
  // légendes. On casse donc la ligne ENTRE les groupes — c'est d'ailleurs ainsi
  // qu'une phrase se lit. Un groupe trop long pour une ligne entière reste seul
  // à pouvoir être coupé, faute de mieux.
  const uniteDe: number[] = [];
  mots.forEach((_, i) => {
    const g = groupes.findIndex((gr) => i >= gr.mots[0] && i <= gr.mots[1]);
    uniteDe[i] = g;
  });
  const unitesBrutes: number[][] = [];
  mots.forEach((_, i) => {
    const precedent = unitesBrutes[unitesBrutes.length - 1];
    const memeGroupe =
      precedent !== undefined &&
      uniteDe[i] >= 0 &&
      uniteDe[i] === uniteDe[precedent[precedent.length - 1]];
    if (memeGroupe) precedent.push(i);
    else unitesBrutes.push([i]);
  });

  // ⛔ UN GROUPE PLUS LONG QU'UNE LIGNE SE COUPE QUAND MÊME (constaté au rendu,
  // 20/08). « Le vent souffle sur le lagon. » porte un seul groupe — « une seule
  // proposition » — qui couvre toute la phrase : insécable, il tenait sur une
  // ligne de 380 px et s'affichait à 9 px sur un téléphone. Ne pas couper est
  // une préférence, pas une règle : quand l'unité ne rentre nulle part, on la
  // coupe au mot.
  const unites: number[][] = [];
  unitesBrutes.forEach((unite) => {
    const largeur = unite.reduce(
      (s, i, k) => s + largeurs[i] + (k ? GAP_MOT : 0),
      0
    );
    if (largeur <= largeurUtile) {
      unites.push(unite);
      return;
    }
    let morceau: number[] = [];
    let occupe = 0;
    unite.forEach((i) => {
      const ajout = morceau.length ? GAP_MOT + largeurs[i] : largeurs[i];
      if (morceau.length && occupe + ajout > largeurUtile) {
        unites.push(morceau);
        morceau = [i];
        occupe = largeurs[i];
      } else {
        morceau.push(i);
        occupe += ajout;
      }
    });
    if (morceau.length) unites.push(morceau);
  });

  // ⛔ DEUX MOTS RELIÉS PAR UNE FLÈCHE RESTENT SUR LA MÊME LIGNE (Frédéric,
  // 20/08 : « beaucoup de flèches sont inversées »). Sur « Sur le piton souffle
  // un vent froid », la coupure tombait entre « souffle » et « un vent froid » :
  // la flèche « qui est-ce qui ? » devenait une diagonale qui traversait le
  // dessin, sa pointe passait derrière l'étiquette du mot et son texte se posait
  // sur « CC de lieu ». À l'écran, elle semblait partir à l'envers. On colle
  // donc les unités reliées AVANT de plier la phrase, tant qu'elles tiennent
  // ensemble sur une ligne.
  const largeurUnite = (u: number[]) =>
    u.reduce((s, i, k) => s + largeurs[i] + (k ? GAP_MOT : 0), 0);
  const unitesCollees: number[][] = [];
  unites.forEach((unite) => {
    const precedente = unitesCollees[unitesCollees.length - 1];
    const relieeAuPrecedent =
      precedente !== undefined &&
      liens.some(
        (l) =>
          (precedente.includes(l.de) && unite.includes(l.vers)) ||
          (precedente.includes(l.vers) && unite.includes(l.de))
      );
    if (
      relieeAuPrecedent &&
      largeurUnite(precedente) + GAP_MOT + largeurUnite(unite) <= largeurUtile
    ) {
      precedente.push(...unite);
    } else {
      unitesCollees.push([...unite]);
    }
  });

  const lignes: number[][] = [];
  {
    let courante: number[] = [];
    let occupee = 0;
    unitesCollees.forEach((unite) => {
      const l = largeurUnite(unite);
      const ajout = courante.length ? GAP_MOT + l : l;
      const ponctuation = unite.every((i) => estPonctuation(mots[i].texte));
      if (courante.length > 0 && occupee + ajout > largeurUtile && !ponctuation) {
        lignes.push(courante);
        courante = [...unite];
        occupee = l;
      } else {
        courante.push(...unite);
        occupee += ajout;
      }
    });
    if (courante.length) lignes.push(courante);
  }

  const ligneDe: number[] = [];
  const xDe: number[] = [];
  lignes.forEach((ligne, l) => {
    let x = PAD_X;
    ligne.forEach((i) => {
      ligneDe[i] = l;
      xDe[i] = x;
      x += largeurs[i] + GAP_MOT;
    });
  });
  const centre = (i: number) => xDe[i] + largeurs[i] / 2;

  const largeurLignes = lignes.map((ligne) => {
    const dernier = ligne[ligne.length - 1];
    return xDe[dernier] + largeurs[dernier] + PAD_X;
  });
  // ⛔ LA LÉGENDE NE COMMANDE PAS LA LARGEUR (mesuré sur la fiche, 20/08). Elle
  // l'avait d'abord fait — pour ne pas se faire couper aux deux bouts — et une
  // légende de 45 signes poussait le dessin à 345 px de large : la phrase, elle,
  // se retrouvait à 10 px sur un téléphone. C'est la légende qui passe à la
  // ligne, pas le dessin qui s'élargit.
  const width = Math.max(
    ...largeurLignes,
    figure.titre ? largeurTexte(figure.titre, 14) + 2 * PAD_X : 0,
    200
  );

  function couperTexte(texte: string, largeurDispo: number, fontSize: number) {
    const lignesTexte: string[] = [];
    let courante = "";
    texte.split(" ").forEach((mot) => {
      const essai = courante ? `${courante} ${mot}` : mot;
      if (courante && largeurTexte(essai, fontSize) > largeurDispo) {
        lignesTexte.push(courante);
        courante = mot;
      } else {
        courante = essai;
      }
    });
    if (courante) lignesTexte.push(courante);
    return lignesTexte;
  }

  const lignesLegende = figure.legende
    ? couperTexte(figure.legende, width - 2 * PAD_X, 12)
    : [];

  // ── Les liens : ceux d'une même ligne s'arrondissent, les autres traversent ─
  const memeLigne = (l: { de: number; vers: number }) =>
    ligneDe[l.de] === ligneDe[l.vers];
  const liensHaut = liens.filter(
    (l) => (l.type ?? "accord") !== "reprise" && memeLigne(l)
  );
  const liensBas = liens.filter((l) => l.type === "reprise" && memeLigne(l));
  const liensTraversants = liens.filter((l) => !memeLigne(l));

  // Deux arcs de même hauteur qui se chevauchent, ce sont deux traits qu'on ne
  // sait plus suivre : le plus long passe au-dessus du plus court.
  function empiler(source: typeof liens) {
    const tries = [...source].sort(
      (a, b) => Math.abs(b.vers - b.de) - Math.abs(a.vers - a.de)
    );
    const niveaux: Array<Array<[number, number]>> = [];
    return tries.map((lien) => {
      const a = Math.min(lien.de, lien.vers);
      const b = Math.max(lien.de, lien.vers);
      let niveau = 0;
      while (niveaux[niveau]?.some(([x, y]) => a <= y && b >= x)) niveau += 1;
      (niveaux[niveau] ??= []).push([a, b]);
      return { lien, niveau };
    });
  }

  const arcsHaut = empiler(liensHaut);
  const arcsBas = empiler(liensBas);
  const niveauxParLigne = (
    arcs: { lien: { de: number }; niveau: number }[],
    l: number
  ) =>
    arcs
      .filter((a) => ligneDe[a.lien.de] === l)
      .reduce((m, a) => Math.max(m, a.niveau + 1), 0);

  // ── Les groupes, découpés ligne par ligne ─────────────────────────────────
  // Un groupe à cheval sur deux lignes donne deux crochets ; l'étiquette de
  // fonction ne s'écrit qu'une fois, sous le premier.
  type Segment = {
    groupe: (typeof groupes)[number];
    debut: number;
    fin: number;
    avecLabel: boolean;
    rang: number;
  };
  const segmentsParLigne: Segment[][] = lignes.map(() => []);
  groupes.forEach((g) => {
    const [d, f] = g.mots;
    for (let l = ligneDe[d]; l <= ligneDe[f]; l += 1) {
      const ligne = lignes[l];
      if (!ligne) continue;
      const debut = Math.max(d, ligne[0]);
      const fin = Math.min(f, ligne[ligne.length - 1]);
      if (debut > fin) continue;
      segmentsParLigne[l].push({
        groupe: g,
        debut,
        fin,
        avecLabel: l === ligneDe[d],
        rang: 0,
      });
    }
  });

  // « le chat » mesure 60 px, son étiquette « sujet » 32 : ça passe. Mais
  // « hier » mesure 40 px et « CC de temps » en réclame 66 : elle mordrait sur
  // sa voisine — dans ce cas, elle descend d'un rang.
  const rangsParLigne = segmentsParLigne.map((segments) => {
    const occupation: Array<Array<[number, number]>> = [];
    segments.forEach((seg) => {
      if (!seg.avecLabel) return;
      const cx = (centre(seg.debut) + centre(seg.fin)) / 2;
      const demi = largeurTexte(seg.groupe.label, FONT_FONCTION) / 2 + 6;
      let rang = 0;
      while (
        occupation[rang]?.some(([x1, x2]) => cx - demi < x2 && cx + demi > x1)
      ) {
        rang += 1;
      }
      (occupation[rang] ??= []).push([cx - demi, cx + demi]);
      seg.rang = rang;
    });
    return occupation.length;
  });

  // ── Les hauteurs, ligne par ligne ─────────────────────────────────────────
  const yTitre = figure.titre ? 22 : 0;
  const yMotsDe: number[] = [];
  const yGroupesDe: number[] = [];
  const yArcsBasDe: number[] = [];
  let curseur = yTitre + 4;
  lignes.forEach((ligne, l) => {
    const nivH = niveauxParLigne(arcsHaut, l);
    const nivB = niveauxParLigne(arcsBas, l);
    const aDesNatures = showNatures && ligne.some((i) => Boolean(mots[i].nature));
    const yMots = curseur + (nivH > 0 ? nivH * PAS_ARC + 8 : 0) + (aDesNatures ? 16 : 0) + 6;
    const yBase = yMots + H_MOT;
    const hGroupes = showGroupes && rangsParLigne[l] > 0 ? 12 + rangsParLigne[l] * 20 : 0;
    yMotsDe[l] = yMots;
    yGroupesDe[l] = yBase + 10;
    yArcsBasDe[l] = yBase + 10 + hGroupes;
    curseur = yArcsBasDe[l] + (nivB > 0 ? nivB * PAS_ARC_BAS + 26 : 0) + ESPACE_LIGNES;
  });

  const groupeDeplacable = groupes.find((g) => g.deplacable);
  const yFantome = curseur + 4;
  const hFantome = groupeDeplacable ? 44 : 0;
  const hLegende = lignesLegende.length ? 6 + lignesLegende.length * 16 : 0;
  const height = figure.size?.height ?? curseur + hFantome + hLegende + 10;

  // La couleur d'un mot vient du groupe qui le porte : c'est ce qui fait que le
  // découpage se voit AVANT qu'on ait lu la moindre étiquette.
  const couleurMot = mots.map((m, i) => {
    if (m.color) return { fill: m.color, stroke: "#334155", text: "#0f172a" };
    const g = groupes.find((gr) => i >= gr.mots[0] && i <= gr.mots[1]);
    if (!g) return PALETTE.neutre;
    return g.color
      ? { fill: g.color, stroke: "#334155", text: "#0f172a" }
      : couleurFonction(g.label);
  });

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label={`Phrase analysée : ${mots.map((m) => m.texte).join(" ")}`}
      >
        <rect x={0} y={0} width={width} height={height} rx={14} fill="white" />

        {figure.titre ? (
          <text
            x={width / 2}
            y={16}
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#0f172a"
          >
            {figure.titre}
          </text>
        ) : null}

        {/* Les arcs du haut : accords et questions. Un accord relie deux mots ;
            une question part du verbe et retombe sur le complément. */}
        {arcsHaut.map(({ lien, niveau }, i) => {
          const l = ligneDe[lien.de];
          const x1 = centre(lien.de);
          const x2 = centre(lien.vers);
          const yAncre = yMotsDe[l] - 2;
          const yArc = yAncre - (niveau + 1) * PAS_ARC;
          const couleur = lien.type === "question" ? "#7c3aed" : "#0f172a";
          const largeurLabel = lien.label ? largeurTexte(lien.label, FONT_LIEN) + 10 : 0;
          return (
            <g key={`h-${i}`}>
              <path
                d={`M ${x1} ${yAncre} C ${x1} ${yArc}, ${x2} ${yArc}, ${x2} ${yAncre}`}
                fill="none"
                stroke={couleur}
                strokeWidth={1.8}
                strokeLinecap="round"
                markerEnd={
                  lien.type === "question" ? "url(#pointe-violette)" : "url(#pointe-noire)"
                }
              />
              {lien.label ? (
                <>
                  <rect
                    x={centreDansCadre((x1 + x2) / 2, largeurLabel, width) - largeurLabel / 2}
                    y={yArc - 9}
                    width={largeurLabel}
                    height={15}
                    rx={5}
                    fill="white"
                  />
                  <text
                    x={centreDansCadre((x1 + x2) / 2, largeurLabel, width)}
                    y={yArc + 2}
                    textAnchor="middle"
                    fontSize={FONT_LIEN}
                    fontWeight="800"
                    fill={couleur}
                  >
                    {lien.label}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}

        {/* La nature, au-dessus, en gris : elle ne doit jamais peser autant que
            la fonction — c'est la distinction que la fiche vient enseigner. */}
        {showNatures
          ? mots.map((m, i) =>
              m.nature ? (
                // ⛔ MÊME CORRECTIF QUE POUR LA FONCTION, AVEC HUIT JOURS DE
                // RETARD (24/08/2026). L'étiquette de fonction est ramenée dans
                // le cadre depuis le 20/08 ; celle de NATURE, non — et
                // « déterminant » (69 px à 12) centré sur « un » (18 px), premier
                // mot du groupe, débordait de 8 px à gauche et y perdait son d.
                // Constaté au rendu, en mesurant les getBBox() contre le viewBox,
                // pas en relisant le code.
                <text
                  key={`n-${i}`}
                  x={Math.min(
                    Math.max(centre(i), largeurTexte(m.nature, FONT_NATURE) / 2 + 2),
                    width - largeurTexte(m.nature, FONT_NATURE) / 2 - 2
                  )}
                  y={yMotsDe[ligneDe[i]] - 5}
                  textAnchor="middle"
                  fontSize={FONT_NATURE}
                  fontWeight="700"
                  fill="#94a3b8"
                >
                  {m.nature}
                </text>
              ) : null
            )
          : null}

        {/* Les mots */}
        {mots.map((m, i) => {
          const c = couleurMot[i];
          const y = yMotsDe[ligneDe[i]];
          return (
            <g key={`m-${i}`}>
              <rect
                x={xDe[i]}
                y={y}
                width={largeurs[i]}
                height={H_MOT}
                rx={8}
                fill={m.barre ? "#f8fafc" : c.fill}
                stroke={m.focus ? c.stroke : "#cbd5e1"}
                strokeWidth={m.focus ? 2.5 : 1.2}
                strokeDasharray={m.barre ? "4 3" : undefined}
              />
              <text
                x={centre(i)}
                y={y + 21}
                textAnchor="middle"
                fontSize={FONT_MOT}
                fontWeight={m.focus ? "900" : "700"}
                fill={m.barre ? "#94a3b8" : "#0f172a"}
              >
                {m.texte}
              </text>
              {m.barre ? (
                <line
                  x1={xDe[i] + 4}
                  y1={y + H_MOT / 2}
                  x2={xDe[i] + largeurs[i] - 4}
                  y2={y + H_MOT / 2}
                  stroke="#dc2626"
                  strokeWidth={1.8}
                />
              ) : null}
            </g>
          );
        })}

        {/* Les crochets de groupe et leur fonction */}
        {showGroupes
          ? segmentsParLigne.flatMap((segments, l) =>
              segments.map((seg, k) => {
                const x1 = xDe[seg.debut];
                const x2 = xDe[seg.fin] + largeurs[seg.fin];
                const c = seg.groupe.color
                  ? { fill: seg.groupe.color, stroke: "#334155", text: "#0f172a" }
                  : couleurFonction(seg.groupe.label);
                const y = yGroupesDe[l] + seg.rang * 20;
                return (
                  <g key={`g-${l}-${k}`}>
                    <path
                      d={`M ${x1} ${y} v 5 h ${x2 - x1} v -5`}
                      fill="none"
                      stroke={c.stroke}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {seg.avecLabel ? (
                      // ⛔ UNE ÉTIQUETTE PLUS LARGE QUE SON GROUPE SORT DU CADRE
                      // (constaté au rendu, 20/08) : « CC de temps » centrée sous
                      // « Hier », premier mot de la phrase, perdait son premier C
                      // au bord gauche. On la ramène dans le cadre.
                      <text
                        x={Math.min(
                          Math.max(
                            (x1 + x2) / 2,
                            largeurTexte(seg.groupe.label, FONT_FONCTION) / 2 + 2
                          ),
                          width - largeurTexte(seg.groupe.label, FONT_FONCTION) / 2 - 2
                        )}
                        y={y + 18}
                        textAnchor="middle"
                        fontSize={FONT_FONCTION}
                        fontWeight="900"
                        fill={c.text}
                      >
                        {seg.groupe.label}
                      </text>
                    ) : null}
                  </g>
                );
              })
            )
          : null}

        {/* ⛔ UN LIEN QUI CHANGE DE LIGNE SE DESSINE EN DERNIER, PAR-DESSUS
            (Frédéric, 20/08 : « beaucoup de flèches sont inversées »). Tracé
            avant les mots, son départ et sa pointe passaient DERRIÈRE les
            étiquettes : il ne restait qu'un tronçon de pointillé au milieu du
            dessin, qu'on lisait à l'envers. Il garde aussi sa couleur — une
            question reste violette même à cheval sur deux lignes — et son texte
            se pose au tiers du trajet, hors de la bande des fonctions. */}
        {liensTraversants.map((lien, i) => {
          const x1 = centre(lien.de);
          const x2 = centre(lien.vers);
          const y1 = yMotsDe[ligneDe[lien.de]] + H_MOT / 2;
          const y2 = yMotsDe[ligneDe[lien.vers]] + H_MOT / 2;
          const couleur =
            lien.type === "reprise"
              ? "#0ea5e9"
              : lien.type === "question"
                ? "#7c3aed"
                : "#0f172a";
          const pointe =
            lien.type === "reprise"
              ? "url(#pointe-bleue)"
              : lien.type === "question"
                ? "url(#pointe-violette)"
                : "url(#pointe-noire)";
          const largeurLabel = lien.label ? largeurTexte(lien.label, FONT_LIEN) + 10 : 0;
          const xLabel = x1 + (x2 - x1) * 0.32;
          const yLabel = y1 + (y2 - y1) * 0.32;
          return (
            <g key={`t-${i}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={couleur}
                strokeWidth={1.8}
                strokeDasharray="5 4"
                markerEnd={pointe}
              />
              {lien.label ? (
                <>
                  <rect
                    x={centreDansCadre(xLabel, largeurLabel, width) - largeurLabel / 2}
                    y={yLabel - 8}
                    width={largeurLabel}
                    height={15}
                    rx={5}
                    fill="white"
                    stroke={couleur}
                    strokeWidth={0.8}
                  />
                  <text
                    x={centreDansCadre(xLabel, largeurLabel, width)}
                    y={yLabel + 3}
                    textAnchor="middle"
                    fontSize={FONT_LIEN}
                    fontWeight="800"
                    fill={couleur}
                  >
                    {lien.label}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}

        {/* Les reprises, en pointillé sous la phrase : le pronom montre du
            doigt ce qu'il remplace. L'étiquette se pose SOUS le creux de l'arc
            — posée au milieu, son fond blanc effaçait la courbe. */}
        {arcsBas.map(({ lien, niveau }, i) => {
          const l = ligneDe[lien.de];
          const x1 = centre(lien.de);
          const x2 = centre(lien.vers);
          const yDepart = yArcsBasDe[l] - 4;
          const yArc = yDepart + (niveau + 1) * PAS_ARC_BAS;
          const yCreux = yDepart + 0.75 * (yArc - yDepart);
          const largeurLabel = lien.label ? largeurTexte(lien.label, FONT_LIEN) + 10 : 0;
          return (
            <g key={`b-${i}`}>
              <path
                d={`M ${x1} ${yDepart} C ${x1} ${yArc}, ${x2} ${yArc}, ${x2} ${yDepart}`}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth={1.8}
                strokeDasharray="5 4"
                strokeLinecap="round"
                markerEnd="url(#pointe-bleue)"
              />
              {lien.label ? (
                <>
                  <rect
                    x={centreDansCadre((x1 + x2) / 2, largeurLabel, width) - largeurLabel / 2}
                    y={yCreux + 6}
                    width={largeurLabel}
                    height={15}
                    rx={5}
                    fill="white"
                  />
                  <text
                    x={centreDansCadre((x1 + x2) / 2, largeurLabel, width)}
                    y={yCreux + 17}
                    textAnchor="middle"
                    fontSize={FONT_LIEN}
                    fontWeight="800"
                    fill="#0369a1"
                  >
                    {lien.label}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}

        {/* Le fantôme : le groupe déplaçable, redessiné à l'autre bout de la
            phrase. C'est le seul moyen de MONTRER qu'un complément
            circonstanciel se déplace — le dire ne se voit pas. */}
        {groupeDeplacable
          ? (() => {
              const [d, f] = groupeDeplacable.mots;
              const texte = mots
                .slice(d, f + 1)
                .map((m) => m.texte)
                .join(" ");
              const larg = Math.max(60, largeurTexte(texte, 14) + 18);
              const versLaDroite = centre(d) < width / 2;
              const xFantome = versLaDroite ? Math.max(PAD_X, width - larg - PAD_X) : PAD_X;
              const c = couleurFonction(groupeDeplacable.label);
              const xDepart = (centre(d) + centre(f)) / 2;
              const xArrivee = xFantome + larg / 2;
              return (
                <g>
                  {/* La flèche ARRIVE PAR LE HAUT : son dernier point de contrôle
                      est au-dessus de la case, sinon la pointe désigne le ciel. */}
                  <path
                    d={`M ${xDepart} ${yFantome - 6} C ${xDepart} ${yFantome + 6}, ${xArrivee} ${yFantome - 16}, ${xArrivee} ${yFantome + 3}`}
                    fill="none"
                    stroke={c.stroke}
                    strokeWidth={1.8}
                    strokeDasharray="5 4"
                    markerEnd="url(#pointe-orange)"
                  />
                  <rect
                    x={xFantome}
                    y={yFantome + 6}
                    width={larg}
                    height={26}
                    rx={7}
                    fill={c.fill}
                    fillOpacity={0.5}
                    stroke={c.stroke}
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                  />
                  <text
                    x={xArrivee}
                    y={yFantome + 24}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={c.text}
                  >
                    {texte}
                  </text>
                </g>
              );
            })()
          : null}

        {lignesLegende.map((ligne, i) => (
          <text
            key={`leg-${i}`}
            x={width / 2}
            y={height - 8 - (lignesLegende.length - 1 - i) * 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#475569"
          >
            {ligne}
          </text>
        ))}

        <defs>
          <marker id="pointe-noire" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0f172a" />
          </marker>
          <marker id="pointe-violette" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
          </marker>
          <marker id="pointe-bleue" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9" />
          </marker>
          <marker id="pointe-orange" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
