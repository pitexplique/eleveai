// lib/atelier-video/dessin.ts
//
// ⭐ 10/10/2026 — « TÉLÉCHARGER MA VIDÉO » (Frédéric : « on va devoir trouver
// une solution simple », puis « ok pour télécharger la vidéo »). L'aperçu de
// l'atelier est fait en HTML (KaTeX), qu'un navigateur ne sait pas filmer. Ce
// module redessine la MÊME scène sur un canvas 1280 × 720, image par image ;
// le canvas, lui, se filme (captureStream + MediaRecorder).
//
// Les mesures reprennent celles de l'aperçu, exprimées en « cqw » (centièmes
// de la largeur) : titre à 3,5 cqw du haut, pile à 13 cqw, écart 3,5 cqw…
// Les formules sont composées ici (fractions, puissances, racines, ×, ÷, ≤…),
// avec les polices de KaTeX que la page a déjà chargées.

export type ContenuDessin = { kind: "texte"; texte: string } | { kind: "formule"; latex: string };

export type ObjetDessin = {
  id: number;
  rendu:
    | { kind: "contenu"; contenu: ContenuDessin }
    | { kind: "droite"; de: number; a: number }
    | { kind: "billes"; rangees: number; colonnes: number };
  couleur: string;
  /** Instant (performance.now) de l'apparition ou du dernier « transforme ». */
  t: number;
  cadre?: string;
  tCadre?: number;
  grand?: boolean;
  tGrand?: number;
  sortie?: boolean;
  tSortie?: number;
};

export type SceneDessin = { titre?: string; tTitre?: number; pile: ObjetDessin[]; sousTitre?: string };

export const LARGEUR = 1280;
export const HAUTEUR = 720;
const U = LARGEUR / 100; // 1 cqw
const POLICE_TEXTE = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const avance = (debut: number | undefined, maintenant: number, duree: number) =>
  debut === undefined ? 1 : Math.min(1, Math.max(0, (maintenant - debut) / duree));
const douce = (p: number) => 1 - Math.pow(1 - p, 3);

/* ── Les formules : une petite composition de boîtes ─────────────────────── */

type Boite = { l: number; h: number; p: number; dessiner: (ctx: CanvasRenderingContext2D, x: number, y: number) => void };

function symbole(ctx: CanvasRenderingContext2D, txt: string, taille: number, italique: boolean, marge = 0): Boite {
  const police = italique ? `italic ${taille}px KaTeX_Math, serif` : `${taille}px KaTeX_Main, serif`;
  ctx.font = police;
  const l = ctx.measureText(txt).width;
  return {
    l: l + 2 * marge,
    h: taille * 0.72,
    p: taille * 0.22,
    dessiner: (c, x, y) => {
      c.font = police;
      c.fillText(txt, x + marge, y);
    },
  };
}

function enLigne(morceaux: Boite[]): Boite {
  return {
    l: morceaux.reduce((s, b) => s + b.l, 0),
    h: Math.max(0, ...morceaux.map((b) => b.h)),
    p: Math.max(0, ...morceaux.map((b) => b.p)),
    dessiner: (c, x, y) => {
      let cx = x;
      for (const b of morceaux) {
        b.dessiner(c, cx, y);
        cx += b.l;
      }
    },
  };
}

function fraction(num: Boite, den: Boite, taille: number): Boite {
  const axe = taille * 0.25;
  const ecart = taille * 0.12;
  const trait = Math.max(1.5, taille * 0.045);
  const l = Math.max(num.l, den.l) + taille * 0.3;
  return {
    l: l + taille * 0.2,
    h: axe + ecart + num.p + num.h,
    p: -axe + ecart + den.h + den.p,
    dessiner: (c, x, y) => {
      const xg = x + taille * 0.1;
      const yAxe = y - axe;
      c.fillRect(xg, yAxe - trait / 2, l, trait);
      num.dessiner(c, xg + (l - num.l) / 2, yAxe - ecart - num.p);
      den.dessiner(c, xg + (l - den.l) / 2, yAxe + ecart + den.h);
    },
  };
}

function exposant(b: Boite, taille: number): Boite {
  const montee = taille * 0.42;
  return { l: b.l + taille * 0.05, h: b.h + montee, p: 0, dessiner: (c, x, y) => b.dessiner(c, x + taille * 0.05, y - montee) };
}

function racine(b: Boite, taille: number): Boite {
  const signe = taille * 0.6;
  const haut = b.h + taille * 0.15;
  return {
    l: signe + b.l + taille * 0.1,
    h: haut + taille * 0.05,
    p: b.p,
    dessiner: (c, x, y) => {
      c.save();
      c.lineWidth = Math.max(1.5, taille * 0.05);
      c.strokeStyle = c.fillStyle;
      c.beginPath();
      c.moveTo(x, y - taille * 0.25);
      c.lineTo(x + signe * 0.3, y - taille * 0.32);
      c.lineTo(x + signe * 0.55, y + b.p);
      c.lineTo(x + signe, y - haut);
      c.lineTo(x + signe + b.l + taille * 0.1, y - haut);
      c.stroke();
      c.restore();
      b.dessiner(c, x + signe + taille * 0.05, y);
    },
  };
}

function lireGroupe(s: string, i: number): [string, number] {
  while (s[i] === " ") i++;
  if (s[i] !== "{") {
    if (s[i] === "\\") {
      const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
      return [m ? m[0] : s[i], i + (m ? m[0].length : 1)];
    }
    return [s[i] ?? "", i + 1];
  }
  let profondeur = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === "{") profondeur++;
    else if (s[j] === "}" && --profondeur === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

const SYMBOLES: Record<string, string> = { times: "×", div: "÷", leq: "≤", geq: "≥", neq: "≠", "%": "%", ",": "," };
const OPERATEURS = new Set(["=", "+", "−", "<", ">", "×", "÷", "≤", "≥", "≠"]);

/** Compose le LaTeX produit par `versLatex` (lib/atelier-video/script.ts). */
export function composer(ctx: CanvasRenderingContext2D, s: string, taille: number): Boite {
  const morceaux: Boite[] = [];
  let precedentOperateur = true; // en tête, « - » est un signe, pas une soustraction
  const ajouterSymbole = (txt: string, italique: boolean) => {
    const op = OPERATEURS.has(txt);
    const binaire = op && !precedentOperateur;
    morceaux.push(symbole(ctx, txt, taille, italique, binaire ? taille * 0.22 : 0));
    precedentOperateur = op;
  };
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") {
      i++;
      continue;
    }
    if (c === "\\") {
      const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
      const cmd = m ? m[1] : "";
      i += m ? m[0].length : 1;
      if (cmd === "frac") {
        const [a, i1] = lireGroupe(s, i);
        const [b, i2] = lireGroupe(s, i1);
        i = i2;
        morceaux.push(fraction(composer(ctx, a, taille * 0.8), composer(ctx, b, taille * 0.8), taille));
        precedentOperateur = false;
      } else if (cmd === "sqrt") {
        const [a, i1] = lireGroupe(s, i);
        i = i1;
        morceaux.push(racine(composer(ctx, a, taille), taille));
        precedentOperateur = false;
      } else if (SYMBOLES[cmd]) ajouterSymbole(SYMBOLES[cmd], false);
      continue;
    }
    if (c === "{") {
      const [a, i1] = lireGroupe(s, i);
      i = i1;
      morceaux.push(composer(ctx, a, taille));
      precedentOperateur = false;
      continue;
    }
    if (c === "^") {
      const [a, i1] = lireGroupe(s, i + 1);
      i = i1;
      morceaux.push(exposant(composer(ctx, a, taille * 0.7), taille));
      precedentOperateur = false;
      continue;
    }
    i++;
    if (c === "-") ajouterSymbole("−", false);
    else if (/[a-zA-Z]/.test(c)) ajouterSymbole(c, true);
    else ajouterSymbole(c, false);
  }
  return enLigne(morceaux);
}

/* ── La scène ────────────────────────────────────────────────────────────── */

function boiteObjet(ctx: CanvasRenderingContext2D, o: ObjetDessin): Boite {
  const r = o.rendu;
  if (r.kind === "contenu") {
    if (r.contenu.kind === "formule") return composer(ctx, r.contenu.latex, 4.8 * U);
    const taille = 2.9 * U;
    const police = `${taille}px ${POLICE_TEXTE}`;
    ctx.font = police;
    const txt = r.contenu.texte;
    return {
      l: ctx.measureText(txt).width,
      h: taille * 0.95,
      p: taille * 0.3,
      dessiner: (c, x, y) => {
        c.font = police;
        c.fillText(txt, x, y);
      },
    };
  }
  if (r.kind === "droite") {
    const l = 77 * U;
    const k = l / 1000; // le dessin de l'aperçu : viewBox 1000 × 110
    const { de, a } = r;
    const n = a - de;
    return {
      l,
      h: 110 * k,
      p: 0,
      dessiner: (c, x, y) => {
        const haut = y - 110 * k;
        const X = (v: number) => x + (40 + ((v - de) / n) * 920) * k;
        c.save();
        c.lineWidth = 4 * k;
        c.strokeStyle = c.fillStyle;
        c.beginPath();
        c.moveTo(x + 10 * k, haut + 40 * k);
        c.lineTo(x + 990 * k, haut + 40 * k);
        c.stroke();
        c.beginPath();
        c.moveTo(x + 990 * k, haut + 40 * k);
        c.lineTo(x + 972 * k, haut + 30 * k);
        c.lineTo(x + 972 * k, haut + 50 * k);
        c.fill();
        c.font = `${34 * k}px KaTeX_Main, serif`;
        c.textAlign = "center";
        for (let v = de; v <= a; v++) {
          c.beginPath();
          c.moveTo(X(v), haut + 28 * k);
          c.lineTo(X(v), haut + 52 * k);
          c.stroke();
          c.fillText(v < 0 ? `−${-v}` : String(v), X(v), haut + 95 * k);
        }
        c.restore();
      },
    };
  }
  const d = 2.25 * U;
  const ecart = 2.1 * U;
  const { rangees, colonnes } = r;
  const t0 = o.t;
  return {
    l: colonnes * d + (colonnes - 1) * ecart,
    h: rangees * d + (rangees - 1) * ecart,
    p: 0,
    dessiner: (c, x, y) => {
      const haut = y - (rangees * d + (rangees - 1) * ecart);
      const maintenant = performance.now();
      c.save();
      c.fillStyle = "#58A6FF";
      for (let i = 0; i < rangees * colonnes; i++) {
        const p = douce(avance(t0 + i * 40, maintenant, 350));
        if (p <= 0) continue;
        const cx = x + (i % colonnes) * (d + ecart) + d / 2;
        const cy = haut + Math.floor(i / colonnes) * (d + ecart) + d / 2;
        c.beginPath();
        c.arc(cx, cy, (d / 2) * p, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
    },
  };
}

/** Le contour du cadre « entoure », tracé jusqu'à la fraction `p` de son tour. */
function cadrePartiel(c: CanvasRenderingContext2D, x: number, y: number, l: number, h: number, p: number) {
  const tour = 2 * (l + h);
  let reste = tour * p;
  const segments: [number, number, number, number][] = [
    [x, y, x + l, y],
    [x + l, y, x + l, y + h],
    [x + l, y + h, x, y + h],
    [x, y + h, x, y],
  ];
  c.beginPath();
  c.moveTo(x, y);
  for (const [x1, y1, x2, y2] of segments) {
    const long = Math.hypot(x2 - x1, y2 - y1);
    if (reste <= 0) break;
    const f = Math.min(1, reste / long);
    c.lineTo(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f);
    reste -= long;
  }
  c.stroke();
}

function enLignesDeLargeur(ctx: CanvasRenderingContext2D, texte: string, largeur: number) {
  const lignes: string[] = [];
  let courante = "";
  for (const mot of texte.split(/\s+/)) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (courante && ctx.measureText(essai).width > largeur) {
      lignes.push(courante);
      courante = mot;
    } else courante = essai;
  }
  if (courante) lignes.push(courante);
  return lignes;
}

/** Dessine la scène telle qu'elle est à l'instant `maintenant`. */
export function dessinerScene(ctx: CanvasRenderingContext2D, scene: SceneDessin, maintenant: number) {
  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Le titre, qui s'écrit de gauche à droite.
  if (scene.titre) {
    const taille = 3.3 * U;
    ctx.font = `${taille}px ${POLICE_TEXTE}`;
    const l = ctx.measureText(scene.titre).width;
    const x = (LARGEUR - l) / 2;
    const p = douce(avance(scene.tTitre, maintenant, 900));
    ctx.save();
    ctx.beginPath();
    ctx.rect(x - 4, 0, (l + 8) * p, 3.5 * U + taille * 1.3);
    ctx.clip();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(scene.titre, x, 3.5 * U + taille * 0.95);
    ctx.restore();
  }

  // La pile : centrée, de haut en bas, comme l'aperçu.
  let y = 13 * U;
  for (const o of scene.pile) {
    const b = boiteObjet(ctx, o);
    const hauteur = b.h + b.p;
    const x = (LARGEUR - b.l) / 2;
    const ligneDeBase = y + b.h;

    // Agrandir puis rétrécir : 1 → 1,5 → 1, en 0,5 s chaque fois.
    let echelle = 1;
    if (o.tGrand !== undefined) {
      const p = douce(avance(o.tGrand, maintenant, 500));
      echelle = o.grand ? 1 + 0.5 * p : 1.5 - 0.5 * p;
    }
    const opacite = o.sortie ? 1 - avance(o.tSortie, maintenant, 500) : 1;
    const cx = LARGEUR / 2;
    const cy = y + hauteur / 2;

    ctx.save();
    ctx.globalAlpha = opacite;
    ctx.translate(cx, cy);
    ctx.scale(echelle, echelle);
    ctx.translate(-cx, -cy);
    ctx.fillStyle = o.couleur;

    if (o.rendu.kind === "billes") b.dessiner(ctx, x, ligneDeBase);
    else {
      // Écrire / transformer / tracer la droite : révélé de gauche à droite.
      const p = douce(avance(o.t, maintenant, 900));
      ctx.save();
      ctx.beginPath();
      ctx.rect(x - 0.5 * U, y - 2 * U, (b.l + U) * p, hauteur + 4 * U);
      ctx.clip();
      b.dessiner(ctx, x, ligneDeBase);
      ctx.restore();
    }

    if (o.cadre) {
      const marge = 1.4 * U;
      ctx.strokeStyle = o.cadre;
      ctx.lineWidth = 0.25 * U;
      cadrePartiel(ctx, x - marge, y - marge, b.l + 2 * marge, hauteur + 2 * marge, douce(avance(o.tCadre, maintenant, 800)));
    }
    ctx.restore();
    y += hauteur + 3.5 * U;
  }

  // Le sous-titre : ce que dit la voix.
  if (scene.sousTitre) {
    const taille = 1.9 * U;
    ctx.font = `${taille}px ${POLICE_TEXTE}`;
    ctx.fillStyle = "#DDDDDD";
    ctx.textAlign = "center";
    const lignes = enLignesDeLargeur(ctx, scene.sousTitre, LARGEUR - 12 * U);
    const interligne = taille * 1.25;
    let ly = HAUTEUR - 2 * U - (lignes.length - 1) * interligne - taille * 0.25;
    for (const l of lignes) {
      ctx.fillText(l, LARGEUR / 2, ly);
      ly += interligne;
    }
  }
  ctx.restore();
}
