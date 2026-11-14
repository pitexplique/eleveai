// lib/canvas/animaux/svg.ts
//
// ─── LA BIBLIOTHÈQUE D'ANIMAUX : L'API ────────────────────────────────────────
// Des fonctions PURES qui rendent une chaîne SVG complète : pas de React, pas
// de DOM. Le coach les enveloppe (`Animal.tsx`), l'export Manim les écrit sur
// disque (`scripts/exporter-animaux-manim.mts`).
//
//   svgAnimal("coccinelle")                         → une coccinelle, 60 px
//   svgAnimal("poisson", { taille: 120, couleur: "#ef4444" })  → un poisson rouge
//   svgGrille([{ animal: "poule", nombre: 7 }])     → 7 poules, 5 par ligne
//   svgGrille([{ animal: "coccinelle", nombre: 4 }, { animal: "araignee", nombre: 3 }],
//             { disposition: "vrac", graine: 12 })  → « Compte les insectes »
//
// ⭐ LE MÊME APPEL DONNE TOUJOURS LE MÊME DESSIN : le mélange et le vrac
// dépendent d'une `graine`, jamais de Math.random. Une question du coach
// re-rendue (retour arrière, correction) ne voit pas ses animaux bouger.

import { DESSINS, FICHES, TEINTES, type AnimalId, type Teinte } from "./dessins";

export const BOITE = 60;

export type OptionsAnimal = {
  /** Côté du carré en px (défaut 60, la boite native). */
  taille?: number;
  /** Remplace la couleur PRINCIPALE (`a`). Le reste du dessin garde ses teintes. */
  couleur?: string;
  /** Tout en blanc : la version « à colorier » des fiches imprimées. */
  coloriage?: boolean;
  /** Retourné gauche-droite (un troupeau qui part dans l'autre sens). */
  miroir?: boolean;
};

function teinte(animal: AnimalId, o: OptionsAnimal): Teinte {
  if (o.coloriage) return { a: "#ffffff", b: "#ffffff", c: "#ffffff" };
  const t = TEINTES[animal];
  return o.couleur ? { ...t, a: o.couleur } : t;
}

/** Le dessin seul, dans le repère 60 × 60, à poser dans un `<g>`. */
export function dessinAnimal(animal: AnimalId, o: OptionsAnimal = {}): string {
  let corps = DESSINS[animal](teinte(animal, o));
  // ⛔ En coloriage, les couleurs écrites EN DUR dans un dessin (langue du
  // chien, aile du canard) restaient colorées : tout ce qui n'est pas l'encre
  // passe au blanc. Les yeux et les traits noirs restent.
  if (o.coloriage) corps = corps.replace(/fill="#(?!111827")[0-9a-fA-F]{6}"/g, 'fill="#ffffff"');
  return o.miroir ? `<g transform="translate(60 0) scale(-1 1)">${corps}</g>` : corps;
}

/** Un animal seul, en SVG autonome. */
export function svgAnimal(animal: AnimalId, o: OptionsAnimal = {}): string {
  const taille = o.taille ?? BOITE;
  const nom = FICHES[animal].un;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${taille}" height="${taille}" role="img" aria-label="${nom}">` +
    dessinAnimal(animal, o) +
    `</svg>`
  );
}

// ─── La grille à compter ──────────────────────────────────────────────────────

export type GroupeAnimaux = {
  animal: AnimalId;
  nombre: number;
  couleur?: string;
};

export type OptionsGrille = {
  /** Animaux par ligne (défaut 5 : on compte plus vite par paquets de 5). */
  colonnes?: number;
  /** Côté d'une case en px (défaut 60). */
  taille?: number;
  /** Écart entre deux cases en px (défaut 10). */
  ecart?: number;
  /** "grille" (défaut) : alignés, comptables d'un coup d'œil.
   *  "vrac" : légèrement décalés et tournés, comme dans un pré — l'élève doit
   *  POINTER pour compter (CP-CE1 « compte les insectes » à la IXL). */
  disposition?: "grille" | "vrac";
  /** Mélanger les groupes entre eux (défaut : oui dès qu'il y a 2 groupes). */
  melange?: boolean;
  /** Fixe le mélange et le vrac : même graine → même image. */
  graine?: number;
  coloriage?: boolean;
  /** Fond de la grille (défaut blanc ; "none" pour transparent). */
  fond?: string;
  /** Texte lu par les lecteurs d'écran. ⛔ Dans le coach, TOUJOURS le fournir :
   *  par défaut il dit « 7 poules », c'est-à-dire la réponse. */
  titre?: string;
};

/** Petit générateur pseudo-aléatoire déterministe (mulberry32). */
export function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Les animaux à poser, dans l'ordre où ils seront posés. */
export function ordreGrille(groupes: GroupeAnimaux[], o: OptionsGrille = {}) {
  const liste = groupes.flatMap((g) =>
    Array.from({ length: Math.max(0, Math.floor(g.nombre)) }, () => ({ animal: g.animal, couleur: g.couleur }))
  );
  const melange = o.melange ?? groupes.length > 1;
  if (melange) {
    const r = hasard((o.graine ?? 1) * 7919 + 17);
    for (let i = liste.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [liste[i], liste[j]] = [liste[j], liste[i]];
    }
  }
  return liste;
}

/** N animaux en grille : la brique des questions « Combien de … ? ». */
export function svgGrille(groupes: GroupeAnimaux[], o: OptionsGrille = {}): string {
  const liste = ordreGrille(groupes, o);
  const taille = o.taille ?? BOITE;
  const ecart = o.ecart ?? 10;
  const n = Math.max(1, liste.length);
  const colonnes = Math.max(1, Math.min(o.colonnes ?? 5, n));
  const lignes = Math.ceil(n / colonnes);
  const vrac = o.disposition === "vrac";
  // En vrac, chaque case reçoit un peu de marge pour que les décalages ne
  // fassent jamais se toucher deux animaux.
  const pas = taille + ecart + (vrac ? taille * 0.25 : 0);
  const marge = ecart;
  const largeur = Math.round(marge * 2 + colonnes * pas - ecart);
  const hauteur = Math.round(marge * 2 + lignes * pas - ecart);
  const r = hasard((o.graine ?? 1) * 104729 + 3);
  const echelle = taille / BOITE;

  const cases = liste.map((el, i) => {
    const col = i % colonnes;
    const lig = Math.floor(i / colonnes);
    let x = marge + col * pas;
    let y = marge + lig * pas;
    let rot = 0;
    let miroir = false;
    if (vrac) {
      x += r() * taille * 0.25;
      y += r() * taille * 0.25;
      rot = (r() - 0.5) * 24;
      miroir = r() < 0.4;
    }
    const corps = dessinAnimal(el.animal, { couleur: el.couleur, coloriage: o.coloriage, miroir });
    const tourne = rot ? ` rotate(${rot.toFixed(1)} 30 30)` : "";
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${echelle})${tourne}">${corps}</g>`;
  });

  const nomGroupes = groupes.map((g) => `${g.nombre} ${g.nombre > 1 ? FICHES[g.animal].pluriel : FICHES[g.animal].un.replace(/^une? /, "")}`);
  const fond = o.fond ?? "#ffffff";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largeur} ${hauteur}" width="${largeur}" height="${hauteur}" role="img" aria-label="${(o.titre ?? nomGroupes.join(", ")).replace(/"/g, "&quot;")}">` +
    (fond === "none" ? "" : `<rect width="${largeur}" height="${hauteur}" fill="${fond}" rx="12"/>`) +
    cases.join("") +
    `</svg>`
  );
}

/** « 7 poules », « 1 poule » : le nombre et le bon mot, pour l'énoncé ou la correction. */
export function nommer(animal: AnimalId, nombre: number): string {
  const f = FICHES[animal];
  return nombre > 1 ? `${nombre} ${f.pluriel}` : `${nombre} ${f.un.replace(/^une? /, "")}`;
}
